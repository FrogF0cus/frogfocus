# Frog Focus — Project Brief

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
- **Voice issue escalated — real options now being presented.** The earlier reorder shipped (American male first), but KR reports it *still sounds robotic* and *now female-sounding*. Root cause found by actually reading the code: (1) built-in browser voices have a quality ceiling — no amount of reordering makes them truly human; (2) "sounds female" happens when **Microsoft David / Mark / Guy aren't installed on KR's machine**, so the picker falls through to a default female voice. CEO has pulled the actual voice-picking code and is presenting KR real options, no fluff. **Decision pending from KR.**
- **KR is mid-verification:** running timer cycles right now; will confirm voice + long-break frog live when they reach those phases.
- **Long-break frog wired and verified.** FROG map `long` now points to `frog-longbreak.png` (arms raised, closed happy eyes, sparkles); CEO verified the full map reads correctly.
- **Copy edits shipped with line-numbered receipts:** Recharge "take the long break" (line 575), What "...rest on purpose." (line 556), Why long-break copy (line 658), footer nav "The What" (line 697), dark-mode frog green + "productive tool" positioning.
- **Media checkpoint superseded:** queued `frog-longbreak.png` generation is void — file exists and is in active use. Guardrail logged: never reuse `frog-focus.png` as referenceImage under a new filename; if baked-in text is wrong, shorten and generate fresh without reference.
- 📋 **Queued recommendations:** (1) brief Koba on KR's five page edits; (2) convert `frog-face.png` to a true PNG (JPEG bytes under .png name may break transparency/editing); (3) preview timer face in live Chrome to confirm ring placement before shipping.

## Files & Structure
- **Landing Page (single file):** `index.html` (62KB) — all markup, inline CSS, JS. Key lines: **556** (What copy), **575** (Recharge), **658** (Why long-break), **697** (footer "The What"), **872–879** (voice pick order — reordered to American male first, but fallback still lands female on machines without David/Mark/Guy).
- **images/** (7 files): `frog-focus.png` (base reference mascot), `frog-longbreak.png` (long-break/quiet-victory frog, wired into FROG map), `frog-face.png` (timer face — JPEG bytes under .png name, needs re-encode).
- **uploads/** (6 files) — working assets, not part of the shipped page.

## Key Decisions Made
- **Words are locked verbatim** — KR explicitly loves the script; only delivery may change.
- **Option one shipped (reorder to American male first)** — but live feedback proved it insufficient on KR's machine; this path is now in question pending the new options.
- **Long-break frog:** reused existing `frog-longbreak.png` rather than regenerate; wired into phase map.
- **No frog picker UI** — each phase auto-swaps to its matching frog.
- **Five page edits shipped:** dark mode to frog green, "productive tool" positioning, "the what" naming, beverage line, recharge copy.

## Pending Decisions
- **Voice path forward — OPEN and urgent.** KR awaits the real options CEO just presented. Implied trade-off: accept the free built-in voice ceiling vs. move to a more human engine (likely paid/external TTS). KR previously chose "free and instant" option one; it failed acceptance, so a new pick is required.

## Tasks
- [x] Reorder voice pick order — American male (David/Mark/Guy) first, Google US English fallback; Daniel/UK removed from top of order *(shipped — but failed live acceptance; see Pending Decisions)*
- [x] Wire `frog-longbreak.png` into FROG map `long` entry
- [x] Ship five page edits with line-numbered receipts
- [x] Mark queued `frog-longbreak.png` generation void
- [ ] **KR choose among the real voice options CEO presented**
- [ ] Implement the chosen voice path
- [ ] KR live verification: voice delivery + long-break frog during timer cycles
- [ ] Brief Koba on KR's five page edits (queued recommendation)
- [ ] Re-encode `frog-face.png` to a true PNG before publish (queued recommendation)
- [ ] Preview timer face in live Chrome to confirm ring placement (queued recommendation)

## Opportunities
1. **User-selectable voice menu** — now the highest-leverage addition: expose the installed voices in a small picker with a preview button. Solves the "sounds female" surprise on machines missing David/Mark/Guy and lets any user choose their preferred voice, with the auto-pick as fallback.
2. **Optional external TTS upgrade** (e.g., ElevenLabs-class engine) — the only realistic path to "truly human" delivery given the built-in voice ceiling; could ship as an optional add-on behind the free defaults.
3. **Deploy to a shareable public URL** — one-time static host push (Netlify/GitHub Pages) closes the loop on the "companion" positioning and gives KR a link to share.
4. **Frog picker UI** — let users choose which frog represents each phase; builds on the auto-swap FROG map that already exists.

## Next Steps
1. Get KR's decision on the voice options just presented; implement the chosen path immediately (this is the active blocker).
2. Collect KR's live verification results from the current timer-cycle run (voice + long-break frog).
3. Execute the queued recommendations: brief Koba → re-encode `frog-face.png` → live Chrome preview of the timer face.
4. If baked-in frog text is wrong anywhere, rewrite shorter and generate fresh without a referenceImage.
5. Pursue deployment to a shareable public URL.

---
*Last updated: 2026-08-14T13:11:20Z*