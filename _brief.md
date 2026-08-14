# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion ("Frog Focus — your intentional productivity companion"), inspired by pomodorokitty.com — not a clone.
- Flat-vector frog mascot as consistent identity (sage green body, cream belly, clay accents, golden-rimmed round glasses, warm yellow eyes, thin charcoal linework); phase-specific visuals auto-swap, no frog picker.
- Positioning locked: **"your intentional productivity companion"** — a **productive tool**; "Slow down. Focus. Get the good stuff done."; the frog is a **friend**.
- Timer voice: warm, comforting, encouraging. **Antoni (ElevenLabs) locked as default; words locked verbatim; only delivery changes.**
- Secure voice pipeline: ElevenLabs via Express proxy with phrase caching — key lives only in server env; browser `speechSynthesis` fallback. Wiring complete and smoke-tested.
- **Rotating break sayings:** between-pomodoro phrases should differ every time instead of repeating the same message — in progress, assigned to Koba.
- **Constellation star twinkle:** dots now genuinely twinkle (opacity + gold glow flicker, staggered) — **implemented and confirmed done.**
- Deployment target identified (unfunded): headless VPS (1 GB RAM, $36/year) — local run bridge is the gate.
- **Share in the Emporium:** publish the finished page to the community; public link lives under the project and the post appears under KR's account/name.

## Current Status
- **KR is mid-QA** on the full timer cycle; CEO standing by for notes, then a batch publish.
- **Parallel work confirmed and already exercised:** KR asked whether other edits can proceed while one is in progress — yes. Frog cutout and sayings dispatch ran concurrently; the queued Five Page Edits can follow the same pattern.
- **Constellation twinkle — done.** Koba replaced the calm `dot-pulse` scale/opacity swell with `@keyframes dot-twinkle` in `index.html`: opacity flickers ~0.35 → ~1.0 with two bright spikes over 2.5s; warm white/gold box-shadow glow (`rgba(255,255,255,.7)` + soft gold falloff) on bright frames; every dot blinks on its own staggered delay/duration so the constellation shimmers out of sync. CEO relayed completion to KR.
- **Long-break frog rebuilt with true transparency — done.** Root cause confirmed: a white square baked into the PNG (not CSS). AI generation could not deliver real transparency (background kept reappearing even without the boxy reference); Zara flagged the tooling limit directly and switched to a code-side cutout. Deliveries, both confirmed clean: `frog-longbreak.png` (v=1786720632912 — the file the page uses) and `frog-transparent.png` (v=1786720750759 — variant produced during the cutout). `scripts/frog-bg-removal.js` was saved with the work. **Awaiting KR's live-browser sign-off.**
- **Rotating sayings — assigned, not yet implemented:** KR re-confirmed the request ("new sayings in between the pomodoros so they are different every time instead of the same"). Koba owns the code; phrase content still needs KR approval.
- **Five Page Edits queued** (recommendations_v1, action: brief Koba): dark mode → frog green, "productive tool" framing, "the what" copy, beverage line, and recharge copy — not yet applied.
- **Hint-text removal complete and confirmed:** "Press space to begin" (idle) and "Space to pause" (running) are hidden; the **space-bar shortcut still works**.
- **Emporium publishing — partial answer:** live link sits under the project; KR (account owner) posts from her account. Exact listing flow and display-name behavior **unconfirmed**. CEO will pull docs and file a note to the admin review queue.
- **Editing model clarified:** this chat is the control room; publishing copies the file to a public link; edits are never locked; re-publishing pushes fresh versions to the same link.

## Files & Structure
- **Core app** (`index.html`, 72KB): single-page app — all UI, timer logic, phase visuals, copy, the new `dot-twinkle` constellation animation, and the to-be-added sayings rotation. Every edit so far lands here.
- **Mascot & phase visuals** (`images/`, 8 files): `frog-focus.png` (canonical reference for all poses), `frog-face.png` (⚠️ JPEG bytes under a .png name — needs re-encode), `frog-longbreak.png` (✅ rebuilt, true transparency — the file the page uses), `frog-transparent.png` (✅ transparent variant from the cutout), plus 4 other phase images.
- **Background-removal tooling** (`scripts/frog-bg-removal.js`, 1 file): created during the frog cutout; saved in the workspace alongside the new assets.
- **Voice pipeline**: `server.js` (5KB), `TTS-SETUP.md` (4KB), `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files); **audio cache** (`audio/`, 1 file). Express proxy + phrase cache; key in env; `speechSynthesis` fallback.
- **Reference material** (`uploads/`, 9 files): screenshots KR shared for edit direction, including the long-break bug shot.

## Key Decisions Made
- Positioning, tagline, "productive tool" framing, and frog-as-friend — locked.
- Antoni voice + verbatim timer copy; only delivery varies.
- **Parallel workstreams are fine** — KR can push multiple edits while one is in flight; CEO coordinates assignments (e.g., Zara on images, Koba on code).
- Phase-specific visuals auto-swap; no frog picker.
- Hint text removed; space-bar shortcut intentionally kept silent.
- **Long-break frog background:** fixed at the image level (true-transparency PNG), not via CSS.
- **AI generation can't do true transparency** — a code-side cutout was required; Zara flagged the limitation directly rather than shipping a flawed asset.
- **Only the long-break frog needed the rebuild** — KR confirmed the other frog images were already fixed yesterday.
- **Constellation twinkle direction — locked in and shipped:** replace the slow `dot-pulse` (scale+opacity swell) with a quicker **opacity/brightness flicker** (`dot-twinkle`) — a true star twinkle, not a breathing pulse. Warm white/gold glow syncs with bright frames; per-dot stagger gives organic shimmer.
- **Rotating sayings:** user-requested; phrases should differ on each break. Koba owns the code.
- Publishing model: copy at public link → re-publish to update; KR's account owns the post.

## Pending Decisions
- Sayings content: exact list/wording of the rotating between-pomodoro phrases (KR to approve).
- KR's visual sign-off on the new transparent `frog-longbreak.png` in the live browser.
- Canonical transparent frog file (only `frog-longbreak.png` is used by the page; `frog-transparent.png` is a same-style variant — keep, delete, or reuse).
- Whether to keep `scripts/frog-bg-removal.js` in the repo or treat it as one-off tooling.
- Emporium listing specifics (exact listing flow, display-name behavior) — awaiting docs/admin-queue response.
- Whether to self-host on the VPS before or after the Emporium publish.

## Tasks
- [x] Lock product positioning and voice (Antoni, verbatim copy)
- [x] Wire secure TTS pipeline (Express proxy + cache + fallback) — smoke-tested
- [x] Remove hint texts ("Press space to begin" / "Space to pause") — shortcut still works
- [x] Diagnose long-break frog issue (root cause: baked-in white box in PNG, not CSS)
- [x] Rebuild `frog-longbreak.png` with true transparent background (Zara) — delivered & confirmed
- [x] Produce `frog-transparent.png` variant via code-side cutout (`scripts/frog-bg-removal.js` saved)
- [x] Implement constellation twinkle — `dot-twinkle` opacity/gold-glow flicker with staggered per-dot timing replaces `dot-pulse` (Koba) — confirmed done
- [ ] KR live-browser sign-off on transparent long-break frog
- [ ] Implement rotating sayings between pomodoros in `index.html` (Koba) — phrases differ each time
- [ ] Finalize the sayings list/content with KR
- [ ] Apply KR's Five Page Edits (brief Koba per recommendations_v1): dark mode → frog green; "productive tool"; "the what"; beverage line; recharge copy
- [ ] Re-encode `frog-face.png` as a true PNG (JPEG bytes mislabeled) — per recommendations_v1
- [ ] Live-browser check in Chrome: timer face sits correctly inside the ring — per recommendations_v1
- [ ] Verify twinkle in the live browser while checking the timer ring (same QA pass)
- [ ] KR completes full timer-cycle QA
- [ ] Confirm Emporium publishing mechanics (docs + admin review queue note) and share findings with KR
- [ ] Batch publish to public link; share in Emporium under KR's account

## Opportunities
1. **Make the sayings rotation data-driven** — implement the phrase list as a simple editable array in `index.html` so KR can add/tweak sayings anytime without code changes. Low effort, high ongoing value.
2. **Bundle the remaining `index.html` work into one Koba batch** — rotating sayings + Five Page Edits are all edits to the same file; one Koba pass with one QA cycle keeps the review tight instead of two round-trips. The twinkle already landed in the same file.
3. **Reuse the transparent frog + cutout script beyond the break page** — e.g., a session-completion flash or social share card using `frog-longbreak.png`/`frog-transparent.png`; the same script could clean up any other phase image with a baked-in background. Extends the mascot identity with zero new art.

## Next Steps
1. Brief Koba on the Five Page Edits (recommendations_v1) — can run in parallel with KR's frog review, per the confirmed parallel-work model.
2. Koba: implement rotating sayings; KR supplies/approves the phrase list.
3. Run the live Chrome check — confirm the long-break frog renders transparent, the timer face sits correctly in the ring, **and the twinkle animates in-browser** (single QA pass).
4. Re-encode `frog-face.png` as a real PNG; confirm disposition of `frog-transparent.png` and `scripts/frog-bg-removal.js`.
5. Pull Emporium docs + file note to admin review queue; share findings with KR.
6. KR completes QA → batch publish to the public link.

---
*Last updated: 2026-08-15T12:10Z*