"use client";

import { useState } from "react";
import type { Menu } from "@/data/menu";
import { site } from "@/data/site";

export default function MenuTabs({ menus }: { menus: Menu[] }) {
  const [active, setActive] = useState(menus[0].id);
  const menu = menus.find((m) => m.id === active) ?? menus[0];

  return (
    <div>
      {menus.length > 1 && (
        <div role="tablist" aria-label="Menus" className="mb-10 flex flex-wrap gap-2">
          {menus.map((m) => {
            const selected = m.id === active;
            return (
              <button
                key={m.id}
                role="tab"
                id={`tab-${m.id}`}
                aria-selected={selected}
                aria-controls={`panel-${m.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(m.id)}
                onKeyDown={(e) => {
                  const i = menus.findIndex((x) => x.id === active);
                  if (e.key === "ArrowRight") setActive(menus[(i + 1) % menus.length].id);
                  if (e.key === "ArrowLeft") setActive(menus[(i - 1 + menus.length) % menus.length].id);
                }}
                className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                  selected
                    ? "border-wine bg-wine text-white"
                    : "border-black/10 bg-white text-ink hover:border-wine hover:text-wine"
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      )}

      <div role="tabpanel" id={`panel-${menu.id}`} aria-labelledby={`tab-${menu.id}`}>
        <div className="mb-10 max-w-[68ch]">
          <h2 className="text-3xl md:text-4xl">{menu.label}</h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-wine">{menu.served}</p>
          {menu.intro && <p className="mt-4 text-body">{menu.intro}</p>}
        </div>

        <div className="grid gap-x-14 gap-y-12 lg:grid-cols-2">
          {menu.sections.map((s) => (
            <section key={s.title} aria-labelledby={`sec-${menu.id}-${s.title}`}>
              <h3 id={`sec-${menu.id}-${s.title}`} className="gold-rule text-2xl">
                {s.title}
              </h3>
              {s.note && <p className="mt-3 text-sm italic text-muted">{s.note}</p>}
              <ul className="mt-4 divide-y divide-dashed divide-black/15">
                {s.items.map((d) => (
                  <li key={d.name} className="flex justify-between gap-6 py-4">
                    <div>
                      <p className="font-semibold text-ink">{d.name}</p>
                      {d.desc && <p className="mt-0.5 text-sm text-muted">{d.desc}</p>}
                      {(d.tags?.length || d.allergens?.length) && (
                        <div className="mt-2 flex flex-wrap items-center gap-1.5">
                          {d.tags?.map((t) => (
                            <span key={t} className="tag">
                              {t}
                            </span>
                          ))}
                          {d.allergens?.length ? (
                            <span className="text-xs text-muted">
                              Contains: {d.allergens.join(", ")}
                            </span>
                          ) : null}
                        </div>
                      )}
                    </div>
                    <p className="shrink-0 font-display text-lg font-semibold text-wine">
                      {!site.showMenuPrices
                        ? "Ask"
                        : d.price.includes("£")
                          ? d.price
                          : d.price.replace(/(\d+\.\d{2})/g, "£$1")}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
