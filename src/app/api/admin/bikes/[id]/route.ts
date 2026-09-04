import { NextRequest, NextResponse } from "next/server";
import { getBikeById, updateBike, updateBikeStatus, deleteBike } from "@/lib/inventory/repository";
import { validateUpdateBike } from "@/lib/inventory/validation";
import type { UpdateBikeInput, InventoryStatus } from "@/lib/inventory/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid bike ID" }, { status: 400 });
  }

  const bike = getBikeById(numericId);
  if (!bike) {
    return NextResponse.json({ error: "Bike not found" }, { status: 404 });
  }

  return NextResponse.json(bike);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid bike ID" }, { status: 400 });
  }

  try {
    const body = await request.json();

    const input: UpdateBikeInput = {};
    if (body.name !== undefined) input.name = body.name;
    if (body.category !== undefined) input.category = body.category;
    if (body.price !== undefined) input.price = Number(body.price);
    if (body.originalPrice !== undefined) input.originalPrice = Number(body.originalPrice);
    if (body.year !== undefined) input.year = Number(body.year);
    if (body.mileage !== undefined) input.mileage = Number(body.mileage);
    if (body.condition !== undefined) input.condition = body.condition;
    if (body.batteryCapacityWh !== undefined) input.batteryCapacityWh = Number(body.batteryCapacityWh);
    if (body.batteryHealthPercent !== undefined) input.batteryHealthPercent = Number(body.batteryHealthPercent);
    if (body.estimatedRangeKm !== undefined) input.estimatedRangeKm = Number(body.estimatedRangeKm);
    if (body.motorPowerW !== undefined) input.motorPowerW = Number(body.motorPowerW);
    if (body.torqueNm !== undefined) input.torqueNm = Number(body.torqueNm);
    if (body.frameSize !== undefined) input.frameSize = body.frameSize;
    if (body.frameType !== undefined) input.frameType = body.frameType;
    if (body.wheelSize !== undefined) input.wheelSize = body.wheelSize;
    if (body.weightKg !== undefined) input.weightKg = Number(body.weightKg);
    if (body.brakes !== undefined) input.brakes = body.brakes;
    if (body.drivetrain !== undefined) input.drivetrain = body.drivetrain;
    if (body.color !== undefined) input.color = body.color;
    if (body.inspectionScore !== undefined) input.inspectionScore = body.inspectionScore;
    if (body.serviceStatus !== undefined) input.serviceStatus = body.serviceStatus;
    if (body.warranty !== undefined) input.warranty = body.warranty;
    if (body.bestFor !== undefined) input.bestFor = body.bestFor;
    if (body.description !== undefined) input.description = body.description;
    if (body.image !== undefined) input.image = body.image;
    if (body.images !== undefined) input.images = body.images;
    if (body.inventoryStatus !== undefined) input.inventoryStatus = body.inventoryStatus;

    const errors = validateUpdateBike(input);
    if (errors.length > 0) {
      return NextResponse.json({ error: "Validation failed", errors }, { status: 400 });
    }

    const bike = updateBike(numericId, input);
    if (!bike) {
      return NextResponse.json({ error: "Bike not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, bike });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update bike" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid bike ID" }, { status: 400 });
  }

  const success = deleteBike(numericId);
  if (!success) {
    return NextResponse.json({ error: "Bike not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numericId = Number(id);

  if (isNaN(numericId)) {
    return NextResponse.json({ error: "Invalid bike ID" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { status } = body as { status: InventoryStatus };

    const validStatuses: InventoryStatus[] = ["draft", "live", "sold", "archived"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const bike = updateBikeStatus(numericId, status);
    if (!bike) {
      return NextResponse.json({ error: "Bike not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, bike });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}
