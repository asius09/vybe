import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getFeaturedBikes, getNewArrivals, getCategories, formatPriceINR } from "@/data/loader";
import type { VYBEbike } from "@/data/loader";
import Image from "next/image";

const rideCategories = [
  {
    name: "City",
    description: "Smooth rides through the urban jungle",
    image: "https://images.pexels.com/photos/4542985/pexels-photo-4542985.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Commuter",
    description: "Daily rides, built for reliability",
    image: "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Mountain",
    description: "Conquer trails and hills with power",
    image: "https://images.pexels.com/photos/19411352/pexels-photo-19411352.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Hybrid",
    description: "Best of both worlds — road and trail",
    image: "https://images.pexels.com/photos/9138689/pexels-photo-9138689.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Folding",
    description: "Compact, portable, city-ready",
    image: "https://images.pexels.com/photos/16435192/pexels-photo-16435192.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    name: "Cargo",
    description: "Haul anything — groceries, gear, kids",
    image: "https://images.pexels.com/photos/31638909/pexels-photo-31638909.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const brands = [
  "VYBE", "Rad Power", "Trek", "Giant", "Specialized", "Cannondale", "Brompton", "Tern",
];

function BikeCardGrid({ bike }: { bike: VYBEbike }) {
  return (
    <Link href={`/bikes/${bike.slug}`} className="group block">
      <div className="overflow-hidden rounded-card border border-border bg-white transition-all duration-300 group-hover:shadow-vybe-md">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
          <img
            src={bike.image}
            alt={bike.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {bike.recentlyArrived && (
            <div className="absolute left-3 top-3">
              <span className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold text-asphalt">New</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-[11px] text-muted-foreground">{bike.category}</p>
          <h3 className="font-heading text-base font-bold text-foreground">{bike.name}</h3>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span>{bike.year}</span>
            <span>·</span>
            <span>{bike.mileage.toLocaleString()} km</span>
            <span>·</span>
            <span>{bike.batteryHealthPercent}% battery</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div>
              <p className="font-heading text-lg font-extrabold">{formatPriceINR(bike.price)}</p>
              <p className="text-[10px] text-muted-foreground line-through">{formatPriceINR(bike.originalPrice)}</p>
            </div>
            <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-foreground">
              {bike.condition}
            </span>
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

      <main>
        {/* ═══════════════════════════════════════════════════════════
            1. HERO
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-asphalt px-5 py-24 md:py-36">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-warm-white/40">Curated used e-bikes</p>
              <h1 className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-warm-white md:text-7xl">
                Find your
                <br />
                next ride.
              </h1>
              <p className="max-w-md text-base text-warm-white/60">
                Inspected, serviced, and ready to ride. Every VYBE bike passes 32 checks before it reaches you.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row pt-2">
                <Button size="lg" asChild>
                  <Link href="/bikes">
                    Browse Collection
                    <span className="ml-1">→</span>
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-warm-white/20 text-warm-white hover:bg-warm-white/10">
                  <Link href="/sell">Sell Your Bike</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            2. WHAT ARE YOU RIDING FOR? — Story flow with bike images
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Discover</p>
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
                    href={`/bikes?category=${cat.name.toLowerCase()}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-card"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-asphalt/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5">
                      <h3 className="font-heading text-lg font-bold text-warm-white">{cat.name}</h3>
                      <p className="text-xs text-warm-white/60">{cat.description}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            3. BRANDS — Logo strip
        ═══════════════════════════════════════════════════════════ */}
        <section className="border-y border-border bg-muted/30 py-8">
          <div className="mx-auto max-w-6xl px-5">
            <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">Brands we carry</p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {brands.map((brand) => (
                <span key={brand} className="font-heading text-sm font-bold text-muted-foreground/50 hover:text-foreground transition-colors">
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            4. LATEST COLLECTION — Two-row grid
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Collection</p>
                  <h2 className="font-heading text-3xl font-bold text-foreground">
                    Latest arrivals
                  </h2>
                </div>
                <Link href="/bikes" className="text-sm font-semibold text-foreground hover:text-muted-foreground transition-colors">
                  View all →
                </Link>
              </div>
            </ScrollReveal>

            {/* Row 1 */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-5">
              {row1.map((bike, i) => (
                <ScrollReveal key={bike.id} delay={i * 100}>
                  <BikeCardGrid bike={bike} />
                </ScrollReveal>
              ))}
            </div>

            {/* Row 2 */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {row2.map((bike, i) => (
                <ScrollReveal key={bike.id} delay={i * 100}>
                  <BikeCardGrid bike={bike} />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="mt-10 text-center">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/bikes">
                    Browse All Bikes
                    <span className="ml-1">→</span>
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            5. WHY BUY USED FROM VYBE — Story flow with tree
        ═══════════════════════════════════════════════════════════ */}
        <section className="bg-muted/30 px-5 py-24">
          <div className="mx-auto max-w-4xl">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 text-center">Why VYBE</p>
              <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-16">
                Why buy used from VYBE?
              </h2>
            </ScrollReveal>

            {/* Story tree */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

              {/* Point 1 — Left */}
              <ScrollReveal direction="left" delay={0}>
                <div className="relative flex items-center mb-16">
                  <div className="w-1/2 pr-12 text-right">
                    <p className="font-heading text-xs font-bold text-lime-deeper uppercase tracking-wider mb-1">01</p>
                    <h3 className="font-heading text-xl font-bold text-foreground">32-Point Inspection</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Every bike goes through frame, battery, motor, brake, and electrical checks. We document everything.
                    </p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-lime border-4 border-background z-10" />
                  <div className="w-1/2" />
                </div>
              </ScrollReveal>

              {/* Point 2 — Right */}
              <ScrollReveal direction="right" delay={100}>
                <div className="relative flex items-center mb-16">
                  <div className="w-1/2" />
                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-coral border-4 border-background z-10" />
                  <div className="w-1/2 pl-12">
                    <p className="font-heading text-xs font-bold text-coral uppercase tracking-wider mb-1">02</p>
                    <h3 className="font-heading text-xl font-bold text-foreground">Serviced Before Sale</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      Worn parts replaced, full tune-up completed, battery calibrated. Ready to ride from day one.
                    </p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Point 3 — Left */}
              <ScrollReveal direction="left" delay={200}>
                <div className="relative flex items-center">
                  <div className="w-1/2 pr-12 text-right">
                    <p className="font-heading text-xs font-bold text-purple uppercase tracking-wider mb-1">03</p>
                    <h3 className="font-heading text-xl font-bold text-foreground">30-Day Support</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      After purchase, we&apos;re here for 30 days. Free check-up, adjustments, and peace of mind.
                    </p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple border-4 border-background z-10" />
                  <div className="w-1/2" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            6. BENTO — Image collection
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Gallery</p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                VYBE in action
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                "https://images.pexels.com/photos/4542985/pexels-photo-4542985.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/9138689/pexels-photo-9138689.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/19411352/pexels-photo-19411352.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/16435192/pexels-photo-16435192.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/31638909/pexels-photo-31638909.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/6900869/pexels-photo-6900869.jpeg?auto=compress&cs=tinysrgb&w=800",
                "https://images.pexels.com/photos/34259660/pexels-photo-34259660.jpeg?auto=compress&cs=tinysrgb&w=800",
              ].map((img, i) => (
                <ScrollReveal key={i} delay={i * 60} direction="scale">
                  <div className="aspect-square overflow-hidden rounded-card">
                    <img src={img} alt="" className="h-full w-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            7. HOW VYBE CHECKS EVERY BIKE — Impactful process
        ═══════════════════════════════════════════════════════════ */}
        <section className="bg-asphalt px-5 py-24">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-warm-white/40 mb-3 text-center">Process</p>
              <h2 className="font-heading text-3xl font-bold text-warm-white text-center mb-16">
                How VYBE checks every bike
              </h2>
            </ScrollReveal>
            <div className="grid gap-8 md:grid-cols-4">
              {[
                { step: "01", title: "Intake", desc: "Bike arrives. We log condition, mileage, and service history." },
                { step: "02", title: "32-Point Check", desc: "Frame, battery, motor, brakes, tires, electrics — every system tested." },
                { step: "03", title: "Service & Repair", desc: "Worn parts replaced. Full tune-up. Battery calibrated." },
                { step: "04", title: "Listed & Ready", desc: "Photos taken. Listing live. Ready for test ride." },
              ].map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 100}>
                  <div className="text-center">
                    <p className="font-heading text-5xl font-extrabold text-warm-white/10">{item.step}</p>
                    <h3 className="mt-3 font-heading text-lg font-bold text-warm-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-warm-white/50 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            8. ONGOING CARE — Full-width two-card
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">After the sale</p>
              <h2 className="font-heading text-3xl font-bold text-foreground mb-8">
                Ongoing care
              </h2>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-2">
              <ScrollReveal direction="left">
                <div className="rounded-card border border-border bg-white p-8">
                  <p className="font-heading text-xs font-bold text-lime-deeper uppercase tracking-wider mb-2">Included</p>
                  <h3 className="font-heading text-xl font-bold text-foreground">Your first service is on us</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Every VYBE bike comes with a free 30-day check-up. We&apos;ll make sure everything is running perfectly.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Link href="/repairs">Learn more →</Link>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal direction="right">
                <div className="rounded-card border border-border bg-white p-8">
                  <p className="font-heading text-xs font-bold text-coral uppercase tracking-wider mb-2">Available</p>
                  <h3 className="font-heading text-xl font-bold text-foreground">Keep it running</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    Battery checks, brake service, full tune-ups, diagnostics. Our in-house team handles it all.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Link href="/repairs">View services →</Link>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            9. REVIEWS — Stacked card carousel
        ═══════════════════════════════════════════════════════════ */}
        <section className="bg-muted/30 px-5 py-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 text-center">Reviews</p>
              <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-12">
                Real riders, real reviews
              </h2>
            </ScrollReveal>
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  name: "Rahul S.",
                  bike: "VYBE Metro 01",
                  slug: "vybe-metro-01",
                  stars: 5,
                  text: "Bought this for my daily commute. Bike was exactly as described, great condition. The team was super helpful throughout.",
                  image: "https://images.pexels.com/photos/4542985/pexels-photo-4542985.jpeg?auto=compress&cs=tinysrgb&w=400",
                },
                {
                  name: "Priya M.",
                  bike: "VYBE Trail 01",
                  slug: "vybe-trail-01",
                  stars: 5,
                  text: "Took this out on the trails the same day I picked it up. Battery lasts longer than expected. Incredibly smooth ride.",
                  image: "https://images.pexels.com/photos/19411352/pexels-photo-19411352.jpeg?auto=compress&cs=tinysrgb&w=400",
                },
                {
                  name: "Amit K.",
                  bike: "VYBE Carry 01",
                  slug: "vybe-carry-01",
                  stars: 5,
                  text: "Cargo bike for the family. Carries everything we need. Saved a fortune compared to buying new. Highly recommend VYBE.",
                  image: "https://images.pexels.com/photos/31638909/pexels-photo-31638909.jpeg?auto=compress&cs=tinysrgb&w=400",
                },
              ].map((review, i) => (
                <ScrollReveal key={review.name} delay={i * 100}>
                  <div className="rounded-card border border-border bg-white p-6 h-full flex flex-col">
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: review.stars }).map((_, j) => (
                        <span key={j} className="text-yellow-400 text-sm">★</span>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      &ldquo;{review.text}&rdquo;
                    </p>
                    <div className="mt-5 pt-4 border-t border-border">
                      <p className="font-heading text-sm font-bold text-foreground">{review.name}</p>
                      <Link href={`/bikes/${review.slug}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        Purchased: {review.bike} →
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            10. CTA
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 pb-20">
          <div className="mx-auto max-w-6xl">
            <ScrollReveal>
              <div className="rounded-card bg-asphalt p-12 text-center md:p-16">
                <h2 className="font-heading text-3xl font-bold text-warm-white md:text-4xl">
                  Ready to find your ride?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-warm-white/50">
                  Browse our full collection of inspected, certified used e-bikes.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/bikes">
                      Browse All Bikes
                      <span className="ml-1">→</span>
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-warm-white/20 text-warm-white hover:bg-warm-white/10">
                    <Link href="/contact">Contact Us</Link>
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
