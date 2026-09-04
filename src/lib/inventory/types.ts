export type InventoryStatus = "draft" | "live" | "sold" | "archived";

export interface Bike {
  id: number;
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
  description: string;
  image: string;
  images: string[];
  inventoryStatus: InventoryStatus;
  featured: boolean;
  recentlyArrived: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateBikeInput = Omit<Bike, "id" | "createdAt" | "updatedAt">;
export type UpdateBikeInput = Partial<Omit<Bike, "id" | "createdAt" | "updatedAt">>;

export interface BikeListResult {
  bikes: Bike[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function formatPriceINR(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
