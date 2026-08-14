# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion ("Frog Focus — your intentional productivity companion"), inspired by pomodorokitty.com — not a clone.
- Flat-vector frog mascot as consistent identity (sage green body, cream belly, clay accents, golden-rimmed round glasses, warm yellow eyes, thin charcoal linework); phase-specific visuals auto-swap, no frog picker.
- Positioning locked: **"your intentional productivity companion"** — a **productive tool**; "Slow down. Focus. Get the good stuff done."; the frog is a **friend**.
- Timer voice: warm, comforting, encouraging. **Antoni (ElevenLabs) locked as default; words locked verbatim; only delivery changes.**
- Secure voice pipeline: ElevenLabs via Express proxy with phrase caching — key lives only in server env; browser `speechSynthesis` fallback. Wiring complete and smoke-tested.
- **Rotating break sayings:** between-pomodoro phrases should differ every time — in progress (Koba owns the code).
- **Constellation star twinkle:** dots now genuinely twinkle (opacity + gold glow flicker, staggered per-dot timing) — implemented and confirmed.
- Deployment target identified (unfunded): headless VPS (1 GB RAM, $36/year) — local run bridge is the gate.
- **Share in the Emporium:** publish the finished page to the community; public link lives under the project and the post appears under KR's account/name.

## Current Status
- **Frog transparency workstream — code-side cutout done.** AI generation could not deliver true transparency (Zara reported the tooling limit honestly); Koba cut the frog out in code instead. The saved `scripts/frog-bg-removal.js` was stale — it decoded the file as JPEG, but the file is now PNG — so the developer fixed the script against the current file, re-ran it, and verified. Deliveries confirmed clean: `frog-longbreak.png` (the file the page uses) and `frog-transparent.png` (variant produced during the cutout). **Awaiting KR's live-browser sign-off.**
- **Rotating sayings — in flight alongside the frog work.** KR asked for both moving instead of leaving them hanging; CEO dispatched both concurrently (parallel-work model confirmed and exercised). Koba owns the code; phrase content still needs KR approval.
- **Constellation twinkle — done.** Koba replaced the slow `dot-pulse` with `@keyframes dot-twinkle` in `index.html`: opacity flickers ~0.35 → ~1.0 with two bright spikes over 2.5s, warm white/gold box-shadow glow on bright frames, per-dot staggered delays/durations for organic shimmer.
- **KR is mid-QA** on the full timer cycle; Five Page Edits (recommendations_v1) are queued, not yet applied.
- **Emporium publishing — partial answer:** live link sits under the project; KR (account owner) posts from her account. Exact listing flow and display-name behavior **unconfirmed**; docs + admin-queue note filed.

## Files & Structure
- **Core app** (`index.html`, 72KB): single-page app — all UI, timer logic, phase visuals, copy, the `dot-twinkle` constellation animation, and the to-be-added sayings rotation. Every edit so far lands here.
- **Mascot & phase visuals** (`images/`, 8 files): `frog-focus.png` (canonical reference for all poses), `frog-face.png` (⚠️ JPEG bytes under a .png name — needs re-encode), `frog-longbreak.png` (✅ true transparency — the file the page uses), `frog-transparent.png` (✅ transparent variant), plus 4 other phase images.
- **Background-removal tooling** (`scripts/frog-bg-removal.js`, 1 file): fixed to run against the current PNG state of the images; saved in the workspace with the new assets.
- **Voice pipeline**: `server.js` (5KB), `TTS-SETUP.md` (4KB), `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files); **audio cache** (`audio/`, 1 file). Express proxy + phrase cache; key in env; `speechSynthesis` fallback.
- **Reference material** (`uploads/`, 9 files): screenshots KR shared for edit direction, including the long-break bug shot and pattern-reference images used for the cutout.

## Key Decisions Made
- Positioning, tagline, "productive tool" framing, frog-as-friend — locked.
- Antoni voice + verbatim timer copy; only delivery varies.
- **Parallel workstreams confirmed and exercised** — KR can push multiple edits while one is in flight; CEO coordinates (Zara on images, Koba on code).
- Phase-specific visuals auto-swap; no frog picker.
- Hint text removed; space-bar shortcut intentionally kept silent.
- **Long-break frog background fixed at the image level** (true-transparency PNG), not via CSS.
- **AI generation can't do true transparency** (confirmed twice) — code-side cutout is the required path; when tooling can't deliver, flag it directly and switch approaches.
- **Only the long-break frog needed the rebuild** — KR confirmed the other frog images were already fixed earlier.
- **Constellation twinkle direction locked and shipped:** quick opacity/brightness flicker (`dot-twinkle`), not a breathing scale pulse; warm white/gold glow synced to bright frames; per-dot stagger.
- **Rotating sayings:** user-requested; phrases should differ on each break; Koba owns the code.
- Publishing model: copy at public link → re-publish to update; KR's account owns the post.

## Pending Decisions
- Sayings content: exact list/wording of the rotating between-pomodoro phrases (KR to approve).
- KR's visual sign-off on the transparent `frog-longbreak.png` in the live browser.
- Disposition of `frog-transparent.png` (keep, delete, or reuse) and `scripts/frog-bg-removal.js` (keep as tooling or one-off).
- Emporium listing specifics (exact listing flow, display-name behavior) — awaiting docs/admin-queue response.
- Whether to self-host on the VPS before or after the Emporium publish.

## Tasks
- [x] Lock product positioning and voice (Antoni, verbatim copy)
- [x] Wire secure TTS pipeline (Express proxy + cache + fallback) — smoke-tested
- [x] Remove hint texts ("Press space to begin" / "Space to pause") — shortcut still works
- [x] Diagnose long-break frog issue (root cause: baked-in white box in PNG, not CSS)
- [x] Attempt AI transparency (Zara) — flagged tooling limit honestly; switched to code-side cutout
- [x] Rebuild `frog-longbreak.png` with true transparent background — delivered & confirmed
- [x] Produce `frog-transparent.png` variant via code-side cutout; save `scripts/frog-bg-removal.js`
- [x] Fix `frog-bg-removal.js` (stale: decoded as JPEG, file is now PNG), re-run, verify — Koba
- [x] Implement constellation twinkle — `dot-twinkle` opacity/gold-glow flicker with staggered per-dot timing replaces `dot-pulse` — confirmed done
- [ ] Implement rotating sayings between pomodoros in `index.html` (Koba — in flight)
- [ ] Finalize the sayings list/content with KR
- [ ] Apply KR's Five Page Edits (brief Koba per recommendations_v1): dark mode → frog green; "productive tool"; "the what"; beverage line; recharge copy
- [ ] Re-encode `frog-face.png` as a true PNG (JPEG bytes mislabeled) — per recommendations_v1
- [ ] Live-browser check in Chrome: timer face sits correctly inside the ring — per recommendations_v1
- [ ] KR live-browser sign-off on transparent long-break frog
- [ ] Verify twinkle in the live browser while checking the timer ring (same QA pass)
- [ ] KR completes full timer-cycle QA
- [ ] Confirm Emporium publishing mechanics (docs + admin review queue note) and share findings with KR
- [ ] Batch publish to public link; share in Emporium under KR's account

## Opportunities
1. **Make the sayings rotation data-driven** — implement the phrase list as a simple editable array in `index.html` so KR can add/tweak sayings anytime without code changes. Low effort, high ongoing value.
2. **Batch the remaining `index.html` work into one Koba pass** — rotating sayings + Five Page Edits are all edits to the same file; one pass with one QA cycle keeps review tight instead of multiple round-trips. The twinkle already landed in the same file.
3. **Reuse the transparent frog + fixed cutout script** — e.g., a session-completion flash or social share card using `frog-longbreak.png`/`frog-transparent.png`; the script can also clean up any other phase image with a baked-in background. Extends the mascot identity with zero new art.

## Next Steps
1. Koba: finish the rotating sayings implementation; KR supplies/approves the phrase list.
2. Brief Koba on the Five Page Edits (recommendations_v1) — can run in parallel with the sayings work, per the confirmed parallel-work model.
3. Run the live Chrome check — confirm the long-break frog renders transparent, the timer face sits correctly in the ring, **and** the twinkle animates in-browser (single QA pass).
4. Re-encode `frog-face.png` as a real PNG; confirm disposition of `frog-transparent.png` and `scripts/frog-bg-removal.js`.
5. Pull Emporium docs + admin-queue findings; share with KR.
6. KR completes QA → batch publish to the public link.

---
*Last updated: 2026-08-15T13:10Z*