"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPriceINR, type VYBEbike, type InventoryStatus } from "@/data/types";
import {
  ArrowLeft, Search, ChevronRight, RefreshCw, Plus, Pencil, Trash2,
  ChevronLeft, X,
} from "lucide-react";

const statusConfig: Record<InventoryStatus, { label: string; variant: "lime" | "coral" | "purple" | "dark" | "outline"; color: string }> = {
  draft: { label: "Draft", variant: "outline", color: "bg-muted" },
  live: { label: "Live", variant: "lime", color: "bg-lime/10" },
  sold: { label: "Sold", variant: "dark", color: "bg-foreground/5" },
  archived: { label: "Archived", variant: "purple", color: "bg-purple/10" },
};

const statusCycle: InventoryStatus[] = ["draft", "live", "sold", "archived"];
const PAGE_SIZE = 10;

const emptyBike = {
  name: "", category: "City", price: "", originalPrice: "", year: "",
  mileage: "", condition: "Good", batteryCapacityWh: "", batteryHealthPercent: "100",
  estimatedRangeKm: "", motorPowerW: "", torqueNm: "", frameSize: "Medium",
  frameType: "Step-through", wheelSize: '26"', weightKg: "", brakes: "Disc",
  drivetrain: "Single-speed", color: "", warranty: "30-day", bestFor: "",
  description: "", image: "",
};

export function InventoryClient({ initialBikes }: { initialBikes: VYBEbike[] }) {
  const [bikes, setBikes] = useState(initialBikes);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<InventoryStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [updating, setUpdating] = useState<number | null>(null);

  // Modals
  const [showAdd, setShowAdd] = useState(false);
  const [editBike, setEditBike] = useState<VYBEbike | null>(null);
  const [deleteBike, setDeleteBike] = useState<VYBEbike | null>(null);
  const [form, setForm] = useState(emptyBike);
  const [saving, setSaving] = useState(false);

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

  const totalPages = Math.ceil(filteredBikes.length / PAGE_SIZE);
  const paginatedBikes = filteredBikes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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
        setBikes((prev) => prev.map((b) => (b.id === bike.id ? { ...b, inventoryStatus: nextStatus } : b)));
      }
    } finally {
      setUpdating(null);
    }
  }, []);

  const handleAdd = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/bikes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          price: Number(form.price) || 0,
          originalPrice: Number(form.originalPrice) || Number(form.price) || 0,
          year: Number(form.year) || new Date().getFullYear(),
          mileage: Number(form.mileage) || 0,
          batteryCapacityWh: Number(form.batteryCapacityWh) || 0,
          batteryHealthPercent: Number(form.batteryHealthPercent) || 100,
          estimatedRangeKm: Number(form.estimatedRangeKm) || 0,
          motorPowerW: Number(form.motorPowerW) || 0,
          torqueNm: Number(form.torqueNm) || 0,
          weightKg: Number(form.weightKg) || 0,
          inventoryStatus: "draft",
          status: "available",
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setBikes((prev) => [...prev, {
          ...data.bike,
          price: Number(data.bike.price),
          originalPrice: Number(data.bike.originalPrice),
          year: Number(data.bike.year),
          mileage: Number(data.bike.mileage),
          batteryCapacityWh: Number(data.bike.batteryCapacityWh),
          batteryHealthPercent: Number(data.bike.batteryHealthPercent),
          estimatedRangeKm: Number(data.bike.estimatedRangeKm),
          motorPowerW: Number(data.bike.motorPowerW),
          torqueNm: Number(data.bike.torqueNm),
          weightKg: Number(data.bike.weightKg),
          featured: false,
          recentlyArrived: false,
          images: [],
          inventoryStatus: "draft" as InventoryStatus,
        }]);
        setShowAdd(false);
        setForm(emptyBike);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async () => {
    if (!editBike) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/bikes/${editBike.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          price: Number(form.price) || editBike.price,
          condition: form.condition,
          warranty: form.warranty,
          description: form.description,
        }),
      });
      if (res.ok) {
        setBikes((prev) => prev.map((b) => b.id === editBike.id ? {
          ...b,
          price: Number(form.price) || b.price,
          condition: form.condition,
          warranty: form.warranty,
          description: form.description,
        } : b));
        setEditBike(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteBike) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/bikes/${deleteBike.id}`, { method: "DELETE" });
      if (res.ok) {
        setBikes((prev) => prev.filter((b) => b.id !== deleteBike.id));
        setDeleteBike(null);
      }
    } finally {
      setSaving(false);
    }
  };

  const openEdit = (bike: VYBEbike) => {
    setForm({
      name: bike.name, category: bike.category, price: String(bike.price),
      originalPrice: String(bike.originalPrice), year: String(bike.year),
      mileage: String(bike.mileage), condition: bike.condition,
      batteryCapacityWh: String(bike.batteryCapacityWh),
      batteryHealthPercent: String(bike.batteryHealthPercent),
      estimatedRangeKm: String(bike.estimatedRangeKm),
      motorPowerW: String(bike.motorPowerW), torqueNm: String(bike.torqueNm),
      frameSize: bike.frameSize, frameType: bike.frameType,
      wheelSize: bike.wheelSize, weightKg: String(bike.weightKg),
      brakes: bike.brakes, drivetrain: bike.drivetrain, color: bike.color,
      warranty: bike.warranty, bestFor: bike.bestFor,
      description: bike.description, image: bike.image,
    });
    setEditBike(bike);
  };

  const totalValue = bikes.reduce((sum, b) => sum + b.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to VYBE
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-4xl font-bold text-foreground">Inventory</h1>
            <p className="mt-2 text-muted-foreground">Manage your bike stock</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}>
              <RefreshCw className="h-4 w-4" /> Refresh
            </Button>
            <Button size="sm" onClick={() => { setForm(emptyBike); setShowAdd(true); }}>
              <Plus className="h-4 w-4" /> Add Bike
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-card border border-border bg-white p-4">
            <p className="text-xs text-muted-foreground">Total Bikes</p>
            <p className="font-heading text-2xl font-extrabold text-foreground">{bikes.length}</p>
          </div>
          <div className="rounded-card border border-border bg-white p-4">
            <p className="text-xs text-muted-foreground">Live</p>
            <p className="font-heading text-2xl font-extrabold text-lime-deeper">{statusCounts.live || 0}</p>
          </div>
          <div className="rounded-card border border-border bg-white p-4">
            <p className="text-xs text-muted-foreground">In Pipeline</p>
            <p className="font-heading text-2xl font-extrabold text-purple">
              {(statusCounts.draft || 0) + (statusCounts.inspection || 0) + (statusCounts.ready || 0)}
            </p>
          </div>
          <div className="rounded-card border border-border bg-white p-4">
            <p className="text-xs text-muted-foreground">Total Value</p>
            <p className="font-heading text-lg font-extrabold text-foreground">{formatPriceINR(totalValue)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-2">
          {(["all", ...statusCycle] as const).map((s) => (
            <button
              key={s}
              onClick={() => { setFilterStatus(s); setPage(1); }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                filterStatus === s ? "bg-foreground text-warm-white" : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s].label}
              <span className="ml-1 opacity-60">{statusCounts[s]}</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search bikes..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
          </div>
          <p className="text-xs text-muted-foreground">{filteredBikes.length} results</p>
        </div>

        {/* Table - Desktop */}
        <div className="hidden md:block rounded-card border border-border bg-white overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 font-heading font-bold">Bike</th>
                <th className="px-4 py-3 font-heading font-bold">Category</th>
                <th className="px-4 py-3 font-heading font-bold">Price</th>
                <th className="px-4 py-3 font-heading font-bold">Condition</th>
                <th className="px-4 py-3 font-heading font-bold">Status</th>
                <th className="px-4 py-3 font-heading font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBikes.map((bike) => {
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
                          <Link href={`/bikes/${bike.slug}`} className="font-semibold text-foreground hover:underline">{bike.name}</Link>
                          <p className="text-[10px] text-muted-foreground">{bike.year} · {bike.mileage.toLocaleString()} km</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{bike.category}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{formatPriceINR(bike.price)}</p>
                      {bike.originalPrice > bike.price && (
                        <p className="text-[10px] text-muted-foreground line-through">{formatPriceINR(bike.originalPrice)}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={bike.condition === "Excellent" || bike.condition === "Very Good" ? "lime" : bike.condition === "Good" ? "coral" : "purple"}>
                        {bike.condition}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={config.variant}>{config.label}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {nextStatus && (
                          <Button size="sm" variant="ghost" onClick={() => advanceStatus(bike)} disabled={updating === bike.id}
                            className="h-7 px-2 text-[10px]">
                            {statusConfig[nextStatus].label} →
                          </Button>
                        )}
                        <button onClick={() => openEdit(bike)} className="rounded p-1.5 hover:bg-muted transition-colors">
                          <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                        </button>
                        <button onClick={() => setDeleteBike(bike)} className="rounded p-1.5 hover:bg-coral/10 transition-colors">
                          <Trash2 className="h-3.5 w-3.5 text-coral" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredBikes.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">No bikes found.</div>
          )}
        </div>

        {/* Cards - Mobile */}
        <div className="md:hidden space-y-3">
          {paginatedBikes.map((bike) => {
            const config = statusConfig[bike.inventoryStatus];
            const currentIdx = statusCycle.indexOf(bike.inventoryStatus);
            const nextStatus = currentIdx < statusCycle.length - 1 ? statusCycle[currentIdx + 1] : null;

            return (
              <div key={bike.id} className="rounded-card border border-border bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded bg-muted/40">
                    <img src={bike.image} alt={bike.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/bikes/${bike.slug}`} className="font-heading text-sm font-bold text-foreground hover:underline truncate">{bike.name}</Link>
                      <Badge variant={config.variant} className="shrink-0 text-[10px]">{config.label}</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{bike.category} · {bike.year} · {bike.mileage.toLocaleString()} km</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="font-heading text-base font-extrabold">{formatPriceINR(bike.price)}</p>
                      <div className="flex gap-1">
                        {nextStatus && (
                          <Button size="sm" variant="ghost" onClick={() => advanceStatus(bike)} disabled={updating === bike.id}
                            className="h-6 px-2 text-[10px]">
                            {statusConfig[nextStatus].label} →
                          </Button>
                        )}
                        <button onClick={() => openEdit(bike)} className="rounded p-1 hover:bg-muted"><Pencil className="h-3 w-3 text-muted-foreground" /></button>
                        <button onClick={() => setDeleteBike(bike)} className="rounded p-1 hover:bg-coral/10"><Trash2 className="h-3 w-3 text-coral" /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`h-8 w-8 rounded-full text-xs font-semibold transition-all ${p === page ? "bg-foreground text-warm-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
                {p}
              </button>
            ))}
            <Button variant="outline" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Lifecycle Legend */}
        <div className="mt-8 rounded-card border border-border bg-white p-6">
          <h3 className="font-heading text-sm font-bold text-foreground mb-3">Lifecycle</h3>
          <div className="flex flex-wrap items-center gap-2">
            {statusCycle.map((s, i) => (
              <div key={s} className="flex items-center gap-1.5">
                <Badge variant={statusConfig[s].variant} className="text-[10px]">{statusConfig[s].label}</Badge>
                {i < statusCycle.length - 1 && <span className="text-muted-foreground text-[10px]">→</span>}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* ═══ ADD BIKE MODAL ═══ */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-card border border-border bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold">Add New Bike</h2>
              <button onClick={() => setShowAdd(false)} className="rounded p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Name *</label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Hero Electric Optima" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                    {["City", "Commuter", "Mountain", "Hybrid", "Folding", "Cargo"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Price (₹) *</label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="45000" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Original Price (₹)</label>
                  <Input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} placeholder="65000" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Year</label>
                  <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Mileage (km)</label>
                  <Input type="number" value={form.mileage} onChange={(e) => setForm({ ...form, mileage: e.target.value })} placeholder="5000" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Condition</label>
                  <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                    {["Excellent", "Very Good", "Good", "Fair"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Battery (Wh)</label>
                  <Input type="number" value={form.batteryCapacityWh} onChange={(e) => setForm({ ...form, batteryCapacityWh: e.target.value })} placeholder="540" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Range (km)</label>
                  <Input type="number" value={form.estimatedRangeKm} onChange={(e) => setForm({ ...form, estimatedRangeKm: e.target.value })} placeholder="60" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Motor (W)</label>
                  <Input type="number" value={form.motorPowerW} onChange={(e) => setForm({ ...form, motorPowerW: e.target.value })} placeholder="250" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Image URL</label>
                <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm min-h-[60px]" placeholder="Brief description..." />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowAdd(false)}>Cancel</Button>
              <Button size="sm" onClick={handleAdd} disabled={!form.name || !form.price || saving}>
                {saving ? "Adding..." : "Add Bike"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ EDIT BIKE MODAL ═══ */}
      {editBike && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-card border border-border bg-white p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-lg font-bold">Edit {editBike.name}</h2>
              <button onClick={() => setEditBike(null)} className="rounded p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Price (₹)</label>
                  <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground">Condition</label>
                  <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })}
                    className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                    {["Excellent", "Very Good", "Good", "Fair"].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Warranty</label>
                <Input value={form.warranty} onChange={(e) => setForm({ ...form, warranty: e.target.value })} />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm min-h-[60px]" />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setEditBike(null)}>Cancel</Button>
              <Button size="sm" onClick={handleEdit} disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DELETE CONFIRMATION ═══ */}
      {deleteBike && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-card border border-border bg-white p-6">
            <h2 className="font-heading text-lg font-bold text-foreground">Delete Bike?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Are you sure you want to remove <strong>{deleteBike.name}</strong> from inventory? This cannot be undone.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteBike(null)}>Cancel</Button>
              <Button size="sm" variant="outline" onClick={handleDelete} disabled={saving}
                className="border-coral text-coral hover:bg-coral hover:text-white">
                {saving ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
