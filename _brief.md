# Frog Focus - Project Brief

**Type:** web_app — single-page Pomodoro companion (polish phase)

## Vision & Goals
- Polished, original single-page Pomodoro companion inspired by pomodorokitty.com — not a clone.
- Frog mascot as consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework.
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — the frog is also a **friend**.
- Timer voice: warm, comforting, encouraging — like a friend. **Words locked verbatim; only delivery changes.**
- Distinct frog visuals per timer phase — auto-swapped per phase (no frog picker UI).
- Clean, deployable single page on a shareable public URL.

## Current Status
- **Voice picker shipped, located, and acknowledged.** Built into Timer settings (bottom Voice section): dropdown of every installed English `speechSynthesis` voice as `name (locale, gender-guess)`, a **Test voice** button, `localStorage` persistence. KR was walked to the exact spot after repeated "any update?" pushback and replied "yes please. and thanks koba."
- **Voice order reordered (done):** warm American male first — Microsoft David / Mark / Guy → Google US English — replacing Daniel (British). Delivery path only; words untouched. KR was told to hard-refresh and run a timer cycle; **his live verdict is pending.**
- **Robotic cadence root-caused:** built-in browser voices have a quality ceiling. KR asked for cost details (ElevenLabs free tier ≈10 min/month, paid from ~$5/month; OpenAI ≈ $15/million chars), said "sure" to grabbing an ElevenLabs key, then green-lit the free in-app picker path instead ("ok let's do 1"). **No API key pasted yet.**
- **Process lesson reinforced:** KR explicitly called out stalling ("that's what you said last time — almost 10 mins ago"). Verify against the actual file before reporting.
- **Long-break frog wired and verified** (`FROG` map `long` → `frog-longbreak.png`). Media checkpoint still lists generation as pending; guidance says do **not** retry that reference under another filename — if baked-in text is wrong, rewrite shorter and generate fresh without `referenceImage`, or deliver the latest clean edit and explain what remains.
- **Five page edits shipped** with line-numbered receipts (dark mode to frog green, "productive tool," "the what," beverage line, recharge copy).

## Files & Structure
- **Landing Page (single file):** `index.html` (67KB) — all markup, inline CSS, JS. Key areas: **556** (What copy), **575** (Recharge), **658** (Why long-break), **697** (footer "The What"), **872–879** (auto voice-pick order — American male first), **Timer settings** (voice-picker dropdown + Test button, `localStorage`-persisted).
- **images/** (7 files): `frog-focus.png` (base reference mascot), `frog-longbreak.png` (long-break/quiet-victory frog, wired into FROG map; generation flagged pending in media checkpoint), `frog-face.png` (timer face — JPEG bytes under `.png` name, needs re-encode).
- **uploads/** (6 files) — working assets, not part of the shipped page.

## Key Decisions Made
- **Words locked verbatim** — only delivery may change.
- **Voice path resolved for now:** user-selectable voice menu with Test button; American-male-first auto-pick as default fallback. KR green-lit this explicitly ("ok let's do 1").
- **External TTS remains an open thread, not committed:** KR said "sure" to getting an ElevenLabs key but hasn't pasted one; CEO offered to wire it in with natural pauses. Needs his key or a concrete opt-in proposal to proceed.
- **Long-break frog:** reuse existing `frog-longbreak.png`; do not regenerate under a new filename per media checkpoint guidance.
- **No frog picker UI** — phases auto-swap frogs.
- **Process lesson reinforced:** read the real file before responding.

## Pending Decisions
- **KR's live acceptance of voice quality** — picker located and acknowledged; verdict pending after he hard-refreshes and tests during a timer cycle. Tune list/ordering to feedback.
- **External/human-grade TTS (ElevenLabs-class)** — KR said "sure" to the key; whether he pastes it determines if CEO wires neural voice + natural pauses behind the picker. Cost data already on the table.
- **`frog-longbreak.png` media checkpoint** — resolve: deliver the latest clean edit or explain what remains; if baked-in text is wrong, rewrite shorter and generate fresh without a referenceImage.

## Tasks
- [x] Reorder auto-pick voice order — American male first (David/Mark/Guy → Google US English)
- [x] Build voice picker: dropdown of all English voices, Test voice button, `localStorage` persistence
- [x] Wire `frog-longbreak.png` into FROG map `long` entry
- [x] Ship five page edits with line-numbered receipts
- [ ] KR live verification: reordered voice + long-break frog during timer cycles *(in progress — location confirmed & acknowledged; awaiting hard-refresh verdict)*
- [ ] Receive KR's ElevenLabs API key (thread open — "sure," no key pasted); wire in neural voice + natural pauses if it arrives
- [ ] Resolve `frog-longbreak.png` media checkpoint per guidance (no retry under new filename)
- [ ] Brief Koba on KR's five page edits (queued recommendation)
- [ ] Re-encode `frog-face.png` to a true PNG before publish (queued recommendation)
- [ ] Preview timer face in live Chrome to confirm ring placement (queued recommendation)

## Opportunities
1. **External TTS opt-in upgrade** — the live thread most likely to close the "more human" loop. KR already said "sure" to an ElevenLabs key and asked for cost detail twice. Concrete proposal: free-tier default first, paid tiers later; wire behind the existing picker as an opt-in toggle with natural pauses.
2. **Deploy to a shareable public URL** — one-time static host push (Netlify/GitHub Pages) closes the loop on the "companion" positioning and gives KR a link to share.
3. **Frog picker UI** — let users assign which frog represents each phase; builds directly on the existing auto-swap FROG map and mirrors the just-shipped voice picker pattern.

## Next Steps
1. Collect KR's voice verdict after hard-refresh; adjust list/order if needed.
2. Follow up on the ElevenLabs API key thread — if KR pastes it, wire in neural voice + natural pauses behind the picker.
3. Re-encode `frog-face.png` to a true PNG; preview the timer face in live Chrome to confirm ring placement.
4. Resolve the `frog-longbreak.png` media checkpoint (deliver latest edit or explain what remains; no retry under a new filename).
5. Brief Koba on the five page edits for ownership/consistency.
6. Pursue deployment to a shareable public URL.

---
*Last updated: 2026-08-14T13:44:47Z*