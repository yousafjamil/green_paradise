// Single source of truth for company details. Change here, updates everywhere.
export const site = {
  name: "Green Paradise",
  legalName: "Green Paradise Landscape Maintenance L.L.C.",
  // Set NEXT_PUBLIC_SITE_URL in production. The domain is not confirmed yet.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://greenparadise.ae").replace(/\/$/, ""),
  phone: "+971547854908",
  phoneDisplay: "+971 54 785 4908",
  whatsapp: "971547854908",
  email: "mustaqimkhan.mkd367@gmail.com", // temporary, taken from the trade licence
  city: "Abu Dhabi",
  country: "AE",
} as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
export const telUrl = `tel:${site.phone}`;
export const mailUrl = `mailto:${site.email}`;
