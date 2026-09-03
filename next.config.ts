import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Stock stand-in photography lives on Unsplash until the client's own
    // photos arrive. Once real photos are dropped into /public/images this
    // block can be removed.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
