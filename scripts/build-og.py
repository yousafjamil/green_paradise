"""Renders 1200x630 share images (WhatsApp, Facebook, Google) into public/og.
Run: npm run build:og   (needs Pillow, arabic-reshaper, python-bidi)
Fonts in scripts/fonts are open-licence (Noto Sans Arabic, Fraunces, Plus Jakarta Sans via Fontsource).
"""
import json, os
from PIL import Image, ImageDraw, ImageFont
import arabic_reshaper
from bidi.algorithm import get_display

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "public", "og"); os.makedirs(OUT, exist_ok=True)
FONTS = os.path.join(ROOT, "scripts", "fonts")
W, H = 1200, 630
GOLD, DEEP, WHITE = (254, 201, 43), (10, 61, 40), (255, 255, 255)

def font(name, size): return ImageFont.truetype(os.path.join(FONTS, name), size)

def shape(text, ar):  # visual-order string ready to draw
    text = text.replace(" · ", "، ").replace(".", "") if ar else text
    return get_display(arabic_reshaper.reshape(text)) if ar else text

def wrap(draw, text, fnt, max_w, ar, max_lines):
    words, lines, cur = text.split(), [], ""
    for w in words:
        trial = f"{cur} {w}".strip()
        if draw.textlength(shape(trial, ar), font=fnt) <= max_w or not cur: cur = trial
        else: lines.append(cur); cur = w
    lines.append(cur)
    if len(lines) > max_lines:
        lines = lines[:max_lines]; lines[-1] = lines[-1].rstrip(" .،,") + ("" if ar else "…")
    return lines

def bez(p0, c1, c2, p1, n=16):
    return [((1-t)**3*p0[0]+3*(1-t)**2*t*c1[0]+3*(1-t)*t*t*c2[0]+t**3*p1[0], (1-t)**3*p0[1]+3*(1-t)**2*t*c1[1]+3*(1-t)*t*t*c2[1]+t**3*p1[1]) for t in [i/n for i in range(n+1)]]

def logo_mark(size):
    s = 8; im = Image.new("RGBA", (100*s, 100*s), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    S = lambda pts: [(x*s, y*s) for x, y in pts]
    d.rounded_rectangle((0, 0, 100*s, 100*s), radius=26*s, fill=WHITE)
    d.pieslice(S([(27, 24), (73, 70)])[0] + S([(27, 24), (73, 70)])[1], 180, 360, fill=DEEP)
    d.rectangle((27*s, 47*s, 73*s, 80*s), fill=DEEP)
    leaf = (76, 175, 135)
    d.line(S([(50, 80), (50, 45)]), fill=leaf, width=4*s)
    d.polygon(S(bez((50, 68), (40, 68), (35, 61), (35, 54)) + bez((35, 54), (43, 54), (50, 59), (50, 68))), fill=leaf)
    d.polygon(S(bez((50, 57), (60, 57), (65, 50), (65, 43)) + bez((65, 43), (57, 43), (50, 48), (50, 57))), fill=leaf)
    return im.resize((size, size), Image.LANCZOS)

def cover(photo_path):
    im = Image.open(photo_path).convert("RGB"); r = max(W/im.width, H/im.height)
    im = im.resize((int(im.width*r)+1, int(im.height*r)+1), Image.LANCZOS)
    x, y = (im.width-W)//2, int((im.height-H)*0.45)   # keep the lower, greener part of tall photos
    return im.crop((x, y, x+W, y+H))

def render(card):
    ar = card["lang"] == "ar"
    base = cover(os.path.join(ROOT, "public", "media", "photos", card["photo"] + ".jpg")).convert("RGBA")
    # darken for legibility: deep green tint, stronger on the text side and at the bottom
    ov = Image.new("RGBA", (W, H)); px = ov.load()
    for yy in range(H):
        for xx in range(W):
            side = (1 - xx/W) if not ar else (xx/W)
            a = int(60 + 150*(0.55*side + 0.45*yy/H))
            px[xx, yy] = DEEP + (min(a, 235),)
    img = Image.alpha_composite(base, ov); d = ImageDraw.Draw(img)

    pad = 70
    mark = logo_mark(84)
    brand_f = font("noto-sans-arabic-arabic-700-normal.woff", 34) if ar else font("plus-jakarta-sans-latin-700-normal.woff", 30)
    brand = shape("جرين برادايس", True) if ar else "GREEN PARADISE"
    bw = d.textlength(brand, font=brand_f)
    if ar:
        img.alpha_composite(mark, (W-pad-84, pad)); d.text((W-pad-84-24-bw, pad+20), brand, font=brand_f, fill=WHITE)
    else:
        img.alpha_composite(mark, (pad, pad)); d.text((pad+84+24, pad+22), brand, font=brand_f, fill=WHITE)

    tf = font("noto-sans-arabic-arabic-700-normal.woff", 78) if ar else font("fraunces-latin-700-normal.woff", 84)
    lines = wrap(d, card["title"], tf, 800, ar, 3)
    lh = 100 if ar else 94
    y = 250 if len(lines) < 3 else 210
    for ln in lines:
        t = shape(ln, ar); w = d.textlength(t, font=tf)
        d.text((W-pad-w if ar else pad, y), t, font=tf, fill=WHITE); y += lh

    sf = font("noto-sans-arabic-arabic-600-normal.woff", 32) if ar else font("plus-jakarta-sans-latin-700-normal.woff", 28)
    sub = wrap(d, card["sub"].split(".")[0].strip(), sf, 1000, ar, 1)[0]
    t = shape(sub if ar else sub.upper() if len(sub) < 40 else sub, ar); w = d.textlength(t, font=sf)
    d.rectangle(((W-pad-60, y+38, W-pad, y+41) if ar else (pad, y+22, pad+60, y+25)), fill=GOLD)
    d.text((W-pad-w if ar else pad, y+56 if ar else y+38), t, font=sf, fill=GOLD)
    img.convert("RGB").save(os.path.join(OUT, card["file"] + ".jpg"), "JPEG", quality=80, optimize=True, progressive=True)

cards = json.load(open(os.path.join(ROOT, "scripts", "og-data.json")))
for c in cards: render(c)
print(len(cards), "share images →", OUT)
