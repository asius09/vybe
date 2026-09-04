"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  {
    href: "/bikes",
    label: "Shop",
    children: [
      { href: "/bikes", label: "All Bikes" },
      { href: "/bikes?category=city", label: "City" },
      { href: "/bikes?category=commuter", label: "Commuter" },
      { href: "/bikes?category=mountain", label: "Mountain" },
      { href: "/bikes?category=hybrid", label: "Hybrid" },
      { href: "/bikes?category=folding", label: "Folding" },
      { href: "/bikes?category=cargo", label: "Cargo" },
    ],
  },
  { href: "/repairs", label: "Repairs" },
  { href: "/sell", label: "Sell" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <span className="font-heading text-xl font-extrabold text-foreground tracking-tight">VYBE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <div
              key={link.href}
              className="relative"
              onMouseEnter={() => link.children && setOpenDropdown(link.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  pathname === link.href || pathname.startsWith(link.href)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {link.children && <ChevronDown className="h-3 w-3" />}
              </Link>

              {/* Dropdown */}
              {link.children && openDropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 rounded-card border border-border bg-white shadow-vybe-md py-2 min-w-[180px]">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button size="sm" asChild>
            <Link href="/contact">Get Started →</Link>
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

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-5 pb-5 pt-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-card px-4 py-3 text-sm font-semibold transition-colors block",
                    pathname === link.href
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
                {link.children && (
                  <div className="ml-4 flex flex-col gap-0.5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setMobileOpen(false)}
                        className="rounded-card px-4 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-4">
            <Button className="w-full" asChild>
              <Link href="/contact" onClick={() => setMobileOpen(false)}>Get Started →</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
