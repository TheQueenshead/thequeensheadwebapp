import type { Metadata } from "next";
import { PageHero, Photo, Section, SectionHead, Card, Notice } from "@/components/ui";
import EnquiryForm from "@/components/forms/EnquiryForm";
import { vacancies, perks } from "@/data/careers";

export const metadata: Metadata = {
  title: "Careers — Join the Team",
  description:
    "Jobs at The Queen's Head, Littlebury. Current vacancies in the kitchen, front of house and housekeeping, and how to apply.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Come and work somewhere you'd choose to eat"
        lede="We're a small, friendly team in a beautiful old building, cooking and serving food we're proud of. If that sounds like your kind of place, we'd like to hear from you."
        image="team"
      >
        <a href="#apply" className="btn btn-gold">
          Apply or enquire
        </a>
      </PageHero>

      <Section tone="cream">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHead eyebrow="Vacancies" title={vacancies.length ? "Current openings" : "No vacancies right now"} />
            {vacancies.length === 0 && (
              <p className="text-body">
                We&rsquo;re fully staffed at the moment, but good people are always worth
                knowing about. Send us your details below and we&rsquo;ll keep them on file.
              </p>
            )}
            <div className="space-y-6">
              {vacancies.map((v) => (
                <Card key={v.title}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-2xl">{v.title}</h3>
                      <p className="mt-1 text-sm text-muted">{v.type}</p>
                    </div>
                    <span className="rounded-full bg-gold px-3 py-1 text-sm font-bold text-ink">{v.pay}</span>
                  </div>
                  <p className="mt-4 text-body">{v.summary}</p>
                  <h4 className="mt-4 font-body text-sm font-semibold uppercase tracking-wider text-wine">What you&rsquo;ll do</h4>
                  <ul className="mt-2 grid gap-1.5 text-sm sm:grid-cols-2">
                    {v.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2">
                        <span className="text-gold-dark" aria-hidden="true">◆</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                  <a href="#apply" className="btn btn-primary btn-sm mt-6">
                    Apply for this role
                  </a>
                </Card>
              ))}
            </div>
          </div>
          <aside>
            <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-[var(--radius-lg)] shadow-lift">
              <Photo id="chef" sizes="(max-width: 1024px) 100vw, 35vw" />
            </div>
            <Card>
              <h3 className="text-xl">Why work here</h3>
              <ul className="mt-3 space-y-2 text-sm text-body">
                {perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-gold-dark" aria-hidden="true">◆</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </Section>

      <Section tone="white" id="apply" className="scroll-mt-20">
        <div className="mx-auto max-w-3xl">
          <SectionHead
            eyebrow="Apply"
            title="Tell us about yourself"
            lede="No CV yet? Don't worry — a few lines about you and your experience is plenty to start a conversation."
            center
          />
          <div className="rounded-[var(--radius-lg)] bg-cream p-7 md:p-10">
            <EnquiryForm
              type="careers"
              submitLabel="Send application"
              fields={[
                { name: "role", label: "Role you're interested in", type: "select", required: true, options: [...vacancies.map((v) => v.title), "General enquiry / anything suitable"] },
                { name: "availability", label: "When could you start?", half: true, placeholder: "e.g. two weeks' notice" },
                { name: "cvLink", label: "Link to CV or LinkedIn (optional)", type: "url", half: true, placeholder: "https://" },
                { name: "experience", label: "A bit about you and your experience", type: "textarea", required: true },
              ]}
              note={
                <Notice>
                  Your details are only used to consider you for a role at The Queen&rsquo;s
                  Head and are kept for no more than six months. You can also email a CV to
                  us directly.
                </Notice>
              }
              successTitle="Application received"
              successBody="Thanks for getting in touch. We read every application and will reply within a week."
            />
          </div>
        </div>
      </Section>
    </>
  );
}
