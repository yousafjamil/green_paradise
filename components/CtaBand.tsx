import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionary";
import { photo } from "@/lib/media";
import { btn, container } from "@/lib/ui";
import { telUrl, whatsappUrl } from "@/lib/site";
import { Phone, WhatsApp } from "./icons";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

export default function CtaBand({ lang, t, image = "pink-bougainvillea-tree-villa" }: { lang: Locale; t: Dict; image?: string }) {
  const img = photo(image);
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep bg-pattern text-white">
      <Image src={img.src} alt="" fill sizes="100vw" placeholder="blur" blurDataURL={img.blur} className="-z-20 object-cover object-center" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-forest-deep/85" />
      <Reveal className={`${container} py-20 text-center sm:py-24`}>
        <h2 className="mx-auto max-w-3xl text-3xl leading-tight font-semibold sm:text-5xl">{t.cta_band.title}</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">{t.cta_band.text}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Magnetic className="max-sm:[&>*]:w-full"><a href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsApp />{t.cta.whatsapp}</a></Magnetic>
          <Magnetic className="max-sm:[&>*]:w-full"><a href={telUrl} className={btn.light}><Phone />{t.cta.call}</a></Magnetic>
          <Magnetic className="max-sm:[&>*]:w-full"><Link href={`/${lang}/contact`} className={btn.outline}>{t.cta.request}</Link></Magnetic>
        </div>
      </Reveal>
    </section>
  );
}
