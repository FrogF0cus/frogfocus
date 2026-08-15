# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Flat-vector frog mascot accepted as-is (`frog-face.png` still queued for re-encode — JPEG bytes under a .png name).
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."; frog is a warm **friend/buddy** — CEO-confirmed differentiator: *"almost none of them have a warm, friendly little companion actually cheering you on."*
- Voice: warm, encouraging, "not robotic." KR wants to **choose from a few options** — shortlist now delivered (see Status).
- **Post-launch roadmap locked** (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond is the emotional centerpiece** — frog-themed growth mechanic (lily pads, lotus flowers) where each completed pomodoro grows the pond; ambient touches (rain outside = rain in the pond, fireflies at night); second frog friend at full pond; plus daily streak and pre-focus checklist.
- **Launch strategy (KR-locked): ship the current build first** — pond and roadmap features are update runway. KR: *"launch with what we have and update later."*
- **Music/ambience: future only.** Endorsed route: Web Audio API live generation (brown noise / soft rain / gentle lo-fi hum; looped, one volume slider, mute toggle, auto-duck under voice). 3-minute loop files also viable via the browser's native loop switch.

## Current Status
- **ElevenLabs key validated — voice selection is now the active step (major update).** KR provided a fresh key (`sk_6ed0…c7`); Koba tested it and got a **clean 200 with the full voice library**. Shortlist for a warm, gentle frog companion:
  - **George — Warm, Captivating Storyteller** · `JBFqnCBsd6RMkjVDRZzb` — warm British male, instantly cozy and reassuring. **CEO's top pick.**
  - **Will** — relaxed optimist, gently playful.
  - **Brian** — deep, soothing.
  - Full library available for browsing if KR wants more options.
- **KR is choosing from the shortlist** — *"i want to choose from a few voice options. let me know what you need."* No pick yet.
- **CEO confirmed Koba cannot synthesize a voice from scratch** — external TTS (ElevenLabs/Google/Polly) is the only path; the validated key makes ElevenLabs the live route.
- **Audio-upload platform fix still queued** — but the ElevenLabs path no longer depends on it; two independent routes to voice now exist.
- **Roadmap delivered and celebrated** — KR loved the pond: *"love it. this is going to be awesome."*
- **Launch decision locked:** *"launch with what we have and update later."*
- **Music explored and tabled** — Web Audio API endorsed as the future route.
- **Cycle-strip clipping fix shipped but unverified** — KR has not run the timer cycle to confirm all eight pills fit/wrap.
- **Long-break frog accepted as-is.**
- **`recommendations_v1` (3 items) still unfulfilled** after 50+ messages: (1) Apply KR's Five Page Edits (frog-green dark mode, "productive tool" copy, "the what" section, beverage line, recharge copy), (2) Convert `frog-face.png` to clean PNG, (3) Live Chrome check that the timer face sits right in the ring.

## Files & Structure
- **Roadmap**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; Focus Pond featured.
- **Core Page**: `index.html` (66KB) — self-contained single-page app; contains `speakPhrase()` + `PHRASE_AUDIO` map (5 keys → `audio/*.mp4`); per-state frog image wiring (long-break frog verified correct); cycle-pill labels set to "Short break"; reworked `/* cycle strip */` block for fit/wrap.
- **Audio**: `audio/` (1 file — content unverified; KR's five mp4s NOT yet delivered; ElevenLabs generation is now the live path).
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under .png name, queued for re-encode); `uploads/` (14 files, all images — confirms MIME-level upload filter).
- **Legacy Backend**: `server.js` (5KB) — dormant; the static page never calls it. `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files) — legacy dependencies.
- **Docs**: `TTS-SETUP.md` (4KB) — stale; rewrite for the current in-browser/API approach or delete.
- **Scripts**: `scripts/` (1 file).

## Key Decisions Made
- **Voice path:** fully in-browser TTS, no voice picker — **but the ElevenLabs API is now an active, validated workaround.** Old key was dead; KR's new key returned a clean 200.
- **Voice selection:** KR decides from a shortlist, not CEO-imposed — George is the endorsed top pick.
- **Launch gate:** voice solved → final QA → ship. Two independent paths now: ElevenLabs clips (key validated) or platform upload fix (queued).
- **Scope:** ship current build; Focus Pond + streak + checklist are post-launch.
- **Pond theme:** frog-themed (lily pads, lotus flowers) — approved by KR as the growth mechanic.
- **Music:** future-only; Web Audio API endorsed over file uploads; browser native loop for 3-minute files.
- **Long-break frog:** unchanged, accepted.

## Pending Decisions
- **KR's voice pick** — George (CEO's top pick), Will, Brian, or another from the full library. This is the only thing actively awaiting KR.
- Whether to rewrite or delete `TTS-SETUP.md` (stale vs. current).

## Tasks
- [x] Validate KR's fresh ElevenLabs key (clean 200)
- [x] Pull ElevenLabs voice shortlist (George, Will, Brian + full library)
- [x] Write and save `FROG-FOCUS-ROADMAP.md` with Focus Pond centerpiece
- [x] Lock launch-what-we-have strategy with KR
- [x] Queue audio-upload fix with platform team
- [x] Confirm Koba cannot synthesize voices from scratch (external TTS required)
- [ ] KR selects voice from shortlist
- [ ] Generate five frog phrase clips via ElevenLabs with selected voice
- [ ] Load clips into `PHRASE_AUDIO` (or via upload path when fix lands)
- [ ] Apply KR's Five Page Edits (frog-green dark mode, "productive tool" copy, "the what" section, beverage line, recharge copy)
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Live Chrome check: timer face sits right in the ring
- [ ] Verify cycle-strip pills wrap correctly with KR
- [ ] Rewrite or delete stale `TTS-SETUP.md`
- [ ] Final QA → publish

## Opportunities
1. **Close the voice loop this week.** The key works and the shortlist is on the table — only KR's pick stands between here and generated clips. Offer to produce a one-line sample read in George/Will/Brian so KR can hear the frog before committing; a quick decision unblocks the entire launch gate.
2. **De-risk with a single sample clip first.** Generate one phrase in the chosen voice, let KR approve warmth/tone, then generate the remaining four — avoids burning the full set on a voice that misses the "warm, not robotic" bar.
3. **Use the wait to clear `recommendations_v1`.** The five page edits, frog-face re-encode, and timer-face check are all dependency-free — knocking them out now shrinks final ship QA to audio wiring alone.

## Next Steps
- Nudge KR for the voice pick; offer sample reads to speed the decision.
- Once picked: generate one sample clip → KR sign-off → generate all five → wire into `PHRASE_AUDIO`.
- Run the three `recommendations_v1` items with Koba in parallel while awaiting KR.
- Final QA (plus cycle-strip pill check) → publish.

---
*Last updated: 2026-08-15T14:00:00Z*