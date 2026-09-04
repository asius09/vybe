"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  MapPin,
  RotateCcw,
} from "lucide-react";

export interface HeroSlide {
  id: string;
  name: string;
  category: string;
  headline: string;
  subtitle: string;
  price: string;
  originalPrice?: string;
  condition: string;
  image: string;
  slug: string;
}

const slides: HeroSlide[] = [
  {
    id: "mountain-pro",
    name: "VYBE Venture X-1 Pro",
    category: "Mountain E-Bike",
    headline: "RIDE BEYOND BOUNDARIES",
    subtitle: "Pursue the summit, triumph over any route.",
    price: "₹86,000",
    originalPrice: "₹1,24,000",
    condition: "98% Battery Health",
    image: "/images/hero/hero-mountain.jpg",
    slug: "vybe-summit-04",
  },
  {
    id: "commuter-gt",
    name: "VYBE Urban Commuter GT",
    category: "Commuter E-Bike",
    headline: "ELEVATE YOUR COMMUTE",
    subtitle: "Effortless urban cruising with 85 km range.",
    price: "₹76,000",
    originalPrice: "₹1,09,000",
    condition: "32-Point Inspected",
    image: "/images/hero/hero-commuter.jpg",
    slug: "vybe-urban-06",
  },
  {
    id: "gravel-allroad",
    name: "VYBE Rise All-Road Gravel",
    category: "Gravel & All-Road",
    headline: "SPEED MEETS ALL-TERRAIN",
    subtitle: "Ultra-lightweight carbon frame for swift gravel & asphalt.",
    price: "₹87,000",
    originalPrice: "₹1,24,000",
    condition: "Like New · Serviced",
    image: "/images/hero/hero-gravel.jpg",
    slug: "vybe-cross-01",
  },
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: "2-Year Warranty",
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
  },
  {
    icon: MapPin,
    title: "200+ Dealers",
  },
  {
    icon: RotateCcw,
    title: "14-Day Returns",
  },
];

export function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  // Smooth auto-play
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  const activeSlide = slides[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-asphalt select-none"
      aria-label="Hero Section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative w-full h-[calc(100vh-130px)] min-h-115 max-h-165 flex items-center justify-center overflow-hidden">
        
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isActive
                  ? "opacity-100 scale-100 pointer-events-auto z-10"
                  : "opacity-0 scale-105 pointer-events-none z-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.name}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover object-center transition-transform duration-1000 ease-out"
              />

              {/* Ambient atmospheric gradients */}
              <div className="absolute inset-0 bg-linear-to-t from-asphalt via-asphalt/25 to-asphalt/35" />
              <div className="absolute inset-0 bg-linear-to-b from-asphalt/50 via-transparent to-asphalt/85" />
            </div>
          );
        })}

        {/* ─── Minimal Price Badge ─── */}
        <div className="absolute top-[18%] sm:top-[20%] md:top-[22%] right-5 sm:right-10 md:right-16 lg:right-20 z-20">
          <Link
            href={`/bikes/${activeSlide.slug}`}
            className="inline-flex items-baseline gap-2 rounded-full bg-warm-white/90 backdrop-blur-md px-3.5 py-1 text-asphalt shadow-vybe-sm border border-neutral-300/80 transition-all duration-200 hover:bg-warm-white hover:border-neutral-400"
          >
            <span className="font-heading text-xs sm:text-sm font-black tracking-tight text-foreground">
              {activeSlide.price}
            </span>
            {activeSlide.originalPrice && (
              <span className="text-[10px] sm:text-[11px] text-muted-foreground line-through font-medium">
                {activeSlide.originalPrice}
              </span>
            )}
          </Link>
        </div>

        {/* ─── Overlaid Centered Headline & Action ─── */}
        <div className="absolute bottom-5 sm:bottom-7 md:bottom-9 inset-x-0 z-30 flex flex-col items-center text-center px-4">
          <div className="flex flex-col items-center transition-all duration-500">
            {/* Headline with single-line guarantee */}
            <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-warm-white uppercase leading-none drop-shadow-md whitespace-nowrap">
              {activeSlide.headline}
            </h1>

            {/* Subtitle */}
            <p className="mt-2 text-xs sm:text-sm text-warm-white/75 max-w-md font-body leading-tight drop-shadow-xs">
              {activeSlide.subtitle}
            </p>

            {/* Pill CTA Button */}
            <div className="mt-4">
              <Button
                size="sm"
                className="rounded-full bg-asphalt hover:bg-black text-warm-white border border-white/30 font-heading font-extrabold text-xs tracking-widest uppercase px-8 sm:px-10 py-2.5 shadow-vybe-md transition-all duration-300 hover:scale-105 active:scale-95 hover:border-lime hover:text-lime"
                asChild
              >
                <Link href={`/bikes/${activeSlide.slug}`}>
                  Shop Now
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* ─── Bottom-Left Slider Arrows ─── */}
        <div className="absolute left-4 sm:left-8 bottom-5 sm:bottom-7 z-30 flex items-center gap-2">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-asphalt/80 hover:bg-asphalt text-warm-white/80 hover:text-warm-white border border-white/20 backdrop-blur-xs transition-all duration-200 active:scale-90 hover:border-lime"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-asphalt/80 hover:bg-asphalt text-warm-white/80 hover:text-warm-white border border-white/20 backdrop-blur-xs transition-all duration-200 active:scale-90 hover:border-lime"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Slide Indicator Dots */}
        <div className="absolute right-4 sm:right-8 bottom-5 sm:bottom-7 z-30 flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                current === idx ? "w-6 bg-lime" : "w-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

      </div>

      <div className="w-full border-t border-border/70 bg-warm-white py-3.5 sm:py-4">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-0 md:divide-x md:divide-border/60">
            {trustFeatures.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex items-center justify-center gap-2.5 px-3 py-1"
                >
                  <Icon className="h-4 w-4 text-coral shrink-0" strokeWidth={2} />
                  <span className="font-heading text-xs sm:text-sm font-bold text-foreground whitespace-nowrap">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
