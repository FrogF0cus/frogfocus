# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging, American male — **Will (Relaxed Optimist)**, confirmed by KR by ear.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond** (lily pads, lotus growth), ambient touches (rain, fireflies), second frog friend, daily streak, pre-focus checklist.
- **Launch strategy locked: ship the current build first** — roadmap features are update runway.

## Current Status
- **Session ACTIVE — KR is driving and bridge is warm.** KR requested, and CEO opened, a fresh bridge window with `?fresh=3` cache-bust; live dots + audio tests approved and run.
- **Both live bugs fixed and republished.** (1) **Dots**: root cause found — `box-shadow` used hard spreads (zero/low blur), which Safari/WebKit renders as square-ish outlines. Fixed with soft circular glows; `border-radius` was never the issue. (2) **Voice**: two candidate culprits isolated — `speakVaried` bails on the `voiceOn` flag while chimes use a separate `soundOn` flag, and the Web Audio `decodeAudioData` path was a failure point. Fixed by switching to **one persistent `<audio>` element with no decode step**.
- **Republish verified end-to-end:** no stale references, script parses, published `index.html` matches local, audio clips serve 200 as `audio/mpeg` (real MP3s, ID3v2.4 + ElevenLabs tags), images correct.
- **Awaiting KR's Safari confirmation** of the two fixes on a fresh hard refresh — this is the last functional checkpoint before the aesthetic pass.
- **Zara's design QA pass remains down** (Grok route unavailable; `recommendations_v1` failure timestamp `1786662085627` after 50 messages).
- **Everything else is launch-ready**: Will's 5 clips verified, `PHRASE_AUDIO` on real `.mp3` paths, roadmap written, public link live.

## Files & Structure
- **Core Page**: `index.html` (70KB) — "Frog Focus — your intentional productivity companion"; `PHRASE_AUDIO` map → real `.mp3` paths; per-state frog image wiring; cycle-pill labels; reworked `/* cycle strip */` block; **soft-glow dot styling + single persistent audio element** now in the published bytes. References `audio/`, `images/`, `uploads/` as external paths.
- **Backend**: `server.js` (5KB) — statically serves `audio/`, `images/`, `uploads/`; `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Scripts** (`scripts/`, 5 files): `generate-will-clips.js` — production track (the 5 shipped Will clips); `generate-more-clips.js` — vetted candidate voice menu; 3 pre-existing clip-generation scripts.
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy files (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under a .png name, queued for re-encode); `uploads/` (21 files, all images — confirms MIME-level upload filter).
- **Screenshots**: `screenshots/` (7 files) — bridge-window debugging captures (login wall, hero, dot section, audio checks).
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; `TTS-SETUP.md` (4KB) — stale, rewrite or delete.

## Key Decisions Made
- **Dot root cause locked: hard-spread box-shadows, not `border-radius`.** Safari/WebKit doesn't round zero-blur hard spreads. Fix shipped as blurred circular glows — the `border-radius:50%` theory and Safari-cache theory are superseded.
- **Voice fix shipped: single persistent `<audio>` element, no decode path.** Removes the `decodeAudioData` failure mode entirely. The `voiceOn`/`soundOn` flag split remains a noted smell to unify.
- **`?fresh=N` cache-busting adopted as the publish-verify workflow** — used to hard-refresh the live page and confirm the republished bytes.
- **Republish confirmed live:** `https://usercontent.empir3.com/p/a3adb503b8/index.html` serves the fixed file; all assets return correct 200s and MIME types.
- **Bridge remains the live-debug console** — new window opened per KR's request; dots and audio tested in real Chrome; publish question answered.
- Earlier (unchanged): bridge login wall diagnosed as Empir3-side 405 (ref **b004e7eb**, logged with admin); sequencing locked (aesthetic changes → Koba's single combined pass); voice locked (Will, `.mp3`); scope locked (ship current build); shipping-music first track delivered to admin.

## Pending Decisions
- **KR's Safari sign-off on the two live fixes** — the gate before the aesthetic pass; test with a hard refresh (not a cached tab).
- **Public link = launch or staging?** The URL is live and shareable now; KR's call on whether that *is* the official launch or a pre-launch preview.
- **KR's Five Page Edits** (`recommendations_v1`): dark mode → frog green, "productive tool" copy, "the what" section, beverage line, recharge copy — queued to brief Koba once KR defines/confirms the details.
- **`frog-face.png` re-encode** to a real PNG before publish (JPEG bytes under a `.png` name).
- **Timer face in ring + cycle-pill wrap live checks** — not yet confirmed this session; batch into the next bridge window.
- **Unify `voiceOn`/`soundOn` flags** — a code-quality cleanup to fold into Koba's pass, or leave as-is given the persistent-element fix works.
- **Zara's design QA deep pass** — reschedule when the Grok route recovers; no further retry attempts until then.
- **Shipping-music playlist** — first track delivered; whether to formalize a rotating playlist is unpicked.
- Minor cleanup: confirm/drop Adam from backup menu; delete legacy preview clips; rewrite or delete `TTS-SETUP.md`.

## Tasks
- [x] Validate ElevenLabs key (clean 200, full voice library)
- [x] Generate and verify candidate clips (Will, Brian, Eric, Adam, Charlie, +3 American males)
- [x] Audit accents — Charlie flagged Australian and removed
- [x] **KR picks Will**
- [x] Write `scripts/generate-will-clips.js`; generate the 5 phrase clips with Will
- [x] **Update `server.js`** to statically serve `audio/`
- [x] **Update `PHRASE_AUDIO` in `index.html`** from `.mp4` → real `.mp3` paths
- [x] **Live audio verification** — KR confirms Will's voice plays
- [x] **Answer KR's publish pros/cons question** — both options laid out; asset references audited
- [x] Write/save `FROG-FOCUS-ROADMAP.md`; lock launch-what-we-have strategy
- [x] **Lock sequencing with KR** — aesthetics first, then one final Koba technical/UX pass
- [x] **Retry Zara's pass at KR's request** — multiple attempts; route still down; no further loops
- [x] **Log Zara's repeated Grok-route failure** for next round of fixes
- [x] **Deliver straight design read in Zara's absence** — cream-and-gold palette is the biggest asset
- [x] **Answer "what do you need from me to publish?"** — nothing but KR's word
- [x] **Share shipping music with the admin** — friendly-gesture note from KR
- [x] **Diagnose bridge login wall** — isolated browser + fresh session; KR's login attempt → 405
- [x] **Log Empir3 405 as admin bug** (ref **b004e7eb**)
- [x] **Publish to public link and open in bridge** — URL live and accessible
- [x] **Root-cause dot rendering** — hard-spread box-shadows (Safari/WebKit doesn't round zero-blur spreads), not `border-radius`
- [x] **Ship dot fix** — soft circular glow replacing hard rings; `index.html` edited and republished
- [x] **Isolate voice failure candidates** — `speakVaried` gated on `voiceOn` vs. chimes' `soundOn`; fragile `decodeAudioData` path
- [x] **Ship voice fix** — single persistent `<audio>` element, no decode step; `index.html` edited and republished
- [x] **Verify republished file live** — no stale references, script parses, assets 200 with correct MIME types
- [x] **KR returns — session active again; fresh bridge window opened** (`?fresh=3`); dots + audio tested live with KR's approval
- [ ] **KR's Safari confirmation** — hard refresh: dots render as circular glows, voice plays
- [ ] **KR's final timer-cycle run-through** — verify phase/off-beat behavior
- [ ] **KR's go → official launch** — public link live; final step is KR's call
- [ ] Apply KR's Five Page Edits: dark mode → frog green, "productive tool" copy, "the what" section, beverage line, recharge copy
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Live Chrome check: timer face sits right in the ring (batch with bridge session)
- [ ] Verify cycle-strip pills wrap correctly (batch with bridge session)
- [ ] Unify `voiceOn`/`soundOn` toggle flags (fold into Koba's pass)
- [ ] **Koba's single final pass** — implement `recommendations_v1` edits + technical/UX together; queued until KR's aesthetic changes are defined
- [ ] Zara design QA deep pass — reschedule when Grok recovers
- [ ] Coordinate with Empir3 admin on the 405 fix (b004e7eb)
- [ ] Rewrite or delete stale `TTS-SETUP.md`
- [ ] Clean up legacy preview clips (Antoni, Josh, Charlie, earlier Adam)
- [ ] Decide whether to formalize the "shipping music" playlist for Koba

## Opportunities
1. **Close the loop in one Safari refresh.** Both fixes are live and verified server-side. One hard refresh from KR turns "two open bugs" into "confirmed-shipped," clearing the last functional blocker. The fastest path to the aesthetic pass is asking KR for exactly one fresh-load check.
2. **Codify the `?fresh=N` publish-verify pattern.** It just worked end-to-end (cache-bust → live check → republish → confirm 200s/MIME). Making this the standard for Frog Focus updates and future Empir3 publishes eliminates the entire class of "is it live or is it cached" confusion.
3. **Package the shared cleanup with Koba's pass.** The `voiceOn`/`soundOn` split, `frog-face.png` re-encode, legacy clip removal, and stale `TTS-SETUP.md` are all small, mechanical, and can ride along with the Five Page Edits — one briefing to Koba, one pass, no serial round-trips.

## Next Steps
- **Get KR's Safari confirmation on the hard refresh** (dots as glows, voice audible) — the gate that unlocks the aesthetic pass.
- **Present `recommendations_v1` to KR** to lock the Five Page Edits; on sign-off, brief Koba for the combined aesthetic + technical/UX pass (include the `frog-face.png` re-encode and flag unification).
- **Batch remaining live checks into the next bridge window:** timer face in the ring, cycle-pill wrap, dot-section screenshot for the record.
- **Confirm with KR whether the public link is the launch or staging** — if staging, the official "go" is still his word, but it's now a one-word decision with zero wait.
- **Coordinate the Empir3 405 fix (b004e7eb) in parallel** — affects other bridge workflows beyond Frog Focus.
- Post-launch: reschedule Zara's deep pass when Grok recovers; cleanup pass (legacy clips, stale `TTS-SETUP.md`); decide on the shipping-music playlist.

---
*Last updated: 2026-08-16T14:48Z*