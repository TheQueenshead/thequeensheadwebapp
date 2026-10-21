/**
 * CAREERS — current vacancies. While `vacancies` is empty the page shows
 * a "no vacancies right now, but say hello" message. To advertise a job,
 * add an entry like:
 *   {
 *     title: "Chef de Partie",
 *     type: "Full-time · 45 hours",
 *     pay: "£30,000 + tronc",
 *     summary: "One or two sentences about the role.",
 *     responsibilities: ["…", "…"],
 *   },
 */
export type Vacancy = {
  title: string;
  type: string;
  pay: string;
  summary: string;
  responsibilities: string[];
};

export const vacancies: Vacancy[] = [];

/** Why work here — only list benefits the pub actually offers. The box is
 * hidden while this is empty. */
export const perks: string[] = [];
