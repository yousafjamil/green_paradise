import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionary";
import { services } from "@/data/services";
import { container } from "@/lib/ui";
import { mailUrl, site, telUrl, whatsappUrl } from "@/lib/site";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { Mail, Phone, Pin, WhatsApp } from "./icons";

export default function Footer({ lang, t }: { lang: Locale; t: Dict }) {
  const nav = [["", t.nav.home], ["/about", t.nav.about], ["/services", t.nav.services], ["/projects", t.nav.projects], ["/gallery", t.nav.gallery], ["/contact", t.nav.contact]] as const;
  const h = "mb-4 text-xs font-bold uppercase tracking-[0.18em] text-gold";
  const a = "text-white/75 transition-colors hover:text-white";
  return (
    <footer className="bg-ink text-white">
      <div className={`${container} grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]`}>
        <div>
          <Logo lang={lang} light />
          <p className="mt-5 max-w-xs text-white/70">{t.footer.blurb}</p>
          <p className="mt-3 text-sm text-white/50">{t.footer.licensed}</p>
          <div className="mt-6"><LanguageSwitcher lang={lang} light label={t.nav.language} /></div>
        </div>
        <nav aria-label={t.footer.explore}>
          <h2 className={h}>{t.footer.explore}</h2>
          <ul className="space-y-2.5">{nav.map(([p, l]) => <li key={p}><Link href={`/${lang}${p}`} className={a}>{l}</Link></li>)}</ul>
        </nav>
        <nav aria-label={t.footer.services}>
          <h2 className={h}>{t.footer.services}</h2>
          <ul className="space-y-2.5">{services.map((s) => <li key={s.slug}><Link href={`/${lang}/services/${s.slug}`} className={a}>{s[lang].title}</Link></li>)}</ul>
        </nav>
        <div>
          <h2 className={h}>{t.footer.contact}</h2>
          <ul className="space-y-3.5 text-white/75">
            <li className="flex gap-3"><Pin className="mt-0.5 shrink-0 text-leaf" /><span>{t.contact.locationValue}</span></li>
            <li className="flex gap-3"><Phone className="mt-0.5 shrink-0 text-leaf" /><a href={telUrl} dir="ltr" className={a}>{site.phoneDisplay}</a></li>
            <li className="flex gap-3"><WhatsApp className="mt-0.5 shrink-0 text-leaf" /><a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={a}>{t.cta.whatsapp}</a></li>
            <li className="flex gap-3"><Mail className="mt-0.5 shrink-0 text-leaf" /><a href={mailUrl} className={`${a} break-all`}>{site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className={`${container} flex flex-col gap-1 py-5 text-sm text-white/50 sm:flex-row sm:justify-between`}>
          <span>© {new Date().getFullYear()} {lang === "ar" ? "جرين برادايس لتنسيق وصيانة الحدائق ذ.م.م" : site.legalName}. {t.footer.rights}</span>
          <span>Abu Dhabi, UAE</span>
        </div>
      </div>
    </footer>
  );
}
