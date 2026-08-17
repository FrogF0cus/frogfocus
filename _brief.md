# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioned as a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice locked: Will (Relaxed Optimist), warm American male.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): The Focus Pond, ambient touches, second frog friend, daily streak, pre-focus checklist.
- **Active mission: finish the TTS loop and flip `frogfocus.live`** — sandbox is up on `frogfocus.vps.empir3.com`; last blocker is a valid ElevenLabs key.

## Current Status
- ⚠️ **TTS key is the current blocker.** The value pasted earlier was the API key **ID**, not the secret (real keys start with `sk_`) — ElevenLabs rejects it. KR is fetching the real key ("working on the actual key so brb").
- 🚀 **VPS deploy largely complete.** `ELEVENLABS_API_KEY` written to `/home/empir3/apps/frogfocus/.env` (64 chars, ownership `empir3`), service `empir3-frogfocus` active and restarted, `GET /api/tts/health` reports `configured: true` (503 gone). Voice/model IDs preserved as-is.
- 🔍 **First synthesis attempt hit a 502 upstream error** — dev was pulling the error body and service log to confirm the exact rejection. Route contract confirmed: `POST /api/tts` → 200 `audio/mpeg` when working, 503 when unconfigured.
- 🐛 **New platform bug logged: 475faf69** — chat search pulls up results but clicking one doesn't open it. Queued to the admin/platform review log (CEO can't message the platform team directly).
- ✅ **Fresh-start reset SHIPPED and published.** Lily pad button (flat, filled, inline SVG) beside "Timer settings"; clears `ff.timer`, `ff.cycleDone`, `ff.sayingIdx`; keeps settings + `ff.streak`. Live at **https://usercontent.empir3.com/p/a3adb503b8/index.html**. Test protocol: pomodoro → reload → resumes; Fresh start → snaps to 25:00, zero pads, stays fresh on reload.
- ✅ **Timer-resume question closed** — localStorage save/restore of `ff.timer` is a feature, now with a control.
- ✅ **Frog-drift glitch fixed** (`index.html` lines 207–208), republished, KR confirmed.
- ✅ **GitHub token access confirmed** — `repo` scope checked; `write:packages` not needed. Local repo still has **no remote**.
- ⚠️ **Long-break frog** still landscape (1504×1108), off-center subject, top-crop risk; Zara redraw offered, not approved.
- **Queued polish** (`recommendations_v1`): KR's Five Page Edits (dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy); `frog-face.png` re-encode (JPEG bytes under a .png name); timer-face live check in Chrome.
- **Publish manifest locked** (`publish_scope_v1`, workspace mode): `index.html`, `audio/`, `images/favicon.svg`, `images/frog-focus-mark-1-1111.png`, `images/frog-focus-mark-1.png`, `images/frog-hero.png`, `images/frog-timer.png`.

## Files & Structure
- **Core Page**: `index.html` (76KB) — inline SVG clock @ 11:11, `favicon.svg`, silent-buffer audio unlock, `PHRASE_AUDIO` MP3s, per-state frogs, cycle pills, glow dots, `ff.timer` localStorage resume, fresh-start lily pad button. Lines 207–208 = drift fix.
- **Frog Assets**: `images/` (23 files) — 4 phase frogs; 3 square (1024×1024), long-break landscape (1504×1108, top-crop risk); `frog-face.png` is JPEG bytes under a .png name.
- **Images & Media**: `uploads/` (31 files); `screenshots/` (15 files — grew from 9, likely fresh-start test captures).
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup.
- **Diagnostic Harness**: `diag.html` (2KB) — fetch/decode/report audio page; retention decision open.
- **Backend**: `server.js` (5KB) static server with optional ElevenLabs TTS + caching; `package.json` (0KB); `package-lock.json` (29KB); `node_modules/` (71 files).
- **VPS (frogfocus.vps.empir3.com)**: app at `/home/empir3/apps/frogfocus/` — `.env` (key names in place), `server.js`, systemd unit `empir3-frogfocus`, deploy helper `empir3-deploy`.
- **Scripts**: `scripts/` (5 files) — `generate-will-clips.js` (production), `generate-more-clips.js` (candidate menu), 3 legacy generators.
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB, post-launch source of truth); `TTS-SETUP.md` (4KB, stale — rewrite or delete).
- **VCS**: Local git repo present, **no remote configured**.

## Key Decisions Made
- **KR approved the direct VPS install**; deployed without GitHub — GitHub no longer on the critical path.
- **ElevenLabs key rule**: the secret must be the `sk_` key, not the key ID; key value never echoed/printed during setup.
- **Voice/model config is sacred** — `ELEVENLABS_VOICE_ID` and `ELEVENLABS_MODEL_ID` kept intact in `.env`.
- **TTS route contract locked**: `GET /api/tts/health` → `configured`; `POST /api/tts` → 200 `audio/mpeg` (or 503 when unconfigured).
- **Chat-search bug queued via admin review log** — issue **475faf69**; CEO has no direct chat path to the platform team.
- **Fresh-start shipped as a lily pad button** (per KR's explicit ask), clearing timer/cycle/saying state while preserving settings + streak.
- **Timer resume is a feature, not a bug** — localStorage save/restore of `ff.timer`.
- **Emporium: explore only, don't publish yet**; shareable link is the available asset.
- **Drift fix shipped via CSS**, not asset replacement; confirmed by KR.
- **CEO = Vincent** (project manager); KR = project owner; Koba = developer.
- **Domain locked: `frogfocus.live`**; sandbox server paid ($36/yr).
- Closed: clock/logo saga, platform 405s, audio saga, frog-drift glitch, timer-resume question.

## Pending Decisions
- **Real ElevenLabs key delivery**: KR to supply the `sk_` secret; whether it clears the 502 is unverified.
- **`frogfocus.live` flip timing**: after TTS synthesis verifies end-to-end on the sandbox.
- **Long-break frog asset**: Zara redraw vs. crop-to-square 1024×1024 vs. leave as-is (CSS masks drift).
- **GitHub repo creation**: optional parallel move now that direct deploy works (token is `repo`-scoped and ready).
- **Queued-polish timing**: ship Five Page Edits + PNG re-encode + timer-face check with next publish vs. post-launch.
- `diag.html` disposition; `voiceOn`/`soundOn` flag unification; Zara QA reschedule; cleanup (legacy clips, stale `TTS-SETUP.md`, shipping-music decision).

## Tasks
- [x] Voice pipeline complete: ElevenLabs validated, Will locked, 5 production clips
- [x] Roadmap written; launch scope locked
- [x] Audio saga closed: root-caused, silent-buffer unlock + diagnostics shipped
- [x] SVG clock @ 11:11 + `favicon.svg`; debug banner stripped; `?v=6` published
- [x] Platform 405 issues closed (3 reports)
- [x] Domain acquired (`frogfocus.live`); sandbox charge confirmed
- [x] Frog-drift glitch fixed (lines 207–208), republished, KR confirmed
- [x] Timer-resume question answered (localStorage feature, not cache)
- [x] Emporium feasibility checked; not pursued per KR
- [x] Shipping-music attribution corrected
- [x] Fresh-start lily pad button built, published, KR-approved
- [x] GitHub token access confirmed — `repo` scope; `write:packages` not needed
- [x] VPS service up: `.env` written, `empir3-frogfocus` active, health `configured: true`
- [ ] KR: provide the real ElevenLabs key (starts with `sk_`)
- [ ] Dev: swap real key into `.env`, restart service, verify `POST /api/tts` returns 200 `audio/mpeg` (no 502)
- [ ] CEO: confirm sandbox serves the current build (incl. fresh-start); ping KR; flip `frogfocus.live` once TTS verifies
- [ ] Platform team: fix chat search bug **475faf69**
- [ ] Brief Koba: Five Page Edits + asset decision + `frog-face.png` re-encode + flag unification + `diag.html`
- [ ] Re-encode `frog-face.png` to true PNG
- [ ] Live check: timer face in ring + cycle-pill wrap (Chrome)
- [ ] Optional: create GitHub repo (unblocks standard push path)
- [ ] Cleanup: legacy clips, stale `TTS-SETUP.md`, shipping-music decision
- [ ] Zara design QA deep pass (reschedule)

## Opportunities
1. **Close the TTS loop the moment KR returns.** The service is up and healthy; the only missing piece is the real `sk_` key. One `.env` swap + restart + a single `curl POST /api/tts` verification turns a 502 into 200 `audio/mpeg` and removes the last blocker before the `frogfocus.live` flip — finish it in this session.
2. **One publish cycle ships the polish bundle with the launch flip.** KR's Five Page Edits, the `frog-face.png` re-encode, and the timer-face live check are already queued (`recommendations_v1`) and the manifest is locked (`publish_scope_v1`) — fold them into the same round as the domain flip to avoid v1.0→v1.1 churn.
3. **Create the GitHub repo in parallel while the key lands.** The `repo`-scope token is confirmed; making a remote now restores the standard deploy path for future changes and permanently removes the "no remote" blocker — cheap insurance while the direct deploy proceeds.

## Next Steps
- **KR:** provide the real ElevenLabs key (`sk_...`); confirm the long-break frog decision; run the fresh-start test protocol on the public link.
- **Dev (Koba):** drop the real key into `/home/empir3/apps/frogfocus/.env`, restart `empir3-frogfocus`, verify `POST /api/tts` returns 200 `audio/mpeg`; then execute the queued polish (Five Page Edits, PNG re-encode, timer-face live check).
- **CEO (Vincent):** complete TTS verification with the dev, ping KR, flip `frogfocus.live` once synthesized audio is confirmed; optionally create the GitHub repo; keep an eye on platform-team fix for **475faf69**.
- **Post-launch:** revisit Emporium listing, cleanup (legacy clips, stale `TTS-SETUP.md`, shipping-music decision), and Zara's deep design QA pass.

---
*Last updated: 2026-08-17T16:56Z*