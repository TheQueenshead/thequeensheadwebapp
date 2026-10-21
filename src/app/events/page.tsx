import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero, Photo, Section, SectionHead, Card } from "@/components/ui";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { events, recurring } from "@/data/events";
import { upcoming, groupByMonth, eventDateParts } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events & What's On",
  description:
    "Events at The Queen's Head, Littlebury. See what's coming up and sign up to our newsletter to hear about new events first.",
};

// Re-render once a day so past events disappear without a redeploy
export const revalidate = 86400;

export default function EventsPage() {
  const list = upcoming(events);
  const months = groupByMonth(list);

  return (
    <>
      <PageHero
        eyebrow="What's on"
        title="Events at the Queen's Head"
        lede="What's coming up at the pub. Join the newsletter to hear about new events first."
        image="liveMusic"
      >
        <a href="#newsletter" className="btn btn-gold">
          Get event news first
        </a>
      </PageHero>

      {/* Regulars */}
      {recurring.length > 0 && (
        <Section tone="white" className="!py-12">
          <div className="reveal-stagger grid gap-4 md:grid-cols-4">
            {recurring.map((r) => (
              <Card key={r.title} className="!p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-wine">{r.day}</p>
                <h2 className="mt-1 text-xl">{r.title}</h2>
                <p className="mt-1 text-sm text-muted">{r.desc}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Calendar */}
      <Section tone="cream">
        <SectionHead eyebrow="Calendar" title="Coming up" />
        {months.length === 0 && (
          <p className="text-muted">
            Nothing in the diary just now — sign up below and we&rsquo;ll tell you as soon as
            something&rsquo;s announced.
          </p>
        )}
        <div className="space-y-14">
          {months.map(([month, evs]) => (
            <div key={month}>
              <h3 className="mb-6 font-display text-2xl text-wine">{month}</h3>
              <ol className="reveal-stagger space-y-5">
                {evs.map((e) => {
                  const d = eventDateParts(e.date);
                  return (
                    <li
                      key={e.slug}
                      id={e.slug}
                      className="grid scroll-mt-28 gap-5 overflow-hidden rounded-[var(--radius-md)] bg-white shadow-soft md:grid-cols-[96px_220px_1fr]"
                    >
                      <time
                        dateTime={e.date}
                        className="flex flex-row items-center justify-center gap-2 bg-wine p-4 font-display text-white md:flex-col md:gap-0"
                      >
                        <span className="text-4xl font-bold leading-none">{d.day}</span>
                        <span className="text-xs uppercase tracking-widest">{d.mon}</span>
                        <span className="text-xs text-white/70 md:mt-1">{d.weekday.slice(0, 3)}</span>
                      </time>
                      {e.poster ? (
                        <a
                          href={e.poster}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative mx-6 block aspect-[2/3] max-w-[220px] overflow-hidden rounded-[var(--radius-sm)] bg-white md:mx-0 md:my-4 md:max-w-none md:rounded-none md:aspect-auto md:min-h-[300px]"
                          aria-label={`View the full poster for ${e.title}`}
                        >
                          <Image src={e.poster} alt={e.posterAlt ?? `Poster for ${e.title}`} fill sizes="220px" className="object-contain" />
                        </a>
                      ) : (
                        <div className="relative hidden md:block">
                          {e.image && <Photo id={e.image} sizes="220px" />}
                        </div>
                      )}
                      <div className="flex flex-col p-6 pt-0 md:pt-6">
                        <h4 className="text-2xl">{e.title}</h4>
                        <p className="mt-1 text-sm font-semibold text-wine">
                          {d.weekday} · {e.time}
                          {e.price ? ` · ${e.price}` : ""}
                        </p>
                        <p className="mt-3 flex-1 text-body">{e.desc}</p>
                        {e.bookable && (
                          <div className="mt-4">
                            <Link href={`/book`} className="btn btn-outline btn-sm">
                              Book for this event
                            </Link>
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>
      </Section>

      {/* Newsletter */}
      <Section tone="ink" id="newsletter">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHead
              eyebrow="Newsletter"
              title="Be the first to know"
              lede="Join the list and we'll email you when new events are announced — roughly once a month, never more."
              light
            />
          </div>
          <div className="rounded-[var(--radius-lg)] bg-white p-7 text-body md:p-9">
            <NewsletterForm />
          </div>
        </div>
      </Section>
    </>
  );
}
