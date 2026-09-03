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
    "The Queen's Head is a restored 14th-century village pub and inn in Littlebury, near Saffron Walden and Audley End. Seasonal food, local ales, six cosy bedrooms and a warm welcome.",
  url: "https://www.queensheadlittlebury.co.uk", // TODO confirm domain

  address: {
    line1: "High Street",
    town: "Littlebury",
    county: "Saffron Walden, Essex",
    postcode: "CB11 4TD", // TODO confirm with client
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

  phone: "01799 000 000", // TODO confirm
  phoneHref: "tel:+441799000000",
  email: "hello@queensheadlittlebury.co.uk", // TODO confirm
  whatsapp: "447700000000", // TODO WhatsApp business number, international format, no +

  social: {
    facebook: "https://www.facebook.com/", // TODO
    instagram: "https://www.instagram.com/", // TODO
    tripadvisor: "https://www.tripadvisor.co.uk/", // TODO
  },

  hours: [
    { day: "Monday", open: "Closed", close: "" },
    { day: "Tuesday", open: "12:00", close: "23:00" },
    { day: "Wednesday", open: "12:00", close: "23:00" },
    { day: "Thursday", open: "12:00", close: "23:00" },
    { day: "Friday", open: "12:00", close: "23:30" },
    { day: "Saturday", open: "12:00", close: "23:30" },
    { day: "Sunday", open: "12:00", close: "22:00" },
  ],
  kitchenHours: [
    { label: "Lunch", value: "Tue – Sun, 12:00 – 14:30" },
    { label: "Dinner", value: "Tue – Sat, 18:00 – 21:00" },
    { label: "Sunday roast", value: "Sun, 12:00 – 17:00" },
  ],

  /**
   * STORY / PROMO VIDEO
   * type "mp4"     → src is a path in /public (e.g. "/video/story.mp4") or a CDN URL
   * type "youtube" → src is the YouTube video ID (e.g. "dQw4w9WgXcQ")
   * type "vimeo"   → src is the Vimeo video ID
   * Leave src empty to show the poster image with a "video coming soon" note.
   */
  video: {
    type: "mp4" as "mp4" | "youtube" | "vimeo",
    src: "", // TODO drop the client's video in /public/video/story.mp4 and set "/video/story.mp4"
    poster: "exteriorEvening", // key from images.ts
    title: "Welcome to The Queen's Head",
  },

  // Reviews shown on the home page. Replace with real Google reviews.
  reviews: [
    {
      name: "Sarah M.",
      source: "Google",
      rating: 5,
      text: "Beautiful old pub with proper character. The Sunday roast was one of the best we've had — and the staff couldn't have been friendlier.",
    },
    {
      name: "James & Helen",
      source: "TripAdvisor",
      rating: 5,
      text: "Stayed two nights in one of the rooms while visiting Audley End. Cosy, spotless and a cracking breakfast to start the day.",
    },
    {
      name: "Tom R.",
      source: "Google",
      rating: 5,
      text: "Great selection of local ales, a roaring fire and a menu that changes with the seasons. What more do you want from a village pub?",
    },
  ],
  googleRating: { score: "4.7", count: "300+" }, // TODO replace with live figures
};

export type Site = typeof site;
