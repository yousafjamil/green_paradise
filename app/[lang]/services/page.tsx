import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { services } from "@/data/services";
import { container } from "@/lib/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ServiceCard from "@/components/ServiceCard";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMeta({ lang, path: "/services", title: t.servicesPage.title, description: t.servicesPage.lead });
}

export default async function Services({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t.nav.home, path: "" }, { name: t.nav.services, path: "/services" }])} />
      <PageHero title={t.servicesPage.title} lead={t.servicesPage.lead} image="fresh-lawn-hedge" />
      <section className={`${container} py-20 sm:py-24`}>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => <Reveal as="li" key={s.slug} delay={(i % 3) * 90}><ServiceCard service={s} lang={lang} label={t.cta.details} headingLevel={2} /></Reveal>)}
        </ul>
      </section>
      <CtaBand lang={lang} t={t} />
    </>
  );
}
