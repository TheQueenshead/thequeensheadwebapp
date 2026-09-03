/**
 * IMAGE SWAP LIST
 * ------------------------------------------------------------------
 * Every photo on the site is referenced by a key from this file. The
 * current values are royalty-free Unsplash stand-ins so the design can
 * be reviewed before the client's photography arrives.
 *
 * TO REPLACE A PHOTO: drop the real file into /public/images and change
 * the `src` to "/images/your-file.jpg". Keep the alt text honest.
 */
export type SiteImage = { src: string; alt: string };

/**
 * Set NEXT_PUBLIC_IMAGE_SOURCE=local in .env.local to use the plain
 * colour placeholders in /public/placeholders instead of Unsplash —
 * handy for working offline or checking layout without photography.
 */
const useLocal = process.env.NEXT_PUBLIC_IMAGE_SOURCE === "local";
const u = (id: string, w = 1600) =>
  useLocal
    ? `/placeholders/${id}.jpg`
    : `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Exterior / venue
  exteriorEvening: {
    src: u("photo-1572116469696-31de0f17cc34"),
    alt: "The warm glow of a traditional English country pub at dusk",
  },
  exteriorDay: {
    src: u("photo-1529543544282-ea669407fca3"),
    alt: "Timber-framed village inn with hanging baskets on a summer's day",
  },
  barInterior: {
    src: u("photo-1514933651103-005eec06c04b"),
    alt: "Cosy pub bar with wooden beams and soft lighting",
  },
  fireplace: {
    src: u("photo-1482938289607-e9573fc25ebb"),
    alt: "Open fire crackling in a stone hearth",
  },
  diningRoom: {
    src: u("photo-1517248135467-4c7edcad34c4"),
    alt: "Candlelit dining room laid for dinner",
  },
  privateDining: {
    src: u("photo-1519167758481-83f550bb49b3"),
    alt: "Long table dressed for a private celebration",
  },
  garden: {
    src: u("photo-1592861956120-e524fc739696"),
    alt: "Pub garden tables under a summer sky",
  },

  // Food & drink
  roast: {
    src: u("photo-1544025162-d76694265947"),
    alt: "Sunday roast with crisp roast potatoes and gravy",
  },
  steak: {
    src: u("photo-1600891964092-4316c288032e"),
    alt: "Char-grilled steak with seasonal vegetables",
  },
  fishChips: {
    src: u("photo-1579208030886-b937da0925dc"),
    alt: "Beer-battered fish and chips",
  },
  dessert: {
    src: u("photo-1551024506-0bccd828d307"),
    alt: "Sticky toffee pudding with cream",
  },
  ale: {
    src: u("photo-1436076863939-06870fe779c2"),
    alt: "A pint of local cask ale on the bar",
  },
  wine: {
    src: u("photo-1510812431401-41d2bd2722f3"),
    alt: "Two glasses of red wine by candlelight",
  },
  breakfast: {
    src: u("photo-1533089860892-a7c6f0a88666"),
    alt: "Full English breakfast served in the dining room",
  },
  chef: {
    src: u("photo-1577219491135-ce391730fb2c"),
    alt: "Chef plating a dish in the kitchen",
  },

  // Rooms
  roomOne: {
    src: u("photo-1611892440504-42a792e24d32"),
    alt: "Double bedroom with exposed beams and crisp white linen",
  },
  roomTwo: {
    src: u("photo-1590490360182-c33d57733427"),
    alt: "Bright bedroom with a comfortable king-size bed",
  },
  roomThree: {
    src: u("photo-1566665797739-1674de7a421a"),
    alt: "Country bedroom with wooden furniture and a window seat",
  },
  roomFour: {
    src: u("photo-1595576508898-0ad5c879a061"),
    alt: "Elegant bedroom with soft neutral tones",
  },
  roomFive: {
    src: u("photo-1618773928121-c32242e63f39"),
    alt: "Cosy twin room with two single beds",
  },
  roomSix: {
    src: u("photo-1631049307264-da0ec9d70304"),
    alt: "Spacious suite with a seating area",
  },
  bathroom: {
    src: u("photo-1552321554-5fefe8c9ef14"),
    alt: "En-suite bathroom with a walk-in shower",
  },

  // Local area
  audleyEnd: {
    src: u("photo-1533929736458-ca588d08c8be"),
    alt: "A grand English country house and parkland",
  },
  countryside: {
    src: u("photo-1500382017468-9049fed747ef"),
    alt: "Rolling Essex farmland on a walking route",
  },
  saffronWalden: {
    src: u("photo-1596436889106-be35e843f974"),
    alt: "Historic market town street with colourful buildings",
  },
  walking: {
    src: u("photo-1551632811-561732d1e306"),
    alt: "Walkers on a footpath through the fields",
  },

  // People / events
  team: {
    src: u("photo-1556910103-1c02745aae4d"),
    alt: "The team behind the bar sharing a laugh",
  },
  liveMusic: {
    src: u("photo-1511671782779-c97d3d27a1d4"),
    alt: "Acoustic musician performing in a pub",
  },
  quiz: {
    src: u("photo-1543007630-9710e4a00a20"),
    alt: "Friends gathered round a table on quiz night",
  },
  celebration: {
    src: u("photo-1530103862676-de8c9debad1d"),
    alt: "Friends raising glasses at a celebration",
  },
  giftCard: {
    src: u("photo-1513885535751-8b9238bd345a"),
    alt: "A wrapped gift with a ribbon on a wooden table",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
export const img = (key: ImageKey) => images[key];
