# Frog Focus - Project Brief

**Type:** web_app / landing_page — single-page Pomodoro companion

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer voice talks like a person, not a bot: keep it male, but the warmer, more natural male voice should win the picker.
- Timer images render with **true transparency** (verified) so the ring and time text read cleanly; each phase shows the correct frog.
- Ship **cache-safe assets** so post-launch image fixes reach users without hard-refresh instructions — the stale-cache incident proved this matters.
- Clean, deployable single-page app on a shareable public URL.

## Current Status
- **Transparency fix confirmed by user.** The cream-square issue is closed: user replied "that worked thanks" after all references (initial `src` line 499 + FROG map `idle`/`focus`/`long`) were repointed to the fresh true-alpha `frog-timer.png`. Ground truth verified numerically (pngjs + PIL: 67.4% alpha-0, corners transparent, no service worker, no CSS background on `.frog` / `.ring-face`).
- **Voice priority task is the active thread.** User: "keep the male voice but change it up." The picker currently leads with Google UK English Male (the most robotic-sounding). Planned fix: reorder so natural-sounding male voices win first, demote Google UK English Male to a late fallback, and warm up prosody. Queued for Koba; voice was already improved once but needs another pass.
- **Long-break frog still pending.** `frog-longbreak.png` checkpoint (0 attempts, "quiet victory" prompt) — must generate fresh with **no referenceImage**; `long` currently maps to `frog-timer.png` as a temporary stand-in.
- **KR's five page edits still open** (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy) — queued for Koba.
- **Live-browser QA not done yet** — confirm the timer face sits correctly in the ring before shipping (pending recommendation).

## Files & Structure
- **index.html** (60 KB) — single-page app; all CSS, Pomodoro logic, copy, voice picker. Key anchors: initial `src` line 499, hero frog line 594, FROG map lines 785–789, voice-picking block (Google UK English Male currently first). FROG map: `idle`/`focus`/`long` → `frog-timer.png`, `short` → `frog-short.png` (long moves to `frog-longbreak.png` once generated).
- **images/** (7 files) — three timer-referenced and verified true-alpha:
  - `frog-timer.png` — cache-safe in-timer face (idle/focus/long) ✅
  - `frog-face.png` — original in-timer face, true transparent PNG ✅
  - `frog-short.png` — short-break face, true transparent PNG ✅
  - `frog-focus.png` — base mascot reference / character bible (still JPEG bytes)
  - `frog-hero.png` — hero-section mascot (line 594; still JPEG bytes)
  - `frog-break.png` — not timer-referenced (still JPEG bytes)
  - `frog-longbreak.png` — existing JPEG bytes; target path for pending regenerated long-break frog
- **uploads/** (2 files) — delivery landing spot.
- **QA tooling removed** — keyer/verify scripts cleaned from workspace after serving their purpose (note: may need re-adding for the remaining JPEG-byte PNGs).

## Key Decisions Made
- **Stale-cache fix = fresh filename — proven in production.** New transparent asset shipped under a genuinely new URL (`frog-timer.png`); user confirmed the fix. This is now the release pattern for asset swaps.
- **Transparency is verified numerically before trusting renders** — pngjs/PIL alpha measurement is the source of truth (vision models are unreliable on alpha/compositing).
- **No service worker / no client-side caching layer** — hard refresh is the canonical workaround until deploy; long-term cache-busting strategy still needed.
- **Voice direction**: keep male; promote warmer, more natural male voices ahead of Google UK English Male (demoted to late fallback); warm up prosody. Edit the voice block surgically — read the exact block before changing.
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
- Which specific male voice(s) to promote in the picker (and prosody settings) — Koba to propose within "warmer, natural, still male" constraint.
- Cache-busting strategy before deploy: query-versioned assets (`?v=`) vs. Cache-Control headers — fresh-filename pattern is the proven stopgap.
- Deployment platform for the shareable public URL.

## Tasks
- [x] Designer delivered `frog-face.png` + `frog-short.png` (solid magenta) at final image paths
- [x] Update why-a-frog bullets in `index.html` per user
- [x] Build decode + chroma-key pipeline (`jpeg-js` → `pngjs` → tolerance key → true PNG)
- [x] Re-encode `frog-face.png` + `frog-short.png` to true transparent PNGs (single clean pass from git-recovered originals; feather bands restored)
- [x] Numeric alpha verification — corners transparent, zero opaque pixels near magenta (pngjs + PIL)
- [x] Final two-tier despill on all feather pixels + vision re-check — both frogs clean (8.5/10, 8/10)
- [x] Wire FROG map: `short` → `frog-short.png`
- [x] Diagnose "frog still has background" report — root-caused to stale browser cache; disk file conclusively verified transparent (no service worker, no CSS background)
- [x] Create `frog-timer.png` (fresh true-alpha URL) and repoint page: initial `src` + FROG map `idle`/`focus`/`long` → `frog-timer.png`
- [x] Final verification pass — `.frog` CSS clean (no background), drop-shadow hugs alpha, no clipping, FROG map + PNG headers/alpha confirmed
- [x] Clean up QA tooling from workspace
- [x] Confirm cream square is gone — **user confirmed: "that worked thanks"** ✅
- [ ] Voice picker: reorder so natural/warm male voices win, demote Google UK English Male to late fallback, warm up prosody — brief Koba
- [ ] Preview timer face in live browser (open index.html in Chrome) — confirm face sits right in the ring before shipping
- [ ] Generate `frog-longbreak.png` fresh, **no referenceImage** (shorten baked copy if needed)
- [ ] Chroma-key `frog-longbreak.png` once delivered; wire `long` → `frog-longbreak.png`
- [ ] Apply KR's five page edits (brief Koba): dark mode → frog green, "productive tool", "the what", beverage line, recharge copy
- [ ] Decide and apply cache-busting strategy (query-versioned assets or cache headers)
- [ ] Deploy to a shareable public URL

## Opportunities
1. **Normalize the remaining JPEG-byte PNGs with the proven keyer**: `frog-focus.png`, `frog-hero.png`, `frog-break.png`, and old `frog-longbreak.png` are still JPEG bytes under PNG names — re-encode them to true alpha so every asset is clean and future edits (dark-mode tints, hero retouches) don't hit the same trap. Re-add the keyer as a small committed tool. (Also flagged in `recommendations_v1`: convert before publish.)
2. **Cache-busting + asset versioning**: the fresh-filename pattern just proved itself in a live user report — codify it (or `?v=` / Cache-Control) as the release convention so asset swaps never require hard-refresh explanations again.
3. **Dark-mode frog variant via script tint**: KR's edits move dark mode to frog green — a palette-shifted/tinted frog (same keying pipeline, no new generation round) keeps the mascot cohesive in dark mode.

## Next Steps
1. **Voice picker (active thread)**: brief Koba on the reorder — natural-sounding male voices first, Google UK English Male demoted to late fallback, prosody warmed; verify the timer voice in a live browser after.
2. Dispatch `frog-longbreak.png` (fresh referenceless prompt — checkpoint encodes the character spec; shorten baked-in copy if wrong); key it, wire `long`, optionally add gold/sage CSS sparkle micro-animation.
3. Brief Koba: apply KR's five page edits.
4. Run the live-browser timer preview (pending recommendation).
5. Decide cache-busting approach, then deploy to a shareable public URL.

---
*Last updated: 2026-08-14T01:14Z*