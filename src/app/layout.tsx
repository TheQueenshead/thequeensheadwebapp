import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/data/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";

// Brand fonts, self-hosted (variable weight) — no Google request, faster, GDPR-friendly.
const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/fraunces-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = localFont({
  src: [
    { path: "../fonts/work-sans.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/work-sans-italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-work-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Pub, Restaurant & Rooms in Littlebury, Essex`,
    template: `%s | ${site.name}, Littlebury`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: site.name,
    title: `${site.name}, Littlebury`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${workSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <JsonLd />
      </body>
    </html>
  );
}
