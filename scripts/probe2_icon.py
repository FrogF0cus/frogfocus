#!/usr/bin/env python3
"""Probe the mouth/belly region and eye region of icon-192.png with a fine color grid."""
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

print("MOUTH/BELLY TOP REGION (x=76..120, y=112..150), 2px grid:")
print("     " + "".join(f"{x//10}" if x%10==0 else " " for x in range(76,121,2)))
for yy in range(112,151,2):
    row=""
    for xx in range(76,121,2):
        r,g,b=get(xx,yy)
        row += f"{r:02x}{g:02x}{b:02x}"[:3]  # just r,g first hex digits for compactness
    print(f"{yy:3d} {row}")

print("\nEYE REGION LEFT (x=56..90, y=70..96), 2px grid:")
for yy in range(70,97,2):
    row=""
    for xx in range(56,91,2):
        r,g,b=get(xx,yy)
        row += f"{r:02x}{g:02x}{b:02x}"[:3]
    print(f"{yy:3d} {row}")

print("\nEYE REGION RIGHT (x=102..136, y=70..96), 2px grid:")
for yy in range(70,97,2):
    row=""
    for xx in range(102,137,2):
        r,g,b=get(xx,yy)
        row += f"{r:02x}{g:02x}{b:02x}"[:3]
    print(f"{yy:3d} {row}")
