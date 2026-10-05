"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ lang, light = false, label }: { lang: Locale; light?: boolean; label: string }) {
  const pathname = usePathname() || `/${lang}`;
  const rest = pathname.split("/").slice(2).join("/");
  const href = (l: Locale) => `/${l}${rest ? `/${rest}` : ""}`;
  const item = (l: Locale, text: string, ar = false) => {
    const active = l === lang;
    return (
      <Link
        href={href(l)}
        hrefLang={l}
        lang={l}
        aria-current={active ? "true" : undefined}
        className={`px-2.5 py-1 text-[0.8rem] font-semibold transition-colors ${ar ? "font-[family-name:var(--font-cairo)]" : ""} ${
          active ? (light ? "text-white" : "text-forest") : light ? "text-white/70 hover:text-white" : "text-ink/70 hover:text-ink"
        }`}
      >
        {text}
      </Link>
    );
  };
  return (
    <div role="group" aria-label={label} dir="ltr" className={`flex items-center rounded-full border px-1 ${light ? "border-white/25" : "border-line"}`}>
      {item("en", "English")}
      <span aria-hidden className={`h-3 w-px ${light ? "bg-white/25" : "bg-line"}`} />
      {item("ar", "العربية", true)}
    </div>
  );
}
