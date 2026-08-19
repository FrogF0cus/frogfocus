# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**; inspired by pomodorokitty.com, not a clone.
- Frog as a warm **friend/buddy** cheering the user on — the core differentiator. Positioned as a **productive tool**, not a toy; tagline "Slow down. Focus. Get the good stuff done."
- Voice locked: Will (Relaxed Optimist), warm American male.
- Audio must be reliable everywhere: desktop Chrome, Android Chrome, and mobile Safari — including background tabs and lock-screen.
- **Frog face asset must look right to KR** — this cycle's friction point; KR rejected intermediate recreations as "not great" and wants the attached `frog-face.png` used directly.

## Current Status
- 🟢 **LIVE and verified at scale.** `frogfocus.vps.empir3.com` serves the iPhone audio fix (`10083ba`): 132-file sync landed, `.env` preserved, service active, public bytes match.
- ✅ **Locked-screen toggle** confirmed as intended feature; frog live on all three of KR's devices.
- 🐸 **Frog-face asset saga (this cycle).** KR bounced twice between `frog-face.png` and `pasted-image-1787104140248.png`, rejecting intermediate recreations as "not great", then settled with **"want to just use this one"** — pointing back at `frog-face.png`. CEO **stopped** the long-running pixel-perfect SVG recreation mid-flight; 8+ new scripts saved (`scripts/decode_icon.py`, `scripts/map_icon.py`, `scripts/map2_icon.py`, +5 more).
- 📐 **Recreation work was technically strong before the stop:** silhouette overlap 0.977 (near-perfect shape), band color `#E3D7BD` confirmed, body structure resolved (green flanks + cream belly), icon-512 shows a bottom-crop composition, mouth is a wide chest smile, eye = full pupil + glint (no sclera). Work is saved but halted.
- ⚠️ **KR's two new issues from last cycle still lack details** — "It works but now there are 2 new issues"; specifics never arrived.
- 🎯 **Queued polish** (`recommendations_v1`, unchanged): KR's Five Page Edits (dark mode → frog green, "productive tool" copy, "the what", beverage line, recharge copy); `frog-face.png` re-encode (JPEG bytes under a .png name); timer-face live check in Chrome.

## Files & Structure
- **Core App** (single-page, no templates): `index.html` (104KB) — inline SVG clock @ 11:11, per-state frogs, cycle pills, `ff.timer` localStorage resume, fresh-start lily pad, single persistent audio element, inline script at lines 869–2205; `manifest.json` (1KB, PWA); `sw.js` (3KB, service worker).
- **Backend**: `server.js` (18KB) — static serving + ElevenLabs TTS proxy + suggestions inbox + push-key handling; `package.json`; `package-lock.json` (53KB); `node_modules/` (89 files, incl. `web-push`). 132 files synced on last deploy; `.env` preserved.
- **Frog Assets**: `images/` (28 files) — phase frogs, marks, hero, timer face, `favicon.svg`. **`frog-face.png` is JPEG bytes under a .png name** (re-encode queued). Candidate imports also live in `uploads/`: `frog-face.png` and `pasted-image-1787104140248.png` (36 files total in uploads/).
- **Icon Recreation Scripts** (new): `scripts/` (14 files, up from 6) — `decode_icon.py`, `map_icon.py`, `map2_icon.py`, +5 more from the halted pixel-measurement effort; produced measured geometry (0.977 silhouette overlap, `#E3D7BD` band color, feature point clouds). Disposition pending.
- **Audio**: `audio/` (29 files) — 5 production Will clips + candidate/legacy clips awaiting cleanup.
- **Media/Staging**: `uploads/` (36 files); `screenshots/` (27 files, up from 16); `data/` (0 files).
- **Diagnostic Harness**: `diag.html` (2KB) — audio fetch/decode/report page; retention decision open.
- **Docs**: `FROG-FOCUS-ROADMAP.md` (5KB, post-launch source of truth); `TTS-SETUP.md` (4KB, stale).
- **VPS**: app at `/home/empir3/apps/frogfocus/` — `.env` (ElevenLabs + `SUGGESTIONS_KEY` + VAPID), systemd unit `empir3-frogfocus` (port 8787), deploy helper `empir3-deploy`; deploys via "ask team to sync" in the VPS dashboard.
- **VCS**: `master` = production (head = `10083ba`); `main` = legacy (170 behind).

## Key Decisions Made
- **KR wants the attached `frog-face.png` used directly** — the SVG-recreation path was stopped by the CEO mid-build; saved scripts remain as fallback material.
- **Locked-screen dual-view toggle is a feature** — no fix needed.
- **Deploy path is the dashboard sync flow** — public-URL byte verification required before declaring done.
- **Single-element audio architecture** — one persistent `primaryVoiceAudio`, gesture-unlocked on Start.
- **iOS long-session path = push notifications** — silent-loop sustain is unreliable on iPhone by platform design.
- **Deploy discipline: touch only `index.html`**; commits rewritten single-file to avoid platform auto-commit sweeping.
- **`master` is the production branch**; `main` is legacy.
- Unchanged from prior brief: TTS route contract, `.env` key handling, locked publish scope, `frogfocus.live` parked.

## Pending Decisions
- **Final frog-face file**: confirm `frog-face.png` is the one — KR has now pointed at it twice but also said "scrap it" of the same file at one point; get a clear yes.
- **Disposition of the 8+ icon scripts** (keep as future SVG fallback vs. archive/delete).
- **KR's two new issues** — details still pending; triage as soon as reported.
- **Long-break frog asset**: Zara redraw vs. crop-to-square 1024×1024 vs. leave as-is.
- **Queued-polish timing**: ship Five Page Edits + PNG re-encode + timer-face check in one publish vs. spread out.
- **Branch consolidation**: archive/merge `main` or leave.
- **Cleanup**: `diag.html` disposition, `voiceOn`/`soundOn` flag unification, legacy audio clips, stale `TTS-SETUP.md`, shipping-music decision, Zara design QA reschedule.
- **Formal TTS loop log**: `curl POST /api/tts` → 200 `audio/mpeg` check never explicitly logged; decide whether to run for the record.

## Tasks
- [x] Full build deployed to VPS and externally verified (PWA, push, inbox)
- [x] iPhone/Safari background-audio fix shipped (`10083ba`) and user-confirmed on device
- [x] iPhone audio fix **deployed live** — 132-file sync landed, `.env` preserved, deps reinstalled, service restarted, public bytes match
- [x] Locked-screen toggle mystery resolved as intended feature; frog live on all three of KR's devices
- [x] Android Chrome compatibility verified for the audio fix
- [x] Deploy branch switched to `master`; `web-push` installed; service serving 200
- [x] VAPID keys auto-generated; `.env` complete; GitHub remote recorded
- [x] Voice pipeline: ElevenLabs validated, Will locked, 5 production clips
- [x] Fresh-start lily pad built and KR-approved; timer-resume question closed
- [x] Frog-drift glitch fixed; platform 405s closed; domain acquired; roadmap written
- [x] Frog-face pixel-mapping investigation ran (0.977 silhouette match, band color `#E3D7BD`, feature geometry measured) — then **halted by CEO** at KR's request to use the original file
- [ ] **Confirm with KR: `frog-face.png` is the final asset (clear yes)**
- [ ] **Re-encode `frog-face.png` JPEG-bytes→real PNG** before publish (transparency/editing safety)
- [ ] **Get details on KR's two new issues and fix them**
- [ ] **Run timer-face live check in Chrome** (face sits right in the ring) before shipping
- [ ] KR: final live re-test on iPhone Safari (1-min focus, tab-switch/lock) to close the loop on the deployed build
- [ ] Decide disposition of the 8+ icon-recreation scripts (keep/archive/delete)
- [ ] Execute queued polish: KR's Five Page Edits, real-PNG re-encode, timer-face live check
- [ ] (Optional, for the record) Run `curl POST /api/tts` to log 200 `audio/mpeg`
- [ ] Confirm `frogfocus.live` stays parked (no flip without KR)
- [ ] Resolve long-break frog asset decision
- [ ] Decide `main` branch disposition (archive/merge/leave)
- [ ] Platform team: fix chat-search bug **475faf69**; stop auto-commit sweeping of `_hub.html`/`_portal.html`
- [ ] Cleanup: legacy clips, stale `TTS-SETUP.md`, shipping-music decision, `diag.html`, flag unification
- [ ] Zara design QA deep pass (reschedule)

## Opportunities
1. **Land the frog-face asset in one quick cycle.** KR has finally said "want to just use this one" — the fastest path is: get a confirming yes, fix the JPEG-bytes-under-PNG problem with a clean re-encode, drop it into the publish manifest alongside the timer-face live check, and ship. The 0.977-match SVG work stays saved as a future fallback if KR changes their mind.
2. **Bundle all queued polish into a single publish.** Five Page Edits + real-PNG frog face + timer-face check are all queued with a locked manifest — one clean deploy avoids version churn while momentum is high. Ideally also fold in the two as-yet-unspecified KR issues if details arrive in time.
3. **Harden the deploy/verify loop with the saved icon scripts as a template.** This cycle proved the CEO can stop runaway tasks cleanly with files preserved. Codify the post-sync verification checklist (public bytes, `systemctl` active, `.env` preserved) and extend the 7am check to probe `/api/tts/health` + the inbox endpoint — a zero-extra-infra watchdog.

## Next Steps
- **KR:** confirm `frog-face.png` is final; send the two new issue details; do the final live iPhone re-test; approve/decline the queued-polish batch; keep `frogfocus.live` parked.
- **Dev (Koba):** stop work on SVG recreation (CEO-halted); re-encode `frog-face.png` to real PNG; run the timer-face Chrome check; execute the Five Page Edits; triage KR's two new issues; decide icon-script disposition; optionally log the formal TTS curl check.
- **CEO (Vincent):** get KR's explicit asset confirmation + issue details; track platform fix **475faf69**; drive branch consolidation; codify the deploy-verification checklist; extend the 7am check into a watchdog.

---
*Last updated: 2026-08-19T00:22Z*