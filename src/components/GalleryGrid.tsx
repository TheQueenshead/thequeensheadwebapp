"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { img, type ImageKey } from "@/data/images";

type Item = { id: ImageKey; cat: string; wide?: boolean };

export default function GalleryGrid({ items }: { items: Item[] }) {
  const cats = ["All", ...Array.from(new Set(items.map((i) => i.cat)))];
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<number | null>(null);

  const visible = cat === "All" ? items : items.filter((i) => i.cat === cat);

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

      <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:auto-rows-[220px]">
        {visible.map((item, i) => {
          const { src, alt } = img(item.id);
          return (
            <li key={item.id} className={item.wide ? "col-span-2 row-span-2" : ""}>
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
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
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
            <div className="relative aspect-[3/2] w-full">
              <Image src={img(visible[open].id).src} alt={img(visible[open].id).alt} fill sizes="100vw" className="object-contain" />
            </div>
            <figcaption className="mt-3 text-center text-sm text-white/80">{img(visible[open].id).alt}</figcaption>
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
