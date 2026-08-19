#!/usr/bin/env python3
"""Fit precise geometry from icon-192.png pixels: circles, ellipses, contours."""
import zlib, struct, math

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
def is_pink(r,g,b): return r>185 and g>140 and b>130 and r>g and g<215 and (r-g)>15

def collect(pred, x0=0, y0=0, x1=w, y1=h):
    pts=[]
    for y in range(y0,y1):
        for x in range(x0,x1):
            r,g,b=get(x,y)
            if pred(r,g,b): pts.append((x,y))
    return pts

def fit_circle(pts):
    n=len(pts)
    if n<5: return None
    # Kasa fit: minimize (x-cx)^2+(y-cy)^2-r^2
    sx=sum(p[0] for p in pts); sy=sum(p[1] for p in pts)
    sxx=sum(p[0]*p[0] for p in pts); syy=sum(p[1]*p[1] for p in pts)
    sxy=sum(p[0]*p[1] for p in pts)
    sz=sum(p[0]*p[0]+p[1]*p[1] for p in pts)
    sxz=sum(p[0]*(p[0]*p[0]+p[1]*p[1]) for p in pts)
    syz=sum(p[1]*(p[0]*p[0]+p[1]*p[1]) for p in pts)
    A=[[sxx,sxy,sx],[sxy,syy,sy],[sx,sy,n]]
    b=[sxz,syz,sz]
    # solve 3x3
    M=[A[0]+[b[0]],A[1]+[b[1]],A[2]+[b[2]]]
    # gauss
    for i in range(3):
        piv=max(range(i,3),key=lambda k:abs(M[k][i]))
        M[i],M[piv]=M[piv],M[i]
        for k in range(i+1,3):
            f=M[k][i]/M[i][i]
            for j in range(i,4): M[k][j]-=f*M[i][j]
    cx=M[2][3]/M[2][2]; cy=(M[1][3]-M[1][2]*cx)/M[1][1]
    a=(M[0][3]-M[0][1]*cy-M[0][2]*cx)/M[0][0]
    r2=cx*cx+cy*cy-a
    return (cx,cy,math.sqrt(max(r2,0)))

def fit_ellipse(pts):
    n=len(pts)
    if n<5: return None
    sx=sum(p[0] for p in pts); sy=sum(p[1] for p in pts)
    cx=sx/n; cy=sy/n
    # second moments
    mxx=sum((p[0]-cx)**2 for p in pts)/n
    myy=sum((p[1]-cy)**2 for p in pts)/n
    mxy=sum((p[0]-cx)*(p[1]-cy) for p in pts)/n
    # covariance eigen => axes
    tr=mxx+myy; det=mxx*myy-mxy*mxy
    disc=math.sqrt(max((mxx-myy)**2+4*mxy*mxy,0))
    l1=(tr+disc)/2; l2=(tr-disc)/2
    rx=2*math.sqrt(max(l1,0)); ry=2*math.sqrt(max(l2,0))
    ang=0.5*math.atan2(2*mxy,mxx-myy)
    return (cx,cy,rx,ry,ang)

def extrema(pred, x0=0,y0=0,x1=w,y1=h):
    xs=[];ys=[]
    for y in range(y0,y1):
        for x in range(x0,x1):
            r,g,b=get(x,y)
            if pred(r,g,b): xs.append(x); ys.append(y)
    return (min(xs),min(ys),max(xs),max(ys)) if xs else None

# 1) lens gold ring fit per lens
gold_all=collect(is_gold)
left_gold=[p for p in gold_all if p[0]<96]
right_gold=[p for p in gold_all if p[0]>=96]
print("left lens gold circle:", fit_circle(left_gold), "n=",len(left_gold))
print("right lens gold circle:", fit_circle(right_gold), "n=",len(right_gold))
# pupil dark inside lens boxes
left_pup=collect(is_dark,52,74,90,94)
right_pup=collect(is_dark,102,74,140,94)
print("left pupil ellipse:", fit_ellipse(left_pup), "n=",len(left_pup))
print("right pupil ellipse:", fit_ellipse(right_pup), "n=",len(right_pup))
print("left pupil bbox:", extrema(is_dark,52,74,90,94))
print("right pupil bbox:", extrema(is_dark,102,74,140,94))

# 2) head silhouette: green extents per row (y 58..112)
print("\nhead green silhouette (row: left, right):")
for y in range(58,114,2):
    row=[x for x in range(w) if is_green(*get(x,y))]
    if row: print(f"  y={y}: x {min(row)}..{max(row)}")

# 3) cream belly contour
print("\nbelly cream contour (row: left, right):")
for y in range(108,194,2):
    row=[x for x in range(w) if is_cream(*get(x,y))]
    if row: print(f"  y={y}: x {min(row)}..{max(row)}")

# 4) mouth dark pixels in y 112..132
mouth=collect(is_dark, 60,112,135,133)
print("\nmouth pixels n=",len(mouth), "bbox:", extrema(is_dark,60,112,135,133))
# group by row
rows={}
for x,y in mouth: rows.setdefault(y,[]).append(x)
for y in sorted(rows):
    r=rows[y]
    print(f"  y={y}: x {min(r)}..{max(r)} (n={len(r)})")

# 5) blush
left_blush=collect(is_pink,40,90,80,110)
right_blush=collect(is_pink,112,90,152,110)
print("\nleft blush ellipse:", fit_ellipse(left_blush), "n=",len(left_blush))
print("right blush ellipse:", fit_ellipse(right_blush), "n=",len(right_blush))
print("left blush bbox:", extrema(is_pink,40,90,80,110))
print("right blush bbox:", extrema(is_pink,112,90,152,110))

# 6) temples: gold pixels outside lens x ranges, y 50..75
for y in range(50,78):
    row=[x for x in range(w) if is_gold(*get(x,y)) and (x<58 or x>134)]
    if row: print(f"temple y={y}: x {min(row)}..{max(row)}")

# 7) bridge: gold pixels between lenses y 52..80
print("\nbridge gold pixels between lenses:")
for y in range(52,84):
    row=[x for x in range(w) if is_gold(*get(x,y)) and 84<=x<=110]
    if row: print(f"  y={y}: x {min(row)}..{max(row)} (n={len(row)})")

# 8) eye white: near-white pixels inside lens
def is_eyewhite(r,g,b): return r>238 and g>236 and b>228 and (r-b)<16
lw=collect(is_eyewhite,56,70,90,96)
rw=collect(is_eyewhite,102,70,138,96)
print("\nleft eyewhite bbox:", extrema(is_eyewhite,56,70,90,96), "n=",len(lw))
print("right eyewhite bbox:", extrema(is_eyewhite,102,70,138,96), "n=",len(rw))
