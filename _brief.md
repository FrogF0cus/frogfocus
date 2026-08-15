# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** — CEO-confirmed differentiator: *"almost none of them have a warm, friendly little companion actually cheering you on."*
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging, "not robotic" — **American male**, now **locked to Will**. KR: *"that was my pick too. yes, let's go with it."*
- **Post-launch roadmap** (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond** centerpiece — frog-themed growth (lily pads, lotus flowers); ambient touches (rain, fireflies); second frog friend at full pond; daily streak; pre-focus checklist.
- **Launch strategy (KR-locked): ship the current build first** — pond and roadmap features are update runway. KR is eager: *"now we just gotta launch it soon. hope others find it helpful in their day."*

## Current Status
- **Voice decided: Will.** KR confirmed the CEO's recommendation on the spot. The frog's voice is no longer a pending decision — it's an execution task.
- **The wiring gap is now the critical path.** The app references 5 clips (`audio/focus-start`, `audio/short-break`, `audio/long-break`, `audio/short-back`, `audio/long-back`) that **don't exist yet** — the frog silently falls back to the robotic browser voice. CEO wrote `scripts/generate-will-clips.js` and is tracing `speakPhrase()` + `PHRASE_AUDIO` mapping to generate those exact 5 lines with Will.
- **Runner-up voice menu exists** (all library-verified, same test phrase): **Brian** — Deep, Resonant; **Eric** — Smooth, Trustworthy; **Adam** — Deep, Calm (accent unconfirmed). **Charlie disqualified** (Australian); Ryan/James don't exist on the account; Dave paywalled. Menu is moot unless Will's clips fail.
- **Koba stalled a third time** — CEO now generates directly via scripts; stall bug queued as ref `45e389f7`. Admin-thanks relay logged separately (ref `c0524885`).
- **`recommendations_v1` batch (3 items) failed/expired** at the 50-message window (`fail_ts` set): KR's Five Page Edits, `frog-face.png` re-encode, timer-face Chrome check. Needs re-queue.

## Files & Structure
- **Roadmap**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; Focus Pond featured.
- **Core Page**: `index.html` (66KB) — self-contained single-page app; contains `speakPhrase()` + `PHRASE_AUDIO` map (5 keys → the missing `audio/*` clips); per-state frog image wiring; cycle-pill labels set to "Short break"; reworked `/* cycle strip */` block.
- **Scripts** (`scripts/`, 4 files):
  - `generate-will-clips.js` — **newest; the live track** — generates the 5 frog phrase clips with Will.
  - `generate-more-clips.js` — produced the candidate voice menu (Charlie/Adam batch, then verified American males).
  - 2 pre-existing scripts (earlier clip generation).
- **Audio**: `audio/` (1 top-level file) + `audio/preview/` — candidate clips (will.mp3, brian.mp3, eric.mp3, charlie.mp3, adam.mp3, + 3 more American males); legacy clips (Antoni, Josh, earlier Adam) need cleanup; the 5 final phrase clips are **not yet generated**.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under .png name, queued for re-encode); `uploads/` (14 files, all images — confirms MIME-level upload filter).
- **Legacy Backend** (dormant — static page never calls it): `server.js` (5KB), `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Docs**: `TTS-SETUP.md` (4KB) — stale; rewrite or delete.

## Key Decisions Made
- **Voice locked: Will** (Relaxed Optimist) — KR and CEO independently landed on him; warm, relaxed, buddy-like.
- **Accent:** American male only (KR); Charlie (Australian) disqualified; Ryan/James don't exist on account; Dave paywalled.
- **ID & accent verification:** stop guessing IDs — pull the real ElevenLabs library and confirm accent before presenting any candidate (Charlie lesson).
- **Ownership shift:** CEO generates clips directly via scripts — Koba's stall bug (ref `45e389f7`) no longer gates progress.
- **Admin relay:** internal work log → admin review queue only (ref `c0524885`); no live chat pass-through.
- **Test-clip protocol:** same phrase across candidates; byte-size confirmation on disk before "done."
- **Scope:** ship current build; pond + streak + checklist are post-launch.

## Pending Decisions
- None blocking — **voice is settled**. Minor cleanup choices: confirm/drop Adam from the backup menu; delete legacy preview clips (Antoni, Josh, Charlie, earlier Adam); rewrite or delete `TTS-SETUP.md`.

## Tasks
- [x] Validate ElevenLabs key (clean 200, full voice library)
- [x] Generate and verify candidate clips (Will, Brian, Eric, Adam, Charlie, +3 American males)
- [x] Audit accents — Charlie flagged Australian and removed
- [x] **KR picks Will** ("that was my pick too. yes, let's go with it.")
- [x] Write `scripts/generate-will-clips.js`
- [x] Write/save `FROG-FOCUS-ROADMAP.md`; lock launch-what-we-have strategy
- [x] Log stall bug (ref `45e389f7`) and admin thanks (ref `c0524885`)
- [ ] Trace `speakPhrase()`/`PHRASE_AUDIO` resolution for exact file names (in progress)
- [ ] **Generate the 5 phrase clips with Will** (`focus-start`, `short-break`, `long-break`, `short-back`, `long-back`)
- [ ] Byte-verify each clip on disk; confirm no rogue fallback to browser voice
- [ ] Wire clips into the app's audio path (direct `audio/` placement or upload fix)
- [ ] Re-queue `recommendations_v1`: KR's Five Page Edits (frog-green dark mode, "productive tool" copy, "the what" section, beverage line, recharge copy)
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Live Chrome check: timer face sits right in the ring
- [ ] Verify cycle-strip pills wrap correctly
- [ ] Rewrite or delete stale `TTS-SETUP.md`
- [ ] Clean up legacy preview clips
- [ ] Final QA → publish

## Opportunities
1. **One-shot launch sequence.** The voice is locked — pre-verify `PHRASE_AUDIO` wiring now, generate the 5 Will clips the moment the script is confirmed, and turn "clips generated" into publish in a single pass. This is the fastest path to KR's "launch it soon."
2. **Re-queue `recommendations_v1` immediately in parallel.** The batch expired at 50 messages; resubmit the Five Page Edits, `frog-face.png` re-encode, and timer-face Chrome check so launch QA runs while the Will clips generate — no serial wait.
3. **Save Will's takes as launch fuel.** The 5 phrase clips double as onboarding audio and social snippets ("Time to focus — you've got this"). Consider keeping a spare take of the test phrase for the launch announcement / README, giving the launch itself the frog's voice.

## Next Steps
- Finish tracing the exact clip filenames/resolution in `index.html`; confirm the mapping the CEO is reading.
- Run `scripts/generate-will-clips.js` → byte-verify all 5 clips on disk → load into the app's audio path.
- Re-queue `recommendations_v1` (Three Pending Items) in parallel.
- Apply the Five Page Edits + re-encode `frog-face.png` + timer-face Chrome check.
- Final QA (cycle-strip pill check included) → publish.

---
*Last updated: 2026-08-15T13:48Z*