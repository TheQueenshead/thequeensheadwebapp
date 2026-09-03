import type { Event } from "@/data/events";

const today = () => new Date().toISOString().slice(0, 10);

/** Future (and today's) events, soonest first */
export function upcoming(list: Event[]) {
  const t = today();
  return [...list].filter((e) => e.date >= t).sort((a, b) => (a.date < b.date ? -1 : 1));
}

export function eventDateParts(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return {
    day: d.toLocaleDateString("en-GB", { day: "numeric" }),
    mon: d.toLocaleDateString("en-GB", { month: "short" }),
    weekday: d.toLocaleDateString("en-GB", { weekday: "long" }),
    monthYear: d.toLocaleDateString("en-GB", { month: "long", year: "numeric" }),
    full: d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
  };
}

/** Group events by "Month Year" for the calendar view */
export function groupByMonth(list: Event[]) {
  const groups = new Map<string, Event[]>();
  for (const e of list) {
    const key = eventDateParts(e.date).monthYear;
    groups.set(key, [...(groups.get(key) ?? []), e]);
  }
  return [...groups.entries()];
}
