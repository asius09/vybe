import {
  getPublicBikes,
  getPublicBikeBySlug,
  getAllBikes,
  getBikeById,
  getBikesByPage,
  getInventoryCounts,
  searchBikes,
  filterBikes,
  createBike,
  updateBike,
  deleteBike,
} from "@/lib/inventory/neon-repository";

export type { Bike, Bike as VYBEbike, CreateBikeInput, UpdateBikeInput, InventoryStatus, BikeListResult } from "@/lib/inventory/types";
export { formatPriceINR } from "@/lib/inventory/types";

export const getAvailableBikes = getPublicBikes;
export const getBikeBySlug = getPublicBikeBySlug;

export async function getCategories() {
  const bikes = await getPublicBikes();
  const cats = new Map<string, number>();
  for (const b of bikes) {
    cats.set(b.category, (cats.get(b.category) || 0) + 1);
  }
  return Array.from(cats.entries()).map(([name, count]) => ({ name, count }));
}

export async function getFeaturedBikes() {
  const bikes = await getPublicBikes();
  const featured = bikes.filter((b) => b.featured);
  return featured.length > 0 ? featured : bikes.slice(0, 6);
}

export async function getNewArrivals() {
  const bikes = await getPublicBikes();
  const recent = bikes.filter((b) => b.recentlyArrived);
  return recent.length > 0 ? recent : bikes.slice(0, 6);
}

export {
  getPublicBikes,
  getPublicBikeBySlug,
  getAllBikes,
  getBikeById,
  getBikesByPage,
  getInventoryCounts,
  searchBikes,
  filterBikes,
  createBike,
  updateBike,
  deleteBike,
};
