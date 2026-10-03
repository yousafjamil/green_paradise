# Green Paradise – website

Next.js (App Router) · TypeScript · Tailwind CSS · English (LTR) + Arabic (RTL)

## Run

```bash
npm install
npm run dev          # http://localhost:3000  (redirects to /en or /ar)
npm run build && npm start   # production
```

Set the real domain before launch (used for canonical URLs, sitemap, Open Graph):

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.ae
```

## Where to change things

| What | File |
|---|---|
| Phone, WhatsApp, email, city | `lib/site.ts` |
| All page text (EN + AR) | `lib/dictionary.ts` |
| Services (text, photos) | `data/services.ts` |
| Projects (text, photos) | `data/projects.ts` |
| Video captions | `data/videos.ts` |
| Quick-help assistant questions/answers, FAQ | `lib/dictionary.ts` (`assistant.topics`, `faq.items`) |
| Colours | `app/globals.css` (`@theme`) |

## Media

Original photos/videos live in `../organized`. To rebuild the web versions
(resized, GPS/EXIF removed, videos compressed, duplicates skipped):

```bash
python3 scripts/build-media.py     # needs Pillow + ffmpeg
```

Output goes to `public/media` and `data/media.generated.json`.
Photos used in `data/projects.ts` appear in exactly one project.

## Quick-help assistant

The bottom-left "Quick help" panel answers a fixed set of common questions from
`lib/dictionary.ts` and sends anything else to WhatsApp. It is rules-based (no AI),
so it can only say what is written there. Edit or add topics in `assistant.topics`
(EN and AR).

## Contact form

"Send Inquiry" posts to `/api/contact`, which emails the company through Resend
(set `RESEND_API_KEY`, see `.env.example`). Without a key it falls back to a
prefilled WhatsApp message. Includes validation, a honeypot and a rate limit.

Optional: `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (analytics), `NEXT_PUBLIC_MAP_QUERY` (map pin).

## Open items (content needed from the client)

- Final domain, street address / Google Maps pin, working hours, social links
- Real project names and locations
- An "after" photo matching `before-bare-sandy-yard` to enable a Before/After slider
- Confirm Arabic copy with a native reader
- Replace the temporary email in `lib/site.ts`
