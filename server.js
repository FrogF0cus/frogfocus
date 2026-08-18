// ============================================================================
// Frog Focus — ElevenLabs TTS backend (secure proxy + cache)
// ----------------------------------------------------------------------------
// Why this exists: the ElevenLabs API key must NEVER ship to the browser. This
// tiny server holds the key in an environment variable, calls ElevenLabs once
// per unique phrase, caches the resulting mp3 on disk, and re-serves the cached
// file forever after — so a shared/public page does not re-spend the owner's
// credit on every visitor.
//
// Requirements: Node.js 18+ (uses the built-in global `fetch`).
// Run:          npm install && npm start   (or `node server.js`)
// Env vars:     see .env.example — copy to `.env` (git-ignored) or export them.
// ============================================================================

const express = require('express');
const crypto   = require('crypto');
const fs       = require('fs');
const path     = require('path');
const webpush  = require('web-push');

const app = express();
app.use(express.json({ limit: '10kb' }));   // phrases are tiny

// ---- Load `.env` if present (no dependency) -------------------------------
// Values already set in the real environment win; `.env` is a convenience for
// local development only. The real key lives in `.env` — never commit it.
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8')
      .split(/\r?\n/)
      .forEach(function (line) {
        const m = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
        if (m && process.env[m[1]] === undefined) {
          process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
        }
      });
  }
} catch (e) { /* .env optional */ }

// ---- Config (env only — never hardcoded) ----------------------------------
const PORT     = process.env.PORT || 8787;
const API_KEY  = process.env.ELEVENLABS_API_KEY || '';           // REQUIRED
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || 'ErXwobaYiN019PkySvjV'; // Antoni — warm, friendly
const MODEL_ID = process.env.ELEVENLABS_MODEL_ID || 'eleven_turbo_v2_5';

const CACHE_DIR = path.join(__dirname, '.tts-cache');
if (!fs.existsSync(CACHE_DIR)) fs.mkdirSync(CACHE_DIR, { recursive: true });

// ---- Web Push (VAPID) — server-scheduled notifications ---------------------
// Keys live in `.env` (never committed). On a fresh box with no keys present,
// the server generates them once and persists them to `.env` — so deploy is
// seamless and the keys stay stable across restarts.
let VAPID_PUBLIC_KEY  = process.env.VAPID_PUBLIC_KEY  || '';
let VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY || '';
const VAPID_SUBJECT   = process.env.VAPID_SUBJECT     || 'mailto:koba@empir3.com';

// ---- CORS (so a separately-hosted frontend can call this backend) ----------
app.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// ---- Serve ONLY the frontend assets (never server source or `.env`) --------
['images', 'uploads', 'audio'].forEach(function (dir) {
  app.use('/' + dir, express.static(path.join(__dirname, dir)));
});
app.get('/', function (req, res) { res.sendFile(path.join(__dirname, 'index.html')); });
app.get('/index.html', function (req, res) { res.sendFile(path.join(__dirname, 'index.html')); });
// PWA files — served explicitly so the source tree stays private.
app.get('/manifest.json', function (req, res) { res.sendFile(path.join(__dirname, 'manifest.json')); });
app.get('/sw.js', function (req, res) { res.sendFile(path.join(__dirname, 'sw.js')); });

// ---- Cache helpers ---------------------------------------------------------
function cacheFileFor(text, voiceId) {
  const hash = crypto.createHash('sha256').update(voiceId + '::' + text).digest('hex');
  return path.join(CACHE_DIR, hash + '.mp3');
}

// ---- Health check (free — no synthesis, no credit spent) -------------------
app.get('/api/tts/health', function (req, res) {
  res.json({ configured: !!API_KEY, voice: VOICE_ID });
});

// ---- TTS endpoint: synthesize once, cache forever --------------------------
app.post('/api/tts', async function (req, res) {
  const text = (req.body && typeof req.body.text === 'string') ? req.body.text.trim() : '';
  if (!text) return res.status(400).json({ error: 'Missing "text"' });
  if (!API_KEY) return res.status(503).json({ error: 'ELEVENLABS_API_KEY not configured on the server' });

  // Optional per-request voice override: the client POSTs {voice_id, text} so a
  // deployment can switch voices without touching server env. Any malformed or
  // absent voice_id falls back to the server default (ELEVENLABS_VOICE_ID). The
  // cache key includes the effective voice so different voices never collide.
  const asked = (req.body && typeof req.body.voice_id === 'string') ? req.body.voice_id.trim() : '';
  const voiceId = /^[A-Za-z0-9_-]{1,64}$/.test(asked) ? asked : VOICE_ID;

  const file = cacheFileFor(text, voiceId);

  // Serve the cached mp3 if this exact phrase was already synthesized.
  if (fs.existsSync(file)) {
    res.set('Content-Type', 'audio/mpeg');
    res.set('X-TTS-Cache', 'hit');
    return fs.createReadStream(file).pipe(res);
  }

  try {
    const upstream = await fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(voiceId),
      {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg'
        },
        body: JSON.stringify({ text: text, model_id: MODEL_ID })
      }
    );

    if (!upstream.ok) {
      let errText = '';
      try { errText = await upstream.text(); } catch (e) { /* ignore */ }
      let detail = errText.slice(0, 300);
      try {
        const j = JSON.parse(errText);
        if (j && j.error){
          detail = (typeof j.error === 'string' ? j.error : (j.error.message || JSON.stringify(j.error))).slice(0, 300);
        }
      } catch (e) { /* non-JSON body — keep raw text */ }
      console.error('[tts] ElevenLabs error', upstream.status, detail);
      return res.status(502).json({ error: 'ElevenLabs upstream error', status: upstream.status, detail: detail });
    }

    const buf = Buffer.from(await upstream.arrayBuffer());
    fs.writeFileSync(file, buf);   // persist for future requests

    res.set('Content-Type', 'audio/mpeg');
    res.set('X-TTS-Cache', 'miss');
    res.send(buf);
  } catch (err) {
    console.error('[tts] synthesis failed:', err && err.message ? err.message : err);
    res.status(502).json({ error: 'TTS synthesis failed' });
  }
});

// ---- Suggestions: write-only, server-side only -----------------------------
// No public GET exists — submissions are appended to data/suggestions.json and
// never served back. `data/` is intentionally NOT in the static dirs list above.
const DATA_DIR       = path.join(__dirname, 'data');
const SUGGESTIONS_FN = path.join(DATA_DIR, 'suggestions.json');

app.post('/api/suggestions', function (req, res) {
  const raw = req.body && typeof req.body.suggestion === 'string' ? req.body.suggestion : '';
  const suggestion = raw.trim();
  if (!suggestion) return res.status(400).json({ error: 'Suggestion must not be empty' });
  if (suggestion.length > 500) return res.status(400).json({ error: 'Suggestion must be 500 characters or fewer' });

  const entry = { id: crypto.randomUUID(), suggestion: suggestion, ts: new Date().toISOString() };

  // Read-modify-write the JSON array so no prior entry is ever lost.
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  let entries = [];
  if (fs.existsSync(SUGGESTIONS_FN)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(SUGGESTIONS_FN, 'utf8'));
      if (Array.isArray(parsed)) entries = parsed;
      else throw new Error('suggestions.json is not an array');
    } catch (e) {
      // Corrupt/unreadable file: keep it as a timestamped backup, start fresh.
      try { fs.copyFileSync(SUGGESTIONS_FN, SUGGESTIONS_FN + '.' + Date.now() + '.bak'); } catch (e2) { /* best effort */ }
      entries = [];
    }
  }
  entries.push(entry);
  fs.writeFileSync(SUGGESTIONS_FN, JSON.stringify(entries, null, 2) + '\n');

  res.status(201).json(entry);
});

// ---- Suggestions: PRIVATE read endpoint (secret-keyed, poll-friendly) ------
// No public read exists. This endpoint only answers when the caller presents
// SUGGESTIONS_KEY, so a scheduled checker can poll the inbox without exposing
// submissions to the world. `since` (ISO timestamp) returns only entries newer
// than that moment; omitted, it returns the whole (key-held) inbox. The POST
// endpoint above stays strictly write-only.
const SUGGESTIONS_KEY = process.env.SUGGESTIONS_KEY || '';

function keyMatches(given) {
  if (!SUGGESTIONS_KEY || typeof given !== 'string' || given.length === 0) return false;
  const a = Buffer.from(given, 'utf8');
  const b = Buffer.from(SUGGESTIONS_KEY, 'utf8');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

app.get('/api/suggestions', function (req, res) {
  // Refuse loudly if the operator forgot to set a key — a misconfigured server
  // must never accidentally expose the inbox.
  if (!SUGGESTIONS_KEY) {
    return res.status(503).json({ error: 'SUGGESTIONS_KEY is not configured on the server' });
  }
  if (!keyMatches(req.query.key)) {
    return res.status(401).json({ error: 'Unauthorized — valid ?key= required' });
  }

  let entries = [];
  if (fs.existsSync(SUGGESTIONS_FN)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(SUGGESTIONS_FN, 'utf8'));
      if (Array.isArray(parsed)) entries = parsed;
    } catch (e) { /* corrupt file: treat as empty; POST keeps its own backup logic */ }
  }

  const since = typeof req.query.since === 'string' ? req.query.since.trim() : '';
  if (since) {
    const sinceMs = Date.parse(since);
    if (isNaN(sinceMs)) return res.status(400).json({ error: '"since" must be an ISO timestamp' });
    entries = entries.filter(function (e) {
      return e && typeof e.ts === 'string' && Date.parse(e.ts) > sinceMs;
    });
  }

  res.json({ entries: entries, count: entries.length });
});

// ---- Web Push: VAPID setup -------------------------------------------------
function ensureVapid() {
  if (VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY) {
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    return true;
  }
  // First boot: generate once and persist to .env so restarts are stable.
  try {
    const keys = webpush.generateVAPIDKeys();
    const envPath = path.join(__dirname, '.env');
    let lines = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8').split(/\r?\n/) : [];
    const upsert = function (k, v) {
      const re = new RegExp('^' + k + '=');
      if (lines.some(function (l) { return re.test(l); })) {
        lines = lines.map(function (l) { return re.test(l) ? k + '=' + v : l; });
      } else {
        lines.push(k + '=' + v);
      }
    };
    upsert('VAPID_PUBLIC_KEY', keys.publicKey);
    upsert('VAPID_PRIVATE_KEY', keys.privateKey);
    upsert('VAPID_SUBJECT', VAPID_SUBJECT);
    fs.writeFileSync(envPath, lines.join('\n') + '\n');
    process.env.VAPID_PUBLIC_KEY  = keys.publicKey;
    process.env.VAPID_PRIVATE_KEY = keys.privateKey;
    VAPID_PUBLIC_KEY  = keys.publicKey;
    VAPID_PRIVATE_KEY = keys.privateKey;
    webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);
    console.log('[push] VAPID keys generated and persisted to .env');
    return true;
  } catch (e) {
    console.error('[push] VAPID setup failed:', e && e.message ? e.message : e);
    return false;
  }
}

// ---- Web Push: store helpers ------------------------------------------------
const SUBS_FN = path.join(DATA_DIR, 'push-subs.json');
const JOBS_FN = path.join(DATA_DIR, 'push-jobs.json');

function readJsonArray(fn) {
  if (!fs.existsSync(fn)) return [];
  try {
    const v = JSON.parse(fs.readFileSync(fn, 'utf8'));
    return Array.isArray(v) ? v : [];
  } catch (e) { return []; }
}
function writeJsonArray(fn, arr) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(fn, JSON.stringify(arr, null, 2) + '\n');
}

// ---- Web Push: subscription management -------------------------------------
// The client registers its browser push subscription here. `data/` stays out
// of the static dirs, so this list is never served to the browser.
app.post('/api/push/subscribe', function (req, res) {
  const b       = req.body || {};
  const endpoint = typeof b.endpoint === 'string' ? b.endpoint.trim() : '';
  const keys     = b.keys && typeof b.keys === 'object' ? b.keys : {};
  const p256dh   = typeof keys.p256dh === 'string' ? keys.p256dh.trim() : '';
  const auth     = typeof keys.auth   === 'string' ? keys.auth.trim()   : '';
  if (!/^https?:\/\//.test(endpoint) || !p256dh || !auth) {
    return res.status(400).json({ error: 'endpoint, keys.p256dh and keys.auth are required' });
  }
  const subs = readJsonArray(SUBS_FN);
  const entry = {
    endpoint: endpoint,
    keys: { p256dh: p256dh, auth: auth },
    userAgent: typeof b.userAgent === 'string' ? b.userAgent.slice(0, 300) : '',
    ts: new Date().toISOString()
  };
  const existing = subs.find(function (s) { return s.endpoint === endpoint; });
  if (existing) Object.assign(existing, entry); else subs.push(entry);
  writeJsonArray(SUBS_FN, subs);
  res.json({ ok: true, count: subs.length });
});

app.post('/api/push/unsubscribe', function (req, res) {
  const endpoint = req.body && typeof req.body.endpoint === 'string' ? req.body.endpoint.trim() : '';
  if (!endpoint) return res.status(400).json({ error: 'endpoint is required' });
  const subs = readJsonArray(SUBS_FN).filter(function (s) { return s.endpoint !== endpoint; });
  writeJsonArray(SUBS_FN, subs);
  // Also drop any pending jobs bound to that endpoint.
  const jobs = readJsonArray(JOBS_FN).filter(function (j) { return j.endpoint !== endpoint; });
  writeJsonArray(JOBS_FN, jobs);
  res.json({ ok: true });
});

// ---- Web Push: one-shot scheduled notifications ----------------------------
// The client posts the interval's end time; the server holds the job and fires
// it at the right moment via the Web Push protocol — no open tab required.
// Jobs are keyed by a client-generated jobId: re-scheduling with the same id
// replaces the old job (idempotent), and cancel removes it precisely.
app.post('/api/push/schedule', function (req, res) {
  const b        = req.body || {};
  const endpoint = typeof b.endpoint === 'string' ? b.endpoint.trim() : '';
  const jobId    = typeof b.jobId   === 'string' ? b.jobId.trim().slice(0, 64) : '';
  const endAt    = typeof b.endAt   === 'string' ? Date.parse(b.endAt) : NaN;
  const title    = typeof b.title   === 'string' ? b.title.trim().slice(0, 120) : '';
  const body     = typeof b.body    === 'string' ? b.body.trim().slice(0, 300)  : '';
  const url      = (typeof b.url === 'string' && b.url.startsWith('/')) ? b.url.slice(0, 200) : '/';

  if (!jobId || !endpoint)          return res.status(400).json({ error: 'jobId and endpoint are required' });
  if (isNaN(endAt) || endAt <= Date.now())
    return res.status(400).json({ error: 'endAt must be a future ISO timestamp' });
  if (!title || !body)              return res.status(400).json({ error: 'title and body are required' });

  const sub = readJsonArray(SUBS_FN).find(function (s) { return s.endpoint === endpoint; });
  if (!sub) return res.status(404).json({ error: 'No push subscription for this endpoint — subscribe first' });

  const jobs = readJsonArray(JOBS_FN).filter(function (j) { return j.id !== jobId; }); // idempotent replace
  jobs.push({
    id: jobId, endpoint: endpoint, keys: sub.keys,
    title: title, body: body, url: url,
    fireAt: new Date(endAt).toISOString(),
    createdAt: new Date().toISOString()
  });
  writeJsonArray(JOBS_FN, jobs);
  res.json({ ok: true, jobId: jobId, fireAt: new Date(endAt).toISOString() });
});

app.post('/api/push/cancel', function (req, res) {
  const jobId = req.body && typeof req.body.jobId === 'string' ? req.body.jobId.trim().slice(0, 64) : '';
  if (!jobId) return res.status(400).json({ error: 'jobId is required' });
  const before = readJsonArray(JOBS_FN);
  const jobs   = before.filter(function (j) { return j.id !== jobId; });
  writeJsonArray(JOBS_FN, jobs);
  res.json({ ok: true, cancelled: before.length - jobs.length });
});

app.get('/api/push/vapid-key', function (req, res) {
  if (!ensureVapid()) return res.status(503).json({ error: 'VAPID not configured' });
  res.json({ publicKey: VAPID_PUBLIC_KEY });
});

// ---- Web Push: scheduler loop ----------------------------------------------
// Polls the job store every 5s, sends everything due, then removes it (cleanup
// after send). Dead subscriptions (404/410) are dropped so we stop retrying.
setInterval(function () {
  if (!ensureVapid()) return;
  const jobs   = readJsonArray(JOBS_FN);
  if (!jobs.length) return;
  const now    = Date.now();
  const due    = jobs.filter(function (j) { return Date.parse(j.fireAt) <= now; });
  if (!due.length) return;
  const pending = jobs.filter(function (j) { return Date.parse(j.fireAt) > now; });

  due.forEach(function (job) {
    const payload = {
      title: job.title, body: job.body, url: job.url,
      icon: '/images/icon-192.png', badge: '/images/icon-192.png', tag: 'frog-focus'
    };
    webpush.sendNotification({ endpoint: job.endpoint, keys: job.keys }, JSON.stringify(payload))
      .then(function () { console.log('[push] sent', job.id, '→', job.title); })
      .catch(function (err) {
        console.error('[push] send failed', job.id, err && err.statusCode, (err && err.body ? err.body.slice(0, 200) : err && err.message));
        if (err && (err.statusCode === 404 || err.statusCode === 410)) {
          const subs = readJsonArray(SUBS_FN).filter(function (s) { return s.endpoint !== job.endpoint; });
          writeJsonArray(SUBS_FN, subs);
          console.log('[push] dropped dead subscription for', job.endpoint);
        }
      });
  });
  writeJsonArray(JOBS_FN, pending);   // cleanup after send attempt
}, 5000);

app.listen(PORT, function () {
  ensureVapid();
  console.log('🐸 Frog Focus backend listening on http://localhost:' + PORT);
  console.log(API_KEY
    ? '   ElevenLabs: configured (voice ' + VOICE_ID + ')'
    : '   ⚠️  ELEVENLABS_API_KEY is missing — copy .env.example to .env and set it.');
  console.log(VAPID_PUBLIC_KEY && VAPID_PRIVATE_KEY
    ? '   Web Push: VAPID configured — notifications are live.'
    : '   ⚠️  Web Push: VAPID keys missing.');
});
