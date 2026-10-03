"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionary";
import { btn, container } from "@/lib/ui";
import { whatsappUrl } from "@/lib/site";
import { Arrow, WhatsApp } from "./icons";
import Magnetic from "./Magnetic";

type Props = { lang: Locale; t: Dict; poster: { src: string; blur?: string }; desktopVideo: string; mobileVideo: string };
const ease = [0.2, 0.7, 0.2, 1] as const;

export default function Hero({ lang, t, poster, desktopVideo, mobileVideo }: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const section = useRef<HTMLElement>(null);

  // Gentle parallax: the footage drifts slower than the page, the text drifts up and fades.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Only load video when it is welcome: no reduced-motion, no data-saver, and a decent connection.
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType ?? "")) return;
    const raf = requestAnimationFrame(() => setSrc(window.matchMedia("(min-width: 768px)").matches ? desktopVideo : mobileVideo));
    return () => cancelAnimationFrame(raf);
  }, [desktopVideo, mobileVideo]);

  const words = t.hero.title.split(" ");

  return (
    <section ref={section} className="relative isolate flex min-h-[calc(100svh-4.25rem)] items-end overflow-hidden bg-ink text-white sm:min-h-[min(46rem,calc(100svh-5rem))]">
      <motion.div style={{ y: mediaY, scale: mediaScale }} className="absolute inset-x-0 -top-[20%] -z-20 h-[120%]">
        <Image src={poster.src} alt="" fill priority sizes="100vw" {...(poster.blur ? { placeholder: "blur" as const, blurDataURL: poster.blur } : {})} className="object-cover" />
        {src && (
          <video key={src} src={src} muted loop autoPlay playsInline preload="auto" aria-hidden onCanPlay={() => setReady(true)}
            className={`absolute inset-0 size-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`} />
        )}
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-[5] bg-gradient-to-t from-ink/90 via-ink/55 to-ink/35" />

      <motion.div style={{ y: textY, opacity: textOpacity }} className={`${container} pb-14 pt-32 sm:pb-20`}>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.1 }}
          className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-gold [text-shadow:0_1px_8px_rgb(0_0_0/0.45)]">
          <motion.span aria-hidden initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="h-px w-8 origin-left bg-current rtl:origin-right" />{t.hero.eyebrow}
        </motion.p>
        <h1 className="max-w-3xl text-[2.6rem] leading-[1.05] font-semibold sm:text-6xl lg:text-7xl" aria-label={t.hero.title}>
          {words.map((w, i) => (
            <motion.span key={i} aria-hidden initial={{ opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.09 }} className="inline-block pe-[0.26em]">{w}</motion.span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.7 }} className="mt-5 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{t.hero.text}</motion.p>
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.85 }} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Magnetic className="max-sm:[&>*]:w-full"><Link href={`/${lang}/contact`} className={btn.gold}>{t.cta.consult}<Arrow /></Link></Magnetic>
          <Magnetic className="max-sm:[&>*]:w-full"><Link href={`/${lang}/projects`} className={btn.outline}>{t.cta.projects}</Link></Magnetic>
          <a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={`${btn.whatsapp} sm:hidden`}><WhatsApp />{t.cta.whatsapp}</a>
        </motion.div>
      </motion.div>

      <motion.span aria-hidden initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="absolute bottom-0 end-8 hidden h-16 w-px overflow-hidden bg-white/25 sm:block">
        <motion.span className="block h-6 w-px bg-white" animate={{ y: ["-100%", "280%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />
      </motion.span>
    </section>
  );
}
