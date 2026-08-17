# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator.
- Positioning locked: a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice locked: Will (Relaxed Optimist), warm American male.
- Post-launch roadmap (`FROG-FOCUS-ROADMAP.md`): The Focus Pond, ambient touches, second frog friend, daily streak, pre-focus checklist.
- **Active mission: get Frog Focus live on `frogfocus.live`** — feature work is done; remaining: the deploy route, final polish.

## Current Status
- ✅ **Frog-drift glitch FIXED, republished, confirmed.** Developer changed `index.html` lines 207–208 from `width:auto` to `width:clamp(104px,20vw,132px);object-fit:contain` — all frogs now render in a consistent square box, intro drift gone. KR confirmed: **"it worked thanks1."**
- ✅ **No outstanding edit from KR.** The "one more thing" KR flagged WAS the long-break frog glitch — KR described it, CEO + Koba root-caused and fixed the drift (lines 207–208), republished, and KR confirmed **"it worked thanks1."** The later "no not yet. thanks." was KR declining the zip→Netlify packaging offer, not withholding an edit.
- 🔄 **VPS sync attempted, completion unconfirmed.** KR approved ("Go ahead — you have my approval") and asked CEO to sync the workspace to `frogfocus.vps.empir3.com` and verify the build. CEO committed — "Let me check your server and get this synced" / "I'll let you know the moment it's ready" — but **no completion ping sent.** KR: "i'll wait for your ping."
- 🚧 **GitHub push access still read-only** (`repo` scope only) — the stated blocker for the full deploy. CEO pings KR the moment the fix lands.
- ⚠️ **Latent asset issue:** long-break frog is landscape (1504×1108), off-center subject, raised hands touching the top edge of the source art. KR says it doesn't look cropped on their end, but the risk remains. Zara redraw offered, not yet approved.
- 🗺️ **Two deploy routes:** (1) wait for GitHub push fix → sandbox; (2) zip → Netlify Drop/Cloudflare Pages → `frogfocus.live` (zero GitHub dependency). KR's "Go ahead" signals appetite to go live now; zip route stays open.
- **Live now:** current build on the free Empir3 link — 11:11 clock, no debug banner, drift fix applied.
- **Queued polish** (`recommendations_v1`): KR's Five Page Edits (dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy); `frog-face.png` re-encode (JPEG bytes under .png name); timer-face live check in Chrome.

## Files & Structure
- **Core Page**: `index.html` (75KB) — inline SVG clock @ 11:11, `favicon.svg`, silent-buffer audio unlock, `PHRASE_AUDIO` MP3s, per-state frogs, cycle pills, glow dots. **Lines 207–208 carry the drift fix.**
- **Frog Assets**: `images/` — 4 phase frogs; 3 square (1024×1024), long-break landscape (1504×1108, off-center, top-crop risk).
- **Images**: `images/` (23 files) + `uploads/` (27 files); `frog-face.png` is JPEG bytes under a .png name.
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy (Antoni, Josh, earlier Adam, Charlie) awaiting cleanup.
- **Diagnostic Harness**: `diag.html` (2KB) — fetch/decode/report page; retention decision open.
- **Backend**: `server.js` (5KB) static server; `package.json` (0KB); `package-lock.json` (29KB); `node_modules/` (71 files).
- **Scripts**: `scripts/` (5 files) — `generate-will-clips.js` (production), `generate-more-clips.js` (candidate menu), 3 legacy generators.
- **Screenshots**: `screenshots/` (9 files).
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB, post-launch source of truth); `TTS-SETUP.md` (4KB, stale — rewrite or delete).
- **Deployment manifest** (`publish_scope_v1`, workspace mode): `index.html`, `audio/`, `images/favicon.svg`, `images/frog-focus-mark-1-1111.png`, `images/frog-focus-mark-1.png`, `images/frog-hero.png`, `images/frog-timer.png` — the zip/sync contents.

## Key Decisions Made
- **Drift fix shipped via CSS, not asset replacement** — square box + `object-fit:contain`; confirmed by KR.
- **KR approved the sync attempt** ("Go ahead — you have my approval"); CEO committed; completion ping owed.
- **CEO = Vincent** ("the CEO of this little operation"). KR = user/project owner.
- **No edit blockers — deploy route is the only gate.** KR's "one more thing" was the frog glitch, now fixed and confirmed.
- **GitHub token scope is `repo` only** — read-only push is the deploy blocker; zip route is the zero-GitHub alternative.
- **Long-break frog top-crop is an asset problem**, separate from the drift; Zara redraw proposed, not greenlit.
- **Domain locked: `frogfocus.live`**; sandbox server paid ($36/yr).
- Closed: clock/logo saga (inline SVG @ 11:11, `?v=6`), platform 405s (3 reports), audio saga (silent-buffer unlock + `diag.html`), frog-drift glitch (fixed, published, confirmed).

## Pending Decisions
- ~~KR's undisclosed "one more thing"~~ — resolved: it was the frog glitch, fixed + confirmed. No open edit from KR.
- **Long-break frog asset**: Zara redraw with frog fully in frame vs. crop/recenter to square 1024×1024 vs. leave as-is (CSS masks drift).
- **Deploy route**: wait for GitHub push fix → sandbox vs. zip → Netlify/Cloudflare now.
- **VPS sync completion**: confirm `frogfocus.vps.empir3.com` serves the current build (CEO ping pending).
- **When to flip `frogfocus.live`** — immediately via zip, or after sandbox deploy is stable.
- **KR: GitHub account (if absent), `repo` scope, token expiration** (no-expiry recommended).
- **Queued-polish timing**: ship with next publish vs. post-launch (Five Page Edits, `frog-face.png` re-encode, timer-face check).
- `diag.html` disposition; `voiceOn`/`soundOn` flag unification; Zara QA reschedule; shipping-music decision; cleanup (legacy clips, stale `TTS-SETUP.md`).

## Tasks
- [x] Voice pipeline complete: ElevenLabs validated, Will locked, 5 production clips
- [x] Roadmap written; launch scope locked
- [x] Audio saga closed: root-caused, silent-buffer unlock + diagnostics shipped
- [x] SVG clock @ 11:11 + `favicon.svg`; debug banner stripped; `?v=6` published
- [x] Platform 405 issues closed (3 reports)
- [x] Domain acquired (`frogfocus.live`); sandbox charge confirmed
- [x] GitHub connected (read-only)
- [x] Frog-drift glitch root-caused (landscape vs. square + off-center subject); fix applied (lines 207–208), republished, KR confirmed ("it worked thanks1")
- [x] KR's "one more thing" resolved — it was the frog glitch; fixed, republished, confirmed ("it worked thanks1")
- [ ] CEO complete VPS sync to `frogfocus.vps.empir3.com` + verify deployment; ping KR
- [ ] Decide long-break frog asset: Zara redraw vs. crop-to-square vs. as-is
- [ ] KR pick deploy route: GitHub push vs. zip → Netlify/Cloudflare
- [ ] KR finish GitHub account/token: `repo` scope, expiration set
- [ ] On push access: create repo, push `publish_scope_v1` files, deploy sandbox, hand over link
- [ ] KR test round on live URL: audio, clock, layout, frog intro (drift confirmed gone)
- [ ] Brief Koba: Five Page Edits + asset decision + `frog-face.png` re-encode + flag unification + `diag.html`
- [ ] Re-encode `frog-face.png` to true PNG
- [ ] Live check: timer face in ring + cycle-pill wrap
- [ ] Cleanup: legacy clips, stale `TTS-SETUP.md`, shipping-music decision
- [ ] Zara design QA deep pass (reschedule)

## Opportunities
1. **One asset pass clears the entire artifact class.** Crop/recenter the long-break frog to square 1024×1024 — or have Zara redraw it fully in frame. Kills the top-cropped hands and any future framing pop; all four frogs then match in treatment. Ships with the next publish.
2. **Ship `frogfocus.live` today via the zip route.** The build is proven (drift fix confirmed) and KR has already signaled approval ("Go ahead"). Dragging the 7-item `publish_scope_v1` folder onto Netlify Drop/Cloudflare Pages puts the real domain up immediately with zero GitHub dependency — real-browser QA can start under the final URL now while push access catches up.
3. **Bundle every remaining edit into one publish cycle.** Five Page Edits + `frog-face.png` re-encode + timer-face check all ship together — one test round, one domain flip, no v1.0→v1.1 churn on a single-page site, and the first public URL represents the final product.

## Next Steps
- **CEO: finish and confirm the VPS sync** — ping KR when `frogfocus.vps.empir3.com` serves the current build; keep watching for the GitHub push fix.
- **KR: pick the deploy route** — zip → Netlify/Cloudflare (immediate) vs. sandbox via GitHub push (waiting).
- **KR: complete GitHub token** (`repo` scope, expiration set) in parallel — removes the last infrastructure blocker.
- Once the edit lands and the route is chosen: batch all queued polish, publish, run KR's test round on the live URL, flip `frogfocus.live`, run cleanup, and schedule Zara's deep pass.

---
*Last updated: 2026-08-17T05:26Z*