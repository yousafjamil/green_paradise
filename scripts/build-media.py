"""Builds web-ready media from ../organized into public/media and writes data/media.generated.json.
Photos: max 1600px long edge, EXIF/GPS stripped, progressive JPEG, tiny blur placeholder.
Videos: H.264, no audio, max 25s, faststart, plus a poster frame. Skips exact duplicates by content hash.
Run: python3 scripts/build-media.py
"""
import base64, glob, hashlib, io, json, os, re, subprocess
from PIL import Image, ImageOps

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SRC = os.path.abspath(os.path.join(ROOT, "..", "organized"))
OUT = os.path.join(ROOT, "public", "media")
EXCLUDE_DIRS = {"99-excluded-review"}
EXCLUDE_VIDEOS = {"video-12.mp4"}  # same garden corner as video-10
# photos from the "hero" folder belong to real gallery categories
CATEGORY_OVERRIDE = {"pink-bougainvillea-tree-villa": "flowers-and-beds", "white-bougainvillea-tree-villa": "flowers-and-beds"}
os.makedirs(OUT + "/photos", exist_ok=True)
os.makedirs(OUT + "/videos", exist_ok=True)

seen, photos, videos = set(), [], []
for path in sorted(glob.glob(SRC + "/*/*.jpg")):
    cat = os.path.basename(os.path.dirname(path))
    if cat in EXCLUDE_DIRS:
        continue
    digest = hashlib.md5(open(path, "rb").read()).hexdigest()
    if digest in seen:
        continue
    seen.add(digest)
    slug = re.sub(r"^\d+-", "", os.path.basename(path)[:-4])
    cat_id = re.sub(r"^\d+-", "", cat)
    if cat_id == "hero":
        cat_id = "lawns-and-gardens"
    cat_id = CATEGORY_OVERRIDE.get(slug, cat_id)
    im = ImageOps.exif_transpose(Image.open(path)).convert("RGB")
    im.thumbnail((1400, 1400), Image.LANCZOS)
    im.save(f"{OUT}/photos/{slug}.jpg", "JPEG", quality=76, optimize=True, progressive=True)
    b = im.copy(); b.thumbnail((12, 12))
    buf = io.BytesIO(); b.save(buf, "JPEG", quality=40)
    photos.append({"id": slug, "category": cat_id, "src": f"/media/photos/{slug}.jpg",
                   "width": im.width, "height": im.height,
                   "blur": "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()})

for path in sorted(glob.glob(SRC + "/videos/*.mp4")):
    name = os.path.basename(path)
    if name in EXCLUDE_VIDEOS:
        continue
    digest = hashlib.md5(open(path, "rb").read()).hexdigest()
    if digest in seen:
        continue
    seen.add(digest)
    vid = name[:-4]
    out_mp4 = f"{OUT}/videos/{vid}.mp4"
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", path, "-an", "-t", "25", "-vf", "scale='min(720,iw)':-2",
                    "-c:v", "libx264", "-crf", "34", "-preset", "slow", "-r", "24", "-maxrate", "650k", "-bufsize", "1300k", "-movflags", "+faststart",
                    "-pix_fmt", "yuv420p", out_mp4], check=True)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", "1", "-i", out_mp4, "-frames:v", "1",
                    "-q:v", "4", f"{OUT}/videos/{vid}.jpg"], check=True)
    w, h = Image.open(f"{OUT}/videos/{vid}.jpg").size
    videos.append({"id": vid, "src": f"/media/videos/{vid}.mp4", "poster": f"/media/videos/{vid}.jpg",
                   "width": w, "height": h})

json.dump({"photos": photos, "videos": videos}, open(ROOT + "/data/media.generated.json", "w"), indent=1)
print(len(photos), "photos,", len(videos), "videos")
