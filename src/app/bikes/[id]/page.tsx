import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBikeBySlug, formatPriceINR, filterBikes, type VYBEbike } from "@/data/loader";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

const conditionVariant: Record<string, "lime" | "coral" | "purple"> = {
  Excellent: "lime",
  "Very Good": "lime",
  Good: "coral",
  Fair: "purple",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const bike = getBikeBySlug(id);
  if (!bike) return { title: "Bike Not Found" };
  return {
    title: `${bike.name} — VYBE Bikes`,
    description: bike.description,
  };
}

export default async function BikeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bike = getBikeBySlug(id);

  if (!bike) {
    notFound();
  }

  const relatedBikes = filterBikes({ category: bike.category })
    .filter((b) => b.slug !== bike.slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link
          href="/bikes"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          All Bikes
        </Link>

        {/* ═══ HERO ═══ */}
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* Image */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-muted/40 border border-border">
              <img
                src={bike.image}
                alt={bike.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                <Badge variant={conditionVariant[bike.condition] || "outline"}>
                  {bike.condition}
                </Badge>
                <Badge variant="dark">{bike.category}</Badge>
              </div>
              {bike.recentlyArrived && (
                <div className="absolute left-4 top-24">
                  <span className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold text-asphalt">New Arrival</span>
                </div>
              )}
              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 backdrop-blur-sm">
                <span className="text-xs font-bold text-foreground">VYBE Inspected</span>
              </div>
            </div>

            {/* Thumbnails */}
            {bike.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {bike.images.slice(0, 4).map((img, i) => (
                  <div key={i} className="aspect-square overflow-hidden rounded-card border border-border bg-muted/40">
                    <img src={img} alt={`${bike.name} ${i + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground">{bike.category}</p>
              <h1 className="font-heading text-3xl font-extrabold text-foreground md:text-4xl">
                {bike.name}
              </h1>
              {bike.bestFor && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {bike.bestFor.split(",").map((intent) => (
                    <Badge key={intent} variant="outline" className="text-xs">
                      {intent.trim()}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="font-heading text-4xl font-extrabold text-foreground">
                {formatPriceINR(bike.price)}
              </p>
              <p className="text-sm text-muted-foreground line-through">{formatPriceINR(bike.originalPrice)}</p>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Year", value: String(bike.year) },
                { label: "Mileage", value: `${bike.mileage.toLocaleString()} km` },
                { label: "Battery", value: `${bike.batteryHealthPercent}%` },
                { label: "Motor", value: `${bike.motorPowerW}W` },
                { label: "Range", value: `${bike.estimatedRangeKm} km` },
                { label: "Frame", value: bike.frameSize },
                { label: "Weight", value: `${bike.weightKg} kg` },
                { label: "Brakes", value: bike.brakes },
              ].map((spec) => (
                <div key={spec.label} className="rounded-card bg-muted/40 p-3">
                  <p className="text-xs text-muted-foreground">{spec.label}</p>
                  <p className="text-sm font-semibold">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <Button size="lg" className="w-full" asChild>
              <Link href="/contact">Ask About This Bike</Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full" asChild>
              <a href="tel:+919315405304">Call to Book a Test Ride</a>
            </Button>

            {/* Trust */}
            <div className="rounded-card bg-lime/10 p-4">
              <p className="font-heading text-sm font-bold text-foreground mb-2">Included with purchase</p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">✓ 32-point inspection</li>
                <li className="flex items-center gap-2">✓ Battery health certified</li>
                <li className="flex items-center gap-2">✓ 30-day service support</li>
                <li className="flex items-center gap-2">✓ {bike.warranty}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ═══ TABS ═══ */}
        <div className="mt-12">
          <Tabs defaultValue="specs">
            <TabsList>
              <TabsTrigger value="specs">What am I getting?</TabsTrigger>
              <TabsTrigger value="condition">Condition</TabsTrigger>
              <TabsTrigger value="battery">Battery & Range</TabsTrigger>
              <TabsTrigger value="ownership">Ownership</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-6">
              <div className="rounded-card border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">Full Specifications</h3>
                <div className="space-y-3">
                  {[
                    { label: "Model", value: bike.name },
                    { label: "Category", value: bike.category },
                    { label: "Year", value: String(bike.year) },
                    { label: "Condition", value: bike.condition },
                    { label: "Mileage", value: `${bike.mileage.toLocaleString()} km` },
                    { label: "Color", value: bike.color },
                    { label: "Frame Type", value: bike.frameType },
                    { label: "Frame Size", value: bike.frameSize },
                    { label: "Wheel Size", value: bike.wheelSize },
                    { label: "Weight", value: `${bike.weightKg} kg` },
                    { label: "Brakes", value: bike.brakes },
                    { label: "Drivetrain", value: bike.drivetrain },
                    { label: "Motor Power", value: `${bike.motorPowerW}W` },
                    { label: "Torque", value: `${bike.torqueNm} Nm` },
                    { label: "Battery Capacity", value: `${bike.batteryCapacityWh} Wh` },
                  ].map((spec) => (
                    <div key={spec.label} className="flex justify-between border-b border-border/50 py-3 last:border-0">
                      <span className="text-sm text-muted-foreground">{spec.label}</span>
                      <span className="text-sm font-semibold text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="condition" className="mt-6">
              <div className="rounded-card border border-border bg-white p-6 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">Condition Report</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{bike.description}</p>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">Condition Rating</h4>
                  <div className="flex items-center gap-3">
                    <Badge variant={conditionVariant[bike.condition] || "outline"} className="text-sm">
                      {bike.condition}
                    </Badge>
                  </div>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">Visual Overview</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {["Frame", "Components", "Tires"].map((area) => (
                      <div key={area} className="rounded-card bg-muted/40 p-3 text-center">
                        <p className="text-xs font-semibold text-foreground">{area}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">{bike.condition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="battery" className="mt-6">
              <div className="rounded-card border border-border bg-white p-6 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">Battery & Range</h3>
                  <p className="text-sm text-muted-foreground">Understand how far you can ride and battery health.</p>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-card bg-muted/40 p-4 text-center">
                    <p className="font-heading text-2xl font-extrabold text-foreground">{bike.batteryHealthPercent}%</p>
                    <p className="text-xs text-muted-foreground">Battery Health</p>
                  </div>
                  <div className="rounded-card bg-muted/40 p-4 text-center">
                    <p className="font-heading text-2xl font-extrabold text-foreground">{bike.estimatedRangeKm} km</p>
                    <p className="text-xs text-muted-foreground">Estimated Range</p>
                  </div>
                  <div className="rounded-card bg-muted/40 p-4 text-center">
                    <p className="font-heading text-2xl font-extrabold text-foreground">{bike.batteryCapacityWh} Wh</p>
                    <p className="text-xs text-muted-foreground">Battery Capacity</p>
                  </div>
                </div>
                <div className="rounded-card bg-lime/10 p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Real-world range</strong> depends on rider weight, terrain, assist level, and weather.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="ownership" className="mt-6">
              <div className="rounded-card border border-border bg-white p-6 space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2">What does ownership look like?</h3>
                  <p className="text-sm text-muted-foreground">VYBE supports you after the sale.</p>
                </div>
                <div className="rounded-card bg-lime/10 p-4">
                  <p className="font-heading text-sm font-bold text-foreground">{bike.warranty}</p>
                  <p className="text-xs text-muted-foreground mt-1">Free check-up within 30 days of purchase.</p>
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">Ongoing Services</h4>
                  <p className="text-sm text-muted-foreground mb-3">Keep your bike running with VYBE maintenance.</p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-card border border-border p-3">
                      <p className="text-sm font-semibold">Full Service</p>
                      <p className="text-xs text-muted-foreground">From ₹1,200</p>
                    </div>
                    <div className="rounded-card border border-border p-3">
                      <p className="text-sm font-semibold">Brake Tuning</p>
                      <p className="text-xs text-muted-foreground">From ₹400</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* ═══ RELATED ═══ */}
        {relatedBikes.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">Similar Bikes</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedBikes.map((b) => (
                <Link key={b.slug} href={`/bikes/${b.slug}`} className="group">
                  <div className="overflow-hidden rounded-card border-2 border-border bg-white shadow-vybe-sm transition-all duration-300 group-hover:border-lime/50 group-hover:shadow-vybe-md">
                    <div className="relative h-40 overflow-hidden bg-muted/40">
                      <img src={b.image} alt={b.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-muted-foreground">{b.category}</p>
                      <p className="font-heading text-base font-bold">{b.name}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="font-heading text-lg font-extrabold">{formatPriceINR(b.price)}</p>
                        <Badge variant={conditionVariant[b.condition] || "outline"} className="text-xs">
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
              <p className="font-heading text-lg font-extrabold">{formatPriceINR(bike.price)}</p>
              <p className="text-[10px] text-muted-foreground">{bike.condition} · {bike.year}</p>
            </div>
            <Button size="lg" asChild>
              <Link href="/contact">Ask About This Bike →</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
