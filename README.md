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
| Which photos appear in the gallery | Instagram, via `BEHOLD_FEED_URL` (see below); `src/data/gallery.ts` is the fallback |
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

## Gallery from Instagram

The gallery page shows the pub's latest Instagram posts through
[Behold](https://behold.so), which keeps the Instagram connection alive so
nobody has to renew tokens.

1. The pub signs up at behold.so (free plan is fine) and connects the
   Instagram account.
2. **New feed → JSON feed**, then copy the feed URL (`https://feeds.behold.so/…`).
3. Set `BEHOLD_FEED_URL` in Vercel and redeploy.

New posts appear within the hour. Until the feed is set — or if Behold is
ever unreachable — the gallery quietly falls back to the photos in
`src/data/gallery.ts`. Code: `src/lib/instagram.ts`.

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
- The customer's acknowledgement deliberately repeats nothing they typed except
  their first name, so the form can't be used to send spam from the pub's domain.
- Spam protection (`src/lib/guard.ts`): a hidden honeypot field, server-side
  validation (Zod, unknown fields rejected), Cloudflare Turnstile, and a limit
  of 5 submissions per visitor per 10 minutes. That limit is kept in memory per
  server instance, so for a hard cap also add a rate-limit rule in
  **Vercel → Firewall** for `/api/enquiry` and `/api/newsletter`.
- **Without `RESEND_API_KEY` the site runs in demo mode** — visitors see the
  success message, the submission is logged to the server console, nothing is
  emailed. Good for local work and Vercel Preview deployments.
- **Demo mode never runs on the live site.** On Vercel Production (or any
  production build outside Vercel) a missing setting or a failed send shows the
  visitor an error asking them to call, and logs `Enquiry send failed` —
  so a misconfiguration can't silently swallow bookings.

To go live: create a Resend account, verify the pub's domain (add the DNS records
Resend gives you), create an API key, and set `RESEND_API_KEY`,
`ENQUIRY_TO_EMAIL`, `ENQUIRY_FROM_EMAIL` and `RESEND_AUDIENCE_ID` (Resend →
Audiences) in Vercel. Then create a Turnstile widget in Cloudflare for the
pub's domain and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and
`TURNSTILE_SECRET_KEY`. Redeploy after changing `NEXT_PUBLIC_` values — they
are baked in at build time.

Field definitions and email subject lines live in `src/lib/enquiries.ts`; the
email templates in `src/lib/email.ts`.

## Deploying to Vercel

Deploys run from GitHub Actions (`.github/workflows/deploy.yml`), not Vercel's
own Git integration (turned off in `vercel.json` so nothing deploys twice):

- **Pull request → Preview** deployment, linked in a PR comment.
- **Push to `main` → Production.**
- Lint and build must pass first, so a broken build never ships.

One-time setup:

1. Run `vercel link` in this folder to create/link the Vercel project. It
   writes `.vercel/project.json` (git-ignored) containing `orgId` and
   `projectId`.
2. Create a token at vercel.com/account/tokens.
3. In GitHub → **Settings → Secrets and variables → Actions**, add
   `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`.
4. In Vercel → Project → Settings → Environment Variables, add the values from
   `.env.example` (CI pulls them from Vercel at build time).
5. Push to `main`. Then **Settings → Domains** to attach the pub's domain and
   follow the DNS instructions.

Home and Events pages re-render once a day so past events drop off
automatically. Everything else is static and very fast.

## Before launch checklist

- [ ] Replace every `TODO` in `src/data/site.ts` (phone, email, WhatsApp, socials, Google Business links, domain)
- [ ] Confirm the postcode/address and check the map pin
- [ ] Final menu, allergens and prices from the client
- [ ] Real room names, descriptions and rates
- [ ] Private dining capacities and set-menu prices
- [ ] Replace stand-in photos; add the video
- [ ] Real reviews and live Google rating in `site.ts` (the section stays hidden until then)
- [ ] Add real vacancies and perks in `careers.ts` if hiring (page shows "no vacancies" while empty)
- [ ] Behold feed connected and `BEHOLD_FEED_URL` set, so the gallery shows the pub's Instagram
- [ ] Client to review `privacy` and `accessibility` pages
- [ ] Resend domain verified, Turnstile keys created, all env vars set in Vercel Production
- [ ] Send a test enquiry and newsletter sign-up on the live domain
- [ ] Add a Vercel Firewall rate-limit rule for `/api/*`
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
