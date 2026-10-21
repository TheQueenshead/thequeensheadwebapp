import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Photo, Section, SectionHead, Card, CTABand } from "@/components/ui";
import { attractions, walks } from "@/data/local";

export const metadata: Metadata = {
  title: "About & Local Area",
  description:
    "The Queen's Head is a Grade II listed village inn in Littlebury, a mile from Audley End House. Things to do nearby, from Saffron Walden to IWM Duxford, and walks from the village.",
};

/** Historic England's official record of the building */
const LISTING_URL = "https://historicengland.org.uk/listing/the-list/list-entry/1278172";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="A listed inn on the village High Street"
        lede="The Queen's Head is a timber-framed, Grade II listed inn in the heart of Littlebury — a mile from Audley End House and a mile and a half from Saffron Walden."
        image="exteriorDay"
      />

      <Section tone="cream">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
            <Photo id="fireplace" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <SectionHead eyebrow="Who we are" title="The village pub, with rooms upstairs" />
            <p className="text-lg">
              We believe a pub should be the living room of its village — somewhere for a
              pint after work, a family celebration, a quiet dinner for two,
              or a bed for the night after a day out at Audley End.
            </p>
            <p className="mt-4">
              Inside you&rsquo;ll find old beams and inglenook fireplaces, food and drink in
              the bar and restaurant, and en-suite bedrooms upstairs for anyone who wants to
              make a night of it.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book" className="btn btn-primary">
                Book a table
              </Link>
              <Link href="/rooms" className="btn btn-outline">
                Stay with us
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* The building — facts from the official listing */}
      <Section tone="ink">
        <SectionHead eyebrow="The building" title="Part of Littlebury's history" center light />
        <ul className="reveal-stagger grid gap-6 md:grid-cols-3">
          {[
            { k: "Grade II", v: "Listed as a building of special architectural and historic interest since 1967." },
            { k: "Timber-framed", v: "A timber-framed and plastered building, with 18th-century features on the outside." },
            { k: "Littlebury", v: "It stands on the village High Street (the B1383), a mile from Audley End House." },
          ].map((f) => (
            <li key={f.k} className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-6">
              <p className="font-display text-3xl text-gold">{f.k}</p>
              <p className="mt-2 text-white/80">{f.v}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 text-center">
          <a href={LISTING_URL} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light">
            Read the Historic England listing
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </Section>

      {/* Local area */}
      <Section tone="white" id="local-area">
        <SectionHead
          eyebrow="The local area"
          title="Things to see and do nearby"
          lede="Audley End is on our doorstep and Saffron Walden is just down the road, with Duxford, Thaxted and Cambridge all within easy reach."
        />
        <ul className="reveal-stagger grid gap-5 md:grid-cols-2">
          {attractions.map((a) => (
            <li key={a.name} className="flex flex-col rounded-[var(--radius-md)] bg-cream p-6 shadow-soft">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-xl">{a.name}</h3>
                <span className="shrink-0 rounded-full border border-gold-dark bg-white px-3 py-1 text-xs font-semibold">
                  {a.distance}
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm text-body">{a.desc}</p>
              <a href={a.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-wine">
                Visit website →<span className="sr-only"> for {a.name} (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-muted">
          Distances are approximate, from the pub. Opening times change with the seasons, so
          please check before you set off.
        </p>
      </Section>

      {/* Walks */}
      <Section tone="cream" id="walks">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHead
              eyebrow="Walking"
              title="Walks around Littlebury"
              lede="Rolling farmland, quiet lanes and the Icknield Way close by. Here are a few published routes to get you started."
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
              <Photo id="walking" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </div>
          <div className="reveal-stagger grid gap-5 sm:grid-cols-2">
            {walks.map((w) => (
              <Card key={w.name} className="flex flex-col">
                <h3 className="text-xl">{w.name}</h3>
                {w.distance && <p className="mt-1 text-sm font-semibold text-wine">{w.distance}</p>}
                <p className="mt-3 flex-1 text-sm text-body">{w.desc}</p>
                <a href={w.url} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm font-semibold text-wine">
                  Route on {w.source} →<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </Card>
            ))}
          </div>
        </div>
        <p className="mt-10 text-sm text-muted">
          Please check the weather and footpath conditions before setting out, and follow the
          Countryside Code.
        </p>
      </Section>

      <CTABand
        title="Make a day of it"
        text="Explore Audley End and Saffron Walden, then come back to us for something to eat and drink."
        primary={{ href: "/book", label: "Book a table" }}
        secondary={{ href: "/rooms", label: "Stay the night" }}
      />
    </>
  );
}
