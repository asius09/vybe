import { NextRequest, NextResponse } from "next/server";
import { createBike } from "@/lib/inventory/repository";
import type { CreateBikeInput } from "@/lib/inventory/types";

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"') {
        if (i + 1 < line.length && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
  }
  result.push(current.trim());
  return result;
}

function parseCSV(text: string): string[][] {
  const lines = text.split("\n").filter((l) => l.trim());
  return lines.map(parseCSVLine);
}

function csvRowToBike(row: string[], headers: string[]): CreateBikeInput {
  const get = (key: string) => {
    const idx = headers.indexOf(key);
    return idx >= 0 ? row[idx] || "" : "";
  };

  return {
    slug: "",
    name: get("name") || "Untitled Bike",
    category: get("category") || "City",
    price: Number(get("price")) || 0,
    originalPrice: Number(get("originalPrice")) || Number(get("price")) || 0,
    year: Number(get("year")) || new Date().getFullYear(),
    mileage: Number(get("mileage")) || 0,
    condition: get("condition") || "Good",
    batteryCapacityWh: Number(get("batteryCapacityWh")) || 0,
    batteryHealthPercent: Number(get("batteryHealthPercent")) || 100,
    estimatedRangeKm: Number(get("estimatedRangeKm")) || 0,
    motorPowerW: Number(get("motorPowerW")) || 0,
    torqueNm: Number(get("torqueNm")) || 0,
    frameSize: get("frameSize") || "Medium",
    frameType: get("frameType") || "Step-through",
    wheelSize: get("wheelSize") || '26"',
    weightKg: Number(get("weightKg")) || 0,
    brakes: get("brakes") || "Disc",
    drivetrain: get("drivetrain") || "Single-speed",
    color: get("color") || "",
    inspectionScore: get("inspectionScore") || "0/32",
    serviceStatus: get("serviceStatus") || "pending",
    warranty: get("warranty") || "30-day",
    bestFor: get("bestFor") || "",
    description: get("description") || "",
    image: get("image") || "",
    images: (() => {
      try { return JSON.parse(get("images") || "[]"); } catch { return []; }
    })(),
    inventoryStatus: (get("inventoryStatus") as CreateBikeInput["inventoryStatus"]) || "draft",
    featured: get("featured")?.toLowerCase() === "true",
    recentlyArrived: get("recentlyArrived")?.toLowerCase() === "true",
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.name.endsWith(".csv")) {
      return NextResponse.json({ error: "File must be a CSV" }, { status: 400 });
    }

    const text = await file.text();
    const rows = parseCSV(text);

    if (rows.length < 2) {
      return NextResponse.json({ error: "CSV must have a header row and at least one data row" }, { status: 400 });
    }

    const headers = rows[0].map((h) => h.replace(/"/g, "").trim());
    const dataRows = rows.slice(1);

    const results = { total: dataRows.length, success: 0, failed: 0, errors: [] as string[], bikes: [] as ReturnType<typeof createBike>[] };

    for (let i = 0; i < dataRows.length; i++) {
      try {
        const bikeInput = csvRowToBike(dataRows[i], headers);
        if (!bikeInput.name || bikeInput.name === "Untitled Bike") {
          results.failed++;
          results.errors.push(`Row ${i + 2}: Missing bike name`);
          continue;
        }
        const bike = createBike(bikeInput);
        results.bikes.push(bike);
        results.success++;
      } catch (e) {
        results.failed++;
        results.errors.push(`Row ${i + 2}: ${e instanceof Error ? e.message : "Unknown error"}`);
      }
    }

    return NextResponse.json({ ok: true, ...results });
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Upload failed" }, { status: 500 });
  }
}
