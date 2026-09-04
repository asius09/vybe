"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { formatPriceINR, type VYBEbike } from "@/data/types";

const conditionColor: Record<string, string> = {
  Excellent: "bg-lime/10 text-lime-deeper",
  "Very Good": "bg-lime/10 text-lime-deeper",
  Good: "bg-coral/10 text-coral",
  Fair: "bg-purple/10 text-purple",
};

export function BikeCard({ bike }: { bike: VYBEbike }) {
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
          <div className="absolute right-3 top-3">
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${conditionColor[bike.condition] || "bg-muted text-muted-foreground"}`}>
              {bike.condition}
            </span>
          </div>
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
            <Button size="sm" variant="ghost" className="group/btn h-8 px-3">
              View
              <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">→</span>
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
