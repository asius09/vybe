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
  }, []);

  return (
    <footer className="bg-asphalt text-warm-white">
      <div className="mx-auto max-w-6xl px-5 py-16">
        {/* Large Wordmark with Spotlight */}
        <div className="mb-16">
          <div
            ref={maskRef}
            onPointerMove={handlePointerMove}
            className="relative select-none cursor-default"
            style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
          >
            {/* Background text (visible) */}
            <h2 className="font-heading text-[120px] sm:text-[180px] md:text-[240px] font-extrabold leading-none text-warm-white/10 tracking-tighter">
              VYBE
            </h2>

            {/* Spotlight reveal (bike image beneath) */}
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                maskImage: "radial-gradient(circle 120px at var(--mx) var(--my), black 0%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle 120px at var(--mx) var(--my), black 0%, transparent 100%)",
              }}
            >
              <img
                src="https://images.pexels.com/photos/4542985/pexels-photo-4542985.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt=""
                className="w-full h-full object-cover opacity-40"
              />
            </div>

            {/* Spotlight text reveal */}
            <h2
              className="absolute inset-0 flex items-center justify-center font-heading text-[120px] sm:text-[180px] md:text-[240px] font-extrabold leading-none text-warm-white tracking-tighter pointer-events-none"
              style={{
                maskImage: "radial-gradient(circle 120px at var(--mx) var(--my), black 0%, transparent 100%)",
                WebkitMaskImage: "radial-gradient(circle 120px at var(--mx) var(--my), black 0%, transparent 100%)",
              }}
            >
              VYBE
            </h2>
          </div>
          <p className="mt-4 text-sm text-warm-white/40 max-w-md">
            Curated used e-bikes. Inspected, serviced, ready to ride.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-warm-white/30 mb-4">Shop</h4>
            <ul className="space-y-2.5">
              <li><Link href="/bikes" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">All Bikes</Link></li>
              <li><Link href="/bikes?category=city" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">City</Link></li>
              <li><Link href="/bikes?category=commuter" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Commuter</Link></li>
              <li><Link href="/bikes?category=mountain" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Mountain</Link></li>
              <li><Link href="/bikes?category=folding" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Folding</Link></li>
              <li><Link href="/bikes?category=cargo" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Cargo</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-warm-white/30 mb-4">Services</h4>
            <ul className="space-y-2.5">
              <li><Link href="/repairs" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Repairs & Maintenance</Link></li>
              <li><Link href="/sell" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Sell Your Bike</Link></li>
              <li><Link href="/contact" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Book a Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-warm-white/30 mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li className="text-sm text-warm-white/50">Delhi, India</li>
              <li><a href="tel:+919315405304" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">+91 93154 05304</a></li>
              <li><a href="mailto:itsmeasius@gmail.com" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">itsmeasius@gmail.com</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-warm-white/30 mb-4">Company</h4>
            <ul className="space-y-2.5">
              <li><Link href="/design-system" className="text-sm text-warm-white/50 hover:text-warm-white transition-colors">Design System</Link></li>
              <li><Link href="/admin/inventory" className="text-sm text-warm-white/30 hover:text-warm-white/60 transition-colors">Admin</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-warm-white/10 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-warm-white/20 md:flex-row">
          <p>&copy; {new Date().getFullYear()} VYBE Bikes. All rights reserved.</p>
          <p>Built for riders, by riders.</p>
        </div>
      </div>
    </footer>
  );
}
