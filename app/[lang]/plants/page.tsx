import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { plants } from "@/data/plants";
import { photo } from "@/lib/media";
import { container } from "@/lib/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import PageHero from "@/components/PageHero";
import PlantGrid from "@/components/PlantGrid";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/plants">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMeta({ lang, path: "/plants", title: t.plantsPage.title, description: t.plantsPage.lead });
}

export default async function Plants({ params }: PageProps<"/[lang]/plants">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t.nav.home, path: "" }, { name: t.nav.plants, path: "/plants" }])} />
      <PageHero title={t.plantsPage.title} lead={t.plantsPage.lead} image="bougainvillea-nursery-rows" eyebrow={t.plantsPage.eyebrow} />
      <section className={`${container} py-16 sm:py-20`}>
        <PlantGrid plants={plants.map((p) => ({ ...p, img: { src: photo(p.photo).src, blur: photo(p.photo).blur } }))} lang={lang} t={t} />
        <p className="mt-10 text-center text-sm text-ink-soft">{t.plantsPage.note}</p>
      </section>
      <CtaBand lang={lang} t={t} image="bougainvillea-tower" />
    </>
  );
}
