import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import type { Service } from "@/data/services";
import { photo } from "@/lib/media";
import { Arrow, ServiceIcon } from "./icons";
import Lift from "./Lift";

export default function ServiceCard({ service, lang, label }: { service: Service; lang: Locale; label: string }) {
  const c = service[lang];
  const img = service.image ? photo(service.image) : null;
  return (
    <Lift>
    <Link href={`/${lang}/services/${service.slug}`} className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-forest/10">
      <div className="relative aspect-[4/3] overflow-hidden bg-forest">
        {img ? (
          <Image src={img.src} alt={c.title} fill sizes="(min-width:1024px) 33vw,(min-width:640px) 50vw,100vw" placeholder="blur" blurDataURL={img.blur} className="object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-forest to-forest-deep text-white/90"><ServiceIcon name={service.icon} width={64} height={64} strokeWidth={1.2} /></div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="mb-3 flex size-10 items-center justify-center rounded-full bg-forest/10 text-forest transition-all duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 group-hover:bg-forest group-hover:text-white"><ServiceIcon name={service.icon} /></span>
        <h3 className="text-xl font-semibold">{c.title}</h3>
        <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{c.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest">{label}<Arrow className="size-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" /></span>
      </div>
    </Link>
    </Lift>
  );
}
