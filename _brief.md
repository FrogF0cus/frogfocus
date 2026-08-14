# Frog Focus - Project Brief

**Type:** web_app (single-page Pomodoro companion / landing page)

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer images render with **true transparency** so the ring and timer face read cleanly; each phase (focus / short break / long break) shows the correct frog.
- Clean, deployable single-page app on a shareable public URL.

## Current Status
- **Both keying tasks shipped and verified (CEO-confirmed).** `frog-face.png` is a true-alpha PNG (67% of pixels keyed out); the baked-in cream rectangle is gone, so the ring and time text show through around the frog. `frog-short.png` keyed (~81% removed) and **wired into the timer's FROG map** — `idle`/`focus` → `frog-face.png`, `short` → `frog-short.png`. Page verified clean; QA tooling cleaned from the workspace.
- **Keying pitfall resolved**: first pass overwrote the source JPEG in-place and re-keyed its own output, collapsing soft feather bands. True magenta originals recovered from git (commit `6214343` — face 118901 bytes, short 87221 bytes) and re-keyed in one clean pass; feather bands restored (1019/1715 px).
- **Two-tier magenta despill finalized**: pass 1 catches `B > G` (JPEG-ringing fingerprint, e.g. `rgb(150,73,113)`); pass 2 catches R-inflated `B ≈ G` residual via the frog-palette invariant (`B < G`, `R < G`). Short frog's pink pixels collapsed 820 → 14; the face's remaining 87 pixels are invisible feather-tail sub-pixel noise (alpha ≤ 123, mostly <20).
- **Vision verification**: both frogs clean (8.5/10 and 8/10) — intact, transparent, no magenta fringe (pink cheeks are intentional clay blush). CSS verified: `.frog` has no background, `drop-shadow` hugs the alpha silhouette, no overflow clipping in the timer chain (frog pokes 14px below ring via `bottom:-14px`).
- **Long-break frog still queued and blocked**: `frog-longbreak.png` checkpoint (0 attempts, "quiet victory" prompt). Blocked because the turn already produced 2 edits of `frog-focus.png` — must generate fresh with **no referenceImage**.
- **Still open**: live Chrome render check, KR's five page edits (Koba), deployment. The timer currently maps `long` → `frog-face.png` (fallback) until `frog-longbreak.png` lands.

## Files & Structure
- **index.html** (60 KB) — single-page app; all CSS, Pomodoro logic, copy. Key anchors: `#frogImg` (line 499), hero frog (line 594), FROG map (lines 785–789), `frogState()` (returns exactly `idle`/`focus`/`short`/`long`). FROG map wired: `short` → `frog-short.png`; `long` → `frog-face.png` until the new asset lands.
- **images/** (6 files) — only `frog-face.png` + `frog-short.png` are timer-referenced:
  - `frog-face.png` — in-timer face (idle/focus), true transparent PNG ✅
  - `frog-short.png` — short-break face, true transparent PNG ✅
  - `frog-focus.png` — base mascot reference / character bible (still JPEG bytes)
  - `frog-hero.png` — hero-section mascot (line 594; still JPEG bytes)
  - `frog-break.png` — not referenced by timer (still JPEG bytes)
  - `frog-longbreak.png` — existing JPEG bytes; target path for the pending regenerated long-break frog
- **uploads/** (1 file) — delivery landing spot; `gen-` files unused — deliveries landed directly at target paths.
- **QA tooling removed** — keyer/verify scripts cleaned from workspace after serving their purpose (pngjs staging lived in `/tmp/pngwork`).

## Key Decisions Made
- **Unified despill gate**: frog palette invariant `B < G` and `R < G`; one gate handles both `B > G` magenta ringing and R-inflated `B ≈ G` fringe without touching clay cheeks or gold glasses. Applied to all feather pixels.
- **Re-key rule**: never chroma-key a previously keyed PNG — always key from the true source. Git history is the recovery source for corrupted originals (proven: commit `6214343`).
- **Pipeline**: images arrive as JPEG bytes → `jpeg-js` decode → RGBA via `pngjs` → magenta tolerance key → true PNG with alpha.
- **Magenta key color**: measured baked magenta rgb(250,40,163) with compression-smear tolerance.
- **Mascot spec locked**: `frog-focus.png` anatomy/palette is the character bible for all state variants.
- **Phase image mapping**: `idle`/`focus` → `frog-face.png`; `short` → `frog-short.png` (wired); `long` → `frog-longbreak.png` (pending) — all through the FROG map.
- **Long-break generation constraint**: generate fresh with **no referenceImage**; if baked-in text is wrong, shorten the copy and regenerate (don't reuse `frog-focus.png` under a new filename).
- **Workspace delivery rule**: generated images must land in the project workspace, never a Bridge machine.
- **Why-a-frog bullets finalized**: keep "No guilt."; add "Progress over perfection — starting is the win that counts." and "Each round you begin is a small act of showing up for yourself."

## Pending Decisions
- Long-break pose/copy: "quiet victory" (arms raised, closed happy smile, sage/gold sparkle dots) — confirm once generation is unblocked.
- Deployment platform for the shareable public URL.

## Tasks
- [x] Designer delivered `frog-face.png` + `frog-short.png` (solid magenta) at final image paths
- [x] Update why-a-frog bullets in `index.html` per user
- [x] Inspect delivered images — all six "PNGs" are JPEG-encoded; magenta corners ~rgb(250,40,163)
- [x] Build decode + chroma-key pipeline (`jpeg-js` → `pngjs` → tolerance key → true PNG)
- [x] Re-encode `frog-face.png` + `frog-short.png` to true transparent PNGs (single clean pass from git-recovered originals; feather bands restored)
- [x] Numeric alpha verification — corners transparent, zero opaque pixels near magenta
- [x] Final two-tier despill on all feather pixels + vision re-check — both frogs clean (8.5/10, 8/10)
- [x] Wire FROG map: `short` → `frog-short.png`; verify `idle`/`focus` → `frog-face.png`
- [x] Clean up QA tooling from workspace
- [ ] Live Chrome render check — keyed face sits cleanly in the ring; hero intact
- [ ] Unblock & generate `frog-longbreak.png` fresh, **no referenceImage** (shorten copy if needed)
- [ ] Chroma-key `frog-longbreak.png` once delivered; wire `long` → `frog-longbreak.png` in FROG map
- [ ] Apply KR's five page edits (brief Koba): dark mode → frog green, "productive tool", "the what", beverage line, recharge copy
- [ ] Deploy to a shareable public URL

## Opportunities
1. **Normalize the remaining JPEG-byte PNGs with the proven keyer**: `frog-hero.png`, `frog-break.png`, and the old `frog-longbreak.png` are still JPEG bytes under PNG names — re-encode them to true alpha so every asset is clean and future edits (dark-mode tints, hero retouches) don't hit the same trap. Re-add the keyer as a small committed tool for this.
2. **Dark-mode frog variant via script tint**: KR's edits move dark mode to frog green — a palette-shifted/tinted frog (same pipeline, no new generation round) keeps the mascot cohesive in dark mode.
3. **CSS sparkle micro-animation on long break**: once `frog-longbreak.png` lands, subtle gold/sage CSS sparkles around the celebrating frog reinforce "quiet victory" with zero extra image cost.

## Next Steps
1. Live Chrome render check of `#frogImg` in the ring + hero intact — final pre-ship sanity.
2. Dispatch `frog-longbreak.png` (fresh referenceless prompt, shorter copy if baked-in text is an issue); key it and wire `long` in the FROG map.
3. Brief Koba: apply KR's five page edits.
4. Deploy to a shareable public URL.

---
*Last updated: 2026-08-14T00:59Z*