#!/usr/bin/env python3
"""Build the corrected frog-mascot.svg from measured icon-192 geometry + render apple-touch-icon.png."""
import zlib, struct, subprocess, json, math

# ---------------- decode icon-192.png ----------------
def decode_png(path):
    with open(path,'rb') as f: data=f.read()
    pos=8; w=h=None; idat=b''
    while pos<len(data):
        ln=struct.unpack('>I',data[pos:pos+4])[0]; ct=data[pos+4:pos+8]; ch=data[pos+8:pos+8+ln]
        if ct==b'IHDR': w,h,bd,color_type=struct.unpack('>IIBB',ch[:10])
        elif ct==b'IDAT': idat+=ch
        elif ct==b'IEND': break
        pos+=12+ln
    raw=zlib.decompress(idat); chn={0:1,2:3,3:1,4:2,6:4}[color_type]
    stride=w*chn; out=bytearray(w*h*chn); prev=bytearray(stride); p=0
    for y in range(h):
        ft=raw[p]; p+=1; line=bytearray(raw[p:p+stride]); p+=stride
        if ft==1:
            for i in range(chn,stride): line[i]=(line[i]+line[i-chn])&255
        elif ft==2:
            for i in range(stride): line[i]=(line[i]+prev[i])&255
        elif ft==3:
            for i in range(stride):
                a=line[i-chn] if i>=chn else 0; b=prev[i]
                line[i]=(line[i]+((a+b)>>1))&255
        elif ft==4:
            for i in range(stride):
                a=line[i-chn] if i>=chn else 0; b=prev[i]; c=prev[i-chn] if i>=chn else 0
                pa=abs(b-c); pb=abs(a-c); pc=abs(a+b-2*c)
                pr=a if (pa<=pb and pa<=pc) else (b if pb<=pc else c)
                line[i]=(line[i]+pr)&255
        out[y*stride:(y+1)*stride]=line; prev=line
    return w,h,chn,bytes(out)
w,h,ch,buf=decode_png('images/icon-192.png')
def get(x,y):
    i=(y*w+x)*ch; return (buf[i],buf[i+1],buf[i+2])

# ---------------- sample remaining colors ----------------
def med(pred, x0=0,y0=0,x1=w,y1=h):
    import collections
    c=collections.Counter()
    for y in range(y0,y1):
        for x in range(x0,x1):
            r,g,b=get(x,y)
            if pred(r,g,b): c[(r,g,b)]+=1
    return c.most_common(1)[0][0] if c else None
def is_cream(r,g,b): return r>232 and g>215 and b>190 and (r-b)>28 and (r-b)<95
def is_gold(r,g,b): return r>185 and g>140 and b<175 and (r-b)>55 and (r-g)<90
def is_darkish(r,g,b): return r<140 and g<130 and b<130
band = med(lambda r,g,b: r>210 and g>195 and b>165 and r<245 and g<235 and 120<r-g<60 and r>g and g>b, 82,134,112,146)
print("shading band color:", band and '#%02x%02x%02x'%band)
lens_in = med(lambda r,g,b: r>200 and g>160 and b>100 and r<255 and (r-b)>60 and r>g, 56,70,90,96)
print("lens interior:", lens_in and '#%02x%02x%02x'%lens_in)
blush_c = med(lambda r,g,b: r>185 and g>140 and b>115 and r>g and g<215 and (r-g)>15, 54,96,66,104)
print("blush:", blush_c and '#%02x%02x%02x'%blush_c)

# ---------------- Catmull-Rom -> cubic bezier ----------------
def catmull(pts):
    """Return SVG path d through pts with Catmull-Rom smoothing (closed=False)."""
    if len(pts)<2: return ""
    d = f"M {pts[0][0]:.1f} {pts[0][1]:.1f}"
    n=len(pts)
    for i in range(n-1):
        p0 = pts[i-1] if i>0 else pts[0]
        p1 = pts[i]
        p2 = pts[i+1]
        p3 = pts[i+2] if i+2<n else pts[-1]
        # tension 0.5
        c1x = p1[0] + (p2[0]-p0[0])/6.0
        c1y = p1[1] + (p2[1]-p0[1])/6.0
        c2x = p2[0] - (p3[0]-p1[0])/6.0
        c2y = p2[1] - (p3[1]-p1[1])/6.0
        d += f" C {c1x:.1f} {c1y:.1f}, {c2x:.1f} {c2y:.1f}, {p2[0]:.1f} {p2[1]:.1f}"
    return d

# ---------------- green silhouette points (192 coords, clockwise from left dome peak) ----------------
# outer boundary measured from the icon
green_pts = [
    (71,61.5),            # left dome peak
    (64,62.0), (58,64.5), (56.5,68),
    (55.5,71), (54.5,75), (54.3,80),
    (54.0,85), (52.5,90), (50,95),
    (48.3,99), (47.3,104), (47,109),
    (47.3,113), (48.5,117), (51,121),
    (54.5,125), (58.5,129), (59,132),
    (58,136), (55.5,140), (52.5,146),
    (50,152), (47.3,160), (44.5,170),
    (42.3,180), (41,187), (40.5,191),
    (151.5,191),
    (151,187), (149.5,180), (147,170),
    (144.5,160), (141.5,152), (139,146),
    (136.5,140), (134,136), (133,132),
    (133.5,129), (137.5,125), (141,121),
    (143.5,117), (144.7,113), (145,109),
    (144.7,104), (143.7,99), (141.5,95),
    (139.5,90), (138,85), (137.7,80),
    (137.5,75), (136.5,71), (135.5,68),
    (133,64.5), (127,62.0), (120,61.8),
    (115,62.5), (110,65), (107,68),
    (84,68),              # cleft bottom
    (80,64.5), (76,62.0), (71,61.5),  # back to start
]
green_d = catmull(green_pts)

# ---------------- cream belly patch points ----------------
# top edge follows the measured smile curve; sides from the cream contour; bottom cropped
belly_pts = [
    (60,112), (57.5,115), (56.5,117), (60,119),
    (66,119.8), (72,120.2), (78,120.4), (84,120.7), (90,121), (96,121.2),
    (102,121), (108,120.7), (114,120.4), (120,120.2), (126,119.8), (131.5,119),
    (134.5,116.5), (133.5,114), (132,112),
    (133,116), (134.5,120), (134.5,124),
    (133,128), (130.5,132), (127,135),
    (123,137), (120,139.5), (119.5,141.5),
    (120.5,144), (122,147), (123.8,150.5),
    (125.5,155), (127,161), (128.5,168),
    (129.5,175), (130.5,182), (131,191),
    (60,191),
    (60.5,182), (61.5,175), (63,168),
    (64.5,161), (66,155), (67.8,150.5),
    (69.5,147), (71,144), (72,141.5),
    (71.5,139.5), (69,137), (65,135),
    (62,132), (60.5,128), (59.5,124),
    (58,120), (56.5,118), (56,116),
]
belly_d = catmull(belly_pts)

# ---------------- assemble SVG (1024 viewBox, scale 5.3333) ----------------
S = 1024.0/192.0
def sc(path):
    return path  # we build paths already in 192 coords; scale via group transform
svg = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
  <title>Frog Focus mascot</title>
  <desc>Faithful vector trace of images/icon-192.png — same silhouette, proportions, palette and feature geometry, measured pixel-by-pixel from the original artwork.</desc>
  <rect width="1024" height="1024" fill="#FFFFFF"/>
  <g transform="scale({S})">
    <!-- frog silhouette (head + body) -->
    <path d="{green_d}" fill="#5B886D" stroke="#4C4646" stroke-width="1.8" stroke-linejoin="round"/>
    <!-- cream belly patch; its top edge traces the smile curve -->
    <path d="{belly_d}" fill="#F9EDD5" stroke="#4C4646" stroke-width="1.6" stroke-linejoin="round"/>
    <!-- subtle belly shading band -->
    <ellipse cx="96" cy="140.5" rx="15.5" ry="3.2" fill="#E3D7BE" opacity="0.95"/>
    <!-- lower lip dash -->
    <path d="M 92 126.2 L 100 126.2" fill="none" stroke="#4C4646" stroke-width="2.2" stroke-linecap="round"/>
    <!-- blush -->
    <ellipse cx="60" cy="99.5" rx="5.5" ry="2.6" fill="#D29D86"/>
    <ellipse cx="132" cy="99.5" rx="5.5" ry="2.6" fill="#D29D86"/>
    <!-- left eye -->
    <circle cx="71.9" cy="82.8" r="9.6" fill="#EFD9A5"/>
    <circle cx="71.9" cy="82.8" r="11.6" fill="none" stroke="#F6D497" stroke-width="4.2"/>
    <ellipse cx="71.3" cy="83.4" rx="7.0" ry="5.0" fill="#4C4646"/>
    <circle cx="75.7" cy="80.1" r="1.6" fill="#FFFFFF"/>
    <!-- right eye -->
    <circle cx="120.6" cy="82.8" r="9.6" fill="#EFD9A5"/>
    <circle cx="120.6" cy="82.8" r="11.6" fill="none" stroke="#F6D497" stroke-width="4.2"/>
    <ellipse cx="120.1" cy="83.3" rx="7.0" ry="5.0" fill="#4C4646"/>
    <circle cx="124.7" cy="80.1" r="1.6" fill="#FFFFFF"/>
    <!-- bridge (thin, upper) -->
    <path d="M 87 81.8 Q 96 80.2 105 81.8" fill="none" stroke="#F6D497" stroke-width="1.9" stroke-linecap="round"/>
    <!-- temples (long, thin, from outer-lower lens edge angling outward-down) -->
    <path d="M 56.3 82 L 50.3 87.5" fill="none" stroke="#F6D497" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M 135.7 82 L 141.7 87.5" fill="none" stroke="#F6D497" stroke-width="1.6" stroke-linecap="round"/>
  </g>
</svg>
"""
open('images/frog-mascot.svg','w').write(svg)
print("SVG written,", len(svg), "bytes")

# ---------------- render 1024x1024 with sharp ----------------
r = subprocess.run(['node','-e',"""
const sharp=require('sharp');
sharp('images/frog-mascot.svg', {density: 300}).resize(1024,1024).png().toFile('images/apple-touch-icon.png')
 .then(info=>console.log('rendered', info.width+'x'+info.height, info.format, info.size+'B'))
 .catch(e=>{console.error('RENDER FAIL', e.message); process.exit(1)});
"""],capture_output=True,text=True)
print(r.stdout or r.stderr)
# verify magic bytes
data = open('images/apple-touch-icon.png','rb').read(8)
print("magic:", data.hex(), "OK" if data == b'\x89PNG\r\n\x1a\n' else "BAD")
