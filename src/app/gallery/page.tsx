import type { Metadata } from "next";
import { PageHero, Section, CTABand } from "@/components/ui";
import GalleryGrid, { type GalleryItem } from "@/components/GalleryGrid";
import { gallery } from "@/data/gallery";
import { img } from "@/data/images";
import { site } from "@/data/site";
import { getInstagramPhotos } from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of The Queen's Head, Littlebury — the pub, our rooms, food and drink, the team and the surrounding Essex countryside.",
};

// Pick up new Instagram posts hourly (matches INSTAGRAM_REVALIDATE)
export const revalidate = 3600;

/** Used when the Instagram feed isn't set up or can't be reached */
const fallback: GalleryItem[] = gallery.map((g) => ({ key: g.id, ...img(g.id), cat: g.cat, wide: g.wide }));

export default async function GalleryPage() {
  const instagram = await getInstagramPhotos();
  const fromInstagram = instagram.length > 0;
  // Make every ninth Instagram photo a big feature tile
  const items = fromInstagram ? instagram.map((p, i) => ({ ...p, wide: i % 9 === 0 })) : fallback;

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look around"
        lede={
          fromInstagram
            ? "Straight from our Instagram — the pub, the food, the people and whatever's been happening lately."
            : "The pub, the rooms, the food, the people and the countryside on our doorstep."
        }
        image="barInterior"
      >
        {fromInstagram && (
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            Follow us on Instagram
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </PageHero>
      <Section tone="cream">
        <GalleryGrid items={items} />
      </Section>
      <CTABand
        title="Better in person"
        primary={{ href: "/book", label: "Book a table" }}
        secondary={{ href: "/rooms", label: "Stay the night" }}
      />
    </>
  );
}
