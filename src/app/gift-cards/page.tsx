import type { Metadata } from "next";
import { PageHero, Photo, Section, SectionHead, Card, Notice } from "@/components/ui";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gift Cards",
  description:
    "Give the gift of a meal, a Sunday roast or a night away at The Queen's Head, Littlebury. Gift cards for any amount, valid for 12 months.",
};

const ideas = [
  { title: "Dinner for two", amount: "£100", desc: "Three courses and a bottle of wine by the fire." },
  { title: "Sunday roast for four", amount: "£120", desc: "The family favourite, with puddings all round." },
  { title: "A night away", amount: "£175", desc: "Bed, breakfast and a welcome drink for two." },
  { title: "The whole weekend", amount: "£400", desc: "Two nights, two dinners, two very long breakfasts." },
];

export default function GiftCardsPage() {
  return (
    <>
      <PageHero
        eyebrow="Gift cards"
        title="Give someone a night at the pub"
        lede="A Queen's Head gift card can be spent on anything — a pint, a Sunday roast, a three-course dinner or a night in one of our rooms. Any value, valid for twelve months."
        image="giftCard"
      >
        <a href="#enquire" className="btn btn-gold">
          Order a gift card
        </a>
      </PageHero>

      <Section tone="cream">
        <SectionHead eyebrow="Ideas" title="Not sure how much? Here's what popular amounts buy" />
        <div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ideas.map((i) => (
            <Card key={i.title} className="text-center">
              <p className="font-display text-4xl text-wine">{i.amount}</p>
              <h3 className="mt-2 text-xl">{i.title}</h3>
              <p className="mt-1 text-sm text-muted">{i.desc}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
            <Photo id="dessert" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
          <div>
            <SectionHead eyebrow="How it works" title="Simple, like it should be" />
            <ol className="reveal-stagger space-y-5">
              {[
                ["Tell us the amount", "Any value from £20 upwards, and who it's for."],
                ["We get in touch", "We'll confirm and take payment over the phone or by bank transfer."],
                ["Choose delivery", "Collect a beautifully presented card from the bar, or we'll post it first class anywhere in the UK."],
                ["They enjoy it", "Valid for 12 months against food, drink or a stay. Any unspent balance stays on the card."],
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
            lede="Fill this in and we'll be in touch to arrange payment and delivery. Or just call us — it's often quickest."
            center
          />
          <div className="rounded-[var(--radius-lg)] bg-white p-7 shadow-lift md:p-10">
            <EnquiryForm
              type="gift-card"
              submitLabel="Send gift card enquiry"
              fields={[
                { name: "amount", label: "Gift card value (£)", type: "number", min: 20, required: true, half: true, placeholder: "100" },
                { name: "recipient", label: "Recipient's name (optional)", half: true },
                { name: "delivery", label: "Delivery preference", type: "select", required: true, options: ["Collect from the bar", "Post to me", "Post directly to the recipient"] },
                { name: "message", label: "Message for the card (optional)", type: "textarea", placeholder: "Happy birthday, Mum!" },
              ]}
              note={
                <Notice>
                  Gift cards are paid for over the phone or by bank transfer once we&rsquo;ve
                  confirmed your order — we don&rsquo;t take card details through the website.
                  Questions? Call {site.phone}.
                </Notice>
              }
              successTitle="Thanks — we'll be in touch"
              successBody="We'll call or email to arrange payment and get your gift card on its way."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
