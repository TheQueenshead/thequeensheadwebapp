import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Photo, Section, CTABand } from "@/components/ui";
import { getPost, getPosts, formatDate } from "@/lib/blog";
import { img } from "@/data/images";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date, images: [img(post.image).src] },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = getPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    image: img(post.image).src,
    author: { "@type": "Organization", name: site.legalName },
    publisher: { "@type": "Organization", name: site.legalName },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article>
        <header className="relative isolate overflow-hidden hero-gradient text-white">
          <div className="absolute inset-0 -z-10">
            <Photo id={post.image} sizes="100vw" priority className="opacity-35" />
          </div>
          <div className="container-site py-16 md:py-24">
            <p className="mb-4 text-sm text-gold">
              <Link href="/blog" className="text-gold hover:underline">Blog</Link>
              <span aria-hidden="true"> / </span>
              {post.category}
            </p>
            <h1 className="max-w-[20ch] text-4xl text-white md:text-6xl">{post.title}</h1>
            <p className="mt-5 text-white/80">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </p>
          </div>
        </header>

        <Section tone="cream">
          <div className="mx-auto max-w-[70ch]">
            <p className="text-xl leading-relaxed text-muted">{post.excerpt}</p>
            <div className="prose-brand mt-10 text-[1.05rem]">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>
          </div>
        </Section>
      </article>

      {others.length > 0 && (
        <Section tone="white">
          <h2 className="mb-8 text-3xl">More from the blog</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {others.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group grid gap-5 no-underline hover:no-underline sm:grid-cols-[200px_1fr]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-md)]">
                  <Photo id={p.image} sizes="200px" className="transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div>
                  <p className="eyebrow mb-1 !text-[0.68rem]">{p.category}</p>
                  <h3 className="text-xl">{p.title}</h3>
                  <p className="mt-1 text-sm text-body">{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      )}

      <CTABand
        title="Come and see us"
        primary={{ href: "/book", label: "Book a table" }}
        secondary={{ href: "/rooms", label: "Stay the night" }}
      />
    </>
  );
}
