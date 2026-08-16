# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging, American male — **Will (Relaxed Optimist)**, confirmed by KR by ear.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond** (lily pads, lotus growth), ambient touches (rain, fireflies), second frog friend, daily streak, pre-focus checklist.
- **Launch strategy locked: ship the current build first** — roadmap features are update runway.

## Current Status
- **Session ACTIVE — KR is live-testing audio on the bridge window** (`?fresh=3` cache-bust). Audio is audible now, but KR reported two remaining bugs: the **first short break plays the focus clip instead of the short-break clip**, and the **later short breaks are silent**.
- **Final voice root cause found and fix shipped.** The clips were going through Web Audio's `decodeAudioData`, which rejects them and silently falls back to text-to-speech. TTS is allowed on a user gesture (the Start tap) but **blocked from the timer** — explaining exactly why breaks stayed silent while chimes worked. Fix: **switched to a single persistent `<audio>` element with no decode step**.
- **Fix published and republished; CEO is verifying the live file carries the new code** — same verify workflow as the dot fix (no stale references, script parses, assets 200 with correct MIME).
- **Dot-rendering fix remains confirmed-shipped** from the prior session (hard-spread box-shadows → soft circular glows).
- **KR's Safari/iOS confirmation of the new audio fix is the last functional gate** before the aesthetic pass.
- **Zara's design QA pass still down** (Grok route unavailable; `recommendations_v1` failed after 50 messages, timestamp `1786662085627`). Three recommendations are queued regardless: KR's Five Page Edits, `frog-face.png` re-encode, timer-face live check.
- **Everything else is launch-ready**: Will's 5 clips verified, `PHRASE_AUDIO` on real `.mp3` paths, roadmap written, public link live.

## Files & Structure
- **Core Page**: `index.html` (71KB) — "Frog Focus — your intentional productivity companion"; `PHRASE_AUDIO` map → real `.mp3` paths; per-state frog image wiring; cycle-pill labels; **soft-glow dots + persistent `<audio>` element (no decode)** now in the published bytes. References `audio/`, `images/`, `uploads/` as external paths.
- **Backend**: `server.js` (5KB) — statically serves `audio/`, `images/`, `uploads/`; `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Scripts** (`scripts/`, 5 files): `generate-will-clips.js` — production track (the 5 shipped Will clips); `generate-more-clips.js` — vetted candidate voice menu; 3 pre-existing clip-generation scripts.
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy files (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup. **Hash audit completed: all files unique — mislabeled-clip theory disproven; the bug was the code path, not file content.** `preview/` voice auditions cross-checked.
- **Images**: `images/` (8 files — `frog-face.png` is JPEG bytes under a .png name, queued for re-encode); `uploads/` (21 files, all images — confirms MIME-level upload filter).
- **Screenshots**: `screenshots/` (9 files) — bridge-window debugging captures (login wall, hero, dot section, audio checks).
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; `TTS-SETUP.md` (4KB) — stale, rewrite or delete.

## Key Decisions Made
- **Voice bug fully closed: no `decodeAudioData` anywhere.** The silent-TTS-fallback path (allowed on gesture, blocked on timer) was the true culprit for the wrong/silent short-break clips. The persistent `<audio>` element with `.src` swap + `.play()` is now the single audio path.
- **Audio file-content integrity confirmed by hash audit** — all 29 files unique; symptoms were code-path, not mislabeled files. No regeneration needed.
- **Dot root cause locked (prior session): hard-spread box-shadows**, not `border-radius`. Fix shipped as blurred circular glows.
- **`?fresh=N` cache-busting adopted as the publish-verify workflow** — used again to confirm the republished audio fix.
- **Republish confirmed live (prior session):** `https://usercontent.empir3.com/p/a3adb503b8/index.html` serves the fixed file.
- Earlier (unchanged): bridge login wall diagnosed as Empir3-side 405 (ref **b004e7eb**, logged with admin); sequencing locked (aesthetic changes → Koba's single combined pass); voice locked (Will, `.mp3`); scope locked (ship current build); shipping-music first track delivered to admin.

## Pending Decisions
- **KR's confirmation of the final audio fix** — one fresh-load, full-cycle listen: focus intro, first short break, second/later short breaks. This is the gate before the aesthetic pass.
- **Public link = launch or staging?** The URL is live and shareable; KR's call on whether that *is* the official launch or a pre-launch preview.
- **KR's Five Page Edits** (`recommendations_v1`): dark mode → frog green, "productive tool" copy, "the what" section, beverage line, recharge copy — queued to brief Koba once KR defines/confirms details.
- **`frog-face.png` re-encode** to a real PNG before publish.
- **Timer face in ring + cycle-pill wrap live checks** — not yet confirmed; batch into the next bridge window.
- **Unify `voiceOn`/`soundOn` flags** — code-quality cleanup to fold into Koba's pass, or leave as-is given the persistent-element fix works.
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
- [x] **Retry Zara's pass at KR's request** — route still down; logged, no further loops
- [x] **Publish to public link and open in bridge** — URL live and accessible
- [x] **Root-cause dot rendering** — hard-spread box-shadows; fix shipped as soft circular glows
- [x] **KR live audio test** — audio audible, but wrong clip on first short break + silence on later breaks reported
- [x] **Hash-audit all audio files** — all 29 unique; mislabeled-clip theory disproven
- [x] **Root-cause remaining audio bugs** — `decodeAudioData` rejection → silent TTS fallback, gesture-gated (works on Start tap, blocked on timer)
- [x] **Ship final voice fix** — single persistent `<audio>` element, no decode step; published
- [x] **Republish and verify live bytes** — confirming the fix is in the served file
- [ ] **KR's fresh-load, full-cycle confirmation** — first short break plays the correct clip; later breaks play their clips; no silence
- [ ] **KR's final timer-cycle run-through** — verify phase/off-beat behavior end to end
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
1. **One full-cycle listen closes the last functional gate.** The fix is published and server-verified; a single fresh-load test from KR — focus intro, first short break, then later breaks — proves all five Will clips rotate correctly and clears the path to the aesthetic pass. Ask for exactly that one test.
2. **Codify the `?fresh=N` publish-verify pattern.** It now worked end-to-end twice (dot fix, voice fix): cache-bust → live check → republish → confirm 200s/MIME. Standardizing it for Frog Focus and future Empir3 publishes eliminates the entire "is it live or cached" class of bugs.
3. **Package the mechanical cleanup with Koba's pass.** The `voiceOn`/`soundOn` split, `frog-face.png` re-encode, legacy clip removal, and stale `TTS-SETUP.md` are all small and ride along with the Five Page Edits — one briefing to Koba, one pass, no serial round-trips.

## Next Steps
- **Get KR's fresh-load, full-cycle confirmation of the audio fix** (first break = short-break clip, later breaks audible) — the gate that unlocks the aesthetic pass.
- **Present `recommendations_v1` to KR** to lock the Five Page Edits; on sign-off, brief Koba for the combined aesthetic + technical/UX pass (include `frog-face.png` re-encode and flag unification).
- **Batch remaining live checks into the next bridge window:** timer face in the ring, cycle-pill wrap, dot-section screenshot for the record.
- **Confirm with KR whether the public link is the launch or staging** — if staging, the official "go" is still his word, now a one-word decision with zero wait.
- **Coordinate the Empir3 405 fix (b004e7eb) in parallel** — affects other bridge workflows beyond Frog Focus.
- Post-launch: reschedule Zara's deep pass when Grok recovers; cleanup pass (legacy clips, stale `TTS-SETUP.md`); decide on the shipping-music playlist.

---
*Last updated: 2026-08-16T15:11Z*