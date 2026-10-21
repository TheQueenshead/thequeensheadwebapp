import type { Metadata } from "next";
import { PageHero, Photo, Section, Notice } from "@/components/ui";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Book a Table",
  description:
    "Request a table at The Queen's Head, Littlebury. Tell us your date, time and party size and we'll confirm your booking.",
};

const times = [
  "18:00", "18:15", "18:30", "18:45", "19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00",
];

export default function BookPage() {
  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title="Book a table"
        lede="Send us your details and we'll confirm your table by email or phone. For groups of eight or more, tell us in the special requests box and we'll find the best table."
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
            <EnquiryForm
              type="table"
              submitLabel="Send booking request"
              fields={[
                { name: "date", label: "Date", type: "date", required: true, half: true },
                { name: "time", label: "Time", type: "select", required: true, half: true, options: times },
                { name: "guests", label: "Number of guests", type: "select", required: true, half: true, options: ["1", "2", "3", "4", "5", "6", "7", "8+ (we'll call you)"] },
                { name: "occasion", label: "Occasion (optional)", type: "select", half: true, options: ["Just because", "Birthday", "Anniversary", "Business", "Celebration", "Other"] },
                { name: "requests", label: "Special requests", type: "textarea", placeholder: "Allergies, high chair, wheelchair access, a table by the fire…" },
              ]}
              note={
                <Notice>
                  <strong>Please note:</strong> your request will be reviewed by the team
                  and confirmed by email or phone. Your table isn&rsquo;t reserved until you
                  receive our confirmation.
                </Notice>
              }
              successTitle="Request received — thank you"
              successBody="We'll confirm your table by email or phone as soon as we can. If you don't hear from us within a day, please send us a message."
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
