// ============================================================================
// Generate the five production frog lines with Will's voice and save them to
// the exact files the app loads at runtime (audio/*.mp3). The app's PHRASE_AUDIO
// map points at these files; each plays when the frog speaks.
//
// Run: node scripts/generate-will-clips.js
// ============================================================================

const fs   = require('fs');
const path = require('path');

const API_KEY = 'sk_6ed090351e4308b37a5b2eb92407732126f4a321d54790c7';
const VOICE_ID = 'bIHbv24MWmeRgasZH58o'; // Will — Relaxed Optimist (American male)
const MODEL_ID = 'eleven_turbo_v2_5';

// Must match the phrases + keys in index.html PHRASE_AUDIO / speakPhrase calls.
const LINES = [
  { key: 'focus-start', text: "Here we go. Time to focus — and you've got this. I'm rooting for you." },
  { key: 'short-break', text: "Nice work, friend. That was a solid block. Go rest those eyes a moment — you deserve it." },
  { key: 'long-break', text: "Beautiful — you finished the whole round. I'm proud of you. Go take that long break, you've earned every minute." },
  { key: 'short-back', text: "Welcome back, friend. Ready to dive in for another one?" },
  { key: 'long-back', text: "Welcome back. Feeling good? Let's give the next round a go together." },
];

const OUT_DIR = path.join(__dirname, '..', 'audio');

async function synthesize(text) {
  const res = await fetch(
    'https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(VOICE_ID),
    {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({ text, model_id: MODEL_ID }),
    }
  );
  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error('ElevenLabs HTTP ' + res.status + ': ' + errText.slice(0, 300));
  }
  return Buffer.from(await res.arrayBuffer());
}

(async function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  for (const line of LINES) {
    const outPath = path.join(OUT_DIR, line.key + '.mp3');
    process.stdout.write('Synthesizing [' + line.key + ']... ');
    try {
      const buf = await synthesize(line.text);
      fs.writeFileSync(outPath, buf);
      console.log('OK — ' + buf.length + ' bytes → audio/' + line.key + '.mp3');
    } catch (err) {
      console.log('FAILED — ' + (err && err.message ? err.message : err));
    }
  }

  console.log('\nDone.');
})();
