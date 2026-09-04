import { NextRequest, NextResponse } from "next/server";
import { getPublicBikes, filterBikes } from "@/lib/inventory/repository";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const condition = searchParams.get("condition");
  const maxPrice = searchParams.get("maxPrice");
  const minPrice = searchParams.get("minPrice");
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");

  if (category || search || condition || maxPrice || minPrice || page) {
    const result = filterBikes({
      category: category || undefined,
      search: search || undefined,
      condition: condition || undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 6,
    });
    return NextResponse.json(result);
  }

  const bikes = getPublicBikes();
  return NextResponse.json({ bikes, total: bikes.length });
}
