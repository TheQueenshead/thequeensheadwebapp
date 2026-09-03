import { site } from "@/data/site";

/** Structured data so Google understands this is a pub, restaurant and inn. */
export default function JsonLd() {
  const dayMap: Record<string, string> = {
    Monday: "Mo", Tuesday: "Tu", Wednesday: "We", Thursday: "Th", Friday: "Fr", Saturday: "Sa", Sunday: "Su",
  };
  const openingHours = site.hours
    .filter((h) => h.open !== "Closed")
    .map((h) => `${dayMap[h.day]} ${h.open}-${h.close}`);

  const data = {
    "@context": "https://schema.org",
    "@type": ["Restaurant", "BarOrPub", "LodgingBusiness"],
    name: site.legalName,
    description: site.description,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    servesCuisine: "British",
    priceRange: "££",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.line1,
      addressLocality: site.address.town,
      addressRegion: "Essex",
      postalCode: site.address.postcode,
      addressCountry: "GB",
    },
    openingHours,
    sameAs: Object.values(site.social),
    acceptsReservations: "True",
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: "Dog friendly", value: true },
      { "@type": "LocationFeatureSpecification", name: "Free Wi-Fi", value: true },
      { "@type": "LocationFeatureSpecification", name: "Car park", value: true },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
