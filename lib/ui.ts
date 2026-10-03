const sheen = "relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:start-[-60%] before:w-1/3 before:skew-x-[-20deg] before:bg-white/25 before:transition-transform before:duration-700 hover:before:translate-x-[420%] rtl:hover:before:-translate-x-[420%]";
const base = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-all duration-200 focus-visible:outline-offset-4";
export const btn = {
  primary: `${base} ${sheen} bg-forest text-white hover:bg-forest-deep hover:shadow-lg hover:shadow-forest/20`,
  light: `${base} ${sheen} bg-white text-forest-deep hover:bg-cream`,
  outline: `${base} border border-white/60 text-white hover:bg-white hover:text-forest-deep`,
  outlineDark: `${base} border border-forest/30 text-forest hover:bg-forest hover:text-white`,
  whatsapp: `${base} ${sheen} bg-[#25d366] text-[#06331a] hover:bg-[#1fbd5a]`,
};
export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";
