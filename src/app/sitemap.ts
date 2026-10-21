import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { getPosts, hasBlog } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/menu", priority: 0.9, freq: "weekly" },
    { path: "/rooms", priority: 0.9, freq: "monthly" },
    { path: "/book", priority: 0.9, freq: "monthly" },
    { path: "/events", priority: 0.8, freq: "weekly" },
    { path: "/private-dining", priority: 0.7, freq: "monthly" },
    { path: "/gallery", priority: 0.5, freq: "monthly" },
    { path: "/gift-cards", priority: 0.6, freq: "monthly" },
    { path: "/faq", priority: 0.5, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/careers", priority: 0.5, freq: "monthly" },
  ];

  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: new Date(),
      changeFrequency: p.freq,
      priority: p.priority,
    })),
    ...(hasBlog() ? [{ url: `${site.url}/blog`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 }] : []),
    ...getPosts().map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
