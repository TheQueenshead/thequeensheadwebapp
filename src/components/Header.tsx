"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { mainNav } from "@/data/nav";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/10 bg-cream/95 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-cream/85 ${
        scrolled ? "header-scrolled" : ""
      }`}
    >
      <nav
        className="container-site flex items-center justify-between gap-4 py-3"
        aria-label="Main"
      >
        <Logo />

        <ul className="hidden items-center gap-5 whitespace-nowrap lg:flex xl:gap-6">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`border-b-2 py-1 text-[0.95rem] font-medium transition-colors hover:border-wine hover:text-wine ${
                  isActive(item.href)
                    ? "border-wine text-wine"
                    : "border-transparent text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link href="/rooms" className="btn btn-outline btn-sm hidden whitespace-nowrap md:inline-flex">
            Stay
          </Link>
          <Link href="/book" className="btn btn-primary btn-sm whitespace-nowrap">
            Book a Table
          </Link>
          <button
            type="button"
            className="ml-1 inline-flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg border-2 border-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span className={`block h-0.5 w-5 bg-ink ${open ? "opacity-0" : ""}`} />
            <span
              className={`block h-0.5 w-5 bg-ink transition-transform ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full h-[calc(100vh-100%)] overflow-y-auto border-t border-black/10 bg-cream lg:hidden"
      >
        <ul className="container-site flex flex-col gap-1 py-6">
          {[{ href: "/", label: "Home" }, ...mainNav, { href: "/faq", label: "FAQ" }, { href: "/gift-cards", label: "Gift Cards" }, { href: "/careers", label: "Careers" }].map(
            (item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 font-display text-xl ${
                    pathname === item.href ? "bg-white text-wine" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ),
          )}
          <li className="mt-4 flex flex-wrap gap-3 px-3">
            <Link href="/book" className="btn btn-primary">
              Book a Table
            </Link>
            <Link href="/rooms" className="btn btn-outline">
              Book a Room
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
