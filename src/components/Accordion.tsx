"use client";

import { useState } from "react";

export type AccordionItem = { q: string; a: string };

export default function Accordion({ items, idPrefix = "acc" }: { items: AccordionItem[]; idPrefix?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const expanded = open === i;
        const panelId = `${idPrefix}-panel-${i}`;
        const btnId = `${idPrefix}-btn-${i}`;
        return (
          <div key={item.q} className="overflow-hidden rounded-[var(--radius-sm)] border border-black/8 bg-white">
            <h3 className="m-0 font-body text-base">
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-ink hover:bg-cream/60"
              >
                {item.q}
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-2xl leading-none text-wine transition-transform ${expanded ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!expanded}
              className="px-5 pb-5 text-body"
            >
              <p className="m-0 leading-relaxed">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
