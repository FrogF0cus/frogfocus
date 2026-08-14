# Frog Focus - Project Brief

**Type:** web_app (single-page Pomodoro companion / landing page)

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer images render with **true transparency** (verified) so the ring and time text read cleanly; each phase shows the correct frog.
- Ship **cache-safe assets** so post-launch image fixes reach users without hard-refresh instructions — the stale-cache incident proved this matters.
- Clean, deployable single-page app on a shareable public URL.

## Current Status
- **Stale-cache incident resolved via fresh filename.** User still saw a cream square after the keyed `frog-face.png` shipped; the disk file was proven innocent (67.4% transparent, all corners alpha-0, colorType 6 RGBA — pngjs + PIL measurements). Root cause: stale browser cache. Fix: brand-new `frog-timer.png` (true-alpha, confirmed transparent) served under a genuinely new URL — no browser/CDN/server cache can return the old opaque bytes. Page repointed at initial `src` (line 499) and FROG map `idle`/`focus`/`long` → `frog-timer.png`; alt text kept.
- **Transparency work shipped and verified.** `frog-face.png` (67% keyed) and `frog-short.png` (~81% keyed) are true-alpha PNGs. Final verification pass: `.frog` CSS has no background, `drop-shadow` hugs the alpha silhouette, no clipping anywhere in the timer chain (all `overflow: visible`; frog pokes 14px below ring via `bottom:-14px`). FROG map grepped, PNG headers + alpha confirmed. QA tooling cleaned up.
- **Keying pitfall resolved.** First pass overwrote the source JPEG in-place; true magenta originals recovered from git (commit `6214343`) and re-keyed in one clean pass; feather bands restored.
- **Two-tier magenta despill finalized**: `B > G` ringing pass + R-inflated `B ≈ G` pass via frog-palette invariant (`B < G`, `R < G`). Short-frog pink pixels 820 → 14; face's remaining 87 pixels are invisible feather-tail noise (alpha ≤ 123).
- **Long-break frog still queued**: `frog-longbreak.png` checkpoint (0 attempts, "quiet victory" prompt). Must generate fresh with **no referenceImage**. `long` currently maps to `frog-timer.png` as a temporary stand-in.
- **KR's five page edits still open** (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy) — queued for Koba.

## Files & Structure
- **index.html** (60 KB) — single-page app; all CSS, Pomodoro logic, copy. Key anchors: initial `src` line 499, hero frog line 594, FROG map lines 785–789. FROG map: `idle`/`focus`/`long` → `frog-timer.png`, `short` → `frog-short.png` (long moves to `frog-longbreak.png` once generated).
- **images/** (7 files) — three timer-referenced and verified true-alpha:
  - `frog-timer.png` — NEW cache-safe in-timer face (idle/focus/long) ✅
  - `frog-face.png` — original in-timer face, true transparent PNG ✅
  - `frog-short.png` — short-break face, true transparent PNG ✅
  - `frog-focus.png` — base mascot reference / character bible (still JPEG bytes)
  - `frog-hero.png` — hero-section mascot (line 594; still JPEG bytes)
  - `frog-break.png` — not timer-referenced (still JPEG bytes)
  - `frog-longbreak.png` — existing JPEG bytes; target path for pending regenerated long-break frog
- **uploads/** (2 files) — delivery landing spot.
- **QA tooling removed** — keyer/verify scripts cleaned from workspace after serving their purpose.

## Key Decisions Made
- **Stale-cache fix = fresh filename.** New transparent asset shipped under a genuinely new URL (`frog-timer.png`) so no cache layer can serve the old bytes; page fully repointed.
- **Transparency is verified numerically before trusting renders** — pngjs/PIL alpha measurement is the source of truth.
- **No service worker / no client-side caching layer** — hard refresh is the canonical workaround until deploy; long-term cache-busting strategy still needed.
- **Unified despill gate**: frog-palette invariant `B < G` and `R < G` — handles both magenta ringing and R-inflated fringe without touching clay cheeks or gold glasses.
- **Re-key rule**: never chroma-key a previously keyed PNG; always key from the true source (git recovery: commit `6214343`).
- **Pipeline**: JPEG bytes → `jpeg-js` decode → RGBA via `pngjs` → magenta tolerance key → true PNG.
- **Magenta key color**: measured baked magenta rgb(250,40,163) with compression-smear tolerance.
- **Mascot spec locked**: `frog-focus.png` anatomy/palette is the character bible for all state variants.
- **Phase image mapping**: `idle`/`focus`/`long` → `frog-timer.png` (long temporary); `short` → `frog-short.png`.
- **Long-break generation constraint**: fresh, **no referenceImage**; if baked-in text is wrong, shorten copy and regenerate — never reuse an existing image under a new filename.
- **Workspace delivery rule**: generated images land in the project workspace.

## Pending Decisions
- Long-break pose/copy: "quiet victory" (arms raised, closed happy smile, sage/gold sparkle dots) — confirm once generation is unblocked.
- Cache-busting strategy before deploy: query-versioned assets (`?v=`) vs. Cache-Control headers — triggered by the stale-cache incident; the fresh-filename pattern is the stopgap.
- Deployment platform for the shareable public URL.

## Tasks
- [x] Designer delivered `frog-face.png` + `frog-short.png` (solid magenta) at final image paths
- [x] Update why-a-frog bullets in `index.html` per user
- [x] Build decode + chroma-key pipeline (`jpeg-js` → `pngjs` → tolerance key → true PNG)
- [x] Re-encode `frog-face.png` + `frog-short.png` to true transparent PNGs (single clean pass from git-recovered originals; feather bands restored)
- [x] Numeric alpha verification — corners transparent, zero opaque pixels near magenta (pngjs + PIL)
- [x] Final two-tier despill on all feather pixels + vision re-check — both frogs clean (8.5/10, 8/10)
- [x] Wire FROG map: `short` → `frog-short.png`
- [x] Diagnose "frog still has background" report — root-caused to stale browser cache; disk file conclusively verified transparent
- [x] Create `frog-timer.png` (fresh true-alpha URL) and repoint page: initial `src` + FROG map `idle`/`focus`/`long` → `frog-timer.png`
- [x] Final verification pass — `.frog` CSS clean (no background), drop-shadow hugs alpha, no clipping, FROG map + PNG headers/alpha confirmed
- [x] Clean up QA tooling from workspace
- [ ] Confirm with user on a hard refresh that the cream square is gone (fresh URL should guarantee it)
- [ ] Generate `frog-longbreak.png` fresh, **no referenceImage** (shorten baked copy if needed)
- [ ] Chroma-key `frog-longbreak.png` once delivered; wire `long` → `frog-longbreak.png`
- [ ] Apply KR's five page edits (brief Koba): dark mode → frog green, "productive tool", "the what", beverage line, recharge copy
- [ ] Decide and apply cache-busting strategy (query-versioned assets or cache headers)
- [ ] Deploy to a shareable public URL

## Opportunities
1. **Normalize the remaining JPEG-byte PNGs with the proven keyer**: `frog-focus.png`, `frog-hero.png`, `frog-break.png`, and old `frog-longbreak.png` are still JPEG bytes under PNG names — re-encode them to true alpha so every asset is clean and future edits (dark-mode tints, hero retouches) don't hit the same trap. Re-add the keyer as a small committed tool.
2. **Cache-busting + asset versioning**: adopt the proven fresh-filename pattern (or `?v=` / Cache-Control) as a release convention — the incident showed reviewers and users will see stale assets after swaps. A tiny versioning step removes this entire class of confusion before launch.
3. **Dark-mode frog variant via script tint**: KR's edits move dark mode to frog green — a palette-shifted/tinted frog (same keying pipeline, no new generation round) keeps the mascot cohesive in dark mode.

## Next Steps
1. Have the user hard-refresh once to confirm the fresh `frog-timer.png` URL clears the square (guaranteed by the new filename, but close the loop).
2. Dispatch `frog-longbreak.png` (fresh referenceless prompt — checkpoint encodes the character spec; shorten baked-in copy if wrong); key it, wire `long`, optionally add gold/sage CSS sparkle micro-animation.
3. Brief Koba: apply KR's five page edits.
4. Decide cache-busting approach, then deploy to a shareable public URL.

---
*Last updated: 2026-08-14T01:08Z*