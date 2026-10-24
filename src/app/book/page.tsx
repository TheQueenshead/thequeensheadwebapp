import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Photo, Section, Notice } from "@/components/ui";
import EnquiryForm, { type FieldDef } from "@/components/forms/EnquiryForm";
import { site } from "@/data/site";
import { events } from "@/data/events";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Request a table at The Queen's Head, Littlebury. Tell us your date, time and party size and we'll confirm your booking.",
};

const times = [
  "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00",
];

/**
 * Events write their time however reads best on the page ("8.30pm", "8pm").
 * Map that onto one of the slots above so the dropdown can be pre-filled.
 * Returns "" when it doesn't land on a slot — the guest then picks their own.
 */
function toSlot(raw: string): string {
  const m = raw.trim().toLowerCase().replace(/\s+/g, "").match(/^(\d{1,2})[.:]?(\d{2})?(am|pm)?$/);
  if (!m) return "";
  let hour = Number(m[1]);
  const mins = m[2] ?? "00";
  if (m[3] === "pm" && hour < 12) hour += 12;
  if (m[3] === "am" && hour === 12) hour = 0;
  const slot = `${String(hour).padStart(2, "0")}:${mins}`;
  return times.includes(slot) ? slot : "";
}

function longDate(iso: string): string {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ event?: string }>;
}) {
  const { event: slug } = await searchParams;
  const ev = slug ? events.find((e) => e.slug === slug) : undefined;

  // Carried with the enquiry but not shown to the guest, so the team can tell
  // an event booking from an ordinary dinner booking at a glance.
  const carried: FieldDef[] = ev
    ? [
        {
          name: "event",
          label: "Event",
          hidden: true,
          defaultValue: `${ev.title} — ${longDate(ev.date)}, ${ev.time}`,
        },
      ]
    : [];

  return (
    <>
      <PageHero
        eyebrow={ev ? "Events" : "Reservations"}
        title={ev ? `Book for ${ev.title}` : "Book a table"}
        lede={
          ev
            ? `${longDate(ev.date)} · ${ev.time}. Send us your details and we'll confirm your table by email or phone — event nights fill up, so the sooner the better.`
            : "Send us your details and we'll confirm your table by email or phone. For groups of eight or more, tell us in the special requests box and we'll find the best table."
        }
        image="diningRoom"
      >
        {site.phone && (
        <a href={site.phoneHref} className="btn btn-gold">
          Call {site.phone}
        </a>
        )}
      </PageHero>

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-[var(--radius-lg)] bg-white p-7 shadow-lift md:p-10">
            <h2 className="text-2xl">Your booking request</h2>
            <p className="mb-8 mt-1 text-sm text-muted">Fields marked * are required.</p>

            {ev && (
              <div className="mb-8">
                <Notice>
                  <p>
                    You&rsquo;re booking for <strong>{ev.title}</strong> —{" "}
                    {longDate(ev.date)}, {ev.time}. We&rsquo;ve filled in the date and time
                    for you.{" "}
                    <Link href="/events" className="font-semibold text-wine">
                      See all events
                    </Link>
                  </p>
                </Notice>
              </div>
            )}

            <EnquiryForm
              type="table"
              submitLabel="Send booking request"
              fields={[
                { name: "date", label: "Date", type: "date", required: true, half: true, defaultValue: ev?.date },
                { name: "time", label: "Time", type: "select", required: true, half: true, options: times, defaultValue: ev ? toSlot(ev.time) : undefined },
                { name: "guests", label: "Number of guests", type: "select", required: true, half: true, options: ["1", "2", "3", "4", "5", "6", "7", "8+ (we'll call you)"] },
                { name: "occasion", label: "Occasion (optional)", type: "select", half: true, options: ["Just because", "Birthday", "Anniversary", "Business", "Celebration", "Other"] },
                { name: "requests", label: "Special requests", type: "textarea", placeholder: "Allergies, high chair, wheelchair access, a table by the fire…" },
                ...carried,
              ]}
              note={
                <Notice>
                  <strong>Please note:</strong> your request will be reviewed by the team
                  and confirmed by email or phone. Your table isn&rsquo;t reserved until you
                  receive our confirmation.
                </Notice>
              }
              successTitle="Request received — thank you"
              successBody={
                ev
                  ? `We'll confirm your table for ${ev.title} by email or phone as soon as we can. If you don't hear from us within a day, please send us a message.`
                  : "We'll confirm your table by email or phone as soon as we can. If you don't hear from us within a day, please send us a message."
              }
            />
          </div>

          <aside className="space-y-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
              <Photo id="wine" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
            <div className="rounded-[var(--radius-md)] bg-white p-6 shadow-soft">
              <h3 className="text-xl">Kitchen hours</h3>
              <dl className="mt-3 space-y-2 text-sm">
                {site.kitchenHours.map((h) => (
                  <div key={h.label} className="flex justify-between gap-4 border-b border-dashed border-black/10 pb-2">
                    <dt className="font-semibold">{h.label}</dt>
                    <dd className="text-right text-muted">{h.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="rounded-[var(--radius-md)] bg-white p-6 shadow-soft">
              <h3 className="text-xl">Good to know</h3>
              <ul className="mt-3 space-y-2 text-sm text-body">
                <li>We&rsquo;re open to everyone Wednesday to Saturday from 6pm, and 7 days a week for private bookings.</li>
                <li>Groups of eight or more: let us know in your request so we can find the best table.</li>
                <li>For private dining and whole-pub hire, see our <a href="/private-dining">Private Dining</a> page.</li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
