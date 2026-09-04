import { NextRequest, NextResponse } from "next/server";
import { getBikeById, updateBike, deleteBike } from "@/lib/inventory/neon-repository";
import type { UpdateBikeInput, InventoryStatus } from "@/lib/inventory/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) return NextResponse.json({ error: "Invalid bike ID" }, { status: 400 });

  const bike = await getBikeById(numericId);
  if (!bike) return NextResponse.json({ error: "Bike not found" }, { status: 404 });
  return NextResponse.json(bike);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) return NextResponse.json({ error: "Invalid bike ID" }, { status: 400 });

  try {
    const body = await request.json();
    const input: UpdateBikeInput = {};
    const fields = [
      "name", "category", "condition", "frameSize", "frameType", "wheelSize",
      "brakes", "drivetrain", "color", "inspectionScore", "serviceStatus",
      "warranty", "bestFor", "description", "image", "inventoryStatus",
    ];
    const numFields = [
      "price", "originalPrice", "year", "mileage", "batteryCapacityWh",
      "batteryHealthPercent", "estimatedRangeKm", "motorPowerW", "torqueNm", "weightKg",
    ];

    for (const f of fields) { if (body[f] !== undefined) (input as any)[f] = body[f]; }
    for (const f of numFields) { if (body[f] !== undefined) (input as any)[f] = Number(body[f]); }
    if (body.images !== undefined) input.images = body.images;
    if (body.featured !== undefined) input.featured = body.featured;
    if (body.recentlyArrived !== undefined) input.recentlyArrived = body.recentlyArrived;

    const bike = await updateBike(numericId, input);
    if (!bike) return NextResponse.json({ error: "Bike not found" }, { status: 404 });
    return NextResponse.json({ success: true, bike });
  } catch {
    return NextResponse.json({ error: "Failed to update bike" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) return NextResponse.json({ error: "Invalid bike ID" }, { status: 400 });

  const success = await deleteBike(numericId);
  if (!success) return NextResponse.json({ error: "Bike not found" }, { status: 404 });
  return NextResponse.json({ success: true });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);
  if (isNaN(numericId)) return NextResponse.json({ error: "Invalid bike ID" }, { status: 400 });

  try {
    const body = await request.json();
    const { status } = body as { status: InventoryStatus };
    const validStatuses: InventoryStatus[] = ["draft", "live", "sold", "archived"];
    if (!validStatuses.includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });

    const bike = await updateBike(numericId, { inventoryStatus: status });
    if (!bike) return NextResponse.json({ error: "Bike not found" }, { status: 404 });
    return NextResponse.json({ success: true, bike });
  } catch {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
