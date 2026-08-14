# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**, inspired by pomodorokitty.com, not a clone.
- Flat-vector frog mascot — accepted as-is; no further iteration.
- Positioning locked: a **productive tool**; tagline "Slow down. Focus. Get the good stuff done."; frog is a **friend**.
- Timer voice: warm and encouraging — **resolved**: picker and ElevenLabs stripped; single baked-in British browser voice (Daniel / Google UK English), no options.
- Ship gate: **voice solved → ship.** Voice is now implemented; final QA remains before shipping.

## Current Status
- **Voice simplification is complete.** Developer finished the four low-risk removals (voice-picker CSS, HTML, dead `populateVoiceSelect`/`checkNeuralTTS` calls) and swapped the big JS block: all ElevenLabs TTS + voice-selection machinery replaced with a baked-in British default. `index.html` dropped 73KB→65KB and saved successfully.
- **`server.js` stripped.** Since the static page never called it, the backend was also reduced/removed — the page now speaks entirely from front-end code. KR was informed and accepted ("thanks koba. apologies for the duplicate work").
- **Cadence investigation closed.** Rate (0.95) and pitch (0.85) were never changed by the cleanup — only the voice picker, which had been forcing British. The bake-in now makes that the permanent default.
- Root cause confirmed: previous default logic preferred **American** voices (David/Mark/Guy → Google US → en-US → en). The original "British" voice KR remembered was simply the browser's free built-in Daniel / Google UK English — no custom voice existed.
- Three break-saying copy swaps shipped earlier: "Blink slow, little frog" → "Close your eyes, slow count"; "A sip for the pond, pal" → "Refill the cup, then back"; "You earned the big one" → "The grand rest — take it".
- Frog PNG fix shipped previously; the JPEG-bytes-under-PNG re-encode is still queued.

## Files & Structure
- **Core Page**: `index.html` (65KB) — entire single-page app; now fully self-contained for TTS, voice-picker removed, British default baked in.
- **Backend (legacy, stripped)**: `server.js` (5KB) — previously an ElevenLabs proxy holding Antoni at `/api/tts`; stripped since the static page never used it. Remove or leave dormant pending cleanup decision.
- **Documentation**: `TTS-SETUP.md` (4KB) — stale; needs rewrite or deletion.
- **Static Assets**: `images/` (8 files — `frog-face.png` is JPEG bytes under a .png name), `audio/` (1 file), `uploads/` (10 files).
- **Dependencies (legacy)**: `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files) — only existed to run `server.js`.
- **Scripts**: `scripts/` (1 file).

## Key Decisions Made
- **Voice**: remove picker + ElevenLabs entirely; bake in one British browser default (Daniel / Google UK English), no options — mirrors the original KR remembered.
- **Backend**: `server.js` stripped mid-session — page is now a true static client.
- **Mascot**: accept current frog ("it's the wrong frog but let's just roll with it").
- **Copy**: three break sayings swapped exactly as specified; all others untouched.
- **Ship gate**: voice solved → ship, pending final live QA.

## Pending Decisions
- **Legacy cleanup**: delete `server.js` + `node_modules` + `package*.json` + `TTS-SETUP.md` to complete the static-site transition, or leave dormant? (Recommend deleting.)
- **Batch scope**: bundle KR's Five Page Edits into the same release now that voice is implemented, or ship voice first and edits in a second pass?

## Tasks
- [x] Swap three break sayings in `index.html`
- [x] Fix frog PNG asset (accepted by KR)
- [x] Strip voice-picker CSS, HTML, and dead `populateVoiceSelect`/`checkNeuralTTS` calls from `index.html`
- [x] Replace the big JS block: ElevenLabs TTS + voice-selection machinery → baked-in British default
- [x] Strip `server.js` (page now speaks purely from front-end)
- [ ] Apply KR's Five Page Edits: frog-green dark mode, "productive tool" positioning, "the what" section, beverage line, recharge copy
- [ ] Re-encode `frog-face.png` to a true PNG
- [ ] Open `index.html` in Chrome: confirm the timer face sits correctly inside the ring
- [ ] Run a final live cycle: British voice + updated break sayings
- [ ] Remove stale `TTS-SETUP.md` + `server.js` + node dependencies (if cleanup approved)
- [ ] Ship after KR confirms the voice

## Opportunities
1. **Go fully static (nearly done)** — voice is baked in and `server.js` is stripped. Deleting the leftover node dependencies, `package*.json`, `server.js`, and `TTS-SETUP.md` yields a single self-contained file: trivial hosting, no API keys, no backend-fallback bugs.
2. **Batch the queued edits into one ship** — KR's Five Page Edits are pre-approved; applying them now while the file is fresh avoids a second review cycle. Voice is already the gate, so one release is realistic.
3. **Cache-bust assets** — versioned filenames (`?v=` or hashes) prevent the stale-PNG friction that cost a hard-refresh reminder this session.

## Next Steps
- Open `index.html` in Chrome: confirm British voice plays and the timer face is centered in the ring.
- Dispatch the Five Page Edits + `frog-face.png` re-encode.
- Decide on legacy-file cleanup; if deleting, remove `server.js`, `TTS-SETUP.md`, and node dependencies.
- Final live cycle (British voice + break sayings), then ship after KR's confirmation.

---
*Last updated: 2026-08-14T17:23Z*