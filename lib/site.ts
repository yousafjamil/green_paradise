// Single source of truth for company details. Change here, updates everywhere.
export const site = {
  name: "Green Paradise",
  legalName: "Green Paradise Landscape Maintenance L.L.C.",
  // Set NEXT_PUBLIC_SITE_URL in production. The domain is not confirmed yet.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://greenparadise.ae").replace(/\/$/, ""),
  phone: "+971547854908",
  phoneDisplay: "+971 54 785 4908",
  whatsapp: "971547854908",
  email: "aqibjaveed46356@gmail.com", // contact email shown on the site and used for form delivery
  city: "Abu Dhabi",
  country: "AE",
  // Set NEXT_PUBLIC_MAP_QUERY to the exact address (or "lat,lng") once confirmed; until then the map shows the city.
  mapQuery: process.env.NEXT_PUBLIC_MAP_QUERY ?? "Abu Dhabi, United Arab Emirates",
  mapZoom: process.env.NEXT_PUBLIC_MAP_QUERY ? 16 : 11,
  // Home hero style: "slider" = full-width photos that change by themselves, "arches" = 3D arch photo stack.
  heroStyle: "slider" as "slider" | "arches",
} as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const telUrl = `tel:${site.phone}`;
export const mailUrl = `mailto:${site.email}`;
