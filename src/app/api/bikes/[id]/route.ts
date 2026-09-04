import { NextRequest, NextResponse } from "next/server";
import { getBikeBySlug, getAllBikes } from "@/data/loader";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try slug first, then id
  let bike = getBikeBySlug(id);
  if (!bike) {
    bike = getAllBikes().find((b) => b.id === id);
  }

  if (!bike) {
    return NextResponse.json({ error: "Bike not found" }, { status: 404 });
  }

  return NextResponse.json(bike);
}
