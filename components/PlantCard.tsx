import Image from "next/image";
import type { PlantView } from "@/data/plants";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";
import Lift from "./Lift";
import { WhatsApp } from "./icons";

export default function PlantCard({ plant, lang, t, headingLevel = 3 }: { plant: PlantView; lang: Locale; t: Dict; headingLevel?: 2 | 3 }) {
  const Heading = `h${headingLevel}` as const;
  const c = plant[lang];
  const img = plant.img;
  return (
    <Lift>
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white">
        <div className="relative aspect-[4/5] overflow-hidden bg-sand">
          <Image src={img.src} alt={c.name} fill sizes="(min-width:1024px) 25vw,(min-width:640px) 33vw,50vw" placeholder="blur" blurDataURL={img.blur} className="object-cover transition-transform duration-700 hover:scale-105" />
        </div>
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <Heading className="text-lg leading-snug font-semibold">{c.name}</Heading>
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-soft">{c.note}</p>
          <a href={whatsappUrl(`${t.plantsPage.interest} ${c.name}`)} target="_blank" rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-4 py-2.5 text-sm font-semibold text-[#06331a] transition hover:bg-[#1fbd5a]">
            <WhatsApp width={16} height={16} />{t.plantsPage.ask}
          </a>
        </div>
      </article>
    </Lift>
  );
}
