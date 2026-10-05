import type { L } from "@/lib/i18n";

export type PlantGroup = "bougainvillea" | "trees" | "palms" | "flowers" | "cacti";
export type Plant = { slug: string; photo: string; group: PlantGroup; en: { name: string; note: string }; ar: { name: string; note: string } };

// Only plants we have real nursery or project photos of. No prices or stock claims: customers ask on WhatsApp.
export const plantGroupLabels: Record<PlantGroup, L<string>> = {
  bougainvillea: { en: "Bougainvillea", ar: "الجهنمية" },
  trees: { en: "Trees & hedges", ar: "أشجار وأسيجة" },
  palms: { en: "Palms & foliage", ar: "نخيل ونباتات ورقية" },
  flowers: { en: "Flowers", ar: "زهور" },
  cacti: { en: "Cacti", ar: "صبار" },
};

export const plants: Plant[] = [
  { slug: "bougainvillea-red", photo: "bougainvillea-red-pot", group: "bougainvillea", en: { name: "Bougainvillea, red", note: "Bold red blooms in a ready-to-place pot." }, ar: { name: "جهنمية حمراء", note: "أزهار حمراء جريئة في أصيص جاهز للتركيب." } },
  { slug: "bougainvillea-purple", photo: "bougainvillea-purple-pot", group: "bougainvillea", en: { name: "Bougainvillea, purple", note: "Rich purple bracts that cover the plant when in bloom." }, ar: { name: "جهنمية أرجوانية", note: "أوراق زهرية أرجوانية غنية تغطي النبات وقت الإزهار." } },
  { slug: "bougainvillea-orange", photo: "bougainvillea-orange-pot", group: "bougainvillea", en: { name: "Bougainvillea, orange", note: "Warm orange tones for sunny entrances and patios." }, ar: { name: "جهنمية برتقالية", note: "درجات برتقالية دافئة للمداخل والباحات المشمسة." } },
  { slug: "bougainvillea-tree", photo: "bougainvillea-tree-pink", group: "bougainvillea", en: { name: "Bougainvillea tree", note: "Trained as a tree on a clear trunk, in a large pot." }, ar: { name: "شجرة جهنمية", note: "مشكّلة على هيئة شجرة بجذع واضح في أصيص كبير." } },
  { slug: "bougainvillea-tower", photo: "bougainvillea-tower", group: "bougainvillea", en: { name: "Bougainvillea tower", note: "Multicoloured and trained upward as a feature piece." }, ar: { name: "برج جهنمية", note: "متعدد الألوان ومشكّل عمودياً كقطعة مميزة." } },
  { slug: "ficus-shaped", photo: "ficus-bonsai-shaped", group: "trees", en: { name: "Shaped ficus", note: "Cloud-pruned ficus with a sculpted, layered crown." }, ar: { name: "فيكس مشكّل", note: "فيكس مشذّب على هيئة سحب بتاج منحوت متعدد الطبقات." } },
  { slug: "ficus-hedging", photo: "ficus-hedging-plants", group: "trees", en: { name: "Ficus hedging plants", note: "Dense green plants for privacy hedges and screens." }, ar: { name: "نباتات فيكس للأسيجة", note: "نباتات خضراء كثيفة لأسيجة الخصوصية والحجب." } },
  { slug: "topiary-balls", photo: "topiary-balls", group: "trees", en: { name: "Topiary balls", note: "Ball-shaped shrubs for borders and formal gardens." }, ar: { name: "شجيرات كروية مشكّلة", note: "شجيرات كروية للأطراف والحدائق الرسمية." } },
  { slug: "nursery-trees", photo: "nursery-trees", group: "trees", en: { name: "Shade and garden trees", note: "A range of young trees for villa gardens." }, ar: { name: "أشجار ظل وحدائق", note: "تشكيلة من الأشجار الصغيرة لحدائق الفلل." } },
  { slug: "areca-palms", photo: "areca-palms-ixora", group: "palms", en: { name: "Areca palms", note: "Feathery palms that add a lush, tropical look." }, ar: { name: "نخيل أريكا", note: "نخيل ريشي يمنح مظهراً استوائياً كثيفاً." } },
  { slug: "fan-palm-planter", photo: "palm-planter-entrance", group: "palms", en: { name: "Fan palm in planter", note: "A statement palm for entrances and courtyards." }, ar: { name: "نخلة مروحية في حوض", note: "نخلة مميزة للمداخل والأفنية." } },
  { slug: "dracaena-cordyline", photo: "planters-entrance-steps", group: "palms", en: { name: "Dracaena and cordyline", note: "Foliage plants in dark planters for steps and entrances." }, ar: { name: "دراسينا وكورديلاين", note: "نباتات ورقية في أحواض داكنة للدرج والمداخل." } },
  { slug: "ixora", photo: "orange-ixora-hedge", group: "flowers", en: { name: "Ixora hedge", note: "Orange flowering hedge that stays colourful." }, ar: { name: "سياج إكسورا", note: "سياج مزهر برتقالي يبقى ملوناً." } },
  { slug: "petunias", photo: "petunia-pots", group: "flowers", en: { name: "Petunias", note: "Seasonal pink, white and purple flowers for pots and beds." }, ar: { name: "بتونيا", note: "زهور موسمية وردية وبيضاء وأرجوانية للأصص والأحواض." } },
  { slug: "cactus", photo: "cactus-nursery", group: "cacti", en: { name: "Tall cacti", note: "Low-water, striking plants in black nursery pots." }, ar: { name: "صبار طويل", note: "نباتات لافتة قليلة الاستهلاك للماء في أصص مشتل سوداء." } },
];

export type PlantView = Plant & { img: { src: string; blur: string } };

export const plantBySlug = (slug: string) => plants.find((p) => p.slug === slug);
