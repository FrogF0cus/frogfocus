# Frog Focus - Project Brief

**Type:** landing_page — single-page Pomodoro companion

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** — propagated across all 5 brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer voice: **male, warm, comforting, encouraging — like a friend**. Working verdict: the voice *quality* is the problem, not the words.
- Timer images render with **true transparency**; each Pomodoro phase shows the correct frog.
- Ship **cache-safe assets** so post-launch image fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Active thread: KR's queued page edits — now six, not five.** Original five (1) dark mode → frog green, 2) "productive tool" positioning, 3) "the what", 4) beverage line, 5) recharge copy) queued via recommendation to brief Koba, plus new **6) shade the timer preset buttons green like the short-break Pause button** (screenshot: `uploads/pasted-image-1786670913222.png`). CEO was mid-investigation on #6 when brief was cut.
- **Green-button edit (#6) — researched, not applied.** Confirmed: short-break Pause green comes from `.btn-start { background: var(--phase-accent) }`, which resolves to `var(--sage)` during short-break phase. The hero pills ("25 min focus" / "5 min breather" / "15 min recharge") are `.chip` spans — pale, gray outline, **no existing dark-mode `.chip` override** (grep found only line 224's `.btn-start` override). Screenshot shows the timer's mode buttons, not the hero pills — exact target still being confirmed.
- **Tagline swap DONE ✅** — "A cozy Pomodoro companion" → "your intentional productivity companion" in all 5 spots (page title, share preview, hero eyebrow, footer, browser tab). User confirmed.
- **Voice thread: resumed, re-attempted, parked again.** KR reopened ("keep the male voice but change it up") → `say()` reordered to Daniel-first + prosody warm-up → KR: **"that one is worse"** → friend-style rewrite of all four spoken lines → KR: **"no still horrible"** + **"it's the voice not the words"**. Copy is **closed** — do not re-litigate. Proposed **live bridge voice audit** (enumerate installed voices, audition warm male candidates for KR); KR deferred. Voice parked.
- **Transparency fix stays closed** — `frog-timer.png` (true alpha, fresh URL) serves `idle`/`focus`/`long`; `short` → `frog-short.png`.
- **`frog-longbreak.png` pending, 0 attempts.** Checkpoint guard: do **not** retry the `frog-focus.png` reference under a new filename — generate fresh with **no referenceImage** (shorten baked-in text if wrong) or deliver the latest clean edit. `long` still maps to `frog-timer.png` temporarily.
- **`frog-face.png` is JPEG bytes under a PNG name** — needs clean re-encode before publish (action: ask Koba).
- **Waving frog in "Why a frog?" still has a soft cream background** — flagged, unfixed.
- **Live-browser timer preview still not run** — confirm the face sits right in the ring before shipping.

## Files & Structure
- **App (single page):** `index.html` (61 KB) — all CSS, Pomodoro logic, copy, TTS. Key anchors:
  - `say()` ~lines 825–844 — Daniel-first voice picker + prosody; exactly four spoken moments (focus start, short-break earned, long-break earned, break over)
  - `announce()` — on-screen text only; never speaks
  - `.btn-start` override at line 224 — green comes from `var(--phase-accent)` → `var(--sage)` during short break
  - `.chip` spans — hero pills; pale w/ gray outline; no dark-mode override exists
  - Tagline appears in 5 spots: page title, share preview meta, hero eyebrow, footer, browser-tab title
  - FROG map ~lines 785–789 — `idle`/`focus`/`long` → `frog-timer.png`; `short` → `frog-short.png`
  - Initial `src` line 499; hero frog line 594
- **images/** (7 files):
  - `frog-timer.png` — cache-safe in-timer face (idle/focus/long) ✅ true alpha
  - `frog-face.png` — original in-timer face, true alpha ✅ but **JPEG bytes** — needs re-encode
  - `frog-short.png` — short-break face, true alpha ✅
  - `frog-focus.png` — character bible / base mascot reference (JPEG bytes)
  - `frog-hero.png` — hero-section mascot, line 594 (JPEG bytes)
  - `frog-break.png` — not timer-referenced (JPEG bytes)
  - `frog-longbreak.png` — target path for pending fresh generation (JPEG bytes; 0 attempts)
- **uploads/** (3 files) — delivery landing spot; includes green-button screenshot `pasted-image-1786670913222.png`.
- **QA tooling removed** from workspace — keyer/verify scripts likely need re-adding for JPEG-byte PNGs and the waving-frog background fix.

## Key Decisions Made
- Tagline locked: "your intentional productivity companion" — all 5 brand surfaces updated.
- Voice rounds 2 & 3 (Daniel-first reorder + prosody; friend-style copy rewrite) **rejected** — KR: "it's the voice not the words." Copy closed; voice quality is the problem.
- Voice resume path: **live bridge audit** (enumerate installed voices, audition warm male candidates for KR) — proposed, unconfirmed; voice parked.
- Green-button treatment: match the proven short-break Pause green (`var(--phase-accent)` → `var(--sage)`) rather than inventing a new tint; dark-mode `.chip` override must be created if pills are the target.
- **Stale-cache fix = fresh filename — proven in production**; the release pattern for asset swaps.
- Transparency verified numerically (pngjs/PIL alpha measurement) — vision models unreliable on alpha/compositing.
- No service worker / no client-side caching layer — hard refresh is canonical until deploy.
- `announce()` never speaks; exactly four spoken moments, all routed through `say()`.
- Long-break generation constraint: fresh, **no referenceImage**; guard forbids reusing `frog-focus.png` under a new filename.
- Unified despill gate: frog-palette invariant `B < G` and `R < G`.
- Re-key rule: never chroma-key a previously keyed PNG; always key from true source (git commit `6214343`).
- Pipeline: JPEG bytes → `jpeg-js` decode → RGBA via `pngjs` → magenta tolerance key → true PNG. Magenta key: baked rgb(250,40,163) with compression-smear tolerance.
- Mascot spec locked: `frog-focus.png` anatomy/palette is the character bible.

## Pending Decisions
- **Voice direction (parked; revisit with KR):** live bridge audit + audition vs. runtime voice alternatives.
- **Edit #6 target:** hero `.chip` pills vs. timer mode buttons — screenshot shows timer mode buttons; confirm before styling.
- **Who applies edits:** original five queued for Koba, but CEO has been applying edits directly in-session (tagline shipped, #6 in progress) — decide routing per edit.

## Tasks
- [x] Tagline swap: "A cozy Pomodoro companion" → "your intentional productivity companion" (all 5 spots) — user confirmed
- [ ] Edit #6: shade timer preset buttons green like short-break Pause — match `--phase-accent` → `var(--sage)`; add dark-mode `.chip` override if targeting pills
- [ ] Edit #1: dark mode → frog green
- [ ] Edit #2: "productive tool" positioning
- [ ] Edit #3: "the what"
- [ ] Edit #4: beverage line
- [ ] Edit #5: recharge copy
- [ ] Voice: live bridge audit + audition warm male voices — **parked**, awaiting KR
- [ ] Fix waving-frog soft cream background in "Why a frog?"
- [ ] Re-encode `frog-face.png` from JPEG bytes to clean true PNG
- [ ] Generate `frog-longbreak.png` — fresh, **no referenceImage**, 1:1, per spec (0 attempts; guard active)
- [ ] Remap `long` phase → `frog-longbreak.png` once generated
- [ ] Live-browser timer preview — confirm face sits right in the ring before shipping
- [ ] Re-add QA tooling (keyer/verify scripts) for JPEG-byte PNG checks + background fixes
- [ ] Deploy cache-safe build to a shareable public URL

## Opportunities
1. **One-commit release bundle:** Land all six page edits together with the image fixes (frog-longbreak, frog-face re-encode, waving-frog bg), then a single deploy + single hard-refresh moment for KR — cuts feedback churn to one pass.
2. **Settled voice session:** When KR returns, run the live bridge audit in one sitting — 2–3 warm male voices reading the *same* four lines inside the actual timer — so the voice decision is locked decisively instead of resurfacing.
3. **Pre-deploy asset validator:** Reintroduce a tiny script that fails on JPEG-byte PNGs, verifies alpha + `B < G`/`R < G` palette invariants, and checks fresh filenames — so transparency/cache issues never resurface post-launch.

## Next Steps
1. Finish edit #6: confirm target (timer mode buttons per screenshot), apply `var(--sage)`-matched green shading, create dark-mode override.
2. Apply remaining five queued edits (dark mode green, "productive tool", "the what", beverage line, recharge copy).
3. Re-encode `frog-face.png` → true PNG; generate `frog-longbreak.png` fresh (no referenceImage); remap `long`.
4. Fix waving-frog background; run live-browser timer preview.
5. Deploy cache-safe build to public URL.

---
*Last updated: 2026-08-14T01:27 UTC*