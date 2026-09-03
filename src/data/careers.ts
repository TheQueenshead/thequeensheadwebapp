/**
 * CAREERS — current vacancies. Set `vacancies = []` when there are none;
 * the page will show a "no vacancies right now, but say hello" message.
 */
export type Vacancy = {
  title: string;
  type: string;
  pay: string;
  summary: string;
  responsibilities: string[];
};

export const vacancies: Vacancy[] = [
  {
    title: "Chef de Partie",
    type: "Full-time · 45 hours · 2 days off together",
    pay: "£30,000 – £33,000 + tronc",
    summary: "Join a small, ambitious kitchen cooking seasonal British food from scratch. You'll run a section, help develop specials and work directly with our head chef.",
    responsibilities: ["Run your section to a consistently high standard", "Help write and cost weekly specials", "Maintain food safety and allergen records", "Support and train our commis chef"],
  },
  {
    title: "Front of House Team Member",
    type: "Part-time or full-time · flexible shifts",
    pay: "£12.60/hr + tronc",
    summary: "You're the reason people come back. Serve food and drinks with warmth, know the menu inside out, and make every guest feel like a regular.",
    responsibilities: ["Welcome, seat and serve guests in the bar and restaurant", "Learn our ales, wines and menu", "Set up and close down to a high standard", "Help with events and private dining"],
  },
  {
    title: "Weekend Housekeeper",
    type: "Part-time · Saturday & Sunday mornings",
    pay: "£12.60/hr",
    summary: "Keep our six bedrooms looking their best for arriving guests. Attention to detail and a bit of pride in a job well done are what count.",
    responsibilities: ["Service and turn around guest bedrooms", "Restock amenities and linen", "Report maintenance issues", "Help with breakfast clear-down"],
  },
];

export const perks = [
  "Share of tronc (tips) on top of pay",
  "50% off food for you, 25% for your family",
  "Free meals on shift",
  "Discounted stays at the inn for friends and family",
  "Training and progression — we promote from within",
  "A genuinely friendly team in a beautiful village",
];
