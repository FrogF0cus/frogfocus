const fs = require('fs');
const { PNG } = require('/tmp/pngwork/node_modules/pngjs');
const f = process.argv[2];
const png = PNG.sync.read(fs.readFileSync(f));
const { width: W, height: H, data } = png;

// bg measured per image (approx magenta)
const bg = f.includes('short') ? [252,41,166] : [252,35,164];
const [br,bgG,bb] = bg;

// scan OPAQUE pixels near the frog edge: distance to bg between 105 and 260
const band = [];
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y*W+x)*4;
    if (data[i+3] !== 255) continue;
    const r=data[i],g=data[i+1],b=data[i+2];
    const d = Math.hypot(r-br, g-bgG, b-bb);
    if (d >= 105 && d <= 260) band.push({x,y,r,g,b,d});
  }
}
console.log(`${f}: ${band.length} opaque px in 105..260 band`);
// histogram of (B-G) excess
const hist = {};
for (const p of band) {
  const k = p.b - p.g;
  const bucket = k >= 30 ? 'b-g>=30 (strong magenta)' : k >= 10 ? 'b-g 10..29 (magenta-ish)' : k >= 0 ? 'b-g 0..9 (neutral)' : 'b-g<0 (green/warm)';
  hist[bucket] = (hist[bucket]||0)+1;
}
console.log('B-G histogram:', hist);
// samples of the strongest magenta-ish pixels
const strong = band.filter(p => p.b - p.g >= 20).sort((a,b) => (b.b-b.g)-(a.a-a.g)).slice(0, 12);
console.log('strongest magenta-ish samples (x,y,r,g,b,dist):');
for (const p of strong) console.log(`  (${p.x},${p.y}) rgb(${p.r},${p.g},${p.b}) d=${p.d.toFixed(0)} b-g=${p.b-p.g}`);
