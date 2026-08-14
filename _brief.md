# Frog Focus - Project Brief

## Vision & Goals
- Single-page Pomodoro companion ("Frog Focus — your intentional productivity companion"), inspired by pomodorokitty.com — not a clone.
- Flat-vector frog mascot as consistent identity (sage green body, cream belly, clay accents, golden-rimmed round glasses, warm yellow eyes, thin charcoal linework); phase-specific visuals auto-swap, no frog picker.
- Positioning locked: **"your intentional productivity companion"** — a **productive tool**; "Slow down. Focus. Get the good stuff done."; the frog is a **friend**.
- Timer voice: warm, comforting, encouraging. **Antoni (ElevenLabs) locked as default; words locked verbatim; only delivery changes.**
- Secure voice pipeline: ElevenLabs via Express proxy with phrase caching — key lives only in server env; browser `speechSynthesis` fallback. Wiring complete and smoke-tested.
- Deployment target identified (unfunded): headless VPS (1 GB RAM, $36/year) — local run bridge is the gate.
- **Share in the Emporium:** KR is eager to publish the finished page to the community; the public link lives under the project, and KR (as account owner) is the one whose name shows on the post.

## Current Status
- **Hint-text removal complete and confirmed:** both "Press space to begin" (idle) and "Space to pause" (running) are hidden; the **space-bar shortcut still works**. Edits applied to `index.html` (`hintText()` + initial HTML default); KR ran a full timer cycle to feel the result.
- **Emporium publishing flow — partial answer given:** CEO confirmed the public link lives under the project and that KR, as account owner, is the one who posts from her account — so the post shows under KR's name. The finer mechanics (exact listing flow, display-name behavior) are **not yet confirmed**. CEO offered to pull the docs and file a note to the admin's review queue for a definitive answer.
- **Editing-after-publish model clarified for KR:** this chat is the control room; publishing puts a *copy* at the public link; editing is never locked; "publish" / "re-publish" pushes the fresh version to the same link.
- **KR is eager to