import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "./forms/NewsletterForm";
import { site } from "@/data/site";
import { footerNav } from "@/data/nav";
import { SocialLinks } from "./SocialLinks";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-site grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
        <div>
          <Logo light />
          <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-white/65">
            A restored 14th-century inn in the heart of Littlebury. Seasonal
            food, local ales, six cosy bedrooms and a warm Essex welcome.
          </p>
          <SocialLinks className="mt-6" />
        </div>

        <div>
          <h2 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Visit
          </h2>
          <ul className="space-y-2.5 text-sm">
            {footerNav.visit.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            More
          </h2>
          <ul className="space-y-2.5 text-sm">
            {footerNav.more.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-white/80 hover:text-gold">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Find us
          </h2>
          <address className="not-italic text-sm leading-relaxed text-white/80">
            {site.legalName}
            <br />
            {site.address.line1}, {site.address.town}
            <br />
            {site.address.county} {site.address.postcode}
            <br />
            <a href={site.phoneHref} className="hover:text-gold">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-gold">
              {site.email}
            </a>
          </address>
          <h2 className="mb-3 mt-7 font-body text-xs font-semibold uppercase tracking-[0.14em] text-gold">
            Newsletter
          </h2>
          <NewsletterForm compact />
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-site flex flex-wrap items-center justify-between gap-3 py-6 text-xs text-white/55">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
            <span>
              Website by{" "}
              <a href="https://savv8.co.uk" className="hover:text-white">
                Savv8
              </a>
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
