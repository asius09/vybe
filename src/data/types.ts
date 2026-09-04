export type InventoryStatus = "draft" | "inspection" | "ready" | "live" | "reserved" | "sold";

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
  inventoryStatus: InventoryStatus;
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

export function formatPriceINR(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
