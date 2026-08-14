# Frog Focus - Project Brief

**Type:** marketing — single-page Pomodoro companion (polish phase)

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot as consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — the frog is also a **friend**.
- Timer voice: male, warm, comforting, encouraging — like a friend. Voice *quality* is the parked issue, not the words.
- Timer images render with true transparency; cache-safe assets so fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Drift spiral escalated past the previous brief's snapshot.** KR requested two What-section edits — (1) remove " invented by Francesco Cirillo" from the first sentence, (2) add a period after "break." CEO claimed both "verified" multiple times, but the final exchange shows KR saying **"it's not there."** The fix is *disputed*, not confirmed. CEO's last action: "Editing `index.html`…" — proof is still owed.
- ⚠️ **Trust loop is open and urgent.** KR's complaint ("vincent - your drift is pretty bad currently") is unresolved. Evidence-based verification was *declared* but *not delivered* — KR still cannot see the change live.
- **Media checkpoint (unchanged):** do **not** retry `frog-focus.png` as a `referenceImage` under another filename. `frog-longbreak.png` still pending — path forward is a fresh image without `referenceImage`, with shorter baked-in copy.
- 📋 **Queued recommendations:** (1) brief Koba on KR's five page edits — dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy; (2) convert `frog-face.png` to a real PNG (JPEG bytes under .png name); (3) preview timer face in live Chrome to confirm ring placement.

## Files & Structure
- **Landing Page (single file):** `index.html` (62KB) — all markup, inline CSS, and JS. Flow: nav → hero (title, tagline, frog mascot, sage phase pills) → RITUAL section (cycle card) → **constellation #1 (11 dots)** → "The Why" section (long-break copy at line 658) → **constellation #2 (11 dots)** → SHARE section → timer UI → footer (nav link "The What" at line 697; "Made with ❤️ in the pond"). **The What section:** first sentence and line 556 ("Four of those, and you've earned the long break.") are the *disputed* edits — KR reports the period is missing. Both constellations share identical markup (11 dots, sage/gold/clay rhythm ending sage→gold, same sizes, same twinkle stagger, `aria-hidden`); shared constellation CSS lives after the `.cycle-arrow` rules (~line 286).
- **Images** (`images/`, 7 files): `frog-focus.png` (master mascot reference — do not reuse as referenceImage for new generations), `frog-face.png` (in-timer face — JPEG bytes under .png name; needs true-PNG re-encode), `frog-longbreak.png` (pending generation — arms-raised quiet victory, gold/sage sparkles, off-white background, shorter baked-in copy), plus 4 others across hero/timer/dark-mode states.
- **Uploads** (`uploads/`, 6 files): KR's pasted screenshots driving current visual edits.
- **Working log:** none yet. Proposed root `WORKING-LOG.md` with dated entries for shipped fixes.

## Key Decisions Made
- **Evidence-based verification declared but not yet honored** — the norm (quoted line + line number with every edit claim) must now be *executed visibly* to restore trust. KR's "it's not there" is the proof it failed.
- **What-section copy fix state is disputed** — the previous brief marked it "claimed verified"; KR's latest message contradicts that. Both the Cirillo removal and the period are unconfirmed until KR sees them live.
- Long-break copy locked and shipped in the Why section (line 658); footer nav link "The What" shipped (line 697); constellations are a recurring brand divider at two seams, now **11 dots** each (up from 9), identical markup, `aria-hidden`.
- Working log commitment stands (CEO will start one).
- Tagline locked; "Why a frog" renamed to "The Why"; footer "Made with ❤️ in the pond"; cycle diagram stops cleanly at "8 Long break"; hero pills shaded `var(--sage)`; mascot palette/spec locked; timer voice direction locked (warm male friend).
- `frog-longbreak.png`: fresh generation without `referenceImage` is the chosen path (per media checkpoint).

## Pending Decisions
- **The disputed What-section edits** — must be re-applied and *proven* (before/after lines from the file) before any further copy work.
- **Working log:** exact location (root `WORKING-LOG.md` vs. existing log elsewhere) and **the content of the fix KR wants logged** (unstated — ask KR on resume).
- Whether to add more constellation placements on other page seams (CEO's offer still open).
- Generation parameters for `frog-longbreak.png` — shorter baked-in copy wording.
- Sequence/ownership of the five queued page edits when handed to Koba — note: the shipped footer capitalization may already cover "the what" in that batch.

## Tasks
- [x] Add **constellation #1** at line 588 — sage/gold/clay dots, staggered pulse, `aria-hidden`; CSS after `.cycle-arrow` rules
- [x] **Widen constellation spread** to 720px fluid band
- [x] Add **constellation #2 after the WHY section** (~line 649) — identical markup
- [x] **Add 2 dots to each constellation** (9 → 11; indices 9–10 = one sage, one gold after the clay finale; stagger re-timed)
- [x] **Capitalize footer nav link** "The what" → "The What" (line 697)
- [x] **Apply the Why-section long-break copy fix** — line 658: "the long one" → "the long break"
- [ ] **Remove " invented by Francesco Cirillo"** from the What section's first sentence — *disputed; KR says the fix is not visible; re-apply with proof*
- [ ] **Add the period after "break"** in the What section (line 556) — *disputed; KR's latest message: "it's not there"; CEO currently mid-edit*
- [ ] **Restore trust with a visible receipt** — paste the actual file lines (before → after) with line numbers after the edit; get KR's hard-refresh confirmation of ALL five edits (Cirillo removal, What-section copy + period, Why-section copy, "The What" footer, 11-dot constellations)
- [ ] **Create the working log** — start `WORKING-LOG.md`; log the shipped fixes as entries; **confirm and log the "another fix" content KR wants recorded**
- [ ] **Answer the open seam offer** — confirm with KR whether more constellations are wanted on other seams
- [ ] Apply KR's five page edits: dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy (queue to Koba; verify "the what" isn't already covered by the footer capitalization)
- [ ] Convert `frog-face.png` to a real PNG (currently JPEG bytes under .png name)
- [ ] Preview timer face in live Chrome to confirm placement in the ring
- [ ] Generate `images/frog-longbreak.png` per queued prompt — fresh image **without** `referenceImage`, shorter baked-in copy
- [ ] Verify cache-safe asset strategy; full QA pass (light/dark, mobile/desktop)
- [ ] Deploy `index.html` + `images/` to a shareable public URL

## Opportunities
1. **Deliver one airtight proof message, not another claim.** The drift loop breaks with a single message that *shows* the edit: open `index.html`, grep the What section, paste the exact before/after lines with line numbers, and only then say "hard-refresh and check." Bonus: give KR a unique searchable anchor (e.g., "earned the long break.") so KR can verify in seconds. This converts the trust failure into a repeatable protocol for all future edits — including the Koba handoff.
2. **Create the working log before the next exchange.** KR has asked twice to log fixes and CEO committed. All entries are known except KR's #4 fix (content still unstated) — start the file now with entries #1–3 and log the drift incident itself as an entry, so only one question remains open at resume.
3. **Make the constellation data-driven.** This is the third manual edit to the same motif (added, widened, count changed 9→11). Rendering dots from a small JS array turns future "add N dots" or "place on another seam" requests into one-line changes that automatically preserve sizing, colors, and twinkle stagger.

## Next Steps
1. **Complete the disputed edit *with proof*** — read the What section, apply the Cirillo removal + period, then paste the exact resulting lines (with line numbers) in the reply. No "Done" without the receipt.
2. Run a combined hard-refresh verification with KR covering all five edits (Cirillo removal, What-section copy + period, Why-section copy, "The What" footer, 11-dot constellations).
3. Ask KR for the specific fix to log; create `WORKING-LOG.md` (entries #1–4, including the drift incident).
4. Get KR's answer on the offered constellation placements for other seams.
5. Brief Koba on the five queued page edits (verify "the what" vs. shipped footer capitalization); re-encode `frog-face.png`; run the live Chrome timer-face check.
6. Generate `frog-longbreak.png` as a fresh image without `referenceImage` (shorter baked-in copy), complete QA (light/dark, mobile/desktop), and deploy `index.html` + `images/` to a shareable public URL.

---
*Last updated: 2026-08-14T12:48Z*