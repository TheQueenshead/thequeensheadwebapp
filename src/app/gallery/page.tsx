import type { Metadata } from "next";
import { PageHero, Section, CTABand } from "@/components/ui";
import GalleryGrid from "@/components/GalleryGrid";
import { gallery } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of The Queen's Head, Littlebury — the pub, our rooms, food and drink, the team and the surrounding Essex countryside.",
};


export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look around"
        lede="The pub, the rooms, the food, the people and the countryside on our doorstep."
        image="barInterior"
      />
      <Section tone="cream">
        <GalleryGrid items={gallery} />
      </Section>
      <CTABand
        title="Better in person"
        primary={{ href: "/book", label: "Book a table" }}
        secondary={{ href: "/rooms", label: "Stay the night" }}
      />
    </>
  );
}
