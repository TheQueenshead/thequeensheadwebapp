import Image from "next/image";
import Link from "next/link";
import { img, type ImageKey } from "@/data/images";

/* ---------- Photo: next/image wrapper keyed to images.ts ---------- */
export function Photo({
  id,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fill = true,
}: {
  id: ImageKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
}) {
  const { src, alt } = img(id);
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}

/* ---------- Page hero (inner pages) ---------- */
export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  image?: ImageKey;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden hero-gradient text-white">
      {image && (
        <>
          <div className="absolute inset-0 -z-10">
            <Photo id={image} sizes="100vw" priority className="opacity-40" />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </>
      )}
      <div className="container-site py-16 md:py-24">
        {eyebrow && <p className="eyebrow !text-gold mb-3">{eyebrow}</p>}
        <h1 className="max-w-[16ch] text-4xl text-white md:text-6xl">{title}</h1>
        {lede && <p className="mt-5 max-w-[60ch] text-lg text-white/85">{lede}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

/* ---------- Section wrapper ---------- */
export function Section({
  children,
  tone = "cream",
  className = "",
  id,
}: {
  children: React.ReactNode;
  tone?: "cream" | "white" | "ink" | "wine";
  className?: string;
  id?: string;
}) {
  const tones = {
    cream: "bg-cream",
    white: "bg-white",
    ink: "bg-ink text-white [&_h2]:text-white [&_h3]:text-white [&_.eyebrow]:!text-gold",
    wine: "bg-wine text-white [&_h2]:text-white [&_h3]:text-white [&_.eyebrow]:!text-gold",
  };
  return (
    <section id={id} className={`py-16 md:py-24 ${tones[tone]} ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lede,
  center = false,
  light = false,
}: {
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`mb-12 max-w-[680px] ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`gold-rule text-3xl md:text-[2.6rem] ${center ? "center" : ""}`}>{title}</h2>
      {lede && <p className={`mt-5 text-lg ${light ? "text-white/80" : "text-muted"}`}>{lede}</p>}
    </div>
  );
}

/* ---------- Big photo tile with overlay (Pig-hotel style) ---------- */
export function ImageTile({
  href,
  image,
  title,
  subtitle,
  className = "",
  tall = false,
}: {
  href: string;
  image: ImageKey;
  title: string;
  subtitle?: string;
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group relative block overflow-hidden rounded-[var(--radius-md)] no-underline hover:no-underline ${
        tall ? "aspect-[3/4]" : "aspect-[4/3]"
      } ${className}`}
    >
      <Photo
        id={image}
        className="transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
        {subtitle && (
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-gold">{subtitle}</p>
        )}
        <h3 className="flex items-center gap-2 text-2xl text-white">
          {title}
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </h3>
      </div>
    </Link>
  );
}

/* ---------- Call-to-action band ---------- */
export function CTABand({
  title,
  text,
  primary,
  secondary,
  tone = "wine",
}: {
  title: string;
  text?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  tone?: "wine" | "ink";
}) {
  return (
    <Section tone={tone} className="!py-14">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-3xl md:text-4xl">{title}</h2>
          {text && <p className="mt-2 max-w-[56ch] text-white/85">{text}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={primary.href} className="btn btn-gold">
            {primary.label}
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn btn-outline-light">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Card ---------- */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-[var(--radius-md)] border border-black/5 bg-white p-7 shadow-soft ${className}`}>
      {children}
    </div>
  );
}

/* ---------- Scope note (things the client should know) ---------- */
export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-sm)] border-l-4 border-wine bg-cream px-5 py-4 text-sm">
      {children}
    </div>
  );
}
