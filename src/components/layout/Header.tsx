"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail } from "lucide-react";

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);
  const pathname = usePathname();

  const closeMega = useCallback(() => {
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 200);
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
        <div className="mx-auto flex h-7 max-w-6xl items-center justify-center gap-4 px-5 text-[11px] font-medium tracking-wide">
          <span className="text-lime font-bold">DELHI NCR</span>
          <span className="text-warm-white/20">·</span>
          <span className="text-warm-white/50">Free test rides</span>
          <span className="text-warm-white/20">·</span>
          <span className="text-warm-white/50">30-day support</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="border-b border-border/50 bg-background/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1">
            <span className="font-heading text-lg font-extrabold text-foreground tracking-tight">VYBE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
            <div
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <button
                onClick={() => megaOpen ? setMegaOpen(false) : openMega()}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  pathname.startsWith("/bikes")
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Bikes
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-300", megaOpen && "rotate-180")} />
              </button>
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
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button size="sm" variant="outline" asChild>
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* ═══ MEGA MENU ═══ */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full border-b border-border/50 bg-background/90 backdrop-blur-2xl",
          megaOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        style={{
          clipPath: megaOpen
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(48% 0, 52% 0, 52% 0, 48% 0)",
          transition: "clip-path 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Categories — clean, no colored avatars */}
            <div className="col-span-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Categories</p>
              <div className="grid grid-cols-2 gap-1">
                {categories.map((cat, i) => (
                  <Link
                    key={cat.slug}
                    href={`/bikes?category=${cat.slug}`}
                    className="group rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-all duration-300"
                    style={{
                      opacity: megaOpen ? 1 : 0,
                      transform: megaOpen ? "translateY(0)" : "translateY(6px)",
                      transition: `opacity 0.3s ease ${i * 0.04}s, transform 0.3s ease ${i * 0.04}s, background-color 0.2s`,
                    }}
                  >
                    <p className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">{cat.name}</p>
                    <p className="text-[11px] text-muted-foreground">{cat.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse by Need */}
            <div className="col-span-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Browse by need</p>
              <div className="space-y-0.5">
                {needs.map((need) => (
                  <Link
                    key={need.href}
                    href={need.href}
                    className="group flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{need.label}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links + Contact */}
            <div className="col-span-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Links</p>
              <div className="space-y-1">
                <Link href="/bikes" className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Browse all</Link>
                <Link href="/repairs" className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Repairs</Link>
                <Link href="/sell" className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Sell your bike</Link>
                <Link href="/contact" className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Contact</Link>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 space-y-1.5">
                <a href="tel:+919315405304" className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-3 w-3" /> +91 93154 05304
                </a>
                <a href="mailto:itsmeasius@gmail.com" className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-3 w-3" /> Email us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "border-t border-border/50 bg-background/90 backdrop-blur-2xl md:hidden transition-all duration-300 ease-out overflow-hidden",
          mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto max-w-6xl px-5 py-5">
          <nav className="space-y-0.5" aria-label="Mobile navigation">
            <Link
              href="/bikes"
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname.startsWith("/bikes") ? "text-foreground" : "text-muted-foreground"
              )}
            >
              Bikes
            </Link>
            <div className="ml-3 grid grid-cols-2 gap-0.5 py-1.5">
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/bikes?category=${cat.slug}`}
                  className="rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
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
                  "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4 pt-3 border-t border-border/50 space-y-1.5">
            <a href="tel:+919315405304" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" /> +91 93154 05304
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
