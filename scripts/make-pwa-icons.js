#!/usr/bin/env node
// ============================================================================
// Frog Focus — generate PWA/app icons from the approved mascot artwork
// ----------------------------------------------------------------------------
// Source: images/frog-face.png (1024×1024, approved frog mascot — dark-green
// frog with blush, cream belly, gold-rimmed glasses; RGBA with transparent
// background). We bilinear-resize it to the standard PWA sizes and composite
// onto pure white (#FFFFFF) so the icons render as the approved "frog on
// white" look — NOT the cream (#FBF7F0) background of the old sage-on-beige
// design. The maskable icon additionally shrinks the whole image so the
// artwork stays fully inside the center ~80% safe circle (radius 0.38 × size)
// and pads the remainder with white, so maskable masks never clip the frog.
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

const SRC      = path.join(__dirname, '..', 'images', 'frog-face.png');
const WHITE    = { r: 0xFF, g: 0xFF, b: 0xFF };   // approved "on white" background
const SAFE_R   = 0.38;                            // maskable safe radius, fraction of canvas

const SIZES = [
  { file: 'images/icon-192.png',          size: 192 },
  { file: 'images/icon-512.png',          size: 512 },
  { file: 'images/icon-maskable-512.png', size: 512, maskable: true },
  { file: 'images/apple-touch-icon.png',  size: 180 }
];

function bilinear(src, sx, sy) {
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

// Bounding box of opaque artwork (alpha > 0).
function contentBounds(src) {
  let l = src.width, u = src.height, r = -1, d = -1;
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      if (src.data[(y * src.width + x) * 4 + 3] > 0) {
        if (x < l) l = x;
        if (x > r) r = x;
        if (y < u) u = y;
        if (y > d) d = y;
      }
    }
  }
  return { l, u, r, d, found: r >= 0 };
}

const src = PNG.sync.read(fs.readFileSync(SRC));
console.log('source:', SRC, src.width + 'x' + src.height);

// Maskable scale: shrink whole image so the artwork bbox (with its offset
// from the source center) stays inside the safe circle of radius SAFE_R*n.
function maskableShrink(src, n) {
  const bb = contentBounds(src);
  if (!bb.found) return 1;
  const aw = bb.r - bb.l, ah = bb.d - bb.u;
  const ox = (bb.l + bb.r) / 2 - src.width / 2;
  const oy = (bb.u + bb.d) / 2 - src.height / 2;
  const dist = Math.hypot(aw / 2 + Math.abs(ox), ah / 2 + Math.abs(oy));
  return Math.min(1, (SAFE_R * n) / dist);
}

for (const spec of SIZES) {
  const n = spec.size;
  const out = new PNG({ width: n, height: n });
  // Fill white background first.
  for (let i = 0; i < n * n; i++) {
    out.data[i * 4]     = WHITE.r;
    out.data[i * 4 + 1] = WHITE.g;
    out.data[i * 4 + 2] = WHITE.b;
    out.data[i * 4 + 3] = 255;
  }

  let offX = 0, offY = 0, smallW = src.width, smallH = src.height;
  if (spec.maskable) {
    const shrink = maskableShrink(src, n);
    smallW = Math.max(1, Math.round(src.width * shrink));
    smallH = Math.max(1, Math.round(src.height * shrink));
    offX = Math.floor((n - smallW) / 2);
    offY = Math.floor((n - smallH) / 2);
    console.log('  maskable: artwork scaled', shrink.toFixed(3), '-> small canvas', smallW + 'x' + smallH, 'centered');
  }
  const scaleX = src.width / smallW;
  const scaleY = src.height / smallH;

  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const ix = x - offX, iy = y - offY;
      if (ix >= 0 && ix < smallW && iy >= 0 && iy < smallH) {
        const p = bilinear(src, ix * scaleX, iy * scaleY);
        const a = p[3] / 255;
        const i = (y * n + x) * 4;
        out.data[i]     = Math.round(p[0] * a + WHITE.r * (1 - a));
        out.data[i + 1] = Math.round(p[1] * a + WHITE.g * (1 - a));
        out.data[i + 2] = Math.round(p[2] * a + WHITE.b * (1 - a));
        // alpha stays 255 (white filled above)
      }
    }
  }

  const dest = path.join(__dirname, '..', spec.file);
  fs.writeFileSync(dest, PNG.sync.write(out));
  console.log('wrote', spec.file, '(' + n + 'x' + n + ')');
}
console.log('done ✓');
