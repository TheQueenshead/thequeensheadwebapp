import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.legalName} collects and uses personal information from this website.`,
  robots: { index: false },
};

/** TEMPLATE — have the client review before launch. */
export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" />
      <Section tone="cream">
        <div className="prose-brand mx-auto max-w-[70ch]">
          <p>
            <strong>{site.legalName}</strong> (&ldquo;we&rdquo;) respects your privacy. This
            policy explains what information we collect through this website and how we use it.
          </p>
          <h2>What we collect</h2>
          <p>
            When you send an enquiry (table booking, room availability, private dining, gift
            card, careers or general contact) we collect the details you enter — typically your
            name, email address, phone number and the content of your message. When you join
            our newsletter we collect your email address and, optionally, your first name.
          </p>
          <h2>How we use it</h2>
          <p>
            We use enquiry details only to respond to and fulfil your request. Newsletter
            details are used only to send you our newsletter, which you can unsubscribe from at
            any time using the link in every email. We do not sell or share your information
            with third parties for marketing.
          </p>
          <h2>Who processes it</h2>
          <p>
            Enquiry and newsletter emails are delivered by Resend (resend.com), acting as our
            data processor. This website is hosted by Vercel. Both operate under GDPR-compliant
            terms. Embedded Google Maps may set cookies governed by Google&rsquo;s privacy policy.
          </p>
          <h2>How long we keep it</h2>
          <p>
            Enquiries are retained for up to 12 months; job applications for up to 6 months;
            newsletter subscriptions until you unsubscribe.
          </p>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete the personal information we hold about you
            at any time by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. If
            you&rsquo;re unhappy with how we&rsquo;ve handled your data you can complain to the
            Information Commissioner&rsquo;s Office (ico.org.uk).
          </p>
          <p className="text-sm text-muted">Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}.</p>
        </div>
      </Section>
    </>
  );
}
