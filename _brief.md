# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** — CEO-confirmed differentiator: *"almost none of them have a warm, friendly little companion actually cheering you on."*
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging, "not robotic" — **American male accent only** (KR-locked). Pool is now **library-verified**: Will, Brian + 4 freshly generated American males (Eric and 3 others). **Charlie was discovered Australian — disqualified.**
- **Post-launch roadmap locked** (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond** centerpiece — frog-themed growth (lily pads, lotus flowers); ambient touches (rain, fireflies); second frog friend at full pond; daily streak; pre-focus checklist.
- **Launch strategy (KR-locked): ship the current build first** — pond and roadmap features are update runway.
- **Music/ambience: future only.** Web Audio API endorsed (brown noise / soft rain / gentle lo-fi hum; one volume slider, mute toggle, auto-duck under voice).
- **KR is launch-eager:** *"now we just gotta launch it soon. hope others find it helpful in their day."*

## Current Status
- **Voice selection is the live gate — and the menu just got wider and cleaner.** The CEO stopped guessing IDs, pulled the **actual ElevenLabs library**, and generated a fresh batch:
  - **Confirmed American male:** **Will** — Relaxed Optimist (`bIHbv24MWmeRgasZH58o`, `audio/preview/will.mp3`, **63,573 bytes**); **Brian** — Deep, Resonant (`nPczCjzI2devNBz1zQrb`, `audio/preview/brian.mp3`); **Eric** — Smooth, Tru[stworthy] (`audio/preview/eric.mp3`) + **3 more new American males** (all library-confirmed).
  - **Disqualified:** **Charlie is actually Australian** — out of the American running despite a generated clip (`audio/preview/charlie.mp3`). A couple of other early options were also dropped as Australian/British; Ryan/James don't exist on the account; Dave is behind a paid plan.
  - **Adam** — Deep, Calm (`audio/preview/adam.mp3`) was generated in the earlier batch but his accent is **not yet verified** against the library pull; treat as unconfirmed until checked.
- Test phrase for all clips: *"Here we go. Time to focus — and you've got this. I'm rooting for you."*
- **KR asked for more options twice** ("any other voice options?", "please give me a few more recommendations") and has confirmed they'll listen when the menu is ready ("thanks. ill listen and let you").
- **Koba stalled a third time** — status box again showed "done" with nothing landing. CEO no longer waits: direct generation via `scripts/generate-more-clips.js` is the working track; stall bug queued as ref `45e389f7`.
- **Admin relay clarified:** KR's thanks passed via internal work log → admin review queue (ref `c0524885`), not live chat streaming. KR is satisfied and impressed with the platform.
- **`recommendations_v1` (3 items: Five Page Edits, frog-face.png re-encode, timer-face Chrome check)** still unfulfilled after 50 messages and carries a fail timestamp — the batch likely expired and needs re-queuing.

## Files & Structure
- **Roadmap**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; Focus Pond featured.
- **Core Page**: `index.html` (66KB) — self-contained single-page app; contains `speakPhrase()` + `PHRASE_AUDIO` map (5 keys → `audio/*.mp4`); per-state frog image wiring; cycle-pill labels set to "Short break"; reworked `/* cycle strip */` block.
- **Audio**: `audio/` (1 top-level file) + `audio/preview/` — **candidate clips: will.mp3, brian.mp3, charlie.mp3 (Australian/out), adam.mp3 (accent unverified), eric.mp3 + 3 new American males generating**; legacy clips (Antoni, Josh, earlier Adam) still present — cleanup needed; KR's five phrase clips still pending.
- **Scripts**: `scripts/` (3 files) — **`generate-more-clips.js` written and successfully run** (CEO track: produced Charlie + Adam, now generating the verified American batch); two pre-existing scripts.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under .png name, queued for re-encode); `uploads/` (14 files, all images — confirms MIME-level upload filter).
- **Legacy Backend** (dormant — static page never calls it): `server.js` (5KB), `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Docs**: `TTS-SETUP.md` (4KB) — stale; rewrite for the current API approach or delete.

## Key Decisions Made
- **Accent:** American male only (KR) — early Australian/British candidates dropped.
- **ID verification:** Stop guessing voice IDs — pull the real ElevenLabs library and only generate voices that exist on the account (rules out Ryan/James; Dave stays locked behind the paid plan).
- **Accent verification:** A clip on disk is no longer enough — accent is confirmed against the library before a candidate is presented (Charlie lesson).
- **Test-clip protocol:** same phrase across all candidates for clean side-by-side; byte-size confirmation on disk before announcing "done."
- **Ownership shift (confirmed):** CEO generates clips directly via `generate-more-clips.js` — Koba's stall bug no longer gates progress; fix tracked in background (ref `45e389f7`).
- **Admin relay mechanism:** internal work log → admin review queue only; no live pass-through of chat (KR clarified and satisfied).
- **Voice path:** ElevenLabs API validated (fresh key → clean 200); in-browser TTS and platform upload fix are independent alternative routes.
- **Voice selection:** KR decides from the full menu.
- **Scope:** ship current build; Focus Pond + streak + checklist are post-launch.
- **Launch urgency:** KR wants to ship "soon" — voice pick is the last real gate.

## Pending Decisions
- **KR's voice pick** — Will, Brian, Eric + 3 new American males (Adam pending accent check). Sole active gate.
- Whether to confirm Adam's accent via the library or drop him from the menu.
- Whether to clean up legacy preview clips (Antoni, Josh, earlier Adam, Charlie) to avoid filename collisions/confusion.
- Whether to rewrite or delete stale `TTS-SETUP.md`.

## Tasks
- [x] Validate ElevenLabs key (clean 200, full voice library)
- [x] Pull the **actual** voice library; stop guessing IDs (Ryan/James don't exist; Dave paywalled)
- [x] Generate test clips for Will and Brian — confirmed on disk, same phrase
- [x] Write `scripts/generate-more-clips.js` (CEO track) and generate Charlie + Adam
- [x] **Generate 4 additional American male clips from verified library** (Eric + 3)
- [x] **Run accent audit — Charlie flagged Australian and removed from the running**
- [x] Write and save `FROG-FOCUS-ROADMAP.md`; lock launch-what-we-have strategy with KR
- [x] Log stall bug (ref `45e389f7`) and admin thanks (ref `c0524885`)
- [ ] Byte-verify all new clips on disk (incl. the 3 unnamed American males; confirm Eric's full tone descriptor)
- [ ] **Present KR a consolidated, accent-verified voice menu** — one comparison, same phrase, sizes on disk
- [ ] **KR listens and picks a voice**
- [ ] Generate five frog phrase clips with the selected voice
- [ ] Load clips into `PHRASE_AUDIO` (or via upload path when fix lands)
- [ ] Re-queue and apply failed `recommendations_v1` batch: KR's Five Page Edits (frog-green dark mode, "productive tool" copy, "the what" section, beverage line, recharge copy)
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Live Chrome check: timer face sits right in the ring
- [ ] Verify cycle-strip pills wrap correctly with KR
- [ ] Rewrite or delete stale `TTS-SETUP.md`
- [ ] Final QA → publish

## Opportunities
1. **Ship the complete voice menu as one verified deliverable.** Everything is generated or in flight — bundle Will, Brian, Eric (+3) with accent confirmation, tone, and byte size in a single comparison table so KR picks in one pass. Don't dribble clips as they land; the Charlie mislabel shows accent data belongs in the table, not the fine print.
2. **Re-queue `recommendations_v1` immediately as background work.** The batch hit its 50-message window and failed (`fail_ts` set). Resubmit the Five Page Edits, `frog-face.png` re-encode, and timer-face Chrome check so launch QA runs while KR is listening to voices — directly serving KR's "launch it soon."
3. **Pre-stage the final launch dispatch.** With the voice menu in front of KR, pre-write the five phrase scripts, pre-verify `PHRASE_AUDIO` wiring, and have the selected voice ready to generate on the spot — turning "voice picked" into a single publish-ready sequence, not another multi-round wait.

## Next Steps
- Let the CEO's generator finish the remaining American male clips; byte-verify each on disk and confirm Eric's full descriptor.
- Confirm or drop Adam (accent check against the library).
- Consolidate the complete voice menu for KR and get the pick.
- Once picked: generate all five phrases → wire into `PHRASE_AUDIO`.
- Re-queue `recommendations_v1` (Three Pending Items) in parallel while KR listens.
- Final QA (plus cycle-strip pill check) → publish.

---
*Last updated: 2026-08-15T13:36:14Z*