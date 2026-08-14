# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion ("Frog Focus — your intentional productivity companion"), inspired by pomodorokitty.com — not a clone.
- Flat-vector frog mascot as consistent identity (sage green body, cream belly, clay accents, golden-rimmed round glasses, warm yellow eyes, thin charcoal linework); phase-specific visuals auto-swap, no frog picker.
- Positioning locked: **"your intentional productivity companion"** — a **productive tool**; "Slow down. Focus. Get the good stuff done."; the frog is a **friend**.
- Timer voice: warm, comforting, encouraging. **Antoni (ElevenLabs) locked as default; words locked verbatim; only delivery changes.**
- Secure voice pipeline: ElevenLabs via Express proxy with phrase caching — key lives only in server env; browser `speechSynthesis` fallback. Wiring complete and smoke-tested.
- **Rotating break sayings:** between-pomodoro phrases should vary each time instead of repeating the same message.
- Deployment target identified (unfunded): headless VPS (1 GB RAM, $36/year) — local run bridge is the gate.
- **Share in the Emporium:** KR wants to publish the finished page to the community; the public link lives under the project and the post appears under KR's account/name.

## Current Status
- **KR is mid-QA** on the full timer cycle; CEO standing by for notes, then a batch publish.
- **Long-break frog fixed:** root cause was a white square baked into `images/frog-longbreak.png` (not a CSS issue). Designer regenerated the image with a **true transparent background** — delivered and confirmed clean (`frog-longbreak.png` ready, v=1786720632912). Pending KR's live visual sign-off.
- **Rotating sayings — new request, in progress:** KR asked for different sayings between pomodoros each time. Assigned to Koba (code) in parallel with Zara's frog work. Not yet implemented.
- **Hint-text removal complete and confirmed:** "Press space to begin" (idle) and "Space to pause" (running) are hidden; the **space-bar shortcut still works**.
- **Emporium publishing — partial answer:** live link sits under the project; KR (account owner) posts from her account. Exact listing flow and display-name behavior **unconfirmed**. CEO has no live admin line but will pull docs and file a note to the admin's review queue; KR said "share what you find."
- **Editing model clarified:** this chat is the control room; publishing copies the file to a public link; edits are never locked; re-publishing pushes fresh versions to the same link.

## Files & Structure
- **Core app** (`index.html`, 70KB): single-page app — all UI, timer logic, phase visuals, copy, and the to-be-added sayings rotation. Every edit so far lands here.
- **Mascot & phase visuals** (`images/`, 7 files): `frog-focus.png` (canonical reference for all poses), `frog-face.png` (⚠️ JPEG bytes under a .png name — needs re-encode), `frog-longbreak.png` (✅ rebuilt, transparent), plus 4 other phase images.
- **Voice pipeline**: `server.js` (5KB), `TTS-SETUP.md` (4KB), `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (69 files); **audio cache** (`audio/`, 1 file). Express proxy + phrase cache; key in env; `speechSynthesis` fallback.
- **Reference material** (`uploads/`, 9 files): screenshots KR shared for edit direction.

## Key Decisions Made
- Positioning, tagline, "productive tool" framing, and frog-as-friend — locked.
- Antoni voice + verbatim timer copy; only delivery varies.
- Phase-specific visuals auto-swap; no frog picker.
- Hint text removed; space-bar shortcut intentionally kept silent.
- **Long-break frog background:** fix handled at the image level (regenerate PNG with true transparency), not CSS.
- **Rotating sayings between pomodoros:** requested by KR; phrases should differ on each break. Assigned to Koba (code); Zara handled the frog rebuild in parallel.
- Publishing model: copy at public link → re-publish to update; KR's account owns the post.

## Pending Decisions
- Emporium listing specifics (exact listing flow, display-name behavior) — awaiting docs/admin-queue response.
- Sayings content: exact list/wording of the rotating between-pomodoro phrases (KR to approve).
- Whether to self-host on the VPS before or after the Emporium publish.
- KR's visual sign-off on the new transparent `frog-longbreak.png`.

## Tasks
- [x] Lock product positioning and voice (Antoni, verbatim copy)
- [x] Wire secure TTS pipeline (Express proxy + cache + fallback) — smoke-tested
- [x] Remove hint texts ("Press space to begin" / "Space to pause") — shortcut still works
- [x] Diagnose long-break frog issue (root cause: baked-in white box in PNG, not CSS)
- [x] Rebuild `frog-longbreak.png` with true transparent background (Zara)
- [ ] KR live-browser sign-off on transparent long-break frog
- [ ] Implement rotating sayings between pomodoros in `index.html` (Koba)
- [ ] Finalize the sayings list/content with KR
- [ ] Apply KR's Five Page Edits: dark mode → frog green; "productive tool"; "the what"; beverage line; recharge copy (queued)
- [ ] Re-encode `frog-face.png` as a true PNG (JPEG bytes mislabeled)
- [ ] Live-browser check in Chrome: timer face sits correctly inside the ring
- [ ] KR completes full timer-cycle QA
- [ ] Confirm Emporium publishing mechanics (docs + admin review queue note) and share findings with KR
- [ ] Batch publish to public link; share in Emporium under KR's account

## Opportunities
1. **Make the sayings rotation data-driven** — implement the phrase list as a simple editable array in `index.html` so KR can add/tweak sayings anytime without code changes. Low effort, high ongoing value.
2. **Reuse the transparent long-break frog** beyond the break page — e.g., session-completion flash or social share card — extending the mascot identity with zero new art.
3. **Ship one polished release** — batch the Five Page Edits, sayings rotation, and frog-face fix into a single QA pass and Emporium publish, so the public link launches clean instead of showing incremental edits.

## Next Steps
1. Run the live Chrome check — confirm the long-break frog renders transparent and the timer face sits correctly in the ring.
2. Koba: implement rotating sayings; KR supplies/approves the phrase list.
3. Apply the Five Page Edits to `index.html`.
4. Re-encode `frog-face.png` as a real PNG.
5. Pull Emporium docs + file note to admin review queue; share findings with KR.
6. KR completes QA → batch publish to the public link.

---
*Last updated: 2026-08-14T15:17Z*