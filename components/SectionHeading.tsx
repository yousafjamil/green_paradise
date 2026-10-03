"use client";
import { motion } from "framer-motion";

export default function SectionHeading({ eyebrow, title, text, light = false, center = false }: { eyebrow?: string; title: string; text?: string; light?: boolean; center?: boolean }) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <p className={`mb-3 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${center ? "justify-center" : ""} ${light ? "text-gold" : "text-forest"}`}>
          <motion.span aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }} className="h-px w-8 origin-left bg-current rtl:origin-right" />{eyebrow}
        </p>
      )}
      <h2 className={`text-[1.9rem] leading-[1.12] font-semibold sm:text-4xl lg:text-[2.75rem] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {text && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-white/75" : "text-ink-soft"}`}>{text}</p>}
    </div>
  );
}
