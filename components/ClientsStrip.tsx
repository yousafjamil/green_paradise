import Image from "next/image";
import type { Dict } from "@/lib/dictionary";
import { clients } from "@/data/clients";
import { container } from "@/lib/ui";
import Reveal from "./Reveal";

/** "Trusted by" logo row. Renders nothing until data/clients.ts has entries. */
export default function ClientsStrip({ t }: { t: Dict }) {
  if (!clients.length) return null;
  return (
    <section className="border-y border-line bg-white py-10" aria-label={t.clients.title}>
      <div className={container}>
        <Reveal><p className="mb-6 text-center text-xs font-bold tracking-[0.2em] text-ink-soft uppercase">{t.clients.title}</p></Reveal>
        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {clients.map((c) => (
            <li key={c.name} className="relative h-12 w-28 opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0">
              <Image src={c.logo} alt={c.name} fill sizes="112px" className="object-contain" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
