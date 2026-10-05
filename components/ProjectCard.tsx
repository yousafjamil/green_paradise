import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionary";
import type { Project } from "@/data/projects";
import { photo } from "@/lib/media";
import { Arrow } from "./icons";
import Lift from "./Lift";

export default function ProjectCard({ project, lang, t, ratio = "aspect-[4/5]", sizes = "(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw", headingLevel = 3 }: { project: Project; lang: Locale; t: Dict; ratio?: string; sizes?: string; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  const c = project[lang];
  const img = photo(project.cover);
  return (
    <Lift>
    <Link href={`/${lang}/projects/${project.slug}`} className={`group relative block overflow-hidden rounded-2xl bg-ink ${ratio}`}>
      <Image src={img.src} alt={c.title} fill sizes={sizes} placeholder="blur" blurDataURL={img.blur} className="object-cover transition-transform duration-700 group-hover:scale-105" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent transition-opacity duration-500 group-hover:from-ink/95" />
      <span aria-hidden className="absolute end-4 top-4 flex size-11 scale-75 items-center justify-center rounded-full bg-white text-forest opacity-0 shadow-lg transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"><Arrow className="-rotate-45 rtl:rotate-45" /></span>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <span className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{t.projects.categories[project.category]}</span>
        <Heading className="text-xl leading-snug font-semibold transition-transform duration-500 group-hover:-translate-y-1 sm:text-2xl">{c.title}</Heading>
        <span className="mt-2 flex items-center gap-2 text-sm text-white/80">{project.images.length} {t.projects.photos}<Arrow className="size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" /></span>
      </div>
    </Link>
    </Lift>
  );
}
