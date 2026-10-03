import { whatsappUrl } from "@/lib/site";
import { WhatsApp } from "./icons";

export default function WhatsAppFloat({ label, text }: { label: string; text: string }) {
  return (
    <a href={whatsappUrl(text)} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="fixed bottom-5 end-5 z-30 max-sm:hidden flex size-14 items-center justify-center rounded-full bg-[#25d366] text-[#06331a] shadow-lg shadow-black/20 transition hover:scale-105 hover:bg-[#1fbd5a] sm:bottom-6 sm:end-6">
      <WhatsApp width={28} height={28} />
    </a>
  );
}
