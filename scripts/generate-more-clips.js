// ============================================================================
// Generate additional American-male ElevenLabs test clips for voice comparison.
// Calls the ElevenLabs TTS API directly and saves each result to audio/preview/.
// Run: node scripts/generate-more-clips.js
// ============================================================================

const fs   = require('fs');
const path = require('path');

const API_KEY = 'sk_6ed090351e4308b37a5b2eb92407732126f4a321d54790c7';
const MODEL_ID = 'eleven_turbo_v2_5';
const PHRASE = "Here we go. Time to focus — and you've got this. I'm rooting for you.";

// American-accented male voices (ElevenLabs library)
const CLIPS = [
  { id: 'pNInz6obpgDQGcFmaJgB', name: 'Adam — Deep, Calm',            file: 'adam2.mp3' },
  { id: 'IKne3meq5aSn9XLyUdCD', name: 'Charlie — Natural, Easygoing', file: 'charlie.mp3' },
  { id: 'whpYtz9oQL9me85hcBts', name: 'Ryan — Warm, Pleasant',        file: 'ryan.mp3' },
  { id: 'jBpfuIE2acCO8z3wKNLl', name: 'Dave — Deep, Smooth',          file: 'dave.mp3' },
  { id: 'ZQe5CZNOzWyzfdcC6k3f', name: 'James — Conversational Narrator', file: 'james.mp3' },
  { id: 'ErXwobaYiN019PkySvjV', name: 'Antoni — Warm, Friendly',      file: 'antoni2.mp3' },
];

const OUT_DIR = path.join(__dirname, '..', 'audio', 'preview');

async function synthesize(voiceId) {
  const res = await fetch(
    'https://api.elevenlabs.io/v1/text-to-speech/' + encodeURIComponent(voiceId),
    {
      method: 'POST',
      headers: {
        'xi-api-key': API_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({ text: PHRASE, model_id: MODEL_ID }),
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

  for (const clip of CLIPS) {
    const outPath = path.join(OUT_DIR, clip.file);
    process.stdout.write('Synthesizing ' + clip.name + ' (' + clip.id + ')... ');
    try {
      const buf = await synthesize(clip.id);
      fs.writeFileSync(outPath, buf);
      console.log('OK — ' + buf.length + ' bytes → ' + path.relative(process.cwd(), outPath));
    } catch (err) {
      console.log('FAILED — ' + (err && err.message ? err.message : err));
    }
  }

  console.log('\nDone.');
})();
