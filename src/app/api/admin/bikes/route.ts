import { NextRequest, NextResponse } from "next/server";
import { getAllBikes, createBike, getBikesByPage, getInventoryCounts, searchBikes } from "@/lib/inventory/neon-repository";
import type { CreateBikeInput, InventoryStatus } from "@/lib/inventory/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const status = searchParams.get("status") as InventoryStatus | null;
  const search = searchParams.get("search");

  if (search) {
    const bikes = await searchBikes(search);
    return NextResponse.json({ bikes, total: bikes.length });
  }
  if (page) {
    const result = await getBikesByPage(Number(page), Number(pageSize) || 10, status || undefined);
    return NextResponse.json(result);
  }
  if (status) {
    const result = await getBikesByPage(1, 100, status);
    return NextResponse.json({ bikes: result.bikes, total: result.total });
  }

  const bikes = await getAllBikes();
  const counts = await getInventoryCounts();
  return NextResponse.json({ bikes, total: bikes.length, counts });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const input: CreateBikeInput = {
      slug: "",
      name: body.name || "",
      category: body.category || "City",
      price: Number(body.price) || 0,
      originalPrice: Number(body.originalPrice) || Number(body.price) || 0,
      year: Number(body.year) || new Date().getFullYear(),
      mileage: Number(body.mileage) || 0,
      condition: body.condition || "Good",
      batteryCapacityWh: Number(body.batteryCapacityWh) || 0,
      batteryHealthPercent: Number(body.batteryHealthPercent) || 100,
      estimatedRangeKm: Number(body.estimatedRangeKm) || 0,
      motorPowerW: Number(body.motorPowerW) || 0,
      torqueNm: Number(body.torqueNm) || 0,
      frameSize: body.frameSize || "Medium",
      frameType: body.frameType || "Step-through",
      wheelSize: body.wheelSize || '26"',
      weightKg: Number(body.weightKg) || 0,
      brakes: body.brakes || "Disc",
      drivetrain: body.drivetrain || "Single-speed",
      color: body.color || "",
      inspectionScore: body.inspectionScore || "0/32",
      serviceStatus: body.serviceStatus || "pending",
      warranty: body.warranty || "30-day",
      bestFor: body.bestFor || "",
      description: body.description || "",
      image: body.image || "",
      images: body.images || [],
      inventoryStatus: body.inventoryStatus || "draft",
      featured: body.featured || false,
      recentlyArrived: body.recentlyArrived || false,
    };

    const bike = await createBike(input);
    return NextResponse.json({ success: true, bike }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create bike" }, { status: 500 });
  }
}
