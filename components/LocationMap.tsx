"use client";
import { useState } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionary";
import { site } from "@/lib/site";
import { container } from "@/lib/ui";
import { Arrow, Pin } from "./icons";

/** The Google map loads only after a click, so visiting the page sets no third-party cookies. */
export default function LocationMap({ lang, t }: { lang: Locale; t: Dict }) {
  const [loaded, setLoaded] = useState(false);
  const q = encodeURIComponent(site.mapQuery);
  const embed = `https://www.google.com/maps?q=${q}&hl=${lang}&z=${site.mapZoom}&output=embed`;
  const open = `https://www.google.com/maps/search/?api=1&query=${q}`;
  return (
    <section className={`${container} pb-16 sm:pb-24`} aria-labelledby="map-title">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 id="map-title" className="text-2xl font-semibold sm:text-3xl">{t.map.title}</h2>
          <p className="mt-2 flex items-center gap-2 text-ink-soft"><Pin className="size-4 text-forest" />{t.map.note}</p>
        </div>
        <a href={open} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 self-start rounded-full border border-forest/30 px-5 py-2.5 text-sm font-semibold text-forest transition hover:bg-forest hover:text-white">
          {t.map.open}<Arrow className="size-4" />
        </a>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-sand sm:aspect-[16/7]">
        {loaded ? (
          <iframe title={t.map.title} src={embed} referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full" />
        ) : (
          <div className="bg-pattern absolute inset-0 flex flex-col items-center justify-center gap-4 bg-forest-deep p-6 text-center text-white">
            <span className="flex size-14 items-center justify-center rounded-full bg-white/10"><Pin width={28} height={28} /></span>
            <button type="button" onClick={() => setLoaded(true)} className="rounded-full bg-gold px-6 py-3 font-semibold text-ink transition hover:bg-[#ffd75a]">{t.map.load}</button>
            <p className="max-w-sm text-sm text-white/70">{t.map.consent}</p>
          </div>
        )}
      </div>
    </section>
  );
}
