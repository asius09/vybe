"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfidenceSignal, InventoryTag } from "./ConfidenceSignals";
import { formatPrice, formatMileage, type Bike } from "@/data/bikes";
import {
  Bike as BikeIcon,
  ArrowRight,
  Battery,
  Gauge,
  CheckCircle,
  Shield,
  Star,
} from "lucide-react";

const conditionVariant: Record<string, "lime" | "coral" | "purple"> = {
  "Like New": "lime",
  Good: "coral",
  Fair: "purple",
};

export function BikeCard({ bike }: { bike: Bike }) {
  const isSold = bike.status === "sold";
  const isReserved = bike.status === "reserved";

  return (
    <Link href={`/bikes/${bike.id}`} className="group block">
      <div className="relative overflow-hidden rounded-card border-2 border-border bg-white shadow-vybe-sm transition-all duration-300 group-hover:border-lime/50 group-hover:shadow-vybe-md">
        {/* Image */}
        <div className="relative h-52 overflow-hidden bg-muted/40">
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lime/10 via-transparent to-purple/5 transition-all duration-500 group-hover:from-lime/20 group-hover:to-purple/10">
            <BikeIcon className="h-24 w-24 text-foreground/15 transition-all duration-500 group-hover:scale-110 group-hover:text-foreground/25" strokeWidth={0.8} />
          </div>

          {/* Status overlay */}
          {(isSold || isReserved) && (
            <div className="absolute inset-0 flex items-center justify-center bg-asphalt/60 backdrop-blur-sm">
              <Badge variant="dark" className="text-sm">
                {isSold ? "Sold" : "Reserved"}
              </Badge>
            </div>
          )}

          {/* Top badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            <Badge variant="dark" className="backdrop-blur-sm">
              {bike.type}
            </Badge>
            {bike.inventoryTag.slice(0, 2).map((tag) => (
              <InventoryTag key={tag} tag={tag} />
            ))}
          </div>

          {/* Condition */}
          <div className="absolute right-3 top-3">
            <Badge variant={conditionVariant[bike.condition]}>
              {bike.condition}
            </Badge>
          </div>

          {/* Inspection badge */}
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
              <CheckCircle className="h-3 w-3 text-lime-deeper" />
              <span className="text-[10px] font-bold text-foreground">Inspected</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Identity + Price */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs text-muted-foreground">{bike.brand}</p>
              <h3 className="font-heading text-lg font-bold text-foreground leading-tight">
                {bike.model}
              </h3>
            </div>
            <div className="text-right">
              <p className="font-heading text-xl font-extrabold text-foreground">
                {formatPrice(bike.price)}
              </p>
              {bike.monthlyEstimate && (
                <p className="text-[10px] text-muted-foreground">
                  ~{formatPrice(bike.monthlyEstimate)}/mo
                </p>
              )}
            </div>
          </div>

          {/* Key Specs Row */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Battery className="h-3 w-3" />
              {bike.batteryHealth}%
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Gauge className="h-3 w-3" />
              {bike.estimatedRange.split(" ")[0]} mi
            </span>
            <span>·</span>
            <span>{formatMileage(bike.mileage)}</span>
          </div>

          {/* Confidence Signals (top 2) */}
          <div className="space-y-1">
            {bike.inspectionChecks.filter((c) => c.passed).slice(0, 2).map((check) => (
              <ConfidenceSignal key={check.label} label={check.label} passed={check.passed} className="text-xs" />
            ))}
          </div>

          {/* Bottom */}
          <div className="flex items-center justify-between border-t border-border pt-3">
            <div className="flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5 text-lime-deeper" />
              <span className="text-[10px] font-semibold text-muted-foreground">{bike.warranty}</span>
            </div>
            <Button size="sm" variant="ghost" className="group/btn h-8 px-3">
              View
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
