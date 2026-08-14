# Frog Focus - Project Brief

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer images must render with **true transparency** so ring verbiage and the timer face read cleanly; each phase (focus / short break / long break) shows the correct frog.
- Clean, deployable single-page app on a shareable public URL.

## Current Status
- **Timer mapping confirmed**: `frogState()` returns exactly four keys — `idle`, `focus`, `short`, `long` — resolved via the FROG map (index.html lines 785–789). The timer references **only** `frog-face.png` today; the pending wiring change adds `frog-short.png` for `short`, and `long` still needs `frog-longbreak.png`.
- **All six "PNGs" are actually JPEGs** (headers `ff d8 ff e0`) — transparency was baked out from the start. `frog-face.png` fails to parse as a PNG. Newly landed magenta frogs smeared by JPEG compression: corners ~rgb(250,40,163) vs. clean magenta (b: 238→~163, g: 0→~40).
- **Toolchain established**: Node 20 available; `jpeg-js` + `pngjs` available (pngjs at `/tmp/pngwork`); no ImageMagick/ffmpeg/pip. Write tool is workspace-scoped, so scripts stage in `tools/` and get cleaned up.
- **Designer delivery confirmed landed**: `images/frog-face.png` (neutral friendly face, closed-mouth smile) and `images/frog-short.png` (eyes-closed happy curve) — both character-consistent with the reference, on solid magenta, timestamps 00:46. Vision-check noise was corrected.
- **Long-break frog is queued but blocked**: `images/frog-longbreak.png` pending in the image checkpoint (0 attempts) with a "quiet victory" prompt; retry rule forbids using `frog-focus.png` as a referenceImage for a new filename. Needs a fresh referenceless generation.
- **Previous delivery pitfall**: one frog delivery landed on a Bridge machine (broken link) and was redone into the project workspace — workspace delivery is now the rule.
- **Ring rendering**: frog sits at the timer ring's bottom edge (`bottom:-14px`) as `#frogImg` (line 499); the baked-in cream rectangle behind it looks blocky — chroma-keying fixes this. Hero frog is `frog-hero.png` (line 594), untouched by timer logic.
- User-approved copy edit landed: keep **"No guilt."** bullet; replace next two with **"Progress over perfection — starting is the win that counts."** and **"Each round you begin is a small act of showing up for yourself."**
- KR's five page edits (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy) are queued — action: brief Koba.

## Files & Structure
- **index.html** (60 KB) — single-page app; all CSS (incl. ring + frog positioning), Pomodoro logic, copy. Key anchors: `#frogImg` (line 499), hero frog (line 594), FROG map (lines 785–789), `frogState()`.
- **images/** (6 files) — all JPEG-encoded despite `.png` names:
  - `frog-focus.png` — base mascot reference / character bible
  - `frog-face.png` — in-timer face (idle/focus/long), magenta bg, delivered
  - `frog-short.png` — short-break face, magenta bg, delivered
  - `frog-hero.png` — hero-section mascot (line 594)
  - `frog-break.png`, `frog-longbreak.png` — existing assets, **not referenced** by the timer; `frog-longbreak.png` is the target for the pending generated long-break frog
- **tools/** (2 files) — workspace script staging area (decode/chroma-key scripts live here temporarily, then cleaned up).
- **uploads/** (1 file) — delivery landing spot; `gen-` files were not used — deliveries landed directly at target image paths.
- **/tmp/pngwork** (external) — `pngjs` install location; scripts require it by absolute path.

## Key Decisions Made
- **Pipeline is decode-then-key, not just key**: images arrive as JPEG bytes, so chroma-keying requires `jpeg-js` decode → RGBA via `pngjs` → magenta key with a **tolerance band** (JPEG smear means exact match fails) → re-encode as true PNG with alpha.
- **Magenta key color**: key from measured baked magenta rgb(250,40,163) with tolerance for compression smear; verify corners/edges post-key.
- **Mascot spec locked**: `frog-focus.png` anatomy/palette is the character bible for all state variants.
- **Phase image mapping (target)**: `idle`/`focus` → `frog-face.png`; `short` → `frog-short.png`; `long` → `frog-longbreak.png` (pending) — wired through the FROG map.
- **Long-break generation constraint**: do **not** reuse `frog-focus.png` as a referenceImage for new filenames in the same turn (edit limit). If baked-in text is wrong, shorten copy and generate fresh **without** a reference.
- **Workspace delivery rule**: generated images must be saved into the project workspace, never a Bridge machine.
- **Why-a-frog bullets finalized** per user.
- **Unused assets identified**: `frog-break.png` and `frog-longbreak.png` (current) are timer-orphans — candidates for cleanup once the new long-break frog lands.

## Pending Decisions
- Long-break pose/copy: "quiet victory" (arms raised, soft happy smile, sage/gold sparkle dots) is queued — confirm once generation is unblocked.
- Whether JPEG-smear magenta tolerance yields clean enough edges for `frog-face.png`/`frog-short.png`, or whether regeneration with a purer magenta is needed (decide after first key pass).
- Deployment platform for the shareable public URL.

## Tasks
- [x] Deliver `frog-face.png` and `frog-short.png` on solid magenta at final image paths
- [x] Update why-a-frog bullets in `index.html` per user (keep #1, replace #2–3)
- [x] Inspect delivered images — confirmed all six are JPEG-encoded; magenta corners ~rgb(250,40,163) with compression smear; `frog-face.png` unparseable as PNG
- [ ] Build decode + chroma-key pipeline: `jpeg-js` → `pngjs` → tolerance key → true-PNG output
- [ ] Re-encode `frog-face.png` and `frog-short.png` to true transparent PNGs; verify edges/alpha in browser
- [ ] Generate `frog-longbreak.png` fresh (no referenceImage) — unblock the queued checkpoint
- [ ] Chroma-key `frog-longbreak.png` once delivered
- [ ] Wire FROG map: `short` → `frog-short.png`; add `long` → `frog-longbreak.png`; sanity-check `idle`/`focus`
- [ ] Apply KR's five page edits (brief Koba): dark mode → frog green, "productive tool", "the what", beverage line, recharge copy
- [ ] Live Chrome render check — face sits correctly in the ring; hero intact
- [ ] Deploy to shareable public URL

## Opportunities
1. **Reusable decode+key script in `tools/`**: one pass over all six images (decode JPEG → key magenta → true PNG with alpha-edge verification) makes the long-break drop-in trivial and normalizes the whole asset set; can also clean up the two orphaned images.
2. **Dark-mode frog variant via script tint**: the five edits move dark mode to frog green — a palette-shifted/tinted frog (same pipeline, no new generation round) keeps the mascot cohesive in dark mode.
3. **CSS sparkle micro-animation on long break**: once `frog-longbreak.png` lands, subtle gold/sage CSS sparkles around the celebrating frog reinforce "quiet victory" with zero extra image cost.

## Next Steps
1. Developer builds and runs the decode+chroma-key script on `frog-face.png` + `frog-short.png`; verify clean alpha edges and magenta-tolerance results.
2. Unblock and dispatch `frog-longbreak.png` generation — fresh prompt, **no referenceImage**.
3. Koba wires the FROG map (`short` → `frog-short.png`; `long` → `frog-longbreak.png`) and applies the five page edits.
4. Live Chrome render check of ring + face + hero.
5. Deploy to a shareable public URL.

---
*Last updated: 2026-08-14T00:52Z*