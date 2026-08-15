# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** — CEO-confirmed differentiator: *"almost none of them have a warm, friendly little companion actually cheering you on."*
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging, "not robotic" — **narrowed to an American male accent** (KR). Candidates in hand: **Will** (relaxed optimist) and **Brian** (deep, resonant). George (British) deprioritized.
- **Post-launch roadmap locked** (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond** centerpiece — frog-themed growth (lily pads, lotus flowers) where each completed pomodoro grows the pond; ambient touches (rain outside = rain in the pond, fireflies at night); second frog friend at full pond; daily streak; pre-focus checklist.
- **Launch strategy (KR-locked): ship the current build first** — pond and roadmap features are update runway.
- **Music/ambience: future only.** Web Audio API endorsed (brown noise / soft rain / gentle lo-fi hum; one volume slider, mute toggle, auto-duck under voice).

## Current Status
- **Voice selection is the live gate — and the test clips have finally landed.** Koba generated both on disk:
  - **Will — Relaxed Optimist** · `audio/preview/will.mp3` · ~63 KB (`bIHbv24MWmeRgasZH58o`)
  - **Brian — Deep, Resonant** · `audio/preview/brian.mp3` (`nPczCjzI2devNBz1zQrb`)
  - Same phrase for both: *"Here we go. Time to focus — and you've got this. I'm rooting for you."* — ready for KR's side-by-side pick.
- **Stall bug flagged by KR and logged:** status box showed "done" but nothing landed (same pattern that delayed Will/Brian twice). Logged for the next fix round as ref `45e389f7`. Admin thanks for chat search logged as ref `c0524885`.
- **ElevenLabs key is valid** — clean 200, full voice library pulled; shortlist curation worked.
- Launch-what-we-have strategy locked; audio-upload platform fix still queued with the platform team (separate from the ElevenLabs path).
- **`recommendations_v1` (3 items) still unfulfilled** after 50+ messages: (1) KR's Five Page Edits, (2) `frog-face.png` re-encode, (3) timer-face Chrome check. Cycle-strip pill wrap unverified.
- Note: the file-count snapshot shows `audio/` (1 file) — that predates the developer's confirmation of both preview clips; `audio/preview/` now holds Will, Brian, and older clips (Adam, Antoni, Josh).

## Files & Structure
- **Roadmap**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; Focus Pond featured.
- **Core Page**: `index.html` (66KB) — self-contained single-page app; contains `speakPhrase()` + `PHRASE_AUDIO` map (5 keys → `audio/*.mp4`); per-state frog image wiring (long-break frog verified); cycle-pill labels set to "Short break"; reworked `/* cycle strip */` block for fit/wrap.
- **Audio**: `audio/preview/` — **will.mp3 (~63KB) and brian.mp3 (both generated and confirmed on disk)** plus older preview clips; KR's five phrase clips still pending.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under .png name, queued for re-encode); `uploads/` (14 files, all images — confirms MIME-level upload filter).
- **Legacy Backend** (dormant — static page never calls it): `server.js` (5KB), `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Docs**: `TTS-SETUP.md` (4KB) — stale; rewrite for the current API approach or delete.
- **Scripts**: `scripts/` (2 files).

## Key Decisions Made
- **Accent:** American male (KR) — George (British) deprioritized.
- **Test-clip order:** Will first, then Brian — both now generated with the **same phrase** for a clean side-by-side comparison.
- **Voice path:** ElevenLabs API validated (fresh key → clean 200); in-browser TTS and platform upload fix are independent alternative routes.
- **Voice selection:** KR decides from the two test clips.
- **Scope:** ship current build; Focus Pond + streak + checklist are post-launch.
- **Pond theme:** frog-themed (lily pads, lotus flowers) — approved by KR.
- **Music:** future-only; Web Audio API endorsed over file uploads.
- **Workload log:** stall bug (ref `45e389f7`) queued for next fix round; admin thanks logged (ref `c0524885`).
- **Launch gate:** voice solved → final QA → ship.

## Pending Decisions
- **KR's voice pick — Will vs. Brian**, from the two test clips now on disk. Sole active gate.
- Whether to rewrite or delete stale `TTS-SETUP.md`.

## Tasks
- [x] Validate ElevenLabs key (clean 200, full voice library)
- [x] Pull voice shortlist; narrow to American male (Will + Brian)
- [x] Confirm Koba cannot synthesize voices from scratch (external TTS required)
- [x] **Generate test clips for Will and Brian** — both landed in `audio/preview/`, same phrase
- [x] Write and save `FROG-FOCUS-ROADMAP.md` with Focus Pond centerpiece
- [x] Lock launch-what-we-have strategy with KR
- [x] Queue audio-upload fix with platform team
- [x] Log stall bug (ref `45e389f7`) and admin thanks (ref `c0524885`)
- [ ] **KR listens to Will + Brian and picks a voice**
- [ ] Generate five frog phrase clips with the selected voice
- [ ] Load clips into `PHRASE_AUDIO` (or via upload path when fix lands)
- [ ] Apply KR's Five Page Edits (frog-green dark mode, "productive tool" copy, "the what" section, beverage line, recharge copy)
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Live Chrome check: timer face sits right in the ring
- [ ] Verify cycle-strip pills wrap correctly with KR
- [ ] Rewrite or delete stale `TTS-SETUP.md`
- [ ] Final QA → publish

## Opportunities
1. **Close the voice pick this round.** Test clips are on disk and share the same phrase — put them in front of KR immediately. One decision unblocks the entire launch gate. Given the stall pattern, verify the files are actually in `audio/preview/` before reporting done (the `45e389f7` bug made this a real risk).
2. **Pre-stage the five phrase scripts** so the moment KR picks Will or Brian, generating and wiring all five clips is a single dispatch — no dead time between pick and launch-ready audio.
3. **Clear `recommendations_v1` while KR listens.** The five page edits, `frog-face.png` re-encode, and timer-face Chrome check are all dependency-free — knocking them out shrinks final ship QA to audio wiring alone.

## Next Steps
- Deliver will.mp3 / brian.mp3 to KR for the pick; offer the same-phrase side-by-side to make it fast.
- Once picked: sample sign-off → generate all five phrases → wire into `PHRASE_AUDIO`.
- Run the three `recommendations_v1` items with Koba in parallel.
- Final QA (plus cycle-strip pill check) → publish.

---
*Last updated: 2026-08-15T15:30:00Z*