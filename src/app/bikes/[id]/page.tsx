import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfidenceSignals, InventoryTag } from "@/components/bikes/ConfidenceSignals";
import { getBikeById, formatPrice, formatMileage, bikes, rideIntentLabels, type Bike } from "@/data/bikes";
import { services } from "@/data/services";
import {
  ArrowLeft,
  ArrowRight,
  Bike as BikeIcon,
  Battery,
  Gauge,
  Calendar,
  Ruler,
  Shield,
  MapPin,
  CheckCircle,
  Star,
  Wrench,
  Heart,
  Zap,
  Scale,
  ClipboardCheck,
  History,
  ShieldCheck,
  MessageSquare,
  Phone,
} from "lucide-react";
import type { Metadata } from "next";

const conditionVariant: Record<string, "lime" | "coral" | "purple"> = {
  "Like New": "lime",
  Good: "coral",
  Fair: "purple",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const bike = getBikeById(id);
  if (!bike) return { title: "Bike Not Found" };
  return {
    title: `${bike.brand} ${bike.model} — VYBE Bikes`,
    description: bike.description,
  };
}

export default async function BikeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bike = getBikeById(id);

  if (!bike) {
    notFound();
  }

  const relatedBikes = bikes
    .filter((b) => b.type === bike.type && b.id !== bike.id && b.status === "live")
    .slice(0, 3);

  const includedService = services.find((s) => s.includedWithPurchase);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-10">
        {/* Back Link */}
        <Link
          href="/bikes"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Bikes
        </Link>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 1: HERO — Is this bike right for me?
        ═══════════════════════════════════════════════════════════ */}
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-muted/40 border border-border">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lime/10 via-transparent to-purple/5">
                <BikeIcon className="h-48 w-48 text-foreground/10" strokeWidth={0.5} />
              </div>
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                <Badge variant={conditionVariant[bike.condition]}>
                  {bike.condition}
                </Badge>
                <Badge variant="dark" className="backdrop-blur-sm">
                  {bike.type}
                </Badge>
              </div>
              {bike.inventoryTag.length > 0 && (
                <div className="absolute left-4 top-24 flex flex-col gap-1.5">
                  {bike.inventoryTag.map((tag) => (
                    <InventoryTag key={tag} tag={tag} />
                  ))}
                </div>
              )}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                <CheckCircle className="h-3.5 w-3.5 text-lime-deeper" />
                <span className="text-xs font-bold text-foreground">VYBE Inspected</span>
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square overflow-hidden rounded-card border border-border bg-muted/40"
                >
                  <div className="flex h-full items-center justify-center">
                    <BikeIcon className="h-8 w-8 text-foreground/10" strokeWidth={0.8} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">{bike.brand}</p>
              <h1 className="font-heading text-3xl font-extrabold text-foreground md:text-4xl">
                {bike.model}
              </h1>
              <div className="mt-2 flex flex-wrap gap-2">
                {bike.bestFor.map((intent) => (
                  <Badge key={intent} variant="outline" className="text-xs">
                    {rideIntentLabels[intent]}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="font-heading text-4xl font-extrabold text-foreground">
                {formatPrice(bike.price)}
              </p>
              {bike.monthlyEstimate && (
                <p className="text-sm text-muted-foreground">
                  or ~{formatPrice(bike.monthlyEstimate)}/mo with financing
                </p>
              )}
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 rounded-card bg-muted/40 p-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Year</p>
                  <p className="text-sm font-semibold">{bike.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-card bg-muted/40 p-3">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Mileage</p>
                  <p className="text-sm font-semibold">{formatMileage(bike.mileage)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-card bg-muted/40 p-3">
                <Battery className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Battery</p>
                  <p className="text-sm font-semibold">{bike.batteryHealth}%</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-card bg-muted/40 p-3">
                <Zap className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Motor</p>
                  <p className="text-sm font-semibold">{bike.motorPower}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-card bg-muted/40 p-3">
                <Scale className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Frame</p>
                  <p className="text-sm font-semibold">{bike.frameSize}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-card bg-muted/40 p-3">
                <Gauge className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Range</p>
                  <p className="text-sm font-semibold">{bike.estimatedRange}</p>
                </div>
              </div>
            </div>

            {/* Primary CTA */}
            <Button size="lg" className="w-full" asChild>
              <Link href="/contact">
                <MessageSquare className="h-4 w-4" />
                Ask About This Bike
              </Link>
            </Button>

            <Button size="lg" variant="outline" className="w-full" asChild>
              <a href="tel:+919315405304">
                <Phone className="h-4 w-4" />
                Call to Book a Test Ride
              </a>
            </Button>

            {/* Trust signals */}
            <div className="rounded-card bg-lime/10 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-lime-deeper" />
                <p className="font-heading text-sm font-bold text-foreground">Included with purchase</p>
              </div>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-lime-deeper" />
                  32-point inspection
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-lime-deeper" />
                  Battery health certified
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-lime-deeper" />
                  30-day service support
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 2-6: TABS — Specs, Condition, Battery, Inspection, Ownership
        ═══════════════════════════════════════════════════════════ */}
        <div className="mt-12">
          <Tabs defaultValue="specs">
            <TabsList>
              <TabsTrigger value="specs">What am I getting?</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
              <TabsTrigger value="battery">Battery & Range</TabsTrigger>
              <TabsTrigger value="inspection">Inspection</TabsTrigger>
              <TabsTrigger value="ownership">Ownership</TabsTrigger>
            </TabsList>

            {/* Specs */}
            <TabsContent value="specs" className="mt-6">
              <div className="rounded-card border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Full Specifications</h3>
                <div className="space-y-3">
                  {Object.entries(bike.specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-border/50 py-3 last:border-0">
                      <span className="text-sm text-muted-foreground">{key}</span>
                      <span className="text-sm font-semibold text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Condition */}
            <TabsContent value="condition" className="mt-6">
              <div className="rounded-card border border-border bg-white p-6 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">Condition Report</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{bike.description}</p>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">Condition Rating</h4>
                  <div className="flex items-center gap-3">
                    <Badge variant={conditionVariant[bike.condition]} className="text-sm">
                      {bike.condition}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {bike.condition === "Like New" && "Minimal wear, looks and rides like new"}
                      {bike.condition === "Good" && "Normal use marks, mechanically excellent"}
                      {bike.condition === "Fair" && "Visible wear, fully functional"}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">Visual Overview</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {["Frame", "Components", "Tires"].map((area) => (
                      <div key={area} className="rounded-card bg-muted/40 p-3 text-center">
                        <p className="text-xs font-semibold text-foreground">{area}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {bike.condition === "Like New" ? "Excellent" : bike.condition === "Good" ? "Good" : "Fair"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Battery & Range */}
            <TabsContent value="battery" className="mt-6">
              <div className="rounded-card border border-border bg-white p-6 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">Battery & Range</h3>
                  <p className="text-sm text-muted-foreground">
                    Understand how far you can ride and battery health.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-card bg-muted/40 p-4 text-center">
                    <Battery className="h-8 w-8 mx-auto text-lime-deeper mb-2" />
                    <p className="font-heading text-2xl font-extrabold text-foreground">{bike.batteryHealth}%</p>
                    <p className="text-xs text-muted-foreground">Battery Health</p>
                  </div>
                  <div className="rounded-card bg-muted/40 p-4 text-center">
                    <Gauge className="h-8 w-8 mx-auto text-coral mb-2" />
                    <p className="font-heading text-2xl font-extrabold text-foreground">{bike.estimatedRange}</p>
                    <p className="text-xs text-muted-foreground">Estimated Range</p>
                  </div>
                  <div className="rounded-card bg-muted/40 p-4 text-center">
                    <Zap className="h-8 w-8 mx-auto text-purple mb-2" />
                    <p className="font-heading text-2xl font-extrabold text-foreground">{bike.battery}</p>
                    <p className="text-xs text-muted-foreground">Battery Spec</p>
                  </div>
                </div>
                <div className="rounded-card bg-lime/10 p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Real-world range</strong> depends on rider weight, terrain, assist level, and weather. 
                    Range estimates are based on moderate assist on flat terrain.
                  </p>
                </div>
              </div>
            </TabsContent>

            {/* Inspection */}
            <TabsContent value="inspection" className="mt-6">
              <div className="rounded-card border border-border bg-white p-6 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">VYBE Inspection</h3>
                  <p className="text-sm text-muted-foreground">
                    Every bike passes our {bike.inspectionChecks.length}-point inspection before sale.
                    Inspected on {bike.inspectionDate}.
                  </p>
                </div>
                <ConfidenceSignals checks={bike.inspectionChecks} />
              </div>
            </TabsContent>

            {/* Ownership */}
            <TabsContent value="ownership" className="mt-6">
              <div className="rounded-card border border-border bg-white p-6 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">What does ownership look like?</h3>
                  <p className="text-sm text-muted-foreground">
                    VYBE supports you after the sale.
                  </p>
                </div>

                {/* Warranty */}
                <div className="flex items-start gap-3 rounded-card bg-lime/10 p-4">
                  <ShieldCheck className="h-5 w-5 text-lime-deeper mt-0.5" />
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">{bike.warranty}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Free check-up within 30 days of purchase. We&apos;ll make sure everything is perfect.
                    </p>
                  </div>
                </div>

                {/* Service History */}
                {bike.serviceHistory.length > 0 && (
                  <div>
                    <h4 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                      <History className="h-4 w-4" />
                      Service History
                    </h4>
                    <div className="space-y-3">
                      {bike.serviceHistory.map((entry, i) => (
                        <div key={i} className="flex gap-3 text-sm">
                          <span className="shrink-0 text-muted-foreground">{entry.date}</span>
                          <span className="text-foreground">{entry.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Services */}
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                    <Wrench className="h-4 w-4" />
                    Ongoing Services
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Keep your bike running with VYBE maintenance.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {services.filter((s) => !s.includedWithPurchase).slice(0, 4).map((service) => (
                      <div key={service.id} className="rounded-card border border-border p-3">
                        <p className="text-sm font-semibold">{service.name}</p>
                        <p className="text-xs text-muted-foreground">From {formatPrice(service.startingPrice)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SECTION 7: RELATED BIKES
        ═══════════════════════════════════════════════════════════ */}
        {relatedBikes.length > 0 && (
          <div className="mt-16 space-y-6">
            <Separator />
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Similar Bikes
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBikes.map((b) => (
                <Link key={b.id} href={`/bikes/${b.id}`} className="group">
                  <div className="overflow-hidden rounded-card border-2 border-border bg-white shadow-vybe-sm transition-all duration-300 group-hover:border-lime/50 group-hover:shadow-vybe-md">
                    <div className="relative h-40 overflow-hidden bg-muted/40">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lime/10 to-purple/5 transition-all duration-500 group-hover:from-lime/20 group-hover:to-purple/10">
                        <BikeIcon className="h-16 w-16 text-foreground/15 transition-all duration-500 group-hover:scale-110 group-hover:text-foreground/25" strokeWidth={0.8} />
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground">{b.brand}</p>
                      <p className="font-heading text-base font-bold">{b.model}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="font-heading text-lg font-extrabold">{formatPrice(b.price)}</p>
                        <Badge variant={conditionVariant[b.condition]} className="text-xs">
                          {b.condition}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white p-4 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-heading text-lg font-extrabold">{formatPrice(bike.price)}</p>
              <p className="text-[10px] text-muted-foreground">{bike.condition} · {bike.year}</p>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">
                Ask About This Bike
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
