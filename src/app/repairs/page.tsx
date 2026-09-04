import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { services } from "@/data/services";
import Link from "next/link";
import { ArrowRight, Shield, Clock, Wrench } from "lucide-react";

export const metadata = {
  title: "Repair Services — VYBE Bikes",
  description: "Professional e-bike repair and maintenance. From quick fixes to full overhauls.",
};

export default function RepairsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        {/* Hero */}
        <section className="px-5 py-16 md:py-24">
          <div className="mx-auto max-w-6xl space-y-6">
            <Badge variant="outline" className="w-fit">Repair Services</Badge>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
              Expert E-Bike
              <br />
              <span className="text-lime-deeper">Repairs</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              From quick safety checks to full overhauls. Our in-house team
              services all e-bike brands and models.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Book a Service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="border-y border-border bg-muted/30 px-5 py-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/20">
                  <Shield className="h-5 w-5 text-lime-deeper" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Certified Mechanics</p>
                  <p className="text-xs text-muted-foreground">Trained on all major e-bike systems</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral/10">
                  <Clock className="h-5 w-5 text-coral" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Fast Turnaround</p>
                  <p className="text-xs text-muted-foreground">Most services completed in 1-3 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple/10">
                  <Wrench className="h-5 w-5 text-purple" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">All Brands</p>
                  <p className="text-xs text-muted-foreground">We service Rad, Trek, Specialized, and more</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="px-5 py-16">
          <div className="mx-auto max-w-6xl space-y-8">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground">
                Our Services
              </h2>
              <p className="mt-2 text-muted-foreground">
                Transparent pricing. No hidden fees.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-16">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-card bg-asphalt p-10 text-center md:p-16">
              <h2 className="font-heading text-3xl font-bold text-lime md:text-4xl">
                Ready to book?
              </h2>
              <p className="mx-auto mt-4 max-w-md text-warm-white/60">
                Contact us to schedule your service. Walk-ins welcome, appointments preferred.
              </p>
              <div className="mt-8">
                <Button size="lg" asChild className="bg-lime text-asphalt hover:bg-lime-dark">
                  <Link href="/contact">
                    Book a Service
                    <ArrowRight className="h-4 w-4" />
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
