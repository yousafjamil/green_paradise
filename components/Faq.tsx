import type { Dict } from "@/lib/dictionary";
import { btn, container } from "@/lib/ui";
import { whatsappUrl } from "@/lib/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { WhatsApp } from "./icons";

export default function Faq({ t }: { t: Dict }) {
  const f = t.faq;
  return (
    <section className="bg-white py-20 sm:py-28" aria-labelledby="faq-title">
      <div className={`${container} grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16`}>
        <Reveal>
          <SectionHeading eyebrow={f.eyebrow} title={f.title} text={f.text} />
          <div className="mt-10 rounded-3xl bg-forest-deep bg-pattern p-7 text-white">
            <h3 className="text-xl font-semibold">{f.cardTitle}</h3>
            <p className="mt-2 text-white/75">{f.cardText}</p>
            <a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={`${btn.whatsapp} mt-6`}><WhatsApp />{t.cta.whatsapp}</a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <ul className="grid gap-3">
            {f.items.map((it) => (
              <li key={it.q}>
                <details className="group rounded-2xl border border-line bg-cream transition-colors open:bg-white open:shadow-sm">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-lg font-semibold sm:p-6">
                    <span>{it.q}</span>
                    <span aria-hidden className="relative size-7 shrink-0 rounded-full bg-forest/10 text-forest transition-transform duration-300 group-open:rotate-45">
                      <span className="absolute top-1/2 left-1/2 h-0.5 w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span className="absolute top-1/2 left-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                    </span>
                  </summary>
                  <p className="faq-body px-5 pb-6 leading-relaxed text-ink-soft sm:px-6">{it.a}</p>
                </details>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
