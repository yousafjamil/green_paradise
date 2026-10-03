export type Project = {
  slug: string;
  category: "lawns" | "turf" | "entrances" | "flowers";
  cover: string;
  images: string[]; // photo ids, cover first, no duplicates across projects
  en: { title: string; summary: string };
  ar: { title: string; summary: string };
};

// Each photo appears in exactly one project. Locations/client names are not confirmed,
// so projects are described by type instead of inventing names or places.
export const projects: Project[] = [
  {
    slug: "villa-lawns-and-hedge-gardens",
    category: "lawns",
    cover: "sea-view-lawn-sprinklers",
    images: ["sea-view-lawn-sprinklers", "fresh-lawn-hedge", "lawn-paving-hedge", "villa-lawn-garden", "lawn-sprinkler-hedge", "lawn-irrigation-line", "palm-lawn-bougainvillea-hedge"],
    en: { title: "Villa Lawns & Hedge Gardens", summary: "Wide natural lawns framed by clipped hedges, with irrigation planned in." },
    ar: { title: "مسطحات خضراء وأسيجة للفلل", summary: "مسطحات طبيعية واسعة تحيط بها أسيجة مشذّبة مع نظام ري مخطّط مسبقاً." },
  },
  {
    slug: "modern-villa-entrance-garden",
    category: "entrances",
    cover: "olive-tree-villa-garden",
    images: ["olive-tree-villa-garden", "flower-beds-villa-entrance", "tree-planters-pergola"],
    en: { title: "Modern Villa Entrance Garden", summary: "A feature olive tree with a pebble ring, layered flower beds and planted entrances." },
    ar: { title: "حديقة مدخل فيلا عصرية", summary: "شجرة زيتون مميزة بحلقة حصى، وأحواض زهور متدرجة ومداخل مزروعة." },
  },
  {
    slug: "family-gardens-and-lawns",
    category: "lawns",
    cover: "villa-lawn-corner",
    images: ["villa-lawn-corner", "family-garden-lawn", "garden-lawn-play-area", "lawn-villa-trees", "lawn-flower-border", "lawn-garden-tree", "lawn-garden-edge", "villa-lawn-mowing"],
    en: { title: "Family Gardens & Lawns", summary: "Open green lawns with trees and flower borders, made for everyday family use." },
    ar: { title: "حدائق ومسطحات عائلية", summary: "مسطحات خضراء مفتوحة مع أشجار وأطراف زهور، مصممة للاستخدام العائلي اليومي." },
  },
  {
    slug: "artificial-turf-gardens",
    category: "turf",
    cover: "turf-patio-bougainvillea-pot",
    images: ["turf-patio-bougainvillea-pot", "turf-seating-bougainvillea", "turf-terrace-planters", "turf-installation-villa"],
    en: { title: "Artificial Turf Gardens & Terraces", summary: "Clean artificial turf beside paved seating areas, planters and flowering pots." },
    ar: { title: "حدائق وتراسات بالعشب الصناعي", summary: "عشب صناعي مرتب بجانب مناطق جلوس مبلّطة وأحواض نباتات وأصص مزهرة." },
  },
  {
    slug: "entrance-and-courtyard-planters",
    category: "entrances",
    cover: "palm-planter-entrance",
    images: ["palm-planter-entrance", "palm-planters-courtyard", "planters-entrance-steps", "pool-hedge-garden"],
    en: { title: "Entrance & Courtyard Planters", summary: "Palms and large planters that welcome guests at entrances, steps and poolside." },
    ar: { title: "أحواض نباتات للمداخل والأفنية", summary: "نخيل وأحواض كبيرة تستقبل الضيوف عند المداخل والدرج وجانب المسبح." },
  },
  {
    slug: "flower-beds-and-borders",
    category: "flowers",
    cover: "bougainvillea-wall",
    images: ["bougainvillea-wall", "pink-bougainvillea-tree-villa", "white-bougainvillea-tree-villa", "flower-border-lawn", "vertical-flower-planters", "petunia-bed-purple-white", "petunia-bed-walkway", "petunia-pots", "orange-ixora-hedge"],
    en: { title: "Flower Beds & Bougainvillea", summary: "Colourful borders, flowering hedges and bougainvillea trees that bring a garden to life." },
    ar: { title: "أحواض زهور وجهنمية", summary: "أطراف ملوّنة وأسيجة مزهرة وأشجار جهنمية تمنح الحديقة الحياة." },
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
