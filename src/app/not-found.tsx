import Link from "next/link";
import { Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section tone="cream" className="min-h-[60vh] flex items-center">
      <div className="mx-auto max-w-xl text-center">
        <p className="eyebrow mb-3">404</p>
        <h1 className="text-4xl md:text-5xl">This table doesn&rsquo;t exist</h1>
        <p className="mt-4 text-muted">
          The page you&rsquo;re after has moved or was never here. Let&rsquo;s get you back to
          the bar.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            Home
          </Link>
          <Link href="/menu" className="btn btn-outline">
            Menu
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact
          </Link>
        </div>
      </div>
    </Section>
  );
}
