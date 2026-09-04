"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ConfidenceSignals } from "@/components/bikes/ConfidenceSignals";
import { getBikeById, formatPrice, formatMileage, rideIntentLabels, type Bike } from "@/data/bikes";
import { ArrowLeft, ArrowRight, Bike as BikeIcon, CheckCircle, XCircle } from "lucide-react";

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",") || [];
  const compareBikes = ids.map((id) => getBikeById(id)).filter(Boolean) as Bike[];

  if (compareBikes.length < 2) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="font-heading text-2xl font-bold">Select at least 2 bikes to compare</h2>
        <p className="mt-2 text-muted-foreground">Go back and select bikes from the browse page.</p>
        <Button className="mt-6" asChild>
          <Link href="/bikes">
            <ArrowLeft className="h-4 w-4" />
            Browse Bikes
          </Link>
        </Button>
      </div>
    );
  }

  const specs = [
    { label: "Price", key: "price" as const, format: (b: Bike) => formatPrice(b.price) },
    { label: "Year", key: "year" as const, format: (b: Bike) => String(b.year) },
    { label: "Mileage", key: "mileage" as const, format: (b: Bike) => formatMileage(b.mileage) },
    { label: "Condition", key: "condition" as const, format: (b: Bike) => b.condition },
    { label: "Battery Health", key: "batteryHealth" as const, format: (b: Bike) => `${b.batteryHealth}%` },
    { label: "Estimated Range", key: "estimatedRange" as const, format: (b: Bike) => b.estimatedRange },
    { label: "Motor", key: "motor" as const, format: (b: Bike) => b.motor },
    { label: "Motor Power", key: "motorPower" as const, format: (b: Bike) => b.motorPower },
    { label: "Battery", key: "battery" as const, format: (b: Bike) => b.battery },
    { label: "Frame Size", key: "frameSize" as const, format: (b: Bike) => b.frameSize },
    { label: "Weight", key: "weight" as const, format: (b: Bike) => b.weight },
    { label: "Top Speed", key: "topSpeed" as const, format: (b: Bike) => b.topSpeed },
    { label: "Warranty", key: "warranty" as const, format: (b: Bike) => b.warranty },
    { label: "Best For", key: "bestFor" as const, format: (b: Bike) => b.bestFor.map((i) => rideIntentLabels[i]).join(", ") },
  ];

  return (
    <main className="mx-auto max-w-6xl px-5 py-10">
      <Link href="/bikes" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Bikes
      </Link>

      <h1 className="font-heading text-3xl font-bold text-foreground mb-8">
        Compare Bikes
      </h1>

      {/* Bike Headers */}
      <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${compareBikes.length}, 1fr)` }}>
        {compareBikes.map((bike) => (
          <Link key={bike.id} href={`/bikes/${bike.id}`} className="group rounded-card border border-border bg-white p-5 text-center transition-all hover:shadow-vybe-sm">
            <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-card bg-muted/40">
              <BikeIcon className="h-12 w-12 text-foreground/15" strokeWidth={0.8} />
            </div>
            <p className="text-xs text-muted-foreground">{bike.brand}</p>
            <p className="font-heading text-lg font-bold group-hover:text-lime-deeper transition-colors">{bike.model}</p>
            <Badge variant="outline" className="mt-2">{bike.type}</Badge>
          </Link>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mt-8 overflow-x-auto rounded-card border border-border bg-white">
        <table className="w-full text-sm">
          <tbody>
            {specs.map((spec, i) => (
              <tr key={spec.label} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                <td className="px-5 py-3 font-heading font-bold text-foreground w-40">
                  {spec.label}
                </td>
                {compareBikes.map((bike) => (
                  <td key={bike.id} className="px-5 py-3 text-center text-muted-foreground">
                    {spec.format(bike)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inspection Comparison */}
      <div className="mt-8">
        <h2 className="font-heading text-xl font-bold text-foreground mb-4">Inspection Results</h2>
        <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${compareBikes.length}, 1fr)` }}>
          {compareBikes.map((bike) => (
            <div key={bike.id} className="rounded-card border border-border bg-white p-5">
              <p className="font-heading text-sm font-bold mb-3">{bike.brand} {bike.model}</p>
              <ConfidenceSignals checks={bike.inspectionChecks} />
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="mt-10 grid gap-5" style={{ gridTemplateColumns: `repeat(${compareBikes.length}, 1fr)` }}>
        {compareBikes.map((bike) => (
          <div key={bike.id} className="rounded-card border border-border bg-white p-5 text-center space-y-3">
            <p className="font-heading text-xl font-extrabold">{formatPrice(bike.price)}</p>
            <Button className="w-full" asChild>
              <Link href={`/bikes/${bike.id}`}>
                View Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Suspense fallback={<div className="mx-auto max-w-6xl px-5 py-20 text-center text-muted-foreground">Loading comparison...</div>}>
        <CompareContent />
      </Suspense>
      <Footer />
    </div>
  );
}
