"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import type { PlantGroup, PlantView } from "@/data/plants";
import { plantGroupLabels } from "@/data/plants";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import PlantCard from "./PlantCard";

/** Filterable plant catalogue. The cards are server-friendly; only the filter state lives here. */
export default function PlantGrid({ plants, lang, t }: { plants: PlantView[]; lang: Locale; t: Dict }) {
  const [group, setGroup] = useState<PlantGroup | "all">("all");
  const groups = (Object.keys(plantGroupLabels) as PlantGroup[]).filter((g) => plants.some((p) => p.group === g));
  const shown = group === "all" ? plants : plants.filter((p) => p.group === group);
  const chips: { id: PlantGroup | "all"; label: string }[] = [{ id: "all", label: t.plantsPage.all }, ...groups.map((g) => ({ id: g, label: plantGroupLabels[g][lang] }))];
  return (
    <div>
      <div role="tablist" aria-orientation="horizontal" className="-mx-5 mb-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {chips.map((c) => (
          <button key={c.id} role="tab" aria-selected={group === c.id} onClick={() => setGroup(c.id)}
            className={`relative shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${group === c.id ? "border-forest text-white" : "border-line bg-white text-ink-soft hover:border-forest hover:text-forest"}`}>
            {group === c.id && <motion.span layoutId="plant-chip" transition={{ type: "spring", stiffness: 380, damping: 30 }} className="absolute inset-0 rounded-full bg-forest" />}
            <span className="relative">{c.label}</span>
          </button>
        ))}
      </div>
      <ul key={group} className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {shown.map((p, i) => (
          <motion.li key={p.slug} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1], delay: Math.min(i * 0.04, 0.4) }}>
            <PlantCard plant={p} lang={lang} t={t} headingLevel={2} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
