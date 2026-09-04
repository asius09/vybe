"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";

export function Footer() {
  const maskRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const el = maskRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--mx", `${x}%`);
    el.style.setProperty("--my", `${y}%`);

    const distFromCenter = Math.sqrt(Math.pow(x - 50, 2) + Math.pow(y - 50, 2));
    const maxDist = 50;
    const shrinkFactor = Math.max(0, 1 - distFromCenter / maxDist);
    const radius = 60 + shrinkFactor * 160;
    el.style.setProperty("--spotlight-radius", `${radius}px`);
  }, []);

  return (
    <footer className="bg-asphalt text-warm-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        {/* Links Grid */}
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-warm-white/25 mb-4">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/bikes" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">All Bikes</Link></li>
              <li><Link href="/bikes?category=city" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">City</Link></li>
              <li><Link href="/bikes?category=commuter" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">Commuter</Link></li>
              <li><Link href="/bikes?category=mountain" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">Mountain</Link></li>
              <li><Link href="/bikes?category=folding" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">Folding</Link></li>
              <li><Link href="/bikes?category=cargo" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">Cargo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-warm-white/25 mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link href="/repairs" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">Repairs</Link></li>
              <li><Link href="/sell" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">Sell Your Bike</Link></li>
              <li><Link href="/contact" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">Book a Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-warm-white/25 mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-sm text-warm-white/40">Delhi, India</li>
              <li><a href="tel:+919315405304" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">+91 93154 05304</a></li>
              <li><a href="mailto:itsmeasius@gmail.com" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">itsmeasius@gmail.com</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-warm-white/25 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/design-system" className="text-sm text-warm-white/40 hover:text-warm-white transition-colors">Design System</Link></li>
              <li><Link href="/admin/inventory" className="text-sm text-warm-white/25 hover:text-warm-white/50 transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ═══ E-BIKE IMAGE BAND ═══ */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt=""
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-asphalt via-transparent to-transparent" />
      </div>

      {/* ═══ VYBE WORDMARK — Very Bottom ═══ */}
      <div
        ref={maskRef}
        onPointerMove={handlePointerMove}
        className="relative w-full overflow-hidden cursor-default select-none bg-asphalt"
        style={{
          "--mx": "50%",
          "--my": "50%",
          "--spotlight-radius": "200px",
        } as React.CSSProperties}
      >
        {/* Background text */}
        <h2 className="font-heading text-[clamp(80px,20vw,280px)] font-extrabold leading-[0.85] text-warm-white/[0.04] tracking-tighter text-center px-4 py-8">
          VYBE
        </h2>

        {/* Spotlight reveal — bright text */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            maskImage: "radial-gradient(circle var(--spotlight-radius) at var(--mx) var(--my), black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(circle var(--spotlight-radius) at var(--mx) var(--my), black 0%, transparent 100%)",
          }}
        >
          <h2 className="font-heading text-[clamp(80px,20vw,280px)] font-extrabold leading-[0.85] text-warm-white tracking-tighter text-center px-4 py-8">
            VYBE
          </h2>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-6xl px-5 py-5 border-t border-warm-white/5 bg-asphalt">
        <div className="flex flex-col items-center justify-between gap-3 text-[11px] text-warm-white/20 md:flex-row">
          <p>&copy; {new Date().getFullYear()} VYBE Bikes</p>
          <div className="flex items-center gap-3">
            <span>Built for riders, by riders.</span>
            <a
              href="https://x.com/asius09"
              target="_blank"
              rel="noopener noreferrer"
              className="text-warm-white/25 hover:text-warm-white/60 transition-colors"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
