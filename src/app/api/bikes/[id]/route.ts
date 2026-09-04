import { NextRequest, NextResponse } from "next/server";
import { getPublicBikeBySlug, getBikeById } from "@/lib/inventory/repository";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try slug first (public), then id (admin)
  let bike = getPublicBikeBySlug(id);
  if (!bike) {
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      bike = getBikeById(numericId);
    }
  }

  if (!bike) {
    return NextResponse.json({ error: "Bike not found" }, { status: 404 });
  }

  return NextResponse.json(bike);
}
