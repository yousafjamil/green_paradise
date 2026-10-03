import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { terms } from "@/data/legal";
import LegalPage from "@/components/LegalPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return pageMeta({ lang, path: "/terms", title: terms[lang].title, description: terms[lang].intro });
}

export default async function Page({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage doc={terms[lang]} t={getDictionary(lang)} lang={lang} />;
}
