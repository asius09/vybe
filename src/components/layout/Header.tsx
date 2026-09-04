"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, ArrowRight, Phone, Mail, MapPin } from "lucide-react";

const categories = [
  { name: "City", slug: "city", desc: "Smooth urban rides", color: "bg-lime/10 text-lime-deeper" },
  { name: "Commuter", slug: "commuter", desc: "Daily reliability", color: "bg-coral/10 text-coral" },
  { name: "Mountain", slug: "mountain", desc: "Trail power", color: "bg-purple/10 text-purple" },
  { name: "Hybrid", slug: "hybrid", desc: "Road + trail", color: "bg-lime/10 text-lime-deeper" },
  { name: "Folding", slug: "folding", desc: "Compact & portable", color: "bg-coral/10 text-coral" },
  { name: "Cargo", slug: "cargo", desc: "Haul anything", color: "bg-purple/10 text-purple" },
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
        <div className="mx-auto flex h-8 max-w-6xl items-center justify-center gap-4 px-5 text-[11px] font-medium tracking-wide">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-lime" />
            <span className="text-lime font-bold">DELHI NCR</span>
          </span>
          <span className="text-warm-white/20">|</span>
          <span className="text-warm-white/50">Free test rides</span>
          <span className="text-warm-white/20">·</span>
          <span className="text-warm-white/50">Serviced bikes</span>
          <span className="text-warm-white/20">·</span>
          <span className="text-warm-white/50">30-day support</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <span className="font-heading text-xl font-extrabold text-foreground tracking-tight">VYBE</span>
            <span className="text-[10px] font-bold text-muted-foreground tracking-widest">BIKES</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {/* Bikes with Mega Menu */}
            <div
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <button
                onClick={() => megaOpen ? setMegaOpen(false) : openMega()}
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  pathname.startsWith("/bikes")
                    ? "bg-muted text-foreground"
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
              <Link href="/contact">
                Get Started
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ═══ FULL-WIDTH MEGA MENU ═══ */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full border-b border-border bg-white/95 backdrop-blur-xl",
          megaOpen
            ? "pointer-events-auto"
            : "pointer-events-none"
        )}
        onMouseEnter={openMega}
        onMouseLeave={closeMega}
        style={{
          clipPath: megaOpen
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            : "polygon(45% 0, 55% 0, 55% 0, 45% 0)",
          transition: "clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Categories */}
            <div className="col-span-5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat, i) => (
                  <Link
                    key={cat.slug}
                    href={`/bikes?category=${cat.slug}`}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted/50 transition-all duration-300"
                    style={{
                      opacity: megaOpen ? 1 : 0,
                      transform: megaOpen ? "translateY(0)" : "translateY(8px)",
                      transition: `opacity 0.4s ease ${i * 0.05}s, transform 0.4s ease ${i * 0.05}s`,
                    }}
                  >
                    <span className={cn("h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold", cat.color)}>
                      {cat.name[0]}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground group-hover:text-lime-deeper transition-colors">{cat.name}</p>
                      <p className="text-[10px] text-muted-foreground">{cat.desc}</p>
                    </div>
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
                    className="group flex items-center justify-between rounded-lg px-3 py-2.5 hover:bg-muted/50 transition-colors"
                  >
                    <span className="text-sm text-foreground">{need.label}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>

              {/* Quick links */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Quick links</p>
                <div className="space-y-2">
                  <Link href="/bikes" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <span className="font-semibold">Browse all bikes</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link href="/repairs" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <span className="font-semibold">Repair services</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link href="/sell" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <span className="font-semibold">Sell your bike</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured + Contact */}
            <div className="col-span-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">Featured</p>
              <Link
                href="/bikes"
                className="block rounded-xl bg-muted/50 p-4 hover:bg-muted transition-colors mb-6"
              >
                <p className="text-sm font-semibold text-foreground">Latest arrivals</p>
                <p className="text-[10px] text-muted-foreground mt-1">See what&apos;s new in stock</p>
              </Link>

              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">Contact</p>
              <div className="space-y-2">
                <a href="tel:+919315405304" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-3 w-3" />
                  +91 93154 05304
                </a>
                <a href="mailto:itsmeasius@gmail.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="h-3 w-3" />
                  itsmeasius@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "border-t border-border bg-background/95 backdrop-blur-xl md:hidden transition-all duration-300 ease-out overflow-hidden",
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-auto max-w-6xl px-5 py-6">
          <nav className="space-y-1" aria-label="Mobile navigation">
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

          {/* Mobile contact */}
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            <a href="tel:+919315405304" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              +91 93154 05304
            </a>
            <a href="mailto:itsmeasius@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              itsmeasius@gmail.com
            </a>
          </div>

          <div className="mt-6">
            <Button className="w-full" asChild>
              <Link href="/contact">
                Get Started
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
