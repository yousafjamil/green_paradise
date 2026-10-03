"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { Dict } from "@/lib/dictionary";
import { whatsappUrl } from "@/lib/site";
import { btn } from "@/lib/ui";
import { WhatsApp } from "./icons";

const field = "w-full rounded-xl border border-line bg-white px-4 py-3 text-base outline-none transition focus:border-forest focus:ring-2 focus:ring-leaf/30";

export default function ContactForm({ t, services }: { t: Dict; services: { slug: string; label: string }[] }) {
  const f = t.contact.form;
  const [sent, setSent] = useState(false);
  const [service, setService] = useState("");

  // Preselect from ?service=<slug> without making the page dynamic.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("service");
    const match = services.find((s) => s.slug === slug);
    if (!match) return;
    const raf = requestAnimationFrame(() => setService(match.label));
    return () => cancelAnimationFrame(raf);
  }, [services]);

  // No server needed: the inquiry is sent as a WhatsApp message to the company number.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      t.whatsappGreeting, "",
      `${f.name}: ${d.get("name")}`,
      `${f.phone}: ${d.get("phone")}`,
      d.get("email") ? `${f.email}: ${d.get("email")}` : "",
      d.get("service") ? `${f.service}: ${d.get("service")}` : "",
      d.get("message") ? `${f.message}: ${d.get("message")}` : "",
    ].filter((l) => l !== "");
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-2xl border border-line bg-white p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">{f.name}
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-2 text-sm font-semibold">{f.phone}
          <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" dir="ltr" className={`${field} text-start`} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">{f.email} <span className="font-normal text-ink-soft">({f.optional})</span>
          <input name="email" type="email" autoComplete="email" dir="ltr" className={`${field} text-start`} />
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
        <textarea name="message" rows={5} placeholder={f.placeholder} className={field} />
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className={btn.primary}><WhatsApp />{t.cta.send}</button>
        <p className="text-sm text-ink-soft" role="status">{f.note}</p>
      </div>
      {sent && <p className="sr-only" role="status">WhatsApp opened</p>}
    </form>
  );
}
