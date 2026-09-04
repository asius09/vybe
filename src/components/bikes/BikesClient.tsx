"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { BikeCard } from "@/components/bikes/BikeCard";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { formatPriceINR, type VYBEbike } from "@/data/types";
import { Search, SlidersHorizontal } from "lucide-react";

const PAGE_SIZE = 6;

const categories = [
  { id: "all", label: "All" },
  { id: "City", label: "City" },
  { id: "Commuter", label: "Commuter" },
  { id: "Mountain", label: "Mountain" },
  { id: "Hybrid", label: "Hybrid" },
  { id: "Folding", label: "Folding" },
  { id: "Cargo", label: "Cargo" },
];

const conditions = ["Excellent", "Very Good", "Good"];

export function BikesClient({ initialBikes }: { initialBikes: VYBEbike[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState([250000]);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);

  const allBikes = useMemo(() => {
    let result = initialBikes;
    if (selectedCategory !== "all") {
      result = result.filter((b) => b.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (selectedCondition) {
      result = result.filter((b) => b.condition === selectedCondition);
    }
    result = result.filter((b) => b.price <= priceRange[0]);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q) || b.color.toLowerCase().includes(q)
      );
    }
    return result;
  }, [initialBikes, selectedCategory, selectedCondition, priceRange, search]);

  const totalPages = Math.ceil(allBikes.length / PAGE_SIZE);
  const paginatedBikes = allBikes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <ScrollReveal>
          <div className="mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Shop</p>
            <h1 className="font-heading text-4xl font-bold text-foreground">Browse Bikes</h1>
            <p className="mt-2 text-muted-foreground">{allBikes.length} bikes available</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={50}>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setPage(1); }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  selectedCategory === cat.id ? "bg-foreground text-warm-white" : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 md:max-w-xs">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search bikes..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {(selectedCondition || priceRange[0] < 250000) && (
                <span className="ml-1 h-5 w-5 rounded-full bg-foreground text-warm-white text-[10px] flex items-center justify-center">!</span>
              )}
            </Button>
          </div>
        </ScrollReveal>

        {showFilters && (
          <div className="mb-6 rounded-card border border-border bg-white p-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-sm font-bold">Max Price</h3>
                  <span className="text-sm font-heading font-bold">{formatPriceINR(priceRange[0])}</span>
                </div>
                <Slider value={priceRange} onValueChange={(v) => { setPriceRange(v); setPage(1); }} max={250000} min={50000} step={5000} />
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                  <span>{formatPriceINR(50000)}</span>
                  <span>{formatPriceINR(250000)}</span>
                </div>
              </div>
              <div>
                <h3 className="font-heading text-sm font-bold mb-3">Condition</h3>
                <div className="flex flex-wrap gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c}
                      onClick={() => { setSelectedCondition(selectedCondition === c ? null : c); setPage(1); }}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                        selectedCondition === c ? "bg-foreground text-warm-white" : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {paginatedBikes.length === 0 ? (
          <div className="rounded-card border border-border bg-white py-16 text-center">
            <h3 className="font-heading text-lg font-bold text-foreground">No bikes found</h3>
            <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setSelectedCategory("all"); setSelectedCondition(null); setPriceRange([250000]); setPage(1); }}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-5">
              {paginatedBikes.slice(0, 3).map((bike, i) => (
                <ScrollReveal key={bike.id} delay={i * 80}>
                  <BikeCard bike={bike} />
                </ScrollReveal>
              ))}
            </div>
            {paginatedBikes.length > 3 && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedBikes.slice(3, 6).map((bike, i) => (
                  <ScrollReveal key={bike.id} delay={i * 80}>
                    <BikeCard bike={bike} />
                  </ScrollReveal>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>← Prev</Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button key={p} onClick={() => setPage(p)} className={`h-9 w-9 rounded-full text-sm font-semibold transition-all ${p === page ? "bg-foreground text-warm-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{p}</button>
                ))}
                <Button variant="outline" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>Next →</Button>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
