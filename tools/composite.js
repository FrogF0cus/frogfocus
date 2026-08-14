/* Composite true-alpha frog PNGs over a checkerboard and write zoom crops for visual QA.
   Usage: node composite.js <frog.png> <out-composite.png> <out-zoom.png> */
const fs = require('fs');
const { PNG } = require('/tmp/pngwork/node_modules/pngjs');

const [src, outComp, outZoom] = process.argv.slice(2);
const frog = PNG.sync.read(fs.readFileSync(src));
const W = frog.width, H = frog.height;

// checkerboard bg, warm cream + soft sage-tinted gray (proves alpha both ways)
function checker(x, y) {
  const sq = 16;
  const on = ((Math.floor(x / sq) + Math.floor(y / sq)) % 2) === 0;
  return on ? [0xE9, 0xE3, 0xD5] : [0xD8, 0xD1, 0xC0];
}

const comp = new PNG({ width: W, height: H });
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const [cr, cg, cb] = checker(x, y);
    const fr = frog.data[i], fg = frog.data[i+1], fb = frog.data[i+2], fa = frog.data[i+3] / 255;
    comp.data[i]   = Math.round(fr * fa + cr * (1 - fa));
    comp.data[i+1] = Math.round(fg * fa + cg * (1 - fa));
    comp.data[i+2] = Math.round(fb * fa + cb * (1 - fa));
    comp.data[i+3] = 255;
  }
}
fs.writeFileSync(outComp, PNG.sync.write(comp));

// zoom crop: frog alpha bbox + margin, upscale 3x
let minX=W, minY=H, maxX=-1, maxY=-1;
for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
  if (frog.data[(y*W+x)*4+3] > 0) {
    if (x<minX)minX=x; if (x>maxX)maxX=x; if (y<minY)minY=y; if (y>maxY)maxY=y;
  }
}
const M = 36;
const x0 = Math.max(0, minX - M), y0 = Math.max(0, minY - M);
const x1 = Math.min(W, maxX + M), y1 = Math.min(H, maxY + M);
const cw = x1 - x0, ch = y1 - y0, S = 3;
const zoom = new PNG({ width: cw * S, height: ch * S });
for (let y = 0; y < ch; y++) {
  for (let x = 0; x < cw; x++) {
    const i = ((y0+y)*W + (x0+x))*4;
    const fr = frog.data[i], fg = frog.data[i+1], fb = frog.data[i+2], fa = frog.data[i+3]/255;
    const [cr, cg, cb] = checker(x0+x, y0+y);
    const pr = Math.round(fr*fa + cr*(1-fa)), pg = Math.round(fg*fa + cg*(1-fa)), pb = Math.round(fb*fa + cb*(1-fa));
    for (let sy=0; sy<S; sy++) for (let sx=0; sx<S; sx++) {
      const o = ((y*S+sy)*zoom.width + (x*S+sx))*4;
      zoom.data[o]=pr; zoom.data[o+1]=pg; zoom.data[o+2]=pb; zoom.data[o+3]=255;
    }
  }
}
fs.writeFileSync(outZoom, PNG.sync.write(zoom));
console.log(`wrote ${outComp} (${W}x${H}), ${outZoom} (${cw*S}x${ch*S})`);
