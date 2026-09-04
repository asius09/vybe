import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BikeCard } from "@/components/bikes/BikeCard";
import { ServiceCard } from "@/components/services/ServiceCard";
import { getFeaturedBikes } from "@/data/bikes";
import { services } from "@/data/services";
import {
  ArrowRight,
  Zap,
  Shield,
  Wrench,
  Heart,
  Bike as BikeIcon,
  CheckCircle,
  Compass,
  Mountain,
  Package,
  Home,
  Navigation,
  Star,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";
import { rideIntentLabels, type RideIntent } from "@/data/bikes";

const rideIntents: { id: RideIntent; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { id: "commute", icon: BikeIcon },
  { id: "weekend", icon: Compass },
  { id: "hills", icon: Mountain },
  { id: "cargo", icon: Package },
  { id: "small-space", icon: Home },
  { id: "getting-around", icon: Navigation },
];

export default function HomePage() {
  const featuredBikes = getFeaturedBikes().slice(0, 6);
  const featuredServices = services.filter((s) => s.popular).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* ═══════════════════════════════════════════════════════════
            1. HERO — "Find your next ride."
        ═══════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-asphalt px-5 py-20 md:py-32">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center">
              <div className="max-w-2xl space-y-6">
                <Badge className="w-fit bg-lime text-asphalt">
                  <Zap className="h-3 w-3" />
                  Used e-bikes, inspected and certified
                </Badge>
                <h1 className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-lime md:text-7xl">
                  FIND YOUR
                  <br />
                  NEXT RIDE.
                </h1>
                <p className="max-w-lg text-lg text-warm-white/70">
                  Quality used e-bikes at fair prices. Every bike inspected,
                  tested, and certified by our team.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button size="lg" asChild className="bg-lime text-asphalt hover:bg-lime-dark">
                    <Link href="/bikes">
                      Browse Bikes
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="border-warm-white/20 text-warm-white hover:bg-warm-white/10">
                    <Link href="/sell">
                      Sell Your Bike
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative mx-auto flex w-full max-w-sm flex-col items-center lg:mx-0">
                <div className="flex h-64 w-64 items-center justify-center rounded-[40px] bg-lime/10 md:h-80 md:w-80">
                  <BikeIcon className="h-40 w-40 text-lime/30 md:h-52 md:w-52" strokeWidth={0.5} />
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-card bg-white p-4 shadow-vybe-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime">
                      <CheckCircle className="h-5 w-5 text-asphalt" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">32-Point</p>
                      <p className="font-heading text-sm font-bold">Inspected</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            2. MARQUEE — Brand energy strip
        ═══════════════════════════════════════════════════════════ */}
        <section className="border-y border-border bg-muted/30 py-4 overflow-hidden">
          <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap gap-8">
            {["City Bikes", "Folding", "Cargo", "Mountain", "Hybrid", "Commuter", "City Bikes", "Folding", "Cargo", "Mountain", "Hybrid", "Commuter"].map((type, i) => (
              <span key={i} className="flex items-center gap-3 text-sm font-heading font-bold text-muted-foreground/60">
                <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                {type}
              </span>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            3. WHAT ARE YOU RIDING FOR? — Intent discovery
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="text-center">
              <Badge variant="coral" className="mb-3">Discover</Badge>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                What are you riding for?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Tell us how you ride, we&apos;ll find the right bike.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
              {rideIntents.map((intent) => {
                const Icon = intent.icon;
                return (
                  <Link
                    key={intent.id}
                    href={`/bikes?intent=${intent.id}`}
                    className="group flex flex-col items-center gap-3 rounded-card border-2 border-border bg-white p-5 transition-all duration-200 hover:border-lime/40 hover:shadow-vybe-sm"
                  >
                    <Icon className="h-7 w-7 text-muted-foreground transition-colors group-hover:text-lime-deeper" strokeWidth={1.5} />
                    <span className="text-xs font-semibold text-center text-muted-foreground group-hover:text-foreground">
                      {rideIntentLabels[intent.id]}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            4. FRESHLY INSPECTED BIKES — Featured inventory
        ═══════════════════════════════════════════════════════════ */}
        <section className="bg-muted/30 px-5 py-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <Badge variant="lime" className="mb-3">Inventory</Badge>
                <h2 className="font-heading text-3xl font-bold text-foreground">
                  Freshly Inspected Bikes
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Every bike passes 32 checks before it hits the floor.
                </p>
              </div>
              <Link href="/bikes">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredBikes.map((bike) => (
                <BikeCard key={bike.id} bike={bike} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            5. WHY BUY USED FROM VYBE? — Trust
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="text-center">
              <Badge variant="purple" className="mb-3">Trust</Badge>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Why buy used from VYBE?
              </h2>
              <p className="mt-2 text-muted-foreground">
                Buying used doesn&apos;t mean buying blind.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="group rounded-card border-2 border-border bg-white p-6 transition-all duration-300 hover:border-lime/40 hover:shadow-vybe-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lime/15 transition-colors group-hover:bg-lime/25">
                  <ClipboardCheck className="h-6 w-6 text-lime-deeper" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  32-Point Inspection
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every bike goes through frame, battery, motor, brake, and electrical checks. 
                  We don&apos;t sell anything we wouldn&apos;t ride ourselves.
                </p>
              </div>
              <div className="group rounded-card border-2 border-border bg-white p-6 transition-all duration-300 hover:border-coral/40 hover:shadow-vybe-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-coral/10 transition-colors group-hover:bg-coral/20">
                  <Wrench className="h-6 w-6 text-coral" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Serviced Before Sale
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We repair and service every bike before it hits the floor. 
                  Your first service is already included.
                </p>
              </div>
              <div className="group rounded-card border-2 border-border bg-white p-6 transition-all duration-300 hover:border-purple/40 hover:shadow-vybe-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple/10 transition-colors group-hover:bg-purple/20">
                  <ShieldCheck className="h-6 w-6 text-purple" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  30-Day Support
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  After purchase, we&apos;re here for 30 days. Free check-up, 
                  adjustments, and peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            6. HOW VYBE CHECKS EVERY BIKE — Process
        ═══════════════════════════════════════════════════════════ */}
        <section className="bg-asphalt px-5 py-20">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="text-center">
              <Badge className="mb-3 bg-lime text-asphalt">Process</Badge>
              <h2 className="font-heading text-3xl font-bold text-lime">
                How VYBE checks every bike
              </h2>
              <p className="mt-2 text-warm-white/60">
                From intake to floor — our quality process.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-4">
              {[
                { step: "01", title: "Intake", desc: "Bike arrives. We log condition, mileage, and service history." },
                { step: "02", title: "32-Point Check", desc: "Frame, battery, motor, brakes, tires, electrics — every system tested." },
                { step: "03", title: "Service & Repair", desc: "Worn parts replaced. Full tune-up. Battery calibrated." },
                { step: "04", title: "Listed & Ready", desc: "Photos taken. Listing live. Ready for test ride." },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <p className="font-heading text-4xl font-extrabold text-lime/30">{item.step}</p>
                  <h3 className="mt-2 font-heading text-lg font-bold text-lime">{item.title}</h3>
                  <p className="mt-2 text-sm text-warm-white/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            7. SERVICES & ONGOING CARE
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 py-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex items-end justify-between">
              <div>
                <Badge variant="coral" className="mb-3">Services</Badge>
                <h2 className="font-heading text-3xl font-bold text-foreground">
                  Ongoing care
                </h2>
                <p className="mt-2 text-muted-foreground">
                  VYBE supports you after the sale.
                </p>
              </div>
              <Link href="/repairs">
                <Button variant="outline" size="sm">
                  All Services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            8. REAL RIDERS — Social proof
        ═══════════════════════════════════════════════════════════ */}
        <section className="bg-muted/30 px-5 py-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="text-center">
              <Badge variant="dark" className="mb-3">Reviews</Badge>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Real riders
              </h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-card border border-border bg-white p-6">
                <div className="flex gap-1 text-lime">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  &ldquo;Bought a RadCity for my daily commute. Bike was exactly as described,
                  great condition. The team was super helpful.&rdquo;
                </p>
                <p className="mt-4 text-sm font-bold text-foreground">Rahul S.</p>
              </div>
              <div className="rounded-card border border-border bg-white p-6">
                <div className="flex gap-1 text-lime">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  &ldquo;The repair service is top notch. They fixed my battery issue
                  the same day. Fair pricing too.&rdquo;
                </p>
                <p className="mt-4 text-sm font-bold text-foreground">Priya M.</p>
              </div>
              <div className="rounded-card border border-border bg-white p-6">
                <div className="flex gap-1 text-lime">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  &ldquo;Found exactly what I was looking for. A cargo bike for under ₹2L.
                  Saved a fortune compared to buying new.&rdquo;
                </p>
                <p className="mt-4 text-sm font-bold text-foreground">Amit K.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            9. FIND YOUR RIDE — Final CTA
        ═══════════════════════════════════════════════════════════ */}
        <section className="px-5 pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-card bg-asphalt p-10 text-center md:p-16">
              <h2 className="font-heading text-3xl font-bold text-lime md:text-4xl">
                Ready to find your ride?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-warm-white/60">
                Browse our full inventory of inspected, certified used e-bikes.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" asChild className="bg-lime text-asphalt hover:bg-lime-dark">
                  <Link href="/bikes">
                    Browse All Bikes
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-warm-white/20 text-warm-white hover:bg-warm-white/10">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
