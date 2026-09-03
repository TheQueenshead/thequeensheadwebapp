import type { ImageKey } from "./images";

/**
 * ROOMS — six guest bedrooms.
 * SAMPLE CONTENT — replace names, descriptions and rates with the client's.
 * Rates are "from" prices per night including breakfast.
 */
export type Room = {
  slug: string;
  name: string;
  short: string;
  desc: string;
  bed: string;
  sleeps: number;
  size: string;
  from: number;
  features: string[];
  images: ImageKey[];
  dogFriendly?: boolean;
  accessible?: boolean;
};

export const rooms: Room[] = [
  {
    slug: "the-audley",
    name: "The Audley",
    short: "Our largest room, with a four-poster and views over the village green.",
    desc: "Named after the great house down the road, The Audley is the room for a special occasion. A hand-carved four-poster sits beneath original oak beams, with a roll-top bath and separate walk-in shower in the generous en-suite.",
    bed: "Super-king four-poster",
    sleeps: 2,
    size: "32 m²",
    from: 185,
    features: ["Roll-top bath & walk-in shower", "Village green views", "Nespresso machine", "Bathrobes & slippers"],
    images: ["roomSix", "bathroom"],
  },
  {
    slug: "the-cam",
    name: "The Cam",
    short: "A calm, light-filled king room overlooking the garden.",
    desc: "Named after the river that winds past Littlebury, The Cam is a bright and peaceful room at the back of the inn, looking out over the garden. A king-size bed, deep armchair and a sparkling rain shower.",
    bed: "King-size",
    sleeps: 2,
    size: "24 m²",
    from: 145,
    features: ["Garden views", "Rain shower", "Smart TV", "Fresh milk & biscuits"],
    images: ["roomTwo", "bathroom"],
  },
  {
    slug: "the-saffron",
    name: "The Saffron",
    short: "Warm golds and a window seat made for a lazy morning.",
    desc: "A nod to the crocus that gave Saffron Walden its name and its fortune. Warm tones, a cushioned window seat over the High Street and a comfortable king-size bed. En-suite with a walk-in shower.",
    bed: "King-size",
    sleeps: 2,
    size: "22 m²",
    from: 140,
    features: ["Window seat", "Walk-in shower", "Smart TV", "Nespresso machine"],
    images: ["roomThree"],
  },
  {
    slug: "the-orchard",
    name: "The Orchard",
    short: "A cosy double tucked under the eaves — and dogs are welcome.",
    desc: "Up in the eaves with sloping ceilings and exposed timbers, The Orchard is the snuggest of our rooms. It's also our dog-friendly room, with a bed, bowl and a treat waiting for four-legged guests.",
    bed: "Double",
    sleeps: 2,
    size: "18 m²",
    from: 120,
    features: ["Dog friendly (£20/night)", "Exposed beams", "En-suite shower", "Fresh milk & biscuits"],
    images: ["roomOne"],
    dogFriendly: true,
  },
  {
    slug: "the-meadow",
    name: "The Meadow",
    short: "Flexible twin or king — ideal for friends or family.",
    desc: "The Meadow can be set up as two comfortable singles or zipped together as a king, making it perfect for friends walking the countryside or family visiting for the weekend. En-suite with over-bath shower.",
    bed: "Twin or king (zip-and-link)",
    sleeps: 2,
    size: "21 m²",
    from: 135,
    features: ["Twin or king set-up", "Bath with shower", "Smart TV", "Desk"],
    images: ["roomFive"],
  },
  {
    slug: "the-coach-house",
    name: "The Coach House",
    short: "Ground-floor room with its own entrance and level access.",
    desc: "Set in the old coach house across the courtyard, this ground-floor room has its own front door, level access throughout and a spacious wet-room. Ideal for guests who find stairs difficult, or anyone who likes a little independence.",
    bed: "King-size",
    sleeps: 2,
    size: "26 m²",
    from: 150,
    features: ["Step-free access", "Private entrance", "Wet-room", "Parking right outside"],
    images: ["roomFour", "bathroom"],
    accessible: true,
  },
];

export const roomsInfo = {
  checkIn: "From 3pm",
  checkOut: "By 11am",
  breakfast: "Full English or continental breakfast included, served 8–10am (8.30–10.30am weekends).",
  policies: [
    "Rates are per room per night, including breakfast and VAT.",
    "Free parking and Wi-Fi for all guests.",
    "Dogs are welcome in The Orchard by arrangement (£20 per night).",
    "Free cancellation up to 48 hours before arrival.",
    "Children welcome; a travel cot can be provided on request.",
  ],
};
