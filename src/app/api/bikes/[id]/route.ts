import { NextRequest, NextResponse } from "next/server";
import { getPublicBikeBySlug, getBikeById } from "@/lib/inventory/neon-repository";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let bike = await getPublicBikeBySlug(id);
  if (!bike) {
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      bike = await getBikeById(numericId);
    }
  }

  if (!bike) return NextResponse.json({ error: "Bike not found" }, { status: 404 });
  return NextResponse.json(bike);
}
