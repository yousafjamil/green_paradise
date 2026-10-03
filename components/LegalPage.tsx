import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { LEGAL_UPDATED, type LegalDoc } from "@/data/legal";
import { mailUrl, site, telUrl } from "@/lib/site";
import { container } from "@/lib/ui";
import JsonLd from "./JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";

export default function LegalPage({ doc, t, lang, path }: { doc: LegalDoc; t: Dict; lang: Locale; path: string }) {
  const date = new Intl.DateTimeFormat(lang === "ar" ? "ar-AE" : "en-GB", { dateStyle: "long", timeZone: "UTC" }).format(new Date(LEGAL_UPDATED));
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t.nav.home, path: "" }, { name: doc.title, path }])} />
      <section className="border-b border-line bg-white">
        <div className={`${container} max-w-4xl py-14 sm:py-20`}>
          <h1 className="text-4xl font-semibold sm:text-5xl">{doc.title}</h1>
          <p className="mt-3 text-sm text-ink-soft">{t.legal.updated}: <time dateTime={LEGAL_UPDATED}>{date}</time></p>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{doc.intro}</p>
        </div>
      </section>
      <article className={`${container} max-w-4xl py-14 sm:py-16`}>
        <div className="space-y-10">
          {doc.sections.map((s, i) => (
            <section key={s.h} aria-labelledby={`s${i}`}>
              <h2 id={`s${i}`} className="text-2xl font-semibold">{s.h}</h2>
              {s.p?.map((p) => <p key={p} className="mt-3 leading-relaxed text-ink-soft">{p}</p>)}
              {s.ul && <ul className="mt-3 list-disc space-y-2 ps-6 leading-relaxed text-ink-soft marker:text-forest">{s.ul.map((li) => <li key={li}>{li}</li>)}</ul>}
            </section>
          ))}
          <section aria-labelledby="contact-legal" className="rounded-2xl border border-line bg-white p-6">
            <h2 id="contact-legal" className="text-2xl font-semibold">{t.legal.contact}</h2>
            <p className="mt-3 text-ink-soft">{lang === "ar" ? "جرين برادايس لتنسيق وصيانة الحدائق ذ.م.م" : site.legalName}, {t.contact.locationValue}</p>
            <p className="mt-2"><a href={mailUrl} className="font-semibold text-forest underline-offset-4 hover:underline">{site.email}</a></p>
            <p className="mt-1"><a href={telUrl} dir="ltr" className="font-semibold text-forest underline-offset-4 hover:underline">{site.phoneDisplay}</a></p>
          </section>
        </div>
      </article>
    </>
  );
}
