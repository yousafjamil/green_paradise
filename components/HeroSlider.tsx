"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type PanInfo } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionary";
import { btn, container } from "@/lib/ui";
import { whatsappUrl } from "@/lib/site";
import { Arrow, Check, Chevron } from "./icons";
import Magnetic from "./Magnetic";

export type SlidePhoto = { src: string; width: number; height: number; blur: string; alt: string; caption: string; pos?: string };
type Props = { lang: Locale; t: Dict; slides: SlidePhoto[] };

const ease = [0.2, 0.7, 0.2, 1] as const;
const INTERVAL = 6500;

/**
 * Full-width hero whose photos change on their own: slow cross-fade with a gentle zoom,
 * story-style progress bars, arrows, swipe and keyboard control. Pauses on hover/focus and
 * stays still for visitors who prefer reduced motion.
 */
export default function HeroSlider({ lang, t, slides }: Props) {
  const reduce = useReducedMotion();
  const rtl = lang === "ar";
  const N = slides.length;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const section = useRef<HTMLElement>(null);

  const go = useCallback((n: number) => setI(((n % N) + N) % N), [N]);
  useEffect(() => {
    if (reduce || paused) return;
    const id = setTimeout(() => setI((x) => (x + 1) % N), INTERVAL);
    return () => clearTimeout(id);
  }, [i, paused, reduce, N]);

  // The photos drift slower than the page while scrolling.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (Math.abs(swipe) < 60) return;
    go(i + ((swipe < 0) !== rtl ? 1 : -1));
  };
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") go(i + (rtl ? -1 : 1));
    if (e.key === "ArrowLeft") go(i + (rtl ? 1 : -1));
  };

  const words = t.hero.title.split(" ");
  const arrow = "flex size-11 items-center justify-center rounded-full border border-white/30 bg-black/20 text-white backdrop-blur transition hover:bg-white hover:text-forest-deep";

  return (
    <section ref={section} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)} onBlurCapture={() => setPaused(false)} onKeyDown={onKey}
      role="region" aria-roledescription="carousel" aria-label={t.hero.carousel}
      className="relative isolate flex min-h-[calc(100svh-4.25rem)] items-end overflow-hidden bg-ink text-white sm:min-h-[min(46rem,calc(100svh-5rem))]">
      {/* photos */}
      <motion.div style={{ y: mediaY }} className="absolute inset-x-0 -top-[10%] -z-20 h-[116%]">
        {slides.map((s, k) => (
          <motion.div key={s.src} role="group" aria-roledescription="slide" aria-label={`${k + 1} / ${N}`} aria-hidden={k !== i} initial={false}
            animate={{ opacity: k === i ? 1 : 0, scale: k === i && !reduce ? 1.08 : 1 }}
            transition={{ opacity: { duration: 1.3, ease: "easeInOut" }, scale: { duration: k === i ? 9 : 0, delay: k === i ? 0 : 1.4, ease: "linear" } }}
            className="absolute inset-0">
            <Image src={s.src} alt={s.alt} fill priority={k === 0} sizes="100vw" placeholder="blur" blurDataURL={s.blur} className="object-cover" style={{ objectPosition: s.pos ?? "50% 55%" }} />
          </motion.div>
        ))}
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/85 via-ink/45 to-ink/5 rtl:bg-gradient-to-l" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
      {/* swipe layer */}
      <motion.div aria-hidden drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.2} onDragEnd={onDragEnd} className="absolute inset-0 -z-[5] touch-pan-y" />

      <div className={`${container} relative pb-40 pt-28 sm:pb-28`}>
        <motion.div style={{ y: textY, opacity: textOpacity }} className="pointer-events-none">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.1 }} className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-gold [text-shadow:0_1px_8px_rgb(0_0_0/0.45)]">
            <motion.span aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px w-8 origin-left bg-current rtl:origin-right" />{t.hero.eyebrow}
          </motion.p>
          <h1 className="max-w-3xl text-[2.5rem] leading-[1.05] font-semibold sm:text-6xl lg:text-7xl" aria-label={t.hero.title}>
            {words.map((w, k) => (
              <motion.span key={k} aria-hidden initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 + k * 0.09 }} className="inline-block pe-[0.26em]">{w}</motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.7 }} className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{t.hero.text}</motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.85 }} className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
            <Magnetic className="max-sm:[&>*]:w-full"><Link href={`/${lang}/contact`} className={btn.gold}>{t.cta.consult}<Arrow /></Link></Magnetic>
            <Magnetic className="max-sm:[&>*]:w-full"><Link href={`/${lang}/projects`} className={btn.outline}>{t.cta.projects}</Link></Magnetic>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }} className="pointer-events-auto mt-8 hidden flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-white/85 sm:flex">
            {t.hero.trust.map((x, k) => (
              <li key={x} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-gold text-ink"><Check className="size-3" strokeWidth={2.6} /></span>
                {k === 2 ? <a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{x}</a> : x}
              </li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* controls */}
      <div className={`${container} absolute inset-x-0 bottom-24 flex items-end justify-between gap-4 sm:bottom-8`}>
        <div>
          <p className="mb-3 text-sm font-medium text-white/80" aria-live={paused ? "polite" : "off"}>
            <span dir="ltr" className="font-display me-2 text-lg font-semibold text-white">{String(i + 1).padStart(2, "0")}<span className="text-white/50"> / {String(N).padStart(2, "0")}</span></span>{slides[i].caption}
          </p>
          <div className="flex gap-2">
            {slides.map((s, k) => (
              <button key={s.src} type="button" onClick={() => go(k)} aria-label={`${t.hero.showPhoto} ${k + 1}`} aria-current={k === i} className="group py-2.5">
                <span className="relative block h-1 w-9 overflow-hidden rounded-full bg-white/30 transition-all group-hover:bg-white/50 sm:w-14">
                  {k === i && (reduce || paused
                    ? <span className="absolute inset-0 bg-gold" />
                    : <motion.span key={`${i}-p`} className="absolute inset-0 origin-left bg-gold rtl:origin-right" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: INTERVAL / 1000, ease: "linear" }} />)}
                  {k < i && <span className="absolute inset-0 bg-white/80" />}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button type="button" onClick={() => go(i - 1)} aria-label={t.gallery.prev} className={arrow}><Chevron className="rotate-180" /></button>
          <button type="button" onClick={() => go(i + 1)} aria-label={t.gallery.next} className={arrow}><Chevron /></button>
        </div>
      </div>
    </section>
  );
}
