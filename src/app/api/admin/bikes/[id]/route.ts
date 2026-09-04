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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const records = readCSV();
  const idx = records.findIndex((r) => r.id === id || r.slug === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Bike not found" }, { status: 404 });
  }

  const allowedFields = [
    "inventoryStatus", "price", "condition", "featured",
    "recentlyArrived", "status", "description", "warranty",
  ];

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      records[idx][field] = String(body[field]);
    }
  }

  writeCSV(records);

  return NextResponse.json({ success: true, bike: records[idx] });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const records = readCSV();
  const filtered = records.filter((r) => r.id !== id && r.slug !== id);

  if (filtered.length === records.length) {
    return NextResponse.json({ error: "Bike not found" }, { status: 404 });
  }

  writeCSV(filtered);

  return NextResponse.json({ success: true });
}
