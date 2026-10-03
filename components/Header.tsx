"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionary";
import { btn, container } from "@/lib/ui";
import { telUrl, whatsappUrl } from "@/lib/site";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { Close, Menu, Phone, WhatsApp } from "./icons";

const links = [
  ["", "home"], ["/about", "about"], ["/services", "services"], ["/projects", "projects"], ["/gallery", "gallery"], ["/contact", "contact"],
] as const;

export default function Header({ lang, t }: { lang: Locale; t: Dict }) {
  const pathname = usePathname() || "";
  // The menu is tied to the page it was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? pathname : null);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // Slides away when scrolling down, returns on any scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 8);
    setHidden(y > prev && y > 180 && !open);
  });
  useEffect(() => {
    const raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    return () => cancelAnimationFrame(raf);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (p: string) => (p === "" ? pathname === `/${lang}` : pathname.startsWith(`/${lang}${p}`));

  return (
    <>
      <motion.header animate={{ y: hidden ? "-100%" : "0%" }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }} onFocusCapture={() => setHidden(false)}
        className={`sticky top-0 z-40 border-b bg-cream/95 backdrop-blur transition-shadow ${scrolled ? "border-line shadow-sm" : "border-transparent"}`}>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">{t.nav.skip}</a>
        <div className={`${container} flex h-[4.25rem] items-center justify-between gap-4 sm:h-20`}>
          <Link href={`/${lang}`} aria-label="Green Paradise"><Logo lang={lang} /></Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map(([p, k]) => (
              <Link key={k} href={`/${lang}${p}`} aria-current={isActive(p) ? "page" : undefined}
                className={`relative px-3.5 py-2 text-[0.92rem] font-medium transition-colors hover:text-forest ${isActive(p) ? "text-forest" : "text-ink-soft"}`}>
                {t.nav[k]}
                {isActive(p) && <motion.span layoutId="nav-underline" aria-hidden transition={{ type: "spring", stiffness: 380, damping: 32 }} className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded bg-leaf" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="hidden sm:block"><LanguageSwitcher lang={lang} label={t.nav.language} /></div>
            <a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" aria-label={t.cta.whatsapp}
              className="flex size-10 items-center justify-center rounded-full bg-[#25d366] text-[#06331a] transition hover:scale-110 hover:bg-[#1fbd5a] max-md:hidden"><WhatsApp /></a>
            <span className="hidden xl:block"><Link href={`/${lang}/contact`} className={`${btn.primary} !px-5 !py-2.5`}>{t.cta.consult}</Link></span>
            <button type="button" onClick={() => setOpen(true)} aria-label={t.nav.menu} aria-expanded={open} aria-controls="mobile-menu"
              className="flex size-11 items-center justify-center rounded-full border border-line lg:hidden"><Menu /></button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" role="dialog" aria-modal="true" aria-label={t.nav.menu} className="fixed inset-0 z-50 flex flex-col bg-ink text-white lg:hidden"
            initial={{ clipPath: "circle(0% at 90% 4%)" }} animate={{ clipPath: "circle(150% at 90% 4%)" }} exit={{ opacity: 0 }} transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}>
            <div className={`${container} flex h-[4.25rem] items-center justify-between`}>
              <Logo lang={lang} light showSub={false} />
              <button type="button" onClick={() => setOpen(false)} aria-label={t.nav.close} className="flex size-11 items-center justify-center rounded-full border border-white/25"><Close /></button>
            </div>
            <nav aria-label="Mobile" className={`${container} flex flex-1 flex-col justify-center overflow-y-auto py-6`}>
              {links.map(([p, k], i) => (
                <motion.div key={k} initial={{ opacity: 0, x: lang === "ar" ? 24 : -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}>
                  <Link href={`/${lang}${p}`} aria-current={isActive(p) ? "page" : undefined}
                    className={`font-display block border-b border-white/10 py-4 text-3xl transition-colors hover:text-leaf ${isActive(p) ? "text-leaf" : "text-white"}`}>{t.nav[k]}</Link>
                </motion.div>
              ))}
            </nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }} className={`${container} flex flex-col gap-3 pb-8`}>
              <div className="flex justify-center"><LanguageSwitcher lang={lang} light label={t.nav.language} /></div>
              <div className="grid grid-cols-2 gap-3">
                <a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsApp />{t.cta.whatsapp}</a>
                <a href={telUrl} className={btn.outline}><Phone />{t.cta.call}</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
