import { NextRequest, NextResponse } from "next/server";
import {
  getAvailableBikes,
  getAllBikes,
  filterBikes,
  getBikesByPage,
} from "@/data/loader";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const condition = searchParams.get("condition");
  const maxPrice = searchParams.get("maxPrice");
  const minPrice = searchParams.get("minPrice");
  const all = searchParams.get("all"); // "true" to get all bikes including non-available

  // Paginated listing
  if (page) {
    const result = getBikesByPage(Number(page), Number(pageSize) || 6);
    return NextResponse.json(result);
  }

  // Filtered listing
  if (category || search || condition || maxPrice || minPrice) {
    const bikes = filterBikes({
      category: category || undefined,
      search: search || undefined,
      condition: condition || undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
    });
    return NextResponse.json({ bikes, total: bikes.length });
  }

  // All bikes (admin)
  if (all === "true") {
    return NextResponse.json({ bikes: getAllBikes(), total: getAllBikes().length });
  }

  // Default: available bikes
  const bikes = getAvailableBikes();
  return NextResponse.json({ bikes, total: bikes.length });
}
