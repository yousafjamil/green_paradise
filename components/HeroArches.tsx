"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionary";
import { btn, container } from "@/lib/ui";
import { whatsappUrl } from "@/lib/site";
import { Arrow, Check, ServiceIcon } from "./icons";
import Magnetic from "./Magnetic";

export type HeroPhoto = { src: string; width: number; height: number; blur: string; alt: string };
export type HeroChip = { icon: "design" | "lawn" | "plants" | "care" | "water" | "building"; label: string };
type Props = { lang: Locale; t: Dict; slides: HeroPhoto[]; left: HeroPhoto; right: HeroPhoto; chips: HeroChip[] };

const ease = [0.2, 0.7, 0.2, 1] as const;
const arch = "overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand shadow-[0_40px_70px_-25px_rgba(4,39,24,0.45)] ring-1 ring-black/5";

/**
 * Cream hero with a 3D stack of arch-shaped photo windows (the arch echoes the logo).
 * The stack tilts toward the pointer, layers drift at different depths while scrolling,
 * and the centre arch cycles through real project photos.
 */
export default function HeroArches({ lang, t, slides, left, right, chips }: Props) {
  const reduce = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Pointer position, -1..1 across the hero, smoothed with a spring.
  const px = useMotionValue(0), py = useMotionValue(0);
  const nx = useSpring(px, { stiffness: 90, damping: 18, mass: 0.5 });
  const ny = useSpring(py, { stiffness: 90, damping: 18, mass: 0.5 });
  const rotateY = useTransform(nx, [-1, 1], [-9, 9]);
  const rotateX = useTransform(ny, [-1, 1], [7, -7]);
  const backX = useTransform(nx, [-1, 1], [-22, 22]);
  const backY = useTransform(ny, [-1, 1], [-14, 14]);
  const frontX = useTransform(nx, [-1, 1], [18, -18]);
  const frontY = useTransform(ny, [-1, 1], [12, -12]);

  // Depth on scroll: back layers move more than the front one.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const leftScroll = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const rightScroll = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const textFade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 3200);
    return () => clearInterval(id);
  }, [reduce, paused, slides.length]);

  function onMove(e: PointerEvent<HTMLElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width) * 2 - 1);
    py.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  const reset = () => { px.set(0); py.set(0); };

  const words = t.hero.title.split(" ");

  return (
    <section ref={section} onPointerMove={onMove} onPointerLeave={reset} className="bg-garden relative isolate overflow-hidden">
      <div aria-hidden className="bg-pattern-light absolute inset-0 -z-10" />
      <div className={`${container} grid min-h-[calc(100svh-4.25rem)] grid-cols-1 items-center gap-5 pt-5 pb-36 sm:min-h-[min(46rem,calc(100svh-5rem))] sm:gap-8 sm:pt-10 sm:pb-16 lg:grid-cols-[1.05fr_1fr] lg:gap-4 lg:pt-8`}>
        {/* Copy */}
        <motion.div style={{ opacity: textFade }} className="relative z-10">
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.1 }} className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-forest">
            <motion.span aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px w-8 origin-left bg-current rtl:origin-right" />{t.hero.eyebrow}
          </motion.p>
          <h1 className="max-w-xl text-[2.35rem] leading-[1.05] font-semibold text-ink sm:text-6xl lg:text-[4.25rem]" aria-label={t.hero.title}>
            {words.map((w, i) => (
              <motion.span key={i} aria-hidden initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.09 }} className="inline-block pe-[0.26em]">{w}</motion.span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.7 }} className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft sm:mt-5 sm:text-xl">{t.hero.text}</motion.p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.85 }} className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row">
            <Magnetic className="max-sm:[&>*]:w-full"><Link href={`/${lang}/contact`} className={btn.primary}>{t.cta.consult}<Arrow /></Link></Magnetic>
            <Magnetic className="max-sm:[&>*]:w-full"><Link href={`/${lang}/projects`} className={btn.outlineDark}>{t.cta.projects}</Link></Magnetic>
          </motion.div>
          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1.1 }} className="mt-9 flex flex-wrap gap-x-6 gap-y-3 border-t border-ink/10 pt-6 text-sm font-medium text-ink-soft">
            {t.hero.trust.map((x, i) => (
              <li key={x} className="flex items-center gap-2">
                <span className="flex size-5 items-center justify-center rounded-full bg-forest text-white"><Check className="size-3" strokeWidth={2.6} /></span>
                {i === 2 ? <a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">{x}</a> : x}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* 3D photo stack */}
        <div className="relative order-first mx-auto w-full mb-7 max-w-[16rem] [perspective:1400px] sm:mb-0 sm:max-w-[30rem] lg:order-none lg:max-w-none" onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          <div className="animate-sway">
            <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative mx-auto aspect-[5/5.6] w-full max-w-[34rem] lg:max-w-[38rem]">
              {/* ground shadow */}
              <div aria-hidden className="absolute inset-x-[12%] bottom-[1%] h-8 rounded-[50%] bg-ink/30 blur-xl" style={{ transform: "translateZ(-60px)" }} />

              {/* back-left arch */}
              <motion.div style={{ x: backX, y: backY, translateZ: -70 }} className="absolute start-0 bottom-[7%] w-[36%]">
                <motion.div style={{ y: leftScroll }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }}>
                  <div className={`${arch} relative aspect-[3/4.4]`}>
                    <Image src={left.src} alt={left.alt} fill sizes="(min-width:1024px) 190px, 34vw" placeholder="blur" blurDataURL={left.blur} className="object-cover" />
                  </div>
                </motion.div>
              </motion.div>

              {/* back-right arch */}
              <motion.div style={{ x: backX, y: backY, translateZ: -40 }} className="absolute end-0 top-[3%] w-[34%]">
                <motion.div style={{ y: rightScroll }} initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.65 }}>
                  <div className={`${arch} relative aspect-[3/4.2]`}>
                    <Image src={right.src} alt={right.alt} fill sizes="(min-width:1024px) 180px, 32vw" placeholder="blur" blurDataURL={right.blur} className="object-cover" />
                  </div>
                </motion.div>
              </motion.div>

              {/* main arch with the photo slideshow */}
              <motion.div style={{ x: frontX, y: frontY, translateZ: 20 }} className="absolute start-[22%] bottom-0 w-[56%]" initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.35 }}>
                <div className={`${arch} relative aspect-[3/4.5]`} role="group" aria-roledescription="carousel" aria-label={t.hero.carousel}>
                  {slides.map((s, i) => (
                    <motion.div key={s.src} className="absolute inset-0" aria-hidden={i !== active} initial={false}
                      animate={{ opacity: i === active ? 1 : 0, scale: i === active ? 1 : 1.12 }} transition={{ duration: 1.1, ease }}>
                      <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="(min-width:1024px) 300px, 56vw" placeholder="blur" blurDataURL={s.blur} className="object-cover" />
                    </motion.div>
                  ))}
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent" />
                  <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
                    {slides.map((s, i) => (
                      <button key={s.src} type="button" onClick={() => setActive(i)} aria-label={`${t.hero.showPhoto} ${i + 1}`} aria-current={i === active} className="group p-1.5">
                        <span className={`block h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-gold" : "w-1.5 bg-white/70 group-hover:bg-white"}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* floating service chips, nearest to the viewer */}
              {chips.map((c, i) => {
                const pos = ["start-[-4%] top-[14%]", "end-[-5%] bottom-[28%]", "start-[-7%] bottom-[9%] max-sm:hidden"][i];
                return (
                  <motion.div key={c.label} style={{ translateZ: 80 }} className={`absolute z-10 ${pos}`}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 1 + i * 0.18 }}>
                    <div className="animate-bob flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-2.5 py-2 sm:gap-2.5 sm:px-3.5 sm:py-2.5 shadow-xl shadow-ink/15 backdrop-blur-md" style={{ animationDelay: `${i * 0.9}s` }}>
                      <span className="flex size-6 items-center justify-center rounded-full bg-forest text-white sm:size-8"><ServiceIcon name={c.icon} width={14} height={14} /></span>
                      <span className="max-w-[6.5rem] text-[0.7rem] leading-tight font-semibold text-ink sm:max-w-[9.5rem] sm:text-sm">{c.label}</span>
                    </div>
                  </motion.div>
                );
              })}

              {/* gold sparkle */}
              <svg aria-hidden viewBox="0 0 24 24" className="absolute end-[10%] bottom-[8%] size-9 text-gold drop-shadow" style={{ transform: "translateZ(100px)" }} fill="currentColor"><path d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" /></svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
