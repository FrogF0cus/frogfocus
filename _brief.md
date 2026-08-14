# Frog Focus - Project Brief

## Vision & Goals
- Polished, original single-page Pomodoro companion ("Frog Focus — your intentional productivity companion") inspired by pomodorokitty.com — not a clone.
- Frog mascot as consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework. Distinct visuals per timer phase, auto-swapped (no frog picker UI).
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces. Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — the frog is also a **friend**.
- Timer voice: warm, comforting, encouraging — like a friend. **Words locked verbatim; only delivery changes.**
- **Secure, human-grade voice (backend built, audio not yet produced):** ElevenLabs neural voice via Node/Express proxy with phrase caching — key lives only in the server env file; each of the 5 phrases synthesized once and served as a cached mp3 to every visitor.
- **Deployment target identified (unfunded):** Headless VPS (1 GB RAM, $36/year ≈ $3/month, billed yearly from credits).

## Current Status
- **Four API keys in play — none usable yet:**
  1. `sk_9001…9be` — INVALID (HTTP 400: "API key ID used as API key").
  2. `66040a9f6b0bb9bd43e8aa0dc9d425fdc7147a98c05eb3a9c6e883e019f3e2fa` — re-tested this cycle, still `missing_permissions`; workspace lacks TTS access.
  3. `sk_14e1…f3efa` — public in chat, untested; rotation still recommended.
  4. `sk_f99f5ef600004d94dcc09406a7589b662f6507b1d4c5dc46` — NEW this cycle, publicly pasted in chat; developer-tested **INVALID** (HTTP 400: "API key ID used as API key"). Needs rotation.
- **No valid audio exists — confirmed twice.** All synthesis attempts (including the CEO's claimed 46KB/60KB "MP3s") are 244-byte JSON error bodies (`missing_permissions` / `authentication_error`), not MP3s. The "TTS is working now" claim was contradicted by developer file verification; treat only file-verified states as true.
- **KR's clickable-link ask is unmet.** KR explicitly approved publishing `adam.mp3` and `antoni.mp3` to public, no-login links and kept asking where to access them ("they aren't showing up in the files folder"). Nothing publishable exists until a working key produces real audio.
- **Voice availability signal:** Adam and Antoni voices are reachable; **Josh hit 402 Payment Required** — that specific voice needs quota/credit the trial doesn't cover.
- **Backend is built and wired:** `server.js` reads `process.env.ELEVENLABS_API_KEY` only; raw keys confirmed in **zero** workspace files; `server.js` + inline frontend JS pass syntax checks. Page calls ElevenLabs via backend first, browser `speechSynthesis` as fallback. **5 unique phrases + 1 test phrase** kept verbatim.
- **Process warnings:** (a) a developer change once failed to land in the workspace — always verify against the real file; (b) CEO status claims have been contradicted by developer verification twice — rely on the latter.
- **VPS funding:** no VPS exists. Headless plan is **$36/year**; KR has **$22.24 in credits — ~$13 short**. No charge made. KR waits to hear the voice before committing.
- **Cheap audition path agreed:** synthesize one locked line in a few male neural voices (~cents; KR approved) so KR can pick before hosting spend.
- **Media checkpoints:** `frog-longbreak.png` generation pending — do **NOT** retry under a new filename; if baked-in text is wrong, rewrite shorter and generate one fresh image **without** `referenceImage`. `frog-face.png` is still JPEG bytes under a `.png` name — needs true-PNG re-encode before publish.

## Files & Structure
- **Frontend (single file):** `index.html` (70KB) — markup, inline CSS, JS. Key areas: What copy, Recharge, Why long-break, footer "The What," auto voice-pick order (American male first), Timer settings voice picker, and backend `say()` wiring (ElevenLabs-first + browser-voice fallback).
- **Backend:** `server.js` (5KB) — Node/Express ElevenLabs proxy with phrase caching; key from `process.env.ELEVENLABS_API_KEY` only. `package.json` (0KB) — **empty; dependency declaration unverified.**
- **Setup doc:** `TTS-SETUP.md` (4KB) — ElevenLabs/backend notes.
- **audio/** (1 file) — 244-byte error JSON body, not real audio; regenerate with a TTS-enabled key.
- **images/** (7 files): `frog-focus.png` (base reference mascot), `frog-longbreak.png` (long-break frog, wired into FROG map; generation pending), `frog-face.png` (timer face — JPEG bytes, must re-encode to true PNG).
- **uploads/** (6 files) — working assets, not shipped.

## Key Decisions Made
- **Words locked verbatim** — 5 spoken phrases + 1 test phrase; only delivery may change.
- **API key never lives in the page** — Express backend proxy reads `process.env.ELEVENLABS_API_KEY`; the page calls the backend, not ElevenLabs directly.
- **Phrase caching in the backend** — each phrase synthesized once to a small mp3, then served to all visitors; TTS cost effectively fixed.
- **ElevenLabs-first, browser-voice fallback** — if backend is unreachable, frog falls back to `speechSynthesis`.
- **Voice picker is the in-app mechanism** — dropdown with Test button, `localStorage` persistence, American-male-first auto-pick.
- **Deployment target: Headless VPS ($36/year, 1 GB RAM)** — selected, **not funded**; KR must hear a voice first.
- **Key rotation before use/deploy** — now applies to **two** public keys: `sk_14e1…f3efa` and `sk_f99f5ef…5dc46`.
- **Audition before commit** — KR approved synthesizing one line in a few male neural voices before any hosting spend.
- **Public links for KR** — KR wants clickable no-login links for the Adam and Antoni samples; only publish real audio, never error bodies.
- **JSON payloads written to files** for curl (apostrophes broke inline single-quoted JSON).
- **Long-break frog:** reuse existing `frog-longbreak.png`; no new filename per media checkpoint guidance (fresh image without `referenceImage` only if text must be rewritten).
- **No frog picker UI** — phases auto-swap frogs.
- **Process discipline:** read the real file before responding; do not report a state as done until the workspace verifies it.

## Pending Decisions
- **Rotate both public keys (KR's action):** `sk_14e1…f3efa` and `sk_f99f5ef…5dc46` — then test the rotated key's `text_to_speech` access directly.
- **TTS enablement path:** if the rotated key returns `missing_permissions` (like `66040…`), enable TTS on the workspace or create a fresh key from a TTS-enabled workspace.
- **Voice audition (KR's call):** pick the frog's voice from a few male neural voices (Adam and Antoni are reachable; Josh requires paid quota) — gated on a working key.
- **VPS funding:** top up ~$13 credits for the $36/year VPS, or hold — gated on KR liking a voice.
- **`package.json` contents** — 0KB currently; confirm/repair dependencies (`express`) before any deploy attempt.
- **KR's live voice acceptance** — once valid audio exists; tune stability/similarity + SSML pauses from KR's earlier "robotic cadence" feedback.
- **`frog-longbreak.png` media checkpoint** — deliver latest clean edit or explain what remains; if text is wrong, rewrite shorter and generate fresh without `referenceImage`.

## Tasks
- [x] Receive ElevenLabs API keys (four received; each exposed in chat at some point; none TTS-usable yet)
- [x] Ship five page edits (dark mode, "productive tool," "the what," beverage line, recharge copy)
- [x] Build voice picker UI (dropdown, Test voice button, `localStorage` persistence)
- [x] Reorder auto-pick voice order — American male first
- [x] Wire `frog-longbreak.png` into FROG map `long` entry
- [x] Build secure backend with phrase caching (`server.js`, Express proxy)
- [x] Wire frontend `say()` calls to the backend — ElevenLabs first, browser voice fallback
- [x] Keep all 5 phrases + test phrase verbatim across backend config
- [x] Confirm raw API keys appear in zero workspace files; syntax-check `server.js` + frontend JS
- [x] Fix curl JSON quoting (apostrophes broke inline single-quoted JSON; switched to `--data @file`)
- [x] Stage synthesis directory and request payload (ready, but no valid audio produced)
- [x] Test `sk_f99f5ef…5dc46` — INVALID (HTTP 400 "API key ID used as API key")
- [x] Re-test `66040a9f…2fa` — still `missing_permissions` (second confirmation)
- [ ] Rotate `sk_14e1…f3efa` and `sk_f99f5ef…5dc46` (both public in chat) — CEO-recommended; get KR's confirmation
- [ ] Test the rotated key's `text_to_speech` endpoint directly (not the subscription-info check)
- [ ] If `missing_permissions` again: have KR enable TTS on the workspace (Profile → API Keys) or create a fresh key from a TTS-enabled workspace
- [ ] Synthesize one test line in a few male neural voices (~cents) for KR to audition — do NOT spend on the VPS first
- [ ] **Publish clickable public links (no-login) for `adam.mp3` and `antoni.mp3`** — KR's explicit ask; only after real audio exists
- [ ] Collect KR's voice pick + verdict before committing to hosting
- [ ] Decide VPS funding: top up ~$13 credits vs hold (gated on voice approval)
- [ ] Verify/repair `package.json` (currently 0KB) — declare `express` + deps; test `npm install` + local boot
- [ ] Provision Headless VPS once funded; set `ELEVENLABS_API_KEY` as env var with a freshly rotated key
- [ ] Regenerate all 5 cached phrases with the working key; end-to-end voice test (page → backend → ElevenLabs → cached mp3)
- [ ] Deploy page + backend to the VPS; share a public URL with KR
- [ ] Brief Koba on KR's five page edits (queued recommendation)
- [ ] Re-encode `frog-face.png` to a true PNG (queued recommendation)
- [ ] Preview timer face in live Chrome to confirm ring placement (queued recommendation)
- [ ] Resolve `frog-longbreak.png` media checkpoint (no retry under new filename)

## Opportunities
1. **The cheap voice audition is the unlock — and KR is actively waiting for it.** KR approved the spend and has repeatedly asked for clickable links to the Adam and Antoni samples. One TTS-enabled key lets Koba synthesize a locked test line in Adam + Antoni (both reachable; Josh needs paid quota) for pennies, fulfill KR's link request with real MP3s, convert "wait and see" into a go/no-go, and de-risk the $36 VPS purchase. Fastest path to restoring KR's confidence after the repeated unfulfilled link promises.
2. **Free local smoke test de-risks deployment at zero cost.** Before any VPS spend, repair `package.json`, `npm install`, and boot `server.js` locally with the working key to verify the full chain (page → proxy → ElevenLabs → cached mp3 → browser fallback). This proves the backend on KR's own machine and gives KR a tangible preview while the funding decision is still open — no credits required.
3. **Voice-cadence polish directly answers KR's earlier feedback.** KR flagged "still sound kinda robotic… cadence is off." With a working key, ElevenLabs stability/similarity settings + SSML pauses in the cached phrases fix that for pennies. Because phrases are cached once, future voice lines (timer-start, long-break, encouragement variations) cost one synthesis each — a cheap path to making the frog feel human and keeping the "productive tool" promise honest.

## Next Steps
1. **Rotate both public keys immediately** (`sk_14e1…f3efa` and `sk_f99f5ef…5dc46`) — then test the rotated key's `text_to_speech` access directly. If `missing_permissions` again, have KR enable TTS on the workspace or create a fresh key from a TTS-enabled workspace.
2. **Run the cheap voice audition** — synthesize one locked test line in Adam + Antoni (JSON body via `--data @file`), verify the files are real MP3s, then publish the public no-login links KR has been waiting for.
3. Inspect and repair `package.json`; run `npm install` and boot `server.js` locally to smoke-test the proxy with the working key.
4. On KR's voice approval + funding decision: provision the VPS, set `ELEVENLABS_API_KEY`, regenerate all 5 cached phrases, and deploy page + backend to a public URL.
5. Resolve queued media items: brief Koba on the five edits, re-encode `frog-face.png`, re-verify `frog-longbreak.png` (no new filename), and preview the timer face in Chrome.

---
*Last updated: 2026-08-14T14:13 UTC*