import { site } from "@/data/site";

export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[var(--radius-lg)] border border-black/8 shadow-lift ${className}`}>
      <iframe
        src={site.map.embedSrc}
        title={`Map showing ${site.legalName}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="block h-[380px] w-full border-0"
      />
    </div>
  );
}
