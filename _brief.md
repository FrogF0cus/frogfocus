# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Flat-vector frog mascot — accepted as-is (`frog-face.png` still queued for re-encode).
- Positioning locked: a **productive tool**; tagline "Slow down. Focus. Get the good stuff done."; frog is a **friend/buddy** — this is the core differentiator (niche confirmed by CEO: "almost none of them have a warm, friendly little companion actually cheering you on").
- Voice: warm and encouraging, delivered **fully in-browser** — no ElevenLabs, no backend. Quality bar: **not robotic**; KR-recorded clips are the endorsed path.
- Music/ambient sound: **future idea only**. Web Audio API is the CEO-endorsed route (live-generated brown noise / soft rain / gentle lo-fi hum; looped, subtle, one volume slider, mute toggle). Baked-in royalty-free mp3 loops (Pixabay, YouTube Audio Library) are the documented alternative. **No commitment to build.**
- **Ship gate: voice solved → final QA → ship.**

## Current Status
- **KR's two edits complete and accepted:** (1) cycle pills now read "Short break" — applied; settings label untouched. (2) Long-break frog verified as the correct original (arms raised, round yellow glasses, real transparency) — KR: *"we can just keep it the way it is for now."* ✔
- **Cycle-strip clipping fix shipped** — all eight pills fit one line at desktop widths, wrap cleanly on narrow screens. **KR has NOT yet run the timer cycle to verify** (screenshot confirmed the bug; fix is pending his live check).
- **Product validation moment:** KR asked, *"do you suppose people will actually like this tool and use it?"* — CEO confirmed a real niche: the frog makes it feel like a buddy, not a chore. Positioning reinforced.
- **Audio upload blocker still active** (ref `532d248f-d04e-4539-b6c5-97512c464727`). Filter is confirmed MIME-level; the rename-trick failed identically twice. KR is in wait mode and positive: *"now we just wait for the audio file upload fix and then we're good to go"* / *"this is going to be awesome."*
- **Music options re-laid-out and tabled.** Both paths restated (royalty-free loops with volume/mute toggle vs. Web Audio API live-generated textures); CEO endorsed Web Audio API. KR: *"possible add for the future"* — no decision, no work scheduled, team not briefed. New wrinkle: KR asked about **3-minute audio files looping automatically** — CEO confirmed the browser's loop switch handles seamless looping with zero extra work.
- **`recommendations_v1` (3 items) still unfulfilled** after 50 messages: (1) Apply KR's Five Page Edits (frog-green dark mode, "productive tool" copy, "the what" section, beverage line, recharge copy), (2) Convert `frog-face.png` from JPEG bytes to clean PNG, (3) Live Chrome check that the timer face sits right in the ring.
- **Most urgent open item unchanged:** KR asked to knock out "the last of the remaining edits," but no written to-do list exists. The Five Page Edits are the concrete queued queue — briefed, not applied.
- KR likes gentle nudges — keep steady check-ins while blocked.
- Nothing has landed in `audio/` (1 file, content unverified). `uploads/` holds 14 files, all images.

## Files & Structure
- **Core Page**: `index.html` (66KB) — self-contained single-page app; contains `speakPhrase()` + `PHRASE_AUDIO` map (5 keys → `audio/*.mp4`); per-state frog image wiring (long-break frog verified correct); cycle-pill labels updated; `/* cycle strip */` block reworked for fit/wrap.
- **Audio**: `audio/` (1 file — content unverified; KR's mp4s NOT here yet).
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under .png name, queued for re-encode); `uploads/` (14 files, all images — evidence of MIME-level upload filter).
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
- **Button copy:** all three cycle pills read **"Short break"** — applied; settings label intentionally NOT changed.
- **Long-break frog:** asset already is the original with transparency; KR accepted current rendering — **no further action**.
- **Cycle strip:** eight pills fit one line at desktop, wrap on narrow screens — no truncation; **KR verification pending**.
- **Music direction (if pursued):** **Web Audio API is the endorsed route** — live-generated brown noise / soft rain / gentle lo-fi hum, looped, single volume slider, mute toggle. Royalty-free loops remain the documented alternative. **If KR supplies file-based audio (e.g., 3-min loops), the browser's native loop switch handles seamless repetition with no extra work.** Still future-only; nothing scheduled.
- **Upload blocker: wait for the platform fix.** Rename-trick workaround failed identically twice → MIME-level filter; KR will not pursue further local workarounds.
- **Keep nudging:** KR appreciates reminders — continue gentle check-ins while blocked.

## Pending Decisions
- **Who defines the "remaining edits" list** — KR supplies a written list, or the team proposes the queued Five Page Edits and KR confirms? (KR asked to proceed; the team still has no confirmed list to act from.)
- **Cycle strip verification** — KR to run the timer cycle and confirm all eight pills fit/wrap correctly (fix shipped, unverified).
- **Durable follow-up mechanism** for the platform fix — CEO reminders cap at 6 hours; decide on a scheduled check/poll or platform-team callback.
- **Alternate delivery path while waiting** — Koba places a test clip directly, or wait strictly for the uploader fix?
- **Music feature direction** — if pursued later: Web Audio API ambience (endorsed) vs. baked-in loops (incl. the 3-min loop-file option KR raised); launch feature or post-launch?
- **First-clip codec check** — verify the mp4 codec (AAC/Opus/etc.) plays in Chrome/Safari once the file actually lands.
- **Cadence confirmation** — KR to hard-refresh and confirm the re-applied pacing sounds smooth.
- **Recording commitment** — will KR record the remaining 4 mp4s after the first test passes? Fallback = tuned synth voice already in place.
- **Legacy deletion** — remove `server.js`, `package*.json`, `node_modules/`?
- **TTS-SETUP.md** — rewrite or delete.

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
- [x] Attempt rename-trick workaround (`focus-start.png`) — failed identically twice; ruled out
- [x] Verify and accept long-break asset: original frog already exists with transparency — KR: "keep it the way it is for now"
- [x] Change all three cycle pills to "Short break" — applied; settings label untouched
- [x] Fix cycle strip clipping — pills fit one line at desktop, wrap at narrow widths
- [x] Ship last edit batch: hint-text cleanup, break-sayings swap, voice rework
- [x] Document music/ambience options for KR (Web Audio API live-generated textures endorsed — brown noise, rain, lo-fi hum; royalty-free loops as alternative; 3-min loop files repeat seamlessly via browser loop switch)
- [ ] **Confirm the remaining-edits list with KR** — propose the Five Page Edits for one-click approval, or await KR's written list (most urgent open item)
- [ ] **KR runs the timer cycle to verify the cycle-strip fix** (all eight pills fit/wrap, no clipping)
- [ ] Apply KR's Five Page Edits (brief Koba): frog-green dark mode, "productive tool", "the what", beverage line, recharge copy
- [ ] Re-encode `frog-face.png` from JPEG bytes to clean PNG (brief Koba)
- [ ] Live Chrome check: timer face sits right in the ring before shipping
- [ ] Set a durable follow-up for the platform fix (standing note alone risks missing the 6-hour reminder cap)
- [ ] KR drops `audio/focus-start.mp4` once uploads accept audio
- [ ] Live-browser test in Chrome: clip plays for focus-start key; other 4 keys fall back gracefully; no console errors
- [ ] KR records remaining 4 mp4s using the delivered naming scheme
- [ ] KR hard-refresh listen-back: cadence confirmation + timer face sits right in the ring
- [ ] Update or delete `TTS-SETUP.md`
- [ ] Clean up legacy files (`server.js`, `package*.json`, `node_modules/`)
- [ ] Final QA against ship gate (voice solved → final QA → ship)

## Opportunities
1. **Convert the Five Page Edits into KR's "remaining edits" list and get sign-off in one move.** The team still has no written list despite KR explicitly asking to finish the remaining edits — but `recommendations_v1` already names all five (frog-green dark mode, "productive tool", "the what", beverage line, recharge copy). Presenting them as the concrete to-do list turns the most urgent blocker into an immediate approval + execution round.
2. **Batch all visual work into one Koba pass.** The Five Page Edits, the `frog-face.png` re-encode, and the timer-face live Chrome check all share the same files and QA pass. Bundling collapses the remaining visual work into a single verification round — none of it depends on the audio blocker, so it can ship while KR waits.
3. **Prototype the ambience feature (with a loop demo) while uploads are blocked.** CEO's endorsement is already on record for Web Audio API (zero files needed), and KR's 3-minute-loop question suggests genuine interest in audio ambience. A small demo — brown noise / rain / lo-fi hum with volume + mute, plus a sample 3-min looped file — de-risks the future feature and gives KR something tangible to green-light or defer. Optional but high-leverage during the wait.

## Next Steps
1. Deliver the reconstructed remaining-edits list (Five Page Edits) to KR for confirmation — the explicit request is currently unfulfilled; on approval, Koba applies the batch (Five Page Edits + `frog-face.png` re-encode + timer-face Chrome check).
2. Ask KR to run the timer cycle and confirm the cycle-strip fix (shipped but unverified).
3. Set a durable follow-up mechanism so the platform fix (ref `532d248f-d04e-4539-b6c5-97512c464727`) triggers an immediate "upload is open" ping to KR.
4. Continue gentle nudges per KR's explicit preference.
5. Table the music options — Web Audio API is the endorsed direction if pursued; the 3-min loop-file path is documented; no further action until KR decides (optional prototype per Opportunity 3).
6. When uploads accept audio: KR drops `focus-start.mp4`; Koba verifies bytes/codec and live-tests in Chrome (clip plays for focus-start, others fall back, no console errors).
7. On success, KR records the remaining 4 mp4s using the delivered naming scheme.
8. KR hard-refresh `index.html`: cadence check, timer face in the ring, cycle-strip fit; legacy cleanup + `TTS-SETUP.md` decision; final QA; ship.

---
*Last updated: 2026-08-14T23:10:00Z*