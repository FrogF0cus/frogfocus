# Frog Focus - Project Brief

## Vision & Goals
- Polished, original single-page Pomodoro timer inspired by pomodorokitty.com — not a clone.
- Frog mascot is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector style: sage green body, cream belly, clay accents, golden-rimmed glasses, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done."
- The frog is also a **friend**: the "Why a frog?" section is restored, and the timer voice now sounds like a warm male human companion, not a robotic default.
- Clean, deployable single-page app on a shareable public URL; KR verifies live in-browser before final launch.

## Current Status
- **All 5 of KR's page edits are applied & verified.** The final two landed in the last batch:
  1. **"Why a frog?" / frog-friend section RESTORED** — recovered from git history and reinserted between `#ritual` and `<!-- SHARE -->` (~line 590) with `id="why"`, the waving `frog-hero.png` image, and the original quote *"Pomodoro is the technique. The frog is the friend." — the pond, probably*. Tag balance verified; `.why-*` CSS was already present.
  2. **Voice now male & human-sounding** — the robotic default TTS was replaced; developer confirms the timer "talks like a person now, not a bot." Live-browser voice QA still pending (KR hasn't re-listened yet).
  - Earlier in this batch: breathe card water-only copy, footer nav "The what", and the timer-frog JS state fix (face now stays consistent across all phases) all confirmed clean.
- **KR announced "more edits"** — a new batch is incoming ("we're almost there!"). CEO is ready to receive.
- **Asset pipeline still open:**
  - `images/frog-longbreak.png` — final generation pending. Checkpoint rule: do NOT retry under another filename; if baked-in text is wrong, rewrite into shorter copy and make one fresh image WITHOUT `referenceImage`; otherwise deliver the latest clean edit.
  - `images/frog-face.png` — re-encode to a true PNG still pending (suspected JPEG bytes under `.png` name).

## Files & Structure
- **`index.html` (60KB)** — single-page app; inline CSS with theme tokens; hero → timer → "the what" → ritual → **"Why a frog?" (restored, ~590)** → footer nav (617–620); `.why-*` classes at ~291–309; `say()` TTS function in the ~788–796 region (now human-voiced).
- **`images/` (5 files)** — frog asset set:
  - `frog-focus.png` — approved full-body mascot reference (desk pose); identity reference for all states
  - `frog-face.png` — in-timer face, verified consistent with reference (**re-encode pending**)
  - `frog-break.png` — break state
  - `frog-longbreak.png` — long-break state (**final generation pending**)
  - `frog-hero.png` — waving frog used in the restored "Why a frog?" section
- **`uploads/` (1 file)** — KR's original shirt/character reference.

## Key Decisions Made
- Hero: `Slow down.<br>Focus.<br>Get the <em>good stuff</em> done.` with "...a **frog friend** who's genuinely proud of you."
- Dark mode = warm frog sage green (`#475A44` family), not gray-olive.
- **Timer shows one consistent modern frog face across all phases** — the JS state-swap to full-body frogs was the bug and is removed.
- Breathe card: no beverage line — water only. Footer nav: "The what".
- **Voice: male, human-sounding, non-robotic** — replaces the rejected default TTS; implemented and developer-verified.
- **"Why a frog?" section restored verbatim from git history** — including "— the pond, probably."
- Live preview flow: public URL published; KR reviews in-browser before final launch.

## Pending Decisions
- Details of **KR's announced "more edits"** — not yet enumerated.
- Voice plugin polish: developer offered optional voice options in the settings dialog — accept or defer?
- Quote tweak in the restored section — developer offered; no change requested yet.
- `frog-longbreak.png` text approach — shorter baked-in copy + fresh image without `referenceImage`, vs. delivering the latest clean edit.
- Whether `frog-face.png` re-encode is required before publish (likely yes for transparency safety).

## Tasks
- [x] Apply Batch 1 copy/theme edits (dark sage green, "productive tool", "the what", beverage, recharge)
- [x] Apply Batch 2 edits (hero "Focus." + "frog friend", "one task or goal at a time", timer face)
- [x] Apply Batch 3 edits (breathe-card water copy, footer "The what", timer frog JS state fix)
- [x] Regenerate `images/frog-face.png` from `frog-focus.png` (shoulder-up portrait, same mascot identity)
- [x] Publish public live preview; KR reviewed in-browser and returned 5 edits
- [x] Restore the "Why a frog?" frog-friend section with original "— the pond, probably" copy (recovered from git history)
- [x] Replace robotic default TTS with a male, human-sounding voice (developer-verified)
- [ ] Receive and apply KR's next edit batch ("more edits" announced)
- [ ] Generate `images/frog-longbreak.png` — fresh image WITHOUT `referenceImage`, same anatomy/palette, shorter clean text block if baked-in text is broken
- [ ] Re-encode `frog-face.png` to a valid PNG
- [ ] Live browser QA: voice quality, timer face in ring, restored section, tag balance, dark mode
- [ ] Final deploy

## Opportunities
- **Close the asset loop before KR's next review** — land `frog-longbreak.png` and re-encode `frog-face.png` now so the incoming edit batch is the only variable. All four timer states will finally be pixel-consistent on the live link.
- **Make the voice a feature, not a fix** — the developer offered voice options in the settings dialog. A small "frog voice" preference (male voice + pitch/rate + on/off toggle) turns the just-fixed TTS into a signature personality trait, matching the restored "frog friend" section.
- **Launch-ready share polish** — add favicon + OG meta using `frog-face.png` so the public URL already reads as finished in browser tabs and chat embeds before the final deploy.

## Next Steps
1. Pull KR's announced "more edits" and apply them (quote tweak and/or settings-dialog voice options may be among them — confirm scope).
2. Generate `images/frog-longbreak.png` per checkpoint rules (fresh image, no `referenceImage`, short text).
3. Re-encode `frog-face.png` as a true PNG.
4. Full live-browser QA: voice, timer face in ring, restored section, tag balance, dark mode.
5. Final deploy on the public URL.

---
*Last updated: 2026-08-14T00:31:25Z*