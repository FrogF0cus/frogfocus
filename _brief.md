# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioned as a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice locked: Will (Relaxed Optimist), warm American male.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): The Focus Pond, ambient touches, second frog friend, daily streak, pre-focus checklist.
- **Active mission: get Frog Focus live on `frogfocus.live`** — fresh-start UX shipped; remaining: VPS deploy + final polish bundle.

## Current Status
- 🚀 **Fresh-start reset SHIPPED and published.** KR approved the build ("sure go for it"), requested a **lily pad** instead of a leaf; Koba built a flat, filled, on-brand inline SVG button in the timer card footer next to "Timer settings". It clears `ff.timer`, `ff.cycleDone`, `ff.sayingIdx` — and **keeps** settings (`ff.durations`, `ff.sound`, `ff.voice`, `ff.autoBreak`, `ff.theme`) and `ff.streak`. A timer reset, not a wipe. KR approved the publish ("Go ahead"); live at **https://usercontent.empir3.com/p/a3adb503b8/index.html**. Test protocol: run a pomodoro → reload → resumes; hit Fresh start → snaps to 25:00, zero pads, stays fresh on reload.
- 🔄 **VPS reachable, app NOT deployed.** `frogfocus.vps.empir3.com` is up, but the VPS admin confirmed "no app has been deployed" and asked Vincent to install it. KR gave the go-ahead; deploy recipe known (copy app files, install deps, run as a persistent service — Node serves the pomodoro page + optional ElevenLabs TTS with caching). CEO proceeding; completion ping owed to KR.
- 🔄 **GitHub push access still read-only** (`repo` scope) — the standard deploy path remains blocked; direct copy/zip is the alternative.
- ✅ **Timer-resume question closed.** Root-caused as localStorage save/restore of `ff.timer` (a feature, not cache). The fresh-start control now resolves the confusion it caused.
- ✅ **Frog-drift glitch fixed**, republished, KR confirmed ("it worked thanks1") — CSS at `index.html` lines 207–208.
- ✅ **Emporium feasibility explored** — no direct publish path; public link is shareable anywhere. KR: "dont do it yet."
- ✅ **Shipping-music attribution corrected** — delivery confirmed; exact wording + explicit "from KR" tag unverified.
- ⚠️ **Long-break frog** still landscape (1504×1108), off-center subject, top-crop risk; Zara redraw offered, not approved.
- **Queued polish** (`recommendations_v1`): KR's Five Page Edits (dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy); `frog-face.png` re-encode (JPEG bytes under .png name); timer-face live check in Chrome.

## Files & Structure
- **Core Page**: `index.html` (76KB, +1KB from fresh-start button) — inline SVG clock @ 11:11, `favicon.svg`, silent-buffer audio unlock, `PHRASE_AUDIO` MP3s, per-state frogs, cycle pills, glow dots, `ff.timer` localStorage resume, fresh-start lily pad button in timer card footer. Lines 207–208 = drift fix.
- **Frog Assets**: `images/` — 4 phase frogs; 3 square (1024×1024), long-break landscape (1504×1108, top-crop risk).
- **Images & Media**: `images/` (23 files) + `uploads/` (28 files); `screenshots/` (9 files); `frog-face.png` is JPEG bytes under a .png name.
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup.
- **Diagnostic Harness**: `diag.html` (2KB) — fetch/decode/report audio page; retention decision open.
- **Backend**: `server.js` (5KB) static server with optional ElevenLabs TTS + caching; `package.json` (0KB); `package-lock.json` (29KB); `node_modules/` (71 files).
- **Scripts**: `scripts/` (5 files) — `generate-will-clips.js` (production), `generate-more-clips.js` (candidate menu), 3 legacy generators.
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB, post-launch source of truth); `TTS-SETUP.md` (4KB, stale — rewrite or delete).
- **Deployment manifest** (`publish_scope_v1`, workspace mode): `index.html`, `audio/`, `images/favicon.svg`, `images/frog-focus-mark-1-1111.png`, `images/frog-focus-mark-1.png`, `images/frog-hero.png`, `images/frog-timer.png`.

## Key Decisions Made
- **Fresh-start shipped as a lily pad button** (per KR's explicit ask), clearing timer/cycle/saying state while preserving settings + streak. Timer-resume confusion is now fully resolved as a product feature with a control.
- **KR approved the VPS install** ("Go ahead — you have my approval"); CEO proceeding with deploy even though GitHub push remains read-only.
- **Timer resume is a feature, not a bug** — localStorage save/restore of `ff.timer`.
- **Emporium: explore only, don't publish yet**; the shareable link is the available asset, no code change needed.
- **Drift fix shipped via CSS**, not asset replacement; confirmed by KR.
- **CEO = Vincent** (project manager); KR = project owner; Koba = developer.
- **GitHub token scope is `repo` only** — the stated deploy blocker; zip/direct-copy is the zero-GitHub alternative.
- **Long-break frog top-crop is an asset problem**, separate from drift; Zara redraw proposed, not greenlit.
- **Domain locked: `frogfocus.live`**; sandbox server paid ($36/yr).
- Closed: clock/logo saga (inline SVG @ 11:11, `?v=6`), platform 405s, audio saga, frog-drift glitch, timer-resume question.

## Pending Decisions
- **Long-break frog asset**: Zara redraw vs. crop-to-square 1024×1024 vs. leave as-is (CSS masks drift).
- **Deploy route**: direct copy/zip to the reachable VPS now vs. wait for GitHub push fix → sandbox.
- **`frogfocus.live` flip timing**: immediately via zip/direct copy vs. after sandbox deploy stable.
- **GitHub account/token details**: `repo` scope, expiration (no-expiry recommended).
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
- [x] **Fresh-start lily pad button built, published, KR-approved** (clears `ff.timer`/`ff.cycleDone`/`ff.sayingIdx`; keeps settings + streak)
- [ ] **CEO: deploy app to `frogfocus.vps.empir3.com`** — copy files, install deps, start persistent service; verify serving current build (incl. fresh-start); ping KR
- [ ] KR: confirm fresh-start on the public link using the test protocol (resume → reload → fresh start)
- [ ] Decide long-break frog asset: Zara redraw vs. crop-to-square vs. as-is
- [ ] KR pick deploy route: direct copy/zip vs. GitHub push
- [ ] KR finish GitHub account/token: `repo` scope, expiration set
- [ ] Brief Koba: Five Page Edits + asset decision + `frog-face.png` re-encode + flag unification + `diag.html`
- [ ] Re-encode `frog-face.png` to true PNG
- [ ] Live check: timer face in ring + cycle-pill wrap
- [ ] Flip `frogfocus.live` once deploy is stable
- [ ] Cleanup: legacy clips, stale `TTS-SETUP.md`, shipping-music decision
- [ ] Zara design QA deep pass (reschedule)

## Opportunities
1. **Finish the VPS deploy without GitHub.** The server is reachable and empty, KR has approved the install, and the recipe is known (copy → npm install → persistent service). Direct copy/zip removes the read-only-token blocker entirely and puts the current build (with fresh-start) on `frogfocus.vps.empir3.com` — the fastest credible path to `frogfocus.live`.
2. **One publish cycle ships the polish bundle.** Fold KR's Five Page Edits, the `frog-face.png` re-encode, and the timer-face live check into the next publish alongside the VPS deploy — one test round, no v1.0→v1.1 churn on a single-page site.
3. **Emporium as free distribution, zero code.** Borgo's build proves outside work gets listed; Frog Focus's public link is already shareable, so when KR is ready the admin can feature it without the VPS or any code change — worth circling back post-launch.

## Next Steps
- **CEO/Vincent:** complete the VPS deploy (copy files, install deps, persistent service), verify `frogfocus.vps.empir3.com` serves the current build, ping KR; brief Koba on the queued polish bundle.
- **Koba:** execute Five Page Edits (dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy); re-encode `frog-face.png`; live-check timer face.
- **KR:** run the fresh-start test protocol on the public link; pick the deploy route (direct copy/zip now vs. GitHub push); finalize GitHub token details in parallel.
- **Post-launch:** flip `frogfocus.live`, revisit Emporium listing, cleanup, and Zara's deep design QA pass.

---
*Last updated: 2026-08-17T13:57Z*