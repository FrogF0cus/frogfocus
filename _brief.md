# Frog Focus - Project Brief

## Vision & Goals
- Build an **original, polished single-page Pomodoro timer** — inspired by pomodorokitty.com, not a clone.
- **Frog mascot** (based on KR's shirt) as a warm companion; **Pomodoro = the technique** (25/5/15), not the fruit.
- Audience: focus-seekers who find productivity apps sterile; the timer should feel like a **cozy, shareable daily ritual**.
- The frog **speaks** — audio/voice cues are core, audible even when the tab is in the background.
- Deliverable: a clean, deployable single-page app with a shareable URL, four consistent frog states, a modern in-timer frog face, and QA-verified timer behavior.

## Current Status
- **Timer-face modernization is DONE** — KR clarified "just mean closer to the other frogs — break, hero, etc." The CEO had Zara cut `images/frog-face.png` (face-only portrait of the canon character, same palette/glasses/blush/closed smile) and the developer swapped it into the timer ring (src/alt on line 499 of `index.html`). Both images are 1024×1024, so no width cap is needed under the existing `.frog` CSS (`height`-based sizing with `width:auto` — no crop risk).
- **Four-state PNG set is consistent and complete** — hero, focus, break, and longbreak all match canon. Longbreak rendered (was blocked by the 2-edits-per-reference cap), moved from `images/images/` to `images/frog-longbreak.png`, and the stray folder is cleared.
- **QA is the remaining gate before launch.** Space-key/settings-dialog fix is in code but unverified on the live URL; all four states plus the new face need a live render check.
- No shareable link published yet; early-user beta share is queued.
- Housekeeping: a stale `media.imageBatchCheckpoint` entry still lists `frog-longbreak.png` as pending — the file exists and is correct; the checkpoint can be pruned/finalized.

## Files & Structure
- **App shell**: `index.html` (59KB) — "Frog Focus — a cozy Pomodoro companion"; contains timer, settings dialog, keyboard handling, audio hooks, and the timer-ring frog image (line 499 — now `frog-face.png`).
- **Frog mascot PNGs** (`images/`, 5 files — all consistent with canon):
  - `images/frog-focus.png` — desk, quiet studied pose (**canonical reference**)
  - `images/frog-hero.png` — standing, gentle wave
  - `images/frog-break.png` — relaxed break pose
  - `images/frog-longbreak.png` — quiet victory, arms raised, gold/sage sparkles
  - `images/frog-face.png` — **face-only crop** of the same character, wired into the timer ring (1024×1024 square; actually JPEG bytes despite `.png` name — browsers content-sniff, renders fine)
- **Scratch**: `uploads/` (1 file — KR's reference screenshot). `images/images/` desktop duplicate removed.

## Key Decisions Made
- **`frog-focus.png` is canon** — KR: "i actually like this one."
- **Character spec**: oversized golden-rimmed round glasses, warm yellow eyes, big rounded head, thin charcoal linework, muted sage `#6C7F6A` / cream `#FBF6EC` / gold / clay `#C55E33`, handcrafted editorial flat style, off-white background.
- **State poses**: hero = standing/waving; focus = quiet studied; break = relaxed; longbreak = small quiet victory + sparkles.
- **Timer frog = face-only PNG, same character as the set** — per KR's direction ("closer to the other frogs — break, hero, etc."), not a divergent redesign.
- **No width cap needed** on the timer face — hero and face are both square 1024×1024, and `.frog` sizes by height with `width:auto`.
- **No text baked into images** (prior baked-in text was problematic).
- Per-reference edit cap is 2 per turn — future renders needing the canon character should generate fresh from the textual spec rather than via `referenceImage`.

## Pending Decisions
- Launch timing: exactly when to publish the shareable URL and post to #beta (QA is the only blocker).
- Go-ahead on the audio/voice layer (queued — could fold in beta feedback or ship after).

## Tasks
- [x] Four-frog redesign pass (hero, focus, break, longbreak) — set now consistent
- [x] Render `frog-longbreak.png` to canon and move to `images/frog-longbreak.png`
- [x] Clear stray `images/images/` clutter
- [x] Fix Space-key toggle conflicting with settings dialog (in code)
- [x] Create `images/frog-face.png` — face-only version of canon frog
- [x] Swap new face into the timer UI (`index.html`, line 499)
- [ ] Prune/finalize stale `frog-longbreak.png` entry in `media.imageBatchCheckpoint`
- [ ] Verify all four frog states render on the live URL (recommendation: check live URL)
- [ ] Verify the new `frog-face.png` renders correctly inside the timer ring
- [ ] QA: Space does not start/stop the timer while settings dialog is open
- [ ] Publish shareable URL; post to #beta for early-user feedback
- [ ] (Queued) Frog voice/audio cues, background-audible

## Opportunities
1. **The new timer face doubles as app identity** — it's the most-seen element in the UI; reuse `frog-face.png` as the favicon and social-share card image so the beta link arrives with a consistent, polished brand.
2. **Beta is fully unblocked — ship it.** All assets are done and the only remaining risk is QA on the live URL (four states, new face, Space-key fix). A quick #beta round validates all three stored recommendations at once and feeds the audio-layer design.
3. **Normalize `frog-face.png` to true PNG bytes** — it currently renders via browser content-sniffing; converting it is a 1-minute hardening step that removes any risk of a future cache/CDN serving it with the wrong content type before wider distribution.

## Next Steps
1. Run the QA pass on the live URL: four frog states + new timer face render, and Space-key/settings behavior.
2. Prune the stale image checkpoint entry (housekeeping).
3. Publish the shareable link; post to #beta.
4. Collect beta feedback; use it to inform the audio/voice layer and any final polish.

---
*Last updated: 2026-08-13T23:22:00Z*