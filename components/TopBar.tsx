import type { Dict } from "@/lib/dictionary";
import { mailUrl, site, telUrl, whatsappUrl } from "@/lib/site";
import { container } from "@/lib/ui";
import { Mail, Phone, Pin, WhatsApp } from "./icons";

/** Slim contact strip above the header (desktop only). */
export default function TopBar({ t }: { t: Dict }) {
  const a = "flex items-center gap-2 text-white/85 transition-colors hover:text-gold";
  return (
    <aside aria-label={t.nav.contactInfo} className="hidden bg-forest-deep text-[0.8rem] text-white xl:block">
      <div className={`${container} flex h-10 items-center justify-between`}>
        <div className="flex items-center gap-6">
          <a href={telUrl} dir="ltr" className={a}><Phone width={15} height={15} />{site.phoneDisplay}</a>
          <a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={a}><WhatsApp width={15} height={15} />{t.cta.whatsapp}</a>
          <a href={mailUrl} className={a}><Mail width={15} height={15} />{site.email}</a>
        </div>
        <p className="flex items-center gap-2 text-white/70"><Pin width={15} height={15} className="text-gold" />{t.contact.locationValue} · {t.footer.licensed}</p>
      </div>
    </aside>
  );
}
