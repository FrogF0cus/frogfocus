# Frog Focus - Project Brief

## Vision & Goals
- Build an **original, polished single-page Pomodoro timer** inspired by pomodorokitty.com — not a clone.
- **Frog mascot** (based on the frog on KR's shirt) as the companion — Pomodoro means the **technique**, not the fruit. 25-min focused intervals, 5-min short breaks, 15-min long break (Francesco Cirillo method).
- Audience: focus-seekers who find productivity apps **sterile and guilt-inducing**; the timer should feel like a **warm, cozy, shareable companion** that becomes a daily ritual.
- The frog **speaks** — audio/voice cues are a core feature; KR explicitly wants to hear the frog even when the tab is in the background.
- Deliverable: a **public link** to share with the emporium community.

## Current Status
- Concept approved; team: **Zara** (design — complete), **Koba** (build — queued), **CEO Vincent** (coordination).
- ✅ **Frog mascot set is done** — 4 states, one consistent character, transparent PNGs saved in `images/`.
- ✅ Brand palette locked by designer.
- 🚧 **Build not started** — CEO/Developer/Designer are all in "Stopped" state awaiting go-ahead.
- 🆕 **Feature request logged by KR:** background-tab audio — voice cues currently stop when the tab/window isn't focused; queued for next round of fixes.

## Files & Structure
```
index.html        — single-page landing + timer (to build)
styles.css        — warm/cozy styling using locked palette (to build)
timer.js          — 25/5/15 Pomodoro logic + audio cues (to build)
images/           — frog mascot PNG set (DONE, 4 files)
  ├─ frog-hero.png        — hero/round mascot (confirmed)
  └─ + 3 state files      — names TBD (focus, break, long break, celebration)
```
*(Deployment target TBD — public URL required for emporium share.)*

## Key Decisions Made
- **Mascot is a frog**, not a tomato — a "frgo like the one on your shirt" (KR).
- **Pomodoro = the technique** (Cirillo), not the fruit.
- **Brand palette locked:** Cream `#FBF6EC`, Warm Gold `#FFC04D`, Sage Green `#6C7F6A`, Clay `#C55E33`.
- **Frog set: 4 states**, one consistent little character, delivered as transparent PNGs.
- **Timer cycle: 25/5/15** — 25-min focus, 5-min short break, 15-min long break (standard 4-pomodoro round).
- **Single-page** layout; warm, cozy, delightful tone — no sterile productivity aesthetics.
- **Spoken/audio cues are part of the experience** (KR hears the frog speak) — and must work in background tabs.
- Project name: **Frog Focus** (provisional — confirm for the public link).

## Pending Decisions
- **Voice design** — which cues the frog speaks, at what moments (start, break, completion), and TTS voice/copy tone.
- **Background-audio implementation** — Web Audio API / dedicated AudioContext vs. Notification API; must survive tab throttling.
- Customizable interval lengths (user-adjustable, or fixed 25/5/15 presets?).
- Auto-start next interval vs. manual start after each break.
- Naming/branding for the shared link — "Frog Focus" provisional.
- Exact filenames/usage of the 3 remaining frog state PNGs.
- Deployment platform for the emporium-public URL.

## Tasks
- [x] Zara — design frog mascot set (4 states, transparent PNGs, locked palette)
- [x] Zara — save assets to `images/` (`frog-hero.png` + 3 state files)
- [ ] Koba — scaffold single-page structure (hero, timer UI, technique blurb, share CTA)
- [ ] Koba — implement 25/5/15 timer: start/pause/reset, pomodoro count, long break after 4
- [ ] Koba — wire the 4 frog states to timer phases and add transition polish
- [ ] Log & fix **background-tab audio** — frog's voice must be audible when the tab isn't focused (next round)
- [ ] Team — mobile/responsive pass
- [ ] Team — deploy and generate public link for emporium sharing

## Opportunities
1. **Voice-companion angle** — lean into the frog *speaking*: cozy encouragement at interval starts, stretch cues at breaks, a little celebration at round completion. Background-tab audio (KR's explicit request) makes this a true companion, not just a timer — a differentiator pomodorokitty doesn't have.
2. **Cozy shareable session cards** — after each pomodoro or full 4-cycle round, generate a warm "You did it!" card (celebratory frog state + session stats) users can screenshot and share in the emporium.
3. **State-driven page atmosphere** — shift the page's mood with each phase using the locked palette (gold focus, sage break, clay celebration) so the environment itself supports the ritual; light PWA touch (installable/offline) makes it a daily habit.

## Next Steps
1. **Unblock the build** — CEO kicks Koba to scaffold `index.html` + timer logic in parallel with confirming the 4 frog state filenames/usage.
2. **Prototype background audio early** — verify the frog's voice keeps playing when the tab is backgrounded before full polish.
3. **First integrated build** — timer working + all 4 frog states wired in; iterate on voice, tone, and transitions.
4. **Deploy staging link** for KR and the emporium to preview, then final public share.

---
*Last updated: 2026-08-13T22:48Z*