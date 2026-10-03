import Image from "next/image";
import { container } from "@/lib/ui";
import { photo } from "@/lib/media";

export default function PageHero({ title, lead, image, eyebrow }: { title: string; lead?: string; image: string; eyebrow?: string }) {
  const img = photo(image);
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <Image src={img.src} alt="" fill priority sizes="100vw" placeholder="blur" blurDataURL={img.blur} className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/40" />
      <div className={`${container} py-20 sm:py-28 lg:py-32`}>
        {eyebrow && <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>}
        <h1 className="animate-fade-up max-w-3xl text-4xl leading-[1.08] font-semibold sm:text-5xl lg:text-6xl">{title}</h1>
        {lead && <p className="animate-fade-up mt-5 max-w-2xl text-lg text-white/80 sm:text-xl" style={{ animationDelay: "120ms" }}>{lead}</p>}
      </div>
    </section>
  );
}
