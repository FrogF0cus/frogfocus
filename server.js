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

// ---- Cache helpers ---------------------------------------------------------
function cacheFileFor(text) {
  const hash = crypto.createHash('sha256').update(VOICE_ID + '::' + text).digest('hex');
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

  const file = cacheFileFor(text);

  // Serve the cached mp3 if this exact phrase was already synthesized.
  if (fs.existsSync(file)) {
    res.set('Content-Type', 'audio/mpeg');
    res.set('X-TTS-Cache', 'hit');
    return fs.createReadStream(file).pipe(res);
  }

  try {
    const upstream = await fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(VOICE_ID),
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
      const errText = await upstream.text().catch(function () { return ''; });
      console.error('[tts] ElevenLabs error', upstream.status, errText.slice(0, 300));
      return res.status(502).json({ error: 'ElevenLabs upstream error', status: upstream.status });
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

app.listen(PORT, function () {
  console.log('🐸 Frog Focus TTS backend listening on http://localhost:' + PORT);
  console.log(API_KEY
    ? '   ElevenLabs: configured (voice ' + VOICE_ID + ')'
    : '   ⚠️  ELEVENLABS_API_KEY is missing — copy .env.example to .env and set it.');
});
