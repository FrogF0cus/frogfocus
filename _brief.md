# Frog Focus - Project Brief

**Type:** landing_page — single-page Pomodoro companion

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer voice: male, warm, comforting, encouraging — like a friend. Voice *quality* is the problem, not the words. Parked.
- Timer images render with true transparency; each phase shows the correct frog; cache-safe assets so fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Polish phase.** KR does fine-grained visual QA via screenshots; CEO edits `index.html` inline.
- **✅ Constellation dots landed and being widened.** KR approved the concept ("i like the idea", "ok go for it"); CEO implemented nine brand-palette dots (sage, warm gold, clay) in the blank gap between the cycle card and "The Why" — inserted at `index.html` line 588, CSS after `.cycle-arrow` rules (~286), staggered pulse indices for a sequential twinkle, `aria-hidden` for screen readers. KR then said "love them! let's spread them wider across the page a bit" — CEO found the gap is only 26px and too tightly centered, and is mid-edit to widen gaps and use a fuller row width. **This is the latest active edit.**
- **Blocked:** `images/frog-longbreak.png` generation was skipped — this turn already produced 2 edits of `frog-focus.png`. Guidance: rewrite dense baked-in text into shorter copy and make one fresh image **without** `referenceImage` (do not retry that reference under another filename), or explicitly deliver the latest clean edit.
- Three queued recommendations (`recommendations_v1`): apply KR's five page edits (→ Koba), re-encode `frog-face.png` as a true PNG, live Chrome preview of the timer face in the ring.

## Files & Structure
- **Landing Page (single file):** `index.html` (61KB) — all markup, inline CSS, and JS. Flow: nav → hero (title, tagline, frog mascot, three sage phase pills) → RITUAL section (cycle card: 25 min focus → 5 min breather → 8 Long break) → **constellation dots (line 588 — nine pulsing dots, currently being re-spaced wider)** → "The Why" section → timer UI ("Start your first pomodoro" gold button) → footer ("Made with ❤️ in the pond"). Constellation CSS lives after the `.cycle-arrow` rules (~line 286).
- **Images** (`images/`, 7 files): `frog-focus.png` (master mascot reference — flat-vector sage/cream/clay, glasses, yellow eyes), `frog-face.png` (in-timer face — needs true-PNG re-encode; currently JPEG bytes under a .png name), `frog-longbreak.png` (pending — same mascot, arms raised quiet victory, sparkles, off-white background), plus 4 others used across hero/timer/dark-mode states.
- **Uploads** (`uploads/`, 6 files): KR's pasted screenshots driving current visual edits — including the blank-space screenshot that the constellation filled. Note: a broad grep hit `_portal.html`; all scoped edits must target `index.html` only.

## Key Decisions Made
- **Constellation = the blank-space element.** KR approved the concept; CEO implemented nine sage/gold/clay dots with sequential twinkle + `aria-hidden`. KR then requested a **wider spread** — CEO is widening the gap (currently 26px, too tight) and row width. In progress.
- Tagline locked: "your intentional productivity companion" across all brand surfaces.
- "Why a frog" section renamed to **"The Why"** (nav link + section eyebrow).
- Footer is now "Made with ❤️ in the pond" — frog emoji replaced with heart emoji; share-text frog left untouched.
- Cycle diagram stops cleanly at the "8 Long break" pill — trailing arrow and faded "↻ Again" button removed; aria-label typo fixed; note below still explains the loop.
- "How it works" button uses the same `btn-primary` class as "Start your first pomodoro" — identical gold, soft glow, hover lift.
- Hero pills ("25 min focus", "5 min breather", "15 min recharge") shaded in `var(--sage)` with cream text/icons and a soft green glow.
- Mascot palette/spec locked (sage #6C7F6A, cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework).
- Timer voice direction locked (warm male friend); quality issue parked, not the words.

## Pending Decisions
- How to unblock `frog-longbreak.png` — fresh image without `referenceImage` (shorter baked-in copy) vs. accept the latest clean edit (2-edit limit on `frog-focus.png` reached).
- Sequence/ownership of the five queued page edits when handed to Koba.

## Tasks
- [x] Add **constellation of small dots** at line 588 (between RITUAL close and WHY comment) — nine sage/gold/clay dots, staggered pulse animation, `aria-hidden`; CSS after `.cycle-arrow` rules
- [ ] **Spread constellation wider** — wider gaps + fuller row width per KR ("love them! let's spread them wider across the page a bit"); current gap is 26px and too tightly centered (in progress, latest edit)
- [x] Rename "Why a frog" → "The Why" (nav + section eyebrow)
- [x] Replace footer frog emoji with heart emoji
- [x] Remove trailing arrow + "↻ Again" button after "8 Long break"; fix aria-label
- [x] Make "How it works" button gold (`btn-primary`, matching start button)
- [x] Shade hero pills sage green with cream text + soft glow
- [ ] Apply KR's five page edits: dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy (queue to Koba)
- [ ] Convert `frog-face.png` to a real PNG (currently JPEG bytes under .png name)
- [ ] Preview timer face in live Chrome to confirm placement in the ring
- [ ] Generate `images/frog-longbreak.png` (same mascot, arms raised quiet victory, gold/sage sparkles) — fresh image without `referenceImage`, shorter baked-in copy
- [ ] Verify cache-safe asset strategy; hard-refresh QA across light/dark + mobile/desktop
- [ ] Deploy to a shareable public URL

## Opportunities
1. **Constellation as connective brand tissue** — the dots already echo the sparkle motif of the pending long-break image and the timer's dot rhythm. Once the spacing is finalized, extend the same pulsing-dot language into the timer idle state or footer to subtly unify the page's visual identity.
2. **Batch visual QA sweep before deploy** — KR is clearly responsive to pixel-level polish; one full light/dark, mobile/desktop screenshot pass (plus the queued dark-mode-to-frog-green edit) would catch contrast/alignment issues in a single round rather than one-off fixes.
3. **Ship early to a public URL** — copy and layout are nearly locked; deploy now (Netlify/GitHub Pages) so KR can share the link and collect feedback while the remaining image and dark-mode work lands as a fast-follow.

## Next Steps
1. Finish the constellation width/spacing edit; hard-refresh verify against KR's screenshot — dots should read as a wider, airier row with no layout shift at line 588.
2. Brief Koba on the five queued page edits (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy).
3. Have `frog-face.png` re-encoded as a true PNG; run the live Chrome check of the timer face in the ring.
4. Generate `frog-longbreak.png` as a fresh image (no `referenceImage`, shorter copy) once the edit budget resets — or explicitly accept the latest clean edit.
5. Run full-page QA (light/dark, mobile/desktop), hard-refresh verify all recent edits, then deploy `index.html` + `images/` to a shareable public URL.

---
*Last updated: 2026-08-14T02:20:00Z*