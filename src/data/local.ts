import type { ImageKey } from "./images";

/** LOCAL AREA — attractions and walks. Distances are approximate from the pub. */
export const attractions: { name: string; distance: string; desc: string; image: ImageKey; url?: string }[] = [
  {
    name: "Audley End House & Gardens",
    distance: "1 mile",
    desc: "One of England's grandest Jacobean houses, with Capability Brown parkland, a Victorian service wing and a working organic kitchen garden. Run by English Heritage.",
    image: "audleyEnd",
    url: "https://www.english-heritage.org.uk/visit/places/audley-end-house-and-gardens/",
  },
  {
    name: "Saffron Walden",
    distance: "2 miles",
    desc: "A medieval market town of pargeted houses, independent shops and a Tuesday and Saturday market. Don't miss the turf maze on the common or the 15th-century St Mary's church.",
    image: "saffronWalden",
    url: "https://www.visitsaffronwalden.gov.uk/",
  },
  {
    name: "Cambridge",
    distance: "15 miles",
    desc: "Punting on the Cam, King's College Chapel and the Fitzwilliam Museum — all 20 minutes away by train from Audley End station.",
    image: "countryside",
  },
  {
    name: "Bridge End Garden",
    distance: "2 miles",
    desc: "A restored Victorian garden in Saffron Walden with a hedge maze, Dutch garden and rose garden. Free to enter and a lovely spot for a picnic.",
    image: "garden",
  },
];

export const walks: { name: string; distance: string; time: string; difficulty: "Easy" | "Moderate" | "Challenging"; desc: string }[] = [
  {
    name: "Littlebury & Audley End Circular",
    distance: "3.5 miles",
    time: "1.5 hours",
    difficulty: "Easy",
    desc: "Leave from our front door, follow the River Cam through the meadows to Audley End's parkland, then loop back via the Harcamlow Way. Mostly flat with a couple of stiles.",
  },
  {
    name: "Littlebury to Saffron Walden",
    distance: "5 miles (linear)",
    time: "2 hours",
    difficulty: "Easy",
    desc: "Field paths and quiet lanes into the market town. Have lunch, browse the shops and get the bus or a taxi back — or walk it as a 10-mile round trip.",
  },
  {
    name: "Icknield Way Path: Great Chesterford loop",
    distance: "8 miles",
    time: "3.5 hours",
    difficulty: "Moderate",
    desc: "Join one of Britain's oldest routes across the chalk downs north of the village, with wide skies, skylarks and a Roman town to finish. Sturdy boots recommended.",
  },
  {
    name: "Wendens Ambo & the Uttlesford Hills",
    distance: "11 miles",
    time: "5 hours",
    difficulty: "Challenging",
    desc: "The big one. Rolling farmland, ancient woodland and three of the prettiest villages in north Essex. Ask us for a packed lunch the night before.",
  },
];
