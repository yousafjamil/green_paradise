import { socialLinks } from "@/lib/site";
import { Facebook, Instagram, TikTok, YouTube } from "./icons";

const icons: Record<string, { label: string; Icon: typeof Instagram }> = {
  instagram: { label: "Instagram", Icon: Instagram }, facebook: { label: "Facebook", Icon: Facebook }, tiktok: { label: "TikTok", Icon: TikTok }, youtube: { label: "YouTube", Icon: YouTube },
};

/** Renders nothing until the client adds real account URLs in lib/site.ts. */
export default function SocialLinks({ className = "" }: { className?: string }) {
  const links = socialLinks.filter(([k]) => icons[k]);
  if (!links.length) return null;
  return (
    <ul className={`flex gap-3 ${className}`}>
      {links.map(([k, url]) => { const { label, Icon } = icons[k]; return (
        <li key={k}><a href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-gold hover:text-ink"><Icon /></a></li>
      ); })}
    </ul>
  );
}
