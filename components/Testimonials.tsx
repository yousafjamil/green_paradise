import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { testimonials } from "@/data/testimonials";
import { container } from "@/lib/ui";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

/** Real customer reviews. Renders nothing until data/testimonials.ts has entries. */
export default function Testimonials({ lang, t }: { lang: Locale; t: Dict }) {
  if (!testimonials.length) return null;
  return (
    <section className="bg-forest-deep bg-pattern py-20 text-white sm:py-28" aria-labelledby="reviews-title">
      <div className={container}>
        <Reveal><SectionHeading light eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} /></Reveal>
        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((r, i) => (
            <Reveal as="li" key={r.name + i} delay={(i % 3) * 90} className="flex flex-col rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
              <div aria-hidden className="mb-4 flex gap-1 text-gold">{"★★★★★"}</div>
              <blockquote className="flex-1 text-lg leading-relaxed text-white/90">“{r.text[lang]}”</blockquote>
              <figcaption className="mt-6 border-t border-white/10 pt-4 text-sm">
                <span className="font-semibold">{r.name}</span>
                {(r.role?.[lang] || r.source || r.date) && <span className="block text-white/60">{[r.role?.[lang], r.source, r.date].filter(Boolean).join(" · ")}</span>}
              </figcaption>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
