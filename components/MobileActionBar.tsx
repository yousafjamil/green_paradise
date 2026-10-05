"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { telUrl, whatsappUrl } from "@/lib/site";
import { Phone, WhatsApp } from "./icons";

/** Phones only: Call, WhatsApp and Quote stay one tap away. */
export default function MobileActionBar({ lang, t }: { lang: Locale; t: Dict }) {
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[0.72rem] font-semibold";
  return (
    <motion.nav aria-label={t.cta.quote} initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.8, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="fixed inset-x-0 bottom-0 z-30 flex border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-6px_24px_rgb(0_0_0/0.08)] backdrop-blur sm:hidden">
      <a href={telUrl} className={`${item} text-forest`}><Phone width={22} height={22} />{t.cta.call}</a>
      <a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={`${item} border-x border-line text-[#0d7a3f]`}><WhatsApp width={22} height={22} />{t.cta.whatsapp}</a>
      <Link href={`/${lang}/contact`} className={`${item} bg-gold text-ink`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 3h8l4 4v14H7zM14 3v5h5M10 13h6M10 17h6" /></svg>
        {t.cta.quote}
      </Link>
    </motion.nav>
  );
}
