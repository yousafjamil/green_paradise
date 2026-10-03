import type { Metadata } from "next";
import { site } from "./site";
import type { Locale } from "./i18n";

type Args = { lang: Locale; path?: string; title: string; description: string; image?: string };

export function pageMeta({ lang, path = "", title, description, image }: Args): Metadata {
  const url = `${site.url}/${lang}${path}`;
  const og = image ?? "/media/photos/sea-view-lawn-sprinklers.jpg";
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { en: `${site.url}/en${path}`, ar: `${site.url}/ar${path}`, "x-default": `${site.url}/en${path}` },
    },
    openGraph: {
      title, description, url, siteName: site.name, type: "website",
      locale: lang === "ar" ? "ar_AE" : "en_AE",
      images: [{ url: og, width: 1200, height: 900, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}
