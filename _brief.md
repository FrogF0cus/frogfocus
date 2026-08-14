# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion ("Frog Focus — your intentional productivity companion"), inspired by pomodorokitty.com — not a clone.
- Flat-vector frog mascot as consistent identity (sage green body, cream belly, clay accents, golden-rimmed round glasses, warm yellow eyes, thin charcoal linework); phase-specific visuals auto-swap, no frog picker.
- Positioning locked: **"your intentional productivity companion"** — a **productive tool**; "Slow down. Focus. Get the good stuff done."; the frog is a **friend**.
- Timer voice: warm, comforting, encouraging. **Antoni (ElevenLabs) locked as default; words locked verbatim; only delivery changes.**
- Secure voice pipeline: ElevenLabs via Express proxy with phrase caching — key lives only in server env; browser `speechSynthesis` fallback. Wiring complete and smoke-tested.
- **Rotating break sayings:** between-pomodoro phrases differ every time — **implemented by Koba; awaiting KR's review of the actual phrase list.**
- **Constellation star twinkle:** dots genuinely twinkle (opacity + gold glow flicker, staggered per-dot timing) — implemented and confirmed.
- Deployment target identified (unfunded): headless VPS (1 GB RAM, $36/year) — local run bridge is the gate.
- **Share in the Emporium:** publish the finished page to the community; public link lives under the project and the post appears under KR's account/name.

## Current Status
- **Both outstanding workstreams confirmed done by CEO.** Koba reported: the long-break frog is genuinely transparent (real alpha channel verified at pixel level — ~67.7% of pixels transparent, no baked white box), and the rotating-sayings edit is implemented in `index.html`.
- **White-box mystery solved — it was a stale tab.** The file `images/frog-longbreak.png` (the one the page uses) was already a genuine RGBA PNG; the lingering box KR saw in the browser was almost certainly a stale cache/tab, not the image. A hard-refresh should clear it.
- **Rotating sayings:** Koba implemented the phrase rotation in `index.html` alongside the frog verification. The exact sayings content now lives in code; KR needs to review/approve the actual phrases.
- **Cutout tooling fixed:** `scripts/frog-bg-removal.js` was stale (it decoded the file as JPEG, but the file is now PNG) — Koba fixed it against the current file, re-ran it, and verified it reproduces the transparent frog cleanly.
- **Constellation twinkle — done.** `@keyframes dot-twinkle` replaces the old `dot-pulse`: opacity flickers ~0.35 → ~1.0 with two bright spikes over 2.5s, warm white/gold box-shadow glow on bright frames, per-dot staggered delays/durations.
- **KR is mid-QA** on the full timer cycle; Five Page Edits (recommendations_v1) are queued, not yet applied.
- **Emporium publishing — partial answer:** live link sits under the project; KR (account owner) posts from her account. Exact listing flow and display-name behavior **unconfirmed**; docs + admin-queue note filed.

## Files & Structure
- **Core app** (`index.html`, ~73KB): single-page app — all UI, timer logic, phase visuals, copy, `dot-twinkle` animation, and the newly added rotating-sayings logic. Every edit so far lands here.
- **Mascot & phase visuals** (`images/`, 8 files): `frog-focus.png` (canonical reference for all poses), `frog-face.png` (⚠️ JPEG bytes under a .png name — needs re-encode), `frog-longbreak.png` (✅ **confirmed true RGBA alpha** — the file the page uses), `frog-transparent.png` (✅ transparent variant from the cutout work), plus 4 other phase images.
- **Background-removal tooling** (`scripts/frog-bg-removal.js`, 1 file): fixed and verified against the current PNG state; saved with the new assets.
- **Voice pipeline**: `server.js` (5KB), `TTS-SETUP.md` (4KB), `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files); **audio cache** (`audio/`, 1 file). Express proxy + phrase cache; key in env; `speechSynthesis` fallback.
- **Reference material** (`uploads/`, 9 files): screenshots KR shared for edit direction, including the long-break bug shot and the two pattern-reference images used in the cutout.

## Key Decisions Made
- Positioning, tagline, "productive tool" framing, frog-as-friend — locked.
- Antoni voice + verbatim timer copy; only delivery varies.
- **Parallel workstreams confirmed and exercised** — KR can push multiple edits while one is in flight; CEO coordinates (Zara on images, Koba on code).
- Phase-specific visuals auto-swap; no frog picker.
- Hint text removed; space-bar shortcut intentionally kept silent.
- **Long-break frog background is fixed at the image level** (true-transparency PNG), not via CSS.
- **The lingering white box was diagnosed as stale browser cache, not the file** — the image was already a genuine RGBA PNG; pixel-level verification (67.7% transparent) confirmed it.
- **AI generation can't do true transparency** (confirmed twice) — code-side cutout is the required path; when tooling can't deliver, flag it directly and switch approaches.
- **Only the long-break frog needed the rebuild** — KR confirmed the other frog images were already fixed earlier.
- **Constellation twinkle direction locked and shipped:** quick opacity/brightness flicker (`dot-twinkle`), not a breathing scale pulse; warm white/gold glow synced to bright frames; per-dot stagger.
- **Rotating sayings:** user-requested; phrases differ on each break; Koba owns the code — implementation complete, content pending KR's sign-off.
- Publishing model: copy at public link → re-publish to update; KR's account owns the post.

## Pending Decisions
- Sayings content: KR to review/approve the exact phrase list Koba implemented (and confirm whether it's stored as an easily editable array).
- KR's visual sign-off on the transparent `frog-longbreak.png` in the live browser — **hard-refresh/clear cache first** since the file itself is verified clean.
- Disposition of `frog-transparent.png` (keep, delete, or reuse) and `scripts/frog-bg-removal.js` (keep as tooling or one-off).
- Emporium listing specifics (exact listing flow, display-name behavior) — awaiting docs/admin-queue response.
- Whether to self-host on the VPS before or after the Emporium publish.

## Tasks
- [x] Lock product positioning and voice (Antoni, verbatim copy)
- [x] Wire secure TTS pipeline (Express proxy + cache + fallback) — smoke-tested
- [x] Remove hint texts ("Press space to begin" / "Space to pause") — shortcut still works
- [x] Diagnose long-break frog issue (root cause: baked-in white box in PNG, not CSS)
- [x] Attempt AI transparency (Zara) — flagged tooling limit honestly; switched to code-side cutout
- [x] Rebuild `frog-longbreak.png` with true transparent background — delivered
- [x] Produce `frog-transparent.png` variant via code-side cutout; save `scripts/frog-bg-removal.js`
- [x] Fix `frog-bg-removal.js` (stale: decoded as JPEG, file is now PNG), re-run, verify — Koba
- [x] Implement constellation twinkle — `dot-twinkle` opacity/gold-glow flicker with staggered per-dot timing — confirmed done
- [x] Verify long-break frog transparency at pixel level — genuine RGBA alpha confirmed (~67.7% transparent pixels); lingering white box traced to stale tab/cache
- [x] Implement rotating sayings between pomodoros in `index.html` — Koba, done
- [ ] KR review/approve the actual sayings phrase list/content
- [ ] Apply KR's Five Page Edits (brief Koba per recommendations_v1): dark mode → frog green; "productive tool"; "the what"; beverage line; recharge copy
- [ ] Re-encode `frog-face.png` as a true PNG (JPEG bytes mislabeled) — per recommendations_v1
- [ ] Live-browser check in Chrome (hard-refresh to clear stale cache): timer face sits correctly in the ring; transparent long-break frog renders clean; twinkle animates — single QA pass
- [ ] KR completes full timer-cycle QA
- [ ] Confirm Emporium publishing mechanics (docs + admin review queue note) and share findings with KR
- [ ] Batch publish to public link; share in Emporium under KR's account
- [ ] Decide + execute deployment path (local bridge → VPS)

## Opportunities
1. **Add cache-busting to asset URLs.** The white-box scare turned out to be a stale browser tab, not the file. Adding a `?v=` query or content hash to image references would prevent this exact confusion for KR and Emporium visitors on every future update — cheap insurance, and the lesson just surfaced.
2. **Batch the remaining `index.html` work into one Koba pass.** Rotating sayings just landed; the Five Page Edits (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy) all touch the same file. One pass + one QA cycle keeps review tight. While in there, confirm the sayings list is a simple editable array so KR can tune phrases without a code pass.
3. **Reuse the verified transparent frog + fixed cutout script.** The clean `frog-longbreak.png`/`frog-transparent.png` assets could power a session-completion flash or social share card, and the fixed script can clean up any other phase image that ships with a baked-in background (e.g., if `frog-face.png`'s re-encode reveals one). Extends the mascot identity with zero new art.

## Next Steps
1. KR: hard-refresh the live page (clear cache) and run the Chrome check — confirm the long-break frog renders transparent, the timer face sits correctly in the ring, and the twinkle animates (single QA pass).
2. KR: review the sayings phrase list Koba implemented; approve or request tweaks.
3. Brief Koba on the Five Page Edits (recommendations_v1) — can run in parallel with the sayings review per the confirmed parallel-work model.
4. Re-encode `frog-face.png` as a real PNG; decide disposition of `frog-transparent.png` and `scripts/frog-bg-removal.js`.
5. Pull Emporium docs + admin-queue findings; share with KR.
6. KR completes QA → batch publish to the public link.

---
*Last updated: 2026-08-15T14:35Z*