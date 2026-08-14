# Frog Focus - Project Brief

**Type:** web_app — single-page Pomodoro companion

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer voice: male, warm, comforting, encouraging — like a friend. Voice *quality* is the problem, not the words. Parked.
- Timer images render with true transparency; each phase shows the correct frog; cache-safe assets so fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Polish phase.** KR is doing fine-grained visual QA via screenshots; CEO edits `index.html` inline. All recent edits landed: "The Why" heading, footer heart emoji, trimmed cycle diagram.
- **Active:** KR asked for a simple design element in the blank vertical gap between the cycle (RITUAL) card and the "The Why" section (screenshot `uploads/pasted-image-1786671708676.png`). KR confirmed they like the **constellation of small dots** concept. CEO verified the gap sits between the end of the RITUAL section's cards and the start of WHY, and was reading the exact HTML structure + brand palette to implement. Element not yet added.
- **Blocked:** `images/frog-longbreak.png` generation was skipped — this turn already produced 2 edits of `frog-focus.png`. Guidance: rewrite baked-in text shorter and make one fresh image **without** `referenceImage`, or deliver the latest clean edit.
- Three queued recommendations (from `recommendations_v1`): apply KR's five page edits (→ Koba), re-encode `frog-face.png` as a true PNG, live Chrome preview of the timer face in the ring.

## Files & Structure
- **Landing Page (single file):** `index.html` (60KB) — all markup, inline CSS, and JS. Flow: nav → hero (title, tagline, frog mascot, three sage phase pills) → RITUAL section (cycle card: 25 min focus → 5 min breather → 8 Long break) → **blank gap (constellation-dots target)** → "The Why" section → timer UI ("Start your first pomodoro" gold button) → footer ("Made with ❤️ in the pond").
- **Images** (`images/`, 7 files): `frog-focus.png` (master mascot reference — flat-vector sage/cream/clay, glasses, yellow eyes), `frog-face.png` (in-timer face — needs true-PNG re-encode; currently JPEG bytes under a .png name), `frog-longbreak.png` (pending — same mascot, arms raised quiet victory, sparkles, off-white background), plus 4 others used across hero/timer/dark-mode states.
- **Uploads** (`uploads/`, 6 files): KR's pasted screenshots driving current visual edits — including the blank-space screenshot `pasted-image-1786671708676.png`. Note: a broad grep also hit `_portal.html`; all scoped edits target `index.html` only.

## Key Decisions Made
- **Blank-space element: constellation of small dots** — KR explicitly approved this concept ("i like the idea of the constellation of small dots"); CEO is matching it to the brand palette. Implementation pending.
- Tagline locked: "your intentional productivity companion" across all brand surfaces.
- "Why a frog" section renamed to **"The Why"** (nav link + section eyebrow), per KR.
- Footer is now "Made with ❤️ in the pond" — frog emoji replaced with heart emoji; share-text frog left untouched.
- Cycle diagram stops cleanly at the "8 Long break" pill — trailing arrow and faded "↻ Again" button removed; aria-label typo fixed; note below still explains the loop.
- "How it works" button uses the same `btn-primary` class as "Start your first pomodoro" — identical gold, soft glow, hover lift.
- Hero pills ("25 min focus", "5 min breather", "15 min recharge") shaded in `var(--sage)` with cream text/icons and a soft green glow.
- Mascot palette/spec locked (sage #6C7F6A, cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework).
- Timer voice direction locked (warm male friend); quality issue parked, not the words.

## Pending Decisions
- Exact implementation details of the constellation dots (count, size, spacing, exact colors) — CEO mid-investigation of section structure/palette.
- How to unblock `frog-longbreak.png` — fresh image without `referenceImage` (shorter baked-in copy) vs. accept the latest clean edit (2-edit limit on `frog-focus.png` reached).

## Tasks
- [x] Rename "Why a frog" → "The Why" (nav + section eyebrow)
- [x] Replace footer frog emoji with heart emoji
- [x] Remove trailing arrow + "↻ Again" button after "8 Long break"; fix aria-label
- [x] Make "How it works" button gold (`btn-primary`, matching start button)
- [x] Shade hero pills sage green with cream text + soft glow
- [ ] Add **constellation of small dots** in the blank space between the cycle card and "The Why" (screenshot `uploads/pasted-image-1786671708676.png`) — concept approved, not yet added
- [ ] Apply KR's five page edits: dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy (queue to Koba)
- [ ] Convert `frog-face.png` to a real PNG (currently JPEG bytes under .png name)
- [ ] Preview timer face in live Chrome to confirm placement in the ring
- [ ] Generate `images/frog-longbreak.png` (same mascot, arms raised quiet victory, gold/sage sparkles) — fresh image without `referenceImage`, shorter baked-in copy
- [ ] Verify cache-safe asset strategy; hard-refresh QA across light/dark + mobile/desktop
- [ ] Deploy to a shareable public URL

## Opportunities
1. **Constellation as connective brand tissue** — the small dots can echo the sparkle motif of the pending long-break image and the timer's dot rhythm, subtly unifying the visual language instead of being a one-off spacer.
2. **Batch visual QA sweep before deploy** — KR is clearly responsive to pixel-level polish; one full light/dark, mobile/desktop screenshot pass (plus the queued dark-mode-to-frog-green edit) would catch contrast/alignment issues in a single round rather than one-off fixes.
3. **Ship early to a public URL** — copy and layout are nearly locked; deploy now (Netlify/GitHub Pages) so KR can share the link and collect feedback while the remaining image and dark-mode work lands as a fast-follow.

## Next Steps
1. Implement the constellation of small dots in the blank space, matched to the brand palette from `index.html`; hard-refresh verify against KR's screenshot.
2. Brief Koba on the five queued page edits (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy).
3. Have `frog-face.png` re-encoded as a true PNG; run the live Chrome check of the timer face in the ring.
4. Generate `frog-longbreak.png` as a fresh image (no `referenceImage`, shorter copy) once the edit budget resets — or explicitly accept the latest clean edit.
5. Run full-page QA (light/dark, mobile/desktop), hard-refresh verify all recent edits, then deploy `index.html` + `images/` to a shareable public URL.

---
*Last updated: 2026-08-14T01:45:00Z*