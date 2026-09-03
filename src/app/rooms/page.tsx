import type { Metadata } from "next";
import { PageHero, Photo, Section, SectionHead, Notice } from "@/components/ui";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { rooms, roomsInfo } from "@/data/rooms";

export const metadata: Metadata = {
  title: "Rooms — Stay at the Inn",
  description:
    "Six characterful bedrooms above a 14th-century pub in Littlebury, near Saffron Walden and Audley End. Breakfast included, dogs welcome, free parking. Check availability.",
};

export default function RoomsPage() {
  return (
    <>
      <PageHero
        eyebrow="Stay with us"
        title="Six rooms, seven centuries of sleep"
        lede="Oak beams, deep mattresses and a proper breakfast in the morning. Every room is different; all of them are quiet."
        image="roomSix"
      >
        <a href="#enquire" className="btn btn-gold">
          Check availability
        </a>
      </PageHero>

      <Section tone="cream">
        <div className="reveal-stagger mb-14 grid gap-4 sm:grid-cols-3">
          {[
            { k: "Check-in", v: roomsInfo.checkIn },
            { k: "Check-out", v: roomsInfo.checkOut },
            { k: "Breakfast", v: "Included, 8–10am" },
          ].map((x) => (
            <div key={x.k} className="rounded-[var(--radius-md)] bg-white p-5 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">{x.k}</p>
              <p className="mt-1 font-display text-xl text-ink">{x.v}</p>
            </div>
          ))}
        </div>

        <div className="space-y-16">
          {rooms.map((r, i) => (
            <article
              key={r.slug}
              id={r.slug}
              className={`reveal grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
            >
              <div className="grid grid-cols-3 gap-3">
                <div className="relative col-span-3 aspect-[4/3] overflow-hidden rounded-[var(--radius-md)] shadow-lift">
                  <Photo id={r.images[0]} sizes="(max-width: 1024px) 100vw, 50vw" />
                </div>
                {r.images[1] && (
                  <div className="relative col-span-3 aspect-[3/1] overflow-hidden rounded-[var(--radius-md)]">
                    <Photo id={r.images[1]} sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {r.dogFriendly && <span className="tag">Dog friendly</span>}
                  {r.accessible && <span className="tag">Step-free access</span>}
                </div>
                <h2 className="mt-3 text-3xl md:text-4xl">{r.name}</h2>
                <p className="mt-2 font-display text-xl text-wine">
                  from £{r.from} <span className="text-base text-muted">per night, incl. breakfast</span>
                </p>
                <p className="mt-4 text-body">{r.desc}</p>
                <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-[var(--radius-sm)] bg-white px-3 py-2">
                    <dt className="text-xs text-muted">Bed</dt>
                    <dd className="font-semibold">{r.bed}</dd>
                  </div>
                  <div className="rounded-[var(--radius-sm)] bg-white px-3 py-2">
                    <dt className="text-xs text-muted">Sleeps</dt>
                    <dd className="font-semibold">{r.sleeps}</dd>
                  </div>
                  <div className="rounded-[var(--radius-sm)] bg-white px-3 py-2">
                    <dt className="text-xs text-muted">Size</dt>
                    <dd className="font-semibold">{r.size}</dd>
                  </div>
                </dl>
                <ul className="mt-5 grid gap-1.5 text-sm sm:grid-cols-2">
                  {r.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-gold-dark" aria-hidden="true">
                        ◆
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <a href={`#enquire`} className="btn btn-primary mt-7">
                  Enquire about {r.name}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <SectionHead
              eyebrow="Good to know"
              title="The small print, kept small"
              lede={roomsInfo.breakfast}
            />
            <ul className="space-y-3 text-body">
              {roomsInfo.policies.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="text-gold-dark" aria-hidden="true">
                    ◆
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
            <Photo id="breakfast" sizes="(max-width: 1024px) 100vw, 55vw" />
          </div>
        </div>
      </Section>

      <Section tone="cream" id="enquire" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <SectionHead
            eyebrow="Availability enquiry"
            title="Check availability"
            lede="Tell us when you'd like to come and which room you have in mind. We'll reply with availability and how to confirm your booking — usually within a few hours."
            center
          />
          <div className="rounded-[var(--radius-lg)] bg-white p-7 shadow-lift md:p-10">
            <EnquiryForm
              type="room"
              submitLabel="Send availability enquiry"
              fields={[
                { name: "checkIn", label: "Check-in date", type: "date", required: true, half: true },
                { name: "checkOut", label: "Check-out date", type: "date", required: true, half: true },
                { name: "room", label: "Preferred room", type: "select", half: true, options: ["Any room", ...rooms.map((r) => r.name)] },
                { name: "adults", label: "Adults", type: "number", min: 1, max: 12, required: true, half: true },
                { name: "dogs", label: "Bringing a dog?", type: "select", half: true, options: ["No", "Yes — one dog", "Yes — two dogs"] },
                { name: "requests", label: "Anything else we should know?", type: "textarea", placeholder: "Special occasion, dietary needs, late arrival…" },
              ]}
              note={
                <Notice>
                  This is an availability enquiry rather than an instant booking. We&rsquo;ll
                  confirm availability and take your booking by email or phone — nothing is
                  reserved until you hear from us.
                </Notice>
              }
              successTitle="Thanks — we'll check the diary"
              successBody="We'll email you shortly with availability and how to confirm your stay."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
