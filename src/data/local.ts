/**
 * LOCAL AREA — things to do and walks, shown on the About page.
 * Every fact here was checked against the source linked in `url`
 * (September 2026). Distances are approximate, from the pub. If you add
 * something, check opening days and prices on the official site first.
 */
export const attractions: { name: string; distance: string; desc: string; url: string }[] = [
  {
    name: "Audley End House & Gardens",
    distance: "1 mile",
    desc: "A Jacobean mansion run by English Heritage, set in Capability Brown parkland, with a Victorian service wing and stables to explore.",
    url: "https://www.english-heritage.org.uk/visit/places/audley-end-house-and-gardens/",
  },
  {
    name: "Audley End Enchanted Railway",
    distance: "1 mile",
    desc: "A miniature railway through the woods on the Audley End estate, with woodland trails, den building and seasonal themed train rides. A favourite with families — check the website for open dates.",
    url: "https://www.audley-end-railway.co.uk/",
  },
  {
    name: "Saffron Walden",
    distance: "1.5 miles",
    desc: "The market town next door, with a market in the Market Place every Tuesday and Saturday, and on the Common the largest surviving historic turf maze in England, first recorded in 1699.",
    url: "https://saffronwalden.gov.uk/services/market/",
  },
  {
    name: "Bridge End Garden",
    distance: "1.5 miles",
    desc: "A restored Victorian garden in Saffron Walden with a yew hedge maze. Free to visit and open daily (the maze and walled garden are locked at certain times).",
    url: "https://www.bridgeendgarden.org/",
  },
  {
    name: "Saffron Walden Museum",
    distance: "1.5 miles",
    desc: "Founded in 1835, one of the oldest purpose-built museums in the country, beside the ruins of the 12th-century Walden Castle.",
    url: "https://www.saffronwaldenmuseum.org/",
  },
  {
    name: "Fry Art Gallery",
    distance: "1.5 miles",
    desc: "A free, volunteer-run gallery in Saffron Walden devoted to the Great Bardfield artists, including Edward Bawden and Eric Ravilious. Open seasonally, roughly April to October.",
    url: "https://fryartgallery.org/",
  },
  {
    name: "IWM Duxford",
    distance: "7 miles",
    desc: "Britain's largest aviation museum, with nearly 200 aircraft across historic hangars on a former RAF airfield.",
    url: "https://www.iwm.org.uk/visits/iwm-duxford",
  },
  {
    name: "Linton Zoo",
    distance: "6 miles",
    desc: "A 16-acre conservation zoo in the village of Linton — a good day out with children.",
    url: "https://lintonzoo.com/",
  },
  {
    name: "Thaxted",
    distance: "8 miles",
    desc: "A small town with a timber-framed 15th-century Guildhall, John Webb's Windmill (built 1804) and the grand church of St John the Baptist.",
    url: "https://thaxted-pc.gov.uk/tourism/places-to-visit/the-windmill/",
  },
  {
    name: "Cambridge",
    distance: "12 miles",
    desc: "The colleges, the Backs and the river are around 20 minutes by train from Audley End station.",
    url: "https://www.visitcambridge.org/",
  },
];

export const walks: { name: string; distance?: string; desc: string; url: string; source: string }[] = [
  {
    name: "Littlebury Green & Strethall",
    distance: "6.5 miles",
    desc: "A stile-free circular through Littlebury Green and the tiny hamlet of Strethall, partly on the Icknield Way Path.",
    url: "https://www.greatbritishlife.co.uk/magazines/essex/23814568.essex-walk-littlebury-green-strethall/",
    source: "Essex Life",
  },
  {
    name: "Littlebury Green Circular",
    distance: "About 5.5 miles",
    desc: "A loop through the fields and lanes around Littlebury Green, with a route map you can follow on your phone.",
    url: "https://www.alltrails.com/en-gb/trail/england/essex/littlebury-green-circular",
    source: "AllTrails",
  },
  {
    name: "Walks from the village",
    desc: "The parish council's own suggestions: a loop via Catmere End, Howe Wood and Strethall; a short Littlebury Green loop of a couple of miles; and footpaths into Saffron Walden alongside the Audley End park walls.",
    url: "https://littlebury.org.uk/walking-in-and-around-littlebury/",
    source: "Littlebury Parish Council",
  },
  {
    name: "Icknield Way Path",
    desc: "One of Britain's oldest routes passes a few miles west of the village, through Strethall to Great Chesterford — and the Harcamlow Way runs nearby past Audley End.",
    url: "https://icknieldwaypath.co.uk/route/essex/",
    source: "Icknield Way Association",
  },
];
