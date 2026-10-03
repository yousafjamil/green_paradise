import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, hasLocale } from "@/lib/i18n";

// Send "/" and any non-localised path to /en or /ar, based on the browser language.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (hasLocale(first)) return;

  const preferred = request.headers.get("accept-language")?.toLowerCase().startsWith("ar")
    ? "ar"
    : defaultLocale;
  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|media|favicon|icon|apple-icon|robots.txt|sitemap.xml|.*\\..*).*)"],
};
