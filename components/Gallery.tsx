"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "framer-motion";
import { Chevron, Close } from "./icons";
import VideoGrid from "./VideoGrid";

export type GalleryItem = { id: string; src: string; width: number; height: number; blur: string; alt: string; category: string };
export type GalleryVideo = { id: string; src: string; poster: string; width: number; height: number; label: string };
type Labels = { all: string; videos: string; prev: string; next: string; close: string; play: string };

type Props = {
  items: GalleryItem[];
  videos?: GalleryVideo[];
  categories?: { id: string; label: string }[];
  labels: Labels;
  rtl: boolean;
};

const ease = [0.2, 0.7, 0.2, 1] as const;
const slide = {
  enter: (d: number) => ({ opacity: 0, x: d * 70 }),
  center: { opacity: 1, x: 0 },
  exit: (d: number) => ({ opacity: 0, x: d * -70 }),
};

export default function Gallery({ items, videos = [], categories = [], labels, rtl }: Props) {
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState<number | null>(null);
  const [dir, setDir] = useState(1);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const showVideos = filter === "videos";
  const list = showVideos ? [] : filter === "all" ? items : items.filter((i) => i.category === filter);
  const filters = [{ id: "all", label: labels.all }, ...categories, ...(videos.length ? [{ id: "videos", label: labels.videos }] : [])];

  // d = +1 goes to the next photo in the list, -1 to the previous one.
  const step = useCallback((d: number) => { setDir(rtl ? -d : d); setOpen((i) => (i === null ? i : (i + d + list.length) % list.length)); }, [list.length, rtl]);
  const close = useCallback(() => { setOpen(null); opener.current?.focus(); }, []);

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      // Arrow keys follow what is on screen, so they flip in RTL.
      if (e.key === "ArrowRight") step(rtl ? -1 : 1);
      if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    };
    window.addEventListener("keydown", key);
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [open, step, close, rtl]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (Math.abs(swipe) < 60) return;
    step((swipe < 0) !== rtl ? 1 : -1); // dragging left reveals the item on the right in LTR
  };

  const current = open !== null ? list[open] : null;

  return (
    <div>
      {filters.length > 2 && (
        <div role="tablist" aria-orientation="horizontal" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {filters.map((f) => (
            <button key={f.id} role="tab" aria-selected={filter === f.id} onClick={() => { setFilter(f.id); setOpen(null); }}
              className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${filter === f.id ? "border-forest text-white" : "border-line bg-white text-ink-soft hover:border-forest hover:text-forest"}`}>
              {filter === f.id && <motion.span layoutId="gallery-chip" transition={{ type: "spring", stiffness: 380, damping: 30 }} className="absolute inset-0 rounded-full bg-forest" />}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>
      )}

      {showVideos ? (
        <VideoGrid videos={videos} playLabel={labels.play} />
      ) : (
        <ul key={filter} className="columns-2 gap-3 md:columns-3 lg:columns-4">
          {list.map((p, i) => (
            <motion.li key={p.id} className="mb-3 break-inside-avoid" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6, ease, delay: Math.min(i * 0.035, 0.5) }}>
              <button type="button" onClick={(e) => { opener.current = e.currentTarget; setDir(1); setOpen(i); }} className="group relative block w-full overflow-hidden rounded-xl bg-sand" aria-label={p.alt}>
                <Image src={p.src} alt={p.alt} width={p.width} height={p.height} sizes="(min-width:1024px) 25vw,(min-width:768px) 33vw,50vw" placeholder="blur" blurDataURL={p.blur} loading="lazy"
                  className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.07]" />
                <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors duration-300 group-hover:bg-ink/25">
                  <span className="flex size-12 scale-50 items-center justify-center rounded-full bg-white/95 text-forest opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 5v12M5 11h12" transform="translate(1 1)" /></svg>
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      )}

      <AnimatePresence>
        {current && (
          <motion.div role="dialog" aria-modal="true" aria-label={current.alt} className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={close}>
            <button ref={closeBtn} type="button" onClick={close} aria-label={labels.close} className="absolute end-4 top-4 z-10 flex size-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 hover:rotate-90"><Close /></button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label={labels.prev} className="absolute start-2 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:start-6"><Chevron className="rotate-180" /></button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label={labels.next} className="absolute end-2 top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:end-6"><Chevron /></button>

            <AnimatePresence mode="wait" custom={dir} initial={false}>
              <motion.div key={current.id} custom={dir} variants={slide} initial="enter" animate="center" exit="exit" transition={{ duration: 0.28, ease }}
                drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.35} onDragEnd={onDragEnd} onClick={(e) => e.stopPropagation()} className="cursor-grab active:cursor-grabbing">
                <Image src={current.src} alt={current.alt} width={current.width} height={current.height} sizes="100vw" priority draggable={false} className="max-h-[86svh] w-auto max-w-[92vw] rounded-lg object-contain" />
              </motion.div>
            </AnimatePresence>
            <p className="absolute inset-x-0 bottom-4 text-center text-sm text-white/70" dir="ltr">{(open ?? 0) + 1} / {list.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
