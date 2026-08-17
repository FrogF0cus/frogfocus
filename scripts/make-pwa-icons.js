#!/usr/bin/env node
// ============================================================================
// Frog Focus — generate PWA/app icons from the existing mascot artwork
// ----------------------------------------------------------------------------
// Source: images/frog-focus-logo-a.png (1024×1024, centered frog face on warm
// cream). We bilinear-resize it to the standard PWA sizes and composite onto
// the locked brand cream (#FBF7F0) so every icon is full-bleed and cozy — the
// same cream works as the maskable safe-zone background.
//
// Outputs:
//   images/icon-192.png            (192×192, purpose: any)
//   images/icon-512.png            (512×512, purpose: any)
//   images/icon-maskable-512.png   (512×512, purpose: maskable)
//   images/apple-touch-icon.png    (180×180, iOS home screen)
//
// Run:  node scripts/make-pwa-icons.js
// ============================================================================

const fs   = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const SRC      = path.join(__dirname, '..', 'images', 'frog-focus-logo-a.png');
const CREAM    = { r: 0xFB, g: 0xF7, b: 0xF0 };   // locked brand cream #FBF7F0

const SIZES = [
  { file: 'images/icon-192.png',          size: 192 },
  { file: 'images/icon-512.png',          size: 512 },
  { file: 'images/icon-maskable-512.png', size: 512 },
  { file: 'images/apple-touch-icon.png',  size: 180 }
];

function bilinear(src, sx, sy) {
  // Clamp into [0, srcW-1]
  const w = src.width, h = src.height;
  sx = Math.max(0, Math.min(w - 1, sx));
  sy = Math.max(0, Math.min(h - 1, sy));
  const x0 = Math.floor(sx), y0 = Math.floor(sy);
  const x1 = Math.min(w - 1, x0 + 1), y1 = Math.min(h - 1, y0 + 1);
  const fx = sx - x0, fy = sy - y0;
  const px = (x, y) => {
    const i = (y * w + x) * 4;
    return [src.data[i], src.data[i+1], src.data[i+2], src.data[i+3]];
  };
  const a = px(x0, y0), b = px(x1, y0), c = px(x0, y1), d = px(x1, y1);
  const out = [0, 0, 0, 0];
  for (let k = 0; k < 4; k++) {
    const top = a[k] * (1 - fx) + b[k] * fx;
    const bot = c[k] * (1 - fx) + d[k] * fx;
    out[k] = top * (1 - fy) + bot * fy;
  }
  return out;
}

const src = PNG.sync.read(fs.readFileSync(SRC));
console.log('source:', SRC, src.width + 'x' + src.height);

for (const spec of SIZES) {
  const n = spec.size;
  const out = new PNG({ width: n, height: n });
  const scale = src.width / n;

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const p = bilinear(src, x * scale, y * scale);
      const a = p[3] / 255;
      // Composite source (with alpha) over the cream background.
      const r = Math.round(p[0] * a + CREAM.r * (1 - a));
      const g = Math.round(p[1] * a + CREAM.g * (1 - a));
      const b = Math.round(p[2] * a + CREAM.b * (1 - a));
      const i = (y * n + x) * 4;
      out.data[i]     = r;
      out.data[i + 1] = g;
      out.data[i + 2] = b;
      out.data[i + 3] = 255;   // fully opaque, full-bleed
    }
  }

  const dest = path.join(__dirname, '..', spec.file);
  fs.writeFileSync(dest, PNG.sync.write(out));
  console.log('wrote', spec.file, '(' + n + 'x' + n + ')');
}
console.log('done ✓');
