# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Flat-vector frog mascot — accepted as-is (`frog-face.png`).
- Positioning locked: a **productive tool**; tagline "Slow down. Focus. Get the good stuff done."; frog is a **friend**.
- Voice: warm and encouraging, delivered **fully in-browser** — no ElevenLabs, no backend. Quality bar: **not robotic**; KR-recorded clips are the endorsed path past the synth ceiling.
- **Ship gate: voice solved → final QA → ship.**

## Current Status
- **KR's two new page edits queued** (new this round):
  1. **Long-break frog is wrong** — KR wants the "original" frog (smiling, round yellow glasses, arms raised) on a **transparent background**. CEO diagnostic finding: the long-break asset file *already matches* the target frog — so the page is likely rendering a *different image* for the long-break state. Fix is probably **wiring in `index.html`** (which image each state renders), not a file swap.
  2. **Three cycle pills read "Short"** — "2 Short", "4 Short", "6 Short" — all must say **"Short break"**. No blockers; CEO will have Koba apply.
- **Voice pipeline rewired and saved** — `say()` replaced with `speakPhrase(key, fallbackText)` plus a `PHRASE_AUDIO` map (5 phrase keys → `audio/*.mp4`). Unrecorded keys auto-fall-back to synth, so the page never breaks.
- **Format landed: MP4** (KR can only produce mp4; browsers play it fine). Naming scheme delivered.
- **Incremental test agreed** — record `focus-start.mp4` first; the other four fall back to synth until recorded.
- **BLOCKER — MIME-level filter confirmed and escalated to platform team (ref `532d248f-d04e-4539-b6c5-97512c464727`).** KR tried the rename trick (`focus-start.png`) → **identical error**. Uploader rejects non-image MIME types. KR has stopped troubleshooting and is waiting for the admin fix.
- **KR explicitly requested a written to-do list of remaining edits** — not yet delivered (immediate open task).
- **Follow-up caveat:** CEO reminders cap at six hours; a standing note was saved, but a durable follow-up mechanism is still needed. KR likes nudges — keep them gentle and steady.
- **Nothing has landed in `audio/`.** `uploads/` holds 13 files, all images (2 new since last brief — the frog reference screenshot and button screenshot).
- Speak model locked — 5 fixed spoken phrases at timer start; break sayings display-only.
- Known asset bug: `frog-face.png` contains JPEG bytes under a `.png` name — queued.
- KR's Five Page Edits (frog-green dark mode, "productive tool", "the what", beverage line, recharge copy) — queued to Koba; live status unconfirmed.

## Files & Structure
- **Core Page**: `index.html` (66KB) — self-contained single-page app; contains `speakPhrase()` + `PHRASE_AUDIO` map; also the per-state frog image wiring (suspect for the long-break frog bug) and the three cycle-pill labels ("2 Short" / "4 Short" / "6 Short" → "Short break").
- **Audio**: `audio/` (1 file — content unverified; KR's mp4s NOT here yet).
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under .png name; long-break frog asset verified as the correct original — transparency intact); `uploads/` (13 files, all images — evidence of the MIME-level filter).
- **Legacy Backend**: `server.js` (5KB) — dormant; static page never calls it.
- **Legacy Dependencies**: `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Docs**: `TTS-SETUP.md` (4KB) — stale; rewrite for in-browser-only setup or delete.
- **Scripts**: `scripts/` (1 file).

## Key Decisions Made
- **Voice path:** fully in-browser TTS. No ElevenLabs, no backend, no voice picker.
- **Custom clips: MP4 container** (KR constraint; browser-supported) — replaces synth per phrase; mp3 dropped.
- **Incremental rollout:** test `focus-start.mp4` before KR records the rest; unrecorded keys fall back to synth so nothing breaks mid-rollout.
- **Speak model:** exactly 5 fixed spoken phrases at timer start; break sayings display-only.
- **Default voice:** Google UK English Female first; pacing smoothed (rate 0.88).
- **Button copy:** all three cycle pills read **"Short break"** — CEO verified all three render locations, no blockers.
- **Long-break frog:** target is the original frog (smiling, round yellow glasses, arms raised) with transparent background; the long-break *asset* already matches — treat as an HTML wiring issue first, not an asset replacement.
- **Upload blocker: wait for the platform fix.** Rename-trick workaround failed identically → filter is MIME-level; KR will not pursue further local workarounds.
- **Cleanup accepted:** picker/ElevenLabs/`server.js` stripping stands; cadence regression fixed and saved.
- **Keep nudging:** KR appreciates reminders — continue gentle check-ins while blocked.

## Pending Decisions
- **Durable follow-up mechanism** for the platform fix — CEO reminders cap at 6 hours; decide on a scheduled check/poll or platform-team callback.
- **Alternate delivery path while waiting** — Koba places a test clip directly, or wait strictly for the uploader fix?
- **First-clip codec check** — verify the mp4 codec (AAC/Opus/etc.) plays in Chrome/Safari once the file actually lands.
- **Cadence confirmation** — KR to hard-refresh and confirm the re-applied pacing sounds smooth.
- **Recording commitment** — will KR record the remaining 4 mp4s after the first test passes? Fallback = tuned synth voice already in place.
- **Legacy deletion** — remove `server.js`, `package*.json`, `node_modules/`?
- **TTS-SETUP.md** — rewrite or delete.
- **Five Page Edits / new frog + button edits** — confirm which are live after Koba applies them.

## Tasks
- [x] Strip ElevenLabs + voice picker from `index.html` (73KB → 65KB)
- [x] Strip `server.js` backend (page is front-end only)
- [x] Bake in British default voice — Google UK English Female first; KR confirmed "the right voice"
- [x] Clarify spoken vs display-only sayings (5 fixed spoken phrases; break sayings display-only)
- [x] Investigate cadence regression (git history proved cleanup reverted rate to 0.95/0.85)
- [x] Re-apply smoother pacing (rate 0.88) and save `index.html`
- [x] Rewire speech: `speakPhrase(key, fallbackText)` + `PHRASE_AUDIO` map (5 keys → `audio/*.mp4`)
- [x] Deliver mp4 naming scheme to KR
- [x] Flag audio-upload blocker with platform team (ref `532d248f-d04e-4539-b6c5-97512c464727`)
- [x] Attempt rename-trick workaround (`focus-start.png`) — failed with identical error; ruled out
- [x] Verify long-break asset: original frog already exists with transparency (arms raised, round yellow glasses) → narrows fix to HTML wiring
- [x] Verify "Short" pill text: all three cycle pills confirmed ("2 Short", "4 Short", "6 Short")
- [ ] **Deliver the written to-do list of remaining edits to KR** (explicitly requested; immediate)
- [ ] **Koba: change all three cycle pills to "Short break"**
- [ ] **Koba: fix long-break frog rendering** — trace which image `index.html` renders per state and point long-break at the correct transparent asset
- [ ] Set a durable follow-up for the platform fix (standing note alone risks missing the 6-hour reminder cap)
- [ ] KR drops `audio/focus-start.mp4` once uploads accept audio
- [ ] Live-browser test in Chrome: clip plays for focus-start key; other 4 keys fall back gracefully; no console errors
- [ ] KR records remaining 4 mp4s using the delivered naming scheme
- [ ] KR hard-refresh listen-back: cadence confirmation + timer face sits right in the ring
- [ ] Re-encode `frog-face.png` from JPEG bytes to clean PNG (brief Koba)
- [ ] Apply/verify KR's Five Page Edits (brief Koba) — batch with the two new edits
- [ ] Update or delete `TTS-SETUP.md`
- [ ] Clean up legacy files (`server.js`, `package*.json`, `node_modules/`)
- [ ] Final QA against ship gate (voice solved → final QA → ship)

## Opportunities
1. **De-risk the voice pipeline with a synthetic clip while uploads are blocked.** The wiring is live but unproven end-to-end. Have Koba generate a tiny test mp4 (or verify the existing `audio/` file) and place it at `audio/focus-start.mp4` via direct file access, then Chrome-test playback, codec compatibility, and fallback behavior. This proves the milestone so the moment KR's real clip lands, the voice path is essentially done.
2. **Batch all visual edits into one Koba pass.** KR's Five Page Edits, the "Short break" pill text, the long-break frog wiring fix, and the `frog-face.png` re-encode all touch the same files. Bundling them collapses the QA path to one verification round — and none of them depend on the audio blocker.
3. **Run the full QA sweep during the wait.** The visual edits, frog re-encode, and timer-face live check don't depend on the audio file. Executing the queued recommendations now collapses the post-upload path to just: record clips → final QA → ship.

## Next Steps
1. Deliver the concrete written to-do list of remaining edits to KR (explicit request, currently unfulfilled).
2. Koba applies the batched visual edits: three "Short break" pills, long-break frog wiring fix, Five Page Edits, `frog-face.png` re-encode.
3. Koba runs the synthetic-clip test (`audio/focus-start.mp4`) to prove the pipeline while KR waits — or KR delivers the mp4 via an alternate route.
4. Set a durable follow-up mechanism so the platform fix (ref `532d248f-d04e-4539-b6c5-97512c464727`) triggers an immediate "upload is open" ping to KR.
5. When uploads accept audio: KR drops `focus-start.mp4`; Koba verifies bytes/codec and live-tests in Chrome (clip plays for focus-start, others fall back, no console errors).
6. On success, KR records the remaining 4 mp4s using the delivered naming scheme.
7. KR hard-refresh `index.html`: cadence check + timer face in the ring; legacy cleanup + `TTS-SETUP.md` decision; final QA; ship.

---
*Last updated: 2026-08-14T19:25:00Z*