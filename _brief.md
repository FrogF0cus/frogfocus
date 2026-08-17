# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioned as a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice locked: Will (Relaxed Optimist), warm American male.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): The Focus Pond, ambient touches, second frog friend, daily streak, pre-focus checklist.
- **Active mission: get Frog Focus live on `frogfocus.live`** — fresh-start UX shipped; VPS deploy is now in flight.

## Current Status
- 🚀 **VPS deploy IN PROGRESS.** KR explicitly approved ("Go ahead — you have my approval"); CEO is executing now — reading `server.js`/`package.json` and packaging the workspace for copy/install/persistent-service on `frogfocus.vps.empir3.com` (Node serves the pomodoro page + optional ElevenLabs TTS with caching). VPS confirmed live but empty ("nothing installed" page).
- 🔄 **GitHub token resolved on the access side**: KR's screenshot confirms **`repo` scope is checked** — full control of private repos, covers creating + pushing. `write:packages` NOT needed (package registry only). Remaining blocker: **local repo exists but has no remote** — no Frog Focus repo created on GitHub yet.
- ✅ **Fresh-start reset SHIPPED and published.** Lily pad button (flat, filled, inline SVG) in the timer card footer next to "Timer settings"; clears `ff.timer`, `ff.cycleDone`, `ff.sayingIdx`; keeps settings + `ff.streak`. Live at **https://usercontent.empir3.com/p/a3adb503b8/index.html**. Test protocol: pomodoro → reload → resumes; Fresh start → snaps to 25:00, zero pads, stays fresh on reload.
- ✅ **Timer-resume question closed** — localStorage save/restore of `ff.timer` is a feature, now with a control.
- ✅ **Frog-drift glitch fixed**, republished, KR confirmed ("it worked thanks1") — CSS at `index.html` lines 207–208.
- ✅ **Emporium feasibility explored** — no direct publish path; shareable link is the asset. KR: "dont do it yet."
- ✅ **Shipping-music attribution corrected** — exact wording + "from KR" tag unverified.
- ⚠️ **Long-break frog** still landscape (1504×1108), off-center subject, top-crop risk; Zara redraw offered, not approved.
- **Queued polish** (`recommendations_v1`): KR's Five Page Edits (dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy); `frog-face.png` re-encode (JPEG bytes under .png name); timer-face live check in Chrome.
- **Publish manifest locked** (`publish_scope_v1`, workspace mode): `index.html`, `audio/`, `images/favicon.svg`, `images/frog-focus-mark-1-1111.png`, `images/frog-focus-mark-1.png`, `images/frog-hero.png`, `images/frog-timer.png`.

## Files & Structure
- **Core Page**: `index.html` (76KB) — inline SVG clock @ 11:11, `favicon.svg`, silent-buffer audio unlock, `PHRASE_AUDIO` MP3s, per-state frogs, cycle pills, glow dots, `ff.timer` localStorage resume, fresh-start lily pad button. Lines 207–208 = drift fix.
- **Frog Assets**: `images/` (23 files) — 4 phase frogs; 3 square (1024×1024), long-break landscape (1504×1108, top-crop risk); `frog-face.png` is JPEG bytes under a .png name.
- **Images & Media**: `uploads/` (29 files); `screenshots/` (9 files).
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup.
- **Diagnostic Harness**: `diag.html` (2KB) — fetch/decode/report audio page; retention decision open.
- **Backend**: `server.js` (5KB) static server with optional ElevenLabs TTS + caching; `package.json` (0KB); `package-lock.json` (29KB); `node_modules/` (71 files).
- **Scripts**: `scripts/` (5 files) — `generate-will-clips.js` (production), `generate-more-clips.js` (candidate menu), 3 legacy generators.
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB, post-launch source of truth); `TTS-SETUP.md` (4KB, stale — rewrite or delete).
- **VCS**: Local git repo present, **no remote configured** — the GitHub blocker.

## Key Decisions Made
- **KR approved the VPS install** ("Go ahead — you have my approval"); CEO proceeding with direct copy/zip deploy — GitHub is no longer on the critical path.
- **GitHub token scope confirmed `repo`-only** — sufficient for creating/pushing; `write:packages` explicitly not needed.
- **Fresh-start shipped as a lily pad button** (per KR's explicit ask), clearing timer/cycle/saying state while preserving settings + streak.
- **Timer resume is a feature, not a bug** — localStorage save/restore of `ff.timer`.
- **Emporium: explore only, don't publish yet**; shareable link is the available asset.
- **Drift fix shipped via CSS**, not asset replacement; confirmed by KR.
- **CEO = Vincent** (project manager); KR = project owner; Koba = developer.
- **Long-break frog top-crop is an asset problem**, separate from drift; Zara redraw proposed, not greenlit.
- **Domain locked: `frogfocus.live`**; sandbox server paid ($36/yr).
- Closed: clock/logo saga (inline SVG @ 11:11, `?v=6`), platform 405s, audio saga, frog-drift glitch, timer-resume question.

## Pending Decisions
- **Deploy route**: direct copy/zip to the reachable VPS now (in progress, KR-approved) vs. GitHub push once a repo exists.
- **Long-break frog asset**: Zara redraw vs. crop-to-square 1024×1024 vs. leave as-is (CSS masks drift).
- **`frogfocus.live` flip timing**: immediately via zip/direct copy vs. after sandbox deploy stable.
- **GitHub repo creation**: create the Frog Focus repo (CEO has `repo`-scope token) to unblock the standard path.
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
- [x] **Fresh-start lily pad button built, published, KR-approved**
- [x] **GitHub token access confirmed** — `repo` scope checked in KR's screenshot; `write:packages` not needed
- [ ] **CEO: complete the VPS deploy** — copy app files, install deps (`npm install`), start as persistent service; verify `frogfocus.vps.empir3.com` serves the current build (incl. fresh-start); ping KR
- [ ] KR: confirm fresh-start on the public link using the test protocol (resume → reload → fresh start)
- [ ] Optional: create GitHub repo (unblocks the standard push path in parallel)
- [ ] Decide long-break frog asset: Zara redraw vs. crop-to-square vs. as-is
- [ ] Brief Koba: Five Page Edits + asset decision + `frog-face.png` re-encode + flag unification + `diag.html`
- [ ] Re-encode `frog-face.png` to true PNG
- [ ] Live check: timer face in ring + cycle-pill wrap (Chrome)
- [ ] Flip `frogfocus.live` once deploy is stable
- [ ] Cleanup: legacy clips, stale `TTS-SETUP.md`, shipping-music decision
- [ ] Zara design QA deep pass (reschedule)

## Opportunities
1. **Finish the VPS deploy this session.** It's live, empty, KR-approved, and the recipe is known (copy → `npm install` → persistent service). A completed deploy puts the current build (with fresh-start) on `frogfocus.vps.empir3.com` and makes `frogfocus.live` flip a one-step decision — the fastest credible route to launch, zero GitHub dependency.
2. **One publish cycle ships the polish bundle.** Fold KR's Five Page Edits, the `frog-face.png` re-encode, and the timer-face live check into the next publish alongside the VPS deploy — one test round, no v1.0→v1.1 churn on a single-page site.
3. **Create the GitHub repo in parallel while the deploy runs.** The `repo`-scope token is confirmed; making a remote now restores the standard deploy path for future changes and removes the "no remote" blocker permanently — cheap insurance while the direct deploy proceeds.

## Next Steps
- **CEO/Vincent:** complete the direct VPS deploy in flight (copy files → install deps → persistent service), verify the served build, ping KR; optionally create the GitHub repo using the confirmed token; brief Koba on the polish bundle.
- **Koba:** execute Five Page Edits (dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy); re-encode `frog-face.png`; live-check timer face.
- **KR:** run the fresh-start test protocol on the public link; confirm the long-break frog decision; authorize `frogfocus.live` flip once the VPS deploy verifies.
- **Post-launch:** flip `frogfocus.live`, revisit Emporium listing, cleanup, and Zara's deep design QA pass.

---
*Last updated: 2026-08-17T16:05Z*