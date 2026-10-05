// Collects the text and photo for every share card. Run with Node 24+: node scripts/og-data.mts
import { writeFileSync } from "node:fs";
import { getDictionary } from "../lib/dictionary.ts";
import { services } from "../data/services.ts";
import { projects } from "../data/projects.ts";

type Card = { file: string; lang: "en" | "ar"; title: string; sub: string; photo: string };
const cards: Card[] = [];

for (const lang of ["en", "ar"] as const) {
  const t = getDictionary(lang);
  const add = (key: string, title: string, sub: string, photo: string) => cards.push({ file: `${lang}-${key}`, lang, title, sub, photo });
  add("default", t.hero.title, t.hero.eyebrow, "sea-view-lawn-sprinklers");
  add("about", t.about.title, t.about.lead, "white-bougainvillea-tree-villa");
  add("services", t.servicesPage.title, t.servicesPage.lead, "fresh-lawn-hedge");
  add("plants", t.plantsPage.title, t.plantsPage.lead, "bougainvillea-red-pot");
  add("projects", t.projectsPage.title, t.projectsPage.lead, "villa-lawn-garden");
  add("gallery", t.gallery.title, t.gallery.text, "flower-border-lawn");
  add("contact", t.contact.title, t.contact.text, "turf-seating-bougainvillea");
  for (const s of services) add(`service-${s.slug}`, s[lang].title, t.nav.services, s.image ?? "lawn-garden-tree");
  for (const p of projects) add(`project-${p.slug}`, p[lang].title, t.projects.categories[p.category], p.cover);
}
writeFileSync(new URL("./og-data.json", import.meta.url), JSON.stringify(cards, null, 1));
console.log(cards.length, "cards");
