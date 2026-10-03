import type { SVGProps } from "react";
type P = SVGProps<SVGSVGElement>;
const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const Phone = (p: P) => <svg {...base} {...p}><path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>;
export const Mail = (p: P) => <svg {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
export const Pin = (p: P) => <svg {...base} {...p}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>;
export const Arrow = (p: P) => <svg {...base} {...p} className={`rtl:-scale-x-100 ${p.className ?? ""}`}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>;
export const Menu = (p: P) => <svg {...base} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
export const Close = (p: P) => <svg {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>;
export const Check = (p: P) => <svg {...base} {...p}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>;
export const Play = (p: P) => <svg {...base} fill="currentColor" stroke="none" {...p}><path d="M8 5.5v13l11-6.5z" /></svg>;
export const Chevron = (p: P) => <svg {...base} {...p} className={`rtl:-scale-x-100 ${p.className ?? ""}`}><path d="m9 6 6 6-6 6" /></svg>;
export const WhatsApp = (p: P) => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden {...p}>
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.2 15l-.3-.18-3.1.9.9-3-.2-.32A8.1 8.1 0 0 1 12.04 3.8zm-3 3.9c-.2 0-.5.07-.75.35-.25.27-1 1-1 2.4s1 2.8 1.15 3c.15.2 2 3.2 4.9 4.35 2.4.95 2.9.76 3.4.7.55-.05 1.7-.7 1.95-1.4.23-.68.23-1.27.16-1.4-.07-.12-.27-.2-.57-.35-.3-.15-1.7-.85-1.97-.95-.27-.1-.47-.15-.67.15-.2.3-.77.95-.94 1.15-.18.2-.35.22-.65.07-.3-.15-1.25-.46-2.4-1.47-.9-.8-1.5-1.77-1.67-2.07-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.52-.08-.15-.67-1.65-.92-2.25-.24-.58-.5-.5-.67-.5z" />
  </svg>
);
export const ServiceIcon = ({ name, ...p }: { name: "design" | "lawn" | "plants" | "care" | "water" | "building" } & P) => {
  const d: Record<string, string> = {
    design: "M4 20V10a8 8 0 0 1 16 0v10M12 20v-8m0 3c-3 0-4-2-4-4 2.5 0 4 1.5 4 4zm0-2c3 0 4-2 4-4-2.5 0-4 1.5-4 4z",
    lawn: "M3 20h18M6 20c0-4 1-8 2-10 1 3 2 6 2 10m2 0c0-5 1-9 3-12 1 4 2 8 2 12",
    plants: "M12 21v-9m0 0c0-4 3-6 7-6 0 4-3 6-7 6zm0 3c0-3-2-5-6-5 0 3 2 5 6 5z",
    care: "M4 20h16M7 20V9l5-5 5 5v11M10 20v-5h4v5",
    water: "M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.2 12 3 12 3z",
    building: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18",
  };
  return <svg {...base} {...p}><path d={d[name]} /></svg>;
};
