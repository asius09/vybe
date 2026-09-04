"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPriceINR, type VYBEbike, type InventoryStatus } from "@/data/types";
import { ArrowLeft, Search, ChevronRight, RefreshCw } from "lucide-react";

const statusConfig: Record<InventoryStatus, { label: string; variant: "lime" | "coral" | "purple" | "dark" | "outline" }> = {
  draft: { label: "Draft", variant: "outline" },
  inspection: { label: "Inspection", variant: "purple" },
  ready: { label: "Ready", variant: "lime" },
  live: { label: "Live", variant: "lime" },
  reserved: { label: "Reserved", variant: "coral" },
  sold: { label: "Sold", variant: "dark" },
};

const statusCycle: InventoryStatus[] = ["draft", "inspection", "ready", "live", "reserved", "sold"];

export function InventoryClient({ initialBikes }: { initialBikes: VYBEbike[] }) {
  const [bikes, setBikes] = useState(initialBikes);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<InventoryStatus | "all">("all");
  const [updating, setUpdating] = useState<string | null>(null);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: bikes.length };
    statusCycle.forEach((s) => (counts[s] = 0));
    bikes.forEach((b) => (counts[b.inventoryStatus] = (counts[b.inventoryStatus] || 0) + 1));
    return counts;
  }, [bikes]);

  const filteredBikes = useMemo(() => {
    let result = bikes;
    if (filterStatus !== "all") {
      result = result.filter((b) => b.inventoryStatus === filterStatus);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
    }
    return result;
  }, [bikes, filterStatus, search]);

  const advanceStatus = useCallback(async (bike: VYBEbike) => {
    const current = bike.inventoryStatus;
    const idx = statusCycle.indexOf(current);
    if (idx >= statusCycle.length - 1) return;

    const nextStatus = statusCycle[idx + 1];
    setUpdating(bike.id);

    try {
      const res = await fetch(`/api/admin/bikes/${bike.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inventoryStatus: nextStatus }),
      });

      if (res.ok) {
        setBikes((prev) =>
          prev.map((b) => (b.id === bike.id ? { ...b, inventoryStatus: nextStatus } : b))
        );
      }
    } finally {
      setUpdating(null);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back to VYBE
        </Link>

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-4xl font-bold text-foreground">Inventory</h1>
            <p className="mt-2 text-muted-foreground">{bikes.length} bikes in inventory</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>

        {/* Status Counts */}
        <div className="mb-6 flex flex-wrap gap-2">
          {(["all", ...statusCycle] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                filterStatus === s ? "bg-foreground text-warm-white" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s].label}
              <span className="ml-1.5 text-[10px] opacity-70">{statusCounts[s]}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mb-6 relative max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>

        {/* Table */}
        <div className="rounded-card border border-border bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 font-heading font-bold">Bike</th>
                  <th className="px-4 py-3 font-heading font-bold">Category</th>
                  <th className="px-4 py-3 font-heading font-bold">Price</th>
                  <th className="px-4 py-3 font-heading font-bold">Condition</th>
                  <th className="px-4 py-3 font-heading font-bold">Status</th>
                  <th className="px-4 py-3 font-heading font-bold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredBikes.map((bike) => {
                  const config = statusConfig[bike.inventoryStatus];
                  const currentIdx = statusCycle.indexOf(bike.inventoryStatus);
                  const nextStatus = currentIdx < statusCycle.length - 1 ? statusCycle[currentIdx + 1] : null;

                  return (
                    <tr key={bike.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 shrink-0 overflow-hidden rounded bg-muted/40">
                            <img src={bike.image} alt={bike.name} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{bike.name}</p>
                            <p className="text-[10px] text-muted-foreground">{bike.year} · {bike.mileage.toLocaleString()} km</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{bike.category}</td>
                      <td className="px-4 py-3 font-semibold">{formatPriceINR(bike.price)}</td>
                      <td className="px-4 py-3">
                        <Badge variant={bike.condition === "Excellent" || bike.condition === "Very Good" ? "lime" : bike.condition === "Good" ? "coral" : "purple"}>
                          {bike.condition}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={config.variant}>{config.label}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {nextStatus && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => advanceStatus(bike)}
                            disabled={updating === bike.id}
                          >
                            {updating === bike.id ? "..." : statusConfig[nextStatus].label}
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {filteredBikes.length === 0 && (
            <div className="py-12 text-center text-muted-foreground"><p>No bikes found.</p></div>
          )}
        </div>

        {/* Lifecycle Legend */}
        <div className="mt-8 rounded-card border border-border bg-white p-6">
          <h3 className="font-heading text-lg font-bold text-foreground mb-4">Inventory Lifecycle</h3>
          <div className="flex flex-wrap items-center gap-2">
            {statusCycle.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <Badge variant={statusConfig[s].variant}>{statusConfig[s].label}</Badge>
                {i < statusCycle.length - 1 && <span className="text-muted-foreground">→</span>}
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
