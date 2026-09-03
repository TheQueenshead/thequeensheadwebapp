import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Photo, Section, SectionHead, Card, CTABand } from "@/components/ui";
import { attractions, walks } from "@/data/local";

export const metadata: Metadata = {
  title: "About & Local Area",
  description:
    "The story of The Queen's Head, a 14th-century inn in Littlebury, plus our guide to Audley End, Saffron Walden and the best walks from the front door.",
};

const timeline = [
  { year: "c.1340", text: "Built as a timber-framed hall house, open to the rafters with a central hearth." },
  { year: "1500s", text: "Chimney and first floor added; the building becomes an inn for the first time." },
  { year: "1700s", text: "A busy coaching inn on the London–Cambridge road, with stabling for twenty horses." },
  { year: "1800s", text: "Doubles as the manorial court. The coach arch and Coach House survive from this era." },
  { year: "1940s", text: "Billets airmen from RAF Debden during the Second World War." },
  { year: "Today", text: "Lovingly restored, with six bedrooms, a kitchen cooking from scratch and the same warm welcome." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Seven centuries of hospitality"
        lede="The Queen's Head has stood on Littlebury's High Street since the reign of Edward III. We're only its latest custodians — and we take that seriously."
        image="exteriorDay"
      />

      <Section tone="cream">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
            <Photo id="fireplace" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <SectionHead
              eyebrow="What makes us different"
              title="A village pub that happens to have a very good kitchen"
            />
            <p className="text-lg">
              We believe a pub should be the living room of its village — somewhere for a
              pint after work, a long Sunday lunch with the family, a quiet dinner for two
              by the fire, or a bed for the night after a day&rsquo;s walking.
            </p>
            <p className="mt-4">
              Our head chef cooks seasonal British food from scratch, working with farmers,
              growers and brewers from Essex and the counties next door. Our bar pours
              cask ales from Adnams and Woodforde&rsquo;s alongside a changing guest ale, and a
              wine list we&rsquo;ve tasted our way through so you don&rsquo;t have to.
            </p>
            <p className="mt-4">
              Upstairs — and across the courtyard — are six bedrooms, each different, all
              quiet, all with a proper breakfast included.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/menu" className="btn btn-primary">
                See the menu
              </Link>
              <Link href="/rooms" className="btn btn-outline">
                Our rooms
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section tone="ink">
        <SectionHead eyebrow="History" title="A building with stories to tell" center light />
        <ol className="reveal-stagger grid gap-6 md:grid-cols-3">
          {timeline.map((t) => (
            <li key={t.year} className="rounded-[var(--radius-md)] border border-white/10 bg-white/5 p-6">
              <p className="font-display text-3xl text-gold">{t.year}</p>
              <p className="mt-2 text-white/80">{t.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-center">
          <Link href="/blog/history-of-the-queens-head" className="btn btn-outline-light">
            Read the full history
          </Link>
        </p>
      </Section>

      {/* Local area */}
      <Section tone="white" id="local-area">
        <SectionHead
          eyebrow="The local area"
          title="Things to see and do nearby"
          lede="We're in the middle of some of the loveliest countryside in the East of England, with a Jacobean palace at the end of the lane and a medieval market town up the road."
        />
        <div className="reveal-stagger grid gap-6 md:grid-cols-2">
          {attractions.map((a) => (
            <article key={a.name} className="grid overflow-hidden rounded-[var(--radius-md)] bg-cream shadow-soft sm:grid-cols-[200px_1fr]">
              <div className="relative aspect-[4/3] sm:aspect-auto">
                <Photo id={a.image} sizes="(max-width: 640px) 100vw, 200px" />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl">{a.name}</h3>
                  <span className="shrink-0 rounded-full border border-gold-dark bg-white px-3 py-1 text-xs font-semibold">
                    {a.distance}
                  </span>
                </div>
                <p className="mt-2 text-sm text-body">{a.desc}</p>
                {a.url && (
                  <a href={a.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-wine">
                    Visit website →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Walks */}
      <Section tone="cream" id="walks">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionHead
              eyebrow="Walking routes"
              title="Boots on, straight from the front door"
              lede="Littlebury sits on the Harcamlow Way and a stone's throw from the Icknield Way. Ask at the bar for printed route cards, or for a packed lunch if you're going far."
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
              <Photo id="walking" sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          </div>
          <div className="reveal-stagger grid gap-5 sm:grid-cols-2">
            {walks.map((w) => (
              <Card key={w.name}>
                <span
                  className={`tag ${
                    w.difficulty === "Easy" ? "" : w.difficulty === "Moderate" ? "!bg-gold" : "!bg-wine !text-white"
                  }`}
                >
                  {w.difficulty}
                </span>
                <h3 className="mt-3 text-xl">{w.name}</h3>
                <p className="mt-1 text-sm font-semibold text-wine">
                  {w.distance} · {w.time}
                </p>
                <p className="mt-3 text-sm text-body">{w.desc}</p>
              </Card>
            ))}
          </div>
        </div>
        <p className="mt-10 text-sm text-muted">
          Muddy boots and well-behaved dogs are welcome in the bar. Please check weather and
          footpath conditions before setting out.
        </p>
      </Section>

      <CTABand
        title="Make a weekend of it"
        text="Stay the night and you'll have Audley End, Saffron Walden and thirty miles of footpaths on the doorstep."
        primary={{ href: "/rooms", label: "See our rooms" }}
        secondary={{ href: "/blog/a-perfect-weekend-in-littlebury", label: "Weekend guide" }}
      />
    </>
  );
}
