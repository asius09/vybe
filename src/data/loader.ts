import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export interface VYBEbike {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  year: number;
  mileage: number;
  condition: string;
  batteryCapacityWh: number;
  batteryHealthPercent: number;
  estimatedRangeKm: number;
  motorPowerW: number;
  torqueNm: number;
  frameSize: string;
  frameType: string;
  wheelSize: string;
  weightKg: number;
  brakes: string;
  drivetrain: string;
  color: string;
  inspectionScore: string;
  serviceStatus: string;
  warranty: string;
  bestFor: string;
  status: string;
  featured: boolean;
  recentlyArrived: boolean;
  images: string[];
  description: string;
  image: string;
}

export interface PaginationResult {
  bikes: VYBEbike[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

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

export function formatPriceINR(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
