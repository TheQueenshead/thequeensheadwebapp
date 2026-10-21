import type { ImageKey } from "./images";

/**
 * EVENTS
 * ------------------------------------------------------------------
 * Add new events here — the calendar on /events sorts them by date and
 * automatically hides past ones. Dates are YYYY-MM-DD. While there are no
 * upcoming events the site says so and points people to the newsletter.
 * Example:
 *   {
 *     slug: "quiz-night-oct",          // unique, used in the page link
 *     title: "Quiz Night",
 *     date: "2026-10-29",
 *     time: "8pm",
 *     desc: "Teams of up to six. Prizes for the winners.",
 *     price: "£2 per person",          // optional
 *     image: "quiz",                   // optional, key from images.ts
 *     poster: "/images/events/x.jpg",  // optional, event poster in /public (shown whole, not cropped)
 *     bookable: true,                  // optional, shows a booking button
 *   },
 *
 * `recurring` lists regular fixtures (e.g. a monthly quiz) shown above the
 * calendar. The panel is hidden while it's empty.
 */
export type Event = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  desc: string;
  price?: string;
  image?: ImageKey;
  poster?: string; // path in /public, e.g. "/images/events/my-poster.jpg"
  posterAlt?: string;
  bookable?: boolean;
};

export const events: Event[] = [
  {
    slug: "black-velvet-band-2026-11-07",
    title: "The Black Velvet Band",
    date: "2026-11-07",
    time: "8.30pm",
    desc: "An evening of Irish music with The Black Velvet Band and special guests Rosie and Seamus (harmonies and guitar magic), Tony Pitts (king of mandolin) and Frank Corr (the legend of Irish trad music).",
    poster: "/images/events/black-velvet-band-2026-11-07.jpg",
    posterAlt: "Poster: The Black Velvet Band with special guests Rosie and Seamus, Tony Pitts and Frank Corr, at the Queen's Head, Littlebury, Saturday November 7th, 8.30pm",
    bookable: true,
  },
];

export const recurring: { day: string; title: string; desc: string }[] = [];
