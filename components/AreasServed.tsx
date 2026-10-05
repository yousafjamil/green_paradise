import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { areas } from "@/data/areas";
import { container } from "@/lib/ui";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Pin } from "./icons";

/** Areas the company serves. Renders nothing until data/areas.ts has entries. */
export default function AreasServed({ lang, t }: { lang: Locale; t: Dict }) {
  const list = areas[lang];
  if (!list.length) return null;
  return (
    <section className={`${container} py-20 sm:py-24`}>
      <Reveal><SectionHeading eyebrow={t.areas.eyebrow} title={t.areas.title} text={t.areas.text} /></Reveal>
      <ul className="mt-10 flex flex-wrap gap-3">
        {list.map((a) => <li key={a} className="flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold"><Pin className="size-4 text-forest" />{a}</li>)}
      </ul>
    </section>
  );
}
