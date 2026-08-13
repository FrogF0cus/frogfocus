# Frog Focus - Project Brief

## Vision & Goals
- Build an **original, polished single-page Pomodoro timer** — inspired by pomodorokitty.com, not a clone.
- **Frog mascot** (based on KR's shirt) as a warm companion; **Pomodoro = the technique** (25/5/15), not the fruit.
- Audience: focus-seekers who find productivity apps sterile; the frog now positions the app as a **productive tool**, not just a cozy ritual.
- The frog **speaks** — audio/voice cues are core, audible even when the tab is in the background (queued).
- Deliverable: a clean, deployable single-page app with a shareable URL, four consistent frog states, a modern in-timer frog face, frog-green dark mode, and QA-verified timer behavior.

## Current Status
- **KR's five page edits are applied.** Developer verified every target string matched exactly and applied all 10 surgical patches in one atomic batch. Changes: ① dark mode now uses the same green as the frogs (`#6C7F6A` sage family), ② hero copy "warm little ritual" → **"productive tool"**, ③ section heading "the ritual" → **"the what"**, ④ breathe-section **beverage line** rewritten, ⑤ **recharge copy** updated.
- **Timer-face modernization DONE** — `images/frog-face.png` (face-only crop of the canon character) swapped into the timer ring on `index.html` line 499 (src + alt). Both images are 1024×1024 square, so `.frog`'s `height`-based CSS needs no width cap — no crop risk.
- **Four-state PNG set is consistent and complete** — hero, focus, break, longbreak all match canon; stray `images/images/` folder cleared.
- **QA is the remaining gate before launch**: live-browser render check (dark theme, new copy, timer face in ring) is queued but awaiting KR's go-ahead; Space-key/settings-dialog fix is in code but unverified on the live URL.
- Housekeeping: stale `media.imageBatchCheckpoint` entry still lists `frog-longbreak.png` as pending though the file exists and is correct.
- No shareable link published yet; early-user beta share is queued.

## Files & Structure
- **App shell**: `index.html` (59KB) — "Frog Focus — a cozy Pomodoro companion"; contains timer, settings dialog, keyboard handling, audio hooks, dark-mode CSS (now frog green), updated copy, and the timer-ring frog image (line 499 — `frog-face.png`). All 10 copy/theme patches landed here.
- **Frog mascot PNGs** (`images/`, 5 files — all consistent with canon):
  - `images/frog-focus.png` — desk, quiet studied pose (**canonical reference**)
  - `images/frog-hero.png` — standing, gentle wave
  - `images/frog-break.png` — relaxed break pose
  - `images/frog-longbreak.png` — quiet victory, arms raised, gold/sage sparkles
  - `images/frog-face.png` — **face-only crop** of the same character, wired into the timer ring (1024×1024 square; actually JPEG bytes despite `.png` name — renders fine via content-sniffing, but flagged for conversion)
- **Scratch**: `uploads/` (1 file — KR's reference screenshot). `images/images/` desktop duplicate removed.

## Key Decisions Made
- **`frog-focus.png` is canon** — KR: "i actually like this one."
- **Character spec**: oversized golden-rimmed round glasses, warm yellow eyes, big rounded head, thin charcoal linework, muted sage `#6C7F6A` / cream `#FBF6EC` / gold / clay `#C55E33`, handcrafted editorial flat style, off-white background.
- **Timer frog = face-only PNG, same character as the set** — per KR's clarification ("closer to the other frogs — break, hero, etc."), not a divergent redesign.
- **Dark mode = frog green** — dark theme now matches the sage green of the frogs, tying the whole UI to the mascot.
- **Copy direction**: "productive tool" (not cozy ritual), section titled "the what", fresh beverage + recharge lines. Applied as 10 exact-match surgical patches in one atomic batch — no unrelated lines touched.
- **No width cap needed** on the timer face — square 1024×1024 assets under `height`-based sizing with `width:auto`.
- **No text baked into images** (prior baked-in text was problematic). Per-reference edit cap is 2 per turn — future renders needing canon should generate fresh from the textual spec, not via `referenceImage`.

## Pending Decisions
- **Go-ahead for the live Chrome render check** — developer offered to open `index.html` in a desktop Chrome window; KR hasn't confirmed.
- Launch timing: exactly when to publish the shareable URL and post to #beta (QA is the only blocker).
- Audio/voice layer: shipping after beta feedback or folding it in later.

## Tasks
- [x] Four-frog redesign pass (hero, focus, break, longbreak) — set now consistent
- [x] Render `frog-longbreak.png` to canon and move to `images/frog-longbreak.png`
- [x] Clear stray `images/images/` clutter
- [x] Fix Space-key toggle conflicting with settings dialog (in code)
- [x] Create `images/frog-face.png` — face-only version of canon frog
- [x] Swap new face into the timer UI (`index.html`, line 499)
- [x] Apply KR's five page edits (dark mode → frog green, "productive tool", "the what", beverage line, recharge copy) — 10 atomic patches, all strings matched
- [ ] Run live Chrome render check: dark green theme, new copy, and timer face sitting correctly in the ring
- [ ] Convert `frog-face.png` to true PNG bytes (currently JPEG under a `.png` name)
- [ ] Prune/finalize stale `frog-longbreak.png` entry in `media.imageBatchCheckpoint`
- [ ] Verify all four frog states render on the live URL
- [ ] QA: Space does not start/stop the timer while settings dialog is open
- [ ] Publish shareable URL; post to #beta for early-user feedback
- [ ] (Queued) Frog voice/audio cues, background-audible

## Opportunities
1. **Frog-green dark mode is a brand signature asset.** The dark theme now echoes the mascot's sage green — a natural moment to extend the identity: reuse `frog-face.png` as the favicon and social-share card image so the beta link arrives with one cohesive, polished brand.
2. **Beta is fully unblocked — ship it.** All assets and copy/theme edits are done; the only remaining risk is QA on the live URL. A quick #beta round validates all three stored recommendations at once and feeds the audio-layer design with real user feedback.
3. **Harden `frog-face.png` to true PNG bytes.** It renders via browser content-sniffing today; re-encoding is a 1-minute fix that removes any risk of a future cache/CDN serving the wrong content type before wider distribution.

## Next Steps
1. Complete and confirm the atomic patch batch (developer has applied) — then run the live Chrome render check: dark green theme, new copy, and timer face in the ring.
2. Convert `frog-face.png` to genuine PNG bytes.
3. Prune the stale image checkpoint entry (housekeeping).
4. QA the live URL: four frog states + new timer face render, Space-key/settings behavior.
5. Publish the shareable link; post to #beta.
6. Fold beta feedback into the audio/voice layer and final polish.

---
*Last updated: 2026-08-13T23:25:00Z*