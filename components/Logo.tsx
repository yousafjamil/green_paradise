import type { Locale } from "@/lib/i18n";

export function LogoMark({ light = false, className = "size-10" }: { light?: boolean; className?: string }) {
  const bg = light ? "#fff" : "#0a3d28";
  const fg = light ? "#0a3d28" : "#fff";
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden>
      <rect width="100" height="100" rx="26" fill={bg} />
      <path d="M27 80V47a23 23 0 0 1 46 0v33z" fill={fg} />
      <path d="M50 80V45" stroke="#4caf87" strokeWidth="4" strokeLinecap="round" />
      <path d="M50 68c-10 0-15-7-15-14 8 0 15 5 15 14z" fill="#4caf87" />
      <path d="M50 57c10 0 15-7 15-14-8 0-15 5-15 14z" fill="#4caf87" />
    </svg>
  );
}

/** Mark + live-text wordmark (sharp at any size, correct Arabic in RTL). */
export default function Logo({ lang, light = false, showSub = true }: { lang: Locale; light?: boolean; showSub?: boolean }) {
  const ar = lang === "ar";
  return (
    <span className="flex items-center gap-3" aria-label="Green Paradise">
      <LogoMark light={light} className="size-10 shrink-0 sm:size-11" />
      <span className="flex flex-col leading-none">
        <span className={`text-[1.05rem] font-extrabold tracking-[0.06em] sm:text-[1.2rem] ${light ? "text-white" : "text-ink"} ${ar ? "tracking-normal" : ""}`}>
          {ar ? (<>جرين <span className={`font-medium ${light ? "text-gold" : "text-forest"}`}>برادايس</span></>) : (<>GREEN <span className={`font-medium ${light ? "text-gold" : "text-forest"}`}>PARADISE</span></>)}
        </span>
        {showSub && (
          <span className={`mt-1.5 hidden text-[0.6rem] font-semibold sm:block ${ar ? "tracking-normal text-[0.7rem]" : "tracking-[0.3em]"} ${light ? "text-[#cfe5c4]" : "text-forest/80"}`}>
            {ar ? "تنسيق وصيانة الحدائق" : "LANDSCAPE MAINTENANCE"}
          </span>
        )}
      </span>
    </span>
  );
}
