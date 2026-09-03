import type { ImageKey } from "./images";

/**
 * EVENTS
 * ------------------------------------------------------------------
 * Add new events here — the calendar on /events sorts them by date and
 * automatically hides past ones. Dates are YYYY-MM-DD.
 * `recurring` describes regular fixtures shown in the "Every week" panel.
 */
export type Event = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  time: string;
  desc: string;
  price?: string;
  image?: ImageKey;
  bookable?: boolean;
};

export const events: Event[] = [
  {
    slug: "harvest-supper",
    title: "Harvest Supper Club",
    date: "2026-09-26",
    time: "7pm",
    desc: "A four-course sharing feast celebrating the best of the Essex harvest, with a welcome glass of English fizz and a chat from the growers who supplied it.",
    price: "£55 per person",
    image: "privateDining",
    bookable: true,
  },
  {
    slug: "oktoberfest",
    title: "Oktoberfest at the Queen's",
    date: "2026-10-10",
    time: "From 2pm",
    desc: "Steins, bratwurst, pretzels and a live oompah band in the garden marquee. Lederhosen optional but encouraged.",
    price: "Free entry",
    image: "ale",
  },
  {
    slug: "halloween-quiz",
    title: "Halloween Quiz Night",
    date: "2026-10-29",
    time: "8pm",
    desc: "Our monthly quiz gets spooky. Teams of up to six, £2 per person, all proceeds to Littlebury Village Hall. Fancy dress prize.",
    price: "£2 per person",
    image: "quiz",
    bookable: true,
  },
  {
    slug: "bonfire-night",
    title: "Bonfire Night & Fireworks",
    date: "2026-11-05",
    time: "From 5.30pm",
    desc: "Fireworks over the paddock at 7pm, hot dogs, mulled cider and toffee apples. Family friendly — bring wellies.",
    price: "Free entry",
    image: "celebration",
  },
  {
    slug: "acoustic-sessions-nov",
    title: "Acoustic Sessions: Ellie Mae",
    date: "2026-11-20",
    time: "8.30pm",
    desc: "Live folk and Americana by the fire from Cambridge singer-songwriter Ellie Mae. No ticket needed — just turn up.",
    price: "Free entry",
    image: "liveMusic",
  },
  {
    slug: "festive-menu-launch",
    title: "Festive Menu Launch",
    date: "2026-11-27",
    time: "All day",
    desc: "Our Christmas party menu is served from today until 23 December. Two courses £32, three courses £38. Book your office do or family get-together now.",
    image: "diningRoom",
    bookable: true,
  },
  {
    slug: "carols-by-candlelight",
    title: "Carols by Candlelight",
    date: "2026-12-18",
    time: "6.30pm",
    desc: "Littlebury Church Choir sing carols in the bar, followed by mince pies and mulled wine. A village tradition.",
    price: "Free entry",
    image: "fireplace",
  },
  {
    slug: "new-years-eve",
    title: "New Year's Eve Dinner & Dance",
    date: "2026-12-31",
    time: "7.30pm till late",
    desc: "Five-course dinner, live band, fizz at midnight. Limited to 60 guests — early booking essential.",
    price: "£95 per person",
    image: "celebration",
    bookable: true,
  },
];

export const recurring = [
  { day: "Every Sunday", title: "Sunday Roast", desc: "Served 12–5pm. Booking recommended." },
  { day: "Last Thursday", title: "Pub Quiz", desc: "8pm start · £2 per person · teams of up to six." },
  { day: "Friday", title: "Fish Friday", desc: "Haddock & chips plus a pint for £20, lunch and dinner." },
  { day: "Third Saturday", title: "Live Music", desc: "Acoustic sets by the fire from 8.30pm." },
];
