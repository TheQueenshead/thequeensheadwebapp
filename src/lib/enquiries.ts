import { z } from "zod";

/**
 * Every enquiry form on the site posts to /api/enquiry with a `type`.
 * The schema below is the single source of truth for what each form
 * collects, how it's labelled in the email, and the subject line.
 */
export const enquiryTypes = {
  table: {
    label: "Table booking request",
    subject: (d: Fields) =>
      `Table request — ${d.date} at ${d.time} for ${d.guests}`,
  },
  room: {
    label: "Room availability enquiry",
    subject: (d: Fields) =>
      `Room enquiry — ${d.checkIn} to ${d.checkOut} (${d.room ?? "any room"})`,
  },
  "private-dining": {
    label: "Private dining & hire enquiry",
    subject: (d: Fields) =>
      `Private dining enquiry — ${d.date} for ${d.guests} guests`,
  },
  "gift-card": {
    label: "Gift card enquiry",
    subject: (d: Fields) => `Gift card enquiry — £${d.amount}`,
  },
  careers: {
    label: "Job application / enquiry",
    subject: (d: Fields) => `Careers enquiry — ${d.role}`,
  },
  contact: {
    label: "General enquiry",
    subject: (d: Fields) => `Website enquiry from ${d.name}`,
  },
} as const;

export type EnquiryType = keyof typeof enquiryTypes;
export type Fields = Record<string, string>;

export const enquirySchema = z.object({
  type: z.enum(
    Object.keys(enquiryTypes) as [EnquiryType, ...EnquiryType[]],
  ),
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  // Honeypot — real people never fill this in
  website: z.string().max(0).optional().or(z.literal("")),
  // Any other fields the specific form collects
  fields: z.record(z.string(), z.string().max(2000)).default({}),
});

export type EnquiryPayload = z.infer<typeof enquirySchema>;

/** Human-readable labels for field keys, used in the email body */
export const fieldLabels: Record<string, string> = {
  date: "Date",
  time: "Time",
  guests: "Number of guests",
  occasion: "Occasion",
  requests: "Special requests",
  checkIn: "Check-in",
  checkOut: "Check-out",
  room: "Preferred room",
  adults: "Adults",
  children: "Children",
  dogs: "Bringing a dog?",
  space: "Space",
  eventType: "Type of event",
  budget: "Approximate budget",
  amount: "Gift card value (£)",
  recipient: "Recipient name",
  delivery: "Delivery preference",
  role: "Role",
  experience: "Experience",
  availability: "Availability",
  cvLink: "CV link",
  subject: "Subject",
  message: "Message",
  newsletter: "Join newsletter",
};
