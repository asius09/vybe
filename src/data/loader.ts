import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import type { VYBEbike, PaginationResult, InventoryStatus } from "./types";

export type { VYBEbike, PaginationResult } from "./types";
export { formatPriceINR } from "./types";

let cachedBikes: VYBEbike[] | null = null;

function loadBikes(): VYBEbike[] {
  if (cachedBikes) return cachedBikes;

  const csvPath = path.join(process.cwd(), "src/data/vybe-bikes-final.csv");
  const fileContent = fs.readFileSync(csvPath, "utf-8");

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    cast: true,
  });

  cachedBikes = records.map((row: unknown) => {
    const r = row as Record<string, string>;
    return {
      id: r.id,
      slug: r.slug,
      name: r.name,
      category: r.category,
      price: Number(r.price),
      originalPrice: Number(r.originalPrice),
      year: Number(r.year),
      mileage: Number(r.mileage),
      condition: r.condition,
      batteryCapacityWh: Number(r.batteryCapacityWh),
      batteryHealthPercent: Number(r.batteryHealthPercent),
      estimatedRangeKm: Number(r.estimatedRangeKm),
      motorPowerW: Number(r.motorPowerW),
      torqueNm: Number(r.torqueNm),
      frameSize: r.frameSize,
      frameType: r.frameType,
      wheelSize: r.wheelSize,
      weightKg: Number(r.weightKg),
      brakes: r.brakes,
      drivetrain: r.drivetrain,
      color: r.color,
      inspectionScore: r.inspectionScore,
      serviceStatus: r.serviceStatus,
      warranty: r.warranty,
      bestFor: r.bestFor,
      status: r.status,
      featured: r.featured === "True",
      recentlyArrived: r.recentlyArrived === "True",
      images: r.images ? JSON.parse(r.images.replace(/""/g, '"')) : [],
      description: r.description,
      image: r.image,
      inventoryStatus: (r.inventoryStatus as InventoryStatus) || "live",
    };
  });

  return cachedBikes!;
}

export function getAvailableBikes(): VYBEbike[] {
  return loadBikes().filter((b) => b.status === "available");
}

export function getBikesByPage(page: number, pageSize: number = 6): PaginationResult {
  const all = getAvailableBikes();
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const bikes = all.slice(start, end);

  return {
    bikes,
    total: all.length,
    page,
    pageSize,
    totalPages: Math.ceil(all.length / pageSize),
    hasMore: end < all.length,
  };
}

export function getBikesByCategory(category: string, page: number = 1, pageSize: number = 6): PaginationResult {
  const all = getAvailableBikes().filter(
    (b) => b.category.toLowerCase() === category.toLowerCase()
  );
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const bikes = all.slice(start, end);

  return {
    bikes,
    total: all.length,
    page,
    pageSize,
    totalPages: Math.ceil(all.length / pageSize),
    hasMore: end < all.length,
  };
}

export function getFeaturedBikes(): VYBEbike[] {
  return getAvailableBikes().filter((b) => b.featured);
}

export function getNewArrivals(): VYBEbike[] {
  return getAvailableBikes().filter((b) => b.recentlyArrived);
}

export function getBikeBySlug(slug: string): VYBEbike | undefined {
  return loadBikes().find((b) => b.slug === slug);
}

export function getCategories(): { name: string; count: number }[] {
  const bikes = getAvailableBikes();
  const cats = bikes.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return Object.entries(cats).map(([name, count]) => ({ name, count }));
}

export function getAllBrands(): string[] {
  const bikes = loadBikes();
  return [...new Set(bikes.map((b) => b.name.split(" ").slice(0, 2).join(" ")))];
}

export function searchBikes(query: string): VYBEbike[] {
  const q = query.toLowerCase();
  return getAvailableBikes().filter(
    (b) =>
      b.name.toLowerCase().includes(q) ||
      b.category.toLowerCase().includes(q) ||
      b.color.toLowerCase().includes(q) ||
      b.bestFor.toLowerCase().includes(q)
  );
}

export function filterBikes(opts: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  search?: string;
}): VYBEbike[] {
  let bikes = getAvailableBikes();

  if (opts.category && opts.category !== "all") {
    bikes = bikes.filter((b) => b.category.toLowerCase() === opts.category!.toLowerCase());
  }
  if (opts.minPrice) {
    bikes = bikes.filter((b) => b.price >= opts.minPrice!);
  }
  if (opts.maxPrice) {
    bikes = bikes.filter((b) => b.price <= opts.maxPrice!);
  }
  if (opts.condition) {
    bikes = bikes.filter((b) => b.condition === opts.condition);
  }
  if (opts.search) {
    const q = opts.search.toLowerCase();
    bikes = bikes.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.color.toLowerCase().includes(q)
    );
  }

  return bikes;
}

export function getBikesByIds(ids: string[]): VYBEbike[] {
  const all = loadBikes();
  return ids.map((id) => all.find((b) => b.id === id || b.slug === id)).filter(Boolean) as VYBEbike[];
}

export function getAllBikes(): VYBEbike[] {
  return loadBikes();
}
