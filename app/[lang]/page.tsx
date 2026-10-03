import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { galleryVideos } from "@/data/videos";
import { photo, video } from "@/lib/media";
import { btn, container } from "@/lib/ui";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";
import VideoGrid from "@/components/VideoGrid";
import CtaBand from "@/components/CtaBand";
import Marquee from "@/components/Marquee";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { websiteLd } from "@/lib/jsonld";
import ImageReveal from "@/components/ImageReveal";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import { Arrow, Check } from "@/components/icons";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const poster = video("video-01");
  const intro = photo("palm-lawn-bougainvillea-hedge");

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };

  return (
    <>
      <JsonLd data={[faqLd, websiteLd(lang, t.meta.siteTitle)]} />
      <Hero lang={lang} t={t} poster={{ src: poster.poster }} desktopVideo={video("video-01").src} mobileVideo={video("video-04").src} />

      <Marquee items={[...services.map((s) => s[lang].title), ...t.marquee]} />

      {/* Intro */}
      <section className={`${container} grid grid-cols-1 items-center gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16`}>
        <Reveal>
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-sand lg:max-w-lg">
            <div className="relative size-full">
              <Image src={intro.src} alt={t.intro.title} fill sizes="(min-width:1024px) 40vw,100vw" placeholder="blur" blurDataURL={intro.blur} className="object-cover" />
            </div>
          </ImageReveal>
        </Reveal>
        <Reveal delay={120}>
          <SectionHeading eyebrow={t.intro.eyebrow} title={t.intro.title} />
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">{t.intro.text}</p>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t.intro.text2}</p>
          <ul className="mt-7 grid gap-3">
            {t.intro.points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-medium"><span className="flex size-6 items-center justify-center rounded-full bg-forest text-white"><Check className="size-3.5" strokeWidth={2.5} /></span>{p}</li>
            ))}
          </ul>
          <Link href={`/${lang}/about`} className={`${btn.outlineDark} mt-9`}>{t.cta.about}<Arrow className="size-4" /></Link>
        </Reveal>
      </section>

      {/* Services */}
      <section className="bg-white py-20 sm:py-28">
        <div className={container}>
          <Reveal><SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} text={t.services.text} /></Reveal>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) * 90}><ServiceCard service={s} lang={lang} label={t.cta.details} /></Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured projects */}
      <section className={`${container} py-20 sm:py-28`}>
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Reveal><SectionHeading eyebrow={t.projects.eyebrow} title={t.projects.title} text={t.projects.text} /></Reveal>
          <Link href={`/${lang}/projects`} className={`${btn.outlineDark} self-start`}>{t.cta.allProjects}<Arrow className="size-4" /></Link>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 5).map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 3) * 90} className={i === 0 ? "lg:col-span-2" : ""}>
              <ProjectCard project={p} lang={lang} t={t} ratio={i === 0 ? "aspect-[4/5] sm:aspect-[16/10] lg:aspect-[16/10]" : "aspect-[4/5]"} sizes={i === 0 ? "(min-width:1024px) 66vw,100vw" : "(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw"} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Video */}
      <section className="bg-forest-deep bg-pattern py-20 text-white sm:py-28">
        <div className={container}>
          <Reveal><SectionHeading light eyebrow={t.video.eyebrow} title={t.video.title} text={t.video.text} /></Reveal>
          <div className="mt-12">
            <VideoGrid videos={galleryVideos(lang, ["video-05", "video-09", "video-08", "video-10"])} playLabel={t.video.play} className="grid grid-cols-2 gap-3 lg:grid-cols-4" />
          </div>
        </div>
      </section>

      {/* Why */}
      <section className={`${container} py-20 sm:py-28`}>
        <Reveal><SectionHeading eyebrow={t.why.eyebrow} title={t.why.title} /></Reveal>
        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((it, i) => (
            <Reveal as="li" key={it.t} delay={(i % 3) * 90} className="border-t border-line pt-6">
              <span className="font-display text-sm font-semibold text-forest" dir="ltr">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-xl font-semibold">{it.t}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{it.d}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      <Faq t={t} />

      <CtaBand lang={lang} t={t} />

      {/* Contact */}
      <section id="contact" className={`${container} grid grid-cols-1 gap-12 py-20 sm:py-28 lg:grid-cols-[1fr_1.2fr] lg:gap-16`}>
        <Reveal>
          <SectionHeading eyebrow={t.contact.eyebrow} title={t.contact.title} text={t.contact.text} />
          <div className="mt-8"><ContactInfo t={t} /></div>
        </Reveal>
        <Reveal delay={120}><ContactForm t={t} lang={lang} services={services.map((s) => ({ slug: s.slug, label: s[lang].title }))} /></Reveal>
      </section>
    </>
  );
}
