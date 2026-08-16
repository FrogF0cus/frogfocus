// ============================================================================
// Generate Will clips for EVERY spoken saying (all 23 lines across 5 phases)
// so Will (Relaxed Optimist) is the default voice for the varied rotation.
//
// Output naming: audio/<key>-<n>.mp3  (1-indexed within each phase)
// The 5 existing single-name clips (audio/<key>.mp3) are line 1 of each phase
// and get copied to <key>-1.mp3 so we never regenerate what KR already approved.
//
// Run: node scripts/generate-all-will-clips.js
// ============================================================================

const fs   = require('fs');
const path = require('path');

const API_KEY  = 'sk_6ed090351e4308b37a5b2eb92407732126f4a321d54790c7';
const VOICE_ID = 'bIHbv24MWmeRgasZH58o'; // Will — Relaxed Optimist (American male)
const MODEL_ID = 'eleven_turbo_v2_5';

// Must match SPOKEN_SAYINGS in index.html EXACTLY.
const LINES = {
  'focus-start': [
    `Here we go. Time to focus — and you've got this. I'm rooting for you.`,
    `Deep breath. Let's make the next focus round count. I'm right here with you.`,
    `Time to focus, friend. Settle in — I'll keep an eye on the clock for you.`,
    `Ready when you are. One good block, together. You've got this.`,
    `Focus time. One thing, get the good stuff done, and I'm cheering you on.`,
    `Let's dive in. You focus, I'll watch the lily pads.`
  ],
  'short-break': [
    `Nice work, friend. That was a solid block. Go rest those eyes a moment — you deserve it.`,
    `Good one. Stand up, shake it out, and come back fresh.`,
    `Solid focus. Grab a sip of water and breathe easy for a bit.`,
    `Well done. Roll your shoulders and give those eyes a rest.`,
    `Beautiful. Take a little breather — you've earned it.`
  ],
  'long-break': [
    `Beautiful — you finished the whole round. I'm proud of you. Go take that long break, you've earned every minute.`,
    `Four rounds done. That's a real accomplishment. Now go actually rest — walk, stretch, snack. I'll be here.`,
    `A full cycle complete. This is where the good stuff settles in. Enjoy every minute of this long break.`,
    `You did the whole round. I'm seriously impressed. Give your brain a proper rest now.`
  ],
  'short-back': [
    `Welcome back, friend. Ready to dive in for another one?`,
    `Feeling refreshed? Let's make this next block count.`,
    `Good to see you again. One more focused round, together.`,
    `Ready when you are. Let's go again.`
  ],
  'long-back': [
    `Welcome back. Feeling good? Let's give the next round a go together.`,
    `Nice to have you back. Fresh cycle, fresh start — I'm with you.`,
    `That long break was well earned. Ready to begin a new round together?`,
    `Welcome back, friend. New round, same you — let's do this.`
  ]
};

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

  let generated = 0, skipped = 0, failed = 0;

  for (const [key, texts] of Object.entries(LINES)) {
    // Migrate the existing single-name clip (line 1) to the numbered name.
    const legacy = path.join(OUT_DIR, key + '.mp3');
    const first  = path.join(OUT_DIR, key + '-1.mp3');
    if (fs.existsSync(legacy) && !fs.existsSync(first)) {
      fs.copyFileSync(legacy, first);
      console.log('Copied legacy ' + key + '.mp3  →  ' + key + '-1.mp3');
    }

    for (let i = 0; i < texts.length; i++) {
      const outPath = path.join(OUT_DIR, key + '-' + (i + 1) + '.mp3');
      if (fs.existsSync(outPath) && fs.statSync(outPath).size > 1000) {
        skipped++;
        continue;
      }
      process.stdout.write('[' + key + '-' + (i + 1) + '] synthesizing... ');
      try {
        const buf = await synthesize(texts[i]);
        fs.writeFileSync(outPath, buf);
        generated++;
        console.log('OK — ' + buf.length + ' bytes');
      } catch (err) {
        failed++;
        console.log('FAILED — ' + (err && err.message ? err.message : err));
      }
    }
  }

  console.log('\nDone. generated=' + generated + ' skipped=' + skipped + ' failed=' + failed);
})();
