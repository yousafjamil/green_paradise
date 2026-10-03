import type { Dict } from "@/lib/dictionary";
import { mailUrl, site, telUrl, whatsappUrl } from "@/lib/site";
import { Mail, Phone, Pin, WhatsApp } from "./icons";

export default function ContactInfo({ t }: { t: Dict }) {
  const rows = [
    { icon: <Phone />, label: t.contact.phone, value: site.phoneDisplay, href: telUrl, ltr: true },
    { icon: <WhatsApp />, label: t.contact.whatsapp, value: site.phoneDisplay, href: whatsappUrl(t.whatsappGreeting), ltr: true, ext: true },
    { icon: <Mail />, label: t.contact.email, value: site.email, href: mailUrl, ltr: true },
    { icon: <Pin />, label: t.contact.location, value: t.contact.locationValue },
  ];
  return (
    <ul className="grid gap-4">
      {rows.map((r) => {
        const inner = (
          <>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">{r.icon}</span>
            <span className="min-w-0">
              <span className="block text-xs font-bold uppercase tracking-[0.15em] text-ink-soft">{r.label}</span>
              <span className="block text-lg font-medium [overflow-wrap:anywhere]" dir={r.ltr ? "ltr" : undefined}>{r.value}</span>
            </span>
          </>
        );
        const cls = "flex items-center gap-4 rounded-2xl border border-line bg-white p-4";
        return <li key={r.label}>{r.href ? <a href={r.href} {...(r.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} transition hover:border-forest`}>{inner}</a> : <div className={cls}>{inner}</div>}</li>;
      })}
    </ul>
  );
}
