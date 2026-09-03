import type { Metadata } from "next";
import { PageHero, Section } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Accessibility",
  description: `Accessibility statement for the ${site.name} website and information about access at the pub and rooms.`,
  robots: { index: false },
};

export default function AccessibilityPage() {
  return (
    <>
      <PageHero eyebrow="Accessibility" title="Everyone's welcome" />
      <Section tone="cream">
        <div className="prose-brand mx-auto max-w-[70ch]">
          <h2>This website</h2>
          <p>
            We want everyone to be able to use this website. It has been built to follow the
            Web Content Accessibility Guidelines (WCAG) 2.2 at level AA: text and background
            colours meet contrast requirements, every image has a text description, all
            features work with a keyboard alone, and the site works with screen readers and
            at 200% zoom. If anything doesn&rsquo;t work for you, please tell us at{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> and we&rsquo;ll fix it.
          </p>
          <h2>At the pub</h2>
          <ul>
            <li>Level access from the car park to the bar and restaurant via the rear entrance.</li>
            <li>An accessible toilet on the ground floor.</li>
            <li>The Coach House bedroom has step-free access, a private entrance and a wet-room.</li>
            <li>Assistance dogs are welcome everywhere; all dogs are welcome in the bar and garden.</li>
            <li>Large-print menus are available — just ask.</li>
            <li>Two accessible parking bays by the rear entrance.</li>
          </ul>
          <p>
            Our building is nearly 700 years old, so some floors are uneven and the upstairs
            bedrooms are reached by a staircase. Please call us before your visit if you have
            particular requirements and we&rsquo;ll do everything we can to help.
          </p>
        </div>
      </Section>
    </>
  );
}
