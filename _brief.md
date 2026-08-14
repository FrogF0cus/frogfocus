# Frog Focus - Project Brief

**Type:** api — single-page Pomodoro companion (polish phase)

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — the frog is also a **friend**.
- Timer voice: male, warm, comforting, encouraging — like a friend. Voice *quality* is the parked issue, not the words.
- Timer images render with true transparency; cache-safe assets so fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Session resumed** (morning of 2026-08-14). KR's first request: remove " invented by Francesco Cirillo" from the What section's first sentence — CEO reports done.
- **The What-section copy fix went through a drift spiral.** KR asked for the period after "break"; CEO claimed completion 2–3 times without verification; KR couldn't see it and flagged: *"your drift is pretty bad currently. help me get you back on track."* CEO switched to an evidence-based file read.
- **Final claim (in-file verified):** `index.html:556` reads **"Four of those, and you've earned the long break."** — period in place, Cirillo attribution removed from the first sentence. **KR-side hard-refresh confirmation is still outstanding**; the trust issue is not fully resolved until KR sees it.
- ⚠️ **Media checkpoint (unchanged):** do **not** retry `frog-focus.png` as a `referenceImage` under another filename. `frog-longbreak.png` still pending (`attempts: 0`) — path forward is a fresh image without `referenceImage`, with shorter baked-in copy.
- 📋 **Queued recommendations (unchanged):** (1) brief Koba on KR's five page edits — dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy; (2) convert `frog-face.png` to a real PNG (JPEG bytes under .png name); (3) preview timer face in live Chrome to confirm ring placement.

## Files & Structure
- **Landing Page (single file):** `index.html` (62KB) — all markup, inline CSS, and JS. Flow: nav → hero (title, tagline, frog mascot, sage phase pills) → RITUAL section (cycle card) → **constellation #1 (11 dots)** → "The Why" section (long-break copy at line 658) → **constellation #2 (11 dots)** → SHARE section → timer UI → footer (nav link "The What" at line 697; "Made with ❤️ in the pond"). **The What section** — first sentence no longer credits Francesco Cirillo; the break line at **line 556** reads "Four of those, and you've earned the long break." (claimed verified). Both constellations share identical markup (11 dots, sage/gold/clay rhythm ending sage→gold, same sizes, same twinkle stagger, `aria-hidden`); shared constellation CSS lives after the `.cycle-arrow` rules (~line 286).
- **Images** (`images/`, 7 files): `frog-focus.png` (master mascot reference), `frog-face.png` (in-timer face — JPEG bytes under .png name; needs true-PNG re-encode), `frog-longbreak.png` (pending — fresh image without `referenceImage`, arms-raised quiet victory, gold/sage sparkles, off-white background, shorter baked-in copy), plus 4 others across hero/timer/dark-mode states.
- **Uploads** (`uploads/`, 6 files): KR's pasted screenshots driving current visual edits.
- **Working log:** none yet. Proposed: root `WORKING-LOG.md` with dated entries for shipped fixes + KR's requested fix (content TBD).

## Key Decisions Made
- **What-section copy locked and claimed verified in-file:** "Four of those, and you've earned the long break." (with period, line 556); first sentence no longer includes " invented by Francesco Cirillo".
- **Drift correction in practice:** CEO performed an evidence-based verification read instead of claiming — this is now the expected norm for every edit.
- Long-break copy locked and shipped in the Why section (line 658); footer nav link "The What" shipped (line 697); constellations are a recurring brand divider at two seams, now **11 dots** each (up from 9), identical markup, `aria-hidden`.
- Working log commitment stands (CEO will start one).
- Tagline locked; "Why a frog" renamed to "The Why"; footer "Made with ❤️ in the pond"; cycle diagram stops cleanly at "8 Long break"; hero pills shaded `var(--sage)`; mascot palette/spec locked; timer voice direction locked (warm male friend).

## Pending Decisions
- **KR-side confirmation** of the line 556 fix via hard refresh — the drift complaint closes only when KR sees it live.
- **Working log:** exact location (root `WORKING-LOG.md` vs. existing log elsewhere) and **the content of the fix KR wants logged** (unstated — ask KR on resume).
- Whether to add more constellation placements on other page seams (CEO's offer still open).
- How to unblock `frog-longbreak.png` — fresh image without `referenceImage` with shorter baked-in copy vs. accept the latest clean edit.
- Sequence/ownership of the five queued page edits when handed to Koba — note: the shipped footer capitalization may already cover "the what" in that batch.

## Tasks
- [x] Add **constellation #1** at line 588 — sage/gold/clay dots, staggered pulse, `aria-hidden`; CSS after `.cycle-arrow` rules
- [x] **Widen constellation spread** to 720px fluid band
- [x] Add **constellation #2 after the WHY section** (~line 649) — identical markup
- [x] **Add 2 dots to each constellation** (9 → 11; indices 9–10 = one sage, one gold after the clay finale; stagger re-timed)
- [x] **Capitalize footer nav link** "The what" → "The What" (line 697)
- [x] **Apply the Why-section long-break copy fix** — line 658: "the long one" → "the long break"
- [x] **Remove " invented by Francesco Cirillo"** from the What section's first sentence (claimed verified)
- [x] **Apply the What-section copy fix + period** — line 556 now reads "Four of those, and you've earned the long break." (claimed verified in-file; **KR hard-refresh pending**)
- [ ] **Get KR-side hard-refresh confirmation** of line 556 (and the four prior edits: Why-section copy, "The What" footer, 11-dot constellations) — this closes the drift complaint
- [ ] **Create the working log** — start `WORKING-LOG.md`; log the shipped fixes as entries; **confirm and log the "another fix" content KR wants recorded**
- [ ] **Answer the open seam offer** — confirm with KR whether more constellations are wanted on other seams
- [ ] Apply KR's five page edits: dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy (queue to Koba; verify "the what" isn't already covered by the footer capitalization)
- [ ] Convert `frog-face.png` to a real PNG (currently JPEG bytes under .png name)
- [ ] Preview timer face in live Chrome to confirm placement in the ring
- [ ] Generate `images/frog-longbreak.png` per queued prompt — fresh image **without** `referenceImage`, shorter baked-in copy
- [ ] Verify cache-safe asset strategy; full QA pass (light/dark, mobile/desktop)
- [ ] Deploy `index.html` + `images/` to a shareable public URL

## Opportunities
1. **Close the drift loop with a visible receipt.** KR has now flagged drift explicitly. The highest-leverage move: paste the exact quoted lines (line 556 and the Cirillo-free first sentence) directly from the file in the next message, then have KR confirm on hard refresh. Establish the norm: *every* shipped edit comes with a quoted line + line number from the file — this converts trust from "trust me" to "here it is" for all future work, including the Koba handoff.
2. **Create the working log before the next exchange.** KR has asked twice to log fixes and CEO committed. All entries are known except KR's #4 fix (content still unstated) — start the file now with entries #1–3 so only one question remains open at resume.
3. **Make the constellation data-driven.** This is the third manual edit to the same motif (added, widened, count changed 9→11). Rendering dots from a small JS array turns future "add N dots" or "place on another seam" requests into one-line changes that automatically preserve sizing, colors, and twinkle stagger.

## Next Steps
1. **Paste the quoted line 556** ("Four of those, and you've earned the long break.") plus the Cirillo-free first sentence directly from `index.html` — no claims, just the file content — and ask KR to hard-refresh.
2. Run combined hard-refresh verification with KR covering all five edits (Cirillo removal, What-section copy + period, Why-section copy, "The What" footer, 11-dot constellations).
3. Ask KR for the specific fix to log; create `WORKING-LOG.md` (entries #1–4).
4. Get KR's answer on the offered constellation placements for other seams.
5. Brief Koba on the five queued page edits (verify "the what" vs. shipped footer capitalization); re-encode `frog-face.png`; run the live Chrome timer-face check.
6. Generate `frog-longbreak.png` as a fresh image without `referenceImage` (shorter baked-in copy), complete QA (light/dark, mobile/desktop), and deploy `index.html` + `images/` to a shareable public URL.

---
*Last updated: 2026-08-14T12:35:00.000Z*