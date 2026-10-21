import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, CTABand } from "@/components/ui";
import Accordion from "@/components/Accordion";
import { faqGroups } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ — Frequently Asked Questions",
  description:
    "Answers to common questions about eating, drinking, staying and celebrating at The Queen's Head, Littlebury — opening hours, bookings, allergies, private hire and getting here.",
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((i) => ({
        "@type": "Question",
        name: i.q,
        acceptedAnswer: { "@type": "Answer", text: i.a },
      })),
    ),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <PageHero
        eyebrow="Help"
        title="Frequently asked questions"
        lede="The things people ask us most. If your question isn't here, send us a message — we're quick to reply."
      />
      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {faqGroups.map((g) => (
                <li key={g.title}>
                  <a
                    href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="inline-block rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:border-wine hover:text-wine lg:w-full"
                  >
                    {g.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="reveal-stagger space-y-14">
            {faqGroups.map((g, gi) => (
              <section key={g.title} id={g.title.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-28">
                <h2 className="gold-rule mb-6 text-3xl">{g.title}</h2>
                <Accordion items={g.items} idPrefix={`faq-${gi}`} />
              </section>
            ))}
          </div>
        </div>
        <p className="mt-14 text-center text-muted">
          Still wondering? <Link href="/contact" className="font-semibold text-wine">Get in touch</Link> — we&rsquo;re happy to help.
        </p>
      </Section>
      <CTABand
        title="Ready to visit?"
        primary={{ href: "/book", label: "Book a table" }}
        secondary={{ href: "/rooms", label: "Check room availability" }}
      />
    </>
  );
}
