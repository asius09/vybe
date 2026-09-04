"use client";

import { useRef, useCallback, useState } from "react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Shop",
    items: [
      { label: "All Bikes", href: "/bikes" },
      { label: "City", href: "/bikes?category=city" },
      { label: "Commuter", href: "/bikes?category=commuter" },
      { label: "Mountain", href: "/bikes?category=mountain" },
      { label: "Folding", href: "/bikes?category=folding" },
      { label: "Cargo", href: "/bikes?category=cargo" },
    ],
  },
  {
    title: "Services",
    items: [
      { label: "Repairs", href: "/repairs" },
      { label: "Sell Your Bike", href: "/sell" },
      { label: "Book a Service", href: "/contact" },
    ],
  },
  {
    title: "Contact",
    items: [
      { label: "+91 93154 05304", href: "tel:+919315405304" },
      { label: "itsmeasius@gmail.com", href: "mailto:itsmeasius@gmail.com" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Design System", href: "/design-system" },
      { label: "Admin", href: "/admin/inventory", muted: true },
    ],
  },
];

export function Footer() {
  const maskRef = useRef<HTMLDivElement>(null);
  const [spotlightRadius, setSpotlightRadius] = useState(200);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = maskRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);
    const dist = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2));
    setSpotlightRadius(60 + Math.max(0, 1 - dist / 50) * 160);
  }, []);

  const linkClass = "text-sm text-warm-white/40 hover:text-warm-white transition-colors";

  return (
    <footer className="bg-asphalt text-warm-white">
      <div className="mx-auto max-w-6xl px-5 pt-16">
        <div className="grid gap-10 md:grid-cols-4">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-warm-white/25 mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className={item.muted ? "text-sm text-warm-white/25 hover:text-warm-white/50 transition-colors" : linkClass}
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-sm text-warm-white/40">{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ Bottom Bar ═══ */}
      <div className="px-5 py-5 border-t mt-8 border-warm-white/5">
        <div className="flex flex-col items-center justify-between gap-3 text-[11px] text-warm-white/20 md:flex-row">
          <p>&copy; {new Date().getFullYear()} VYBE Bikes</p>
          <div className="flex items-center gap-3">
            <span>Built for riders, by riders.</span>
            <a href="https://x.com/_asius" target="_blank" rel="noopener noreferrer" className="text-warm-white/25 hover:text-warm-white/60 transition-colors">
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* ═══ VYBE WORDMARK — Touches very bottom ═══ */}
      <div
        ref={maskRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setSpotlightRadius(200)}
        className="relative w-full overflow-hidden cursor-default select-none leading-none"
        style={{ "--mx": "50%", "--my": "50%", "--spotlight-radius": `${spotlightRadius}px` } as React.CSSProperties}
      >
        <h2 className="font-heading text-[clamp(80px,22vw,550px)] font-extrabold leading-[0.82] text-warm-white/[0.04] tracking-tighter text-center px-0 pt-4 m-0 select-none">
          VYBE
        </h2>
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle var(--spotlight-radius) at var(--mx) var(--my), black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle var(--spotlight-radius) at var(--mx) var(--my), black 0%, transparent 100%)",
          }}
        >
          <h2 className="font-heading text-[clamp(80px,22vw,550px)] font-extrabold leading-[0.82] text-warm-white tracking-tighter text-center px-0 pt-4 m-0 select-none">
            VYBE
          </h2>
        </div>
      </div>
    </footer>
  );
}
