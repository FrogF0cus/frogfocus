# Frog Focus - Project Brief

## Vision & Goals
- Polished, original single-page Pomodoro companion ("Frog Focus — your intentional productivity companion") inspired by pomodorokitty.com — not a clone.
- Frog mascot as consistent identity across hero, timer states, in-timer face, and dark mode — flat-vector: sage green (#6C7F6A), cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework. Distinct visuals per timer phase, auto-swapped (no frog picker UI).
- Tagline (locked): **"your intentional productivity companion"** on all brand surfaces. Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — the frog is also a **friend**.
- Timer voice: warm, comforting, encouraging — like a friend. **Words locked verbatim; only delivery changes.**
- **Secure, human-grade voice (built):** ElevenLabs neural voice via a Node/Express backend proxy with phrase caching — key lives only in the server env file; each of the 5 phrases is synthesized once and served as a cached mp3 to every visitor, so TTS cost is a few cents total regardless of audience size.
- **Deployment target identified:** a Headless VPS (1 GB RAM, $36/year ≈ $3/month, billed yearly from credits) to host the backend so the neural voice works on the public page.

## Current Status
- **Backend is built and wired.** `server.js` (Express) reads the key from `process.env.ELEVENLABS_API_KEY` only — never hardcoded. Developer confirmed the raw key appears in **zero** workspace files; `server.js` and inline frontend JS both pass syntax checks.
- **Frontend speaks via ElevenLabs first**, with the browser `speechSynthesis` voice as automatic fallback.
- **Phrase caching implemented:** exactly **5 unique spoken phrases** (all `say()` calls) + **1 test phrase** inventoried and kept verbatim, cached server-side as small mp3s.
- **Two API keys have now been exposed in plaintext chat:** `sk_9001…9be` (original) and `sk_14e1…fa` (new, most recent). The CEO's standing recommendation: **rotate the key first, then deploy**, dropping the fresh key into the backend env as part of setup. Rotation has NOT happened yet.
- **VPS funding decision in flight.** KR has **$22.24 in credits**; the Headless VPS costs **$36/year** — about **$13 short**. Two options were presented: top up credits to cover it, or hold the VPS. No decision yet.
- **Deployment target chosen (pending funding):** Headless VPS — resolves the earlier "Node host vs serverless" question, but nothing is provisioned or paid for yet.
- **Live end-to-end test not yet done** — backend is wired but hasn't run against a live server with the real env key, so KR hasn't heard the ElevenLabs result yet.
- **Risk: `package.json` is 0KB** — dependency declaration still unverified; must confirm `express` before `npm install`/deploy will work.
- **Five page edits shipped** (dark mode to frog green, "productive tool," "the what," beverage line, recharge copy); the formal "brief Koba" follow-up recommendation is still queued.
- **Media checkpoint — `frog-longbreak.png` pending.** Do NOT retry under a new filename (2 edits already produced this turn). If dense baked-in text is wrong: rewrite the text block shorter and generate one fresh image **without** `referenceImage`; otherwise deliver the latest clean edit or explain what remains. `frog-face.png` is still JPEG bytes under a `.png` name — needs true-PNG re-encode before publish.
- **Process lesson:** KR explicitly called out stalling; always verify against the actual file before responding.

## Files & Structure
- **Frontend (single file):** `index.html` (70KB) — all markup, inline CSS, JS. Key areas: What copy, Recharge, Why long-break, footer "The What," auto voice-pick order (American male first), Timer settings voice picker, and the backend `say()` wiring (ElevenLabs-first + browser-voice fallback).
- **Backend:** `server.js` (5KB) — Node/Express ElevenLabs proxy with phrase caching; key from `process.env.ELEVENLABS_API_KEY` only. `package.json` (0KB) — **empty; dependency declaration unverified.**
- **Setup doc:** `TTS-SETUP.md` (4KB) — ElevenLabs/backend notes.
- **images/** (7 files): `frog-focus.png` (base reference mascot), `frog-longbreak.png` (long-break frog, wired into FROG map; checkpoint pending), `frog-face.png` (timer face — JPEG bytes, must re-encode to true PNG).
- **uploads/** (6 files) — working assets, not shipped.

## Key Decisions Made
- **Words locked verbatim** — 5 spoken phrases + 1 test phrase; only delivery may change.
- **API key never lives in the page** — Express backend proxy reads it from `process.env.ELEVENLABS_API_KEY`; the page calls the backend, not ElevenLabs directly.
- **Phrase caching in the backend** — each phrase synthesized once to a small mp3, then served to every visitor; TTS cost fixed at a few cents total.
- **ElevenLabs-first, browser-voice fallback** — if the backend is unreachable, the frog falls back to the user-picked/auto-picked `speechSynthesis` voice.
- **Voice picker is the in-app mechanism** — user-selectable voice menu with Test button; American-male-first auto-pick as default fallback.
- **Deployment target: Headless VPS ($36/year, 1 GB RAM)** — selected as the Node host, pending KR's funding decision (currently ~$13 short on credits).
- **Key rotation before deploy** — CEO recommended rotating the newly pasted key first, then deploying with a fresh key installed into the backend env.
- **Long-break frog:** reuse existing `frog-longbreak.png`; do not regenerate under a new filename per media checkpoint guidance.
- **No frog picker UI** — phases auto-swap frogs.
- **Process discipline:** read the real file before responding (KR called out stalling).

## Pending Decisions
- **VPS funding:** top up ~$13 in credits to buy the $36/year Headless VPS, or hold the VPS for now.
- **Key rotation:** two keys are now public in chat (`sk_9001…9be`, `sk_14e1…fa`); decide to rotate/regenerate before any public deploy.
- **`package.json` contents** — 0KB; confirm/repair dependencies before any deploy attempt.
- **KR's live voice acceptance** — pending once the page runs against the live backend; tune voice/SSML pauses from feedback (KR earlier flagged robotic cadence).
- **`frog-longbreak.png` media checkpoint** — deliver latest clean edit or explain what remains; if baked-in text is wrong, rewrite shorter and generate fresh without `referenceImage`.

## Tasks
- [x] Receive ElevenLabs API keys from KR (two received; both exposed in chat)
- [x] Ship five page edits (dark mode, "productive tool," "the what," beverage line, recharge copy)
- [x] Build voice picker UI (dropdown, Test voice button, `localStorage` persistence)
- [x] Reorder auto-pick voice order — American male first (David/Mark/Guy → Google US English)
- [x] Wire `frog-longbreak.png` into FROG map `long` entry
- [x] Build secure backend with phrase caching (`server.js`, Express proxy)
- [x] Wire frontend `say()` calls to the backend — ElevenLabs first, browser voice fallback
- [x] Keep all 5 phrases + test phrase verbatim across backend config
- [x] Confirm raw API key appears in zero workspace files; syntax-check `server.js` + frontend JS
- [ ] Decide VPS funding: top up ~$13 credits vs hold (KR's call, CEO presented both options)
- [ ] Rotate/regenerate the exposed API key (both keys are now public in chat) — recommended BEFORE deploy
- [ ] Verify/repair `package.json` (currently 0KB) — declare `express` + deps; test `npm install` + local boot
- [ ] Provision Headless VPS once funded; set `ELEVENLABS_API_KEY` as env var with the freshly rotated key
- [ ] End-to-end voice test (page → backend → ElevenLabs → cached mp3), then collect KR's live verdict
- [ ] Deploy page + backend to the VPS; share a public URL with KR
- [ ] Brief Koba on KR's five page edits (queued recommendation)
- [ ] Re-encode `frog-face.png` to a true PNG (queued recommendation)
- [ ] Preview timer face in live Chrome to confirm ring placement (queued recommendation)
- [ ] Resolve `frog-longbreak.png` media checkpoint (no retry under new filename)

## Opportunities
1. **Close the ~$13 gap and ship the "publish for everyone" milestone** — the backend is built and wired; the only blockers are the small credit top-up for the VPS, key rotation, and a straightforward deploy. Landing that wins KR a shareable public URL.
2. **Voice-cadence polish** — KR's earlier feedback: "still sound kinda robotic... cadence is off." ElevenLabs stability/similarity settings + SSML pauses in the cached phrases directly address that and make the frog feel human — a cheap, high-impact tweak once the live backend is running.
3. **Add phrases at near-zero cost** — with caching, more voice lines (timer-start, long-break, encouragement variations) cost only one synthesis each, forever; an easy way to extend the frog's friendliness after launch.

## Next Steps
1. Recommend and walk KR through **key rotation first** (30 seconds, security win) — the CEO already flagged this as the right first move before deploy.
2. Resolve the **VPS funding decision** — confirm exact Headless VPS price, present the top-up-vs-hold choice, and get KR's go/no-go.
3. Inspect and repair `package.json`; run `npm install` and boot `server.js` locally to smoke-test the proxy.
4. Provision the VPS, install the freshly rotated key as `ELEVENLABS_API_KEY`, and deploy page + backend to a public URL.
5. Run an end-to-end voice check with KR; tune cadence/pauses from feedback.
6. Resolve the queued media items: brief Koba on the five edits, re-encode `frog-face.png`, re-verify `frog-longbreak.png`, and preview the timer face in Chrome.

---
*Last updated: 2026-08-14T13:58 UTC*