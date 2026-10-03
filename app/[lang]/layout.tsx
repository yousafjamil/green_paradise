import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cairo, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "../globals.css";
import { dirOf, hasLocale, locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MotionProvider from "@/components/MotionProvider";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import Analytics from "@/components/Analytics";
import Assistant from "@/components/Assistant";
import { services } from "@/data/services";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((lang) => ({ lang }));

export const viewport: Viewport = { themeColor: "#0a3d28", width: "device-width", initialScale: 1 };

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.siteTitle, template: `%s | ${site.name}` },
    description: t.meta.siteDescription,
    ...pageMeta({ lang, title: t.meta.siteTitle, description: t.meta.siteDescription }),
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/${lang}`,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/media/photos/sea-view-lawn-sprinklers.jpg`,
    areaServed: { "@type": "City", name: "Abu Dhabi" },
    address: { "@type": "PostalAddress", addressLocality: "Abu Dhabi", addressCountry: "AE" },
    description: t.meta.siteDescription,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
    knowsAbout: ["Landscaping", "Garden maintenance", "Artificial turf", "Irrigation", "Plants and trees"],
  };

  return (
    <html lang={lang} dir={dirOf(lang)} className={`${fraunces.variable} ${jakarta.variable} ${cairo.variable}`}>
      <body className="flex min-h-svh flex-col">
        <MotionProvider>
          <ScrollProgress />
          <Header lang={lang} t={t} />
          <main id="main" className="flex-1">{children}</main>
          <Footer lang={lang} t={t} />
          <Assistant lang={lang} t={t} serviceTitles={services.map((x) => x[lang].title)} />
          <BackToTop label={t.nav.top} />
          <WhatsAppFloat label={t.cta.whatsapp} text={t.whatsappGreeting} />
        </MotionProvider>
        <Analytics />
        {/* Animated content starts hidden; without JavaScript it must stay readable. */}
        <noscript><style>{'[style*="opacity:0"],[style*="opacity: 0"]{opacity:1!important;transform:none!important;clip-path:none!important}'}</style></noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
