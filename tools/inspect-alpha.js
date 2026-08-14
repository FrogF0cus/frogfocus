const fs = require('fs');
const jpeg = require('/tmp/pngwork/node_modules/jpeg-js');
const { PNG } = require('/tmp/pngwork/node_modules/pngjs');

const files = process.argv.slice(2);
for (const f of files) {
  const buf = fs.readFileSync(f);
  const isPng = buf[0] === 0x89 && buf[1] === 0x50;
  let width, height, data;
  if (isPng) {
    const png = PNG.sync.read(buf);
    width = png.width; height = png.height; data = png.data;
  } else {
    const img = jpeg.decode(buf, { useTArray: true, formatAsRGBA: true });
    width = img.width; height = img.height; data = img.data;
  }
  function px(x, y) {
    const i = (y * width + x) * 4;
    return [data[i], data[i+1], data[i+2], data[i+3]];
  }

  let transparent = 0, opaque = 0, feather = 0, magentaNear = 0;
  let minOpaqueMag = Infinity;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i+3];
    if (a === 0) { transparent++; continue; }
    if (a === 255) {
      opaque++;
      const r=data[i], g=data[i+1], b=data[i+2];
      // distance to pure-ish magenta (JPEG-smudged target ~ (250,40,165))
      const d = Math.hypot(r-250, g-40, b-165);
      if (d < 70) { magentaNear++; if (d < minOpaqueMag) minOpaqueMag = d; }
    } else feather++;
  }
  // frog bbox: min/max of opaque pixels
  let minX=width, minY=height, maxX=-1, maxY=-1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y*width+x)*4+3] > 0) {
        if (x<minX)minX=x; if (x>maxX)maxX=x; if (y<minY)minY=y; if (y>maxY)maxY=y;
      }
    }
  }
  const cx = Math.floor(width/2);
  const centers = [];
  for (const probe of [[cx, Math.floor(height*0.5)], [Math.floor(width*0.5), Math.floor(height*0.55)], [Math.floor(width*0.42), Math.floor(height*0.46)], [Math.floor(width*0.58), Math.floor(height*0.46)]]) {
    centers.push(px(probe[0], probe[1]));
  }
  console.log(`\n=== ${f} === (${isPng ? 'PNG' : 'JPEG'}) ${width}x${height}`);
  console.log(`corners alpha: ${px(0,0)[3]}, ${px(width-1,0)[3]}, ${px(0,height-1)[3]}, ${px(width-1,height-1)[3]} (0 = transparent)`);
  console.log(`transparent: ${transparent} (${(100*transparent/(width*height)).toFixed(1)}%) | opaque: ${opaque} | feather: ${feather}`);
  console.log(`opaque px within 70 of magenta: ${magentaNear} (min dist ${minOpaqueMag===Infinity?'-':minOpaqueMag.toFixed(1)})`);
  console.log(`frog alpha bbox: x[${minX}..${maxX}] y[${minY}..${maxY}] (w=${maxX-minX+1}, h=${maxY-minY+1})`);
  console.log(`probe alphas (center/body): ${centers.map(c=>c[3]).join(', ')}`);
}
