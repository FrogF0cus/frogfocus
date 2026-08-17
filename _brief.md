# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioned as a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice locked: Will (Relaxed Optimist), warm American male.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): The Focus Pond, ambient touches, second frog friend, daily streak, pre-focus checklist.
- **Active mission: get Frog Focus live on `frogfocus.live`** — feature work is done; remaining: deploy route + final polish.

## Current Status
- ✅ **Timer-resume question answered.** KR asked if the link "not always starting at the beginning timer screen" was a browser cache issue. CEO root-caused it: **not cache — the app saves `ff.timer` state to localStorage every couple seconds and restores it on load** (the resume feature). KR declined a force-clear control for now: **"no it's ok for now."**
- ✅ **Emporium feasibility explored.** KR saw a build by "Borgo" at the Emporium and asked if Frog Focus could list there (explicitly: "dont do it yet. just want to see if it's possible"). CEO found **no tool that posts into the Emporium** and no verifiable publish path — but Frog Focus's **existing public link is shareable anywhere**, so the Emporium can point to it without the VPS.
- ✅ **Shipping-music attribution corrected.** CEO retracted an unverifiable "friendly gesture" paraphrase. Record confirms the link reached the Emporium admin with KR's note attached, marked as a friendly gesture, but **exact wording and an explicit "from KR" tag are not verifiable.** CEO offered a raw send-record dig if it matters.
- ✅ **Frog-drift glitch fixed, republished, confirmed** — CSS change at `index.html` lines 207–208 (`width:clamp(104px,20vw,132px);object-fit:contain`); KR: "it worked thanks1."
- 🔄 **VPS sync attempted, completion unconfirmed** — CEO owes KR a ping when `frogfocus.vps.empir3.com` serves the current build.
- 🚧 **GitHub push access still read-only** (`repo` scope only) — the stated deploy blocker.
- ⚠️ **Long-break frog** is landscape (1504×1108), off-center subject, hands touch top edge; Zara redraw offered, not approved.
- 🗺️ **Two deploy routes:** (1) GitHub push fix → sandbox; (2) zip → Netlify Drop/Cloudflare Pages → `frogfocus.live` (zero GitHub dependency).
- **Queued polish** (`recommendations_v1`): KR's Five Page Edits (dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy); `frog-face.png` re-encode (JPEG bytes under .png name); timer-face live check in Chrome.

## Files & Structure
- **Core Page**: `index.html` (75KB) — inline SVG clock @ 11:11, `favicon.svg`, silent-buffer audio unlock, `PHRASE_AUDIO` MP3s, per-state frogs, cycle pills, glow dots. Lines 207–208 = drift fix. Also contains the `ff.timer` localStorage save/restore (resume feature).
- **Frog Assets**: `images/` — 4 phase frogs; 3 square (1024×1024), long-break landscape (1504×1108, top-crop risk).
- **Images**: `images/` (23 files) + `uploads/` (28 files); `frog-face.png` is JPEG bytes under a .png name; `screenshots/` (9 files).
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup.
- **Diagnostic Harness**: `diag.html` (2KB) — fetch/decode/report audio page; retention decision open.
- **Backend**: `server.js` (5KB) static server; `package.json` (0KB); `package-lock.json` (29KB); `node_modules/` (71 files).
- **Scripts**: `scripts/` (5 files) — `generate-will-clips.js` (production), `generate-more-clips.js` (candidate menu), 3 legacy generators.
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB, post-launch source of truth); `TTS-SETUP.md` (4KB, stale — rewrite or delete).
- **Deployment manifest** (`publish_scope_v1`, workspace mode): `index.html`, `audio/`, `images/favicon.svg`, `images/frog-focus-mark-1-1111.png`, `images/frog-focus-mark-1.png`, `images/frog-hero.png`, `images/frog-timer.png`.

## Key Decisions Made
- **Timer resume is a feature, not a bug** — localStorage save/restore of `ff.timer`; KR declined a reset control for now.
- **Emporium: explore only, don't publish yet** — KR explicit; the shareable public link is the available asset, no code change needed.
- **CEO corrected the record** on the shipping-music attribution rather than confirming unverifiable details.
- **Drift fix shipped via CSS, not asset replacement** — square box + `object-fit:contain`; confirmed by KR.
- **KR approved the VPS sync attempt** ("Go ahead — you have my approval"); completion ping owed.
- **CEO = Vincent** ("the CEO of this little operation"). KR = user/project owner.
- **GitHub token scope is `repo` only** — read-only push is the deploy blocker; zip route is the zero-GitHub alternative.
- **Long-break frog top-crop is an asset problem**, separate from drift; Zara redraw proposed, not greenlit.
- **Domain locked: `frogfocus.live`**; sandbox server paid ($36/yr).
- Closed: clock/logo saga (inline SVG @ 11:11, `?v=6`), platform 405s (3 reports), audio saga (silent-buffer unlock + `diag.html`), frog-drift glitch (fixed, published, confirmed).

## Pending Decisions
- **Force-clear/reset UX** for the resume feature: add a "Start Fresh" affordance vs. leave as-is (KR deferred — revisit at/after launch).
- **Emporium listing**: revisit when KR is ready; optional raw send-record dig for attribution.
- **Long-break frog asset**: Zara redraw vs. crop-to-square 1024×1024 vs. leave as-is (CSS masks drift).
- **Deploy route**: wait for GitHub push fix → sandbox vs. zip → Netlify/Cloudflare now.
- **VPS sync completion**: confirm `frogfocus.vps.empir3.com` serves the current build (CEO ping pending).
- **`frogfocus.live` flip timing**: immediately via zip vs. after sandbox deploy stable.
- **GitHub account/token details**: `repo` scope, expiration (no-expiry recommended).
- **Queued-polish timing**: ship with next publish vs. post-launch.
- `diag.html` disposition; `voiceOn`/`soundOn` flag unification; Zara QA reschedule; cleanup (legacy clips, stale `TTS-SETUP.md`). No open edit from KR — the "one more thing" was the frog glitch (fixed + confirmed).

## Tasks
- [x] Voice pipeline complete: ElevenLabs validated, Will locked, 5 production clips
- [x] Roadmap written; launch scope locked
- [x] Audio saga closed: root-caused, silent-buffer unlock + diagnostics shipped
- [x] SVG clock @ 11:11 + `favicon.svg`; debug banner stripped; `?v=6` published
- [x] Platform 405 issues closed (3 reports)
- [x] Domain acquired (`frogfocus.live`); sandbox charge confirmed
- [x] GitHub connected (read-only)
- [x] Frog-drift glitch fixed (lines 207–208), republished, KR confirmed
- [x] Timer-resume question answered (localStorage feature, not cache); KR declined reset control
- [x] Emporium feasibility checked (no direct publish path; public link shareable); KR said don't do it yet
- [x] Shipping-music attribution corrected; delivery confirmed, exact wording/"from KR" unverified
- [ ] CEO complete VPS sync to `frogfocus.vps.empir3.com` + verify deployment; ping KR
- [ ] Decide long-break frog asset: Zara redraw vs. crop-to-square vs. as-is
- [ ] KR pick deploy route: GitHub push vs. zip → Netlify/Cloudflare
- [ ] KR finish GitHub account/token: `repo` scope, expiration set
- [ ] On push access: create repo, push `publish_scope_v1` files, deploy sandbox, hand over link
- [ ] KR test round on live URL: audio, clock, layout, frog intro (drift confirmed gone)
- [ ] Decide force-clear/reset UX (deferred by KR; revisit at launch)
- [ ] Revisit Emporium listing when KR is ready (optional)
- [ ] Brief Koba: Five Page Edits + asset decision + `frog-face.png` re-encode + flag unification + `diag.html`
- [ ] Re-encode `frog-face.png` to true PNG
- [ ] Live check: timer face in ring + cycle-pill wrap
- [ ] Cleanup: legacy clips, stale `TTS-SETUP.md`, shipping-music decision
- [ ] Zara design QA deep pass (reschedule)

## Opportunities
1. **Sell the resume behavior instead of hiding it.** The localStorage save/restore is shipped and now explained — it's a differentiator ("picks up right where you left off"). Add a small "Start Fresh" reset control and one launch-copy line. Zero new architecture; one small UI affordance removes the only confusion point KR hit.
2. **Emporium is a free distribution channel.** Borgo's build proves outside work gets listed there. Frog Focus's public link is shareable now, so when KR is ready, the admin can feature it with no code change and no VPS dependency — worth circling back to post-launch.
3. **One publish cycle ships everything.** Bundle the Five Page Edits, `frog-face.png` re-encode, and timer-face live check into the same deploy that flips `frogfocus.live` — one test round, no v1.0→v1.1 churn on a single-page site.

## Next Steps
- **CEO:** finish + confirm the VPS sync (ping KR when `frogfocus.vps.empir3.com` serves the current build); keep watching for the GitHub push fix; note the Emporium option for when KR is ready.
- **KR:** pick the deploy route (zip → Netlify/Cloudflare for immediate `frogfocus.live` vs. sandbox via GitHub push); finish GitHub token details (`repo` scope, expiration) in parallel.
- **Post-launch:** revisit force-clear/reset UX, Emporium listing, cleanup, and Zara's deep design QA pass.

---
*Last updated: 2026-08-17T12:03Z*