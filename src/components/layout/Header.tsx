"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown, ArrowRight, Phone, ShoppingCart, User, MapPin } from "lucide-react";
import { useLocation } from "@/hooks/use-location";

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
  { label: "Weekend trails", href: "/bikes?category=mountain" },
  { label: "Family errands", href: "/bikes?category=cargo" },
  { label: "Compact storage", href: "/bikes?category=folding" },
];

export function Header() {
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  const openMega = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback(() => {
    timeoutRef.current = setTimeout(() => setMegaOpen(false), 150);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  const locationText = location.city || location.country || "Your area";

  return (
    <header className="sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-asphalt text-warm-white">
        <div className="mx-auto flex h-7 max-w-6xl items-center justify-center gap-4 px-5 text-[10.5px] font-heading font-medium tracking-wider text-warm-white/75 uppercase">
          <span className="flex items-center gap-1.5 text-warm-white/60">
            <MapPin className="h-3 w-3 text-lime" />
            {locationText}
          </span>
          <span className="text-warm-white/20">·</span>
          <span>Free test rides</span>
          <span className="text-warm-white/20">·</span>
          <span>30-day support</span>
          <span className="text-warm-white/20">·</span>
          <span>Inspected & serviced</span>
        </div>
      </div>

      {/* Main Nav */}
      <div className="border-b border-border/40 bg-warm-white/70 backdrop-blur-2xl backdrop-saturate-200 shadow-[0_4px_24px_rgba(0,0,0,0.03)] supports-[backdrop-filter]:bg-warm-white/60">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
          {/* Logo */}
          <Link href="/" className="flex items-baseline gap-1 group">
            <span className="font-heading text-xl sm:text-2xl font-black text-foreground tracking-[0.14em] uppercase group-hover:opacity-85 transition-opacity">
              VYBE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            <div
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
            >
              <button
                onClick={() => megaOpen ? setMegaOpen(false) : openMega()}
                className={cn(
                  "flex items-center gap-1 rounded-full px-3.5 py-1.5 font-heading text-xs font-bold uppercase tracking-wider transition-colors duration-200",
                  pathname.startsWith("/bikes")
                    ? "text-foreground bg-foreground/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
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
                  "rounded-full px-3.5 py-1.5 font-heading text-xs font-bold uppercase tracking-wider transition-colors duration-200",
                  pathname === link.href
                    ? "text-foreground bg-foreground/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              href="/contact"
              className={cn(
                "flex items-center gap-2 rounded-full border border-border/80 bg-background/50 px-4 py-1.5 font-heading text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs",
                pathname === "/contact"
                  ? "text-foreground bg-foreground/10 border-foreground/30"
                  : "text-foreground hover:bg-foreground hover:text-warm-white hover:border-foreground"
              )}
            >
              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-foreground/10">
                <User className="h-2.5 w-2.5" />
              </div>
              <span>Login</span>
            </Link>
            <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border/60 bg-background/50 text-muted-foreground hover:text-foreground hover:border-border hover:bg-foreground/5 transition-all" aria-label="Shopping cart">
              <ShoppingCart className="h-3.5 w-3.5" />
            </button>
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
            {/* Categories */}
            <div className="col-span-5">
              <p className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-muted-foreground mb-4">Categories</p>
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
                    <p className="font-heading text-sm font-bold text-foreground group-hover:text-foreground transition-colors">{cat.name}</p>
                    <p className="text-[11px] text-muted-foreground font-body">{cat.desc}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse by Need */}
            <div className="col-span-4">
              <p className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-muted-foreground mb-4">Browse by need</p>
              <div className="space-y-0.5">
                {needs.map((need) => (
                  <Link
                    key={need.href}
                    href={need.href}
                    className="group flex items-center justify-between rounded-lg px-3 py-2 hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-heading text-xs font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{need.label}</span>
                    <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick links + Contact */}
            <div className="col-span-3">
              <p className="text-[10px] font-heading font-extrabold uppercase tracking-widest text-muted-foreground mb-4">Links</p>
              <div className="space-y-1">
                <Link href="/bikes" className="block rounded-lg px-3 py-2 font-heading text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Browse all</Link>
                <Link href="/repairs" className="block rounded-lg px-3 py-2 font-heading text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Repairs</Link>
                <Link href="/sell" className="block rounded-lg px-3 py-2 font-heading text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Sell your bike</Link>
                <Link href="/contact" className="block rounded-lg px-3 py-2 font-heading text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">Contact</Link>
              </div>
              <div className="mt-4 pt-3 border-t border-border/50 space-y-1.5">
                <a href="tel:+919315405304" className="flex items-center gap-1.5 font-heading text-[11px] font-bold text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="h-3 w-3" /> +91 93154 05304
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE NAV ═══ */}
      <div
        className="md:hidden overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-2xl"
        style={{
          maxHeight: mobileOpen ? "500px" : "0",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-4">
          <nav className="space-y-1" aria-label="Mobile navigation">
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
            <div className="flex gap-2 mb-3">
              <Link
                href="/contact"
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-foreground text-background py-2.5 text-sm font-bold hover:bg-foreground/90 transition-colors"
              >
                <User className="h-3.5 w-3.5" />
                Login
              </Link>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground hover:bg-muted/50 transition-colors" aria-label="Shopping cart">
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
            <a href="tel:+919315405304" className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-3.5 w-3.5" /> +91 93154 05304
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
