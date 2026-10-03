import type { Photo } from "./media";
import type { Locale } from "./i18n";
import type { Dict } from "./dictionary";

/** Readable alt text from the photo id (English) or its gallery category (Arabic). */
export function altFor(p: Photo, lang: Locale, t: Dict, index = 0): string {
  if (lang === "en") {
    const words = p.id.replace(/-/g, " ");
    return `${words.charAt(0).toUpperCase()}${words.slice(1)} – Green Paradise`;
  }
  const cat = (t.gallery.categories as Record<string, string>)[p.category] ?? "";
  return `${cat} – جرين برادايس ${index + 1}`;
}
