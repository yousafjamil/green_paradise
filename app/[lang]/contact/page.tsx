import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { services } from "@/data/services";
import { container } from "@/lib/ui";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";
import ContactInfo from "@/components/ContactInfo";
import LocationMap from "@/components/LocationMap";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return pageMeta({ lang, path: "/contact", title: t.contact.title, description: t.contact.text });
}

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <PageHero title={t.contact.title} lead={t.contact.text} image="lawn-garden-tree" eyebrow={t.contact.eyebrow} />
      <section className={`${container} grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1.2fr] lg:gap-16`}>
        <ContactInfo t={t} />
        <ContactForm t={t} lang={lang} services={services.map((s) => ({ slug: s.slug, label: s[lang].title }))} />
      </section>
      <LocationMap lang={lang} t={t} />
    </>
  );
}
