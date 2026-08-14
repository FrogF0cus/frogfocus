/* Chroma-key a JPEG/PNG on a measured magenta background into a true-alpha PNG.
   Usage: node key-magenta.js <src> <dst> [keyT] [edgeT]
     keyT  - euclidean RGB distance below which alpha=0 (tight key)
     edgeT - distance above which alpha=255 (feather ends; keep below frog colors)
   Also prints diagnostics: measured bg, opaque-pixel min distance (frog safety), counts.
*/
const fs = require('fs');
const jpeg = require('/tmp/pngwork/node_modules/jpeg-js');
const { PNG } = require('/tmp/pngwork/node_modules/pngjs');

function measureBg(data, w, h) {
  const P = 20;
  const patches = [[0,0],[w-P,0],[0,h-P],[w-P,h-P]];
  let r=0,g=0,b=0,n=0;
  for (const [ox,oy] of patches) {
    for (let y=oy;y<oy+P;y++) for (let x=ox;x<ox+P;x++) {
      const i=(y*w+x)*4; r+=data[i]; g+=data[i+1]; b+=data[i+2]; n++;
    }
  }
  return [r/n, g/n, b/n];
}

const src = process.argv[2];
const dst = process.argv[3];
const keyT = +(process.argv[4] || 45);
const edgeT = +(process.argv[5] || 105);

const buf = fs.readFileSync(src);
let w, h, data;
if (buf[0] === 0x89) {
  const p = PNG.sync.read(buf); w = p.width; h = p.height; data = Buffer.from(p.data);
} else {
  const img = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true });
  w = img.width; h = img.height; data = Buffer.from(img.data);
}

const bg = measureBg(data, w, h);
const [br, bgG, bb] = bg;

const out = Buffer.alloc(w * h * 4);
let minOpaqueDist = Infinity, maxKeyedDist = 0, keyed = 0, opaque = 0, featherCount = 0;

for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i+1], b = data[i+2];
  const dr = r - br, dg = g - bgG, db = b - bb;
  const d = Math.sqrt(dr*dr + dg*dg + db*db);
  let a;
  if (d <= keyT) { a = 0; keyed++; if (d > maxKeyedDist) maxKeyedDist = d; }
  else if (d >= edgeT) { a = 255; opaque++; if (d < minOpaqueDist) minOpaqueDist = d; }
  else {
    const t = (d - keyT) / (edgeT - keyT);
    const s = t * t * (3 - 2 * t);
    a = Math.round(255 * s);
    featherCount++;
  }
  let R = r, G = g, B = b;
  if (a > 0 && a < 255) {
    // defringe: un-mix blend pixel = a*frog + (1-a)*bg  =>  frog = (px - (1-a)*bg) / a
    const t = (255 - a) / 255;
    const inv = 1 / (a / 255);
    R = Math.max(0, Math.min(255, Math.round((r - t * br) * inv)));
    G = Math.max(0, Math.min(255, Math.round((g - t * bgG) * inv)));
    B = Math.max(0, Math.min(255, Math.round((b - t * bb) * inv)));
  }
  if (a > 0 && d < 240) {
    // despill (applies to feather AND opaque pixels): JPEG ringing pixels are not
    // true blends, so un-mix alone leaves a magenta cast. Magenta/pink lifts R and
    // B relative to G; the frog's legit palette (sage/cream/clay/gold/charcoal)
    // always keeps B clearly BELOW G and green-dominant colors keep R below G.
    // So: B not clearly below G  AND  R clearly above G  => contaminated.
    if ((b - g) > -10 && (r - g) > 25) {
      const strength = Math.max(0.15, Math.min(1, (b - g + 10) / 50));
      B = Math.round(g - 14 * strength);
      R = Math.round(g + 18 * strength);
    }
  }
  out[i] = R; out[i+1] = G; out[i+2] = B; out[i+3] = a;
}

const png = new PNG({ width: w, height: h });
out.copy(png.data);
fs.writeFileSync(dst, PNG.sync.write(png));

console.log(JSON.stringify({
  src, dst, size: `${w}x${h}`,
  bg: bg.map(v => Math.round(v)),
  keyT, edgeT,
  keyedPx: keyed, featherPx: featherCount, opaquePx: opaque,
  maxKeyedDist: +maxKeyedDist.toFixed(1),
  minOpaqueDist: minOpaqueDist === Infinity ? null : +minOpaqueDist.toFixed(1),
  bytesOut: fs.statSync(dst).size
}, null, 2));
