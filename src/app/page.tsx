import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { HeroSection } from "@/components/home/HeroSection";
import { getFeaturedBikes, getNewArrivals, formatPriceINR } from "@/data/loader";
import type { VYBEbike } from "@/data/loader";
import { ArrowRight } from "lucide-react";

const rideCategories = [
  { name: "City", slug: "city", image: "https://images.pexels.com/photos/4542985/pexels-photo-4542985.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Commuter", slug: "commuter", image: "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Mountain", slug: "mountain", image: "https://images.pexels.com/photos/19411352/pexels-photo-19411352.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Hybrid", slug: "hybrid", image: "https://images.pexels.com/photos/9138689/pexels-photo-9138689.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Folding", slug: "folding", image: "https://images.pexels.com/photos/16435192/pexels-photo-16435192.jpeg?auto=compress&cs=tinysrgb&w=800" },
  { name: "Cargo", slug: "cargo", image: "https://images.pexels.com/photos/31638909/pexels-photo-31638909.jpeg?auto=compress&cs=tinysrgb&w=800" },
];

const brands = ["VYBE", "Rad Power", "Trek", "Giant", "Specialized", "Cannondale", "Brompton", "Tern"];

function BikeCardGrid({ bike }: { bike: VYBEbike }) {
  return (
    <Link href={`/bikes/${bike.slug}`} className="group block">
      <div className="overflow-hidden rounded-card border border-border bg-white transition-all duration-300 group-hover:shadow-vybe-md group-hover:border-border/80">
        <div className="relative aspect-4/3 overflow-hidden bg-muted/30">
          <img
            src={bike.image}
            alt={bike.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {bike.recentlyArrived && (
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold text-warm-white">New</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-[11px] text-muted-foreground">{bike.category}</p>
          <h3 className="font-heading text-base font-bold text-foreground">{bike.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-heading text-lg font-extrabold">{formatPriceINR(bike.price)}</p>
            <span className="text-xs text-muted-foreground">{bike.year} · {bike.mileage.toLocaleString()} km</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const featured = getFeaturedBikes();
  const newArrivals = getNewArrivals();
  const displayBikes = [...newArrivals.filter((b) => !featured.find((f) => f.id === b.id)), ...featured];
  const row1 = displayBikes.slice(0, 3);
  const row2 = displayBikes.slice(3, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content">
        {/* ═══════════════════════════════════════════════════════════
            1. HERO — Showcase Carousel + Trust Bar
        ═══════════════════════════════════════════════════════════ */}
        <HeroSection />

        {/* ═══════════════════════════════════════════════════════════
            2. WHAT ARE YOU RIDING FOR? — Opens with filter
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                What are you riding for?
              </h2>
              <p className="mt-2 text-muted-foreground max-w-md">
                Every rider is different. Find the bike that fits your life.
              </p>
            </ScrollReveal>

            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
              {rideCategories.map((cat, i) => (
                <ScrollReveal key={cat.name} delay={i * 80}>
                  <Link
                    href={`/bikes?category=${cat.slug}`}
                    className="group relative block aspect-4/3 overflow-hidden rounded-card"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-asphalt/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5">
                      <h3 className="font-heading text-lg font-bold text-warm-white">{cat.name}</h3>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            3. BRANDS — Animated showcase
        ═══════════════════════════════════════════════════════════ */}
        <section className="border-y border-border/50 py-10 overflow-hidden">
          <div className="mx-auto max-w-6xl px-5 mb-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40 text-center">
              Brands we carry
            </p>
          </div>
          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />
            {/* Scrolling row */}
            <div className="flex gap-12 animate-[marquee_30s_linear_infinite] w-max">
              {[...brands, ...brands].map((brand, i) => (
                <span
                  key={`${brand}-${i}`}
                  className="font-heading text-xl md:text-2xl font-extrabold text-foreground/10 hover:text-foreground/30 transition-colors duration-500 whitespace-nowrap select-none cursor-default"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            4. LATEST ARRIVALS
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-8">
                <h2 className="font-heading text-3xl font-bold text-foreground">
                  Latest arrivals
                </h2>
                <Link href="/bikes" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  View all →
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-5">
              {row1.map((bike, i) => (
                <ScrollReveal key={bike.id} delay={i * 100}>
                  <BikeCardGrid bike={bike} />
                </ScrollReveal>
              ))}
            </div>

            {row2.length > 0 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {row2.map((bike, i) => (
                  <ScrollReveal key={bike.id} delay={i * 100}>
                    <BikeCardGrid bike={bike} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            5. WHY VYBE — Timeline
        ═══════════════════════════════════════════════════════════ */}
        <section className="bg-muted/30 px-5 py-24">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-16">
                Why buy used from VYBE?
              </h2>
            </ScrollReveal>

            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

              {[
                { num: "01", title: "32-Point Inspection", desc: "Frame, battery, motor, brake, and electrical checks. We document everything.", color: "bg-foreground" },
                { num: "02", title: "Serviced Before Sale", desc: "Worn parts replaced, full tune-up, battery calibrated. Ready to ride.", color: "bg-muted-foreground" },
                { num: "03", title: "30-Day Support", desc: "Free check-up, adjustments, and peace of mind after purchase.", color: "bg-muted-foreground/50" },
              ].map((item, i) => (
                <ScrollReveal key={item.num} delay={i * 100} direction={i % 2 === 0 ? "left" : "right"}>
                  <div className={`relative flex items-start md:items-center mb-12 md:mb-16 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                    <div className={`pl-12 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                      <p className="font-heading text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{item.num}</p>
                      <h3 className="font-heading text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                    <div className={`absolute left-2 md:left-1/2 md:-translate-x-1/2 w-2.5 h-2.5 rounded-full ${item.color} border-4 border-background z-10 mt-1 md:mt-0`} />
                    <div className="hidden md:block md:w-1/2" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            6. PROCESS
        ═══════════════════════════════════════════════════════════ */}
        <section className="bg-asphalt px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-warm-white text-center mb-16">
                How VYBE checks every bike
              </h2>
            </ScrollReveal>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: "01", title: "Intake", desc: "Bike arrives. We log condition, mileage, and service history." },
                { step: "02", title: "32-Point Check", desc: "Frame, battery, motor, brakes, tires, electrics — every system tested." },
                { step: "03", title: "Service", desc: "Worn parts replaced. Full tune-up. Battery calibrated." },
                { step: "04", title: "Listed", desc: "Photos taken. Listing live. Ready for test ride." },
              ].map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 100}>
                  <div className="text-center">
                    <p className="font-heading text-5xl font-extrabold text-warm-white/[0.07]">{item.step}</p>
                    <h3 className="mt-3 font-heading text-lg font-bold text-warm-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-warm-white/40 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            7. ONGOING CARE
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Ongoing care
              </h2>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-2">
              <ScrollReveal direction="left">
                <div className="rounded-card border border-border bg-white p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground">Your first service is on us</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Every VYBE bike comes with a free 30-day check-up.
                  </p>
                  <Link href="/repairs" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors">
                    Learn more →
                  </Link>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="rounded-card border border-border bg-white p-8">
                  <h3 className="font-heading text-xl font-bold text-foreground">Keep it running</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Battery checks, brake service, full tune-ups, diagnostics.
                  </p>
                  <Link href="/repairs" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors">
                    View services →
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            8. FAQs
        ═══════════════════════════════════════════════════════════ */}
        <FAQsSection />

        {/* ═══════════════════════════════════════════════════════════
            9. CTA
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 pb-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="rounded-card bg-asphalt p-12 text-center md:p-16">
                <h2 className="font-heading text-3xl font-bold text-warm-white md:text-4xl">
                  Ready to find your ride?
                </h2>
                <div className="mt-8">
                  <Button size="lg" className="bg-warm-white text-asphalt hover:bg-warm-white/90 font-bold" asChild>
                    <Link href="/bikes">
                      Browse All Bikes
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const faqs = [
  {
    q: "How did you approach the design system?",
    a: "Started with brand tokens as CSS variables. Built atomic components on top, then composed larger patterns. Every color combination was tested for WCAG contrast.",
  },
  {
    q: "Why Syne + Inter for fonts?",
    a: "Syne gives geometric personality for headings. Inter is the workhorse for body text — clean, readable, great at small sizes.",
  },
  {
    q: "How does the admin inventory work?",
    a: "SQLite backend with a repository pattern. API routes handle CRUD with server-side validation. Bikes have a 4-state lifecycle: draft → live → sold → archived.",
  },
  {
    q: "What was the motion strategy?",
    a: "ScrollReveal uses IntersectionObserver. The mega menu uses clip-path for fluid reveal. Every animation respects prefers-reduced-motion.",
  },
  {
    q: "Why SQLite?",
    a: "Zero config, no external dependencies. The repository pattern means swapping to Postgres later is a one-file change.",
  },
];

function FAQsSection() {
  return (
    <section className="px-5 py-20">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal>
          <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
            Design & development
          </h2>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <details className="group rounded-xl border border-border bg-white">
                <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-heading text-sm font-bold text-foreground list-none">
                  {faq.q}
                  <span className="shrink-0 h-5 w-5 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <div className="overflow-hidden transition-all duration-300 ease-out group-open:max-h-40 group-open:opacity-100 max-h-0 opacity-0">
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.a}
                  </div>
                </div>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
