"use client";

import { useEffect, useRef, useState } from "react";
import { Photo } from "./ui";
import { site } from "@/data/site";
import type { ImageKey } from "@/data/images";

/**
 * Full-bleed background video for the home page hero.
 * - Muted, looping, no controls — purely atmospheric (like thepighotel.com)
 * - Shows the poster photo first, then fades the video in once it can play
 * - Falls back to the photo when: no video file is set, the visitor prefers
 *   reduced motion, the browser blocks autoplay, or the data-saver flag is on
 * Configure in src/data/site.ts → heroVideo.
 */
export default function HeroVideo() {
  const { src, poster } = site.heroVideo;
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [useVideo, setUseVideo] = useState(false);

  useEffect(() => {
    if (!src) return;
    // Decide after first paint so the poster is on screen straight away
    const id = requestAnimationFrame(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Respect data-saver / very slow connections
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      const slow = conn?.saveData || conn?.effectiveType === "2g" || conn?.effectiveType === "slow-2g";
      if (!reduce && !slow) setUseVideo(true);
    });
    return () => cancelAnimationFrame(id);
  }, [src]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !useVideo) return;
    const tryPlay = () => v.play().catch(() => setUseVideo(false));
    if (v.readyState >= 3) tryPlay();
    else v.addEventListener("canplay", tryPlay, { once: true });
  }, [useVideo]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ink">
      {/* Poster always renders first — it's the LCP image and the fallback */}
      <Photo
        id={poster as ImageKey}
        sizes="100vw"
        priority
        className={`hero-photo transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {useVideo && (
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          disablePictureInPicture
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setReady(true)}
          onError={() => setUseVideo(false)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
}
