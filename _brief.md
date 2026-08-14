# Frog Focus - Project Brief

**Type:** landing_page — single-page Pomodoro companion

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** — on all 5 brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer voice: male, warm, comforting, encouraging — like a friend. Verdict: voice *quality* is the problem, not the words. Parked.
- Timer images render with true transparency; each phase shows the correct frog; cache-safe assets so fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Polish phase.** KR is doing fine-grained visual QA via screenshots; CEO is editing index.html inline.
- All recent edits landed: "The Why" heading, footer heart emoji, trimmed cycle diagram, gold "How it works" button, sage-green hero pills.
- **Blocked:** `images/frog-longbreak.png` (long-break celebration pose) — generation was skipped because the turn already produced 2 edits of `frog-focus.png`; per guidance, do not retry the same reference under a new filename. Options: rewrite baked-in text shorter and generate fresh (no `referenceImage`), or deliver the latest clean edit.
- Three queued recommendations from earlier review: KR's five page edits (→ Koba), frog-face.png re-encode, live browser preview.

## Files & Structure
- **Landing Page (single file):** `index.html` (60KB) — all markup, inline CSS, and JS. Flow: nav → hero (title, tagline, frog mascot, three phase pills) → "The Why" section (retitled from "Why a frog") → "How it works" (cycle diagram: 25 min focus → 5 min breather → 8 Long break, no trailing UI) → timer UI ("Start your first pomodoro" gold button) → footer ("Made with ❤️ in the pond").
- **Images** (`images/`, 7 files): `frog-focus.png` (master mascot reference — flat-vector sage/cream/clay, glasses, yellow eyes), `frog-face.png` (in-timer face — needs true-PNG re-encode; currently JPEG bytes under a .png name), `frog-longbreak.png` (pending — long-break celebration pose), plus 4 others used across hero/timer/dark-mode states.
- **Uploads** (`uploads/`, 5 files): KR's pasted screenshots driving the current visual edits (cycle diagram, hero buttons, hero pills).

## Key Decisions Made
- Tagline locked: "your intentional productivity companion" across all 5 brand surfaces.
- "Why a frog" section renamed to **"The Why"** (nav link + section eyebrow), per KR.
- Footer is now "Made with ❤️ in the pond" — frog emoji replaced with heart emoji; share-text frog left untouched.
- Cycle diagram stops cleanly at the "8 Long break" pill — trailing arrow and faded "↻ Again" button removed; aria-label tidied; the note below still explains the loop.
- "How it works" button uses the same `btn-primary` class as "Start your first pomodoro" — identical gold, soft glow, and hover lift (no ghost variant).
- Hero pills ("25 min focus", "5 min breather", "15 min recharge") shaded in `var(--sage)` with cream text/icons and a soft green glow — matches the short-break Pause button.
- Mascot palette/spec locked (sage #6C7F6A, cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework).
- Timer voice direction locked (warm male friend); quality issue parked, not the words.

## Pending Decisions
- None recorded from KR.
- Open: how to unblock `frog-longbreak.png` — fresh image without `referenceImage` vs. accept the latest clean edit. (Backlog flagged a 2-edit limit on `frog-focus.png`.)

## Tasks
- [x] Rename "Why a frog" → "The Why" (nav + section eyebrow)
- [x] Replace footer frog emoji with heart emoji
- [x] Remove trailing arrow + "↻ Again" button after "8 Long break"; fix aria-label
- [x] Make "How it works" button gold (`btn-primary`, matching start button)
- [x] Shade hero pills sage green with cream text + soft glow
- [ ] Apply KR's five page edits: dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy (queue to Koba)
- [ ] Convert `frog-face.png` to a real PNG (currently JPEG bytes under .png name)
- [ ] Preview timer face in live Chrome to confirm placement in the ring
- [ ] Generate `images/frog-longbreak.png` (same mascot, arms raised quiet victory, gold/sage sparkles) — fresh image without `referenceImage`, short copy
- [ ] Verify cache-safe asset strategy; hard-refresh QA across light/dark + mobile/desktop
- [ ] Deploy to a shareable public URL

## Opportunities
1. **Long-break state as a delight moment** — the quiet-victory frog + sparkles ties directly into the new sage pills and "15 min recharge" copy; consider a brief scale/glow animation on the timer ring when entering long break so it feels celebratory, not just static.
2. **Batch visual QA sweep before deploy** — KR is clearly responsive to pixel-level polish; one full light/dark, mobile/desktop screenshot pass (plus the queued dark-mode-to-frog-green edit) would catch contrast/alignment issues in a single round instead of one-off fixes.
3. **Ship early to a public URL** — copy and layout are nearly locked; deploy now (Netlify/GitHub Pages) so KR can share the link and collect feedback while the remaining image and dark-mode work lands as a fast-follow.

## Next Steps
1. Brief Koba on the five queued page edits (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy).
2. Have `frog-face.png` re-encoded as a true PNG; run the live Chrome check of the timer face in the ring.
3. Generate `frog-longbreak.png` as a fresh image (no `referenceImage`) once the edit budget resets — or explicitly accept the latest clean edit.
4. Run full-page QA (light/dark, mobile/desktop) and hard-refresh verify all recent edits.
5. Deploy `index.html` + `images/` to a shareable public URL.

---
*Last updated: 2026-08-14T01:39:41Z*