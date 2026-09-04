"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatPriceINR, type VYBEbike, type InventoryStatus } from "@/data/types";
import {
  ArrowLeft, Search, ChevronRight, RefreshCw, Plus, Pencil, Trash2,
  ChevronLeft, X, Check, FileText,
} from "lucide-react";

const statusConfig: Record<InventoryStatus, { label: string; variant: "lime" | "coral" | "purple" | "dark" | "outline" }> = {
  draft: { label: "Draft", variant: "outline" },
  live: { label: "Live", variant: "lime" },
  sold: { label: "Sold", variant: "dark" },
  archived: { label: "Archived", variant: "purple" },
};

const statusCycle: InventoryStatus[] = ["draft", "live", "sold", "archived"];
const PAGE_SIZE = 10;

const categories = ["City", "Commuter", "Mountain", "Hybrid", "Folding", "Cargo"];
const conditions = ["Excellent", "Very Good", "Good", "Fair"];

const steps = [
  { label: "Basic Info", description: "Name, category & pricing" },
  { label: "Details", description: "Frame, condition & specs" },
  { label: "Performance", description: "Battery, motor & range" },
  { label: "Components", description: "Brakes, drivetrain & service" },
  { label: "Image", description: "Photo & publish" },
];

function emptyForm() {
  return {
    name: "", category: "City", price: "", originalPrice: "", year: "",
    mileage: "", condition: "Good", batteryCapacityWh: "", batteryHealthPercent: "100",
    estimatedRangeKm: "", motorPowerW: "", torqueNm: "", frameSize: "Medium",
    frameType: "Step-through", wheelSize: '26"', weightKg: "", brakes: "Disc",
    drivetrain: "Single-speed", color: "", warranty: "30-day", bestFor: "",
    description: "", image: "", inspectionScore: "0/32", serviceStatus: "pending",
  };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold text-muted-foreground block mb-1">{label}</label>
      {children}
    </div>
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
            i < current ? "bg-foreground text-background" : i === current ? "bg-foreground text-background scale-110" : "bg-muted text-muted-foreground"
          }`}>
            {i < current ? <Check className="h-3.5 w-3.5" /> : i + 1}
          </div>
          {i < total - 1 && (
            <div className={`h-px w-6 transition-colors duration-300 ${i < current ? "bg-foreground" : "bg-muted"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export function InventoryClient({ initialBikes }: { initialBikes: VYBEbike[] }) {
  const [bikes, setBikes] = useState(initialBikes);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<InventoryStatus | "all">("all");
  const [page, setPage] = useState(1);
  const [updating, setUpdating] = useState<number | null>(null);

  const [showForm, setShowForm] = useState<"add" | "edit" | null>(null);
  const [editBike, setEditBike] = useState<VYBEbike | null>(null);
  const [deleteBike, setDeleteBike] = useState<VYBEbike | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [draftSaved, setDraftSaved] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const saveDraft = useCallback((f: typeof form) => {
    try {
      localStorage.setItem("vybe-bike-draft", JSON.stringify(f));
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 1500);
    } catch {}
  }, []);

  const loadDraft = useCallback(() => {
    try {
      const saved = localStorage.getItem("vybe-bike-draft");
      if (saved) { setForm(JSON.parse(saved)); return true; }
    } catch {}
    return false;
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem("vybe-bike-draft");
  }, []);

  const statusCounts = useMemo(() => {
    const counts: Record<string, number> = { all: bikes.length };
    statusCycle.forEach((s) => (counts[s] = 0));
    bikes.forEach((b) => (counts[b.inventoryStatus] = (counts[b.inventoryStatus] || 0) + 1));
    return counts;
  }, [bikes]);

  const filteredBikes = useMemo(() => {
    let result = bikes;
    if (filterStatus !== "all") result = result.filter((b) => b.inventoryStatus === filterStatus);
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q));
    }
    return result;
  }, [bikes, filterStatus, search]);

  const totalPages = Math.ceil(filteredBikes.length / PAGE_SIZE);
  const paginatedBikes = filteredBikes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const advanceStatus = useCallback(async (bike: VYBEbike) => {
    const idx = statusCycle.indexOf(bike.inventoryStatus);
    if (idx >= statusCycle.length - 1) return;
    const nextStatus = statusCycle[idx + 1];
    setUpdating(bike.id);
    try {
      const res = await fetch(`/api/admin/bikes/${bike.id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }),
      });
      if (res.ok) setBikes((prev) => prev.map((b) => (b.id === bike.id ? { ...b, inventoryStatus: nextStatus } : b)));
    } finally { setUpdating(null); }
  }, []);

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    if (step === 0) {
      if (!form.name || form.name.trim().length < 2) errors.name = "Name is required";
      if (!form.price || Number(form.price) <= 0) errors.price = "Price must be > 0";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async (publish: boolean = false) => {
    if (!validateStep(0)) return;
    setSaving(true);
    setSaveMsg(null);
    try {
      const payload = {
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
        inventoryStatus: publish ? "live" : "draft",
      };

      let res;
      if (showForm === "edit" && editBike) {
        res = await fetch(`/api/admin/bikes/${editBike.id}`, {
          method: "PUT", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/bikes", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        const data = await res.json();
        if (showForm === "edit" && editBike) {
          setBikes((prev) => prev.map((b) => (b.id === editBike.id ? { ...b, ...data.bike, price: Number(data.bike.price), originalPrice: Number(data.bike.originalPrice) } : b)));
        } else {
          setBikes((prev) => [{ ...data.bike, price: Number(data.bike.price), originalPrice: Number(data.bike.originalPrice), images: [], featured: false, recentlyArrived: false }, ...prev]);
        }
        clearDraft();
        setSaveMsg("Saved");
        setTimeout(() => { setShowForm(null); setSaveMsg(null); setCurrentStep(0); }, 800);
      } else {
        setSaveMsg("Couldn't save. Try again.");
      }
    } catch {
      setSaveMsg("Couldn't save. Try again.");
    } finally { setSaving(false); }
  };

  const handleDelete = async () => {
    if (!deleteBike) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/bikes/${deleteBike.id}`, { method: "DELETE" });
      if (res.ok) { setBikes((prev) => prev.filter((b) => b.id !== deleteBike.id)); setDeleteBike(null); }
    } finally { setSaving(false); }
  };

  const openAdd = () => {
    const hasDraft = loadDraft();
    if (!hasDraft) setForm(emptyForm());
    setFormErrors({}); setSaveMsg(null); setShowForm("add"); setEditBike(null); setCurrentStep(0);
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
      inspectionScore: bike.inspectionScore, serviceStatus: bike.serviceStatus,
    });
    setEditBike(bike); setFormErrors({}); setSaveMsg(null); setShowForm("edit"); setCurrentStep(0);
  };

  const totalValue = bikes.reduce((sum, b) => sum + b.price, 0);

  const nextStep = () => { if (validateStep(currentStep)) setCurrentStep((s) => Math.min(s + 1, steps.length - 1)); };
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to VYBE
        </Link>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-4xl font-bold text-foreground">Inventory</h1>
            <p className="mt-2 text-muted-foreground">Manage your bike stock</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild><Link href="/admin/cms"><FileText className="h-4 w-4" /> CMS</Link></Button>
            <Button variant="outline" size="sm" onClick={() => window.location.reload()}><RefreshCw className="h-4 w-4" /> Refresh</Button>
            <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4" /> Add Bike</Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-card border border-border bg-white p-4">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="font-heading text-2xl font-extrabold text-foreground">{bikes.length}</p>
          </div>
          <div className="rounded-card border border-border bg-white p-4">
            <p className="text-xs text-muted-foreground">Live</p>
            <p className="font-heading text-2xl font-extrabold text-lime-deeper">{statusCounts.live || 0}</p>
          </div>
          <div className="rounded-card border border-border bg-white p-4">
            <p className="text-xs text-muted-foreground">Draft</p>
            <p className="font-heading text-2xl font-extrabold text-muted-foreground">{statusCounts.draft || 0}</p>
          </div>
          <div className="rounded-card border border-border bg-white p-4">
            <p className="text-xs text-muted-foreground">Value</p>
            <p className="font-heading text-lg font-extrabold text-foreground">{formatPriceINR(totalValue)}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-2">
          {(["all", ...statusCycle] as const).map((s) => (
            <button key={s} onClick={() => { setFilterStatus(s); setPage(1); }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${filterStatus === s ? "bg-foreground text-warm-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>
              {s === "all" ? "All" : statusConfig[s].label}
              <span className="ml-1 opacity-60">{statusCounts[s]}</span>
            </button>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="pl-9" />
          </div>
          <p className="text-xs text-muted-foreground">{filteredBikes.length} results</p>
        </div>

        {/* Desktop Table */}
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
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded bg-muted/40">
                          {bike.image ? <Image src={bike.image} alt={bike.name} fill sizes="40px" className="object-cover" /> : <div className="h-full w-full bg-muted" />}
                        </div>
                        <div>
                          <Link href={`/bikes/${bike.slug}`} className="font-semibold text-foreground hover:underline">{bike.name}</Link>
                          <p className="text-[10px] text-muted-foreground">{bike.year} · {bike.mileage.toLocaleString()} km</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{bike.category}</td>
                    <td className="px-4 py-3 font-semibold">{formatPriceINR(bike.price)}</td>
                    <td className="px-4 py-3">
                      <Badge variant={bike.condition === "Excellent" || bike.condition === "Very Good" ? "lime" : bike.condition === "Good" ? "coral" : "outline"}>{bike.condition}</Badge>
                    </td>
                    <td className="px-4 py-3"><Badge variant={config.variant}>{config.label}</Badge></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {nextStatus && <Button size="sm" variant="ghost" onClick={() => advanceStatus(bike)} disabled={updating === bike.id} className="h-7 px-2 text-[10px]">{statusConfig[nextStatus].label} →</Button>}
                        <button onClick={() => openEdit(bike)} className="rounded p-1.5 hover:bg-muted transition-colors"><Pencil className="h-3.5 w-3.5 text-muted-foreground" /></button>
                        <button onClick={() => setDeleteBike(bike)} className="rounded p-1.5 hover:bg-coral/10 transition-colors"><Trash2 className="h-3.5 w-3.5 text-coral" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredBikes.length === 0 && <div className="py-12 text-center text-muted-foreground">No bikes found.</div>}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-3">
          {paginatedBikes.map((bike) => {
            const config = statusConfig[bike.inventoryStatus];
            const currentIdx = statusCycle.indexOf(bike.inventoryStatus);
            const nextStatus = currentIdx < statusCycle.length - 1 ? statusCycle[currentIdx + 1] : null;
            return (
              <div key={bike.id} className="rounded-card border border-border bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-muted/40">
                    {bike.image ? <Image src={bike.image} alt={bike.name} fill sizes="56px" className="object-cover" /> : <div className="h-full w-full bg-muted" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/bikes/${bike.slug}`} className="font-heading text-sm font-bold text-foreground hover:underline truncate">{bike.name}</Link>
                      <Badge variant={config.variant} className="shrink-0 text-[10px]">{config.label}</Badge>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{bike.category} · {bike.year}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <p className="font-heading text-base font-extrabold">{formatPriceINR(bike.price)}</p>
                      <div className="flex gap-1">
                        {nextStatus && <Button size="sm" variant="ghost" onClick={() => advanceStatus(bike)} disabled={updating === bike.id} className="h-6 px-2 text-[10px]">{statusConfig[nextStatus].label} →</Button>}
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

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}><ChevronLeft className="h-4 w-4" /></Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)} className={`h-8 w-8 rounded-full text-xs font-semibold transition-all ${p === page ? "bg-foreground text-warm-white" : "bg-muted text-muted-foreground hover:text-foreground"}`}>{p}</button>
            ))}
            <Button variant="outline" size="sm" onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}><ChevronRight className="h-4 w-4" /></Button>
          </div>
        )}

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

      {/* ═══ MULTI-STEP FORM MODAL ═══ */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-10 px-4">
          <div className="w-full max-w-2xl rounded-card border border-border bg-white">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <h2 className="font-heading text-lg font-bold">{showForm === "add" ? "Add New Bike" : `Edit ${editBike?.name}`}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Step {currentStep + 1} of {steps.length} — {steps[currentStep].description}</p>
              </div>
              <button onClick={() => { setShowForm(null); setCurrentStep(0); }} className="rounded p-1 hover:bg-muted"><X className="h-4 w-4" /></button>
            </div>

            {/* Step Indicator */}
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center justify-between">
                <StepIndicator current={currentStep} total={steps.length} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{steps[currentStep].label}</span>
              </div>
            </div>

            {/* Step Content */}
            <div className="px-6 py-6 min-h-80">
              {/* Step 0: Basic Info */}
              {currentStep === 0 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <Field label="Bike Name *">
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Hero Electric Optima" className={formErrors.name ? "border-coral" : ""} />
                    {formErrors.name && <p className="text-[10px] text-coral mt-1">{formErrors.name}</p>}
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Category">
                      <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                        {categories.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                    <Field label="Best For">
                      <Input value={form.bestFor} onChange={(e) => setForm({ ...form, bestFor: e.target.value })} placeholder="commute, daily" />
                    </Field>
                  </div>
                  <Field label="Description">
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm min-h-15" placeholder="Brief description of the bike..." />
                  </Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Selling Price (₹) *">
                      <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="45000" className={formErrors.price ? "border-coral" : ""} />
                      {formErrors.price && <p className="text-[10px] text-coral mt-1">{formErrors.price}</p>}
                    </Field>
                    <Field label="Original Price (₹)">
                      <Input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} placeholder="65000" />
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 1: Bike Details */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Year"><Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" /></Field>
                    <Field label="Mileage (km)"><Input type="number" value={form.mileage} onChange={(e) => setForm({ ...form, mileage: e.target.value })} placeholder="5000" /></Field>
                    <Field label="Condition">
                      <select value={form.condition} onChange={(e) => setForm({ ...form, condition: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                        {conditions.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Frame Size">
                      <select value={form.frameSize} onChange={(e) => setForm({ ...form, frameSize: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                        {["Small", "Medium", "Large", "XL"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field label="Frame Type">
                      <select value={form.frameType} onChange={(e) => setForm({ ...form, frameType: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                        {["Step-through", "Diamond", "Foldable", "Compact"].map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </Field>
                    <Field label="Color"><Input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} placeholder="Black" /></Field>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Wheel Size">
                      <select value={form.wheelSize} onChange={(e) => setForm({ ...form, wheelSize: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                        {['20"', '24"', '26"', '27.5"', '29"'].map((w) => <option key={w}>{w}</option>)}
                      </select>
                    </Field>
                    <Field label="Weight (kg)"><Input type="number" value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: e.target.value })} placeholder="22" /></Field>
                    <Field label="Warranty">
                      <select value={form.warranty} onChange={(e) => setForm({ ...form, warranty: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                        {["None", "7-day", "14-day", "30-day", "60-day", "90-day"].map((w) => <option key={w}>{w}</option>)}
                      </select>
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 2: Performance */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Battery (Wh)"><Input type="number" value={form.batteryCapacityWh} onChange={(e) => setForm({ ...form, batteryCapacityWh: e.target.value })} placeholder="540" /></Field>
                    <Field label="Battery Health (%)"><Input type="number" value={form.batteryHealthPercent} onChange={(e) => setForm({ ...form, batteryHealthPercent: e.target.value })} placeholder="95" /></Field>
                    <Field label="Range (km)"><Input type="number" value={form.estimatedRangeKm} onChange={(e) => setForm({ ...form, estimatedRangeKm: e.target.value })} placeholder="60" /></Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Motor (W)"><Input type="number" value={form.motorPowerW} onChange={(e) => setForm({ ...form, motorPowerW: e.target.value })} placeholder="250" /></Field>
                    <Field label="Torque (Nm)"><Input type="number" value={form.torqueNm} onChange={(e) => setForm({ ...form, torqueNm: e.target.value })} placeholder="40" /></Field>
                  </div>
                </div>
              )}

              {/* Step 3: Components & Service */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Brakes">
                      <select value={form.brakes} onChange={(e) => setForm({ ...form, brakes: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                        {["Disc", "Rim", "Drum", "Hydraulic Disc"].map((b) => <option key={b}>{b}</option>)}
                      </select>
                    </Field>
                    <Field label="Drivetrain">
                      <select value={form.drivetrain} onChange={(e) => setForm({ ...form, drivetrain: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                        {["Single-speed", "7-speed", "8-speed", "9-speed", "10-speed", "Shimano Nexus"].map((d) => <option key={d}>{d}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Inspection Score"><Input value={form.inspectionScore} onChange={(e) => setForm({ ...form, inspectionScore: e.target.value })} placeholder="32/32" /></Field>
                    <Field label="Service Status">
                      <select value={form.serviceStatus} onChange={(e) => setForm({ ...form, serviceStatus: e.target.value })} className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm">
                        {["pending", "in-progress", "completed"].map((s) => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>
                </div>
              )}

              {/* Step 4: Image & Publish */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <Field label="Image URL">
                    <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://images.pexels.com/..." />
                  </Field>
                  {form.image && (
                    <div className="rounded-lg border border-border overflow-hidden bg-muted/20">
                      <Image src={form.image} alt="Preview" className="w-full h-48 object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  )}
                  <div className="rounded-lg bg-muted/30 p-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">Preview</p>
                    <p className="font-heading text-sm font-bold text-foreground">{form.name || "Bike name"}</p>
                    <p className="text-xs text-muted-foreground">{form.category} · {form.year || "Year"} · {form.condition}</p>
                    <p className="font-heading text-sm font-extrabold mt-1">{form.price ? formatPriceINR(Number(form.price)) : "₹0"}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-border px-6 py-4 flex items-center justify-between">
              <div className="text-sm">
                {saveMsg === "Saved" && <span className="flex items-center gap-1 text-lime-deeper"><Check className="h-4 w-4" /> Saved</span>}
                {saveMsg && saveMsg !== "Saved" && <span className="text-coral">{saveMsg}</span>}
                {draftSaved && <span className="text-muted-foreground text-xs">Draft saved</span>}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setShowForm(null); setCurrentStep(0); }}>Cancel</Button>
                {currentStep > 0 && (
                  <Button variant="outline" size="sm" onClick={prevStep}><ChevronLeft className="h-3.5 w-3.5 mr-1" /> Back</Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button size="sm" onClick={nextStep}>Next <ChevronRight className="h-3.5 w-3.5 ml-1" /></Button>
                ) : (
                  <div className="flex gap-2">
                    {showForm === "add" && (
                      <Button size="sm" variant="outline" onClick={() => handleSave(false)} disabled={saving}>{saving ? "Saving..." : "Save Draft"}</Button>
                    )}
                    <Button size="sm" onClick={() => handleSave(true)} disabled={saving}>{saving ? "Saving..." : showForm === "edit" ? "Save" : "Publish"}</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══ DELETE DIALOG ═══ */}
      {deleteBike && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-card border border-border bg-white p-6">
            <h2 className="font-heading text-lg font-bold text-foreground">Remove this bike?</h2>
            <div className="mt-3 flex items-center gap-3">
              {deleteBike.image && <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-muted/40"><Image src={deleteBike.image} alt="" className="h-full w-full object-cover" /></div>}
              <div>
                <p className="font-semibold text-foreground">{deleteBike.name}</p>
                <p className="text-sm text-muted-foreground">{formatPriceINR(deleteBike.price)}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">This will permanently remove the bike from inventory.</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteBike(null)}>Cancel</Button>
              <Button size="sm" onClick={handleDelete} disabled={saving} className="bg-coral text-white hover:bg-coral-dark">{saving ? "Removing..." : "Remove Bike"}</Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
