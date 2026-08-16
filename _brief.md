# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging, American male — **Will (Relaxed Optimist)**, confirmed by KR by ear.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond** (lily pads, lotus growth), ambient touches (rain, fireflies), second frog friend, daily streak, pre-focus checklist.
- **Launch strategy locked: ship the current build first** — roadmap features are update runway.

## Current Status
- **Session ACTIVE — final decode/diagnostic test in flight.** KR confirmed "ready"; CEO opened `https://usercontent.empir3.com/p/a3adb503b8/index.html?diag=5` in the bridge window. Results pending.
- **Audio fix republished to the live link with KR's explicit "go."** Published `index.html` now includes the **silent-buffer unlock** + **on-screen diagnostics**; syntax clean and live bytes confirmed.
- **Live bridge diagnostics gave hard proof the files were not the problem:** every clip serves HTTP 200 with correct `audio/mpeg`, every clip decodes cleanly in KR's actual browser, and the AudioContext reports `running`. The failure was in timer → speak wiring / autoplay-user-gesture handling, not in assets.
- **Three prior failed guess-patches are now closed.** Root cause settled as: shared `voiceEl` race (play-before-load) compounded by autoplay-unlock on the real device. Fix shipped and live.
- **`diag.html` added** as a lightweight diagnostic harness (2KB) in the root workspace.
- **Zara's design QA pass still down** (Grok route unavailable; `recommendations_v1` failed after 50 messages, fail_ts `1786662085627`). 3 recommendations remain queued: KR's Five Page Edits, `frog-face.png` re-encode, timer-face live check.
- **Everything else launch-ready:** Will's 5 clips verified, `PHRASE_AUDIO` on real `.mp3` paths, public link live, roadmap written.

## Files & Structure
- **Core Page**: `index.html` (73KB) — "Frog Focus — your intentional productivity companion"; now includes `unlockAudio()` in `start()`, silent-buffer unlock, on-screen diagnostics, play-after-load race fix, `PHRASE_AUDIO` → real `.mp3` paths, per-state frog image wiring, cycle-pill labels, soft-glow dots. References `audio/`, `images/`, `uploads/` as external paths.
- **Diagnostic Harness**: `diag.html` (2KB) — "Frog Focus audio diag"; fetch/decode/report page used from the bridge window; likely removable or fold-back into support tooling before final polish.
- **Backend**: `server.js` (5KB) — statically serves `audio/`, `images/`, `uploads/`; `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Scripts** (`scripts/`, 5 files): `generate-will-clips.js` — production track (the 5 shipped Will clips); `generate-more-clips.js` — vetted candidate voice menu; 3 pre-existing clip-generation scripts.
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy files (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup. All 29 files hash-unique.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under a .png name, queued for re-encode); `uploads/` (21 files, all images — confirms MIME-level upload filter).
- **Screenshots**: `screenshots/` (9 files) — bridge-window debugging captures (login wall, hero, dot section, audio checks).
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; `TTS-SETUP.md` (4KB) — stale, rewrite or delete.

## Key Decisions Made
- **KR gave explicit "go" to republish the audio fix** — the live link is now running the new code.
- **Audio fix shipped live includes the unlock path:** `unlockAudio()` now runs from the real click gesture in `start()`, plus silent-buffer unlock and on-screen diagnostics.
- **Audio root cause is confirmed and closed:** not files, not decode, not serving — shared `voiceEl` race + autoplay-user-gesture gap. Play-after-load and unlock are live.
- **`Evaluate JS` enabled in Bridge** — live in-browser diagnostics now possible; the decode question was settled in one live test instead of file-format forensics.
- **Audio file-content integrity confirmed by hash audit** — all 29 files unique; no mislabeled-clip bug.
- **`?fresh=N` cache-busting adopted as the publish-verify workflow** — now proven multiple times (dot fix, voice fix, race fix, audio fix).
- **Public link confirmed live:** `https://usercontent.empir3.com/p/a3adb503b8/index.html` serves the fixed file.
- Earlier (unchanged): bridge login wall diagnosed as Empir3-side 405 (ref **b004e7eb**, logged with admin); sequencing locked (aesthetic changes → Koba's single combined pass); voice locked (Will, `.mp3`); scope locked (ship current build); shipping-music first track delivered to admin.

## Pending Decisions
- **Decode/diagnostic result** — `?diag=5` test is running in the bridge window; interpret the output to close the audio saga.
- **KR's fresh-load confirmation** — one full-cycle listen: focus intro, first short break, later short breaks all audible and correct. This is the gate before the aesthetic pass.
- **Public link = launch or staging?** The URL is live and shareable; KR's call on whether that *is* the official launch or a pre-launch preview.
- **KR's Five Page Edits** (`recommendations_v1`): dark mode → frog green, "productive tool" copy, "the what" section, beverage line, recharge copy — queued to brief Koba once details are confirmed.
- **`frog-face.png` re-encode** to a real PNG before publish.
- **Timer face in ring + cycle-pill wrap live checks** — not yet confirmed; batch into the next bridge window.
- **Unify `voiceOn`/`soundOn` flags** — code-quality cleanup to fold into Koba's pass.
- **`diag.html` disposition** — keep as a reusable diagnostic or remove from the public root before final launch.
- **Zara's design QA deep pass** — reschedule when the Grok route recovers; no further retry attempts until then.
- **Shipping-music playlist** — whether to formalize a rotating playlist is unpicked.
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
- [x] **Retry Zara's pass at KR's request** — route still down; logged, no further loops
- [x] **Publish to public link and open in bridge** — URL live and accessible
- [x] **Root-cause dot rendering** — hard-spread box-shadows; fix shipped as soft circular glows
- [x] **KR live audio test** — audio audible, but wrong clip on first short break + silence on later breaks reported
- [x] **Hash-audit all audio files** — all 29 unique; mislabeled-clip theory disproven
- [x] **Root-cause remaining audio bugs after 3 failed patches** — shared `voiceEl` race + autoplay-unlock gap
- [x] **Ship final voice fix (play-after-load)** — published, live bytes verified
- [x] **KR enables `Evaluate JS` in Bridge** — confirmed "done"; live JS diagnostics now possible
- [x] **KR approves republishing the audio fix** — explicit "go"; `index.html` republished live
- [x] **Ship silent-buffer unlock + on-screen diagnostics** — live on the public link; syntax clean
- [x] **Create `diag.html` diagnostic harness** — fetch/decode/report utility in the workspace
- [x] **Verify audio serving live** — HTTP 200, correct `audio/mpeg`, correct sizes
- [x] **Verify decode in KR's actual bridge browser** — every clip decodes `OK`, AudioContext `running`
- [ ] **Complete decode/diagnostic test** — interpret `?diag=5` output in the bridge window
- [ ] **KR's fresh-load, full-cycle confirmation** — first short break plays the correct clip; later breaks play their clips; no silence
- [ ] **KR's final timer-cycle run-through** — verify phase/off-beat behavior end to end
- [ ] **KR's go → official launch** — public link live; final step is KR's call
- [ ] Apply KR's Five Page Edits: dark mode → frog green, "productive tool" copy, "the what" section, beverage line, recharge copy
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Live Chrome check: timer face sits right in the ring (batch with bridge session)
- [ ] Verify cycle-strip pills wrap correctly (batch with bridge session)
- [ ] Decide `diag.html` removal/retention before launch
- [ ] Unify `voiceOn`/`soundOn` toggle flags (fold into Koba's pass)
- [ ] **Koba's single final pass** — implement `recommendations_v1` edits + technical/UX together; queued until KR's aesthetic changes are defined
- [ ] Zara design QA deep pass — reschedule when Grok recovers
- [ ] Coordinate with Empir3 admin on the 405 fix (b004e7eb)
- [ ] Rewrite or delete stale `TTS-SETUP.md`
- [ ] Clean up legacy preview clips (Antoni, Josh, Charlie, earlier Adam)
- [ ] Decide whether to formalize the "shipping music" playlist for Koba

## Opportunities
1. **Codify the live-diagnostic playbook now that `evaluate` is enabled.** The decode question that previously required file-format forensics is now a 30-second live test. Pair live `evaluate` with the proven `?fresh=N` publish-verify workflow into a standard Empir3 debugging loop — it eliminates the "is it live or cached / is it the file or the code" class of bugs that cost three failed patches this session. `diag.html` already works as a reusable harness; formalize it.
2. **Close the last functional gate with one fresh load.** The decode test is minutes from settling the audio question definitively. The moment it passes, ask KR for exactly one full-cycle listen — if the five Will clips rotate correctly, every functional issue is closed and the aesthetic pass can begin immediately. This is the single highest-leverage ask available.
3. **Package all mechanical cleanup into Koba's single pass.** `voiceOn`/`soundOn` flag unification, `frog-face.png` re-encode, legacy clip removal, stale `TTS-SETUP.md` rewrite, and `diag.html` retention/removal all ride along with the Five Page Edits — one briefing to Koba, one pass, no serial round-trips. Get KR to lock the Five Page Edits details while the diagnostic runs so nothing blocks the aesthetic phase.

## Next Steps
- **Interpret the `?diag=5` result** (running live in the bridge window now); if clean, immediately request KR's fresh-load full-cycle listen — the gate that unlocks the aesthetic pass.
- **Ask KR for the official launch call** once the full-cycle listen passes. The public link is already live; the "go" is now a one-word decision with zero wait.
- **Present `recommendations_v1` to KR** to lock the Five Page Edits; on sign-off, brief Koba for the combined aesthetic + technical/UX pass (include `frog-face.png` re-encode, flag unification, and `diag.html` disposition).
- **Batch remaining live checks into the next bridge window:** timer face in the ring, cycle-pill wrap, dot-section screenshot for the record.
- **Coordinate the Empir3 405 fix (b004e7eb) in parallel** — affects other bridge workflows beyond Frog Focus.
- Post-launch: reschedule Zara's deep pass when Grok recovers; cleanup pass (legacy clips, stale `TTS-SETUP.md`); decide on the shipping-music playlist.

---
*Last updated: 2026-08-16T16:39Z*