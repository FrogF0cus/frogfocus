#!/usr/bin/env python3
"""Geometry map of images/icon-192.png — classify pixels, print ASCII layout, measure features."""
import zlib, struct, collections, math

def decode_png(path):
    with open(path, 'rb') as f:
        data = f.read()
    assert data[:8] == b'\x89PNG\r\n\x1a\n'
    pos = 8; width = height = None; idat = b''; bit_depth = color_type = None
    while pos < len(data):
        length = struct.unpack('>I', data[pos:pos+4])[0]
        ctype = data[pos+4:pos+8]
        chunk = data[pos+8:pos+8+length]
        if ctype == b'IHDR':
            width, height, bit_depth, color_type = struct.unpack('>IIBB', chunk[:10])
        elif ctype == b'IDAT':
            idat += chunk
        elif ctype == b'IEND':
            break
        pos += 12 + length
    raw = zlib.decompress(idat)
    channels = {0:1, 2:3, 3:1, 4:2, 6:4}[color_type]
    stride = width * channels
    out = bytearray(width * height * channels)
    prev = bytearray(stride)
    p = 0
    for y in range(height):
        ft = raw[p]; p += 1
        line = bytearray(raw[p:p+stride]); p += stride
        if ft == 1:
            for i in range(channels, stride):
                line[i] = (line[i] + line[i-channels]) & 255
        elif ft == 2:
            for i in range(stride):
                line[i] = (line[i] + prev[i]) & 255
        elif ft == 3:
            for i in range(stride):
                a = line[i-channels] if i >= channels else 0
                b = prev[i]
                line[i] = (line[i] + ((a + b) >> 1)) & 255
        elif ft == 4:
            for i in range(stride):
                a = line[i-channels] if i >= channels else 0
                b = prev[i]
                c = prev[i-channels] if i >= channels else 0
                pa = abs(b - c); pb = abs(a - c); pc = abs(a + b - 2*c)
                pr = a if (pa <= pb and pa <= pc) else (b if pb <= pc else c)
                line[i] = (line[i] + pr) & 255
        out[y*stride:(y+1)*stride] = line
        prev = line
    return width, height, channels, bytes(out)

w, h, ch, buf = decode_png('images/icon-192.png')

def get(x, y):
    i = (y*w + x) * ch
    return (buf[i], buf[i+1], buf[i+2])

def classify(r, g, b):
    # background: near-white
    if r > 236 and g > 236 and b > 236 and abs(r-g) < 12 and abs(g-b) < 12:
        return '.'
    # outline / pupil dark
    if r < 140 and g < 130 and b < 130:
        return 'K'
    # gold rim
    if r > 185 and g > 140 and b < 175 and (r - b) > 55 and (r - g) < 80:
        return 'G'
    # eye white (pure white)
    if r > 240 and g > 240 and b > 240:
        return 'W'
    # cream belly
    if r > 232 and g > 215 and b > 190 and (r - b) > 28 and (r - b) < 90:
        return 'C'
    # green body
    if g > r and g > b and 70 < g < 175 and r < 160:
        return 'g'
    # blush pink
    if r > 185 and g > 140 and b > 130 and r > g:
        return 'P'
    return '?'

# ASCII map at 2x block granularity (sample every 2px)
BLOCK = 3
print(f"ASCII map ({w//BLOCK} x {h//BLOCK}), sample every {BLOCK}px:")
for y in range(0, h, BLOCK):
    row = ''
    for x in range(0, w, BLOCK):
        r, g, b = get(x, y)
        row += classify(r, g, b)
    print(row)

# --- measurements ---
def find_pixels(pred):
    pts = []
    for y in range(h):
        for x in range(w):
            r, g, b = get(x, y)
            if pred(r, g, b):
                pts.append((x, y))
    return pts

def bbox(pts):
    if not pts: return None
    xs = [p[0] for p in pts]; ys = [p[1] for p in pts]
    return (min(xs), min(ys), max(xs), max(ys))

# exact color samples: median color of a region
def med_color(pred):
    c = collections.Counter()
    for y in range(h):
        for x in range(w):
            r, g, b = get(x, y)
            if pred(r, g, b):
                c[(r,g,b)] += 1
    if not c: return None
    return c.most_common(1)[0][0]

green = find_pixels(lambda r,g,b: g > r and g > b and 70 < g < 175 and r < 160 and not (r > 232 and g > 215 and b > 190))
print("\ngreen bbox:", bbox(green), "count", len(green))
print("green median:", med_color(lambda r,g,b: g > r and g > b and 70 < g < 175 and r < 160))

gold = find_pixels(lambda r,g,b: r > 185 and g > 140 and b < 175 and (r-b) > 55)
print("gold bbox:", bbox(gold), "count", len(gold))
print("gold median:", med_color(lambda r,g,b: r > 185 and g > 140 and b < 175 and (r-b) > 55))

cream = find_pixels(lambda r,g,b: r > 232 and g > 215 and b > 190 and (r-b) > 28 and (r-b) < 90)
print("cream bbox:", bbox(cream), "count", len(cream))
print("cream median:", med_color(lambda r,g,b: r > 232 and g > 215 and b > 190 and (r-b) > 28 and (r-b) < 90))

dark = find_pixels(lambda r,g,b: r < 140 and g < 130 and b < 130)
print("dark bbox:", bbox(dark), "count", len(dark))
print("dark median:", med_color(lambda r,g,b: r < 140 and g < 130 and b < 130))

pink = find_pixels(lambda r,g,b: r > 185 and g > 140 and b > 130 and r > g and g < 210)
print("pink bbox:", bbox(pink), "count", len(pink))
print("pink median:", med_color(lambda r,g,b: r > 185 and g > 140 and b > 130 and r > g and g < 210))

# eye whites: pure white inside outline
white = find_pixels(lambda r,g,b: r > 240 and g > 240 and b > 240)
print("pure white bbox:", bbox(white), "count", len(white))
