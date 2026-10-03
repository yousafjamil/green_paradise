import { NextResponse } from "next/server";
import { site } from "@/lib/site";

// Sends the inquiry to the company inbox through Resend (https://resend.com).
// Without RESEND_API_KEY it answers 503 and the form falls back to WhatsApp.

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // best-effort per instance; use a shared store if you scale out

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, max) : "");
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");
const json = (error: string, status: number) => NextResponse.json({ error }, { status });

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return json("rate_limited", 429);
  hits.set(ip, [...recent, now]);

  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return json("bad_request", 400); }

  if (clip(body.website, 100)) return NextResponse.json({ ok: true }); // honeypot: bots see success

  const name = clip(body.name, 100);
  const phone = clip(body.phone, 30);
  const email = clip(body.email, 120);
  const service = clip(body.service, 120);
  const message = clip(body.message, 2000);
  const lang = body.lang === "ar" ? "ar" : "en";

  if (!name || phone.replace(/\D/g, "").length < 7) return json("invalid", 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return json("invalid", 400);

  const key = process.env.RESEND_API_KEY;
  if (!key) return json("not_configured", 503);

  const text = [`New website inquiry (${lang === "ar" ? "Arabic" : "English"} site)`, "", `Name: ${name}`, `Phone: ${phone}`, email && `Email: ${email}`, service && `Service: ${service}`, message && `\nMessage:\n${message}`]
    .filter(Boolean).join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? `${site.name} <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO_EMAIL ?? site.email],
      subject: oneLine(`New inquiry from ${name}`),
      text,
      ...(email ? { reply_to: email } : {}),
    }),
  }).catch(() => null);

  if (!res?.ok) return json("send_failed", 502);
  return NextResponse.json({ ok: true });
}
