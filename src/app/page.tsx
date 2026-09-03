import Link from "next/link";
import { Photo, Section, SectionHead, ImageTile, CTABand } from "@/components/ui";
import StoryVideo from "@/components/StoryVideo";
import Reviews from "@/components/Reviews";
import MapEmbed from "@/components/MapEmbed";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { site } from "@/data/site";
import { rooms } from "@/data/rooms";
import { events } from "@/data/events";
import { upcoming, eventDateParts } from "@/lib/events";

// Re-render once a day so past events disappear without a redeploy
export const revalidate = 86400;

export default function HomePage() {
  const nextEvents = upcoming(events).slice(0, 3);
  const featuredRooms = rooms.slice(0, 3);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 -z-10">
          <Photo id="exteriorEvening" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
        <div className="container-site w-full pb-16 pt-32 md:pb-24">
          <p className="eyebrow !text-gold mb-4">Littlebury · Saffron Walden · Essex</p>
          <h1 className="max-w-[14ch] text-5xl leading-[1.02] text-white md:text-7xl">
            A 14th-century inn with a very warm welcome
          </h1>
          <p className="mt-6 max-w-[54ch] text-lg text-white/85 md:text-xl">
            Seasonal food, local ales and six cosy bedrooms, a mile from Audley End
            and a world away from the everyday.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/book" className="btn btn-gold">
              Book a Table
            </Link>
            <Link href="/rooms" className="btn btn-outline-light">
              Stay the Night
            </Link>
            <Link href="/menu" className="btn btn-outline-light">
              See the Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- WELCOME ---------- */}
      <Section tone="cream">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow mb-3">Welcome</p>
            <h2 className="gold-rule text-3xl md:text-[2.75rem]">
              The living room of the village, since 1340
            </h2>
            <p className="mt-6 text-lg text-body">
              The Queen&rsquo;s Head has been feeding and watering travellers on the
              road between London and Cambridge for the best part of seven centuries.
              Today it&rsquo;s a proper village pub with a restaurant worth the drive,
              a bar you&rsquo;ll want to settle into, and six beautiful bedrooms
              upstairs.
            </p>
            <p className="mt-4 text-body">
              Everything we cook is made from scratch with produce from Essex and the
              counties next door. Everything we pour, we&rsquo;ve tasted first. And
              everyone who walks in gets the same welcome — whether it&rsquo;s your
              first visit or your five-hundredth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-primary">
                Our Story
              </Link>
              <Link href="/gallery" className="btn btn-outline">
                Gallery
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] shadow-lift">
              <Photo id="barInterior" sizes="(max-width: 1024px) 50vw, 30vw" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] shadow-lift">
              <Photo id="roast" sizes="(max-width: 1024px) 50vw, 30vw" />
            </div>
          </div>
        </div>
      </Section>

      {/* ---------- EAT / STAY / CELEBRATE ---------- */}
      <Section tone="white">
        <SectionHead
          eyebrow="What we do"
          title="Eat, drink, stay, celebrate"
          lede="Four good reasons to find us — and a few more once you're here."
          center
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <ImageTile href="/menu" image="steak" subtitle="Eat" title="Food & Drink" tall />
          <ImageTile href="/rooms" image="roomOne" subtitle="Stay" title="Six Bedrooms" tall />
          <ImageTile href="/events" image="liveMusic" subtitle="What's on" title="Events" tall />
          <ImageTile href="/private-dining" image="privateDining" subtitle="Celebrate" title="Private Dining" tall />
        </div>
      </Section>

      {/* ---------- VIDEO ---------- */}
      <Section tone="ink">
        <SectionHead
          eyebrow="Our story on film"
          title="Come and see for yourself"
          lede="A few minutes behind the bar, in the kitchen and around the village — the Queen's Head as our regulars know it."
          center
          light
        />
        <StoryVideo />
      </Section>

      {/* ---------- ROOMS ---------- */}
      <Section tone="cream">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow="Stay with us"
            title="Six rooms above the pub"
            lede="Oak beams, deep mattresses, proper breakfasts. Each room is different; all of them are quiet."
          />
          <Link href="/rooms" className="btn btn-outline mb-12 shrink-0">
            All rooms & rates
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredRooms.map((r) => (
            <Link
              key={r.slug}
              href={`/rooms#${r.slug}`}
              className="group overflow-hidden rounded-[var(--radius-md)] bg-white shadow-soft no-underline hover:no-underline"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Photo id={r.images[0]} className="transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl">{r.name}</h3>
                  <p className="shrink-0 font-display text-wine">
                    from <strong>£{r.from}</strong>
                  </p>
                </div>
                <p className="mt-1 text-sm text-muted">{r.short}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---------- EVENTS ---------- */}
      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <SectionHead
              eyebrow="What's on"
              title="Always something happening"
              lede="Quiz nights, live music, supper clubs and the odd oompah band. Sign up and we'll let you know first."
            />
            <NewsletterForm />
          </div>
          <ul className="space-y-4">
            {nextEvents.map((e) => {
              const d = eventDateParts(e.date);
              return (
                <li key={e.slug}>
                  <Link
                    href={`/events#${e.slug}`}
                    className="grid grid-cols-[72px_1fr] items-center gap-5 rounded-[var(--radius-md)] border border-black/5 bg-cream p-5 no-underline transition-shadow hover:shadow-lift hover:no-underline"
                  >
                    <time
                      dateTime={e.date}
                      className="grid place-items-center rounded-[var(--radius-sm)] bg-wine py-2 text-center font-display text-white"
                    >
                      <span className="text-2xl font-bold leading-none">{d.day}</span>
                      <span className="text-[0.7rem] uppercase tracking-widest">{d.mon}</span>
                    </time>
                    <div>
                      <h3 className="text-xl">{e.title}</h3>
                      <p className="text-sm text-muted">
                        {d.weekday} · {e.time}
                        {e.price ? ` · ${e.price}` : ""}
                      </p>
                    </div>
                  </Link>
                </li>
              );
            })}
            <li>
              <Link href="/events" className="btn btn-primary">
                Full events calendar
              </Link>
            </li>
          </ul>
        </div>
      </Section>

      <Reviews />

      {/* ---------- FIND US ---------- */}
      <Section tone="cream">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Find us"
              title="Just off the road to Cambridge"
              lede="Two miles north of Saffron Walden, a mile from Audley End House, and twenty minutes on foot from Audley End station."
            />
            <address className="not-italic leading-relaxed">
              <strong className="text-ink">{site.legalName}</strong>
              <br />
              {site.address.line1}, {site.address.town}
              <br />
              {site.address.county} {site.address.postcode}
            </address>
            <dl className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
              {site.kitchenHours.map((h) => (
                <div key={h.label} className="rounded-[var(--radius-sm)] bg-white px-4 py-3">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{h.label}</dt>
                  <dd className="font-medium text-ink">{h.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={site.map.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Get directions
              </a>
              <Link href="/contact" className="btn btn-outline">
                Contact & opening hours
              </Link>
            </div>
          </div>
          <MapEmbed />
        </div>
      </Section>

      <CTABand
        title="Hungry yet?"
        text="Tables go quickly at weekends. Send us a booking request and we'll confirm by email or phone."
        primary={{ href: "/book", label: "Book a Table" }}
        secondary={{ href: "/menu", label: "See the Menu" }}
      />
    </>
  );
}
