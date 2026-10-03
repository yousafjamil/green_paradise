import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { photo } from "@/lib/media";
import { btn, container } from "@/lib/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CtaBand from "@/components/CtaBand";
import { Check } from "@/components/icons";
import ImageReveal from "@/components/ImageReveal";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMeta({ lang, path: "/about", title: t.about.title, description: t.about.lead + " " + t.about.body[1] });
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const a = t.about;
  const side = photo("olive-tree-villa-garden");
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t.nav.home, path: "" }, { name: t.nav.about, path: "/about" }])} />
      <PageHero title={a.title} lead={a.lead} image="white-bougainvillea-tree-villa" />
      <section className={`${container} grid grid-cols-1 gap-12 py-20 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16`}>
        <Reveal className="space-y-5 text-lg leading-relaxed text-ink-soft">
          {a.body.map((p) => <p key={p}>{p}</p>)}
          <div className="pt-4">
            <h2 className="text-2xl font-semibold text-ink">{a.licensedTitle}</h2>
            <ul className="mt-4 grid gap-3">
              {a.licensed.map((l) => <li key={l} className="flex items-center gap-3 font-medium text-ink"><span className="flex size-6 items-center justify-center rounded-full bg-forest text-white"><Check className="size-3.5" strokeWidth={2.5} /></span>{l}</li>)}
            </ul>
          </div>
          <Link href={`/${lang}/contact`} className={`${btn.primary} mt-4`}>{t.cta.consult}</Link>
        </Reveal>
        <Reveal delay={120}>
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand">
            <div className="relative size-full">
              <Image src={side.src} alt={a.title} fill sizes="(min-width:1024px) 40vw,100vw" placeholder="blur" blurDataURL={side.blur} className="object-cover" />
            </div>
          </ImageReveal>
        </Reveal>
      </section>
      <section className="bg-white py-20 sm:py-24">
        <div className={container}>
          <Reveal><SectionHeading title={a.approachTitle} /></Reveal>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {a.steps.map((s, i) => (
              <Reveal as="li" key={s.t} delay={i * 80} className="border-t-2 border-forest pt-5">
                <span className="font-display text-3xl font-semibold text-leaf" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-2 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-ink-soft">{s.d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand lang={lang} t={t} image="lawn-garden-edge" />
    </>
  );
}
