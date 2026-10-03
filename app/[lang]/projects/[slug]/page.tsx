import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { projectBySlug, projects } from "@/data/projects";
import { photo } from "@/lib/media";
import { altFor } from "@/lib/alt";
import { btn, container } from "@/lib/ui";
import { whatsappUrl } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { galleryLd } from "@/lib/jsonld";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/CtaBand";
import { Pin, WhatsApp } from "@/components/icons";

export const generateStaticParams = () => locales.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })));

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const p = projectBySlug(slug);
  if (!hasLocale(lang) || !p) return {};
  return pageMeta({ lang, path: `/projects/${slug}`, title: p[lang].title, description: p[lang].summary });
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { lang, slug } = await params;
  const p = projectBySlug(slug);
  if (!hasLocale(lang) || !p) notFound();
  const t = getDictionary(lang);
  const c = p[lang];
  const related = projects.filter((x) => x.slug !== slug).slice(0, 3);
  const items = p.images.map((id, i) => { const ph = photo(id); return { ...ph, alt: altFor(ph, lang, t, i) }; });

  return (
    <>
      <JsonLd data={[breadcrumbLd(lang, [{ name: t.nav.home, path: "" }, { name: t.nav.projects, path: "/projects" }, { name: c.title, path: `/projects/${slug}` }]), galleryLd(lang, { slug, name: c.title, description: c.summary, images: items.map((i) => ({ src: i.src, name: i.alt })) })]} />
      <PageHero title={c.title} lead={c.summary} image={p.cover} eyebrow={t.projects.categories[p.category]} />
      <section className={`${container} py-16 sm:py-20`}>
        <Reveal className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-ink-soft">
          <span className="flex items-center gap-2"><Pin className="text-forest" />{t.projects.noLocation}</span>
          <span className="rounded-full bg-forest/10 px-4 py-1.5 text-sm font-semibold text-forest">{t.projects.categories[p.category]}</span>
          <span>{p.images.length} {t.projects.photos}</span>
        </Reveal>
        <h2 className="sr-only">{t.projectsPage.gallery}</h2>
        <Gallery items={items} labels={{ ...t.gallery, play: t.video.play }} rtl={lang === "ar"} />
        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <Link href={`/${lang}/contact`} className={btn.primary}>{t.cta.request}</Link>
          <a href={whatsappUrl(`${t.whatsappGreeting} (${c.title})`)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsApp />{t.cta.whatsapp}</a>
        </div>
      </section>
      <section className="bg-white py-20 sm:py-24">
        <div className={container}>
          <SectionHeading title={t.projects.related} />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <li key={r.slug}><ProjectCard project={r} lang={lang} t={t} /></li>)}</ul>
        </div>
      </section>
      <CtaBand lang={lang} t={t} image="lawn-garden-edge" />
    </>
  );
}
