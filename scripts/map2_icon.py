#!/usr/bin/env python3
"""Precise geometry: fine ASCII map + connected components for each color class."""
import zlib, struct, collections

def decode_png(path):
    with open(path, 'rb') as f:
        data = f.read()
    pos = 8; width = height = None; idat = b''
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
    prev = bytearray(stride); p = 0
    for y in range(height):
        ft = raw[p]; p += 1
        line = bytearray(raw[p:p+stride]); p += stride
        if ft == 1:
            for i in range(channels, stride): line[i] = (line[i]+line[i-channels]) & 255
        elif ft == 2:
            for i in range(stride): line[i] = (line[i]+prev[i]) & 255
        elif ft == 3:
            for i in range(stride):
                a = line[i-channels] if i>=channels else 0; b = prev[i]
                line[i] = (line[i] + ((a+b)>>1)) & 255
        elif ft == 4:
            for i in range(stride):
                a = line[i-channels] if i>=channels else 0; b = prev[i]; c = prev[i-channels] if i>=channels else 0
                pa=abs(b-c); pb=abs(a-c); pc=abs(a+b-2*c)
                pr = a if (pa<=pb and pa<=pc) else (b if pb<=pc else c)
                line[i] = (line[i]+pr) & 255
        out[y*stride:(y+1)*stride] = line
        prev = line
    return width, height, channels, bytes(out)

w,h,ch,buf = decode_png('images/icon-192.png')
def get(x,y):
    i=(y*w+x)*ch; return (buf[i],buf[i+1],buf[i+2])

# classify with a 'name' and index
def cls(r,g,b):
    if r>236 and g>236 and b>236 and abs(r-g)<12 and abs(g-b)<12: return '.'
    if r<140 and g<130 and b<130: return 'K'          # outline/pupil/mouth
    if r>185 and g>140 and b<175 and (r-b)>55 and (r-g)<85: return 'G'  # gold rim
    if r>232 and g>215 and b>190 and (r-b)>28 and (r-b)<95: return 'C'  # cream
    if g>r and g>b and 70<g<175 and r<165: return 'g' # green
    if r>235 and g>235 and b>235: return 'W'          # pure white
    if r>185 and g>140 and b>130 and r>g and g<215: return 'P'  # pinkish
    return '?'

# fine map: window x 40..155, y 55..192, BLOCK=2
X0,X1,Y0,Y1,BLK = 40,156,54,192,2
print("fine map: window x=%d..%d y=%d..%d, each char = %dpx" % (X0,X1,Y0,Y1,BLK))
header = "     " + "".join(str((x//10)%10) if x%10==0 else ' ' for x in range(X0,X1,BLK))
print(header)
for yy in range(Y0,Y1,BLK):
    row = ""
    for xx in range(X0,X1,BLK):
        r,g,b = get(xx,yy)
        row += cls(r,g,b)
    print(f"{yy:3d} {row}")

# connected components via simple scan for each class
def components(pred):
    seen=set(); comps=[]
    for y in range(h):
        for x in range(w):
            if (x,y) in seen: continue
            r,g,b=get(x,y)
            if not pred(r,g,b): continue
            stack=[(x,y)]; seen.add((x,y)); pts=[]
            while stack:
                cx,cy=stack.pop(); pts.append((cx,cy))
                for dx,dy in ((1,0),(-1,0),(0,1),(0,-1)):
                    nx,ny=cx+dx,cy+dy
                    if 0<=nx<w and 0<=ny<h and (nx,ny) not in seen:
                        rr,gg,bb=get(nx,ny)
                        if pred(rr,gg,bb):
                            seen.add((nx,ny)); stack.append((nx,ny))
            if len(pts)>=8:
                xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
                comps.append((len(pts),(min(xs),min(ys),max(xs),max(ys)),(sum(xs)/len(pts),sum(ys)/len(pts))))
    return sorted(comps,reverse=True)

print("\n=== gold (lens rims) components ===")
for n,bb,c in components(lambda r,g,b: r>185 and g>140 and b<175 and (r-b)>55 and (r-g)<85)[:6]:
    print(f"  n={n:4d} bbox={bb} centroid=({c[0]:.1f},{c[1]:.1f})")

print("\n=== dark components (outline/pupils/mouth) ===")
for n,bb,c in components(lambda r,g,b: r<140 and g<130 and b<130)[:10]:
    print(f"  n={n:4d} bbox={bb} centroid=({c[0]:.1f},{c[1]:.1f})")

print("\n=== cream components ===")
for n,bb,c in components(lambda r,g,b: r>232 and g>215 and b>190 and (r-b)>28 and (r-b)<95)[:6]:
    print(f"  n={n:4d} bbox={bb} centroid=({c[0]:.1f},{c[1]:.1f})")

print("\n=== pink components ===")
for n,bb,c in components(lambda r,g,b: r>185 and g>140 and b>130 and r>g and g<215 and r-g>18)[:8]:
    print(f"  n={n:4d} bbox={bb} centroid=({c[0]:.1f},{c[1]:.1f})")

print("\n=== pure white components ===")
for n,bb,c in components(lambda r,g,b: r>240 and g>240 and b>240)[:8]:
    print(f"  n={n:4d} bbox={bb} centroid=({c[0]:.1f},{c[1]:.1f})")

# exact outline color: sample a dark pixel near the left edge mid-height
for probe in [(42,90),(42,120),(149,120),(95,60)]:
    x,y=probe; print("probe",probe,get(x,y))
