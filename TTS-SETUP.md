# Frog Focus — ElevenLabs TTS backend

A tiny, secure Node/Express backend that upgrades the frog's voice from the
browser's robotic `speechSynthesis` to a warm ElevenLabs neural voice, while
**never exposing the API key to the client**.

The ElevenLabs key lives server-side only. Each unique phrase is synthesized
**once** and cached as an mp3 on disk; every later request serves the cached
file, so a public page does not re-spend credit per visitor.

---

## Quick start

```bash
# 1. Install (Node 18+ required)
npm install

# 2. Create your local env file and paste your real key
cp .env.example .env
#    → edit .env and set ELEVENLABS_API_KEY=sk_...

# 3. Run
npm start
#    → open http://localhost:8787
```

That's it. The same server serves `index.html` **and** `/api/tts`, so the
frontend's default same-origin call just works with no CORS or URL setup.

> **Rotate your key.** The key pasted in chat (`sk_9001...`) should be
> considered compromised — generate a fresh one at
> https://elevenlabs.io/app/settings/api-keys before you go live.

---

## Environment variables

Set these in `.env` (local dev) or as real environment variables (production).

| Variable               | Required | Default                | Purpose                              |
| ---------------------- | -------- | ---------------------- | ------------------------------------ |
| `ELEVENLABS_API_KEY`   | ✅ yes    | *(none)*               | Your ElevenLabs API key. Never commit. |
| `ELEVENLABS_VOICE_ID`  | no       | `ErXwobaYiN019PkySvjV` | Voice id (default: Antoni — warm, friendly). |
| `ELEVENLABS_MODEL_ID`  | no       | `eleven_turbo_v2_5`    | Synthesis model (fast + cheap).      |
| `PORT`                 | no       | `8787`                 | Port the server listens on.          |

Recommended voices (swap `ELEVENLABS_VOICE_ID` to taste):

- **Antoni** `ErXwobaYiN019PkySvjV` — warm, reassuring, friend-like *(default)*
- **Adam** `pNInz6obpgDQGcFmaJgB` — deeper, calm American male
- **Rachel** `21m00Tcm4TlvDq8ikWAM` — warm, gentle American female
- **Charlie** `IKne3meq5aSn9XLyUdCD` — natural, easygoing male

---

## API

### `POST /api/tts`
Body: `{ "text": "Here we go. Time to focus…" }`

Returns `audio/mpeg`. Sets `X-TTS-Cache: hit` when served from disk and
`X-TTS-Cache: miss` the first time a phrase is synthesized.

### `GET /api/tts/health`
Returns `{ "configured": true, "voice": "ErXwobaYiN019PkySvjV" }`. Free — no
synthesis, no credit. The frontend uses this to decide whether to show the
"neural voice connected" note.

---

## Caching & cost

- Cache key = `sha256(voice_id + "::" + text)`, stored as `.tts-cache/<hash>.mp3`.
- There are exactly **5 fixed phrases** the frog speaks, so after the first
  pass through a full pomodoro cycle you'll have at most 5 tiny mp3s cached —
  roughly a few seconds of ElevenLabs credit **total**, regardless of how many
  visitors use the page.
- To re-synthesize (e.g. after changing voice or model), delete `.tts-cache/`.
- `.tts-cache/` and `.env` are both git-ignored.

---

## Deploying to your VPS (optional)

Run the backend on your sandbox and point a static/public frontend at it:

```bash
# On the VPS (as root): clone/copy the project, then as the empir3 user run
npm install
ELEVENLABS_API_KEY=sk_your_new_key npm start
```

If `index.html` is hosted **separately** from this server, tell the frontend
where the backend lives by setting a global before the page script runs:

```html
<script>window.__FF_TTS_BASE = 'https://your-backend-host/api/tts';</script>
```

(or edit the `TTS_API` constant in `index.html`). The server already sends
permissive CORS headers for cross-origin calls.

---

## Security notes

- The key is read only from `process.env.ELEVENLABS_API_KEY` — never hardcoded,
  never committed (`.env` is git-ignored, `.env.example` is a blank template).
- The server serves **only** `index.html`, `images/`, and `uploads/` — it does
  **not** serve `server.js`, `package.json`, `.env`, or the cache directory.
