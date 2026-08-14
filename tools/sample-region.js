const fs = require('fs');
const { PNG } = require('/tmp/pngwork/node_modules/pngjs');
const f = process.argv[2];
const png = PNG.sync.read(fs.readFileSync(f));
const { width: W, height: H, data } = png;

// sample region (args: x0 y0 x1 y1)
const [x0,y0,x1,y1] = process.argv.slice(3).map(Number);
const rows = [];
for (let y = y0; y < y1; y += 4) {
  const row = [];
  for (let x = x0; x < x1; x += 4) {
    const i = (y*W+x)*4;
    row.push(`(${data[i]},${data[i+1]},${data[i+2]},a${data[i+3]})`);
  }
  rows.push(`y${y}: ${row.join(' ')}`);
}
console.log(rows.join('\n'));
