# Frog Focus - Project Brief

**Type:** web_app — single-page Pomodoro companion (polish phase)

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — the frog is also a **friend**.
- Timer voice: male, warm, comforting, encouraging — like a friend. Voice *quality* is the parked issue, not the words.
- Timer images render with true transparency; cache-safe assets so fixes reach users without hard-refresh instructions.
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Polish phase, paused overnight.** Session wrapped 2026-08-14; KR reported bad lag and the team picks up tomorrow. CEO confirmed every edit is saved to `index.html`.
- ✅ **Three edits shipped and confirmed in-session:**
  1. **Long-break copy** (line 658): "the long one" → **"and you've earned the long break."**
  2. **Footer nav link** (line 697): "The what" → **"The What".**
  3. **Constellations 9 → 11 dots** (both sections): one sage + one gold dot added after the clay finale (indices 9–10), stagger re-timed so the twinkle flows; both placements now match.
- ⚠️ **Verification gap on resume:** KR hard-refreshed and didn't see the long-break edit (attributed to lag); CEO verified the file has it. First action tomorrow: confirm all three shipped edits on KR's hard refresh.
- 🔄 **Working log:** still no file exists. CEO committed to starting one; the specific "another fix" KR wants logged is still unstated.
- **Open question:** CEO's seam offer (more constellation placements elsewhere on the page) is unanswered.
- **Blocked:** `images/frog-longbreak.png` — media checkpoint unchanged (`attempts: 0`). Do **not** retry `frog-focus.png` as a `referenceImage` under another filename. Fix: rewrite dense baked-in text into shorter copy and make one fresh image **without** `referenceImage`, or explicitly deliver the latest clean edit.
- **Queued recommendations** (metadata `recommendations_v1`): (1) brief Koba on KR's five page edits — dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy; (2) convert `frog-face.png` to a real PNG (JPEG bytes under .png name); (3) preview timer face in live Chrome to confirm it sits right in the ring.

## Files & Structure
- **Landing Page (single file):** `index.html` (62KB) — all markup, inline CSS, and JS. Flow: nav → hero (title, tagline, frog mascot, sage phase pills) → RITUAL section (cycle card) → **constellation #1 (line 588, 11 dots)** → "The Why" section (long-break copy at **line 658**, shipped) → **constellation #2 (~line 649, 11 dots)** → SHARE section → timer UI → footer (nav link **"The What"** at line 697; "Made with ❤️ in the pond"). Both constellations share identical markup (11 dots, sage/gold/clay rhythm ending sage→gold, same sizes, same twinkle stagger, `aria-hidden`); shared constellation CSS lives after the `.cycle-arrow` rules (~line 286).
- **Images** (`images/`, 7 files): `frog-focus.png` (master mascot reference), `frog-face.png` (in-timer face — JPEG bytes under .png name; needs true-PNG re-encode), `frog-longbreak.png` (pending — fresh image without `referenceImage`, arms-raised quiet victory, gold/sage sparkles, off-white background, shorter baked-in copy), plus 4 others across hero/timer/dark-mode states.
- **Uploads** (`uploads/`, 6 files): KR's pasted screenshots driving current visual edits.
- **Working log:** none yet. Proposed: root `WORKING-LOG.md` with dated entries for the three shipped fixes + KR's requested fix (content TBD).

## Key Decisions Made
- **Long-break copy locked and shipped** — line 658: "and you've earned the long break."
- **Constellation = recurring brand divider**, now **11 dots** per placement (up from 9) at two seams bookending "The Why"; identical markup, same brand rhythm, fluid 720px band, staggered twinkle, `aria-hidden`.
- **Footer nav link shipped:** "The what" → "The What" (line 697).
- **Working log commitment:** CEO will start one; entries to include constellation (9→11), footer capitalization, long-break copy, plus KR's unstated "another fix."
- **Session paused overnight** — lag on KR's side; pickup tomorrow opens with a hard-refresh verification pass.
- **Communication norm:** concise status confirmations when working; no apologies for lag.
- Tagline locked; "Why a frog" renamed to "The Why"; footer "Made with ❤️ in the pond"; cycle diagram stops cleanly at "8 Long break"; hero pills shaded `var(--sage)`; mascot palette/spec locked; timer voice direction locked (warm male friend).

## Pending Decisions
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
- [x] **Apply the long-break copy fix** — line 658: "the long one" → "the long break"
- [ ] **Verify all three shipped edits on hard refresh** (KR's last refresh missed one due to lag; CEO confirmed saved)
- [ ] **Create the working log** — start `WORKING-LOG.md`; log the three shipped fixes as entries; **confirm and log the "another fix" content KR wants recorded**
- [ ] **Answer the open seam offer** — confirm with KR whether more constellations are wanted on other seams
- [ ] Apply KR's five page edits: dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy (queue to Koba; verify "the what" isn't already covered by the footer capitalization)
- [ ] Convert `frog-face.png` to a real PNG (currently JPEG bytes under .png name)
- [ ] Preview timer face in live Chrome to confirm placement in the ring
- [ ] Generate `images/frog-longbreak.png` per queued prompt — fresh image **without** `referenceImage`, shorter baked-in copy
- [ ] Verify cache-safe asset strategy; full QA pass (light/dark, mobile/desktop)
- [ ] Deploy `index.html` + `images/` to a shareable public URL

## Opportunities
1. **Create the working log before the next session.** KR has asked twice to log fixes, and CEO committed. Start `WORKING-LOG.md` with dated entries #1–3 (constellation 9→11, "The What" capitalization, long-break copy), then ask KR for the "another fix" content and log it as #4. Resolves the sidebar thread and gives the paused session durable context.
2. **Make the constellation data-driven.** This is the third manual edit to the same motif (added, widened, count changed 9→11). Render dots from a small JS array so future "add N dots" or "place on another seam" requests become one-line changes that automatically preserve sizing, colors, and twinkle stagger.
3. **Open tomorrow with verify-then-deploy.** Confirm the three shipped edits on KR's hard refresh (clears the lag doubt), then push `index.html` + `images/` to a shareable URL so the page is reviewable while Koba's five edits and the two image fixes (frog-face re-encode, frog-longbreak fresh generation) land as one verified batch.

## Next Steps
1. Resume with a hard-refresh verification of the three shipped edits (long-break copy, "The What" footer link, 11-dot constellations); fix any regressions.
2. Ask KR for the specific fix to log; create `WORKING-LOG.md` (entries #1–3 + KR's fix as #4).
3. Get KR's answer on the offered constellation placements for other seams.
4. Brief Koba on the five queued page edits (verify "the what" vs. shipped footer capitalization); re-encode `frog-face.png`; run the live Chrome timer-face check.
5. Generate `frog-longbreak.png` as a fresh image without `referenceImage` (shorter baked-in copy), complete QA (light/dark, mobile/desktop), and deploy `index.html` + `images/` to a shareable public URL.

---
*Last updated: 2026-08-14T02:36:00.237Z*