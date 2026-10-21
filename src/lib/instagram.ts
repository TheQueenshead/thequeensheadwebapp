import type { GalleryItem } from "@/components/GalleryGrid";

/**
 * INSTAGRAM GALLERY (via Behold — behold.so)
 * ------------------------------------------------------------------
 * The pub connects its Instagram account at behold.so, creates a
 * "JSON feed" and pastes the feed URL into BEHOLD_FEED_URL, e.g.
 *   BEHOLD_FEED_URL=https://feeds.behold.so/AbCdEf123
 * Behold keeps the Instagram connection alive; this site re-reads the
 * feed at most once an hour. If the feed isn't set (or is down) the
 * gallery falls back to the photos listed in src/data/gallery.ts.
 */

type Size = { mediaUrl: string; width: number; height: number };
type Sizes = Partial<Record<"small" | "medium" | "large" | "full", Size>>;

type BeholdPost = {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  sizes?: Sizes;
  altText?: string;
  prunedCaption?: string;
  children?: { sizes?: Sizes; altText?: string }[];
};

/** Hour-long cache — the gallery page revalidates on the same schedule */
export const INSTAGRAM_REVALIDATE = 3600;

/** How many posts to show */
const LIMIT = 24;

const clip = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

export async function getInstagramPhotos(): Promise<GalleryItem[]> {
  const url = process.env.BEHOLD_FEED_URL;
  if (!url) return [];

  try {
    const res = await fetch(url, { next: { revalidate: INSTAGRAM_REVALIDATE } });
    if (!res.ok) throw new Error(`Behold feed returned ${res.status}`);
    const feed = (await res.json()) as { posts?: BeholdPost[] };

    const items: GalleryItem[] = [];
    for (const post of feed.posts ?? []) {
      // Carousels: use the top-level image, or the first slide's.
      // Videos: Behold's sizes are the video's still frame.
      const sizes = post.sizes?.large ? post.sizes : post.children?.[0]?.sizes;
      const grid = sizes?.large ?? sizes?.medium;
      if (!grid) continue;

      const caption = post.prunedCaption?.trim() ?? "";
      const alt =
        post.altText?.trim() ||
        post.children?.[0]?.altText?.trim() ||
        (caption ? clip(caption, 120) : "Photo from The Queen's Head on Instagram");

      items.push({
        key: post.id,
        src: grid.mediaUrl,
        fullSrc: (sizes?.full ?? grid).mediaUrl,
        alt,
        caption: caption ? clip(caption, 220) : undefined,
        href: post.permalink,
        isVideo: post.mediaType === "VIDEO",
      });
      if (items.length >= LIMIT) break;
    }
    return items;
  } catch (err) {
    console.error("Instagram (Behold) feed failed — showing fallback gallery", err);
    return [];
  }
}
