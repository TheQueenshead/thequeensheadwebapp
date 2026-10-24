import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Notice, CTABand } from "@/components/ui";
import MenuTabs from "@/components/MenuTabs";
import { menus, dietaryKey } from "@/data/menu";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { site } from "@/data/site";

export const metadata: Metadata = site.comingSoon.menu
  ? {
      title: "Menu — Coming Soon",
      description:
        "Our new seasonal menu at The Queen's Head, Littlebury is coming soon. Kitchen opening times and table bookings.",
    }
  : {
      title: "Menu — Food & Drink",
      description:
        "Spanish tapas, Mediterranean dining and British pub classics at The Queen's Head, Littlebury. Full menu with dietary information.",
    };

export default function MenuPage() {
  return site.comingSoon.menu ? <MenuComingSoon /> : <FullMenu />;
}

/** Shown while site.comingSoon.menu is true */
function MenuComingSoon() {
  return (
    <>
      <PageHero
        eyebrow="Food & drink"
        title="Our new menu is on its way"
        lede="We're putting the finishing touches to our seasonal menu. It'll be here very soon — in the meantime the kitchen is open and we'd love to see you."
        image="steak"
      >
        <Link href="/book" className="btn btn-gold">
          Book a table
        </Link>
        {site.phone && (
        <a href={site.phoneHref} className="btn btn-outline-light">
          Call {site.phone}
        </a>
        )}
      </PageHero>

      <Section tone="cream">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="rounded-[var(--radius-md)] bg-white p-7 shadow-soft">
            <h2 className="text-2xl">When the kitchen is open</h2>
            <dl className="mt-5 space-y-3">
              {site.kitchenHours.map((h) => (
                <div key={h.label} className="flex flex-wrap justify-between gap-x-6 border-b border-black/5 pb-3">
                  <dt className="font-semibold text-ink">{h.label}</dt>
                  <dd className="text-muted">{h.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6">
              <Notice>
                <p>
                  <strong>Allergies or dietary needs?</strong> Please tell us when you book and
                  again when you order — the team will talk you through what&rsquo;s on and adapt
                  a dish where we safely can.
                </p>
              </Notice>
            </div>
          </div>

          <div className="rounded-[var(--radius-md)] bg-white p-7 shadow-soft">
            <h2 className="text-2xl">Be the first to see it</h2>
            <p className="mb-5 mt-3 text-muted">
              Join our newsletter and we&rsquo;ll let you know as soon as the new menu is live.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </Section>

      <CTABand
        title="Hungry now?"
        text="Send a booking request and we'll confirm your table."
        primary={{ href: "/book", label: "Book a table" }}
        secondary={{ href: "/private-dining", label: "Private dining" }}
      />
    </>
  );
}

function FullMenu() {
  return (
    <>
      <PageHero
        eyebrow="Food & drink"
        title="Cooked from scratch, every day"
        lede="Spanish tapas, Mediterranean dining and British pub classics — small plates made for sharing, generous mains and a few old favourites done properly."
        image="steak"
      >
        <Link href="/book" className="btn btn-gold">
          Book a table
        </Link>
        <a href="#allergens" className="btn btn-outline-light">
          Allergen information
        </a>
      </PageHero>

      <Section tone="cream">
        <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          {site.kitchenHours.map((h) => (
            <p key={h.label}>
              <strong className="text-ink">{h.label}:</strong> {h.value}
            </p>
          ))}
        </div>
        <MenuTabs menus={menus} />
      </Section>

      <Section tone="white" id="allergens" className="!py-14">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl">Dietary key</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {dietaryKey.map((d) => (
                <li key={d.tag} className="flex items-center gap-3 text-sm">
                  <span className="tag">{d.tag}</span> {d.label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl">Allergens</h2>
            <Notice>
              <p>
                Our kitchen handles all 14 regulated
                allergens, so while we take every care we cannot guarantee any dish is
                completely free from traces. <strong>Please tell us about any allergy or
                intolerance when you book and again when you order</strong> — we&rsquo;re
                always happy to talk you through the menu or adapt a dish where we safely can.
              </p>
            </Notice>
            <p className="mt-4 text-sm text-muted">
              {site.showMenuPrices
                ? "Menus change with the seasons and availability; prices include VAT."
                : "Menus change with the seasons and availability. Please ask a member of the team for current prices."}
            </p>
          </div>
        </div>
      </Section>

      <CTABand
        title="Tables go quickly"
        text="The kitchen is open Wednesday to Saturday from 6pm. Send a booking request and we'll confirm your table."
        primary={{ href: "/book", label: "Book a table" }}
        secondary={{ href: "/private-dining", label: "Feasting menus for groups" }}
      />
    </>
  );
}
