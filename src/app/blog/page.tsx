import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Photo, Section } from "@/components/ui";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { getPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — News & Local Guides",
  description:
    "News from The Queen's Head, Littlebury: seasonal menus, events, the history of the inn and our guides to Saffron Walden, Audley End and the local countryside.",
};

export default function BlogPage() {
  const posts = getPosts();
  const [first, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="News, notes & local guides"
        lede="What's new on the menu, what's coming up, and our favourite things to do within a few miles of the front door."
      />

      <Section tone="cream">
        {first && (
          <Link
            href={`/blog/${first.slug}`}
            className="group mb-14 grid overflow-hidden rounded-[var(--radius-lg)] bg-white shadow-lift no-underline hover:no-underline lg:grid-cols-2"
          >
            <div className="relative aspect-[4/3] lg:aspect-auto">
              <Photo id={first.image} sizes="(max-width: 1024px) 100vw, 50vw" className="transition-transform duration-700 group-hover:scale-105" priority />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-12">
              <p className="eyebrow mb-3">{first.category}</p>
              <h2 className="text-3xl md:text-4xl">{first.title}</h2>
              <p className="mt-4 text-body">{first.excerpt}</p>
              <p className="mt-6 text-sm text-muted">
                <time dateTime={first.date}>{formatDate(first.date)}</time>
              </p>
              <span className="mt-6 font-semibold text-wine">Read more →</span>
            </div>
          </Link>
        )}

        <div className="reveal-stagger grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <article key={p.slug} className="group lift overflow-hidden rounded-[var(--radius-md)] bg-white shadow-soft">
              <Link href={`/blog/${p.slug}`} className="block no-underline hover:no-underline">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Photo id={p.image} sizes="(max-width: 768px) 100vw, 33vw" className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <p className="eyebrow mb-2 !text-[0.68rem]">{p.category}</p>
                  <h3 className="text-2xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-body">{p.excerpt}</p>
                  <p className="mt-4 text-xs text-muted">
                    <time dateTime={p.date}>{formatDate(p.date)}</time>
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-3">Newsletter</p>
          <h2 className="text-3xl">Get these in your inbox</h2>
          <p className="mb-8 mt-3 text-white/80">Roughly once a month: new menus, upcoming events, local tips.</p>
          <div className="rounded-[var(--radius-lg)] bg-white p-6 text-body">
            <NewsletterForm />
          </div>
        </div>
      </Section>
    </>
  );
}
