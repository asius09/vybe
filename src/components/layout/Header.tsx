"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const categories = [
  { name: "City", slug: "city", desc: "Smooth urban rides" },
  { name: "Commuter", slug: "commuter", desc: "Daily reliability" },
  { name: "Mountain", slug: "mountain", desc: "Trail power" },
  { name: "Hybrid", slug: "hybrid", desc: "Road + trail" },
  { name: "Folding", slug: "folding", desc: "Compact & portable" },
  { name: "Cargo", slug: "cargo", desc: "Haul anything" },
];

const needs = [
  { label: "Daily commute", href: "/bikes?category=city" },
  { label: "Weekend rides", href: "/bikes?category=hybrid" },
  { label: "Long range", href: "/bikes?category=commuter" },
  { label: "Compact storage", href: "/bikes?category=folding" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const pathname = usePathname();

  const closeMega = useCallback(() => {
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  const openMega = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaOpen(true);
  }, []);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-asphalt text-warm-white">
        <div className="mx-auto flex h-8 max-w-6xl items-center justify-center gap-4 px-5 text-[11px] font-medium tracking-wide">
          <span className="text-lime font-bold">DELHI NCR</span>
          <span className="text-warm-white/30">|</span>
          <span className="text-warm-white/60">Free test rides</span>
          <span className="text-warm-white/30">·</span>
          <span className="text-warm-white/60">Serviced bikes</span>
          <span className="text-warm-white/30">·</span>
          <span className="text-warm-white/60">30-day support</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-heading text-xl font-extrabold text-foreground tracking-tight">VYBE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {/* Bikes with Mega Menu */}
            <div
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <Link
                href="/bikes"
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  pathname.startsWith("/bikes")
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Bikes
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", megaOpen && "rotate-180")} />
              </Link>

              {/* Mega Menu */}
              {megaOpen && (
                <div
                  ref={megaRef}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[560px] rounded-card border border-border bg-white shadow-vybe-lg p-6"
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <div className="grid grid-cols-2 gap-6">
                    {/* Categories */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Categories</p>
                      <div className="grid grid-cols-2 gap-1">
                        {categories.map((cat) => (
                          <Link
                            key={cat.slug}
                            href={`/bikes?category=${cat.slug}`}
                            className="group rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors"
                          >
                            <p className="text-sm font-semibold text-foreground group-hover:text-lime-deeper transition-colors">{cat.name}</p>
                            <p className="text-[10px] text-muted-foreground">{cat.desc}</p>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Browse by Need + Featured */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Browse by need</p>
                      <div className="space-y-0.5 mb-5">
                        {needs.map((need) => (
                          <Link
                            key={need.href}
                            href={need.href}
                            className="group flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors"
                          >
                            <span className="text-sm text-foreground">{need.label}</span>
                            <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>

                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Featured</p>
                      <Link
                        href="/bikes"
                        className="block rounded-lg bg-muted/50 px-3 py-2 hover:bg-muted transition-colors"
                      >
                        <p className="text-sm font-semibold text-foreground">Latest arrivals</p>
                        <p className="text-[10px] text-muted-foreground">See what&apos;s new in stock</p>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Other Links */}
            {[
              { href: "/repairs", label: "Repairs" },
              { href: "/sell", label: "Sell" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  pathname === link.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button size="sm" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-6xl px-5 py-6">
            <nav className="space-y-1">
              <Link
                href="/bikes"
                className={cn(
                  "block rounded-card px-4 py-3 text-base font-semibold transition-colors",
                  pathname.startsWith("/bikes") ? "bg-muted text-foreground" : "text-muted-foreground"
                )}
              >
                Bikes
              </Link>
              <div className="ml-4 grid grid-cols-2 gap-1 py-2">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/bikes?category=${cat.slug}`}
                    className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
              {[
                { href: "/repairs", label: "Repairs" },
                { href: "/sell", label: "Sell" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-card px-4 py-3 text-base font-semibold transition-colors",
                    pathname === link.href ? "bg-muted text-foreground" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-6">
              <Button className="w-full" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
