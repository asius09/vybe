import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/services";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";

export const metadata = {
  title: "Repair Services — VYBE Bikes",
  description: "Professional e-bike repair and maintenance. From quick fixes to full overhauls.",
};

const categoryLabels = {
  essential: { label: "Essential", color: "text-lime-deeper" },
  maintenance: { label: "Maintenance", color: "text-coral" },
  repair: { label: "Repair", color: "text-purple" },
  diagnostic: { label: "Diagnostic", color: "text-muted-foreground" },
};

export default function RepairsPage() {
  const essential = services.filter((s) => s.category === "essential");
  const maintenance = services.filter((s) => s.category === "maintenance");
  const repair = services.filter((s) => s.category === "repair");
  const diagnostic = services.filter((s) => s.category === "diagnostic");

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main-content">
        {/* ═══ HERO ═══ */}
        <section className="bg-asphalt px-5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-lime">
                  Certified Workshop
                </span>
                <h1 className="mt-4 font-heading text-4xl font-extrabold text-warm-white md:text-5xl lg:text-6xl">
                  Expert care for
                  <br />
                  <span className="text-warm-white/50">every e-bike.</span>
                </h1>
                <p className="mt-5 text-base text-warm-white/60 max-w-md leading-relaxed">
                  From minor tune-ups to battery rebuilds and motor diagnostics.
                  Every brand, every model, done right.
                </p>
                <div className="mt-8 flex gap-6">
                  <div>
                    <p className="font-heading text-2xl font-extrabold text-warm-white">32-pt</p>
                    <p className="text-[11px] text-warm-white/40">Inspection</p>
                  </div>
                  <div className="w-px bg-warm-white/10" />
                  <div>
                    <p className="font-heading text-2xl font-extrabold text-warm-white">30-day</p>
                    <p className="text-[11px] text-warm-white/40">Warranty</p>
                  </div>
                  <div className="w-px bg-warm-white/10" />
                  <div>
                    <p className="font-heading text-2xl font-extrabold text-warm-white">All</p>
                    <p className="text-[11px] text-warm-white/40">Brands</p>
                  </div>
                </div>
              </div>

              {/* Right — E-bike image */}
              <div className="relative hidden md:flex items-center justify-center">
                <div className="absolute -inset-20 bg-lime/5 blur-3xl rounded-full" />
                <div className="relative w-80 h-56 rounded-2xl opacity-30 overflow-hidden">
                  <Image
                    src="https://images.pexels.com/photos/19411352/pexels-photo-19411352.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt=""
                    fill
                    sizes="320px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ INCLUDED WITH PURCHASE ═══ */}
        <section className="border-y border-border bg-lime/5 px-5 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-12">
              <div className="shrink-0">
                <Badge variant="lime">Included</Badge>
              </div>
              <div className="grid gap-6 md:grid-cols-3 flex-1">
                {[
                  { title: "32-Point Inspection", desc: "Every VYBE bike passes our comprehensive safety check before sale." },
                  { title: "Battery Certified", desc: "Full health diagnostic with capacity test and cell balance check." },
                  { title: "30-Day Support", desc: "Free check-up within 30 days. We make sure everything runs perfectly." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="mt-0.5 h-5 w-5 rounded-full bg-lime flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-asphalt" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">{item.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section className="px-5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl space-y-16">
            {/* Section header */}
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Our Services</p>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                Transparent pricing.
                <br />
                No hidden fees.
              </h2>
            </div>

            {/* Essential */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="font-heading text-lg font-bold text-foreground">Essential</h3>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {essential.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>

            {/* Maintenance */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="font-heading text-lg font-bold text-foreground">Maintenance</h3>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {maintenance.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>

            {/* Repair */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="font-heading text-lg font-bold text-foreground">Repair</h3>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {repair.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>

            {/* Diagnostic */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <h3 className="font-heading text-lg font-bold text-foreground">Diagnostic</h3>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {diagnostic.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section className="px-5 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-2xl bg-asphalt p-10 text-center md:p-16 relative">
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/4542985/pexels-photo-4542985.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="font-heading text-3xl font-bold text-warm-white md:text-4xl relative">
                Ready to book?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-warm-white/50 relative">
                Contact us to schedule your service. Walk-ins welcome, appointments preferred.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center relative">
                <Button size="lg" className="bg-lime text-asphalt hover:bg-lime-dark font-bold" asChild>
                  <Link href="/contact">
                    Book a Service
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-warm-white/20 text-warm-white hover:bg-warm-white/10">
                  <a href="tel:+919315405304">Call +91 93154 05304</a>
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

function ServiceCard({ service }: { service: typeof services[number] }) {
  const cat = categoryLabels[service.category];
  return (
    <div className="group rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:border-lime/40 hover:shadow-vybe-md">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${cat.color}`}>{cat.label}</p>
          <h4 className="font-heading text-base font-bold text-foreground">{service.name}</h4>
        </div>
        {service.popular && (
          <Badge variant="lime" className="text-[10px]">Popular</Badge>
        )}
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{service.description}</p>

      {/* Steps */}
      <div className="space-y-1.5 mb-4">
        {service.steps.slice(0, 4).map((step) => (
          <div key={step} className="flex items-center gap-2 text-xs text-muted-foreground">
            <Check className="h-3 w-3 text-lime-deeper shrink-0" />
            {step}
          </div>
        ))}
        {service.steps.length > 4 && (
          <p className="text-[10px] text-muted-foreground/60 ml-5">+{service.steps.length - 4} more</p>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="font-heading text-lg font-extrabold">₹{service.startingPrice}</p>
          <p className="text-[10px] text-muted-foreground">Starting price</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold text-foreground">{service.duration}</p>
          <p className="text-[10px] text-muted-foreground">Typical time</p>
        </div>
      </div>
    </div>
  );
}
