# Frog Focus - Project Brief

## Vision & Goals
- Build an **original, polished single-page Pomodoro timer** — inspired by pomodorokitty.com, not a clone.
- **Frog mascot** (based on the frog on KR's shirt) as the companion; **Pomodoro = the technique** (25/5/15), not the fruit.
- Audience: focus-seekers who find productivity apps sterile and guilt-inducing; the timer should feel like a **warm, cozy, shareable companion** that becomes a daily ritual.
- The frog **speaks** — audio/voice cues are core; audible even when the tab is in the background (queued for next round).
- Deliverable: a clean, deployable single-page app with a shareable URL, four consistent frog states, and QA-verified timer behavior.

## Current Status
- All four frog PNGs exist on disk, but the set is **mid-revision**. KR rejected the first "sleek modern" redesign pass, then chose `frog-focus.png` as the canonical character and asked for another pass on the other three.
- **Hero and break are done** — regenerated from `frog-focus.png` as reference and verified as clean matches to canon.
- **Longbreak is the hold.** Its render was blocked twice by the per-reference edit cap (2 edits per turn). Two pending checkpoint items exist — one correct (`images/frog-longbreak.png`) and one typo'd duplicate (`images/images/frog-longbreak.png`). Disk likely still holds the older, non-matching version.
- CEO paused the pass and handed control back to KR ("Stopped — let me know what you want next") — **the project is awaiting KR's direction**.
- Developer fix already landed in code: **Space no longer starts/stops the timer while the settings dialog is open** — unverified on the live URL.
- No shareable link published yet; early-user sharing is queued.

## Files & Structure
- **App shell**: `index.html` (59KB) — "Frog Focus — a cozy Pomodoro companion"; contains the timer, settings dialog, keyboard handling, and audio hooks.
- **Frog mascot assets** (`images/`, 4 files):
  - `images/frog-hero.png` — standing, gentle wave, welcoming (✅ matches canon)
  - `images/frog-focus.png` — desk, quiet studied pose (**canonical reference** for all edits)
  - `images/frog-break.png` — break state (✅ matches canon)
  - `images/frog-longbreak.png` — long-break state (⚠️ pending regenerate; may be stale)
- **Pending render checkpoint**: outputs `images/frog-longbreak.png` and a stray duplicate `images/images/frog-longbreak.png` (typo path — prune).

## Key Decisions Made
- **`frog-focus.png` is canon** — KR: "i actually like this one."
- **Character spec** (encoded in prompts): oversized golden-rimmed round glasses, warm yellow eyes, big rounded head on compact body, long simple arms, thin dark charcoal linework, muted sage `#6C7F6A` / cream `#FBF6EC` / gold / clay `#C55E33`, handcrafted editorial flat style, plain off-white background.
- **State poses**: hero = standing/waving; focus = quiet studied desk pose; break = relaxed; longbreak = small quiet victory, both arms raised, gold/sage sparkle dots.
- **No text baked into images** — prior baked-in text was problematic; pending longbreak prompt specifies transparent, no text.
- **Per-reference edit cap is 2 per turn** — longbreak must be generated fresh without `referenceImage` (per checkpoint guidance), since the character is fully documented textually.

## Pending Decisions
- **KR's call on the current matched set** (hero/break verified; longbreak pending) — CEO is stopped and waiting for direction.
- Whether to publish the shareable link immediately after longbreak lands, or run another visual pass first.
- Final go-ahead on the frog voice/audio layer (queued for next round).

## Tasks
- [x] Full four-frog redesign pass (hero, focus, break, longbreak)
- [x] Regenerate hero + break to match `frog-focus.png` canon — verified clean
- [x] Fix Space-key toggle conflicting with settings dialog (done in code)
- [ ] Render `frog-longbreak.png` to match canon — generate fresh **without** referenceImage or deliver latest clean edit
- [ ] Prune duplicate pending checkpoint path `images/images/frog-longbreak.png`
- [ ] Verify all four frog states render correctly on the live URL (focus, break, long break)
- [ ] QA: confirm Space does not start/stop the timer while settings is open
- [ ] Publish shareable URL
- [ ] Share with early beta testers (post to #beta)
- [ ] (Queued) Frog voice/audio cues, audible with tab in background

## Opportunities
1. **Unblock longbreak via text-only generation** — the canon spec is fully documented; a fresh image without `referenceImage` sidesteps the edit cap and lets the whole set ship in one turn.
2. **Ship the beta link as soon as longbreak lands** — all three stored recommendations are QA/launch-oriented, signaling the project is near shareable; a quick #beta loop will surface UX and image issues before broader launch.
3. **Add the audio/voice layer next** — background-audible frog voice is the differentiator that makes the companion feel alive; lock visuals first, then layer in voice reactions per state.

## Next Steps
1. Inspect `images/frog-longbreak.png` on disk to confirm it's stale.
2. Generate the longbreak asset fresh (no `referenceImage`; victory pose, sparkle dots, no text, transparent/off-white) or deliver the latest clean edit.
3. Remove the typo'd pending path `images/images/frog-longbreak.png`.
4. Resume with KR → confirm the matched set is approved before publishing.
5. Run QA checks: four-state render + Space-key/settings fix.
6. Publish shareable link and post to #beta.

---
*Last updated: 2026-08-13T23:15:13Z*