import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { projects } from "@/data/projects";
import { container } from "@/lib/ui";
import JsonLd from "@/components/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";
import CtaBand from "@/components/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMeta({ lang, path: "/projects", title: t.projectsPage.title, description: t.projectsPage.lead });
}

export default async function Projects({ params }: PageProps<"/[lang]/projects">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <JsonLd data={breadcrumbLd(lang, [{ name: t.nav.home, path: "" }, { name: t.nav.projects, path: "/projects" }])} />
      <PageHero title={t.projectsPage.title} lead={t.projectsPage.lead} image="sea-view-lawn-sprinklers" />
      <section className={`${container} py-20 sm:py-24`}>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => <Reveal as="li" key={p.slug} delay={(i % 3) * 90}><ProjectCard project={p} lang={lang} t={t} /></Reveal>)}
        </ul>
      </section>
      <CtaBand lang={lang} t={t} />
    </>
  );
}
