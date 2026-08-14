# Frog Focus - Project Brief

## Vision & Goals
- Polished, original single-page Pomodoro companion ("Frog Focus — your intentional productivity companion"), inspired by pomodorokitty.com — not a clone.
- Flat-vector frog mascot as consistent identity: sage green, cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework. Distinct visuals per timer phase, auto-swapped (no frog picker UI).
- Tagline locked: **"your intentional productivity companion."** Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — the frog is also a **friend**.
- Timer voice: warm, comforting, encouraging. **Antoni (ElevenLabs) locked as default; words locked verbatim; only delivery changes.**
- Secure voice pipeline: ElevenLabs via Node/Express proxy with phrase caching — key lives only in server env; each phrase synthesized once, served as cached mp3; browser `speechSynthesis` fallback. **Wiring complete and smoke-tested.**
- Deployment target identified (unfunded): Headless VPS (1 GB RAM, $36/year ≈ $3/month).

## Current Status
- **KR is mid-connection to the desktop Bridge** ("ok connected now" → "ill just connect to the bridge. brb") to run the app locally. **He asked to "run it locally so i can see how it feels please" — the live feel-test remains the immediate priority and the only gate before VPS spend.** CEO confirmed his machine wasn't reachable earlier (no Bridge, no VPS); a one-click installer link was offered as the fallback on his return.
- **TTS wiring COMPLETE and developer-verified:** Express installed; `server.js` boots with no key (proves env-only key reading); 5 phrases cached; browser fallback intact; `#ttsNote` in `index.html` names Antoni; full key strings redacted from `_brief.md`. End-to-end smoke test performed by developer.
- **Antoni locked as default.** KR heard both samples, found them in the files folder ("i found them in the files folder so im good"), and approved ("ok let's go with it."). **Public no-login link loop closed** — KR is satisfied with local file access; no publishing unless KR asks again.
- **API keys — none TTS-usable yet:** `sk_9001…9be` INVALID; `66040a…2fa` still `missing_permissions`; `sk_14e1…f3efa` and `sk_f99f5ef…5dc46` public in chat (the latter INVALID). Both public keys need rotation.
- **VPS funding:** no VPS exists; $36/year vs KR's $22.24 credits (~$13 short); KR must hear the live frog first.
- **Media checkpoint active — `frog-longbreak.png`** (attempts: 0, pending). `lastError` guidance: do **NOT** retry the reference under a new filename; 2 edits of `frog-focus.png` already produced this turn. If dense baked-in text is still wrong, rewrite the entire text block into shorter copy with the same meaning and make **one fresh image without `referenceImage`**; otherwise deliver the latest clean edit or explain what remains. `frog-face.png` is still JPEG bytes under a `.png` name — re-encode before publish.
- **Process discipline holds:** verify against real files; developer file-verification outranks CEO claims.

## Files & Structure
- **Frontend (single file):** `index.html` (70KB) — markup, inline CSS/JS; What copy, Recharge, Why long-break, footer "The What," locked phrases, voice picker, backend `say()` wiring (ElevenLabs-first + browser fallback), `#ttsNote` now naming Antoni.
- **Backend:** `server.js` (5KB) — Express ElevenLabs proxy with phrase caching; key from `process.env.ELEVENLABS_API_KEY` only; boot-with-no-key smoke-tested.
- **Dependencies:** `node_modules/` (69 files) + `package-lock.json` (29KB); `package.json` listed 0KB — verify/repair contents.
- **Docs:** `TTS-SETUP.md` (4KB); `_brief.md` — key strings redacted.
- **Audio & assets:** `uploads/` (6 files) — includes `adam.mp3` and `antoni.mp3` (KR's samples; KR satisfied, found here); `audio/` (1 file — previously a 244-byte error body; confirm status). `images/` (7 files): `frog-focus.png` (base mascot), `frog-longbreak.png` (media checkpoint pending), `frog-face.png` (timer face — JPEG bytes, needs true-PNG re-encode), 4 others unverified.

## Key Decisions Made
- **Antoni locked as the default frog voice** — KR chose after hearing both samples; baked into frontend note and backend wiring.
- **KR satisfied with local sample access** — public no-login links deprioritized unless KR requests them.
- **Words locked verbatim** — 5 spoken phrases + 1 test phrase; only delivery may change.
- **API key never lives in the page** — Express backend proxy reads env only; verified by booting the server with no key.
- **Phrase caching in the backend** — each phrase synthesized once to a small mp3, then served to all visitors; TTS cost effectively fixed.
- **ElevenLabs-first, browser-voice fallback** — if backend is unreachable, frog falls back to `speechSynthesis`.
- **Voice picker is the in-app mechanism** — dropdown with Test button, `localStorage` persistence, American-male-first auto-pick.
- **Local run is the acceptance test** — KR wants to feel the live frog on his machine before any VPS spend; Bridge connection in progress; one-click installer offered as fallback.
- **Deployment target: Headless VPS ($36/year, 1 GB RAM)** — selected, **not funded**.
- **Key rotation before use/deploy** — applies to `sk_14e1…f3efa` and `sk_f99f5ef…5dc46` (both public in chat).
- **Long-break frog:** reuse existing `frog-longbreak.png`; no new filename per media checkpoint guidance.
- **No frog picker UI** — phases auto-swap frogs.
- **Process discipline:** read the real file before responding; report only file-verified states.

## Pending Decisions
- **Local run method:** verify KR has Node.js and complete the Bridge connection to boot `server.js` vs. mint the one-click installer link — KR hasn't chosen; he said "brb" mid-connection.
- **Rotate both public keys (KR's action):** `sk_14e1…f3efa` and `sk_f99f5ef…5dc46` — then test the rotated key's `text_to_speech` access directly.
- **TTS enablement path:** if rotated key returns `missing_permissions`, enable TTS on the workspace (Profile → API Keys) or create a fresh key from a TTS-enabled workspace.
- **VPS funding:** top up ~$13 credits for the $36/year VPS, or hold — gated on KR hearing the live frog.
- **`package.json` contents** — 0KB listed; confirm/repair dependencies (`express`) before deploy.
- **`frog-longbreak.png` media checkpoint** — deliver the latest clean edit or explain what remains (per `lastError`: rewrite text shorter + one fresh image **without** `referenceImage` if baked-in text wrong; never retry under a new filename).

## Tasks
- [x] Receive ElevenLabs API keys (four received; none TTS-usable yet)
- [x] Ship five page edits (dark mode, "productive tool," "the what," beverage line, recharge copy)
- [x] Build voice picker UI (dropdown, Test button, `localStorage` persistence)
- [x] Reorder auto-pick voice order — American male first
- [x] Wire `frog-longbreak.png` into FROG map `long` entry
- [x] Build secure backend with phrase caching (`server.js`, Express proxy)
- [x] Wire frontend `say()` to the backend — ElevenLabs first, browser fallback
- [x] Keep all 5 phrases + test phrase verbatim across backend config
- [x] Confirm raw keys appear in zero workspace files; syntax-check server + frontend JS
- [x] Test `sk_f99f5ef…5dc46` — INVALID (HTTP 400 "API key ID used as API key")
- [x] Re-test `66040a9f…2fa` — still `missing_permissions`
- [x] Install Express + smoke-test server boot with no key — env-only key reading proven
- [x] Redact full key strings from `_brief.md`
- [x] Update `#ttsNote` to name Antoni as the default voice
- [x] Secure KR's voice choice — Antoni approved and locked in
- [x] Make Adam/Antoni samples accessible to KR — found in files folder; KR satisfied
- [ ] **Complete KR's local run** — finish Bridge connection, verify Node.js, boot `server.js`, open `index.html` in KR's browser so he hears the frog live
- [ ] Mint one-click installer link **if KR wants it** — pending his choice; offered by CEO
- [ ] Verify adam.mp3 / antoni.mp3 are genuine MP3 bytes (not error bodies); confirm `audio/` contents
- [ ] Publish no-login public links **only if KR still asks** — currently deprioritized
- [ ] Rotate `sk_14e1…f3efa` and `sk_f99f5ef…5dc46` (both public in chat)
- [ ] Test rotated key's `text_to_speech` endpoint directly (not subscription-info check)
- [ ] If `missing_permissions` again: KR enables TTS on workspace or creates a fresh key from a TTS-enabled workspace
- [ ] Synthesize the 5 cached phrases in Antoni with the working key; tune cadence (stability/similarity + SSML pauses per KR's "robotic cadence" feedback)
- [ ] Run local end-to-end live demo (page → backend → ElevenLabs → cached mp3 → browser)
- [ ] Verify/repair `package.json` (listed 0KB) — declare `express` + deps; re-run `npm install` + local boot
- [ ] Decide VPS funding: top up ~$13 credits vs hold (gated on live voice acceptance)
- [ ] Provision Headless VPS once funded; set `ELEVENLABS_API_KEY` as env var with a freshly rotated key
- [ ] Generate all 5 cached phrases on the server; end-to-end voice test; deploy public URL
- [ ] Re-encode `frog-face.png` to a true PNG; preview timer face in live Chrome to confirm ring placement
- [ ] Resolve `frog-longbreak.png` media checkpoint — deliver latest clean edit or explain what remains (rewrite text shorter + one fresh image **without** `referenceImage` if needed; do **not** retry the reference under a new filename)

## Opportunities
1. **Deliver the local live demo the moment KR returns.** KR said "brb" mid-Bridge-connection and asked to "feel" the app — the fastest path to VPS green light is a frictionless local run. Be ready to verify Node.js, boot `server.js`, and open the page in his browser so Antoni speaks immediately; mint the one-click installer the moment his machine shows a gap.
2. **Five-phrase Antoni take-home pack.** Once a working key exists, synthesize the five cached phrases and hand KR a zipped folder of real MP3s — the same format that won him over with Adam/Antoni. This de-risks the VPS purchase: KR hears the full script, not just two samples, before spending.
3. **"Frog speaks" teaser asset.** With the long-break phrase synthesized, pair it with the celebrating `frog-longbreak.png` mascot (pending its media checkpoint resolution) as a tiny shareable clip/GIF — a compelling pitch asset for KR and future launch marketing.

## Next Steps
1. **Pick up KR's local run on his return:** complete the Bridge connection, verify Node.js, boot `server.js`, and open `index.html` in his browser for the live feel-test; mint the one-click installer if his machine needs it.
2. Verify adam.mp3/antoni.mp3 in `uploads/` are genuine MP3 bytes; confirm `audio/` contents.
3. Resolve the `frog-longbreak.png` media checkpoint — deliver the latest clean edit or explain what remains (per `lastError`: rewrite text shorter + one fresh image **without** `referenceImage` if baked-in text wrong; never retry under a new filename).
4. Guide KR through rotating `sk_14e1…f3efa` and `sk_f99f5ef…5dc46`; test the rotated key's `text_to_speech` endpoint directly.
5. With a working key: synthesize the 5 cached phrases in Antoni, verify/repair `package.json`, and run the local end-to-end live demo.
6. Gated on KR hearing the live frog: decide VPS funding (~$13 top-up), provision, set env key, generate server-side cached phrases, deploy public URL.
7. Re-encode `frog-face.png` to a true PNG and preview the timer face in live Chrome before shipping.

---
*Last updated: 2026-08-14T14:31:47.964Z*