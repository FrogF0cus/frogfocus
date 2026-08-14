# Frog Focus - Project Brief

## Vision & Goals
- Polished, original single-page Pomodoro timer inspired by pomodorokitty.com — not a clone.
- Frog mascot (from KR's shirt) is the consistent identity across hero, timer states, in-timer face, and dark mode — modern flat-vector style: sage green body, cream belly, clay accents, golden-rimmed glasses, thin charcoal linework.
- Positioning: a **productive tool** — "Slow down. Focus. Get the good stuff done." — not just a cozy ritual.
- Clean, deployable single-page app with a shareable public URL; KR verifies a live preview in-browser before launch.

## Current Status
- **All five page edits applied & verified** (developer confirmed line-by-line):
  1. Hero title → `Slow down.<br>Focus.<br>Get the <em>good stuff</em> done.` (line 475, three-line headline)
  2. Hero lede → "...and a **frog friend** who's genuinely proud of you." (line 476)
  3. What section → **"One task or goal at a time"**
  4. **"Why the frog?" section removed** — verified no `#why` JS references (whole-file div balance checked clean)
  5. Timer face modernized to match `frog-focus.png`
- **Batch 1 (prior) applied** — dark mode to warm frog sage green (`#475A44` family), "productive tool" copy, "the what" heading, beverage line, recharge copy.
- **Timer face bug root-caused & fixed** — the timer referenced `frog-face.png`, which was the **old chubby storybook character** (round, rosy-peach cheeks) while all four state images were the modern frog. `frog-face.png` regenerated from `frog-focus.png` as reference: shoulder-up portrait, sage green `#6C7F6A` head, oversized round golden-rimmed glasses, warm cream-yellow eyes with charcoal pupils/highlights, tiny clay blush, charcoal linework. Designer confirmed pixel-consistent identity with the approved mascot.
- **Copy verified in-file** by CEO after edits; face consistency confirmed against `frog-focus.png`.
- **Live preview: publishing now** — KR asked for an in-app preview pane refresh first, then gave a final "yes" to publish publicly; CEO said "Publishing now." Public shareable link is being spun up, pending hand-off to KR for browser review.
- **`images/frog-longbreak.png` still pending** — previous generation skipped due to image-edit rate limit (2 edits of `frog-focus.png` already used that turn). Checkpoint rule: do NOT retry under another filename; if baked-in text is broken, write shorter copy with the same meaning and generate a fresh image WITHOUT `referenceImage`; otherwise deliver the latest clean edit.

## Files & Structure
- **`index.html` (57KB)** — single-page app; inline CSS, theme tokens at top, hero, timer, "the what" section, footer.
- **`images/` (5 files)** — frog asset set:
  - `frog-focus.png` — approved full-body mascot reference (desk pose), used as the identity reference
  - `frog-face.png` — in-timer face, **regenerated & verified consistent** (**pending re-encode check** — suspected JPEG bytes under a `.png` name)
  - `frog-break.png` — break state
  - `frog-longbreak.png` — long-break state (**pending final generation**)
  - 1 additional state/hero asset
- **`uploads/` (1 file)** — KR's original shirt/character reference.

## Key Decisions Made
- Hero headline: `Slow down.<br>Focus.<br>Get the <em>good stuff</em> done.`
- Hero lede includes "...a **frog friend** who's genuinely proud of you."
- What-section copy: **"One task or goal at a time"** (not "one pomodoro at a time").
- **"Why the frog?" section removed** — verified no JS references to `#why`.
- Dark mode = warm frog sage green, not gray-olive: `--bg:#475A44` · `--surface:#4E624A` · `--surface-2:#5A6F55` · `--ink:#F2EDDE` · `--ink-soft:#C6D4BF`
- Timer face must match the modern `frog-focus.png` mascot — never the old chubby storybook style. `frog-face.png` regenerated **using `frog-focus.png` as the image reference** to guarantee pixel consistency.
- Live preview flow: KR first preferred the in-app preview pane; ultimately approved a public publish — **public link must be reviewed by KR in-browser before final launch**.

## Pending Decisions
- None formally open; remaining decisions are asset-QA calls:
  - `frog-longbreak.png` text handling (shorter baked-in copy + fresh image without `referenceImage` vs. delivering the latest clean edit)
  - Whether `frog-face.png` needs re-encoding to a real PNG

## Tasks
- [x] Apply Batch 1 copy/theme edits (dark sage green, "productive tool", "the what", beverage, recharge)
- [x] Apply Batch 2 edits (hero "Focus." + "frog friend", "one task or goal at a time", remove `#why` section, timer face)
- [x] Regenerate `images/frog-face.png` from `frog-focus.png` (shoulder-up portrait, same mascot identity)
- [x] Verify all copy + face consistency in-file (CEO + developer confirmation)
- [x] Get KR's final "yes" to publish live preview
- [ ] Publish live preview to public link and hand to KR for browser review (publishing in progress)
- [ ] Generate `images/frog-longbreak.png` — per checkpoint: fresh image WITHOUT `referenceImage` if baked-in text is broken (shorter text block); otherwise deliver the latest clean edit; do not retry under another filename
- [ ] Re-encode `frog-face.png` to a real PNG (JPEG bytes under `.png` name may break transparency/editing)
- [ ] Confirm timer face sits correctly in the ring via live browser preview
- [ ] Final QA: full-page div balance, hero/footer, timer behavior, dark mode; then deploy

## Opportunities
- **Complete the state set now** — landing `frog-longbreak.png` unblocks all four frog states and makes final QA deterministic; do this before the review pass. Follow the checkpoint rule: shorter copy + fresh image without `referenceImage` if text is still wrong.
- **Share-card polish** — add favicon + OG meta using `frog-face.png` so the public preview/launch link already reads as the product in chat and social embeds.
- **Frog voice/audio cues** — the mascot set is consistent; short focus/break chimes or voice cues would fulfill the "frog speaks" vision, especially in backgrounded tabs.

## Next Steps
1. Confirm the live preview link is up and hand it to KR for browser review (verify timer face sits in the ring).
2. Generate `images/frog-longbreak.png` (fresh image, same anatomy/palette, clean short text block, no `referenceImage`).
3. Re-encode `frog-face.png` to a clean PNG so transparency/editing isn't broken.
4. Final full-page QA and deploy.

---
*Last updated: 2026-08-14T00:03:00Z*