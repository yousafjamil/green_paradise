import { site } from "./site";
import type { Locale } from "./i18n";

const abs = (lang: Locale, path: string) => `${site.url}/${lang}${path}`;

export type Crumb = { name: string; path: string };

/** Breadcrumb trail for Google results, e.g. Home › Services › Irrigation Systems. */
export function breadcrumbLd(lang: Locale, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: abs(lang, c.path) })),
  };
}

const provider = { "@type": "LocalBusiness", name: site.name, telephone: site.phone, email: site.email, address: { "@type": "PostalAddress", addressLocality: "Abu Dhabi", addressCountry: "AE" } };

export function serviceLd(lang: Locale, s: { slug: string; name: string; description: string; points: string[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: abs(lang, `/services/${s.slug}`),
    serviceType: s.name,
    provider,
    areaServed: { "@type": "City", name: "Abu Dhabi" },
    image: `${site.url}/og/${lang}-service-${s.slug}.jpg`,
    inLanguage: lang,
    ...(s.points.length ? { hasOfferCatalog: { "@type": "OfferCatalog", name: s.name, itemListElement: s.points.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p } })) } } : {}),
  };
}

export function galleryLd(lang: Locale, g: { slug: string; name: string; description: string; images: { src: string; name: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: g.name,
    description: g.description,
    url: abs(lang, `/projects/${g.slug}`),
    inLanguage: lang,
    author: provider,
    image: g.images.map((i) => ({ "@type": "ImageObject", contentUrl: `${site.url}${i.src}`, name: i.name })),
  };
}

export function websiteLd(lang: Locale, name: string) {
  return { "@context": "https://schema.org", "@type": "WebSite", name, url: abs(lang, ""), inLanguage: lang, publisher: provider };
}
