# Frog Focus - Project Brief

**Type:** web_app — single-page Pomodoro companion (polish phase)

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot as consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — the frog is also a **friend**.
- Timer voice: male, warm, comforting, encouraging — like a friend. **Words locked verbatim; only delivery changes.**
- Distinct frog visuals per timer phase — each phase auto-swaps to its matching frog (no picker UI yet).
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Voice quality is THE active task.** KR reiterated: "still sounds very robotic and has a british accent… just want something more human. love the current words though, so let's keep the words as is please." KR asked **"what are my voice options"** and then twice requested an update ("update please?", "need an update on the voice") — the options proposal is owed now. CEO is mid-investigation, locating how the voice is configured.
- **Long-break frog WIRED and verified.** FROG map `long` entry now points to `frog-longbreak.png` (arms raised, closed happy eyes, sparkles) instead of `frog-timer.png`; CEO verified the full map reads correctly. KR is running through the timer cycles now and will verify live when they reach it.
- **Copy edits shipped with line-numbered receipts:** line 556 reads "Pomodoro is a simple rhythm: focus hard for a short stretch, then rest on purpose." (Cirillo removed, period added); line 575 reads "take the long break" in the Recharge section.
- **Media checkpoint superseded:** the queued `frog-longbreak.png` generation is void — the file exists and is in active use. Note the generator constraint logged there: do not reuse `frog-focus.png` as a reference under another filename; if baked-in text is ever wrong, rewrite shorter and generate fresh without a reference image.
- 📋 **Queued recommendations (unchanged):** (1) brief Koba on KR's five page edits; (2) convert `frog-face.png` to a real PNG (JPEG bytes under .png name); (3) preview timer face in live Chrome to confirm ring placement.

## Files & Structure
- **Landing Page (single file):** `index.html` (62KB) — all markup, inline CSS, and JS. Key lines: **556** (What-section copy, Cirillo edit shipped), **575** (Recharge section, "take the long break"), **658** (Why-section long-break copy), **697** (footer nav "The What"), plus the **FROG map** (updated — `long` → `frog-longbreak.png`) and the **timer logic** that auto-selects the frog per phase. **Voice configuration is somewhere in this file — CEO is locating it now.** Constellations: two identical 11-dot sage/gold/clay dividers, `aria-hidden`.
- **Images** (`images/`, 7 files): `frog-focus.png` (master mascot reference — do not reuse as referenceImage), `frog-longbreak.png` (**in active use — the long-break frog**), `frog-face.png` (in-timer face — JPEG bytes under .png name; needs true-PNG re-encode), plus 4 others across hero/timer/dark-mode states.
- **Uploads** (`uploads/`, 6 files): KR's pasted screenshots driving visual edits.

## Key Decisions Made
- **`frog-longbreak.png` is THE long-break frog and is now wired into the timer** — no new generation needed; phases auto-swap their frog (no picker UI).
- **Voice direction locked: keep current words verbatim** — only delivery changes. No British accent, less robotic, more human; warm male friend character retained.
- **What-section edits (Cirillo removal + period) and Recharge copy shipped** with line-numbered receipts (lines 556, 575).
- **Image-generation guardrail:** never reuse `frog-focus.png` as a referenceImage under a new filename; if dense baked-in text is wrong, shorten the text and generate fresh without a reference.
- Evidence-based verification protocol (quoted line + line number with every edit claim) is in practice.
- Tagline locked; "Why a frog" renamed to "The Why"; footer "Made with ❤️ in the pond"; cycle diagram stops cleanly at "8 Long break"; hero pills shaded `var(--sage)`; mascot palette/spec locked.

## Pending Decisions
- **Voice implementation:** which engine/voice to switch to, and how configurable it should be — **KR is actively waiting for options; propose a concrete menu.**
- **Frog picker scope:** KR's "new frog option" phrasing hinted at user-facing choice, but wiring-only was shipped. Confirm whether a picker/option UI is also wanted.
- **Working log:** exact location (root `WORKING-LOG.md` vs. elsewhere) and content of the unstated fix KR wants logged — ask on resume.
- Whether to add more constellation placements on other page seams (CEO's offer still open).
- Sequence/ownership of the five queued page edits when handed to Koba (note: footer capitalization may already cover "the what" in that batch).

## Tasks
- [x] Remove " invented by Francesco Cirillo" from the What section (line 556) — shipped with receipt
- [x] Add the period after "break" in the What section (line 556) — shipped with receipt
- [x] Replace "the long one" → "the long break" in the Recharge section (line 575)
- [x] Apply the Why-section long-break copy fix (line 658)
- [x] Capitalize footer nav link "The what" → "The What" (line 697)
- [x] Add both 11-dot constellations, widened to 720px, `aria-hidden`
- [x] Generate and approve `frog-longbreak.png` — arms-raised quiet victory, sparkles
- [x] **Wire `frog-longbreak.png` into the FROG map** — `long` entry updated; `index.html` rebuilt and verified
- [ ] **Fix the timer voice (ACTIVE):** finish locating the config, present concrete voice options to KR, swap to a more natural human male voice with zero word changes
- [ ] Combined hard-refresh verification with KR covering all shipped edits + the new long-break frog + the voice change
- [ ] Confirm with KR whether a user-facing frog picker/option UI is wanted
- [ ] Create `WORKING-LOG.md` — log shipped fixes + the drift incident; confirm KR's unstated #4 fix content
- [ ] Answer the open constellation seam offer
- [ ] Brief Koba on KR's five queued page edits (verify "the what" vs. shipped footer capitalization)
- [ ] Convert `frog-face.png` to a real PNG (currently JPEG bytes under .png name)
- [ ] Preview timer face in live Chrome to confirm placement in the ring
- [ ] Full QA pass (light/dark, mobile/desktop); verify cache-safe asset strategy
- [ ] Deploy `index.html` + `images/` to a shareable public URL

## Opportunities
1. **Factor the voice configuration into a small data object** — same lesson as the FROG map. One structure controlling engine/voice/pitch/rate makes future voice tuning a one-line change and keeps the locked words untouched. It also sets up an optional "voice preview" setting later.
2. **Make the FROG map a single source of truth.** This was the second manual edit to phase→image selection. Refactor the map into a small data structure (one entry per phase/state → image) so future frog swaps are one-line changes — and it becomes the natural foundation for the picker UI if KR wants one.
3. **Adopt a proactive status heartbeat.** KR asked for a voice update twice ("update please?", "need an update"). Ship a one-line status note after every completed step so KR never has to ask — and pair each shipped edit with its line-numbered receipt, closing the loop on the drift incident.

## Next Steps
1. **Locate the voice configuration in `index.html` now;** report the current engine/accent setup and present KR's voice options (concrete swap candidates that keep the words verbatim).
2. Await KR's timer-cycle verification of the long-break frog, then run the combined hard-refresh pass over all shipped edits + the new voice.
3. Confirm frog-picker scope with KR (re-point only vs. picker UI).
4. Create `WORKING-LOG.md`; ask KR for the fix content to log.
5. Brief Koba on the five queued page edits; re-encode `frog-face.png`; run the live Chrome timer-face check.
6. Full QA (light/dark, mobile/desktop) and deploy `index.html` + `images/` to a shareable public URL.

---
*Last updated: 2026-08-14T13:05Z*