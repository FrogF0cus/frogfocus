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
- **✅ Constellation motif is now a two-placement page rhythm.** Two identical nine-dot constellations (sage, warm gold, clay — same sizes, same twinkle stagger, `aria-hidden`) flank "The Why": #1 at line 588 (between RITUAL and WHY) and #2 between the WHY section close (~line 649) and SHARE (~line 651). Both render in a fluid 720px band. KR approved the second placement ("looks great"); CEO offered to add more on **any other seams** — that offer is still open.
- **🔄 Active thread: working log.** KR asked to *"sidebar and add another fix to the working log"* — but no working-log file exists in this project. CEO noted the request for the whole team and is now searching KR's other projects to find where the log has been kept; if none exists, CEO will start one. **The specific fix content hasn't been stated yet — confirm with KR.**
- **Communication norm locked:** KR prefers status confirmations ("just let me know you're working on it") over apologies for lag.
- **Blocked:** `images/frog-longbreak.png` — media checkpoint unchanged. The prior turn hit the 2-edit limit on `frog-focus.png`; do **not** retry that reference under another filename. Solution: rewrite dense baked-in text into shorter copy and generate one fresh image **without** `referenceImage`, or explicitly deliver the latest clean edit.
- Three queued recommendations (`recommendations_v1`): apply KR's five page edits (→ Koba), re-encode `frog-face.png` as a true PNG, live Chrome preview of the timer face in the ring.

## Files & Structure
- **Landing Page (single file):** `index.html` (62KB) — all markup, inline CSS, and JS. Flow: nav → hero (title, tagline, frog mascot, three sage phase pills) → RITUAL section (cycle card) → **constellation #1 (line 588)** → "The Why" section → **constellation #2 (~line 649)** → SHARE section → timer UI → footer ("Made with ❤️ in the pond"). Shared constellation CSS after the `.cycle-arrow` rules (~line 286).
- **Images** (`images/`, 7 files): `frog-focus.png` (master mascot reference), `frog-face.png` (in-timer face — needs true-PNG re-encode; currently JPEG bytes under a .png name), `frog-longbreak.png` (pending — same mascot, arms raised quiet victory, gold/sage sparkles, off-white background; exact prompt queued in the media checkpoint), plus 4 others across hero/timer/dark-mode states.
- **Uploads** (`uploads/`, 6 files): KR's pasted screenshots driving current visual edits.
- **Working log:** none in this project (confirmed by search) — location TBD in another project, or to be created.

## Key Decisions Made
- **Constellation = recurring brand divider.** KR approved the concept, requested a wider 720px spread, then an identical copy after "The Why" — two placements now bookend the section. CEO's offer to extend to other seams is pending KR's answer.
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
- Whether to add more constellation placements on other page seams (CEO's open offer).
- How to unblock `frog-longbreak.png` — fresh image without `referenceImage` (shorter baked-in copy) vs. accept the latest clean edit.
- Sequence/ownership of the five queued page edits when handed to Koba.

## Tasks
- [x] Add **constellation #1** at line 588 — nine sage/gold/clay dots, staggered pulse, `aria-hidden`; CSS after `.cycle-arrow` rules
- [x] **Widen constellation spread** to 720px fluid band (KR: "let's spread them wider")
- [x] **Add constellation #2 after the WHY section** (line ~649) — identical markup, confirmed by KR ("looks great")
- [ ] **Locate or create the working log** — search KR's other projects; log the requested fix (confirm fix content with KR)
- [ ] **Answer the open seam offer** — confirm with KR whether more constellations are wanted (e.g., before timer CTA / footer)
- [ ] Apply KR's five page edits: dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy (queue to Koba)
- [ ] Convert `frog-face.png` to a real PNG (currently JPEG bytes under .png name)
- [ ] Preview timer face in live Chrome to confirm placement in the ring
- [ ] Generate `images/frog-longbreak.png` per queued prompt — fresh image **without** `referenceImage`, shorter baked-in copy
- [ ] Verify cache-safe asset strategy; full QA pass (light/dark, mobile/desktop)
- [ ] Deploy `index.html` + `images/` to a shareable public URL

## Opportunities
1. **Establish a canonical in-project working log.** KR asked for one and none exists here — creating `WORKING-LOG.md` at the project root (dated entries: fix, owner, status) would give the current sidebar request a home and give every future session durable context. CEO already offered to start it; the search across other projects should resolve quickly, then commit to a single location.
2. **Complete the constellation cadence with a third seam.** CEO's offer is still open — a placement before the timer CTA or above the footer would bookend the page and echo the sparkle motif of the pending long-break image. Small CSS-only change, big cohesion win.
3. **Ship early, QA in batches.** Layout and copy are nearly locked — deploy to a shareable URL now so KR can circulate it, then land the five Koba edits, `frog-face.png` fix, and long-break image as a fast-follow in one verified batch (light/dark + mobile/desktop).

## Next Steps
1. Finish locating the working log across other projects — or start one in this project — and log KR's requested fix (confirm the fix details with KR).
2. Confirm with KR whether to add the offered constellation placements on other seams.
3. Brief Koba on the five queued page edits; re-encode `frog-face.png`; run the live Chrome timer-face check.
4. Generate `frog-longbreak.png` as a fresh image without `referenceImage` (shorter baked-in copy) once the edit budget resets — or explicitly accept the latest clean edit.
5. Full-page QA (light/dark, mobile/desktop), hard-refresh verify, then deploy `index.html` + `images/` to a shareable public URL.

---
*Last updated: 2026-08-14T03:20:00Z*