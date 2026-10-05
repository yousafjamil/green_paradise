import type { L } from "@/lib/i18n";

// List the real areas the client serves, e.g. { en: ["Abu Dhabi", "Saadiyat Island"], ar: ["أبوظبي", "جزيرة السعديات"] }.
// The "Areas we serve" section stays hidden while these lists are empty.
export const areas: L<string[]> = { en: [], ar: [] };
