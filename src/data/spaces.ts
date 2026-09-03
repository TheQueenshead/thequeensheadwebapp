import type { ImageKey } from "./images";

/** PRIVATE DINING & HIRE — capacities are SAMPLE, confirm with client. */
export type Space = {
  name: string;
  seated: number;
  standing?: number;
  desc: string;
  ideal: string;
  image: ImageKey;
  hire: string;
};

export const spaces: Space[] = [
  {
    name: "The Snug",
    seated: 12,
    desc: "Our oak-panelled snug with its own fireplace — the original inn parlour. Close the door and it's yours.",
    ideal: "Birthday dinners, family lunches, small business meetings",
    image: "fireplace",
    hire: "No hire fee with a set menu · minimum spend applies Fri–Sat",
  },
  {
    name: "The Dining Room",
    seated: 24,
    standing: 35,
    desc: "A light, beamed room off the restaurant with its own bar hatch and access to the garden terrace.",
    ideal: "Celebrations, wakes, christenings, company dinners",
    image: "privateDining",
    hire: "No hire fee with a set menu · minimum spend applies",
  },
  {
    name: "Garden Marquee",
    seated: 80,
    standing: 120,
    desc: "A heated, permanently sited marquee in the garden with festoon lighting, a dance floor and its own bar. Available May to September.",
    ideal: "Wedding receptions, summer parties, milestone birthdays",
    image: "garden",
    hire: "Hire fee from £500 · food & drink packages available",
  },
  {
    name: "Whole Pub Hire",
    seated: 90,
    standing: 150,
    desc: "The entire inn — bar, restaurant, snug, garden and all six bedrooms — exclusively yours for the day and night.",
    ideal: "Weddings, big family gatherings, corporate away-days",
    image: "exteriorEvening",
    hire: "Price on application · includes all six rooms",
  },
];

export const setMenus = [
  { name: "Two courses", price: "£32 per person", desc: "Choice of three starters and three mains" },
  { name: "Three courses", price: "£38 per person", desc: "Add a choice of three puddings or cheese" },
  { name: "Feasting menu", price: "£45 per person", desc: "Sharing platters down the middle of the table — our favourite way to eat" },
  { name: "Canapés & fizz", price: "From £18 per person", desc: "Six canapés and a glass of English sparkling on arrival" },
];
