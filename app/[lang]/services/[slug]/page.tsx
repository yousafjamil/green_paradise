import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { serviceBySlug, services } from "@/data/services";
import { photo } from "@/lib/media";
import { btn, container } from "@/lib/ui";
import { whatsappUrl } from "@/lib/site";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import CtaBand from "@/components/CtaBand";
import { Check, WhatsApp } from "@/components/icons";

export const generateStaticParams = () => locales.flatMap((lang) => services.map((s) => ({ lang, slug: s.slug })));
const HERO_FALLBACK = "lawn-garden-tree";

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const s = serviceBySlug(slug);
  if (!hasLocale(lang) || !s) return {};
  return pageMeta({ lang, path: `/services/${slug}`, title: s[lang].title, description: s[lang].summary });
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang, slug } = await params;
  const s = serviceBySlug(slug);
  if (!hasLocale(lang) || !s) notFound();
  const t = getDictionary(lang);
  const c = s[lang];
  const others = services.filter((x) => x.slug !== slug).slice(0, 3);
  // The hero must not repeat the first example photo.
  const heroImg = s.image ?? HERO_FALLBACK;
  const examples = s.gallery.filter((id) => id !== heroImg);

  return (
    <>
      <PageHero title={c.title} lead={c.summary} image={heroImg} eyebrow={t.nav.services} />
      <section className={`${container} grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-[1.3fr_1fr] lg:gap-16`}>
        <Reveal>
          <p className="text-xl leading-relaxed text-ink-soft">{c.intro}</p>
          <h2 className="mt-10 text-2xl font-semibold">{t.servicesPage.includes}</h2>
          <ul className="mt-5 grid gap-3">
            {c.points.map((p) => <li key={p} className="flex items-start gap-3 text-lg"><span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-forest text-white"><Check className="size-3.5" strokeWidth={2.5} /></span>{p}</li>)}
          </ul>
        </Reveal>
        <Reveal delay={100}>
          <div className="rounded-2xl border border-line bg-white p-7 lg:sticky lg:top-28">
            <h2 className="text-xl font-semibold">{t.cta_band.title}</h2>
            <p className="mt-2 text-ink-soft">{t.cta_band.text}</p>
            <div className="mt-6 grid gap-3">
              <Link href={`/${lang}/contact?service=${slug}`} className={btn.primary}>{t.cta.request}</Link>
              <a href={whatsappUrl(`${t.whatsappGreeting} (${c.title})`)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsApp />{t.cta.whatsapp}</a>
            </div>
          </div>
        </Reveal>
      </section>

      {examples.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className={container}>
            <Reveal><SectionHeading title={t.servicesPage.gallery} /></Reveal>
            <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {examples.map((id) => {
                const p = photo(id);
                return (
                  <li key={id} className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sand">
                    <Image src={p.src} alt={`${c.title} – ${id.replace(/-/g, " ")}`} fill sizes="(min-width:768px) 33vw,50vw" placeholder="blur" blurDataURL={p.blur} className="object-cover" />
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      )}

      <section className={`${container} py-20 sm:py-24`}>
        <Reveal><SectionHeading title={t.servicesPage.others} /></Reveal>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => <li key={o.slug}><ServiceCard service={o} lang={lang} label={t.cta.details} /></li>)}
        </ul>
      </section>
      <CtaBand lang={lang} t={t} image="lawn-garden-edge" />
    </>
  );
}
