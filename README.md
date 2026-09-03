# The Queen's Head, Littlebury — website

A 13-page Next.js website for The Queen's Head Inn, built by Savv8 Limited to the
agreed brand (black · deep red · gold · cream, Fraunces + Work Sans).

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in the Resend values when you have them
npm run dev                    # http://localhost:3000
```

`npm run build` must pass before deploying. `npm run lint` checks code style.

## What's where

| You want to change… | Edit this file |
| --- | --- |
| Phone, email, address, opening hours, socials, WhatsApp number, Google links, reviews, **the video** | `src/data/site.ts` |
| Menu items, prices, dietary tags, allergens | `src/data/menu.ts` |
| The six rooms (names, descriptions, rates, features) | `src/data/rooms.ts` |
| Events calendar and weekly regulars | `src/data/events.ts` |
| FAQ questions and answers | `src/data/faq.ts` |
| Private dining spaces, capacities, set menus | `src/data/spaces.ts` |
| Job vacancies and perks | `src/data/careers.ts` |
| Local attractions and walking routes | `src/data/local.ts` |
| Which photos appear in the gallery | `src/data/gallery.ts` |
| **Every photo on the site** (swap-out list) | `src/data/images.ts` |
| Blog posts | `content/blog/*.md` — one Markdown file per post |
| Navigation links | `src/data/nav.ts` |
| Colours, fonts, buttons, form styles | `src/app/globals.css` |
| Page layouts and copy | `src/app/<page>/page.tsx` |

Anything marked `TODO` in `src/data/site.ts` is a stand-in waiting on the client.

## Replacing the stand-in photography

All photos are currently royalty-free Unsplash images referenced in
`src/data/images.ts`. When the pub's photography arrives:

1. Drop the files into `public/images/` (JPG, ideally ≤ 2000px wide, ~200–400 KB).
2. In `src/data/images.ts` change the matching `src` to `"/images/your-file.jpg"`
   and update the `alt` text to describe the real photo.
3. Once no Unsplash images remain, delete the `remotePatterns` block in
   `next.config.ts`.

Set `NEXT_PUBLIC_IMAGE_SOURCE=local` in `.env.local` to see plain colour
placeholders instead (handy offline or to check layout).

## Adding the video

There are two places for video, both set in `src/data/site.ts`:

**1. Hero background (`heroVideo`)** — a silent, looping clip behind the home
page headline. Use a short cut (10–30 s) compressed to under ~5 MB as a
1280×720 H.264 MP4, e.g.
`ffmpeg -i film.mp4 -an -t 25 -vf scale=1280:-2 -crf 28 -movflags +faststart public/video/hero.mp4`.
Set `heroVideo.src: "/video/hero.mp4"`. The poster photo shows first and for
anyone with reduced motion or data-saver on. Only MP4 works here — browsers
won't autoplay YouTube silently as a background.

**2. The full film (`video`)** — the "Our story on film" section with sound:

- **MP4 file**: put it at `public/video/story.mp4` (keep it under ~20 MB; H.264,
  1080p is plenty) and set `type: "mp4", src: "/video/story.mp4"`.
- **YouTube**: `type: "youtube", src: "<video id>"` (the bit after `v=`).
- **Vimeo**: `type: "vimeo", src: "<video id>"`.

The poster image shown before play is `video.poster` (a key from `images.ts`).
Until `src` is set the section shows the poster with "coming soon".

## Forms and email (Resend)

All six enquiry forms (table, rooms, private dining, gift cards, careers,
contact) post to `/api/enquiry`. The newsletter posts to `/api/newsletter`.

- Each enquiry emails the pub (`ENQUIRY_TO_EMAIL`) with reply-to set to the
  customer, and sends the customer a branded acknowledgement.
- Spam protection: a hidden honeypot field plus server-side validation (Zod).
- **Without `RESEND_API_KEY` the site runs in demo mode** — visitors see the
  success message, the submission is logged to the server console, nothing is
  emailed. Good for the client review; switch on before go-live.

To go live: create a Resend account, verify the pub's domain (add the DNS records
Resend gives you), create an API key, and set the four variables in Vercel. For
the newsletter, create an Audience in Resend and set `RESEND_AUDIENCE_ID`.

Field definitions and email subject lines live in `src/lib/enquiries.ts`; the
email templates in `src/lib/email.ts`.

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub is simplest).
2. In Vercel: **Add New Project → Import** the repo. Framework is auto-detected.
3. Add the environment variables from `.env.example`.
4. Deploy. Then **Settings → Domains** to attach the pub's domain and follow
   the DNS instructions.

Home and Events pages re-render once a day so past events drop off
automatically. Everything else is static and very fast.

## Before launch checklist

- [ ] Replace every `TODO` in `src/data/site.ts` (phone, email, WhatsApp, socials, Google Business links, domain)
- [ ] Confirm the postcode/address and check the map pin
- [ ] Final menu, allergens and prices from the client
- [ ] Real room names, descriptions and rates
- [ ] Private dining capacities and set-menu prices
- [ ] Replace stand-in photos; add the video
- [ ] Real reviews (or remove the sample ones) and live Google rating
- [ ] Vacancies — or set `vacancies = []` in `careers.ts`
- [ ] Client to review `privacy` and `accessibility` pages
- [ ] Resend domain verified, env vars set, send a test enquiry
- [ ] Add a favicon (`src/app/favicon.ico`) from the client's logo
- [ ] Submit `https://<domain>/sitemap.xml` in Google Search Console

## Animation

Motion is handled with plain CSS plus one tiny component (`src/components/RevealOnScroll.tsx`),
no animation library:

- `reveal` — a block fades and rises in when scrolled into view
- `reveal-stagger` — children of a grid/list land one after another
- `hero-in` — hero text enters in sequence on page load; `hero-photo` gives the hero image a slow zoom
- `lift` — cards rise slightly on hover
- gold underlines draw themselves in; the header gains a shadow once scrolled

Add `reveal` or `reveal-stagger` to any element to animate it. Everything is
automatically disabled for visitors who have "reduce motion" switched on.

## Built with

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · Resend · Zod ·
react-markdown + gray-matter for the blog. Fonts are self-hosted in `src/fonts`.

Structured data (schema.org Restaurant / BarOrPub / LodgingBusiness, FAQPage,
BlogPosting), a sitemap, robots.txt and a generated Open Graph share image are
all included. Accessibility: skip link, visible focus rings, alt text on every
image, keyboard-operable menu tabs, accordion, gallery lightbox and mobile menu.
