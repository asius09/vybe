"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { BikeCard } from "@/components/bikes/BikeCard";
import {
  bikes,
  getLiveBikes,
  formatPrice,
  type BikeType,
  type RideIntent,
  rideIntentLabels,
  rideIntentDescriptions,
} from "@/data/bikes";
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowRight,
  Map,
  Bike as BikeIcon,
  Compass,
  Mountain,
  Package,
  Home,
  Navigation,
} from "lucide-react";

const rideIntents: { id: RideIntent; icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }[] = [
  { id: "commute", icon: BikeIcon },
  { id: "weekend", icon: Compass },
  { id: "hills", icon: Mountain },
  { id: "cargo", icon: Package },
  { id: "small-space", icon: Home },
  { id: "getting-around", icon: Navigation },
];

const bikeTypes: { id: BikeType | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "city", label: "City" },
  { id: "folding", label: "Folding" },
  { id: "cargo", label: "Cargo" },
  { id: "mountain", label: "Mountain" },
  { id: "hybrid", label: "Hybrid" },
  { id: "commuter", label: "Commuter" },
];

export default function BikesPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<BikeType | "all">("all");
  const [selectedIntent, setSelectedIntent] = useState<RideIntent | null>(null);
  const [priceRange, setPriceRange] = useState([3000]);
  const [showFilters, setShowFilters] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  const liveBikes = getLiveBikes();

  const filtered = useMemo(() => {
    let result = liveBikes;

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.brand.toLowerCase().includes(q) ||
          b.model.toLowerCase().includes(q)
      );
    }

    if (selectedType !== "all") {
      result = result.filter((b) => b.type === selectedType);
    }

    if (selectedIntent) {
      result = result.filter((b) => b.bestFor.includes(selectedIntent));
    }

    result = result.filter((b) => b.price <= priceRange[0]);

    return result;
  }, [liveBikes, search, selectedType, selectedIntent, priceRange]);

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((i) => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const compareBikes = liveBikes.filter((b) => compareIds.includes(b.id));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-10">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <Badge variant="outline" className="w-fit">Browse</Badge>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Find Your Ride
          </h1>
          <p className="max-w-lg text-muted-foreground">
            {liveBikes.length} inspected, certified e-bikes ready for their next owner.
          </p>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            INTENT BROWSING — What are you riding for?
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-10">
          <h2 className="font-heading text-lg font-bold text-foreground mb-4">
            What are you riding for?
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
            {rideIntents.map((intent) => {
              const Icon = intent.icon;
              const isActive = selectedIntent === intent.id;
              return (
                <button
                  key={intent.id}
                  onClick={() => setSelectedIntent(isActive ? null : intent.id)}
                  className={`group flex flex-col items-center gap-2 rounded-card border-2 p-4 transition-all duration-200 ${
                    isActive
                      ? "border-lime bg-lime/10 shadow-vybe-lime"
                      : "border-border bg-white hover:border-lime/40 hover:shadow-vybe-sm"
                  }`}
                >
                  <Icon
                    className={`h-6 w-6 transition-colors ${
                      isActive ? "text-lime-deeper" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                    strokeWidth={1.5}
                  />
                  <span className={`text-xs font-semibold text-center leading-tight ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {rideIntentLabels[intent.id]}
                  </span>
                </button>
              );
            })}
          </div>
          {selectedIntent && (
            <p className="mt-3 text-sm text-muted-foreground">
              {rideIntentDescriptions[selectedIntent]}
            </p>
          )}
        </section>

        {/* Filters Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {bikeTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  selectedType === type.id
                    ? "bg-foreground text-warm-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search bikes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mb-6 rounded-card border border-border bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading text-sm font-bold">Price Range</h3>
              <span className="text-sm font-heading font-bold">Up to {formatPrice(priceRange[0])}</span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={5000}
              min={500}
              step={100}
            />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{formatPrice(500)}</span>
              <span>{formatPrice(5000)}</span>
            </div>
          </div>
        )}

        {/* Compare Bar */}
        {compareIds.length > 0 && (
          <div className="mb-6 rounded-card border border-lime bg-lime/5 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime text-asphalt">
                  <span className="text-xs font-bold">{compareIds.length}</span>
                </div>
                <span className="text-sm font-semibold">
                  {compareIds.length === 1 ? "Select 1 more to compare" : compareIds.length >= 2 ? "Ready to compare" : "Select bikes to compare"}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCompareIds([])}
                >
                  Clear
                </Button>
                {compareIds.length >= 2 && (
                  <Button size="sm" asChild>
                    <Link href={`/bikes/compare?ids=${compareIds.join(",")}`}>
                      Compare
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {compareBikes.map((b) => (
                <div key={b.id} className="flex items-center gap-2 rounded-full bg-white border border-border px-3 py-1.5">
                  <span className="text-xs font-semibold">{b.brand} {b.model}</span>
                  <button onClick={() => toggleCompare(b.id)}>
                    <X className="h-3 w-3 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filtered.length} bike{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-card border border-border bg-white py-16 text-center">
            <BikeIcon className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" strokeWidth={0.8} />
            <h3 className="font-heading text-lg font-bold text-foreground">No bikes match your filters</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your criteria or browse all bikes.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearch("");
                setSelectedType("all");
                setSelectedIntent(null);
                setPriceRange([3000]);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((bike) => (
              <div key={bike.id} className="relative">
                <BikeCard bike={bike} />
                {/* Compare checkbox */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    toggleCompare(bike.id);
                  }}
                  className={`absolute top-3 right-3 z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                    compareIds.includes(bike.id)
                      ? "border-lime bg-lime text-asphalt"
                      : "border-border bg-white/90 backdrop-blur-sm hover:border-lime/50"
                  }`}
                  aria-label={compareIds.includes(bike.id) ? "Remove from comparison" : "Add to comparison"}
                >
                  {compareIds.includes(bike.id) && (
                    <span className="text-xs font-bold">✓</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Mobile Sticky CTA */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white p-4 md:hidden">
          <Button className="w-full" size="lg" asChild>
            <Link href="/contact">
              <Map className="h-4 w-4" />
              Find a Bike Near You
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
