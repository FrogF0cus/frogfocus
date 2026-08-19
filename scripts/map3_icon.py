#!/usr/bin/env python3
"""Measure bridge/temples/outline + dump silhouette contour points for the SVG path."""
import zlib, struct

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
def is_green(r,g,b): return g>r and g>b and 70<g<175 and r<165
def is_gold(r,g,b): return r>185 and g>140 and b<175 and (r-b)>55 and (r-g)<90
def is_dark(r,g,b): return r<140 and g<130 and b<130
def is_cream(r,g,b): return r>232 and g>215 and b>190 and (r-b)>28 and (r-b)<95

# bridge: gold between lenses
print("BRIDGE gold pixels x=84..110:")
for y in range(56,84):
    row=[x for x in range(84,111) if is_gold(*get(x,y))]
    if row: print(f"  y={y}: x {min(row)}..{max(row)} (n={len(row)})")

# dark pixels between lenses (bridge shadow?)
print("\nDARK pixels x=84..110 (bridge zone):")
for y in range(56,84,2):
    row=[x for x in range(84,111) if is_dark(*get(x,y))]
    if row: print(f"  y={y}: x {min(row)}..{max(row)} (n={len(row)})")

# temples
print("\nTEMPLE gold pixels left x=36..58:")
for y in range(50,96):
    row=[x for x in range(36,59) if is_gold(*get(x,y))]
    if row: print(f"  y={y}: x {min(row)}..{max(row)} (n={len(row)})")
print("\nTEMPLE gold pixels right x=134..156:")
for y in range(50,96):
    row=[x for x in range(134,157) if is_gold(*get(x,y))]
    if row: print(f"  y={y}: x {min(row)}..{max(row)} (n={len(row)})")

# outline thickness: at a few points, walk from outside in
def outline_thickness(x0,y,step):
    # find first non-white from the outside going inward
    d=0
    x=x0
    while x>0 and x<w:
        r,g,b=get(x,y)
        if not (r>236 and g>236 and b>236): break
        x+=step; d+=1
    # now walk through non-white until white/green again
    t=0
    while x>0 and x<w:
        r,g,b=get(x,y)
        if (r>236 and g>236 and b>236): break
        x+=step; t+=1
    return d,t

print("\nOUTLINE thickness (left side, y=130):")
d,t=outline_thickness(40,130,1); print(f"  gap {d}px, outline {t}px")
print("OUTLINE thickness (right side, y=130):")
d,t=outline_thickness(152,130,-1); print(f"  gap {d}px, outline {t}px")
print("OUTLINE thickness (top left dome, y=64):")
d,t=outline_thickness(52,64,1); print(f"  gap {d}px, outline {t}px")
print("OUTLINE thickness (top right dome, y=64):")
d,t=outline_thickness(140,64,-1); print(f"  gap {d}px, outline {t}px")

# head silhouette contour: for each y, left/right boundary where green starts
print("\nHEAD contour (green boundary, 1px scan):")
for y in range(58,116,2):
    l=r=None
    for x in range(w):
        if is_green(*get(x,y)): l=x; break
    for x in range(w-1,-1,-1):
        if is_green(*get(x,y)): r=x; break
    if l is not None: print(f"  y={y}: L={l} R={r}")

# cream belly contour, 1px
print("\nBELLY contour (cream boundary, 1px):")
for y in range(110,193,2):
    l=r=None
    for x in range(w):
        if is_cream(*get(x,y)): l=x; break
    for x in range(w-1,-1,-1):
        if is_cream(*get(x,y)): r=x; break
    if l is not None: print(f"  y={y}: L={l} R={r}")

# top dome shape: highest green/dark at each x across the top
print("\nTOP EDGE profile (first non-white y at each x):")
for x in range(52,141,4):
    y0=None
    for y in range(40,80):
        r,g,b=get(x,y)
        if not (r>236 and g>236 and b>236): y0=y; break
    print(f"  x={x}: top={y0}")

# blush precise: pinkish pixels, full range
def is_pinkish(r,g,b):
    return r>180 and g>130 and b>115 and r>g and (r-b)>40 and g>b-5
import collections
for name,(x0,x1,y0,y1) in {"left blush":(44,80,88,112),"right blush":(112,148,88,112)}.items():
    c=collections.Counter()
    pts=[]
    for y in range(y0,y1):
        for x in range(x0,x1):
            r,g,b=get(x,y)
            if is_pinkish(r,g,b):
                c[(r,g,b)]+=1; pts.append((x,y))
    if pts:
        xs=[p[0] for p in pts]; ys=[p[1] for p in pts]
        print(f"{name}: n={len(pts)} bbox=({min(xs)},{min(ys)})-({max(xs)},{max(ys)}) median={c.most_common(3)}")
