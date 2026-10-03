import { allVideos } from "@/lib/media";
import type { L } from "@/lib/i18n";

const labels: Record<string, L<string>> = {
  "video-01": { en: "Artificial turf with stepping stones", ar: "عشب صناعي مع ممرات حجرية" },
  "video-03": { en: "Ground preparation", ar: "تجهيز الأرض" },
  "video-04": { en: "Natural lawn beside a paved path", ar: "مسطح طبيعي بجانب ممشى مبلّط" },
  "video-05": { en: "Artificial turf installation", ar: "تركيب العشب الصناعي" },
  "video-06": { en: "Plant nursery", ar: "المشتل" },
  "video-07": { en: "Turf with a hedge border", ar: "عشب مع حد من الأسيجة" },
  "video-08": { en: "Planters at an entrance", ar: "أحواض نباتات عند المدخل" },
  "video-09": { en: "Hedge and flower bed by a pool", ar: "سياج وحوض زهور بجانب مسبح" },
  "video-10": { en: "Garden corner with climbers and flowers", ar: "ركن حديقة بنباتات متسلقة وزهور" },
  "video-11": { en: "Turf with drip irrigation lines", ar: "عشب مع خطوط ري بالتنقيط" },
  "video-13": { en: "Turf, stepping stones and planting", ar: "عشب وممرات حجرية وزراعة" },
};

export const galleryVideos = (lang: keyof L<string>, only?: string[]) =>
  allVideos
    .filter((v) => !only || only.includes(v.id))
    .map((v) => ({ ...v, label: labels[v.id]?.[lang] ?? v.id }));
