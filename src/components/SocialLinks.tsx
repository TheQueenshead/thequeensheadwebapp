import { site } from "@/data/site";

const icons = {
  facebook: (
    <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
  ),
  instagram: (
    <path d="M12 7.4A4.6 4.6 0 1 0 12 16.6 4.6 4.6 0 0 0 12 7.4zm0 7.6a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.9-7.8a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0zM12 3.2c2.9 0 3.2 0 4.3.1 1.1 0 1.7.2 2.1.4.5.2.9.4 1.3.9.4.4.7.8.9 1.3.2.4.3 1 .4 2.1.1 1.1.1 1.4.1 4.3s0 3.2-.1 4.3c0 1.1-.2 1.7-.4 2.1a3.5 3.5 0 0 1-2.2 2.2c-.4.2-1 .3-2.1.4-1.1.1-1.4.1-4.3.1s-3.2 0-4.3-.1c-1.1 0-1.7-.2-2.1-.4a3.5 3.5 0 0 1-2.2-2.2c-.2-.4-.3-1-.4-2.1C3.2 15.2 3.2 14.9 3.2 12s0-3.2.1-4.3c0-1.1.2-1.7.4-2.1.2-.5.4-.9.9-1.3.4-.4.8-.7 1.3-.9.4-.2 1-.3 2.1-.4C8.8 3.2 9.1 3.2 12 3.2z" />
  ),
  tripadvisor: (
    <path d="M12 5.5c-2.6 0-5 .7-7 1.9H2l1.6 1.8a5 5 0 1 0 7.2 6.8L12 17.7l1.2-1.7a5 5 0 1 0 7.2-6.8L22 7.4h-3A12.5 12.5 0 0 0 12 5.5zm-5 4.4a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6zm10 0a3.3 3.3 0 1 1 0 6.6 3.3 3.3 0 0 1 0-6.6zM12 7.2c1.6 0 3.1.3 4.4.9a5 5 0 0 0-4.4 3.9 5 5 0 0 0-4.4-3.9c1.3-.6 2.8-.9 4.4-.9zM7 11.6a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zm10 0a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
  ),
};

export function SocialLinks({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const links = [
    { key: "facebook", label: "Facebook", href: site.social.facebook },
    { key: "instagram", label: "Instagram", href: site.social.instagram },
    { key: "tripadvisor", label: "TripAdvisor", href: site.social.tripadvisor },
  ] as const;
  const live = links.filter((l) => l.href);
  if (!live.length) return null;
  return (
    <ul className={`flex gap-3 ${className}`} aria-label="Social media">
      {live.map((l) => (
        <li key={l.key}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${site.name} on ${l.label}`}
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
              dark
                ? "border-black/25 text-ink hover:bg-wine hover:text-white hover:border-wine"
                : "border-white/35 text-white hover:bg-gold hover:text-ink hover:border-gold"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              {icons[l.key]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
