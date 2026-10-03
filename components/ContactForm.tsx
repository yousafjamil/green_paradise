"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Dict } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/site";
import { track } from "@/lib/track";
import { btn } from "@/lib/ui";
import { Check, WhatsApp } from "./icons";

const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none transition focus:border-forest focus:ring-2 focus:ring-leaf/30";
type Status = "idle" | "sending" | "sent" | "fallback" | "error";

export default function ContactForm({ t, lang, services }: { t: Dict; lang: Locale; services: { slug: string; label: string }[] }) {
  const f = t.contact.form;
  const [status, setStatus] = useState<Status>("idle");
  const [service, setService] = useState("");
  const [waText, setWaText] = useState("");
  const live = useRef<HTMLDivElement>(null);

  // Preselect from ?service=<slug> without making the page dynamic.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.slug === slug);
    if (!match) return;
    const raf = requestAnimationFrame(() => setService(match.label));
    return () => cancelAnimationFrame(raf);
  }, [services]);

  useEffect(() => { if (status === "sent" || status === "fallback") live.current?.focus(); }, [status]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const data = { name: String(d.get("name") ?? ""), phone: String(d.get("phone") ?? ""), email: String(d.get("email") ?? ""), service: String(d.get("service") ?? ""), message: String(d.get("message") ?? ""), website: String(d.get("website") ?? ""), lang };
    setWaText([
      t.whatsappGreeting, "", `${f.name}: ${data.name}`, `${f.phone}: ${data.phone}`,
      data.email && `${f.email}: ${data.email}`, data.service && `${f.service}: ${data.service}`, data.message && `${f.message}: ${data.message}`,
    ].filter(Boolean).join("\n"));
    setStatus("sending");

    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
    if (res?.ok) { track("Inquiry Sent"); setStatus("sent"); }
    else if (res && (res.status === 400 || res.status === 429)) setStatus("error");
    else setStatus("fallback"); // email not configured or unreachable: hand over to WhatsApp (a tap, so pop-up blockers stay quiet)
  }

  if (status === "sent" || status === "fallback") {
    return (
      <div ref={live} tabIndex={-1} role="status" className="grid gap-5 rounded-2xl border border-line bg-white p-6 outline-none sm:p-8">
        {status === "sent" ? (
          <>
            <span className="flex size-12 items-center justify-center rounded-full bg-forest text-white"><Check /></span>
            <h3 className="text-2xl font-semibold">{f.sentTitle}</h3>
            <p className="text-ink-soft">{f.sentText}</p>
          </>
        ) : <p className="text-lg text-ink-soft">{f.fallbackText}</p>}
        <div className="flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl(waText)} target="_blank" rel="noopener noreferrer" className={btn.whatsapp}><WhatsApp />{f.continueWa}</a>
          {status === "sent" && <button type="button" onClick={() => setStatus("idle")} className={btn.outlineDark}>{f.another}</button>}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-line bg-white p-6 sm:p-8">
      {/* Honeypot: invisible to people, tempting to bots. */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">{f.name}
          <input name="name" required maxLength={100} autoComplete="name" className={field} />
        </label>
        <label className="grid gap-2 text-sm font-semibold">{f.phone}
          <input name="phone" type="tel" required maxLength={30} autoComplete="tel" inputMode="tel" dir="ltr" className={`${field} text-start`} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">{f.email} <span className="font-normal text-ink-soft">({f.optional})</span>
          <input name="email" type="email" maxLength={120} autoComplete="email" dir="ltr" className={`${field} text-start`} />
        </label>
        <label className="grid gap-2 text-sm font-semibold">{f.service}
          <select name="service" value={service} onChange={(e) => setService(e.target.value)} className={field}>
            <option value="">{f.select}</option>
            {services.map((s) => <option key={s.slug}>{s.label}</option>)}
            <option>{f.other}</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold">{f.message}
        <textarea name="message" rows={5} maxLength={2000} placeholder={f.placeholder} className={field} />
      </label>
      {status === "error" && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{f.errorText}</p>}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={status === "sending"} className={`${btn.primary} disabled:opacity-60`}>{status === "sending" ? f.sending : t.cta.send}</button>
        <p className="text-sm text-ink-soft">{f.note}</p>
      </div>
    </form>
  );
}
