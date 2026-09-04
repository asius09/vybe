"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  MapPin,
  RotateCcw,
  ArrowRight,
  Zap,
  Sparkles,
} from "lucide-react";

export interface HeroSlide {
  id: string;
  name: string;
  category: string;
  headline: string;
  highlightText: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  condition: string;
  image: string;
  slug: string;
  tagPosition: {
    top: string;
    right: string;
  };
}

const slides: HeroSlide[] = [
  {
    id: "mountain-pro",
    name: "VYBE Venture X-1 Pro",
    category: "Mountain E-Bike",
    headline: "RIDE BEYOND",
    highlightText: "BOUNDARIES",
    subtitle: "Pursue the summit, triumph over any route with full suspension & 750W peak power.",
    price: "₹86,000",
    originalPrice: "₹1,24,000",
    condition: "98% Battery Health",
    image: "/images/hero/hero-mountain.jpg",
    slug: "vybe-summit-04",
    tagPosition: {
      top: "18%",
      right: "16%",
    },
  },
  {
    id: "commuter-gt",
    name: "VYBE Urban Commuter GT",
    category: "Commuter E-Bike",
    headline: "ELEVATE YOUR",
    highlightText: "DAILY COMMUTE",
    subtitle: "Effortless urban cruising, 85 km range, and silent belt drive system.",
    price: "₹76,000",
    originalPrice: "₹1,09,000",
    condition: "32-Point Inspected",
    image: "/images/hero/hero-commuter.jpg",
    slug: "vybe-urban-06",
    tagPosition: {
      top: "20%",
      right: "18%",
    },
  },
  {
    id: "gravel-allroad",
    name: "VYBE Rise All-Road Gravel",
    category: "Gravel & All-Road",
    headline: "SPEED MEETS",
    highlightText: "ALL-TERRAIN",
    subtitle: "Ultra-lightweight carbon frame engineered for swift gravel routes and asphalt sprints.",
    price: "₹87,000",
    originalPrice: "₹1,24,000",
    condition: "Like New · Serviced",
    image: "/images/hero/hero-gravel.jpg",
    slug: "vybe-cross-01",
    tagPosition: {
      top: "16%",
      right: "20%",
    },
  },
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "2-Year Warranty",
    subtitle: "32-point inspection verified",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    subtitle: "100% encrypted & protected",
  },
  {
    icon: MapPin,
    title: "200+ Dealers",
    subtitle: "Delhi NCR free test rides",
  },
  {
    icon: RotateCcw,
    title: "14-Day Returns",
    subtitle: "30-day dedicated VYBE care",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const activeSlide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-asphalt select-none"
      aria-label="Featured e-bikes showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ─── Hero Visual Stage ─── */}
      <div className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[720px] lg:min-h-[780px] w-full flex flex-col justify-between overflow-hidden">
        
        {/* Ambient Studio Lighting Glows */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Subtle warm center radial spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(200,255,61,0.07)_0%,rgba(255,107,74,0.03)_35%,rgba(21,21,21,0.85)_70%,#151515_100%)]" />
          
          {/* Atmospheric background grid hints */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Top subtle vignette */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-asphalt via-asphalt/60 to-transparent z-10" />
          {/* Bottom subtle blend */}
          <div className="absolute bottom-0 left-0 right-0 h-44 bg-linear-to-t from-asphalt via-asphalt/80 to-transparent z-10" />
        </div>

        {/* ─── Centerpiece Bike Showcase ─── */}
        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 pt-8 md:pt-12 flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-4xl aspect-16/10 sm:aspect-16/9 flex items-center justify-center">
            
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeSlide.id}
                custom={direction}
                initial={{ opacity: 0, scale: 0.94, x: direction * 40 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 1.05, x: direction * -40 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <img
                  src={activeSlide.image}
                  alt={activeSlide.name}
                  className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                  loading="eager"
                  decoding="async"
                />

                {/* Floating Speech-Bubble Price Tag */}
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.25, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    top: activeSlide.tagPosition.top,
                    right: activeSlide.tagPosition.right,
                  }}
                  className="absolute z-20 hidden sm:block"
                >
                  <Link
                    href={`/bikes/${activeSlide.slug}`}
                    className="group/tag relative flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 md:px-4 md:py-2 text-asphalt shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 hover:shadow-vybe-lime border border-white/60"
                  >
                    <div className="flex flex-col items-start leading-tight">
                      <div className="flex items-center gap-1.5">
                        <span className="font-heading text-base md:text-lg font-extrabold text-asphalt">
                          {activeSlide.price}
                        </span>
                        {activeSlide.originalPrice && (
                          <span className="text-[11px] text-muted-foreground line-through font-medium">
                            {activeSlide.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                        {activeSlide.condition}
                      </span>
                    </div>

                    {/* Speech bubble tail pointer */}
                    <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-white rotate-45 border-r border-b border-neutral-200/40" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* ─── Centered Overlaid Content (Title, Subtitle, CTA) ─── */}
        <div className="relative z-20 mx-auto w-full max-w-4xl px-4 text-center pb-8 sm:pb-12 md:pb-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 sm:space-y-4"
            >
              {/* Category pill indicator */}
              <div className="flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-warm-white/70 backdrop-blur-md border border-white/10">
                  <Zap className="h-3 w-3 text-lime" />
                  {activeSlide.category}
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-warm-white uppercase leading-[1.05] drop-shadow-md">
                {activeSlide.headline}{" "}
                <span className="text-lime">{activeSlide.highlightText}</span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto max-w-xl text-sm sm:text-base text-warm-white/70 leading-relaxed font-body">
                {activeSlide.subtitle}
              </p>

              {/* CTA Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <Button
                  size="lg"
                  className="rounded-full bg-lime text-asphalt hover:bg-lime-dark font-heading font-extrabold tracking-wide uppercase px-8 py-6 shadow-vybe-lime transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm"
                  asChild
                >
                  <Link href={`/bikes/${activeSlide.slug}`}>
                    Shop Now
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/20 bg-white/5 text-warm-white hover:bg-white/15 hover:text-warm-white hover:border-white/40 font-heading font-bold text-xs sm:text-sm px-6 py-6 backdrop-blur-md transition-all duration-300 active:scale-95"
                  asChild
                >
                  <Link href="/bikes">
                    Browse All ({slides.length * 8}+)
                  </Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── Navigation Controls (Circular Arrows + Slide Dots) ─── */}
        <div className="absolute left-4 sm:left-8 bottom-6 md:bottom-12 z-25 flex items-center gap-3">
          {/* Left / Right Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-warm-white border border-white/15 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="group flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-warm-white border border-white/15 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  current === idx
                    ? "w-7 bg-lime"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Slide Counter on Right */}
        <div className="absolute right-4 sm:right-8 bottom-6 md:bottom-12 z-25 hidden sm:flex items-center gap-1 text-xs font-mono font-bold text-warm-white/40">
          <span className="text-lime">0{current + 1}</span>
          <span>/</span>
          <span>0{slides.length}</span>
        </div>

      </div>

      {/* ═══════════════════════════════════════════════════════════
          TRUST / GUARANTEE BAR (Directly below Hero)
      ═══════════════════════════════════════════════════════════ */}
      <div className="w-full border-t border-border/80 bg-warm-white py-5 sm:py-6 shadow-xs">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-border">
            {trustFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center gap-3 px-2 md:px-6 py-1"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-asphalt text-lime shadow-xs">
                    <Icon className="h-4 w-4" strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-heading text-xs sm:text-sm font-bold text-foreground truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
