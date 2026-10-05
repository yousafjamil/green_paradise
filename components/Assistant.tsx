"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { telUrl, whatsappUrl } from "@/lib/site";
import { track } from "@/lib/track";
import { LogoMark } from "./Logo";
import { Close, Phone, WhatsApp } from "./icons";

type Action = "whatsapp" | "call" | "quote" | "services" | "projects" | "gallery";
type Msg = { id: number; from: "bot" | "user"; text: string; actions?: Action[] };

const ease = [0.2, 0.7, 0.2, 1] as const;
const chip = "shrink-0 rounded-full border border-forest/25 bg-white px-3.5 py-2 text-sm font-medium text-forest transition-colors hover:bg-forest hover:text-white";
const act = "inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-forest-deep";

/**
 * Quick-help panel. It answers a fixed set of common questions from approved
 * content (no AI, nothing invented) and hands everything else to WhatsApp.
 */
export default function Assistant({ lang, t, serviceTitles }: { lang: Locale; t: Dict; serviceTitles: string[] }) {
  const a = t.assistant;
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ id: 0, from: "bot", text: a.greeting }]);
  const [typing, setTyping] = useState(false);
  // On phones the launcher waits until the visitor scrolls, so it never covers the hero buttons.
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 320));
  const [ask, setAsk] = useState("");
  const nextId = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  useEffect(() => { bottom.current?.scrollIntoView({ block: "end", behavior: "smooth" }); }, [msgs, typing, open]);
  // A link ending in #chat opens the panel straight away (handy for sharing and demos).
  useEffect(() => {
    if (window.location.hash !== "#chat") return;
    const raf = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const wasOpen = useRef(false);
  // Move focus into the panel on open, and back to the launcher once it has re-appeared on close.
  useEffect(() => {
    if (open) { wasOpen.current = true; return; }
    if (!wasOpen.current) return;
    wasOpen.current = false;
    const raf = requestAnimationFrame(() => launcher.current?.focus());
    return () => cancelAnimationFrame(raf);
  }, [open]);
  useEffect(() => {
    if (!open) return;
    closeBtn.current?.focus();
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const sep = lang === "ar" ? "، " : ", ";
  function pick(id: string) {
    const topic = a.topics.find((x) => x.id === id);
    if (!topic || typing) return;
    track("Assistant Topic", { topic: id });
    setMsgs((m) => [...m, { id: nextId.current++, from: "user", text: topic.label }]);
    setTyping(true);
    timer.current = setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: nextId.current++, from: "bot", text: topic.answer.replace("{list}", serviceTitles.join(sep)), actions: topic.actions as Action[] }]);
    }, 650);
  }

  function send(e: FormEvent) {
    e.preventDefault();
    const q = ask.trim();
    if (!q) return;
    track("Assistant WhatsApp");
    window.open(whatsappUrl(`${t.whatsappGreeting}\n\n${q}`), "_blank", "noopener,noreferrer");
    setAsk("");
  }

  const toggle = (v: boolean) => { setOpen(v); if (v) track("Assistant Open"); };

  const actionEl = (x: Action) => {
    if (x === "whatsapp") return <a key={x} href={whatsappUrl(t.whatsappGreeting)} target="_blank" rel="noopener noreferrer" className={`${act} !bg-[#25d366] !text-[#06331a] hover:!bg-[#1fbd5a]`}><WhatsApp width={16} height={16} />{t.cta.whatsapp}</a>;
    if (x === "call") return <a key={x} href={telUrl} className={act}><Phone width={16} height={16} />{t.cta.call}</a>;
    const map = { quote: ["/contact", t.cta.request], services: ["/services", t.nav.services], projects: ["/projects", t.nav.projects], gallery: ["/gallery", t.nav.gallery] } as const;
    const [href, label] = map[x];
    return <Link key={x} href={`/${lang}${href}`} onClick={() => setOpen(false)} className={act}>{label}</Link>;
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button ref={launcher} type="button" onClick={() => toggle(true)} aria-label={a.open} aria-haspopup="dialog"
            initial={{ opacity: 0, scale: 0.8, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} transition={{ delay: 0.6 }}
            className={`fixed bottom-[5.75rem] start-4 z-30 ${scrolled ? "" : "max-sm:hidden"} flex h-12 sm:bottom-6 sm:start-6 sm:h-14 items-center gap-2.5 rounded-full bg-forest-deep px-4 text-white shadow-lg shadow-black/25 ring-1 ring-white/10 sm:bottom-6 sm:start-6 sm:pe-5`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.8A8 8 0 1 1 21 12z" /><path d="M8.5 11.5h7M8.5 14.5h4" /></svg>
            <span className="hidden text-sm font-semibold sm:inline">{a.launcher}</span>
            <span aria-hidden className="absolute -top-0.5 -end-0.5 size-3.5 rounded-full border-2 border-cream bg-gold" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-label={a.title} initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }} transition={{ duration: 0.3, ease }}
            className="fixed inset-x-3 bottom-3 z-40 flex max-h-[min(40rem,calc(100svh-1.5rem))] flex-col overflow-hidden rounded-3xl border border-line bg-cream shadow-2xl shadow-black/30 sm:inset-x-auto sm:bottom-6 sm:start-6 sm:w-[380px]">
            <header className="flex items-center gap-3 bg-forest-deep bg-pattern px-5 py-4 text-white">
              <LogoMark light className="size-10 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{a.title}</p>
                <p className="truncate text-xs text-white/70">{a.subtitle}</p>
              </div>
              <button ref={closeBtn} type="button" onClick={() => setOpen(false)} aria-label={a.close} className="flex size-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"><Close width={18} height={18} /></button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {msgs.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-[0.95rem] leading-relaxed ${m.from === "user" ? "rounded-ee-md bg-forest text-white" : "rounded-es-md border border-line bg-white text-ink"}`}>
                    <p>{m.text}</p>
                    {m.actions && <div className="mt-3 flex flex-wrap gap-2">{m.actions.map(actionEl)}</div>}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex justify-start" role="status" aria-label={a.typing}>
                  <div className="flex items-center gap-1.5 rounded-2xl rounded-es-md border border-line bg-white px-4 py-3.5">
                    {[0, 1, 2].map((i) => <motion.span key={i} className="size-2 rounded-full bg-forest/60" animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />)}
                  </div>
                </div>
              )}
              <div ref={bottom} />
            </div>

            <div className="border-t border-line bg-sand/50 px-4 pt-3">
              <p className="mb-2 text-xs font-bold tracking-wider text-ink-soft uppercase">{a.topicsLabel}</p>
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-3">
                {a.topics.map((x) => <button key={x.id} type="button" disabled={typing} onClick={() => pick(x.id)} className={`${chip} disabled:opacity-50`}>{x.label}</button>)}
              </div>
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-line bg-white p-3">
              <input value={ask} onChange={(e) => setAsk(e.target.value)} maxLength={500} aria-label={a.askLabel} placeholder={a.askPlaceholder} className="min-w-0 flex-1 rounded-full border border-line bg-cream px-4 py-2.5 text-sm outline-none focus:border-forest focus:ring-2 focus:ring-leaf/30" />
              <button type="submit" disabled={!ask.trim()} aria-label={a.askSend} className="flex shrink-0 items-center gap-2 rounded-full bg-[#25d366] px-4 text-sm font-semibold text-[#06331a] transition hover:bg-[#1fbd5a] disabled:opacity-50"><WhatsApp width={18} height={18} /><span className="hidden sm:inline">{a.askSend}</span></button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
