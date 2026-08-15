# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging, American male — **Will (Relaxed Optimist)**, confirmed by KR by ear.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond** (lily pads, lotus growth), ambient touches (rain, fireflies), second frog friend, daily streak, pre-focus checklist.
- **Launch strategy locked: ship the current build first** — roadmap features are update runway.

## Current Status
- **KR is at the finish line but not quite ready** — *"ok. i agree but im not quite ready yet."* He's doing one last timer-cycle check; asked directly *"what do you need from me to publish it?"* — CEO's answer: **nothing but his word**. CEO is standing by: *"say the word and I'll publish."*
- **Sequencing re-confirmed by KR, twice, explicitly:** make aesthetic changes **first**, then one clean final technical/UX pass from Koba — *"that way he doesn't have to perform it again."*
- **Zara's design QA pass remains blocked — now 5+ total failures.** KR asked for retries twice more this round; both errored again (Grok route unavailable, no backup). CEO stopped looping. KR explicitly requested the failure be added to the workload log for the next round of fixes — **CEO confirmed logged** (now a recurring logged bug).
- **CEO delivered his own straight design read in Zara's absence** (per KR's request for honest team feedback): the warm cream-and-gold palette is the biggest asset. The `recommendations_v1` batch (3 items, actions tagged "Brief Koba") is the formal response.
- **Publish pros/cons fully answered.** Single self-contained file = fastest to share, opens anywhere, zero hosting cost; server-hosted = more update-friendly. **Format choice remains KR's.**
- **🎵 Shipping music delivered.** KR shared a YouTube link (`zyMHoAZBg3Q`); CEO passed it to the admin's review log with a note framing it as a friendly gesture from KR — *"Hope it earns its keep between bug fixes."* The playlist idea KR floated is now a concrete reality with its first track sent.

## Files & Structure
- **Core Page**: `index.html` (66KB) — "Frog Focus — your intentional productivity companion"; `PHRASE_AUDIO` map → 5 real `.mp3` clips; per-state frog image wiring; cycle-pill labels; reworked `/* cycle strip */` block. **References `audio/` and `images/` as external paths — this drives the publish-format decision.**
- **Backend**: `server.js` (5KB) — statically serves `audio/`, `images/`, `uploads/`; `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Scripts** (`scripts/`, 4 files): `generate-will-clips.js` — production track (generated the 5 shipped Will clips); `generate-more-clips.js` — produced vetted candidate voice menu; 2 pre-existing clip-generation scripts.
- **Audio**: `audio/` (6 files) — 5 production Will clips + 1 other; legacy candidate/preview clips (Antoni, Josh, earlier Adam, Charlie) remain for cleanup.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under .png name, queued for re-encode); `uploads/` (14 files, all images — confirms MIME-level upload filter).
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; `TTS-SETUP.md` (4KB) — stale, rewrite or delete.

## Key Decisions Made
- **Sequencing locked (KR):** aesthetic changes first → then Koba's single combined pass (implement edits + final technical/UX) so he never redoes work.
- **Zara's repeated Grok-route failure logged** to the workload log for the next round of fixes, per KR's explicit request. No further retries on the dead route — CEO stopped looping after 5+ attempts.
- **Shipping music shared with the admin** via the CEO, credited as a friendly gesture from KR. First track in what may become a "shipping music playlist" ritual.
- **Publishing gate:** KR's word is the only requirement — CEO confirmed "nothing from you" is needed; assets are already in the project.
- **Voice locked: Will** (Relaxed Optimist) — KR and CEO independently landed on him.
- **Production audio format: `.mp3`** — `PHRASE_AUDIO` corrected off phantom `.mp4` paths; server serves `audio/`.
- **Publish formats narrowed to two** (self-contained vs server-hosted) with pros/cons delivered; **format choice still KR's.**
- **CEO covered the design-QA gap directly** — on record: cream-and-gold palette is the biggest asset; `recommendations_v1` batch queued as formal recommendations.
- **Accent:** American male only (KR); Charlie (Australian) disqualified; Ryan/James don't exist on account; Dave paywalled.
- **Ownership shift:** CEO generates clips directly via scripts — Koba's stall bug (ref `45e389f7`) no longer gates progress.
- **QA-by-phase protocol:** any audio issue in the final run-through gets fixed at the exact phase (focus-start / short-break / long-break / short-back / long-back).
- **Scope:** ship current build; pond + streak + checklist are post-launch.

## Pending Decisions
- **Publish format (KR's call):** one self-contained file (assets inlined; data-URI size tradeoff for 5 audio + 8 images) vs server-hosted (`server.js` already serves everything).
- **Timing of `recommendations_v1` batch:** apply the Five Page Edits / frog-face re-encode / timer-face check before launch as KR's aesthetic pass, or ship first and polish after — KR's stated intent is aesthetic edits before Koba's final pass. Actions are tagged "Brief Koba," so Koba can implement them together with his final pass in one go.
- **Zara's design QA deep pass:** reschedule when the designer (Grok) route recovers — logged for the next fix round; no further retry attempts until then.
- **Shipping-music playlist for Koba:** first track delivered to the admin; whether to expand into a formal rotating playlist (and who curates it) is unpicked.
- Minor cleanup: confirm/drop Adam from backup menu; delete legacy preview clips; rewrite or delete `TTS-SETUP.md`.

## Tasks
- [x] Validate ElevenLabs key (clean 200, full voice library)
- [x] Generate and verify candidate clips (Will, Brian, Eric, Adam, Charlie, +3 American males)
- [x] Audit accents — Charlie flagged Australian and removed
- [x] **KR picks Will**
- [x] Write `scripts/generate-will-clips.js`; generate the 5 phrase clips with Will (verified on disk)
- [x] **Update `server.js`** to statically serve `audio/`
- [x] **Update `PHRASE_AUDIO` in `index.html`** from `.mp4` → real `.mp3` paths
- [x] **Live audio verification** — KR confirms Will's voice plays
- [x] **Answer KR's publish pros/cons question** — both options laid out; asset references audited
- [x] Write/save `FROG-FOCUS-ROADMAP.md`; lock launch-what-we-have strategy
- [x] **Lock sequencing with KR** — aesthetics first, then one final Koba technical/UX pass (re-confirmed by KR in this round)
- [x] **Retry Zara's pass on KR's request** — attempted twice more this round; both failed; no further loops
- [x] **Log Zara's repeated Grok-route failure** to workload log for next round of fixes (per KR's explicit request; CEO confirmed) — now a recurring logged bug
- [x] **Deliver straight design read in Zara's absence** — CEO: cream-and-gold palette is the biggest asset
- [x] **Answer "what do you need from me to publish?"** — nothing but KR's word; both formats pre-audited
- [x] **Share shipping music with the admin** — KR's YouTube link forwarded to the admin's review log with a friendly-gesture note from KR
- [ ] **KR's final timer-cycle run-through** — in progress; *"not quite ready yet"*; report any off-beat line/timing/volume by phase for immediate fix
- [ ] **KR's go → publish** — CEO standing by
- [ ] Apply KR's Five Page Edits: dark mode → frog green, "productive tool" copy, "the what" section, beverage line, recharge copy
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Live Chrome check: timer face sits right in the ring
- [ ] Verify cycle-strip pills wrap correctly
- [ ] **Koba's single final pass** — implement `recommendations_v1` edits + technical/UX together; queued until KR's aesthetic changes are defined
- [ ] Zara design QA deep pass — route down (Grok unavailable, no backup); reschedule when recovered
- [ ] Rewrite or delete stale `TTS-SETUP.md`
- [ ] Clean up legacy preview clips (Antoni, Josh, Charlie, earlier Adam)
- [ ] Decide whether to formalize the "shipping music" playlist for Koba (KR's idea; first track now delivered)

## Opportunities
1. **Turn `recommendations_v1` into KR's "lock the look" sprint — executed by Koba in one pass.** The Five Page Edits + frog-face re-encode + timer-face check are exactly the aesthetic changes KR wants before Koba's final pass. Actions are already tagged "Brief Koba" — KR approves the list, Koba implements edits + final UX in a single clean pass, matching KR's sequencing exactly.
2. **Pre-stage both publish paths so KR's "go" is instant.** He's asked what's needed to publish and the answer is "your word." Build the self-contained inline-assets snapshot *and* keep the server build ready as the living app so the moment he finishes his check, launch is one step — no encoding or setup delay.
3. **Formalize the shipping-music ritual.** The first track has landed in the admin's review log, credited to KR — a warm gesture that mirrors the frog's personality. It could become a small shared playlist (KR + team contribute tracks as fixes ship), strengthening the loop between KR's empathy and the team's momentum. Bonus: the same warmth anchors launch copy and the Focus Pond teaser.

## Next Steps
- Stand by for KR's final cycle run-through; fix any reported phase immediately.
- Present `recommendations_v1` to KR as his aesthetic-change list; on approval, brief Koba to implement edits + final technical/UX pass in one go.
- Pre-build both publish snapshots (self-contained + server stand-up) so "go" translates directly to launch with zero wait.
- On KR's word: execute chosen format, confirm shared link/live URL.
- Retry or reschedule Zara's design QA deep pass when the designer (Grok) route recovers — no further attempts until then.
- Follow up on the shipping-music gesture (confirm the admin received it; float expanding it into a shared playlist); cleanup pass (legacy clips, stale `TTS-SETUP.md`) → post-launch polish.

---
*Last updated: 2026-08-15T21:41Z*