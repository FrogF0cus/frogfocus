# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice: warm, encouraging American male — **Will (Relaxed Optimist)**, confirmed by KR by ear.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): **The Focus Pond**, ambient touches, second frog friend, daily streak, pre-focus checklist.
- **Active mission: get Frog Focus live.** Two viable routes exist — sandbox VPS (needs GitHub push access) or zip → Netlify Drop/Cloudflare Pages (immediate, hosts under `frogfocus.live`). Feature work declared done, but KR has one more edit queued before publishing.

## Current Status
- **KR spotted "one more thing that needs to be edited"** — unspecified as of this brief. CEO is holding ("no zip yet") until KR shares it.
- **Two deployment routes on the table:**
  1. **Sandbox VPS** (`frogfocus.vps.empir3.com`): $36/yr paid, credits at $26.64. Blocked on CEO's read-only GitHub access — `repo` scope needed to push files.
  2. **Zip → Netlify Drop / Cloudflare Pages** (newly explored): CEO zips the folder, KR drags it onto either free host, live under `frogfocus.live` with no code and no GitHub dependency. CEO confirmed "the zip option's always there."
- **Route decision pending.** KR asked "what if we go another route?"; CEO laid out pros/cons (sandbox = fast, direct hosting but keeps `.vps.` address; own domain = cleaner and permanent, one extra setup step) and recommended starting on the sandbox. KR has not chosen.
- **GitHub**: one-tap connect card presented to KR. KR likely needs to create a free GitHub account (2 minutes). Only `repo` scope is required — no `workflow`, `admin`, or profile/email access. Token expiration: CEO recommends **no expiration** (90 days absolute minimum, 1 year acceptable).
- **Sandbox provisioning honestly unconfirmed.** CEO: "I don't have a live status I can honestly report on that server, and I don't want to feed you guesses." A previous Empir3 tooling attempt errored ("work was not marked complete"); the deploy tool CEO can actually drive needs Frog Focus in a GitHub repo.
- **Credits confirmed at $26.64** — the $36 server charge did go through, so the sandbox likely exists.
- **Domain `frogfocus.live` owned** and is the eventual target; CEO recommends starting on the sandbox for a one-page site.
- CEO promised to **ping KR the moment GitHub push access is live** — KR is awaiting that ping.
- Clock/logo saga closed — hand-built inline SVG @ 11:11 + `images/favicon.svg` live, debug banner stripped, `?v=6` published with KR's approval.
- Platform 405 issues closed (3 reports); audio saga closed (silent-buffer unlock + `diag.html` shipped, all clips decode clean).
- **Queued polish (`recommendations_v1`):** KR's Five Page Edits, `frog-face.png` re-encode (JPEG bytes under .png name), timer-face live check.
- QA gate (KR's mobile + multi-browser round) can run against whichever URL goes live first.

## Files & Structure
- **Core Page**: `index.html` (75KB) — inline SVG clock @ 11:11, favicon → `images/favicon.svg`, no debug banner, silent-buffer audio unlock, on-screen diagnostics, `PHRASE_AUDIO` on real `.mp3`s, per-state frog images, cycle-pill labels, soft-glow dots.
- **Images**: `images/` (23 files) — `favicon.svg`, frog-focus-mark variants, hero/timer art. `frog-face.png` still JPEG bytes under a .png name. `uploads/` (27 files, all images).
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy files (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup.
- **Diagnostic Harness**: `diag.html` (2KB) — fetch/decode/report page; retention decision open.
- **Backend**: `server.js` (5KB) static server; `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Scripts**: `scripts/` (5 files) — `generate-will-clips.js` (production), `generate-more-clips.js` (candidate menu), 3 legacy generators.
- **Screenshots**: `screenshots/` (9 files) — bridge debugging captures.
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB) — post-launch source of truth; `TTS-SETUP.md` (4KB) — stale, rewrite or delete.
- **Deployment manifest**: `publish_scope_v1` (workspace mode) — exactly 7 items: `index.html`, `audio/`, `images/favicon.svg`, `images/frog-focus-mark-1-1111.png`, `images/frog-focus-mark-1.png`, `images/frog-hero.png`, `images/frog-timer.png`. This is the zip/sync contents.

## Key Decisions Made
- **Alternative hosting route surfaced: zip → Netlify Drop / Cloudflare Pages.** KR asked for alternatives; CEO confirmed the zip option is always available. This route can put `frogfocus.live` live today with zero GitHub dependency — decision is KR's.
- **Sandbox VPS "frogfocus" previously greenlit** ($36/yr paid, credits ~$26.64) — now one of two live options, blocked on GitHub push access.
- **GitHub connected, but read-only.** `repo` scope only needed (no `workflow`/`admin`); CEO recommended no-expiry token.
- **One-tap GitHub connect card presented**; KR may need to create a free GitHub account.
- **CEO committed to honest status reporting** — no guesses about server state.
- **Domain locked: `frogfocus.live`** — acquired; `frogfocus.com` unavailable; `frog-focus.com` rejected (hyphen trips spoken sharing).
- Clock fix: hand-built inline SVG @ 11:11 + `images/favicon.svg`; debug banner stripped; republished with KR's explicit approval (`?v=5` → `?v=6`).
- Earlier: audio root cause closed; launch-what-we-have scope locked; Will voice locked; publish scope v1 locked; 405s closed; bridge `evaluate` enabled; Zara's deep pass deferred (Grok route down).

## Pending Decisions
- **What is KR's newly spotted edit?** — unspecified; CEO holding until shared.
- **Route choice: sandbox VPS vs zip → Netlify/Cloudflare.** Zip route could be live under `frogfocus.live` immediately; sandbox route waits on GitHub push access.
- **KR: create GitHub account (if absent) and grant `repo` scope** — plus confirm token expiration (no-expiry recommended).
- **Verify sandbox actually provisioned** — CEO honestly can't confirm; prior tooling attempt errored.
- **When to switch `frogfocus.live` over** — immediately via Netlify/Cloudflare, or after sandbox is stable.
- **Queued polish timing: launch vs. v1.1?** Five Page Edits + the new edit, `frog-face.png` re-encode, timer-face check.
- `diag.html` disposition; unify `voiceOn`/`soundOn` flags; Zara QA reschedule; shipping-music decision; cleanup (legacy clips, stale `TTS-SETUP.md`).

## Tasks
- [x] Voice pipeline complete: ElevenLabs validated, Will chosen, 5 clips generated, real `.mp3`s served
- [x] Roadmap written; launch-what-we-have scope locked
- [x] Audio saga closed: root-caused, silent-buffer unlock + diagnostics shipped
- [x] Hand-built inline SVG clock @ 11:11; `images/favicon.svg`; debug banner stripped
- [x] KR approval + republish (`?v=6`)
- [x] Platform 405 issues reported and closed (3 reports)
- [x] Domain selected and grabbed (`frogfocus.live`)
- [x] Credits topped up; $36 server charge confirmed (~$26.64 remaining)
- [x] Alternative route surfaced: zip → Netlify Drop / Cloudflare Pages
- [x] GitHub connected (read-only) — CEO can't push yet
- [ ] KR shares the newly spotted edit (CEO holding)
- [ ] KR decides route: wait for GitHub push fix vs zip → Netlify/Cloudflare now
- [ ] KR creates GitHub account (if needed) + grants `repo` scope; confirms token expiration
- [ ] If zip route: CEO zips Frog Focus, KR drops onto Netlify/Cloudflare, verify `frogfocus.live`
- [ ] If sandbox route: verify provisioning, push files (via GitHub), verify `frogfocus.vps.empir3.com`
- [ ] KR's mobile + multi-browser test round on whichever URL goes live (audio, SVG clock, layout)
- [ ] Decide queued-polish timing; brief Koba (Five Page Edits + new edit + `frog-face.png` re-encode + flag unification + `diag.html` disposition)
- [ ] Re-encode `frog-face.png` to a true PNG
- [ ] Live check: timer face in ring + cycle-pill wrap (batch with test round)
- [ ] Cleanup: legacy clips, stale `TTS-SETUP.md`, shipping-music decision
- [ ] Zara design QA deep pass — reschedule when Grok recovers

## Opportunities
1. **Zip → Netlify Drop puts `frogfocus.live` live today.** Zero GitHub dependency, zero waiting on push access — KR drags the folder onto Netlify/Cloudflare and the site is public. The QA round can run immediately, while GitHub access catches up in the background for the sandbox/iterate loop.
2. **Grant `repo` scope + no-expiry token in one step.** A single KR action permanently unblocks the GitHub push path — no 30-day reconnect loop, and the sandbox deploy stops being dependent on the direct-sync route. Keeping both routes alive hedges against any single point of failure.
3. **Fold the new edit into the first publish.** KR's newly spotted edit and the queued Five Page Edits can ship together in one cycle — whether that's Netlify, the sandbox, or both — avoiding a v1.0→v1.1 churn on a single-page site.

## Next Steps
- **KR: describe the newly spotted edit** so it can be folded into the next publish — CEO holding until then.
- **KR: pick a route** — zip → Netlify/Cloudflare (immediate, hosts `frogfocus.live`) or sandbox via GitHub push (waiting on `repo` scope).
- **CEO: prepare the zip + exact Netlify Drop/Cloudflare Pages steps** the moment KR decides; keep watching for GitHub push access to ping KR.
- **KR: create GitHub account + grant `repo` scope in parallel** if the GitHub path is to remain viable.
- **Run KR's test round on the live URL**: audio, SVG clock, layout across mobile + desktop.
- Decide queued-polish timing; flip domain officially once QA passes; then Zara's deep pass, cleanup, shipping-music decision.

---
*Last updated: 2026-08-16T23:36Z*