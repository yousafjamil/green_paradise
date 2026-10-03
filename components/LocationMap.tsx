import type { Locale } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionary";
import { site } from "@/lib/site";
import { container } from "@/lib/ui";
import { Arrow, Pin } from "./icons";

export default function LocationMap({ lang, t }: { lang: Locale; t: Dict }) {
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
      <div className="overflow-hidden rounded-2xl border border-line bg-sand">
        <iframe title={t.map.title} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block aspect-[4/3] w-full sm:aspect-[16/7]" />
      </div>
    </section>
  );
}
