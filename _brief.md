# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging, American male — **Will (Relaxed Optimist)**, confirmed by KR by ear.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond** (lily pads, lotus growth), ambient touches (rain, fireflies), second frog friend, daily streak, pre-focus checklist.
- **Launch strategy locked: ship the current build first** — roadmap features are update runway.

## Current Status
- **Session is ACTIVE again — KR has returned.** The pause is over; KR is approving bridge actions, sending screenshots, and pushing for momentum ("update", "you stalled again"). CEO is mid-diagnostic, not holding.
- **Public link is live and bridge-verified:** `https://usercontent.empir3.com/p/a3adb503b8/index.html` — the bridge's Chrome opens it directly with no login wall. The 405 workaround worked; the roadblock is bypassed.
- **Constellation dots: mystery narrowed to Safari.** Published CSS is provably correct (`border-radius:50%`, square 8px dots, no overrides anywhere); the bridge's fresh Chrome renders the dots as **clean circles**; KR's Safari still shows boxes. Published bytes match the local file — this is a Safari-specific rendering quirk, not a stale-publish or CSS-defect issue.
- **Break audio stays silent — mid-diagnosis.** CEO opened the live page in the bridge; KR approved the audio diagnostic. Web Audio code confirmed present in the published file; root cause not yet isolated.
- **Zara's design QA pass remains down** (Grok route still unavailable; `recommendations_v1` failure timestamp `1786662085627` after 50 messages).
- **Everything else is launch-ready**: Will's 5 clips verified, `PHRASE_AUDIO` on real `.mp3` paths, roadmap written, publish question answered.

## Files & Structure
- **Core Page**: `index.html` (71KB) — "Frog Focus — your intentional productivity companion"; `PHRASE_AUDIO` map → real `.mp3` paths; per-state frog image wiring; cycle-pill labels; reworked `/* cycle strip */` block; Web Audio break code confirmed in published bytes. References `audio/`, `images/`, `uploads/` as external paths.
- **Backend**: `server.js` (5KB) — statically serves `audio/`, `images/`, `uploads/`; `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Scripts** (`scripts/`, 5 files): `generate-will-clips.js` — production track (the 5 shipped Will clips); `generate-more-clips.js` — vetted candidate voice menu; 3 pre-existing clip-generation scripts.
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy files (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under a .png name, queued for re-encode); `uploads/` (21 files, all images — confirms MIME-level upload filter).
- **Screenshots**: `screenshots/` (5 files) — bridge-window debugging captures (login wall, hero, dot section).
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; `TTS-SETUP.md` (4KB) — stale, rewrite or delete.

## Key Decisions Made
- **Bridge debugging workflow proven.** The bridge now opens the public URL directly — CEO has real-browser ground truth: dots render as circles in Chrome; boxes are Safari-only.
- **Dot CSS verified correct in the published bytes** — `border-radius:50%` present, no overrides; Safari is the only failing renderer, logged as a browser-quirk hunt, not a code defect.
- **KR has returned and is actively driving** — approving bridge diagnostics, sending screenshots, expecting fast updates.
- **Public-link publish is done** — the page is live at `usercontent.empir3.com/p/a3adb503b8/index.html`; the same URL that unblocked the dot check is the launch vehicle.
- Earlier (unchanged): bridge login wall diagnosed as Empir3-side 405 (ref **b004e7eb**, logged with admin); sequencing locked (aesthetic changes → Koba's single combined pass); voice locked (Will, `.mp3`); scope locked (ship current build); shipping-music first track delivered to admin.

## Pending Decisions
- **Safari dot fix approach:** belt-and-suspenders rule for the dot class (explicit `border-radius:50%`, possibly `-webkit-` variant / appearance reset) vs. testing whether KR's Safari is serving a stale cache. CEO to decide with bridge ground truth in hand.
- **Public link = launch or staging?** The URL is live and shareable now; KR's call on whether that *is* the official launch or a pre-launch preview (domain/announcement still his).
- **Break-audio root cause** — pending the in-flight bridge diagnostic; fix approach follows the result.
- **Timing of `recommendations_v1`** (Five Page Edits, frog-face re-encode, timer-face check) — KR's stated intent is aesthetic edits before Koba's final pass; actions are tagged "Brief Koba" so one combined pass is possible.
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
- [x] **Verify constellation dots in bridge's Chrome** — renders as clean circles; published file correct
- [x] **Confirm published bytes match local file** — `border-radius:50%` and Web Audio code both present
- [x] **KR returns — session active again**
- [ ] **Diagnose silent break audio** — in flight in the bridge; KR approved
- [ ] **Fix Safari-only dot rendering** (boxes in Safari vs. circles in Chrome)
- [ ] **KR's final timer-cycle run-through** — verify phase/off-beat behavior
- [ ] **KR's go → official launch** — public link live; final step is KR's call
- [ ] Apply KR's Five Page Edits: dark mode → frog green, "productive tool" copy, "the what" section, beverage line, recharge copy
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Live Chrome check: timer face sits right in the ring (batch with bridge session)
- [ ] Verify cycle-strip pills wrap correctly (batch with bridge session)
- [ ] **Koba's single final pass** — implement `recommendations_v1` edits + technical/UX together; queued until KR's aesthetic changes are defined
- [ ] Zara design QA deep pass — reschedule when Grok recovers
- [ ] Coordinate with Empir3 admin on the 405 fix (b004e7eb)
- [ ] Rewrite or delete stale `TTS-SETUP.md`
- [ ] Clean up legacy preview clips (Antoni, Josh, Charlie, earlier Adam)
- [ ] Decide whether to formalize the "shipping music" playlist for Koba

## Opportunities
1. **The bridge is now a working live-debug console — use it while it's warm.** CEO opened the public URL, read computed styles, scrolled the live page, and ran JS in a real Chrome. Batch the remaining live checks (silent break audio, timer face in the ring, cycle-pill wrap) in this same connected session instead of ping-ponging — that directly matches KR's "keep me updated" energy.
2. **The public link collapses "preview vs. launch."** The page is live at a real, shareable URL. KR can send it around *today* — to the admin who got the shipping music, to the team, to anyone whose opinion matters — turning the official launch into a naming/announcement decision rather than an engineering one. Zebra-stripe momentum with zero extra build work.
3. **The Safari-only dot failure is a polish signal, not a crisis.** Chrome renders perfect circles; Safari boxes them despite provably correct CSS. A belt-and-suspenders dot rule (explicit `border-radius:50%`, `-webkit-` fallback, no shorthand ambiguity) fixes it once and becomes a reusable pattern for every future project — plus it gives KR a quick visible win the moment he checks back in.

## Next Steps
- **Finish the bridge audio diagnostic now** (KR already approved) — root-cause the silent break audio; fix immediately.
- **While the bridge is open, run the remaining live checks in one batch:** timer face in the ring, cycle-pill wrap, dot section screenshot for the record.
- **Ship the Safari dot fix** (belt-and-suspenders border-radius rule) and have KR confirm in his Safari.
- **Present `recommendations_v1` to KR** for the "lock the look" pass; on sign-off, brief Koba for the combined aesthetic + final technical/UX pass.
- **Confirm with KR whether the public link is the launch or staging** — if staging, the official "go" is still his word, but it's now a one-word decision with zero wait.
- **Coordinate the Empir3 405 fix (b004e7eb) in parallel** — affects other bridge workflows beyond Frog Focus.
- Post-launch: reschedule Zara's deep pass when Grok recovers; cleanup pass (legacy clips, stale `TTS-SETUP.md`); decide on the shipping-music playlist.

---
*Last updated: 2026-08-16T11:41Z*