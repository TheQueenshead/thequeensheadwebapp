/**
 * SITE-WIDE SETTINGS
 * ------------------------------------------------------------------
 * Everything the client still needs to confirm lives here. Anything
 * marked TODO is a stand-in — replace it and the whole site updates.
 */
export const site = {
  name: "The Queen's Head",
  legalName: "The Queen's Head Inn, Littlebury",
  tagline: "A 14th-century inn in the Essex countryside",
  description:
    "The Queen's Head is a restored 14th-century village pub and inn in Littlebury, near Saffron Walden and Audley End. Good food, a well-kept bar, six cosy bedrooms and a warm welcome.",
  url: "https://www.queensheadlittlebury.co.uk", // TODO confirm domain

  address: {
    line1: "High Street",
    town: "Littlebury",
    county: "Saffron Walden, Essex",
    postcode: "CB11 4TD",
    country: "United Kingdom",
  },
  // Google Maps embed + directions. Replace with the pub's own Google
  // Business Profile place link once confirmed.
  map: {
    embedSrc:
      "https://www.google.com/maps?q=The+Queen's+Head,+Littlebury,+Saffron+Walden&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=The+Queen's+Head+Littlebury+Saffron+Walden",
    reviewsUrl:
      "https://www.google.com/maps/search/?api=1&query=The+Queen's+Head+Littlebury", // TODO Google reviews link
  },

  // Phone and WhatsApp are hidden everywhere on the site while empty.
  phone: "", // TODO the pub's phone number, e.g. "01799 123 456"
  phoneHref: "", // TODO same number in tel: form, e.g. "tel:+441799123456"
  email: "info@thequeensheadlittlebury.co.uk",
  whatsapp: "", // TODO WhatsApp business number, international format, no +, e.g. "447123456789"

  social: {
    // Icons are hidden while a link is empty.
    facebook: "", // TODO the pub's Facebook page
    instagram: "https://www.instagram.com/thequeensheadlittlebury/", // TODO confirm this is the pub's account
    tripadvisor: "https://www.tripadvisor.co.uk/Hotel_Review-g2145220-d545425-Reviews-Queens_Head_Inn-Littlebury_Essex_England.html",
  },

  /**
   * PAGES NOT READY YET
   * true  → the page shows a "coming soon" message.
   * false → the page shows the full content from menu.ts / rooms.ts
   *         (only switch off once that content is real and signed off).
   */
  comingSoon: {
    menu: false,
    rooms: true,
  },

  // The pub's Booking.com property page. While rooms are "coming soon" the
  // site sends guests here to see the rooms, photos and rates. Buttons
  // appear automatically once this is filled in.
  bookingComUrl: "", // TODO paste the Booking.com listing link

  // Open to the public Wed–Sat from 6pm until close. Every other day is
  // private bookings only. "close" is shown as-is; when the pub gives a
  // fixed closing time (e.g. "23:00") put it in and Google will pick it up.
  hours: [
    { day: "Monday", open: "Private bookings", close: "" },
    { day: "Tuesday", open: "Private bookings", close: "" },
    { day: "Wednesday", open: "18:00", close: "close" },
    { day: "Thursday", open: "18:00", close: "close" },
    { day: "Friday", open: "18:00", close: "close" },
    { day: "Saturday", open: "18:00", close: "close" },
    { day: "Sunday", open: "Private bookings", close: "" },
  ],
  kitchenHours: [
    { label: "Open to all", value: "Wed – Sat, 18:00 – close" },
    { label: "Private bookings", value: "7 days a week" },
  ],

  /**
   * HERO BACKGROUND VIDEO (home page)
   * A short, muted, looping clip behind the headline — 10–30 seconds, no
   * sound needed, ideally under 5 MB (1280×720 H.264 MP4 is plenty; use
   * HandBrake or ffmpeg to compress the client's film).
   * Put the file at /public/video/hero.mp4 and set src: "/video/hero.mp4".
   * Leave src empty to use the poster photo instead.
   * A muted MP4 is the only format browsers will autoplay reliably —
   * YouTube/Vimeo can't be used as a silent background.
   */
  heroVideo: {
    src: "", // TODO e.g. "/video/hero.mp4"
    poster: "exteriorEvening", // key from images.ts, shown until the video plays
  },

  /**
   * STORY / PROMO VIDEO (the full film with sound, in the "Our story on film"
   * section further down the home page)
   * type "mp4"     → src is a path in /public (e.g. "/video/story.mp4") or a CDN URL
   * type "youtube" → src is the YouTube video ID (e.g. "dQw4w9WgXcQ")
   * type "vimeo"   → src is the Vimeo video ID
   * Leave src empty to show the poster image with a "video coming soon" note.
   */
  video: {
    type: "mp4" as "mp4" | "youtube" | "vimeo",
    src: "/video/story.mp4",
    poster: "exteriorEvening", // key from images.ts
    title: "Welcome to The Queen's Head",
    portrait: true, // true for a vertical (phone / Stories) video, false for widescreen
  },

  /**
   * REVIEWS (home page)
   * Only ever paste in genuine reviews, word for word, from the named
   * source — publishing made-up reviews is unlawful in the UK (DMCC Act
   * 2024). The whole section stays hidden while this list is empty.
   * e.g. { name: "Sarah M.", source: "Google", rating: 5, text: "…" }
   */
  reviews: [] as { name: string; source: string; rating: number; text: string }[],
  // The live Google rating badge, e.g. { score: "4.7", count: "312" }.
  // Hidden while null. Keep it in step with the Google Business Profile.
  googleRating: null as { score: string; count: string } | null,
};

export type Site = typeof site;
