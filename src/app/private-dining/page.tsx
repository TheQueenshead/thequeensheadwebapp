import type { Metadata } from "next";
import { PageHero, Photo, Section, SectionHead, Notice } from "@/components/ui";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { spaces, setMenus } from "@/data/spaces";

export const metadata: Metadata = {
  title: "Private Dining & Venue Hire",
  description:
    "Private dining rooms, a garden marquee for up to 120 and whole-pub hire at The Queen's Head, Littlebury. Weddings, celebrations, wakes and corporate dinners.",
};

export default function PrivateDiningPage() {
  return (
    <>
      <PageHero
        eyebrow="Private dining & hire"
        title="Your celebration, our home"
        lede="From a birthday dinner for twelve in the snug to a wedding for a hundred and twenty in the garden — with six bedrooms upstairs for whoever doesn't want the night to end."
        image="privateDining"
      >
        <a href="#enquire" className="btn btn-gold">
          Send an enquiry
        </a>
      </PageHero>

      <Section tone="cream">
        <SectionHead
          eyebrow="Our spaces"
          title="Four ways to gather"
          lede="Capacities are a guide — tell us about your event and we'll suggest the right space and layout."
        />
        <div className="reveal-stagger grid gap-8 md:grid-cols-2">
          {spaces.map((s) => (
            <article key={s.name} className="lift overflow-hidden rounded-[var(--radius-md)] bg-white shadow-soft">
              <div className="relative aspect-[16/9]">
                <Photo id={s.image} sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute left-4 top-4 flex gap-2">
                  <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-gold">
                    {s.seated} seated
                  </span>
                  {s.standing && (
                    <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-gold">
                      {s.standing} standing
                    </span>
                  )}
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-2xl">{s.name}</h3>
                <p className="mt-2 text-body">{s.desc}</p>
                <dl className="mt-4 space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <dt className="font-semibold text-ink">Ideal for:</dt>
                    <dd className="text-muted">{s.ideal}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold text-ink">Hire:</dt>
                    <dd className="text-muted">{s.hire}</dd>
                  </div>
                </dl>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
            <Photo id="celebration" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
          <div>
            <SectionHead
              eyebrow="Food & drink for groups"
              title="Set menus & feasting"
              lede="For parties of ten or more we ask you to choose from one of our set menus, so the kitchen can give everyone the same care at the same time."
            />
            <ul className="divide-y divide-dashed divide-black/15">
              {setMenus.map((m) => (
                <li key={m.name} className="flex items-baseline justify-between gap-6 py-4">
                  <div>
                    <p className="font-semibold text-ink">{m.name}</p>
                    <p className="text-sm text-muted">{m.desc}</p>
                  </div>
                  <p className="shrink-0 font-display text-lg text-wine">{m.price}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted">
              Drinks packages, welcome cocktails and a full wedding breakfast service are all
              available. Dietary requirements are never a problem — just tell us in advance.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="cream" id="enquire" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <SectionHead
            eyebrow="Enquire"
            title="Tell us about your event"
            lede="The more you can tell us, the better we can help. We'll come back to you within two working days with availability and a quote."
            center
          />
          <div className="rounded-[var(--radius-lg)] bg-white p-7 shadow-lift md:p-10">
            <EnquiryForm
              type="private-dining"
              submitLabel="Send private dining enquiry"
              fields={[
                { name: "date", label: "Preferred date", type: "date", required: true, half: true },
                { name: "guests", label: "Number of guests", type: "number", min: 2, max: 200, required: true, half: true },
                { name: "space", label: "Space", type: "select", half: true, options: ["Not sure — advise me", ...spaces.map((s) => s.name)] },
                { name: "eventType", label: "Type of event", type: "select", half: true, options: ["Birthday", "Wedding / reception", "Anniversary", "Wake / celebration of life", "Christening", "Corporate dinner or meeting", "Christmas party", "Other"] },
                { name: "budget", label: "Approximate budget per head (optional)", half: true, placeholder: "e.g. £40" },
                { name: "requests", label: "Tell us more", type: "textarea", placeholder: "Timings, food and drink ideas, accommodation, anything else…" },
              ]}
              note={
                <Notice>
                  Enquiries are answered personally by our events team. A date is held only
                  once we&rsquo;ve confirmed it with you and, for larger events, received a
                  deposit.
                </Notice>
              }
            />
          </div>
        </div>
      </Section>
    </>
  );
}
