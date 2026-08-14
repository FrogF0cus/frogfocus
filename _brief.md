# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion — **"Frog Focus — your intentional productivity companion"**, inspired by pomodorokitty.com, not a clone.
- Flat-vector frog mascot: sage green body, cream belly, clay accents, golden-rimmed glasses, warm yellow eyes, thin charcoal linework; phase-specific visuals auto-swap. **KR accepted the current frog as-is** — no further mascot iteration.
- Positioning locked: a **productive tool**; tagline "Slow down. Focus. Get the good stuff done."; the frog is a **friend**.
- Timer voice: warm, comforting, encouraging — rebuilt to **"talk like a friend"**. KR's stated ship gate: **solve the voice, then ship.**

## Current Status
- **Voice is the remaining blocker.** KR chose **path 2 (fully in-browser)** and asked "what are my options within 2" — answer still pending.
- Root-cause found: `server.js` locks in **Antoni** (`ErXwobaYiN019PkySvjV`) as the ElevenLabs default, but only if the node backend is reachable at `/api/tts`. When served as a static file, it silently falls back to browser voices — which is why KR hears non-Antoni today.
- Original "British" voice was never custom-built — it was the browser's default British TTS (robotic). Going back = choosing browser voice defaults, not restoring a created asset.
- Three break-saying copy swaps **completed** in `index.html`: "Blink slow, little frog" → "Close your eyes, slow count"; "A sip for the pond, pal" → "Refill the cup, then back"; "You earned the big one" → "The grand rest — take it".
- Frog PNG fix shipped; KR reminded to hard-refresh (Ctrl/Cmd+Shift+R) to bypass cache.

## Files & Structure
- **Core Page**: `index.html` (73KB) — entire single-page app, contains the voice-picker (Voice dropdown + Test voice button), break sayings, timer face, frog visuals.
- **Backend**: `server.js` (5KB) — ElevenLabs TTS proxy; holds the Antoni voice key server-side at `/api/tts`.
- **Documentation**: `TTS-SETUP.md` (4KB) — voice setup/architecture notes.
- **Static Assets**: `images/` (8 files — includes `frog-face.png`, currently JPEG bytes under a .png name), `audio/` (1 file), `uploads/` (10 files).
- **Dependencies**: `package.json` (0KB), `package-lock.json` (29KB), `node_modules/` (71 files).
- **Scripts**: `scripts/` (1 file).

## Key Decisions Made
- **Voice path**: stick with path 2 (in-browser) for now; options within it still to be enumerated.
- **Mascot**: accept the current frog ("it's the wrong frog but let's just roll with it").
- **Backend default**: Antoni (ElevenLabs) remains the server-side default; browser voices are the fallback.
- **Copy**: three break sayings swapped exactly as specified; all other sayings untouched.
- **Ship gate**: voice solved → ship.

## Pending Decisions
- **Path-2 voice options** — which browser voices to expose/prefer in the picker, and what the default selection order should be (KR's open question).
- **Backend fate** — keep the ElevenLabs `server.js` dependency or go fully in-browser/static.
- **KR's Five Page Edits** — dark mode → frog green, "productive tool" positioning, "the what" section, beverage line, recharge copy — queued, not yet dispatched to Koba.
- **frog-face.png re-encode** — convert JPEG-byte file to a true PNG for transparency/editing safety.

## Tasks
- [x] Swap three break sayings in `index.html`
- [x] Fix frog PNG asset (wrong frog, accepted by KR)
- [ ] Answer KR's question: enumerate voice-picker options within path 2
- [ ] Confirm default voice-selection strategy (restore familiar British feel via browser voice order, e.g., prefer Google UK English / Daniel)
- [ ] Apply KR's Five Page Edits (frog-green dark mode, "productive tool", "the what", beverage line, recharge copy)
- [ ] Re-encode `frog-face.png` to a real PNG
- [ ] Open `index.html` in Chrome and confirm the timer face sits correctly inside the ring
- [ ] Run a final live cycle to hear the updated break sayings
- [ ] Ship once voice is confirmed

## Opportunities
1. **Curate the path-2 default voice order** to mirror the original British feel (UK English voices first) — returns the voice KR remembers without any backend work, and makes the in-browser path feel intentional rather than a fallback.
2. **Drop the backend entirely** — if in-browser voices satisfy KR, removing `server.js` + the ElevenLabs dependency makes the project a pure static site (trivial hosting, no API key management, no silent-reachability bugs like the one that confused this session).
3. **Add cache-busting** — stale-cached PNGs caused real friction this session. Versioned filenames (`?v=` or hashed names) would make future deploys instantly visible to KR without hard-refresh reminders.

## Next Steps
- Give KR the concrete path-2 voice options (what the picker lists, what Test voice does, what each voice sounds like).
- Decide the default voice-selection order; implement in `index.html`.
- Dispatch Koba on the Five Page Edits and the `frog-face.png` re-encode.
- Run the live timer-face check in Chrome.
- Ship after KR confirms the voice.

---
*Last updated: 2026-08-14T17:08:53.033Z*