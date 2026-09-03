import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ImageKey } from "@/data/images";

/**
 * BLOG
 * ------------------------------------------------------------------
 * Posts are Markdown files in /content/blog. To add a post, create a
 * new .md file with the same front-matter as the existing ones. The
 * file name becomes the URL (my-post.md → /blog/my-post).
 */
export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  image: ImageKey;
  category: string;
  content: string;
};

const dir = path.join(process.cwd(), "content", "blog");

export function getPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ""),
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        image: (data.image ?? "exteriorDay") as ImageKey,
        category: data.category ?? "News",
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
