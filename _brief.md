# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Flat-vector frog mascot — accepted as-is (`frog-face.png`).
- Positioning locked: a **productive tool**; tagline "Slow down. Focus. Get the good stuff done."; frog is a **friend**.
- Voice: warm and encouraging, delivered **fully in-browser** — no ElevenLabs, no backend, no server dependency. Quality bar: **not robotic**. KR-recorded clips are the endorsed path past the synth ceiling.
- **Ship gate: voice solved → final QA → ship.**

## Current Status
- **Architecture locked:** fully in-browser TTS; `server.js` dormant (static page never calls it).
- **Custom voice pipeline WIRED and LIVE** in `index.html` — `say()` replaced with `speakPhrase(key, fallbackText)` plus a `PHRASE_AUDIO` map (5 keys → `audio/*.mp4`). Unrecorded keys automatically fall back to the synth voice, so the page never breaks.
- **BLOCKER — upload window rejects audio files.** KR cannot get the mp4 into the project; every successful upload so far is a `.png` (10 files in `uploads/`). CEO suspects a silent non-image file-type filter or an mp4 size cap (phone-recorded mp4s run large). KR is troubleshooting on her end; the file is not in the project.
- **Format decision landed: MP4** (KR can only produce mp4; browsers play it fine). Naming scheme delivered (mp3 dropped):
  - `audio/focus-start.mp4`, `audio/short-break.mp4`, `audio/long-break.mp4` (+ 2 more keys in `PHRASE_AUDIO`)
- **Incremental test agreed** — KR records **only `focus-start.mp4` first** ("Here we go. Time to focus — and you've got this. I'm rooting for you."); the other four fall back to synth until recorded. **Awaiting that single file — currently blocked by upload.**
- **Speak model locked** — break sayings ("Close your eyes, slow count…") are **display-only**; the frog speaks exactly **5 fixed phrases**, only at the start of each timer (explicitly confirmed with KR).
- **Voice preference landed** — Google UK English Female first; pacing re-applied at rate 0.88. Final ear-confirmation via hard refresh still open.
- **Known asset bug:** `frog-face.png` contains JPEG bytes under a `.png` name — queued.
- **KR's Five Page Edits** (frog-green dark mode, "productive tool", "the what", beverage line, recharge copy) — live status unconfirmed.

## Files & Structure
- **Core Page**: `index.html` (66KB) — fully self-contained single-page app; contains `speakPhrase()` + `PHRASE_AUDIO` map; latest voice/pacing/clip-wiring saved.
- **Audio**: `audio/` (1 file — content unverified; KR's mp4s are NOT in the project yet).
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under a .png name); `uploads/` (10 files, all images — evidence the upload window is image-only).
- **Legacy Backend**: `server.js` (5KB) — dormant; static page never calls it.
- **Legacy Dependencies** (exist only to run dormant server): `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Docs**: `TTS-SETUP.md` (4KB) — stale; rewrite for in-browser-only setup or delete.
- **Scripts**: `scripts/` (1 file).

## Key Decisions Made
- **Voice path:** fully in-browser TTS. No ElevenLabs, no backend, no voice picker.
- **Custom clips: MP4 container** (KR constraint; browser-supported) — replaces the synth per phrase; mp3 dropped.
- **Incremental rollout:** test `focus-start.mp4` before KR records the rest; unrecorded keys fall back to synth so nothing breaks mid-rollout.
- **Speak model:** exactly 5 fixed spoken phrases at timer start; break sayings display-only.
- **Default voice:** British — Google UK English Female first; pacing smoothed (rate 0.88).
- **Cleanup accepted:** picker/ElevenLabs/`server.js` stripping stands; cadence regression fixed and saved.

## Pending Decisions
- **Upload workaround** — if KR can't fix the upload on her end: compress the mp4 (size cap?), extend the upload white-list to `audio/*`, or use an alternate delivery path for the first test file.
- **First-clip codec check** — verify the mp4 codec (AAC/Opus/etc.) plays in Chrome/Safari once the file actually lands.
- **Cadence confirmation** — KR to hard-refresh and confirm the re-applied pacing sounds smooth.
- **Recording commitment** — will KR record the remaining 4 mp4s after the first test passes? Fallback = tuned synth voice already in place.
- **Legacy deletion** — remove `server.js`, `package*.json`, `node_modules/`?
- **TTS-SETUP.md** — rewrite or delete.
- **Five Page Edits** — confirm which are live; apply the rest.

## Tasks
- [x] Strip ElevenLabs + voice picker from `index.html` (73KB → 65KB)
- [x] Strip `server.js` backend (page is front-end only)
- [x] Bake in British default voice — Google UK English Female first; KR confirmed "the right voice"
- [x] Clarify spoken vs display-only sayings (5 fixed spoken phrases; break sayings display-only)
- [x] Investigate cadence regression (git history proved cleanup reverted rate to 0.95/0.85)
- [x] Re-apply smoother pacing and save `index.html`
- [x] Rewire speech: `speakPhrase(key, fallbackText)` + `PHRASE_AUDIO` map (5 keys → `audio/*.mp4`)
- [x] Deliver mp4 naming scheme to KR
- [ ] **Unblock audio upload** — diagnose why the upload window rejects non-image files / large mp4s; KR troubleshooting on her end
- [ ] KR drops `audio/focus-start.mp4` ("Here we go. Time to focus — and you've got this. I'm rooting for you.")
- [ ] Live-browser test in Chrome: clip plays for focus-start key; other 4 keys fall back gracefully; no console errors
- [ ] KR records remaining 4 mp4s using the delivered naming scheme
- [ ] KR hard-refresh listen-back: cadence confirmation + timer face sits right in the ring
- [ ] Re-encode `frog-face.png` from JPEG bytes to clean PNG
- [ ] Verify KR's Five Page Edits; apply any missing
- [ ] Update or delete `TTS-SETUP.md`
- [ ] Clean up legacy files (`server.js`, `package*.json`, `node_modules/`)
- [ ] Final QA against ship gate (voice solved → final QA → ship)

## Opportunities
1. **Unblock the upload, then de-risk with one clip.** The entire voice milestone hinges on getting `focus-start.mp4` into `audio/`. Since every upload so far is a `.png`, the fastest paths: (a) KR re-records/compresses to a smaller mp4 (<5MB) and retries, (b) Koba extends the upload white-list to `audio/*` plus a generous size cap, or (c) test the pipeline via an alternate delivery route. One working clip proves the entire pipeline — file placement, mp4 codec playback, and fallback behavior — before KR invests in the remaining 4.
2. **Run the QA sweep while the upload is blocked.** The Five Page Edits, `frog-face.png` re-encode, and timer-face check don't depend on the audio file — clear them now so the moment the 5 clips land, final QA and ship go immediately.
3. **Codec + size one-liner for KR.** When the first clip lands, run a quick ffprobe/mediainfo check on codec (AAC/Opus), bitrate, and duration so KR knows exactly what her recorder produces — and offer a tiny ffmpeg compress/convert command so the remaining 4 recordings come in at a safe size with no upload friction.

## Next Steps
1. KR troubleshoots the upload rejection (file type / size) — or Koba extends the upload white-list; verify `audio/` can accept an mp4.
2. KR drops `audio/focus-start.mp4` (exact script: "Here we go. Time to focus — and you've got this. I'm rooting for you.").
3. Koba live-tests in Chrome: clip plays for the focus-start key; other 4 keys fall back to synth; confirm no console errors.
4. On success, KR records the remaining 4 mp4s using the delivered naming scheme.
5. KR hard-refresh `index.html`: cadence check + timer face in the ring.
6. Re-encode `frog-face.png`; confirm/apply the Five Page Edits; legacy cleanup + `TTS-SETUP.md` decision; final QA; ship.

---
*Last updated: 2026-08-14T18:28:35Z*