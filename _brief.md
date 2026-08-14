# Frog Focus - Project Brief

**Type:** landing_page — single-page Pomodoro companion

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer voice: male, warm, comforting, encouraging — like a friend. Voice *quality* is the parked issue, not the words.
- Timer images render with true transparency; cache-safe assets so fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Polish phase.** KR does fine-grained visual QA via screenshots; CEO edits `index.html` inline.
- **🔄 Active thread: constellation dots.** KR requested 2 more dots per constellation (9 → 11) to keep the brand rhythm. CEO is mid-edit: "let me find both constellations and add 2 dots to each" (new indices 9 and 10, identical sage/gold/clay sizing and twinkle stagger). The 720px fluid spread and the second placement (after "The Why") were both approved and shipped earlier this session.
- **🔄 Active thread: working log.** KR asked again to sidebar and "add another fix to the working log." CEO confirmed no working-log file exists in this project and is now searching KR's other projects; if none is found, CEO will start one. **The fix content KR wants logged has not been stated — confirm.**
- **Communication norm locked:** KR prefers brief status confirmations ("just let me know you're working on it") over apologies for lag. CEO has adopted "no apologies, just 'on it.'"
- **Blocked:** `images/frog-longbreak.png` — media checkpoint unchanged. Prior turn hit the 2-edit limit on `frog-focus.png`; do **not** retry that reference under another filename. Fix: rewrite dense baked-in text into shorter copy and generate one fresh image **without** `referenceImage`, or explicitly deliver the latest clean edit.
- Three queued recommendations (`recommendations_v1`): apply KR's five page edits (→ Koba), re-encode `frog-face.png` as a true PNG, live Chrome preview of the timer face in the ring.

## Files & Structure
- **Landing Page (single file):** `index.html` (62KB) — all markup, inline CSS, and JS. Flow: nav → hero (title, tagline, frog mascot, three sage phase pills) → RITUAL section (cycle card) → **constellation #1 (line 588, 9 dots, being extended to 11)** → "The Why" section → **constellation #2 (~line 649, 9 dots, being extended to 11)** → SHARE section → timer UI → footer ("Made with ❤️ in the pond"). Both constellations share identical markup (same dot colors, sizes, twinkle stagger, `aria-hidden`); shared constellation CSS lives after the `.cycle-arrow` rules (~line 286).
- **Images** (`images/`, 7 files): `frog-focus.png` (master mascot reference), `frog-face.png` (in-timer face — needs true-PNG re-encode; currently JPEG bytes under a .png name), `frog-longbreak.png` (pending — same mascot, arms raised quiet victory, gold/sage sparkles, off-white background; queued prompt must drop `referenceImage`), plus 4 others across hero/timer/dark-mode states.
- **Uploads** (`uploads/`, 6 files): KR's pasted screenshots driving current visual edits.
- **Working log:** none in this project (confirmed by search) — CEO is searching other projects; location TBD or to be created.

## Key Decisions Made
- **Constellation = recurring brand divider**, now at two placements bookending "The Why" (before RITUAL→WHY seam at line 588; after WHY close ~line 649). Fluid 720px band, sage/gold/clay dots, staggered twinkle, `aria-hidden`. **KR has now requested 11 dots per constellation (up from 9)** — both sections get identical treatment, same brand rhythm.
- **Communication norm:** concise status updates when lagging; no apologies.
- Tagline locked: "your intentional productivity companion."
- "Why a frog" renamed to **"The Why"** (nav + section eyebrow).
- Footer is "Made with ❤️ in the pond"; share-text frog left untouched.
- Cycle diagram stops cleanly at "8 Long break" pill — trailing arrow and "↻ Again" button removed; aria-label typo fixed.
- "How it works" button shares `btn-primary` gold styling with the start button.
- Hero pills shaded `var(--sage)` with cream text/icons and soft green glow.
- Mascot palette/spec locked; timer voice direction locked (warm male friend).

## Pending Decisions
- **Where the working log lives** — existing log in another project vs. starting one in this project — and the content of the fix KR wants logged (TBD).
- Whether to add more constellation placements on other page seams (CEO's offer to KR is still open).
- How to unblock `frog-longbreak.png` — fresh image without `referenceImage` (shorter baked-in copy) vs. accept the latest clean edit.
- Sequence/ownership of the five queued page edits when handed to Koba.

## Tasks
- [x] Add **constellation #1** at line 588 — nine sage/gold/clay dots, staggered pulse, `aria-hidden`; CSS after `.cycle-arrow` rules
- [x] **Widen constellation spread** to 720px fluid band (KR: "let's spread them wider")
- [x] **Add constellation #2 after the WHY section** (~line 649) — identical markup, approved by KR ("looks great")
- [ ] **Add 2 dots to each constellation** (9 → 11 per section, indices 9 and 10) — CEO currently mid-edit
- [ ] **Locate or create the working log** — finish search of KR's other projects; log the requested fix (confirm fix content with KR)
- [ ] **Answer the open seam offer** — confirm with KR whether more constellations are wanted on other seams
- [ ] Apply KR's five page edits: dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy (queue to Koba)
- [ ] Convert `frog-face.png` to a real PNG (currently JPEG bytes under .png name)
- [ ] Preview timer face in live Chrome to confirm placement in the ring
- [ ] Generate `images/frog-longbreak.png` per queued prompt — fresh image **without** `referenceImage`, shorter baked-in copy
- [ ] Verify cache-safe asset strategy; full QA pass (light/dark, mobile/desktop)
- [ ] Deploy `index.html` + `images/` to a shareable public URL

## Opportunities
1. **Start the canonical in-project working log now.** KR has asked twice to log fixes; no log exists. Create `WORKING-LOG.md` at the project root with dated entries (fix, owner, status), log the 9→11 constellation change as entry #1, and ask KR for the "another fix" content. Resolves the sidebar request and gives every future session durable context.
2. **Make the constellation data-driven.** This is the third edit to the same motif (added, widened, now dot-count change). Render dots from a small JS array so future "add N dots" requests become a one-line change that preserves sizing, colors, and twinkle stagger automatically.
3. **Complete the cadence + ship.** CEO's seam offer is still open — a placement before the timer CTA or above the footer would bookend the page and echo the pending long-break sparkles. Meanwhile, deploy the current page to a shareable URL so KR can circulate it, then land Koba's five edits, the `frog-face.png` fix, and `frog-longbreak.png` as one verified batch (light/dark + mobile/desktop).

## Next Steps
1. Finish adding the 2 extra dots to both constellations (mid-edit) and confirm with KR after a hard-refresh.
2. Resolve the working log: complete the cross-project search or create `WORKING-LOG.md` in this project; confirm the fix content with KR and log it.
3. Confirm with KR whether to add the offered constellation placements on other seams.
4. Brief Koba on the five queued page edits; re-encode `frog-face.png`; run the live Chrome timer-face check.
5. Generate `frog-longbreak.png` as a fresh image without `referenceImage` (shorter baked-in copy) — or explicitly accept the latest clean edit.
6. Full-page QA (light/dark, mobile/desktop), hard-refresh verify, then deploy `index.html` + `images/` to a shareable public URL.

---
*Last updated: 2026-08-14T04:15:00Z*