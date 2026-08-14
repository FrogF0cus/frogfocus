# Frog Focus - Project Brief

**Type:** landing_page — single-page Pomodoro companion

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** — propagated across all 5 brand surfaces and user-confirmed.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer voice: **male, warm, comforting, encouraging — like a friend**. Working verdict: the voice *quality* is the problem, not the words. Parked.
- Timer images render with **true transparency**; each Pomodoro phase shows the correct frog; **cache-safe assets** so fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Active edit: "How it works" button → gold.** KR: "make the how it works button yellow like the start your first pomodoro button" (screenshot `uploads/pasted-image-1786671087624.png`). Start button = `.btn-primary` (gold); How-it-works is currently `.btn-ghost`. Decision: switch to the same `.btn-primary` class for identical yellow. CEO mid-edit (last message: "Editing `index.html`…").
- **Green hero pills: DONE + user-approved ✅** — the three `.chip` pills ("25 min focus" / "5 min breather" / "15 min recharge") shaded like the short-break Pause button: `var(--sage)` fill, warm-cream icons/text, soft green glow. No dark-mode `.chip` override existed; verified no leftover dark-mode conflict. KR: "looks great." (Earlier screenshot ambiguity — timer mode buttons vs. hero pills — resolved by user acceptance of the hero-pill treatment.)
- **Tagline swap: DONE + confirmed ✅** — all 5 spots (page title, share preview, hero eyebrow, footer, browser tab); hard-refresh acknowledged.
- **Voice thread: parked.** Copy is closed ("it's the voice not the words"). Live bridge audit (enumerate installed voices, audition warm male candidates for KR) proposed; KR deferred ("lets come back to that").
- **Original five queued edits still pending:** dark mode → frog green, "productive tool" positioning, "the what", beverage line, recharge copy. KR signaled more edits are coming.
- **Images:** `frog-longbreak.png` pending (0 attempts; checkpoint guard active — must generate fresh, **no referenceImage**); `frog-face.png` is JPEG bytes under a PNG name (needs re-encode); waving frog in "Why a frog?" still has soft cream background; live-browser timer preview not yet run.

## Files & Structure
- **App (single page):** `index.html` (61 KB) — all CSS, Pomodoro logic, copy, TTS. Key anchors:
  - `.btn`, `.btn-primary` (gold), `.btn-ghost` — shared button classes; How-it-works being switched from ghost → primary
  - `.chip` spans — hero pills; now sage green w/ cream text; dark-mode override handled
  - `.btn-start` override at line 224 — `var(--phase-accent)` → `var(--sage)` during short break (the green reference)
  - `say()` ~lines 825–844 — Daniel-first voice picker + prosody; exactly four spoken moments
  - `announce()` — on-screen text only; never speaks
  - FROG map ~lines 785–789 — `idle`/`focus`/`long` → `frog-timer.png`; `short` → `frog-short.png`; `long` still temporary
  - Tagline in 5 spots: page title, share preview meta, hero eyebrow, footer, browser-tab title
- **images/** (7 files):
  - `frog-timer.png` — cache-safe in-timer face (idle/focus/long) ✅ true alpha
  - `frog-face.png` — original in-timer face, true alpha ✅ but **JPEG bytes** — needs re-encode
  - `frog-short.png` — short-break face, true alpha ✅
  - `frog-focus.png` — character bible / base mascot reference (JPEG bytes)
  - `frog-hero.png` — hero mascot (JPEG bytes)
  - `frog-break.png` — not timer-referenced (JPEG bytes)
  - `frog-longbreak.png` — target for pending fresh generation (JPEG bytes; 0 attempts)
- **uploads/** (4 files) — includes green-button screenshot `pasted-image-1786670913222.png` and yellow-button screenshot `pasted-image-1786671087624.png`.
- **QA tooling removed** from workspace — keyer/verify scripts likely need re-adding.

## Key Decisions Made
- Green-chip treatment: `var(--sage)` fill + warm-cream icons/text + soft glow; dark-mode override created (none existed).
- "How it works" → reuse `.btn-primary` class for identical gold (no new tint invented).
- Tagline locked across all 5 brand surfaces.
- Voice: copy closed; quality is the problem; resume path = live bridge audit (parked).
- **Edit routing: CEO applying directly in-session** (tagline, green chips shipped; yellow button in progress) — the "brief Koba" recommendation for the five queued edits may be obsolete.
- Stale-cache fix = fresh filename — proven in production; the release pattern for asset swaps.
- Transparency verified numerically (pngjs/PIL); vision models unreliable on alpha/compositing.
- Long-break generation constraint: fresh, **no referenceImage**; guard forbids reusing `frog-focus.png` under a new filename.
- Unified despill gate: frog-palette invariant `B < G` and `R < G`; never re-key previously keyed PNGs — always from true source (git commit `6214343`).
- Mascot spec locked: `frog-focus.png` anatomy/palette is the character bible.

## Pending Decisions
- **Voice direction (parked):** live bridge audit + audition vs. runtime voice alternatives — revisit with KR.
- **Routing for remaining five edits:** Koba vs. CEO-direct — current pattern favors CEO-direct while KR is in-session.
- Deploy timing after the current edit batch completes.

## Tasks
- [x] Tagline swap: → "your intentional productivity companion" (all 5 spots) — confirmed
- [x] Green hero pills shaded like short-break Pause (`var(--sage)`) — approved
- [ ] "How it works" button → gold `.btn-primary` (IN PROGRESS)
- [ ] Dark mode → frog green
- [ ] "productive tool" positioning
- [ ] "the what"
- [ ] Beverage line
- [ ] Recharge copy
- [ ] Voice: live bridge audit + audition warm male voices — **parked**, awaiting KR
- [ ] Re-encode `frog-face.png` from JPEG bytes to clean true PNG
- [ ] Generate `frog-longbreak.png` — fresh, **no referenceImage**, 1:1, per spec (0 attempts; guard active)
- [ ] Remap `long` phase → `frog-longbreak.png` once generated
- [ ] Fix waving-frog soft cream background in "Why a frog?"
- [ ] Live-browser timer preview — confirm face sits right in the ring before shipping
- [ ] Re-add QA tooling (keyer/verify scripts) for JPEG-byte PNG checks + background fixes
- [ ] Deploy cache-safe build to a shareable public URL

## Opportunities
1. **Strike while momentum is high:** KR is in a rapid review loop ("looks great. now this") with CEO shipping edits directly and instantly. Land the five remaining queued edits in-session now, then a single deploy + one hard-refresh — eliminates the Koba round-trip and feedback churn.
2. **One-commit release bundle:** Combine the remaining edits with the image fixes (`frog-longbreak` generation, `frog-face` re-encode, waving-frog bg) so there's exactly one deploy pass and one verification moment for KR.
3. **Pre-deploy asset validator:** Reintroduce a tiny script that fails on JPEG-byte PNGs, verifies alpha + `B < G`/`R < G` palette invariants, and checks fresh filenames — so transparency/cache issues never resurface post-launch.

## Next Steps
1. Finish the gold `.btn-primary` swap for "How it works" and confirm with KR.
2. Apply the remaining five queued edits (dark-mode green, "productive tool", "the what", beverage line, recharge copy).
3. Generate `frog-longbreak.png` fresh (no referenceImage); remap `long`; re-encode `frog-face.png`.
4. Fix waving-frog background; run live-browser timer preview.
5. Deploy cache-safe build to a public URL.

---
*Last updated: 2026-08-14T01:30 UTC*