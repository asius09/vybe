"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPriceINR, type VYBEbike } from "@/data/types";
import { ArrowLeft } from "lucide-react";

export function CompareClient({ allBikes }: { allBikes: VYBEbike[] }) {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",") || [];
  const compareBikes = ids
    .map((id) => allBikes.find((b) => b.id === id || b.slug === id))
    .filter(Boolean) as VYBEbike[];

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
    { label: "Price", format: (b: VYBEbike) => formatPriceINR(b.price) },
    { label: "Year", format: (b: VYBEbike) => String(b.year) },
    { label: "Mileage", format: (b: VYBEbike) => `${b.mileage.toLocaleString()} km` },
    { label: "Condition", format: (b: VYBEbike) => b.condition },
    { label: "Battery Health", format: (b: VYBEbike) => `${b.batteryHealthPercent}%` },
    { label: "Estimated Range", format: (b: VYBEbike) => `${b.estimatedRangeKm} km` },
    { label: "Motor Power", format: (b: VYBEbike) => `${b.motorPowerW}W` },
    { label: "Torque", format: (b: VYBEbike) => `${b.torqueNm} Nm` },
    { label: "Battery Capacity", format: (b: VYBEbike) => `${b.batteryCapacityWh} Wh` },
    { label: "Frame Type", format: (b: VYBEbike) => b.frameType },
    { label: "Frame Size", format: (b: VYBEbike) => b.frameSize },
    { label: "Weight", format: (b: VYBEbike) => `${b.weightKg} kg` },
    { label: "Brakes", format: (b: VYBEbike) => b.brakes },
    { label: "Drivetrain", format: (b: VYBEbike) => b.drivetrain },
    { label: "Warranty", format: (b: VYBEbike) => b.warranty },
  ];

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-8">
        <Link href="/bikes" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-4">
          <ArrowLeft className="h-4 w-4" />
          Back to Bikes
        </Link>
        <h1 className="font-heading text-3xl font-bold text-foreground">Compare Bikes</h1>
        <p className="mt-2 text-muted-foreground">{compareBikes.length} bikes selected</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="w-48 pb-4"></th>
              {compareBikes.map((bike) => (
                <th key={bike.slug} className="pb-4 px-4">
                  <Link href={`/bikes/${bike.slug}`} className="group block">
                    <div className="overflow-hidden rounded-card border border-border">
                      <div className="aspect-[4/3] overflow-hidden bg-muted/40">
                        <img src={bike.image} alt={bike.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-3">
                        <p className="text-[10px] text-muted-foreground">{bike.category}</p>
                        <p className="font-heading text-sm font-bold">{bike.name}</p>
                        <p className="font-heading text-base font-extrabold mt-1">{formatPriceINR(bike.price)}</p>
                      </div>
                    </div>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specs.map((spec, i) => (
              <tr key={spec.label} className={i % 2 === 0 ? "bg-muted/20" : ""}>
                <td className="py-3 pr-4 text-sm font-semibold text-muted-foreground">{spec.label}</td>
                {compareBikes.map((bike) => (
                  <td key={bike.slug} className="py-3 px-4 text-sm font-medium text-foreground">
                    {spec.format(bike)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
