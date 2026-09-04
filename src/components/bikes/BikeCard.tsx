"use client";

import Link from "next/link";
import Image from "next/image";
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
      <div className="overflow-hidden rounded-card border-2 border-border bg-white transition-all duration-300 group-hover:border-lime/40 group-hover:shadow-vybe-md">
        {/* Image */}
        <div className="relative aspect-4/3 overflow-hidden bg-muted/30">
          <Image
            src={bike.image}
            alt={bike.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {bike.recentlyArrived && (
              <span className="rounded-full bg-lime px-2.5 py-1 text-[10px] font-bold text-asphalt">New</span>
            )}
            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${conditionColor[bike.condition] || "bg-muted text-muted-foreground"}`}>
              {bike.condition}
            </span>
          </div>
          {/* Hover overlay - confidence signal */}
          <div className="absolute inset-0 bg-linear-to-t from-asphalt/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-2 text-[10px] text-warm-white/80">
              <span>{bike.batteryHealthPercent}% battery</span>
              <span>·</span>
              <span>{bike.estimatedRangeKm} km range</span>
              {bike.inspectionScore === "32/32" && (
                <>
                  <span>·</span>
                  <span className="text-lime font-bold">Fully inspected</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-[11px] text-muted-foreground">{bike.category}</p>
          <h3 className="font-heading text-base font-bold text-foreground">{bike.name}</h3>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
            <span>{bike.year}</span>
            <span>·</span>
            <span>{bike.mileage.toLocaleString()} km</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <div>
              <p className="font-heading text-lg font-extrabold">{formatPriceINR(bike.price)}</p>
              {bike.originalPrice > bike.price && (
                <p className="text-[10px] text-muted-foreground line-through">{formatPriceINR(bike.originalPrice)}</p>
              )}
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground group-hover:text-lime-deeper transition-colors">
              Inspect
              <svg className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 6h10M7 2l4 4-4 4" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
