import type { Metadata } from "next";
import { PageHero, Photo, Section, SectionHead, Notice, CTABand } from "@/components/ui";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gift Cards",
  description:
    "Give the gift of a meal, a drink or a night away at The Queen's Head, Littlebury. Enquire about gift cards.",
};


export default function GiftCardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift cards"
        title="Give someone a night at the pub"
        lede="A Queen's Head gift card is a lovely way to treat someone to dinner, drinks or a night in one of our rooms. Tell us what you have in mind and we'll arrange it."
        image="giftCard"
      >
        <a href="#enquire" className="btn btn-gold">
          Order a gift card
        </a>
      </PageHero>

      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
            <Photo id="dessert" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <SectionHead eyebrow="How it works" title="Simple, like it should be" />
            <ol className="reveal-stagger space-y-5">
              {[
                ["Tell us the amount", "Let us know the value you'd like and who it's for."],
                ["We get in touch", "We'll confirm and take payment over the phone or by bank transfer."],
                ["Choose delivery", "Collect the card from the bar, or we can post it to you or straight to the lucky recipient."],
                ["They enjoy it", "We'll explain exactly what it can be used for and how long it's valid when we confirm your order."],
              ].map(([t, d], i) => (
                <li key={t} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold font-display text-lg font-bold text-ink">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{t}</p>
                    <p className="text-sm text-muted">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section tone="cream" id="enquire" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <SectionHead
            eyebrow="Order"
            title="Gift card enquiry"
            lede="Fill this in and we'll be in touch to arrange payment and delivery. We'll reply as soon as we can."
            center
          />
          <div className="rounded-[var(--radius-lg)] bg-white p-7 shadow-lift md:p-10">
            <EnquiryForm
              type="gift-card"
              submitLabel="Send gift card enquiry"
              fields={[
                { name: "amount", label: "Gift card value (£)", type: "number", min: 1, required: true, half: true, placeholder: "100" },
                { name: "recipient", label: "Recipient's name (optional)", half: true },
                { name: "delivery", label: "Delivery preference", type: "select", required: true, options: ["Collect from the bar", "Post to me", "Post directly to the recipient"] },
                { name: "message", label: "Message for the card (optional)", type: "textarea", placeholder: "Happy birthday, Mum!" },
              ]}
              note={
                <Notice>
                  Gift cards are paid for over the phone or by bank transfer once we&rsquo;ve
                  confirmed your order — we don&rsquo;t take card details through the website.
                  Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.
                </Notice>
              }
              successTitle="Thanks — we'll be in touch"
              successBody="We'll call or email to arrange payment and get your gift card on its way."
            />
          </div>
        </div>
      </Section>
      <CTABand
        title="Not sure what to give?"
        text="Dinner for two, an evening with friends or a night in one of our rooms — have a look and we'll help you decide."
        primary={{ href: "/menu", label: "See the menu" }}
        secondary={{ href: "/rooms", label: "See the rooms" }}
      />

    </>
  );
}
