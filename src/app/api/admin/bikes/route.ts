import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const CSV_PATH = path.join(process.cwd(), "src/data/vybe-bikes-final.csv");

function readCSV(): Record<string, string>[] {
  const content = fs.readFileSync(CSV_PATH, "utf-8");
  return parse(content, { columns: true, skip_empty_lines: true }) as Record<string, string>[];
}

function writeCSV(records: Record<string, string>[]) {
  const headers = Object.keys(records[0]);
  const lines = [headers.join(",")];
  for (const row of records) {
    lines.push(headers.map((h) => `"${(row[h] || "").replace(/"/g, '""')}"`).join(","));
  }
  fs.writeFileSync(CSV_PATH, lines.join("\n"), "utf-8");
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  const records = readCSV();
  const existingIds = records.map((r) => r.id);
  const newId = String(Math.max(...existingIds.map(Number), 0) + 1);
  const slug = body.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const newRecord: Record<string, string> = {
    id: newId,
    slug: body.slug || slug,
    name: body.name || "",
    category: body.category || "City",
    price: String(body.price || 0),
    originalPrice: String(body.originalPrice || body.price || 0),
    year: String(body.year || new Date().getFullYear()),
    mileage: String(body.mileage || 0),
    condition: body.condition || "Good",
    batteryCapacityWh: String(body.batteryCapacityWh || 0),
    batteryHealthPercent: String(body.batteryHealthPercent || 100),
    estimatedRangeKm: String(body.estimatedRangeKm || 0),
    motorPowerW: String(body.motorPowerW || 0),
    torqueNm: String(body.torqueNm || 0),
    frameSize: body.frameSize || "Medium",
    frameType: body.frameType || "Step-through",
    wheelSize: body.wheelSize || '26"',
    weightKg: String(body.weightKg || 0),
    brakes: body.brakes || "Disc",
    drivetrain: body.drivetrain || "Single-speed",
    color: body.color || "",
    inspectionScore: body.inspectionScore || "0/32",
    serviceStatus: body.serviceStatus || "pending",
    warranty: body.warranty || "30-day",
    bestFor: body.bestFor || "",
    status: body.status || "available",
    inventoryStatus: body.inventoryStatus || "draft",
    featured: body.featured ? "True" : "False",
    recentlyArrived: body.recentlyArrived ? "True" : "False",
    images: JSON.stringify(body.images || []),
    description: body.description || "",
    image: body.image || "",
  };

  records.push(newRecord);
  writeCSV(records);

  return NextResponse.json({ success: true, bike: newRecord }, { status: 201 });
}
