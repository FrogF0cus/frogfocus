# Frog Focus - Project Brief

## Vision & Goals
- Build an **original, polished single-page Pomodoro timer** — inspired by pomodorokitty.com, not a clone.
- **Frog mascot** (based on KR's shirt) as a warm companion; **Pomodoro = the technique** (25/5/15), not the fruit.
- Audience: focus-seekers who find productivity apps sterile; the timer should feel like a **cozy, shareable daily ritual**.
- The frog **speaks** — audio/voice cues are core, audible even when the tab is in the background.
- Deliverable: a clean, deployable single-page app with a shareable URL, four consistent frog states, and QA-verified timer behavior.
- **New goal:** modernize the small frog face used *inside the timer UI* (face-only redesign), keeping it recognizable as the same character.

## Current Status
- **Four-state PNG set is consistent and complete** — hero, focus, break, and longbreak all match canon. Longbreak finally rendered (previously blocked by the 2-edits-per-reference cap), was moved up from `images/images/` to `images/frog-longbreak.png`, and the stray `images/images/` clutter is cleared.
- KR signaled another pass: *"not yet, i have edits"* → first edit request: **"make the frog in the timer a little more modern too please. you can keep it just a face though. ask me clarifying questions."**
- CEO inspected the current timer frog (cute bulbous face, round head, big playful eyes, soft blush, cream muzzle) and asked clarifying questions — **Q1: keep the rounded head, or go sharper/more geometric?** — awaiting KR's answers.
- Space-key/settings-dialog fix landed in code but is still **unverified on the live URL**.
- No shareable link published yet; early-user beta share is queued.

## Files & Structure
- **App shell**: `index.html` (59KB) — "Frog Focus — a cozy Pomodoro companion"; contains timer, settings dialog, keyboard handling, audio hooks, and the in-UI timer frog face (next edit target).
- **Frog mascot PNGs** (`images/`, 4 files — all consistent with canon):
  - `images/frog-hero.png` — standing, gentle wave
  - `images/frog-focus.png` — desk, quiet studied pose (**canonical reference**)
  - `images/frog-break.png` — relaxed break pose
  - `images/frog-longbreak.png` — quiet victory, arms raised, gold/sage sparkles (final render landed; stale checkpoint entry referencing it may remain — prune/finalize)
- **Scratch**: `uploads/` (1 file — KR's reference screenshot); `images/images/` desktop duplicate folder removed.

## Key Decisions Made
- **`frog-focus.png` is canon** — KR: "i actually like this one."
- **Character spec**: oversized golden-rimmed round glasses, warm yellow eyes, big rounded head on compact body, long simple arms, thin charcoal linework, muted sage `#6C7F6A` / cream `#FBF6EC` / gold / clay `#C55E33`, handcrafted editorial flat style, off-white background.
- **State poses**: hero = standing/waving; focus = quiet studied; break = relaxed; longbreak = small quiet victory + sparkles.
- **No text baked into images** (prior baked-in text was problematic).
- **Timer frog is its own asset** — a face-only graphic, to be modernized while staying on-character.
- Per-reference edit cap is 2 per turn — future renders needing the canon character should generate fresh from the textual spec rather than via `referenceImage`.

## Pending Decisions
- **KR's answers to CEO's clarifying questions** on the timer frog: shape (keep rounded vs sharper/geometric — Q1, more questions coming).
- Whether the modern timer face stays strictly on-character (same palette/glasses) or diverges stylistically.
- Publish/share timing after the timer-face pass.
- Final go-ahead on the audio/voice layer (queued).

## Tasks
- [x] Four-frog redesign pass (hero, focus, break, longbreak) — set is now consistent
- [x] Regenerate hero + break to match `frog-focus.png` canon
- [x] Render `frog-longbreak.png` to match canon (moved from `images/images/` → `images/frog-longbreak.png`)
- [x] Clear stray `images/images/` clutter
- [x] Fix Space-key toggle conflicting with settings dialog (in code)
- [ ] Get KR's answers on timer-frog shape/style direction
- [ ] Redesign the timer frog face — more modern, face only
- [ ] Swap the new face into the timer UI in `index.html`
- [ ] Verify all four frog states render on the live URL
- [ ] QA: Space does not start/stop the timer while settings is open
- [ ] Publish shareable URL; post to #beta for early-user feedback
- [ ] (Queued) Frog voice/audio cues, background-audible

## Opportunities
1. **Modern timer face doubles as app identity** — the in-timer face is the most-seen element; a modernized, on-character version can double as favicon/social-share card, cementing the brand right before the beta link goes out.
2. **Offer KR 2–3 quick direction options** — "modern" is ambiguous; presenting tight variations (e.g., geometric/flat vs softer rounded) in one pass shortens the loop and avoids another rejected round.
3. **Ship the beta link as soon as the face lands** — all stored recommendations are QA/launch-focused; a #beta loop will validate the new face, the four-state set, and the Space-key fix before broader launch.

## Next Steps
1. KR answers the CEO's clarifying questions (shape first, then style details).
2. Generate 2–3 timer-face variants for selection, or one chosen direction.
3. Swap the chosen face into the timer UI in `index.html`.
4. QA pass: four-state render + Space-key/settings behavior on the live URL.
5. Publish shareable link; post to #beta.

---
*Last updated: 2026-08-13T23:17:44Z*