# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging, American male — **Will (Relaxed Optimist)**, confirmed by KR by ear.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond** (lily pads, lotus growth), ambient touches (rain, fireflies), second frog friend, daily streak, pre-focus checklist.
- **Launch strategy locked: ship the current build first** — roadmap features are update runway.

## Current Status
- **KR paused the session.** After the bridge login wall blocked the dot check, KR called it: *"it's ok. maybe it's a sign to stop for now. ill check back with you."* CEO is holding, no pressure — the frog is in a good place and KR returns on his own clock.
- **New blocker diagnosed: the Empir3 bridge can't see the ritual page.** The bridge runs in an isolated browser with a fresh session, so it hit an "Authentication Required" wall instead of the page. KR's login attempt returned a **405**.
- **405 confirmed as an Empir3-side bug**, not Frog Focus — CEO logged it for the admin (ref **b004e7eb**). **Workaround identified: publish the frog to a public link.** No login needed; the bridge opens it directly, KR sees the ritual page, CEO confirms the constellation dots live.
- **Constellation-dot verification is still pending** — it now rides on the public link (or the Empir3 fix).
- **Zara's design QA pass retried again today per KR's request** ("should we try to have zara run the design QA pass to see if it works today?"); the attempt did not clear (failure timestamp on `recommendations_v1`). KR took it as a sign to pause. Grok route still down, no backup.
- **Everything else is launch-ready**: Will's 5 clips verified, `PHRASE_AUDIO` on real `.mp3` paths, publish pros/cons answered, publishing gate = KR's word.
- Metadata notes: `recommendations_v1` batch is queued (3 items, actions tagged "Brief Koba" / "Ask Koba" / "Run live check").

## Files & Structure
- **Core Page**: `index.html` (66KB) — "Frog Focus — your intentional productivity companion"; `PHRASE_AUDIO` map → 5 real `.mp3` clips; per-state frog image wiring; cycle-pill labels; reworked `/* cycle strip */` block. **References `audio/` and `images/` as external paths — this drives the publish-format decision.**
- **Backend**: `server.js` (5KB) — statically serves `audio/`, `images/`, `uploads/`; `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Scripts** (`scripts/`, 4 files): `generate-will-clips.js` — production track (generated the 5 shipped Will clips); `generate-more-clips.js` — produced vetted candidate voice menu; 2 pre-existing clip-generation scripts.
- **Audio**: `audio/` (6 files) — 5 production Will clips + 1 other; legacy candidate/preview clips (Antoni, Josh, earlier Adam, Charlie) remain for cleanup.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under .png name, queued for re-encode); `uploads/` (16 files, all images — confirms MIME-level upload filter).
- **Screenshots**: `screenshots/` (3 files) — bridge-window debugging captures from the login-wall investigation.
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; `TTS-SETUP.md` (4KB) — stale, rewrite or delete.

## Key Decisions Made
- **KR paused the session** — *"a sign to stop for now"*; will check back. CEO stands by; no further pushes.
- **Bridge login wall diagnosed** — isolated browser + fresh session can't see KR's normal login; KR's attempt → 405.
- **405 logged as a real Empir3-side bug** (ref **b004e7eb**) — not a Frog Focus defect; tracked with the admin.
- **Workaround locked: public-link publish.** Opens directly, zero login, and enables the pending dot verification — the same action is the launch. This strengthens the self-contained-file option.
- **Zara's Grok-route failure retried once more today at KR's request** — still down; failure logged; no further loops until the route recovers.
- **Sequencing locked (KR):** aesthetic changes first → then Koba's single combined pass (implement edits + final technical/UX) so he never redoes work.
- **Publishing gate:** KR's word is the only requirement — assets are already in the project.
- **Voice locked: Will** (Relaxed Optimist); **production audio format: `.mp3`**.
- **Shipping music shared with the admin** — KR's YouTube link forwarded with a friendly-gesture note.
- **Scope:** ship current build; pond + streak + checklist are post-launch.

## Pending Decisions
- **Publish format (KR's call):** one self-contained file (assets inlined; data-URI size tradeoff for 5 audio + 8 images) vs server-hosted (`server.js` already serves everything). **The public-link workaround now favors the self-contained file** — it unblocks both the dot check and the launch in one step.
- **Whether to wait for Empir3's 405 fix** or simply proceed via public link — the workaround is effectively decided; the admin fix (b004e7eb) can land in parallel.
- **Timing of `recommendations_v1` batch:** apply the Five Page Edits / frog-face re-encode / timer-face check before launch as KR's aesthetic pass, or ship first and polish after — KR's stated intent is aesthetic edits before Koba's final pass. Actions are tagged "Brief Koba," so Koba can implement them together with his final pass in one go.
- **Zara's design QA deep pass:** reschedule when the designer (Grok) route recovers — logged; no further retry attempts until then.
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
- [x] **Lock sequencing with KR** — aesthetics first, then one final Koba technical/UX pass
- [x] **Retry Zara's pass at KR's request** — attempted previously (5+ failures) plus once more this session; still down; no further loops
- [x] **Log Zara's repeated Grok-route failure** to workload log for next round of fixes
- [x] **Deliver straight design read in Zara's absence** — CEO: cream-and-gold palette is the biggest asset
- [x] **Answer "what do you need from me to publish?"** — nothing but KR's word; both formats pre-audited
- [x] **Share shipping music with the admin** — with a friendly-gesture note from KR
- [x] **Diagnose bridge login wall** — isolated browser + fresh session; KR's login attempt → 405
- [x] **Log Empir3 405 as admin bug** (ref **b004e7eb**) — not a Frog Focus defect
- [x] **Lock public-link workaround** — opens directly, no login; enables dot check + launch
- [x] **KR pauses session** — "a sign to stop for now"; will check back; CEO holding
- [ ] **KR's return → verify constellation dots via public link** (or after Empir3 fixes the 405)
- [ ] **KR's final timer-cycle run-through** — paused; resume on his return; fix any off-beat phase immediately
- [ ] **KR's go → publish** — CEO standing by
- [ ] Apply KR's Five Page Edits: dark mode → frog green, "productive tool" copy, "the what" section, beverage line, recharge copy
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Live Chrome check: timer face sits right in the ring
- [ ] Verify cycle-strip pills wrap correctly
- [ ] **Koba's single final pass** — implement `recommendations_v1` edits + technical/UX together; queued until KR's aesthetic changes are defined
- [ ] Zara design QA deep pass — route down (Grok unavailable, no backup); reschedule when recovered
- [ ] Coordinate with Empir3 admin on the 405 fix (b004e7eb) — affects other bridge workflows, not just Frog Focus
- [ ] Rewrite or delete stale `TTS-SETUP.md`
- [ ] Clean up legacy preview clips (Antoni, Josh, Charlie, earlier Adam)
- [ ] Decide whether to formalize the "shipping music" playlist for Koba (KR's idea; first track now delivered)

## Opportunities
1. **Public link = verify + launch in one move.** The bridge login wall just proved the login-gated preview is a dead end for KR's dot check. Publishing to a public link (self-contained file) bypasses Empir3 auth entirely — KR sees the ritual page, confirms the constellation dots, and the same action *is* the launch. Pre-built snapshot means "go" translates directly to done, zero wait.
2. **Turn `recommendations_v1` into KR's "lock the look" sprint — executed by Koba in one pass.** The Five Page Edits + frog-face re-encode + timer-face check are exactly the aesthetic changes KR wanted before Koba's final pass. Actions are already tagged ("Brief Koba", "Ask Koba", "Run live check"). KR approving the list on his return converts this pause into a concrete next round that matches his sequencing.
3. **Keep the shipping-music thread warm.** The first track is in the admin's review log, credited to KR — a gesture that mirrors the frog's warmth. Floating the shared-playlist idea when KR returns strengthens the loop between his empathy and team momentum, and gives launch copy a natural hook.

## Next Steps
- **Hold until KR checks back in** — no further pushes this session; the pause is respected.
- On KR's return: present the **public-link path** as the fix for the dot check (bypasses the 405 entirely); offer to publish immediately so he can see the ritual page live.
- Present `recommendations_v1` for approval; on sign-off, brief Koba for the combined aesthetic + final technical/UX pass.
- Pre-build the self-contained snapshot now so KR's "go" = publish with no encoding or setup delay.
- Coordinate with Empir3 admin on the 405 fix (b004e7eb) — the isolated-session login wall may affect other workflows beyond Frog Focus.
- Post-launch: reschedule Zara's deep pass when Grok recovers; cleanup pass (legacy clips, stale `TTS-SETUP.md`); decide on the shipping-music playlist.

---
*Last updated: 2026-08-15T21:41Z*