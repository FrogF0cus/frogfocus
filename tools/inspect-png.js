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
  const corners = {
    topLeft: px(0,0), topRight: px(width-1,0),
    bottomLeft: px(0,height-1), bottomRight: px(width-1,height-1),
    center: px(Math.floor(width/2), Math.floor(height/2))
  };

  let magentaCount = 0, creamCount = 0, transparentCount = 0;
  const magTol = 40;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i+1], b = data[i+2], a = data[i+3];
    if (a < 250) { transparentCount++; continue; }
    if (Math.abs(r-255) <= magTol && g <= magTol && Math.abs(b-238) <= magTol) magentaCount++;
    if (r > 235 && g > 235 && b > 235) creamCount++;
  }
  const total = width * height;
  console.log(`\n=== ${f} === (${isPng ? 'PNG' : 'JPEG'})`);
  console.log(`size: ${width}x${height}`);
  console.log(`transparent px: ${transparentCount} (${(100*transparentCount/total).toFixed(1)}%)`);
  console.log(`magenta-ish px: ${magentaCount} (${(100*magentaCount/total).toFixed(1)}%)`);
  console.log(`cream-ish px: ${creamCount} (${(100*creamCount/total).toFixed(1)}%)`);
  console.log('corners:', JSON.stringify(corners));
}
