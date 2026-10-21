import Link from "next/link";

/**
 * Text-and-monogram logo built from the brand system. Once the client
 * supplies a logo file, swap the inner markup for an <Image />.
 */
export default function Logo({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="The Queen's Head, Littlebury — home"
      className={`flex items-center gap-2 no-underline sm:gap-3 hover:no-underline ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full max-[359px]:hidden sm:h-11 sm:w-11 border-2 border-gold bg-wine font-display text-lg font-semibold text-gold"
      >
        Q
      </span>
      <span className="leading-none whitespace-nowrap">
        <span
          className={`block font-display text-[1.15rem] font-semibold sm:text-[1.35rem] ${
            light ? "text-white" : "text-ink"
          }`}
        >
          The Queen&rsquo;s Head
        </span>
        <span
          className={`mt-1 hidden text-[0.62rem] font-medium uppercase tracking-[0.18em] sm:block ${
            light ? "text-gold" : "text-muted"
          }`}
        >
          Littlebury · Est. 14th Century
        </span>
      </span>
    </Link>
  );
}
