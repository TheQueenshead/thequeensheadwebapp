"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** One photo in the gallery — from src/data/gallery.ts or Instagram */
export type GalleryItem = {
  key: string;
  src: string;
  /** Bigger version for the lightbox (defaults to src) */
  fullSrc?: string;
  alt: string;
  /** Shown under the photo in the lightbox (defaults to alt) */
  caption?: string;
  /** Drives the filter buttons; no buttons are shown if no item has one */
  cat?: string;
  wide?: boolean;
  /** Link to the original post */
  href?: string;
  isVideo?: boolean;
};

// Instagram images arrive already resized and compressed by Behold, so
// skip Next's image optimiser for them (saves Vercel image quota).
const isRemoteReady = (src: string) => src.includes("behold.pictures");

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const catList = Array.from(new Set(items.map((i) => i.cat).filter((c): c is string => Boolean(c))));
  const cats = catList.length > 1 ? ["All", ...catList] : [];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const visible = cat === "All" ? items : items.filter((i) => i.cat === cat);
  const gridRef = useRef<HTMLUListElement>(null);

  // Re-run the stagger animation each time the filter changes
  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    el.classList.remove("is-visible");
    const id = requestAnimationFrame(() => el.classList.add("is-visible"));
    return () => cancelAnimationFrame(id);
  }, [cat]);

  // Keyboard: Esc closes, arrows navigate
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((o) => (o === null ? o : (o + 1) % visible.length));
      if (e.key === "ArrowLeft") setOpen((o) => (o === null ? o : (o - 1 + visible.length) % visible.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, visible.length]);

  return (
    <>
      {cats.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter photos">
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                cat === c ? "border-wine bg-wine text-white" : "border-black/10 bg-white hover:border-wine hover:text-wine"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <ul ref={gridRef} className="reveal-stagger grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[220px]">
        {visible.map((item, i) => {
          const { src, alt } = item;
          return (
            <li key={item.key} className={item.wide ? "col-span-2 row-span-2" : ""}>
              <button
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block h-full w-full overflow-hidden rounded-[var(--radius-md)] aspect-square md:aspect-auto"
                aria-label={`Open photo: ${alt}`}
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  unoptimized={isRemoteReady(src)}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.isVideo && (
                  <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-black/55 text-white" aria-hidden="true">
                    <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
            aria-label="Close"
            autoFocus
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + visible.length) % visible.length); }}
            className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 md:grid"
            aria-label="Previous photo"
          >
            ‹
          </button>
          <figure className="relative max-h-[85vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh] w-full">
              <Image
                src={visible[open].fullSrc ?? visible[open].src}
                alt={visible[open].alt}
                fill
                sizes="100vw"
                unoptimized={isRemoteReady(visible[open].fullSrc ?? visible[open].src)}
                className="object-contain"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {visible[open].caption ?? visible[open].alt}
              {visible[open].href && (
                <a
                  href={visible[open].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block font-semibold text-gold hover:text-white"
                >
                  {visible[open].isVideo ? "Watch on Instagram" : "View on Instagram"} ↗
                </a>
              )}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % visible.length); }}
            className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 md:grid"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
