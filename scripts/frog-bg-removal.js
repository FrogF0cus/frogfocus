/**
 * Convert images/frog-longbreak.png -> true transparent PNG (real alpha).
 *
 * The frog is rendered on a baked-in light neutral background (near-white /
 * off-white, R==G==B everywhere in the background). Our job: punch ONLY the
 * background out to real transparency, leaving the exact frog character intact
 * (cozy green frog, oversized round golden-yellow glasses, both arms raised in
 * celebration).
 *
 * Approach:
 *   1. Decode the source to RGBA. The file may be a PNG (RGBA) or a JPEG that
 *      was shipped with a `.png` extension — detect by magic bytes.
 *   2. Score each pixel's "backgroundness" (ignoring any pre-existing alpha):
 *        chroma  = max(r,g,b) - min(r,g,b)          (how far off the gray axis)
 *        lum     = (r+g+b)/3
 *        bgdist  = chroma + max(0, 235 - lum)
 *      Background = neutral (chroma ~0) and bright -> bgdist ~0.
 *      Frog       = colored (green/gold/cream) and/or darker -> high bgdist.
 *   3. Flood-fill from the image border (4-connectivity) through pixels with
 *      bgdist < D_HI to find the CONNECTED background region. Flood-filling
 *      (rather than a global threshold) protects interior bright pixels from
 *      being punched out — e.g. the white specular highlights on the gold
 *      glasses are the same neutral-white as the background, but they are
 *      enclosed by the colored glasses so the flood never reaches them.
 *   4. Inside the flood region apply a soft (smoothstep) alpha ramp between
 *      D_LO and D_HI so anti-aliased edge pixels fade out cleanly instead of
 *      leaving a harsh halo. Everything outside the region stays fully opaque.
 *   5. Encode as RGBA PNG (pngjs) with a real alpha channel, saving over the
 *      same path, then verify the written file actually has alpha.
 */

const fs = require('fs');
const path = require('path');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

const SRC = path.join(__dirname, '..', 'images', 'frog-longbreak.png');
const OUT = SRC; // save over the same path

// ---- tunables ----
const D_LO = 10; // below this: fully transparent
const D_HI = 30; // above this: fully opaque (also the flood traversal bound)
const LUM_REF = 235; // background luma reference

function decode(src) {
  const buf = fs.readFileSync(src);
  const isPNG = buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47;
  if (isPNG) {
    const png = PNG.sync.read(buf); // returns { width, height, data (RGBA) }
    return { width: png.width, height: png.height, data: png.data };
  }
  // Older source files shipped as `.png` but were actually JPEG.
  const img = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true });
  return { width: img.width, height: img.height, data: img.data };
}

function buildBgdist(width, height, data) {
  const bgdist = new Float32Array(width * height);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 4];
    const g = data[i * 4 + 1];
    const b = data[i * 4 + 2];
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    const lum = (r + g + b) / 3;
    bgdist[i] = chroma + Math.max(0, LUM_REF - lum);
  }
  return bgdist;
}

// Flood fill from the border. Returns Uint8Array mask: 1 = background region, 0 = keep.
function floodBackground(width, height, bgdist, threshold) {
  const mask = new Uint8Array(width * height);
  const stack = [];

  const seed = (x, y) => {
    const i = y * width + x;
    if (!mask[i] && bgdist[i] < threshold) {
      mask[i] = 1;
      stack.push(i);
    }
  };

  for (let x = 0; x < width; x++) {
    seed(x, 0);
    seed(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    seed(0, y);
    seed(width - 1, y);
  }

  while (stack.length) {
    const p = stack.pop();
    const x = p % width;
    const y = (p / width) | 0;
    if (x > 0) seed(x - 1, y);
    if (x < width - 1) seed(x + 1, y);
    if (y > 0) seed(x, y - 1);
    if (y < height - 1) seed(x, y + 1);
  }

  return mask;
}

function smoothstep(t) {
  return t * t * (3 - 2 * t);
}

function applyAlpha(width, height, data, bgdist, mask) {
  const out = new Uint8Array(width * height * 4);
  const range = D_HI - D_LO;
  for (let i = 0; i < width * height; i++) {
    const o = i * 4;
    out[o] = data[o];
    out[o + 1] = data[o + 1];
    out[o + 2] = data[o + 2];
    if (mask[i]) {
      const t = Math.min(1, Math.max(0, (bgdist[i] - D_LO) / range));
      out[o + 3] = Math.round(smoothstep(t) * 255);
    } else {
      out[o + 3] = 255;
    }
  }
  return out;
}

function main() {
  const { width, height, data } = decode(SRC);
  console.log(`Decoded ${SRC}: ${width}x${height}`);

  const bgdist = buildBgdist(width, height, data);
  const mask = floodBackground(width, height, bgdist, D_HI);

  let bgCount = 0;
  for (let i = 0; i < width * height; i++) if (mask[i]) bgCount++;
  console.log(
    `Background region: ${bgCount} px (${((100 * bgCount) / (width * height)).toFixed(1)}%)`
  );

  const rgba = applyAlpha(width, height, data, bgdist, mask);

  const png = new PNG({ width, height });
  Buffer.from(rgba.buffer, rgba.byteOffset, rgba.byteLength).copy(png.data);
  fs.writeFileSync(OUT, PNG.sync.write(png));
  console.log(`Wrote ${OUT} (${fs.statSync(OUT).size} bytes)`);

  // ---- self-verify the written file has a real alpha channel ----
  const check = PNG.sync.read(fs.readFileSync(OUT));
  let minA = 255, maxA = 0, transparent = 0, opaque = 0, partial = 0;
  for (let i = 3; i < check.data.length; i += 4) {
    const a = check.data[i];
    if (a < minA) minA = a;
    if (a > maxA) maxA = a;
    if (a === 0) transparent++;
    else if (a === 255) opaque++;
    else partial++;
  }
  const total = width * height;
  console.log(
    `VERIFY: alpha range [${minA},${maxA}] · transparent=${(100 * transparent / total).toFixed(1)}% · ` +
    `opaque=${(100 * opaque / total).toFixed(1)}% · anti-aliased edge=${partial}px`
  );
  const hasAlpha = minA < 255;
  console.log(hasAlpha ? 'PASS — output has a real alpha channel.' : 'FAIL — output is fully opaque.');
  if (!hasAlpha) process.exitCode = 1;
}

main();
