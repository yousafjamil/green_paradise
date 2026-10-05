import type { L } from "@/lib/i18n";

export type Testimonial = { name: string; role?: L<string>; text: L<string>; source?: string; date?: string };

// Add REAL reviews here (with the customer's permission). The section stays hidden while this list is empty.
// Example:
// { name: "Customer name", text: { en: "What they said.", ar: "ما قالوه." }, source: "Google", date: "2026-10" }
export const testimonials: Testimonial[] = [];
