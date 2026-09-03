import { site } from "@/data/site";
import { Section, SectionHead } from "./ui";

function Stars({ n }: { n: number }) {
  return (
    <p className="tracking-[3px] text-gold-dark" aria-label={`${n} out of 5 stars`}>
      {"★".repeat(n)}
      {"☆".repeat(5 - n)}
    </p>
  );
}

export default function Reviews() {
  return (
    <Section tone="white">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHead
          eyebrow="Kind words"
          title="What our guests say"
          lede="We're proud of our reviews — and prouder still of the regulars who keep coming back."
        />
        <a
          href={site.map.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-12 inline-flex items-center gap-3 rounded-full border border-black/10 bg-cream px-5 py-3 text-sm font-semibold shadow-soft hover:border-wine"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-white font-display text-lg font-bold text-wine">
            G
          </span>
          <span>
            {site.googleRating.score} ★ on Google · {site.googleRating.count} reviews
          </span>
          <span aria-hidden="true">→</span>
        </a>
      </div>

      <ul className="grid gap-6 md:grid-cols-3">
        {site.reviews.map((r) => (
          <li key={r.name} className="flex flex-col rounded-[var(--radius-md)] bg-cream p-7">
            <Stars n={r.rating} />
            <blockquote className="mt-3 flex-1 text-[1.02rem] leading-relaxed">
              &ldquo;{r.text}&rdquo;
            </blockquote>
            <footer className="mt-5 text-sm">
              <strong className="text-ink">{r.name}</strong>
              <span className="text-muted"> · via {r.source}</span>
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  );
}
