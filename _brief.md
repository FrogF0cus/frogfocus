# Frog Focus - Project Brief

**Type:** landing_page — single-page Pomodoro companion

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** — propagated across all 5 brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer voice: **male, warm, comforting, encouraging — like a friend**. Refined verdict: the voice quality is the problem, not the words.
- Timer images render with **true transparency** (verified); each Pomodoro phase shows the correct frog.
- Ship **cache-safe assets** so post-launch image fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Tagline swap DONE ✅** — "A cozy Pomodoro companion" → "your intentional productivity companion" in all 5 spots (page title, share preview, hero eyebrow, footer, browser tab). `index.html` updated; user confirmed.
- **Voice thread: resumed, re-attempted, parked again.** KR reopened it ("keep the male voice but change it up") → `say()` reordered to Daniel-first + prosody warm-up → KR: **"that one is worse"** → friend-style rewrite of all four spoken lines → KR: **"no still horrible"** + **"it's the voice not the words"**. Copy is closed — do not re-litigate. CEO proposed a **live bridge voice audit** (open browser on KR's machine, list installed voices, audition candidates); KR deferred: "lets come back to that. there are other edits". Voice is **parked** until KR returns.
- **Active thread = KR's queued page edits (five), for Koba:** 1) dark mode → frog green, 2) "productive tool" positioning, 3) "the what", 4) beverage line, 5) recharge copy. Tagline edit shipped separately.
- **Transparency fix stays closed** — `frog-timer.png` (true alpha, fresh URL) serves `idle`/`focus`/`long`; `short` → `frog-short.png`.
- **Waving frog in "Why a frog?" still has a soft cream background** — flagged, unfixed.
- **`frog-longbreak.png` pending, 0 attempts.** Checkpoint guard: do **not** retry the `frog-focus.png` reference under a new filename — generate fresh with **no referenceImage** (shorten baked-in text if wrong) or deliver the latest clean edit. `long` still maps to `frog-timer.png` temporarily.
- **`frog-face.png` is JPEG bytes under a PNG name** — needs clean re-encode before publish (action: ask Koba).
- **Live-browser timer preview still not run** — confirm the face sits right in the ring before shipping.

## Files & Structure
- **App (single page):** `index.html` (60 KB) — all CSS, Pomodoro logic, copy, TTS. Key anchors:
  - `say()` lines 825–844 — voice picker (Daniel → Microsoft David/Guy/Mark → Alex → Google UK English Male fallback) + prosody + exactly four spoken moments (focus start, short-break earned, long-break earned, break over)
  - `announce()` — on-screen text only; never speaks
  - Tagline appears in 5 spots: page title, share preview meta, hero eyebrow, footer, browser-tab title
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
- Tagline locked: "your intentional productivity companion" — all 5 brand surfaces updated.
- Voice round 2 (Daniel-first priority reorder) **rejected as worse**; friend-style copy rewrite delivered but **not the fix** — KR: "it's the voice not the words." Copy closed; voice quality is the problem.
- Voice resume path: **live bridge audit** (enumerate installed voices, audition warm male candidates for KR) — proposed, unconfirmed; voice parked.
- **Stale-cache fix = fresh filename — proven in production**; the release pattern for asset swaps.
- Transparency is verified numerically (pngjs/PIL alpha measurement) — vision models unreliable on alpha/compositing.
- No service worker / no client-side caching layer — hard refresh is canonical until deploy.
- `announce()` never speaks; exactly four spoken moments, all routed through `say()`.
- Long-break generation constraint: fresh, **no referenceImage**; guard forbids reusing `frog-focus.png` under a new filename.
- Unified despill gate: frog-palette invariant `B < G` and `R < G`.
- Re-key rule: never chroma-key a previously keyed PNG; always key from true source (git commit `6214343`).
- Pipeline: JPEG bytes → `jpeg-js` decode → RGBA via `pngjs` → magenta tolerance key → true PNG. Magenta key: baked rgb(250,40,163) with compression-smear tolerance.
- Mascot spec locked: `frog-focus.png` anatomy/palette is the character bible.

## Pending Decisions
- **Voice direction (parked; revisit with KR):** live bridge audit + audition vs. runtime