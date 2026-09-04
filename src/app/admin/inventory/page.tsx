"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { bikes, formatPrice, type Bike, type BikeStatus } from "@/data/bikes";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  Bike as BikeIcon,
  Search,
  ChevronRight,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

const statusConfig: Record<BikeStatus, { label: string; variant: "lime" | "coral" | "purple" | "dark" | "outline"; icon: React.ComponentType<{ className?: string }> }> = {
  draft: { label: "Draft", variant: "outline", icon: Pencil },
  inspection: { label: "Inspection", variant: "purple", icon: AlertCircle },
  ready: { label: "Ready", variant: "lime", icon: CheckCircle },
  live: { label: "Live", variant: "lime", icon: Eye },
  reserved: { label: "Reserved", variant: "coral", icon: Clock },
  sold: { label: "Sold", variant: "dark", icon: CheckCircle },
};

const lifecycle: BikeStatus[] = ["draft", "inspection", "ready", "live", "reserved", "sold"];

export default function AdminInventoryPage() {
  const [inventory, setInventory] = useState<Bike[]>(bikes);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<BikeStatus | "all">("all");
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = inventory.filter((b) => {
    const matchesSearch = b.brand.toLowerCase().includes(search.toLowerCase()) ||
      b.model.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = inventory.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const advanceStatus = (bikeId: string) => {
    setInventory((prev) => prev.map((b) => {
      if (b.id !== bikeId) return b;
      const currentIdx = lifecycle.indexOf(b.status);
      if (currentIdx < lifecycle.length - 1) {
        return { ...b, status: lifecycle[currentIdx + 1] };
      }
      return b;
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-10">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/" className="mb-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
            <h1 className="font-heading text-3xl font-bold text-foreground">Inventory</h1>
            <p className="mt-1 text-sm text-muted-foreground">{inventory.length} bikes total</p>
          </div>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4" />
                Add Bike
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bike</DialogTitle>
                <DialogDescription>Start with a draft listing.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Brand</label>
                    <Input placeholder="e.g. Rad Power" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Model</label>
                    <Input placeholder="e.g. RadCity 3" />
                  </div>
                </div>
                <Button className="w-full" onClick={() => setIsAddOpen(false)}>
                  Create Draft
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Status Overview */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
          {lifecycle.map((status) => {
            const config = statusConfig[status];
            return (
              <button
                key={status}
                onClick={() => setFilterStatus(filterStatus === status ? "all" : status)}
                className={`rounded-card border-2 p-3 text-center transition-all ${
                  filterStatus === status
                    ? "border-lime bg-lime/10"
                    : "border-border bg-white hover:border-lime/40"
                }`}
              >
                <p className="font-heading text-lg font-bold">{statusCounts[status] || 0}</p>
                <Badge variant={config.variant} className="mt-1 text-[10px]">
                  {config.label}
                </Badge>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search bikes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-card border border-border bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="p-4 font-heading font-bold">Bike</th>
                <th className="p-4 font-heading font-bold">Price</th>
                <th className="p-4 font-heading font-bold">Condition</th>
                <th className="p-4 font-heading font-bold">Status</th>
                <th className="p-4 font-heading font-bold">Inspection</th>
                <th className="p-4 font-heading font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((bike) => {
                const config = statusConfig[bike.status];
                const StatusIcon = config.icon;
                const currentIdx = lifecycle.indexOf(bike.status);
                const canAdvance = currentIdx < lifecycle.length - 1;

                return (
                  <tr key={bike.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/40">
                          <BikeIcon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-semibold">{bike.brand} {bike.model}</p>
                          <p className="text-xs text-muted-foreground">{bike.year} · {bike.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-heading font-bold">{formatPrice(bike.price)}</td>
                    <td className="p-4">
                      <Badge variant={bike.condition === "Like New" ? "lime" : bike.condition === "Good" ? "coral" : "purple"}>
                        {bike.condition}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant={config.variant}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </td>
                    <td className="p-4 text-muted-foreground text-xs">
                      {bike.inspectionDate}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        {canAdvance && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => advanceStatus(bike.id)}
                            title={`Move to ${statusConfig[lifecycle[currentIdx + 1]].label}`}
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/bikes/${bike.id}`}>
                            <Eye className="h-3.5 w-3.5" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Lifecycle Legend */}
        <div className="mt-8 rounded-card border border-border bg-white p-6">
          <h3 className="font-heading text-sm font-bold text-foreground mb-4">Bike Lifecycle</h3>
          <div className="flex flex-wrap items-center gap-2">
            {lifecycle.map((status, i) => (
              <div key={status} className="flex items-center gap-2">
                <Badge variant={statusConfig[status].variant}>{statusConfig[status].label}</Badge>
                {i < lifecycle.length - 1 && <ChevronRight className="h-3 w-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Click the arrow on any bike to advance it to the next stage.
          </p>
        </div>
      </main>
    </div>
  );
}
