import type { Photo } from "./media";
import type { Locale } from "./i18n";
import type { Dict } from "./dictionary";
import { photoAlts } from "@/data/alts";

/** What the photo actually shows, in the visitor's language. Falls back to a readable label. */
export function altFor(p: Photo, lang: Locale, t: Dict, index = 0): string {
  const known = photoAlts[p.id]?.[lang];
  if (known) return known;
  if (lang === "en") { const w = p.id.replace(/-/g, " "); return `${w.charAt(0).toUpperCase()}${w.slice(1)}`; }
  return `${(t.gallery.categories as Record<string, string>)[p.category] ?? ""} ${index + 1}`.trim();
}
