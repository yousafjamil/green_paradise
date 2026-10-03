"use client";
import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/track";

// Cookie-free, privacy-friendly analytics (Plausible). Enabled only when
// NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set. Counts WhatsApp, call and email clicks.
const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";

export default function Analytics() {
  useEffect(() => {
    if (!domain) return;
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element).closest?.("a")?.getAttribute("href") ?? "";
      const event = href.includes("wa.me") ? "WhatsApp Click" : href.startsWith("tel:") ? "Call Click" : href.startsWith("mailto:") ? "Email Click" : null;
      if (event) track(event);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  if (!domain) return null;
  return <Script defer data-domain={domain} src={src} strategy="afterInteractive" />;
}
