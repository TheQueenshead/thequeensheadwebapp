import type { Metadata } from "next";
import { PageHero, Section, SectionHead, CTABand } from "@/components/ui";
import EnquiryForm from "@/components/forms/EnquiryForm";
import MapEmbed from "@/components/MapEmbed";
import { SocialLinks } from "@/components/SocialLinks";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact & Directions",
  description:
    "Find The Queen's Head in Littlebury, near Saffron Walden. Address, opening hours, map, directions and how to get in touch.",
};

export default function ContactPage() {
  const waText = encodeURIComponent("Hello, I'd like to make an enquiry at The Queen's Head.");
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Say hello"
        lede="Get in touch or drop in — whichever suits. We're a small team, so if we don't pick up straight away we're probably carrying plates; we'll get back to you."
        image="exteriorDay"
      />

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl">Get in touch</h2>
              <ul className="mt-4 space-y-3">
                {site.phone && (
                <li className="flex items-center gap-4 rounded-[var(--radius-md)] bg-white p-4 shadow-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-ink" aria-hidden="true">☎</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Phone</p>
                    <a href={site.phoneHref} className="font-semibold text-ink">{site.phone}</a>
                  </div>
                </li>
                )}
                <li className="flex items-center gap-4 rounded-[var(--radius-md)] bg-white p-4 shadow-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold text-ink" aria-hidden="true">✉</span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">Email</p>
                    <a href={`mailto:${site.email}`} className="font-semibold text-ink break-all">{site.email}</a>
                  </div>
                </li>
                {site.whatsapp && (
                <li className="flex items-center gap-4 rounded-[var(--radius-md)] bg-white p-4 shadow-soft">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-whatsapp text-white" aria-hidden="true">
                    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="currentColor"><path d="M16 3C9.4 3 4 8.3 4 14.9c0 2.3.7 4.6 1.9 6.6L4 29l7.7-1.9c1.4.7 2.9 1 4.3 1 6.6 0 12-5.3 12-11.9S22.6 3 16 3zm0 21.8c-1.3 0-2.6-.3-3.8-1l-.3-.2-4.4 1.1 1.2-4.2-.2-.3a9.7 9.7 0 0 1-1.7-5.3c0-5.4 4.1-9.7 9.2-9.7s9.2 4.3 9.2 9.7-4.1 9.9-9.2 9.9z"/></svg>
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted">WhatsApp</p>
                    <a href={`https://wa.me/${site.whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink">
                      Chat with us on WhatsApp
                    </a>
                  </div>
                </li>
                )}
              </ul>
              <SocialLinks dark className="mt-5" />
            </div>

            <div>
              <h2 className="text-2xl">Opening hours</h2>
              <table className="mt-4 w-full text-sm">
                <caption className="sr-only">Bar opening hours by day</caption>
                <tbody>
                  {site.hours.map((h) => (
                    <tr key={h.day} className="border-b border-dashed border-black/10">
                      <th scope="row" className="py-2 text-left font-semibold">{h.day}</th>
                      <td className="py-2 text-right text-muted">
                        {h.close ? `${h.open} – ${h.close}` : h.open}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <dl className="mt-4 space-y-1 text-sm">
                {site.kitchenHours.map((k) => (
                  <div key={k.label} className="flex justify-between gap-4">
                    <dt className="font-semibold">{k.label}</dt>
                    <dd className="text-muted">{k.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-muted">Open 7 days a week for private bookings — get in touch to arrange. Hours may vary over Christmas — check our socials.</p>
            </div>

            <div>
              <h2 className="text-2xl">Find us</h2>
              <address className="mt-3 not-italic leading-relaxed">
                {site.legalName}<br />
                {site.address.line1}, {site.address.town}<br />
                {site.address.county} {site.address.postcode}
              </address>
              <ul className="mt-4 space-y-2 text-sm text-body">
                <li><strong>By car:</strong> on the High Street (B1383), a mile and a half north-west of Saffron Walden. The M11 (junction 9) is about three miles away.</li>
                <li><strong>By train:</strong> Audley End station has direct trains from London Liverpool Street (from about 55 minutes) and Cambridge (about 20 minutes). It&rsquo;s about two miles from us — a short taxi ride, or a 45-minute walk.</li>
              </ul>
              <a href={site.map.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-5">
                Get directions
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <MapEmbed />
            <div className="rounded-[var(--radius-lg)] bg-white p-7 shadow-lift md:p-9">
              <SectionHead eyebrow="Message" title="Send us a message" />
              <EnquiryForm
                type="contact"
                submitLabel="Send message"
                fields={[
                  { name: "subject", label: "What's it about?", type: "select", required: true, options: ["General question", "Feedback", "Lost property", "Supplier / trade", "Press", "Something else"] },
                  { name: "message", label: "Your message", type: "textarea", required: true },
                ]}
                successTitle="Message sent — thank you"
                successBody="We'll reply as soon as we can, usually within a day."
              />
            </div>
          </div>
        </div>
      </Section>
      <CTABand
        title="Ready when you are"
        text="No need to wait for a reply if all you want is a table — send a booking request and we'll confirm it."
        primary={{ href: "/book", label: "Book a table" }}
        secondary={{ href: "/events", label: "What's on" }}
      />

    </>
  );
}
