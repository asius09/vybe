import {
  getPublicBikes,
  getPublicBikeBySlug,
  getAllBikes,
  getBikeById,
  getBikesByPage,
  getInventoryCounts,
  searchBikes,
  filterBikes,
  getCategories,
  getFeaturedBikes,
  getNewArrivals,
  createBike,
  updateBike,
  updateBikeStatus,
  deleteBike,
} from "@/lib/inventory/repository";

export type { Bike, Bike as VYBEbike, CreateBikeInput, UpdateBikeInput, InventoryStatus, BikeListResult } from "@/lib/inventory/types";
export { formatPriceINR } from "@/lib/inventory/types";

// Backward-compatible aliases
export const getAvailableBikes = getPublicBikes;
export const getBikeBySlug = getPublicBikeBySlug;

// Re-export repository functions for server-side use
export {
  getPublicBikes,
  getPublicBikeBySlug,
  getAllBikes,
  getBikeById,
  getBikesByPage,
  getInventoryCounts,
  searchBikes,
  filterBikes,
  getCategories,
  getFeaturedBikes,
  getNewArrivals,
  createBike,
  updateBike,
  updateBikeStatus,
  deleteBike,
};
