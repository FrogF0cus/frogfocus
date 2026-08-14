# Frog Focus - Project Brief

## Vision & Goals
- Polished, original single-page Pomodoro timer inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector style: sage green body, cream belly, clay accents, golden-rimmed glasses, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — and the frog is also a **friend**.
- Timer state images must be clean/transparent so the timer verbiage and ring read clearly; every phase shows the correct frog.
- Clean, deployable single-page app on a shareable public URL; KR verifies live in-browser before final launch.

## Current Status
- **KR's round-2 edit batch is in motion (4 edits, more announced):**
  1. **Timer frog images: remove backgrounds** so the timer verbiage shows through — CEO checked image tooling; in progress.
  2. **Short-break frog is the wrong one** (`frog-break.png`) — fix pending (swap or regenerate).
  3. **"for someone" → "with a friend"** in the Why a frog kicker — applied and confirmed by CEO: "we kept the daily practice and swapped the timer **with a friend** with better vibes."
  4. **Last bullet replacement** — KR is choosing between two vibe lines: *"No pressure, just progress — the streak moves one round at a time"* vs. *"Kind to yourself counts double — showing up is t…"* (truncated).
- **KR announced more edits** — "we're almost there!" — not yet enumerated.
- **Round 1 fully applied & verified:** dark frog-green mode, "productive tool" framing, "the what" nav, water-only breathe card, recharge copy, hero "Focus." + "frog friend", consistent timer face, restored "Why a frog?" section, and a male human-sounding TTS voice.
- **Asset pipeline still open:**
  - `images/frog-longbreak.png` — generation pending; checkpoint rule: do NOT retry the reference under another filename; if baked-in text is wrong, rewrite into shorter copy and make one fresh image WITHOUT `referenceImage`.
  - `images/frog-face.png` — re-encode to a true PNG still pending (suspected JPEG bytes under `.png` name).

## Files & Structure
- **`index.html` (60KB)** — single-page app; inline CSS with theme tokens; hero → timer → "the what" → `#ritual` → **Why a frog? (`#why`, ~line 590, restored)** → footer nav (~617–620); `.why-*` classes ~291–309; `say()` TTS in the ~788–796 region (now human-voiced).
- **`images/` (5 files)** — frog asset set:
  - `frog-focus.png` — approved full-body mascot reference (desk pose); identity reference for all states
  - `frog-face.png` — in-timer face (**re-encode pending; background strip needed**)
  - `frog-break.png` — break state (**WRONG frog — fix pending; background strip needed**)
  - `frog-longbreak.png` — long-break state (**generation pending; background strip needed**)
  - `frog-hero.png` — waving frog used in the restored "Why a frog?" section
- **`uploads/` (1 file)** — KR's original shirt/character reference.

## Key Decisions Made
- Hero: `Slow down.<br>Focus.<br>Get the <em>good stuff</em> done.` with "...a **frog friend** who's genuinely proud of you."
- Dark mode = warm frog sage green (`#475A44` family), not gray-olive.
- Timer keeps one consistent modern frog identity; JS state-swap to full-body frogs removed. New requirement: phase images must be background-free so the timer verbiage/ring shows.
- Breathe card: water only. Footer nav: "The what".
- **Voice: male, human-sounding, non-robotic** — the rejected default TTS is replaced; developer-verified.
- **"Why a frog?" restored verbatim from git history** — quote retains "— the pond, probably"; kicker bullet now reads "swapped the timer **with a friend**."
- Live preview flow: public URL published; KR reviews in-browser before final launch.

## Pending Decisions
- Which vibe line KR picks for the last why-a-frog bullet (two options offered).
- Contents of KR's remaining "more edits" — not yet enumerated.
- `frog-longbreak.png` text approach — shorter baked-in copy + fresh image without `referenceImage`, vs. delivering the latest clean edit.
- Whether `frog-face.png` re-encode is required before publish (likely yes for transparency safety).
- Developer-offered voice options in the settings dialog — accept or defer.

## Tasks
- [x] Apply Batch 1 copy/theme edits (dark sage green, "productive tool", "the what", beverage, recharge)
- [x] Apply Batch 2 edits (hero "Focus." + "frog friend", "one task or goal at a time", timer face)
- [x] Apply Batch 3 edits (breathe-card water copy, footer "The what", timer frog JS state fix)
- [x] Regenerate `images/frog-face.png` from `frog-focus.png` (shoulder-up portrait, same mascot identity)
- [x] Publish public live preview; KR reviewed in-browser and returned the round-2 edit list
- [x] Restore the "Why a frog?" section with original "— the pond, probably" copy (recovered from git history)
- [x] Replace robotic default TTS with a male, human-sounding voice
- [x] Apply "with a friend" copy edit in the Why a frog kicker (KR edit 3)
- [ ] Strip backgrounds from timer frog images so the timer verbiage shows (KR edit 1)
- [ ] Fix the wrong short-break frog — swap or regenerate `frog-break.png` (KR edit 2)
- [ ] Apply KR's chosen last-bullet vibe copy (KR edit 4 — awaiting pick)
- [ ] Receive and apply KR's remaining "more edits"
- [ ] Generate `images/frog-longbreak.png` — fresh image WITHOUT `referenceImage`, same anatomy/palette, shorter clean text block if baked-in text is broken
- [ ] Re-encode `frog-face.png` to a valid PNG
- [ ] Live browser QA: timer face in ring with transparency, short-break frog, voice, restored section, tag balance, dark mode
- [ ] Final deploy

## Opportunities
- **One transparent-asset pass** — while stripping backgrounds for KR edit 1, cleanse all timer-state frogs (`frog-face`, `frog-break`, `frog-longbreak`) as true transparent PNGs. This closes the re-encode item and the longbreak generation in the same sweep, so KR's remaining edits are the only variable in the next review.
- **Make the voice a feature, not a fix** — the developer offered voice options in the settings dialog. A small "frog voice" preference (male voice + pitch/rate + on/off toggle) turns the just-fixed TTS into a signature personality trait matching the restored "frog friend" section.
- **Launch polish in one final pass** — after the remaining edits land, do a single combined QA/deploy: add favicon + OG meta using `frog-face.png`, verify tag balance and dark mode, so the public URL reads as finished in browser tabs and chat embeds.

## Next Steps
1. Get KR's pick on the last-bullet vibe line and apply it.
2. Strip timer-frog backgrounds and fix/swap the wrong short-break frog.
3. Receive and apply KR's remaining announced edits.
4. Generate `images/frog-longbreak.png` per checkpoint rules (fresh image, no `referenceImage`, short text).
5. Re-encode `frog-face.png` as a true PNG; run full live-browser QA; final deploy.

---
*Last updated: 2026-08-14T00:34:00Z*