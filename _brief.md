# Frog Focus - Project Brief

**Type:** web_app

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer images render with **true transparency** so ring verbiage and the timer face read cleanly; each phase (focus / short break / long break) shows the correct frog.
- Clean, deployable single-page app on a shareable public URL.

## Current Status
- **Chroma-key pipeline built and executed**: `jpeg-js` → `pngjs` → magenta tolerance key → true PNG. Both frogs keyed cleanly (~67% / ~81% pixels removed; 340k / 215k opaque interior pixels preserved; `minOpaqueDist` ≥ 105 — no opaque pixel is remotely magenta).
- **Pitfall & recovery**: the first pass overwrote the source JPEG in-place and re-keyed its own output, collapsing the soft feather band into hard-opaque pixels. True magenta originals were recovered from git (commit `6214343` — face 118901 bytes, short 87221 bytes) and re-keyed in one clean pass; feather bands restored (1019/1715 px).
- **Two-tier magenta despill**: pass 1 catches `B > G` pixels; residual fringe (R inflated, `B ≈ G`) is caught by a unified color gate — the frog's legitimate palette (sage/clay/gold/cream) always keeps `B < G` and `R < G`. Numeric verification clean: corners fully transparent, zero opaque pixels within 70 of magenta, soft feather band present.
- **Vision verification**: face frog clean (8/10; "cropped bottom" is the source design — chin flush with canvas edge). Short frog's belly "pink" was feather-over-checkerboard — actual opaque pixels are pure cream `(246,237,216)`. Remaining magenta cast is **JPEG ringing in feather pixels** at the head outline (y≈276, e.g. `(158,39,110)` at a205, not true blends) — the color-based despill gate is being applied to **all** feather pixels now.
- **Long-break frog still queued and blocked**: `frog-longbreak.png` checkpoint (0 attempts, "quiet victory" prompt). The turn already produced 2 edits of `frog-focus.png`; the rule forbids reusing it as a referenceImage under a new filename — a fresh **referenceless** generation is required.
- **Still pending**: FROG map wiring (`short` → `frog-short.png`, `long` → `frog-longbreak.png`), KR's five page edits, live Chrome render check, deployment.
- **Recommendations v1**: (1) five page edits → brief Koba; (2) real-PNG conversion — effectively done via the keying work; (3) live browser preview → next.

## Files & Structure
- **index.html** (60 KB) — single-page app; all CSS, Pomodoro logic, copy. Key anchors: `#frogImg` (line 499), hero frog (line 594), FROG map (lines 785–789), `frogState()` (returns exactly `idle`/`focus`/`short`/`long`).
- **images/** (6 files) — all originally JPEG bytes despite `.png` names; `frog-face.png` and `frog-short.png` are now re-encoded true transparent PNGs:
  - `frog-face.png` — in-timer face (idle/focus/long), keyed, final despill in flight
  - `frog-short.png` — short-break face, keyed, final despill in flight
  - `frog-focus.png` — base mascot reference / character bible (still JPEG)
  - `frog-hero.png` — hero-section mascot (line 594)
  - `frog-break.png`, `frog-longbreak.png` — existing JPEGs, **not referenced** by the timer; `frog-longbreak.png` is the target path for the pending generated long-break frog
- **tools/** (10 files) — workspace script staging area (decode/chroma-key scripts; cleaned up after use).
- **uploads/** (1 file) — delivery landing spot; `gen-` files unused — deliveries landed directly at target paths.
- **/tmp/pngwork** (external) — `pngjs` install; scripts require it by absolute path.

## Key Decisions Made
- **Unified despill gate**: the frog palette invariant is `B < G` and `R < G`; one gate handles both the `B > G` magenta fingerprint and the R-inflated `B ≈ G` ring fringe without touching clay cheeks or gold glasses.
- **Re-key rule**: never chroma-key a previously keyed PNG — always key from the true source. Git history is the recovery source for corrupted originals (proven: commit `6214343`).
- **Pipeline**: images arrive as JPEG bytes, so `jpeg-js` decode → RGBA via `pngjs` → magenta key with tolerance band (exact match fails on JPEG smear) → true PNG with alpha.
- **Magenta key color**: measured baked magenta rgb(250,40,163) with compression-smear tolerance; corners/edges verified post-key.
- **Mascot spec locked**: `frog-focus.png` anatomy/palette is the character bible for all state variants.
- **Phase image mapping (target)**: `idle`/`focus` → `frog-face.png`; `short` → `frog-short.png`; `long` → `frog-longbreak.png` (pending) — wired through the FROG map.
- **Long-break generation constraint**: do **not** reuse `frog-focus.png` as a referenceImage for new filenames in the same turn; if baked-in text is wrong, shorten copy and generate fresh **without** a reference.
- **Workspace delivery rule**: generated images must land in the project workspace, never a Bridge machine.
- **Why-a-frog bullets finalized** per user: keep "No guilt."; add "Progress over perfection — starting is the win that counts." and "Each round you begin is a small act of showing up for yourself."

## Pending Decisions
- Long-break pose/copy: "quiet victory" (arms raised, soft happy smile, sage/gold sparkle dots) — confirm once generation is unblocked.
- Whether the feather-ringing despill pass fully cleans the head outline, or whether a purer-magenta regeneration is needed for `frog-face.png`/`frog-short.png` (decide after final vision re-check).
- Deployment platform for the shareable public URL.

## Tasks
- [x] Designer delivered `frog-face.png` + `frog-short.png` (solid magenta) at final image paths
- [x] Update why-a-frog bullets in `index.html` per user
- [x] Inspect delivered images — all six "PNGs" are JPEG-encoded; magenta corners ~rgb(250,40,163) with compression smear
- [x] Build decode + chroma-key pipeline (`jpeg-js` → `pngjs` → tolerance key → true PNG)
- [x] Re-encode `frog-face.png` and `frog-short.png` to true transparent PNGs (single clean pass from git-recovered originals; feather bands restored)
- [x] Numeric alpha verification — corners transparent, zero opaque pixels near magenta
- [ ] Apply final color-based despill gate to all feather pixels (in flight) + re-run vision/composite verification
- [ ] Live Chrome render check — keyed face sits cleanly in the ring; hero intact
- [ ] Generate `frog-longbreak.png` fresh, **no referenceImage** — unblock the queued checkpoint
- [ ] Chroma-key `frog-longbreak.png` once delivered
- [ ] Wire FROG map: `short` → `frog-short.png`; `long` → `frog-longbreak.png`; sanity-check `idle`/`focus`
- [ ] Apply KR's five page edits (brief Koba): dark mode → frog green, "productive tool", "the what", beverage line, recharge copy
- [ ] Deploy to a shareable public URL

## Opportunities
1. **Normalize the whole asset set with the proven keyer**: run the same decode+key pass over `frog-hero.png`, `frog-break.png`, and the current `frog-longbreak.png` so every asset is a true transparent PNG — makes the long-break drop-in trivial and removes the JPEG-bytes trap for future deliveries. Keep the script in `tools/` as a reusable make-target.
2. **Dark-mode frog variant via script tint**: the five edits move dark mode to frog green — a palette-shifted/tinted frog (same pipeline, no new generation round) keeps the mascot cohesive in dark mode.
3. **CSS sparkle micro-animation on long break**: once `frog-longbreak.png` lands, subtle gold/sage CSS sparkles around the celebrating frog reinforce "quiet victory" with zero extra image cost.

## Next Steps
1. Finish the feather-ringing despill pass on both frogs; re-run vision + alpha verification, then composites over checkerboard.
2. Live Chrome render check of `#frogImg` in the ring + hero intact.
3. Unblock and dispatch `frog-longbreak.png` — fresh referenceless prompt, shorter copy if baked-in text is an issue.
4. Koba: wire the FROG map (`short` → `frog-short.png`; `long` → `frog-longbreak.png`) and apply the five page edits.
5. Deploy to a shareable public URL.

---
*Last updated: 2026-08-14T00:55Z*