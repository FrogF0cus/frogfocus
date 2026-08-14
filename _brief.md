# Frog Focus - Project Brief

## Vision & Goals
- Polished, original single-page Pomodoro companion ("Frog Focus — your intentional productivity companion"), inspired by pomodorokitty.com — not a clone.
- Flat-vector frog mascot as consistent identity (sage green body, cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework); phase-specific visuals auto-swap, no frog picker.
- Tagline + positioning locked: **"your intentional productivity companion"**; a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is a **friend**.
- Timer voice: warm, comforting, encouraging. **Antoni (ElevenLabs) locked as default; words locked verbatim; only delivery changes.**
- Secure voice pipeline: ElevenLabs via Express proxy with phrase caching — key lives only in server env; browser `speechSynthesis` fallback. **Wiring complete and smoke-tested.**
- Deployment target identified (unfunded): headless VPS (1 GB RAM, $36/year).

## Current Status
- **Active edit queue (not yet applied):** KR requested removal of "press space to begin" (focus timer) and "space to pause" hint text. CEO located both spots in `hintText()` plus the initial HTML default, and is tracing the space-bar key wiring. **Open question:** hide hint text only, or disable the space-bar shortcut entirely — changes what gets implemented.
- **Publish fired:** KR gave multiple explicit confirms; CEO re-published `index.html` to the public live link so the new tab matches the preview pane. Preview pane renders round dots; new-tab preview showed squares — diagnosed as a **stale cached copy** (current build has `.constellation .dot { border-radius:50% }`). **Outstanding: KR hard-refresh + confirm.**
- **Waiting period used for edits:** KR explicitly wants to batch other edits while the cache/publish confirmation is pending.
- **Local run is the last gate before VPS spend.** KR previously confirmed the bridge ("ok connected now") but CEO's reachability checks never verified a live connection; a one-click installer was offered as fallback. KR must hear the live frog before funding.
- **API keys — none TTS-usable yet:** `sk_9001…9be` INVALID; `66040a…2fa` still `missing_permissions`; `sk_14e1…f3efa` and `sk_f99f5ef…5dc46` were public in chat (the latter INVALID). Both public keys need rotation.
- **Media checkpoint active — `frog-longbreak.png`** (attempts: 0). Per checkpoint `lastError`: do **NOT** retry `frog-focus.png` as reference under a new filename (2 edits already produced this turn). If dense baked-in text is wrong, rewrite the text block shorter and make **one fresh image without `referenceImage`**; otherwise deliver the latest clean edit or explain what remains.
- **Queued recommendations:** KR's five page edits — applied; frog-face.png true-PNG re-encode — pending; timer-face live browser preview — pending.
- **Process discipline holds:** verify against real files; developer file-verification outranks CEO claims.

## Files & Structure
- **Frontend (single file):** `index.html` (70KB) — markup + inline CSS/JS. Contains `.constellation .dot` (round dots), `hintText()` + initial HTML hint defaults (current edit targets), What/Recharge/Why long-break copy, locked phrases, voice picker, `say()` TTS wiring, `#ttsNote` naming Antoni.
- **Backend:** `server.js` (5KB) — Express ElevenLabs proxy with phrase caching; key from `process.env.ELEVENLABS_API_KEY` only; boot-with-no-key smoke-tested.
- **Media:** `images/` (7 files) — includes `frog-focus.png` (reference mascot) and `frog-face.png` (JPEG bytes under .png name — needs re-encode). `frog-longbreak.png` pending generation.
- **Audio:** `audio/` (1 file) — cached TTS phrase.
- **Support:** `TTS-SETUP.md` (4KB) — voice pipeline/setup notes; `package.json` (0KB — verify/repair contents); `package-lock.json` (29KB); `node_modules/` (69 files).
- **Uploads:** `uploads/` (7 files) — includes `pasted-image-1786718339151.png` (square-dots screenshot evidence).

## Key Decisions Made
- **Five page edits applied** (per recommendation v1): dark mode → frog green, "productive tool" positioning, "the what" section, beverage line, recharge copy.
- **Round dots are correct** in the current build; squares in the new tab = stale cache, not a code defect.
- **Re-publish approved and fired** to the public live link (KR confirmed multiple times).
- **Hint-text removal requested**, but scope (text-only vs. disabling shortcut) not yet finalized.
- Carryover from prior work: Antoni locked; phrase wording locked; TTS pipeline complete; local file access is sufficient — no public publishing unless KR asks again.

## Pending Decisions
- Remove space-bar shortcut entirely vs. hide hint text only (affects key handling in JS, not just `hintText()`).
- `frog-longbreak.png` generation approach — per checkpoint constraints: one fresh image without `referenceImage` if text is still wrong.
- VPS purchase ($36/year) — only after KR hears the live frog.
- Rotation of the two public API keys.

## Tasks
- [x] KR's five page edits applied (dark mode, "productive tool," "the what," beverage line, recharge copy)
- [x] TTS wiring complete + end-to-end smoke test
- [x] Antoni locked as default voice
- [x] `index.html` re-published (round-dot build live)
- [ ] Remove "press space to begin" hint from focus timer
- [ ] Remove "space to pause" hint
- [ ] Decide + implement space-bar shortcut behavior (text-only vs. disabled)
- [ ] KR hard-refresh and confirm new-tab preview shows round dots
- [ ] Re-encode `frog-face.png` to true PNG
- [ ] Live browser preview of timer face in the ring before shipping
- [ ] Generate `frog-longbreak.png` per checkpoint constraints (no reference retry; one fresh image if text still wrong)
- [ ] Verify/repair `package.json` (currently 0KB)
- [ ] Confirm local run bridge on KR's machine (gate for VPS spend)
- [ ] Rotate publicly exposed API keys
- [ ] Purchase VPS after KR hears the live frog

## Opportunities
1. **Batch a visible release:** combine the two hint-text edits + `frog-longbreak.png` + frog-face re-encode into one publish, so KR gets a single fresh diff to hard-refresh against — this also resolves the stale-cache verification naturally.
2. **"Hear the frog" public demo link:** serve the cached TTS phrases as a one-click audio sample from the public page — lets KR (or future users) hear Antoni without running the server locally, removing the last barrier to VPS funding.
3. **Share-ready polish:** add frog favicon + OG meta image to `index.html` so the public link looks intentional when shared — cheap, high-visibility win while the page is already public.

## Next Steps
1. Apply the two hint-text edits (`hintText()` + initial HTML default) and confirm with KR whether the space-bar shortcut should also be disabled.
2. Ask KR to hard-refresh the new-tab preview to confirm round dots.
3. While that confirmation is pending, proceed with `frog-longbreak.png` per checkpoint constraints and the frog-face re-encode.
4. Re-attempt KR's local run bridge once edits are batched; that gates the VPS purchase.

---
*Last updated: 2026-08-14*