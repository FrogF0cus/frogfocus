# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion ("Frog Focus — your intentional productivity companion"), inspired by pomodorokitty.com — not a clone.
- Flat-vector frog mascot as consistent identity (sage green body, cream belly, clay accents, golden-rimmed round glasses, warm yellow eyes, thin charcoal linework); phase-specific visuals auto-swap, no frog picker.
- Positioning locked: **"your intentional productivity companion"** — a **productive tool**; "Slow down. Focus. Get the good stuff done."; the frog is a **friend**.
- Timer voice: warm, comforting, encouraging. **Antoni (ElevenLabs) locked as default; words locked verbatim; only delivery changes.**
- Secure voice pipeline: ElevenLabs via Express proxy with phrase caching — key lives only in server env; browser `speechSynthesis` fallback. Wiring complete and smoke-tested.
- **Rotating break sayings — implemented and shipped** in `index.html`; short-break set (8) complete; long-break list still truncated at "Yo..." — capture still owed.
- **Long-break frog transparency — fully resolved at the file level.** Root cause confirmed (a later regeneration overwrote the fixed PNG with a white-boxed version) and fixed via a corrected code-side cutout; pixel-verified clean.
- **Constellation star twinkle — shipped.** Real opacity flicker with warm gold glow, staggered per-dot timing.
- Deployment target identified (unfunded): headless VPS (1 GB RAM, $36/year) — local run bridge is the gate.
- **Share in the Emporium:** publish the finished page to the community; public link lives under the project, post appears under KR's account.

## Current Status
- **Rotating sayings — implemented.** KR requested swapping three lines ("Blink slow, little frog"; "A sip for the pond, pal"; "you earned the big one"); CEO delivered the updated rotation sets and Koba implemented them in `index.html`. **Short breaks (8, complete):** "Sip, stretch, breathe"; "Roll your shoulders free"; "Blink slow, little frog"; "A sip for the pond, pal"; "Wiggle those toes"; "Look far away a moment"; "Soft shoulders, slow breath"; "Hop up, shake it out." ⚠️ Note: the delivered short-break list still contains two of the three lines KR flagged for replacement — confirm with KR whether the swap intent was met. **Long breaks (8):** list begins "Yo..." — **still truncated; remainder needed + KR approval.**
- **Long-break frog transparency — genuinely fixed, twice-verified.** Root cause confirmed: an earlier transparent version was **overwritten by a later regeneration** that baked the white box back in. Koba fixed the stale cutout script (it decoded as JPEG while the file is now PNG), re-ran it against the current file, and verified: **67.7% of pixels transparent; opaque pixels down from ~510K to a 501-px frog remnant; 1M+ transparent pixels.** Developer confirmed the script now reproduces cleanly. The box still visible in KR's tab afterward was **stale cache** — hard refresh required.
- **Parallel workstreams exercised again** — KR queued transparency + sayings together; both completed in one Koba pass.
- **Chat bug encountered mid-handoff:** CEO's replies began disappearing from the chat; KR had to re-request replacement options. Logged to the platform team (ref 653d01b6-8c85-4d0a-be8b-34f41e33c104) — platform-side, not a project defect, but caused a dropped "Yo..." long-break list.
- **recommendations_v1 queued (not yet applied):** Five Page Edits (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy — brief Koba); re-encode `frog-face.png` as true PNG; live Chrome check of the timer face in the ring.
- **Emporium publishing — partial answer:** live link sits under the project; KR (account owner) posts from her account. Exact listing flow and display-name behavior **unconfirmed**; docs + admin-queue note filed.

## Files & Structure
- **Core app** (`index.html`, ~73KB): single-page app — all UI, timer logic, phase visuals, copy, `dot-twinkle` animation, and the rotating-sayings array/logic (implemented this pass). Every edit so far lands here.
- **Mascot & phase visuals** (`images/`, 8 files): `frog-focus.png` (canonical reference for all poses), `frog-face.png` (⚠️ JPEG bytes under a .png name — needs re-encode), `frog-longbreak.png` (✅ **verified true RGBA transparency — re-fixed and pixel-verified this pass**), `frog-transparent.png` (✅ earlier cutout variant), plus 4 other phase images.
- **Background-removal tooling** (`scripts/`, 1 file): `frog-bg-removal.js` — fixed this pass (was decoding as JPEG; file is now PNG), re-run against the current file, output verified clean; can now double as an alpha-check tool.
- **Voice pipeline**: `server.js` (5KB), `TTS-SETUP.md` (4KB), `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files); **audio cache** (`audio/`, 1 file). Express proxy + phrase cache; key in env; `speechSynthesis` fallback.
- **Reference material** (`uploads/`, 10 files): screenshots KR shared for edit direction, including the white-box bug shot, pattern-reference images used in the cutout, and the latest UI screenshot.

## Key Decisions Made
- Positioning, tagline, "productive tool" framing, frog-as-friend — locked.
- Antoni voice + verbatim timer copy; only delivery varies.
- **White-box root cause = file overwrite by a later regeneration, not CSS/browser cache** — confirmed when alpha scan showed ~510K opaque px in the on-disk file while an earlier pass had produced a transparent version. Fix = re-run the code-side cutout on the *current* file.
- **The final lingering box in KR's tab was stale cache** — the on-disk file was verified clean (RGBA alpha, 67.7% transparent); hard refresh is required for visual sign-off.
- **Ground-truth check is the alpha scan (opaque-pixel count), not visual inspection alone** — used before and after the fix.
- **AI image generation cannot produce true transparency** (confirmed twice) — code-side cutout is the only path; when tooling can't deliver, flag it directly and switch approaches.
- **Only the long-break frog needed the rebuild** — the other frog images were already fixed earlier.
- KR's three-line sayings swap: CEO delivered updated sets; Koba implemented in `index.html`. Final KR approval still pending (see Pending Decisions).
- **Parallel workstreams confirmed and exercised** — KR can push multiple edits while one is in flight; CEO coordinates (Koba on code/images).
- Phase-specific visuals auto-swap; no frog picker. Hint text removed; space-bar shortcut intentionally kept silent.
- **Constellation twinkle direction locked and shipped:** quick opacity/brightness flicker (`dot-twinkle`), not a breathing scale pulse; warm white/gold glow synced to bright frames; per-dot stagger.
- **Long-break frog background is fixed at the image level** (true-transparency PNG), not via CSS.
- Publishing model: copy at public link → re-publish to update; KR's account owns the post.
- Chat reply-loss bug is platform-side; tracked by admin queue (ref 653d01b6-8c85-4d0a-be8b-34f41e33c104), not a project task.

## Pending Decisions
- **Sayings content:** short-break list (8) received; **long-break list (8) still truncated at "Yo..." — capture the remainder**, then KR reviews/approves the full list and confirms it's stored as an easily editable array. Also clarify whether the two short-break lines KR flagged were meant to be *removed* (they're still present in the delivered list).
- KR's visual sign-off on `frog-longbreak.png` in the live browser — **hard-refresh/clear cache first** (stale tab was the last visible culprit); the file itself is verified clean.
- Disposition of `frog-transparent.png` (keep, delete, or reuse) and `scripts/frog-bg-removal.js` (keep as tooling or one-off).
- Emporium listing specifics (exact listing flow, display-name behavior) — awaiting docs/admin-queue response.
- Whether to self-host on the VPS before or after the Emporium publish.

## Tasks
- [x] Lock product positioning and voice (Antoni, verbatim copy)
- [x] Wire secure TTS pipeline (Express proxy + cache + fallback) — smoke-tested
- [x] Remove hint texts ("Press space to begin" / "Space to pause") — shortcut still works
- [x] Diagnose white-box root cause (transparent file overwritten by later regen; ~510K opaque px)
- [x] Attempt AI transparency — flagged tooling limit honestly; switched to code-side cutout
- [x] Fix `frog-bg-removal.js` (stale JPEG decode; file is now PNG), re-run on current file — Koba
- [x] Confirm `frog-longbreak.png` true RGBA transparency — pixel-verified (67.7% transparent; 501 opaque px; 1M+ transparent px)
- [x] Implement constellation twinkle — `dot-twinkle` opacity/gold-glow flicker with staggered per-dot timing — shipped
- [x] Implement rotating sayings in `index.html` — Koba, done (this pass)
- [x] Deliver updated sayings per KR's swap request (short-break set complete; long-break truncated)
- [x] Log chat reply-loss bug with platform team (ref 653d01b6-8c85-4d0a-be8b-34f41e33c104)
- [ ] Capture the full long-break sayings list (CEO's message truncated after "Yo...")
- [ ] Confirm with KR whether the two flagged short-break lines should remain in rotation
- [ ] KR review/approve the full sayings phrase list (short + long) and confirm editable-array storage
- [ ] KR hard-refresh browser and confirm transparent long-break frog renders clean (stale cache was the last visible culprit)
- [ ] Apply KR's Five Page Edits (brief Koba per recommendations_v1): dark mode → frog green; "productive tool"; "the what"; beverage line; recharge copy
- [ ] Re-encode `frog-face.png` as a true PNG (JPEG bytes mislabeled) — per recommendations_v1
- [ ] Live-browser QA in Chrome (hard-refresh to clear stale cache): timer face sits correctly in the ring; transparent frog renders clean; twinkle animates — single pass
- [ ] KR completes full timer-cycle QA
- [ ] Confirm Emporium publishing mechanics (docs + admin review queue note) and share findings with KR
- [ ] Batch publish to public link; share in Emporium under KR's account
- [ ] Decide + execute deployment path (local bridge → VPS)

## Opportunities
1. **Add an alpha-check gate to the image pipeline.** The white box escaped twice — once via silent regen overwrite, once via stale cache — and the fixed cutout script now reliably reports opaque-pixel counts in seconds. Run it automatically after any image regeneration/upload (threshold: opaque pixels < ~1K); this would have caught the original bug immediately and prevents regressions before publish.
2. **Version-lock verified image assets.** The root cause was a later regeneration silently overwriting a previously fixed PNG. Prevent recurrence by moving verified-good images to a `verified/` folder or adding a checksum/manifest that regeneration refuses to overwrite — and back up the current clean `frog-longbreak.png` now.
3. **Cache-bust the phase images.** Add `?v=` query strings (or versioned filenames) to `frog-longbreak.png` and the other phase images so stale tab caches can never resurrect the white box for KR or Emporium visitors.

## Next Steps
1. **Capture the full long-break sayings list** (CEO's message truncated at "Yo...") and deliver to KR for review alongside the short-break set; confirm storage as an editable array.
2. **KR hard-refresh + live Chrome QA pass:** transparent long-break frog renders clean, timer face sits correctly in the ring, twinkle animates.
3. **Brief Koba on the Five Page Edits** and the `frog-face.png` re-encode (recommendations_v1).
4. **Full-cycle QA, then Emporium publishing** (confirm mechanics first), then deployment path decision (local bridge → VPS).
5. Monitor platform queue for the chat reply-loss bug so it doesn't interrupt the next handoff.

---
*Last updated: 2026-08-15*