#!/usr/bin/env python3
"""Decode images/icon-192.png with pure Python (zlib + struct) and map its geometry/colors."""
import zlib, struct, sys, collections

def decode_png(path):
    with open(path, 'rb') as f:
        data = f.read()
    assert data[:8] == b'\x89PNG\r\n\x1a\n', "not a PNG"
    pos = 8
    width = height = None
    idat = b''
    bit_depth = color_type = None
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
    # un-filter
    out = bytearray(width * height * channels)
    prev = bytearray(stride)
    p = 0
    for y in range(height):
        ft = raw[p]; p += 1
        line = bytearray(raw[p:p+stride]); p += stride
        if ft == 1:  # sub
            for i in range(channels, stride):
                line[i] = (line[i] + line[i-channels]) & 255
        elif ft == 2:  # up
            for i in range(stride):
                line[i] = (line[i] + prev[i]) & 255
        elif ft == 3:  # average
            for i in range(stride):
                a = line[i-channels] if i >= channels else 0
                b = prev[i]
                line[i] = (line[i] + ((a + b) >> 1)) & 255
        elif ft == 4:  # paeth
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

def px(w, h, ch, buf, x, y):
    i = (y*w + x) * ch
    if ch == 4:
        return (buf[i], buf[i+1], buf[i+2], buf[i+3])
    return (buf[i], buf[i+1], buf[i+2], 255)

w, h, ch, buf = decode_png('images/icon-192.png')
print(f"size {w}x{h} channels={ch}")

# ---- color histogram of opaque pixels ----
hist = collections.Counter()
opaque = 0
for y in range(h):
    for x in range(w):
        r,g,b,a = px(w,h,ch,buf,x,y)
        if a > 200:
            opaque += 1
            hist[(r//8*8, g//8*8, b//8*8)] += 1

print("\nTop color clusters (quantized /8):")
for (r,g,b), n in hist.most_common(16):
    print(f"  #{r:02x}{g:02x}{b:02x}  n={n}  ({100*n/opaque:.1f}%)")

# ---- exact colors: sample precise values from identified regions ----
def sample_region(name, x0, x1, y0, y1):
    vals = collections.Counter()
    for y in range(y0, y1):
        for x in range(x0, x1):
            r,g,b,a = px(w,h,ch,buf,x,y)
            if a > 200:
                vals[(r,g,b)] += 1
    if not vals:
        print(f"{name}: EMPTY")
        return
    top = vals.most_common(6)
    print(f"{name} ({x0},{y0})-({x1},{y1}):")
    for (r,g,b), n in top:
        print(f"   #{r:02x}{g:02x}{b:02x}  n={n}")

# approximate regions from a first look; refine after
sample_region("body-green upper (likely)", 60, 130, 60, 180)
sample_region("belly (center low)", 80, 110, 130, 175)
sample_region("eye white (around 65,85)", 45, 85, 65, 110)
sample_region("outline sample (top edge of head)", 90, 100, 30, 50)
