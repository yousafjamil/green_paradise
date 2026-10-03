import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { allPhotos } from "@/lib/media";
import { altFor } from "@/lib/alt";
import { galleryVideos } from "@/data/videos";
import { container } from "@/lib/ui";
import Gallery from "@/components/Gallery";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMeta({ lang, path: "/gallery", title: t.gallery.title, description: t.gallery.text });
}

export default async function GalleryPage({ params }: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const cats = t.gallery.categories as Record<string, string>;
  const order = ["lawns-and-gardens", "artificial-turf-and-patios", "entrances-and-planters", "flowers-and-beds", "plants-nursery"];
  // Show the strongest garden photos first, nursery stock last.
  const items = order.flatMap((c) => allPhotos.filter((p) => p.category === c)).map((p, i) => ({ ...p, alt: altFor(p, lang, t, i) }));
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t.nav.home, path: "" }, { name: t.nav.gallery, path: "/gallery" }])} />
      <PageHero title={t.gallery.title} lead={t.gallery.text} image="villa-lawn-garden" />
      <section className={`${container} py-16 sm:py-20`}>
        <Gallery items={items} videos={galleryVideos(lang)} categories={order.map((id) => ({ id, label: cats[id] }))} labels={{ ...t.gallery, play: t.video.play }} rtl={lang === "ar"} />
      </section>
      <CtaBand lang={lang} t={t} image="flower-border-lawn" />
    </>
  );
}
