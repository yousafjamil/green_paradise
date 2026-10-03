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
| Colours | `app/globals.css` (`@theme`) |

## Media

Original photos/videos live in `../organized`. To rebuild the web versions
(resized, GPS/EXIF removed, videos compressed, duplicates skipped):

```bash
python3 scripts/build-media.py     # needs Pillow + ffmpeg
```

Output goes to `public/media` and `data/media.generated.json`.
Photos used in `data/projects.ts` appear in exactly one project.

## Contact form

"Send Inquiry" opens WhatsApp with the message pre-filled to the company
number. No server or email service is required. To also receive email, add a
route handler with a provider such as Resend or SMTP.

## Open items (content needed from the client)

- Final domain, street address / Google Maps pin, working hours, social links
- Real project names and locations
- An "after" photo matching `before-bare-sandy-yard` to enable a Before/After slider
- Confirm Arabic copy with a native reader
- Replace the temporary email in `lib/site.ts`
