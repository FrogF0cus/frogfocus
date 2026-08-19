#!/usr/bin/env python3
"""Sample exact colors at feature probe points + write a 4x upscale via sharp."""
import zlib, struct, subprocess, json, sys

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

probes = {
    "outline-top-left (56,64)": (56,64),
    "outline-left-mid (46,104)": (46,104),
    "outline-right-mid (146,104)": (146,104),
    "outline-bottom (95,191)": (95,190),
    "green-head-top (95,64)": (95,64),
    "green-head (95,72)": (95,72),
    "green-side-left (56,104)": (56,104),
    "green-side-right (136,104)": (136,104),
    "green-low-left (50,132)": (50,132),
    "lens-left-top-gold (72,72)": (72,72),
    "lens-left-right-gold (83,83)": (83,83),
    "lens-right-left-gold (110,83)": (110,83),
    "lens-left-bottom-gold (72,94)": (72,94),
    "eye-white-left (75,80)": (75,80),
    "eye-white-right (118,80)": (118,80),
    "eye-white-left2 (66,85)": (66,85),
    "pupil-left (71,83)": (71,83),
    "pupil-right (120,83)": (120,83),
    "glasses-bridge (96,70)": (96,70),
    "glasses-bridge-low (96,90)": (96,90),
    "head-between-lenses (95,95)": (95,95),
    "blush-left (59,100)": (59,100),
    "blush-right (134,100)": (134,100),
    "blush-left-outer (56,102)": (56,102),
    "mouth-center (100,120)": (100,120),
    "mouth-left (84,118)": (84,118),
    "mouth-right (108,118)": (108,108),
    "belly (95,150)": (95,150),
    "belly-top-center (95,112)": (95,112),
    "belly-top-left-curl (62,112)": (62,112),
    "head-top-pink-left (72,60)": (72,60),
    "head-top-pink-right (121,60)": (121,60),
    "eye-upper-in-lens (72,77)": (72,77),
    "eye-lower-in-lens (72,90)": (72,90),
}
print("probe colors:")
for name,(x,y) in probes.items():
    r,g,b=get(x,y)
    print(f"  {name:34s} #{r:02x}{g:02x}{b:02x}  ({r},{g},{b})")

# upscale 4x with sharp, save for visual inspection
try:
    png_bytes = zlib.compress(b''.join([b'\x00'+buf[y*w*ch:(y+1)*w*ch] for y in range(h)]),9)
    import struct as st
    def chunk(ct,data):
        return st.pack('>I',len(data))+ct+data+st.pack('>I',zlib.crc32(ct+data)&0xffffffff)
    ihdr=st.pack('>IIBBBBB',w,h,8,2,0,0,0)
    full=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',ihdr)+chunk(b'IDAT',png_bytes)+chunk(b'IEND',b'')
    open('/tmp/icon-192.png','wb').write(full)
    r = subprocess.run(['node','-e',"""
        const sharp=require('sharp');
        sharp('/tmp/icon-192.png').resize(768,768,{kernel:'nearest'}).png().toFile('screenshots/icon-192-4x.png').then(()=>console.log('ok')).catch(e=>{console.error(e);process.exit(1)});
    """],capture_output=True,text=True)
    print("upscale:", r.stdout.strip() or r.stderr.strip())
except Exception as e:
    print("upscale failed:", e)
