# Frog Focus - Project Brief

**Type:** landing_page — single-page Pomodoro companion

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer voice: **warm, comforting, encouraging — like a friend** — and must stay **male**. KR's verdict stands: "it's the voice not the words" — the TTS voice quality itself is the problem, not the script.
- Timer images render with **true transparency** (verified) so the ring and time text read cleanly; each phase shows the correct frog.
- Ship **cache-safe assets** so post-launch image fixes reach users without hard-refresh instructions — the stale-cache incident proved this matters.
- Clean, deployable single-page app on a shareable public URL.

## Current Status
- **Voice is PARKED, not blocked.** The Daniel-first reorder made things worse ("that one is worse"), but the friend-style copy rewrite was accepted ("it's the voice not the words"). KR explicitly said "lets come back to that. there are other edits" — voice work is on hold. When resumed, CEO's proposed path is a **live bridge audit**: open a browser on KR's machine, list installed voices, and audition candidates so KR hears real options and picks. Constraint: keep male.
- **Active thread = KR's "other edits" (five page edits), queued for Koba:** 1) dark mode → frog green, 2) "productive tool" positioning copy, 3) "the what", 4) beverage line, 5) recharge copy.
- **Transparency fix confirmed closed:** "that worked thanks" — `frog-timer.png` (true alpha, fresh URL) serves `idle`/`focus`/`long`; `short` → `frog-short.png`.
- **New heads-up issue:** the waving frog in the "Why a frog?" section still has a soft cream background — flagged by CEO, not yet fixed.
- **Long-break frog pending at 0 attempts.** Checkpoint guard: do **not** retry the `frog-focus.png` reference under a new filename — generate fresh with **no referenceImage** (shorten baked-in text if dense text is wrong), or deliver the latest clean edit. `long` currently maps to `frog-timer.png` temporarily.
- **`frog-face.png` is JPEG bytes under a PNG name** — re-encode to a real PNG before publish (recommendation, action: ask Koba).
- **Live-browser timer preview still not run** — confirm the face sits correctly in the ring before shipping.

## Files & Structure
- **App (single page)**: `index.html` (60 KB) — all CSS, Pomodoro logic, copy, TTS. Key anchors:
  - `say()` lines 825–844 — voice picker (Daniel → Microsoft David/Guy/Mark → Alex → Google UK English Male fallback) + prosody + the four spoken moments
  - `announce()` — on-screen text only; never speaks
  - FROG map lines 785–789 — `idle`/`focus`/`long` → `frog-timer.png`; `short` → `frog-short.png`
  - Initial `src` line 499; hero frog line 594
- **images/** (7 files):
  - `frog-timer.png` — cache-safe in-timer face (idle/focus/long) ✅ true alpha
  - `frog-face.png` — original in-timer face, true alpha ✅ but **JPEG bytes** — needs re-encode
  - `frog-short.png` — short-break face, true alpha ✅
  - `frog-focus.png` — character bible / base mascot reference (JPEG bytes)
  - `frog-hero.png` — hero-section mascot, line 594 (JPEG bytes)
  - `frog-break.png` — not timer-referenced (JPEG bytes)
  - `frog-longbreak.png` — target path for pending fresh generation (JPEG bytes; 0 attempts)
- **uploads/** (2 files) — delivery landing spot.
- **QA tooling removed** from workspace — keyer/verify scripts likely need re-adding for the JPEG-byte PNGs and the waving-frog background fix.

## Key Decisions Made
- **Stale-cache fix = fresh filename — proven in production.** New transparent asset under a genuinely new URL confirmed by user; this is the release pattern for asset swaps.
- **Transparency is verified numerically before trusting renders** — pngjs/PIL alpha measurement is the source of truth (vision models unreliable on alpha/compositing).
- **No service worker / no client-side caching layer** — hard refresh is the canonical workaround until deploy.
- **Voice:** keep male; natural male voices promoted, but that implementation was rejected as worse. **Copy is not the problem** — do not re-litigate the friend-style rewrite.
- **`announce()` never speaks**; exactly four spoken moments, all routed through `say()` (focus start, short-break earned, long-break earned, break over).
- **Voice parked by KR**; resume path = live bridge voice audit with real audition.
- **Long-break generation constraint:** fresh, **no referenceImage**; checkpoint guard also forbids reusing the `frog-focus.png` reference under a new filename.
- **Unified despill gate:** frog-palette invariant `B < G` and `R < G`.
- **Re-key rule:** never chroma-key a previously keyed PNG; always key from the true source (git commit `6214343`).
- **Pipeline:** JPEG bytes → `jpeg-js` decode → RGBA via `pngjs` → magenta tolerance key → true PNG.
- **Magenta key color:** measured baked rgb(250,40,163) with compression-smear tolerance.
- **Mascot spec locked:** `frog-focus.png` anatomy/palette is the character bible.

## Pending Decisions
- **Voice direction (parked, revisit with KR):** live bridge voice audit + audition vs. runtime `getVoices()` audit vs. user-facing voice picker (localStorage) vs. neural TTS / pre-recorded audio. Constraint: male, warm. CEO proposed the live audition; KR hasn't confirmed.
- Exact wording/content of KR's five page edits when briefing Koba (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy).
- How to handle the waving frog's cream background in "Why a frog?" — key it out or regenerate.
- Long-break pose/copy: "quiet victory" (arms raised, closed happy smile, sage/gold sparkle dots) — confirm once generation is unblocked.
- Cache-busting strategy before deploy: query-versioned assets (`?v=`) vs. Cache-Control headers vs. the proven fresh-filename pattern.
- Deployment platform for the shareable public URL.

## Tasks
- [x] Designer delivered `frog-face.png` + `frog-short.png` at final image paths
- [x] Updated why-a-frog bullets in `index.html` per user
- [x] Built decode + chroma-key pipeline (`jpeg-js` → `pngjs` → tolerance key → true PNG)
- [x] Re-encoded `frog-face.png` + `frog-short.png` to true transparent PNGs
- [x] Numeric alpha verification — corners transparent, zero opaque pixels near magenta
- [x] Final two-tier despill on all feather pixels + vision re-check
- [x] Wired FROG map: `short` → `frog-short.png`
- [x] Root-caused "frog still has background" to stale cache; disk file conclusively verified transparent
- [x] Created `frog-timer.png` (fresh true-alpha URL) + repointed initial `src` + FROG map `idle`/`focus`/`long`
- [x] Final verification pass — `.frog` CSS clean, drop-shadow hugs alpha, FROG map + PNG headers confirmed
- [x] Cleaned up QA tooling from workspace
- [x] Confirmed cream square gone — **user: "that worked thanks"** ✅
- [x] Voice priority reorder + prosody warm-up in `say()` (Daniel first) — **rejected as "worse" by KR**
- [x] Friend-style rewrite of all four spoken lines — accepted ("it's the voice not the words")
- [ ] **Voice (parked):** live bridge voice audit + audition for KR; keep male, warm — KR to return to this
- [ ] Brief Koba on KR's five page edits: dark mode → frog green, "productive tool", "the what", beverage line, recharge copy
- [ ] Fix waving frog's soft cream background in "Why a frog?" section
- [ ] Re-encode `frog-face.png` to a real PNG (currently JPEG bytes) — ask Koba
- [ ] Generate `frog-longbreak.png` fresh with **no referenceImage** (0 attempts; shorten baked copy if text is wrong)
- [ ] Chroma-key `frog-longbreak.png` once delivered; wire `long` → `frog-longbreak.png`
- [ ] Preview timer face in live browser (Chrome) — confirm face sits correctly in the ring
- [ ] Decide and apply cache-busting strategy (query-versioned assets or cache headers)
- [ ] Deploy to a shareable public URL

## Opportunities
1. **Turn the voice fix into a user-verifiable pick.** KR's machine may not even have Daniel installed — a priority reorder can't fix a missing voice. On resume, use the bridge to enumerate real installed voices, audition the warmest male candidates live for KR, then either lock a default or add a small persisted picker. This converts "still horrible" from guessing into a choice KR can hear.
2. **Normalize every JPEG-byte PNG with the proven keyer.** `frog-focus.png`, `frog-hero.png`, `frog-break.png`, and the stale `frog-longbreak.png` are JPEG bytes under PNG names, and the waving frog reportedly has a cream background. Re-encoding everything to true alpha (re-adding the keyer as a small committed tool) makes dark-mode tints, hero retouches, and the waving-frog fix trivial.
3. **Codify cache-busting as the release convention.** The fresh-filename pattern just proved itself live. Codify it (or `?v=` / Cache-Control) so every future asset swap reaches users on first load — and pair it with a scripted palette tint of the existing true-alpha frog for KR's dark-mode-to-frog-green edit (no new image generation round needed).

## Next Steps
1. Re-engage KR on the "other edits" — brief Koba on the five page edits and confirm the exact copy direction for each.
2. Fix the waving frog's cream background in "Why a frog?" (likely ties into the JPEG-byte normalization pass).
3. Generate `frog-longbreak.png` fresh and referenceless (per checkpoint guard); when returned, key it and wire `long`.
4. Run the live-browser timer preview (pending recommendation).
5. Re-encode `frog-face.png` to a clean PNG before publish.
6. When KR returns to the voice: run the live bridge voice audit + audition; decide between picker and engine swap.
7. Decide cache-busting approach, then deploy to a shareable public URL.

---
*Last updated: 2026-08-14T01:25Z*