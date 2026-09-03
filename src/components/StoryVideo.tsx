"use client";

import { useState } from "react";
import { site } from "@/data/site";
import { Photo } from "./ui";
import type { ImageKey } from "@/data/images";

/**
 * The pub's story / promo video. Shows a poster with a play button; the
 * actual player only loads once someone presses play (keeps the page fast).
 * Configure in src/data/site.ts → video.
 */
export default function StoryVideo({ className = "" }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const { type, src, poster, title } = site.video;
  const hasVideo = Boolean(src);

  return (
    <div
      className={`relative aspect-video overflow-hidden rounded-[var(--radius-lg)] bg-ink shadow-lift ${className}`}
    >
      {playing && hasVideo ? (
        type === "mp4" ? (
          <video
            src={src}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
            aria-label={title}
          />
        ) : (
          <iframe
            src={
              type === "youtube"
                ? `https://www.youtube-nocookie.com/embed/${src}?autoplay=1&rel=0`
                : `https://player.vimeo.com/video/${src}?autoplay=1`
            }
            title={title}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        )
      ) : (
        <>
          <Photo id={poster as ImageKey} sizes="(max-width: 1180px) 100vw, 1180px" />
          <div className="absolute inset-0 bg-black/35" />
          <button
            type="button"
            onClick={() => hasVideo && setPlaying(true)}
            disabled={!hasVideo}
            aria-label={hasVideo ? `Play video: ${title}` : "Video coming soon"}
            className="absolute inset-0 grid place-items-center"
          >
            <span className="flex flex-col items-center gap-4">
              <span className="grid h-20 w-20 place-items-center rounded-full border-2 border-gold bg-white/95 text-wine shadow-lift transition-transform group-hover:scale-105">
                <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              <span className="font-display text-xl text-white drop-shadow">
                {hasVideo ? title : "Our story on film — coming soon"}
              </span>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
