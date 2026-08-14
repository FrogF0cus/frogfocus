# Frog Focus - Project Brief

## Vision & Goals
- Polished, original single-page Pomodoro timer inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector style: sage green body (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer-state images must render with true transparency so timer verbiage and the ring read clearly; each phase (focus, short break, long break) shows the correct frog.
- Clean, deployable single-page app on a shareable public URL.

## Current Status
- User-approved copy edit landed in `index.html`: keep the existing **"No guilt."** bullet; replace the next two with **"Progress over perfection — starting is the win that counts."** and **"Each round you begin is a small act of showing up for yourself."**
- KR's five page edits (dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy) are **queued** — action: brief Koba.
- Designer delivered `images/frog-face.png` (neutral friendly face, closed-mouth smile) and `images/frog-short.png` (short-break mood, eyes closed happy curve) — both on solid magenta background, character-consistent with the reference. Vision check flagged subtle noise/variation in the magenta; designer reports it was corrected.
- Magenta is the chosen keying color: image generation won't produce true transparency, so the plan is chroma-keying to alpha. Developer confirmed Node 20 + `pngjs` available in the workspace.
- `frog-face.png` may actually contain JPEG bytes under a `.png` name (flagged in recommendations) — needs re-encode before publish.
- `images/frog-longbreak.png` generation is **blocked/pending**: an earlier attempt was skipped (too many edits of `frog-focus.png` this turn) and must NOT retry with that reference under a new filename.
- Frog renders at the bottom edge of the timer ring (`bottom:-14px`); current baked-in cream rectangle behind the frog looks blocky — chroma-keying fixes this.

## Files & Structure
- **index.html** (60 KB) — single-page app; contains all CSS (incl. ring + frog positioning), Pomodoro logic (`setPhase`, frog image swap), and page copy.
- **images/** (6 files) — includes `frog-focus.png` (base mascot reference), `frog-face.png` (in-timer focus face, magenta bg), `frog-short.png` (short-break, magenta bg), plus existing assets; `frog-longbreak.png` is the pending target path.
- **tools/** (1 file) — workspace script area (developer is staging keying/wiring scripts here, cleaned up after).
- **uploads/** (1 file) — delivery landing spot; `gen-` files from Zara were not found here (delivery landed directly at the target image paths).

## Key Decisions Made
- **Chroma-key pipeline**: generate frog images on solid uniform magenta, then key to alpha programmatically (Node + `pngjs`) — no reliance on native transparency from image generation.
- **Mascot spec locked**: exact anatomy/palette from `frog-focus.png` is the character bible for all state variants.
- **Phase image mapping**: focus → `frog-face.png`, short break → `frog-short.png`, long break → `frog-longbreak.png` (pending).
- **Known limitation**: do not reuse `frog-focus.png` as a reference image for new filenames in the same generation turn (edit limit). If dense baked-in text is wrong, shorten the copy and generate fresh **without** a reference image.
- **Why-a-frog bullets**: finalized per user — first bullet untouched, next two replaced.
- **File delivery**: images must be saved into the project workspace, not a Bridge machine (previous delivery failed that way).
- **Render behavior**: frog sits at ring bottom edge (`bottom:-14px`); transparent backgrounds are required so text/ring stay readable.

## Pending Decisions
- Long-break image spec: proposed pose is "quiet victory" (arms raised, soft happy smile, sage/gold sparkle dots) — confirm copy/pose once generation is unblocked.
- Whether `frog-face.png` needs a true-PNG re-encode (JPEG-bytes issue) — verify before publish.
- Deployment target for the shareable public URL (platform not yet chosen).

## Tasks
- [x] Deliver `frog-face.png` (magenta bg, character-consistent)
- [x] Deliver `frog-short.png` (magenta bg, character-consistent)
- [x] Update why-a-frog bullets per user (keep #1, replace #2–3) in `index.html`
- [ ] Inspect delivered PNGs (alpha/background pixels) and confirm magenta uniformity
- [ ] Re-encode `frog-face.png` to true PNG if JPEG bytes confirmed
- [ ] Chroma-key `frog-face.png` and `frog-short.png` → transparent (Node + `pngjs`)
- [ ] Generate `frog-longbreak.png` fresh (no referenceImage; short or no baked-in text)
- [ ] Chroma-key `frog-longbreak.png`
- [ ] Wire all three phase images into `setPhase` / frog-update logic in `index.html`
- [ ] Apply KR's five page edits (dark mode frog green, "productive tool", "the what", beverage line, recharge copy)
- [ ] Live browser check: face sits correctly inside the timer ring
- [ ] Deploy to shareable public URL

## Opportunities
1. **Reusable keying script**: build the chroma-key tool in `tools/` to process all current and future frog images in one pass (with alpha-edge verification) — makes the long-break drop-in trivial once generated.
2. **Dark-mode frog variant in the same pipeline**: one of the five edits moves dark mode to frog green; a tinted or palette-shifted frog variant (via the same script) would keep the mascot cohesive without another image-generation round.
3. **CSS sparkle micro-animation for long break**: once `frog-longbreak.png` lands, add subtle gold/sage CSS sparkles around the celebrating frog — reinforces the "quiet victory" mood with zero extra image cost.

## Next Steps
1. Developer finishes pixel inspection of delivered PNGs (alpha channel, magenta uniformity).
2. Run chroma-key script on `frog-face.png` + `frog-short.png`; verify clean edges.
3. Dispatch fresh `frog-longbreak.png` generation — **no referenceImage**, short/no text.
4. Wire the three phase images into the timer logic.
5. Apply the five page edits (brief Koba) and do the live Chrome render check of ring + face.
6. Deploy to a shareable public URL.

---
*Last updated: 2026-08-14T00:47Z*