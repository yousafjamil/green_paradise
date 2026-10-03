import type { L } from "@/lib/i18n";

export type Service = {
  slug: string;
  image?: string; // photo id, optional
  icon: "design" | "lawn" | "plants" | "care" | "water" | "building";
  gallery: string[]; // photo ids
  en: { title: string; summary: string; intro: string; points: string[] };
  ar: { title: string; summary: string; intro: string; points: string[] };
};

export const services: Service[] = [
  {
    slug: "landscape-design",
    image: "lawn-villa-trees",
    icon: "design",
    gallery: ["olive-tree-villa-garden", "flower-beds-villa-entrance", "turf-patio-bougainvillea-pot", "lawn-villa-trees"],
    en: {
      title: "Landscape Design & Gardening",
      summary: "Complete garden layouts for villas and outdoor spaces, from planting beds to paths and focal trees.",
      intro: "We plan and build gardens that suit the space and the way you use it: lawn areas, planting beds, stepping stones, a feature tree and the right plants around them.",
      points: ["Garden layout and planting plans", "Planting beds, borders and feature trees", "Stepping stones and garden paths", "Plant selection for villa gardens in Abu Dhabi"],
    },
    ar: {
      title: "تصميم وتنسيق الحدائق",
      summary: "تصاميم حدائق متكاملة للفلل والمساحات الخارجية، من أحواض الزراعة والممرات إلى الأشجار الرئيسية.",
      intro: "نخطط وننفذ حدائق تناسب المساحة وطريقة استخدامك لها: مسطحات خضراء، أحواض زراعة، ممرات حجرية، شجرة مميزة، والنباتات المناسبة حولها.",
      points: ["تخطيط الحديقة وخطط الزراعة", "أحواض وأطراف زراعية وأشجار رئيسية", "ممرات حجرية وممشى للحديقة", "اختيار النباتات المناسبة لحدائق الفلل في أبوظبي"],
    },
  },
  {
    slug: "lawns-and-turf",
    image: "fresh-lawn-hedge",
    icon: "lawn",
    gallery: ["lawn-paving-hedge", "turf-installation-villa", "turf-terrace-planters", "villa-lawn-corner", "garden-lawn-play-area"],
    en: {
      title: "Natural Grass & Artificial Turf",
      summary: "Fresh natural lawns and clean artificial turf, installed neatly with edging and drainage in mind.",
      intro: "Whether you want a living lawn or low-maintenance artificial turf, we prepare the ground, lay the surface and finish the edges so it looks sharp from day one.",
      points: ["Natural grass lawn installation", "Artificial turf for gardens, terraces and play areas", "Ground levelling and preparation", "Neat edging along paths, hedges and beds"],
    },
    ar: {
      title: "عشب طبيعي وعشب صناعي",
      summary: "مسطحات خضراء طبيعية وعشب صناعي مرتب، يُركَّب بعناية مع الاهتمام بالحواف والتصريف.",
      intro: "سواء أردت مسطحاً أخضر حياً أو عشباً صناعياً قليل الصيانة، نجهّز الأرض ونفرش السطح ونُنهي الحواف ليبدو المكان مرتباً منذ اليوم الأول.",
      points: ["تركيب العشب الطبيعي", "عشب صناعي للحدائق والتراسات وأماكن اللعب", "تسوية الأرض وتجهيزها", "حواف مرتبة بمحاذاة الممرات والأسيجة والأحواض"],
    },
  },
  {
    slug: "plants-trees-flowers",
    image: "bougainvillea-tower",
    icon: "plants",
    gallery: ["bougainvillea-tower", "bougainvillea-nursery-rows", "ficus-bonsai-shaped", "topiary-balls", "areca-palms-ixora", "bougainvillea-red-pot"],
    en: {
      title: "Plants, Trees & Flowers",
      summary: "A wide choice of bougainvillea, ficus, palms, topiary and seasonal flowers for gardens and entrances.",
      intro: "From colourful bougainvillea and shaped ficus to palms, hedging plants and seasonal flower beds, we supply and plant what your garden needs.",
      points: ["Bougainvillea in many colours", "Shaped ficus, topiary and hedging plants", "Palms and potted plants for entrances", "Seasonal flowers for beds and borders"],
    },
    ar: {
      title: "نباتات وأشجار وزهور",
      summary: "تشكيلة واسعة من الجهنمية والفيكس والنخيل والتشكيل الهندسي والزهور الموسمية للحدائق والمداخل.",
      intro: "من الجهنمية الملوّنة والفيكس المشكّل إلى النخيل ونباتات الأسيجة وأحواض الزهور الموسمية، نوفّر وننسّق ما تحتاجه حديقتك.",
      points: ["جهنمية بألوان متعددة", "فيكس مشكّل وتشكيلات هندسية ونباتات أسيجة", "نخيل ونباتات أصص للمداخل", "زهور موسمية للأحواض والأطراف"],
    },
  },
  {
    slug: "garden-maintenance",
    image: "lawn-mower-maintenance",
    icon: "care",
    gallery: ["lawn-mower-maintenance", "villa-lawn-mowing", "lawn-garden-edge", "orange-ixora-hedge", "petunia-bed-walkway"],
    en: {
      title: "Garden Maintenance",
      summary: "Regular care that keeps lawns, hedges, beds and plants healthy and tidy all year.",
      intro: "A good garden stays good with regular attention. We look after lawns, hedges, flower beds and potted plants so your outdoor space always looks cared for.",
      points: ["Lawn mowing and edging", "Hedge and plant trimming", "Flower bed refresh and replanting", "Watering and plant health checks"],
    },
    ar: {
      title: "صيانة الحدائق",
      summary: "عناية منتظمة تحافظ على المسطحات والأسيجة والأحواض والنباتات بصحة جيدة ومظهر مرتب طوال العام.",
      intro: "الحديقة الجميلة تحتاج إلى عناية مستمرة. نعتني بالمسطحات والأسيجة وأحواض الزهور والنباتات المزروعة في الأصص لتبقى مساحتك الخارجية في أفضل حال.",
      points: ["قص العشب وتحديد الحواف", "تقليم الأسيجة والنباتات", "تجديد أحواض الزهور وإعادة الزراعة", "الري وفحص صحة النباتات"],
    },
  },
  {
    slug: "irrigation",
    image: "lawn-sprinkler-hedge",
    icon: "water",
    gallery: ["sea-view-lawn-sprinklers", "lawn-sprinkler-hedge", "lawn-irrigation-line"],
    en: {
      title: "Irrigation Systems",
      summary: "Sprinkler and drip irrigation so lawns and plants get the water they need.",
      intro: "Good irrigation is what keeps a garden green in the UAE climate. We set up sprinklers and drip lines for lawns, beds and plants.",
      points: ["Pop-up sprinklers for lawns", "Drip lines for beds and plants", "Irrigation layout planned with the garden"],
    },
    ar: {
      title: "أنظمة الري",
      summary: "ري بالرشاشات والتنقيط ليحصل المسطح الأخضر والنباتات على ما تحتاجه من الماء.",
      intro: "الري الجيد هو ما يبقي الحديقة خضراء في مناخ الإمارات. نركّب الرشاشات وخطوط التنقيط للمسطحات والأحواض والنباتات.",
      points: ["رشاشات منبثقة للمسطحات الخضراء", "خطوط تنقيط للأحواض والنباتات", "تخطيط الري بالتوافق مع تصميم الحديقة"],
    },
  },
  {
    slug: "building-maintenance",
    icon: "building",
    gallery: [],
    en: {
      title: "Building Maintenance",
      summary: "Building maintenance services, licensed under our Abu Dhabi trade licence.",
      intro: "Alongside gardens, we are licensed for building maintenance. Contact us with your requirement and we will tell you how we can help.",
      points: ["Licensed activity: Buildings Maintenance", "Tell us what you need and we will advise"],
    },
    ar: {
      title: "صيانة المباني",
      summary: "خدمات صيانة المباني، ضمن رخصتنا التجارية في أبوظبي.",
      intro: "إلى جانب الحدائق، نحن مرخّصون لأعمال صيانة المباني. تواصل معنا بما تحتاجه وسنوضّح لك كيف يمكننا المساعدة.",
      points: ["نشاط مرخّص: صيانة المباني", "أخبرنا بما تحتاجه وسنرشدك"],
    },
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export type { L };
