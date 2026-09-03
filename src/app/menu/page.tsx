import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, Notice, CTABand } from "@/components/ui";
import MenuTabs from "@/components/MenuTabs";
import { menus, dietaryKey } from "@/data/menu";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Menu — Food & Drink",
  description:
    "Seasonal British pub food, Sunday roasts, local cask ales and wine at The Queen's Head, Littlebury. Full menu with prices, dietary tags and allergen information.",
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Food & drink"
        title="Cooked from scratch, every day"
        lede="Seasonal British food built on produce from Essex and its neighbours, alongside local ales and a wine list we've tasted our way through."
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
                Allergens are listed under each dish. Our kitchen handles all 14 regulated
                allergens, so while we take every care we cannot guarantee any dish is
                completely free from traces. <strong>Please tell us about any allergy or
                intolerance when you book and again when you order</strong> — we&rsquo;re
                always happy to talk you through the menu or adapt a dish where we safely can.
              </p>
            </Notice>
            <p className="mt-4 text-sm text-muted">
              Menus change with the seasons and availability; prices include VAT. A
              discretionary 10% service charge is added to tables of six or more and shared
              in full among the team.
            </p>
          </div>
        </div>
      </Section>

      <CTABand
        title="Sunday roast is booking up"
        text="Served 12–5pm every Sunday. Send a booking request and we'll confirm your table."
        primary={{ href: "/book", label: "Book a table" }}
        secondary={{ href: "/private-dining", label: "Feasting menus for groups" }}
      />
    </>
  );
}
