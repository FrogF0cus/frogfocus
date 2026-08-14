# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Flat-vector frog mascot — accepted as-is (`frog-face.png`).
- Positioning locked: a **productive tool**; tagline "Slow down. Focus. Get the good stuff done."; frog is a **friend**.
- Voice: warm and encouraging, delivered **fully in-browser** — no ElevenLabs, no backend, no server dependency. Quality bar: **not robotic** (KR's repeated feedback). KR-recorded clips are now the endorsed path past the synth ceiling.
- Ship gate: **voice solved → final QA → ship.**

## Current Status
- **Architecture locked:** fully in-browser TTS. ElevenLabs wiring, voice-picker UI, and dead JS stripped from `index.html` (73KB → 65KB). `server.js` dormant — the static page never calls it.
- **Voice preference LANDED** — Google UK English Female first; KR confirmed "the right voice."
- **Pacing regression INVESTIGATED and FIXED** — git history proved the cleanup had silently reverted rate/pitch to 0.95/0.85; Koba re-applied the smoother pacing and saved `index.html`. Duplicate-work resolved (KR thanked Koba; no redo pending). Final listen-back confirmation still open.
- **Speak model LOCKED** — break sayings ("Close your eyes, slow count…") are **display-only**; the frog speaks exactly **5 fixed phrases** at the start of each timer. Recording scope = these 5 phrases only.
- **Custom-clip plan now IN MOTION** — KR offered mp3/mp4 files; CEO endorsed (mp3 ideal) and dispatched Koba to wire the frog for KR's clips **with a safe synth fallback** until recordings arrive.
- **Naming scheme REQUESTED** — KR explicitly asked for naming schemes for the clips; pending delivery.
- **Known asset bug:** `frog-face.png` contains JPEG bytes under a `.png` name — still queued.
- **KR's Five Page Edits** (frog-green dark mode, "productive tool", "the what", beverage line, recharge copy) — landing status still unconfirmed.

## Files & Structure
- **Core Page**: `index.html` (65KB) — fully self-contained single-page app; front-end TTS only; British default baked in; latest voice/pacing edits saved.
- **Legacy Backend**: `server.js` (5KB) — dormant; static page never calls it.
- **Documentation**: `TTS-SETUP.md` (4KB) — stale; rewrite for in-browser-only setup or delete.
- **Audio**: `audio/` (1 file) — eventual home for KR's 5 recorded clips.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under .png name); `uploads/` (10 files).
- **Legacy Dependencies** (exist only to run dormant server): `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Scripts**: `scripts/` (1 file).

## Key Decisions Made
- **Voice path:** fully in-browser TTS. No ElevenLabs, no backend, no voice picker.
- **Default voice:** British — Google UK English Female first; confirmed by KR.
- **Speak model:** 5 fixed spoken phrases at timer start; break sayings display-only.
- **Custom audio path endorsed:** KR's mp3s will replace the synth; Koba to wire with safe fallback so the page works before recordings arrive.
- **Clip scope locked** to spoken phrases only, per KR's clarification.
- **Cleanup accepted:** picker/ElevenLabs/`server.js` stripping stands; the regression was fixed and saved.

## Pending Decisions
- **Naming scheme for the 5 spoken clips** — KR asked; Koba to deliver (e.g., `spoken-01.mp3`…`spoken-05.mp3` or phrase-based names).
- **Cadence confirmation** — KR to hard-refresh and confirm the re-applied pacing sounds smooth.
- **Recording commitment** — will KR record the 5 mp3s? Fallback = tuned synth voice already in place.
- **Legacy deletion** — remove `server.js`, `package*.json`, `node_modules/`?
- **TTS-SETUP.md** — rewrite or delete.
- **Five Page Edits** — confirm which are live; apply the rest.

## Tasks
- [x] Strip ElevenLabs + voice picker from `index.html` (73KB → 65KB)
- [x] Strip `server.js` backend (page is front-end only)
- [x] Bake in British default voice — Google UK English Female first; confirmed "the right voice"
- [x] Clarify spoken vs display-only sayings (5 fixed spoken phrases; break sayings display-only)
- [x] Investigate cadence regression (git history proved cleanup reverted rate to 0.95/0.85)
- [x] Re-apply smoother pacing and save `index.html` (duplicate-work resolved; KR thanked Koba)
- [ ] KR hard-refresh listen-back to confirm cadence is smooth again
- [ ] Deliver the clip naming scheme to KR (explicitly requested)
- [ ] Wire frog to play KR's mp3s with synth fallback (Koba dispatched; in progress)
- [ ] KR records the 5 spoken phrases as mp3s
- [ ] Re-encode `frog-face.png` from JPEG bytes to clean PNG
- [ ] Live-browser verify timer face in Chrome
- [ ] Verify KR's Five Page Edits; apply any missing
- [ ] Update or delete `TTS-SETUP.md`
- [ ] Clean up legacy files (`server.js`, `package*.json`, `node_modules/`)
- [ ] Final QA against ship gate (voice solved → final QA → ship)

## Opportunities
1. **KR-recorded voice clips (highest leverage, now in motion).** Koba is wiring the frog for custom clips with a safe fallback. KR asked for naming schemes — delivering clean, phrase-based names (e.g., `start-work.mp3`, `start-break.mp3`) makes the drop-in path frictionless and keeps scope tight at the 5 spoken phrases. This is the only real route past the robotic ceiling.
2. **Quick cadence verification win.** The pacing fix is saved but unconfirmed by ear. One hard-refresh listen closes the loop and de-risks the ship gate; if it still feels clipped, the tuning knob is small and isolated.
3. **Legacy cleanup for a truthful "fully in-browser" story.** Delete `server.js`, `package*.json`, `node_modules/` (71 files), re-encode `frog-face.png`, and refresh `TTS-SETUP.md` — shrinks surface area and makes the static-page architecture true end-to-end before ship.

## Next Steps
1. Koba delivers the naming scheme for the 5 spoken clips to KR.
2. KR records the 5 mp3s; Koba wires the frog to play them (fallback stays until files land).
3. KR hard-refreshes `index.html` in Chrome to confirm cadence + timer face.
4. Re-encode `frog-face.png` to clean PNG.
5. Verify KR's Five Page Edits; apply any missing.
6. Decide legacy deletion + `TTS-SETUP.md`; run final QA; ship.

---
*Last updated: 2026-08-14T17:52:28Z*