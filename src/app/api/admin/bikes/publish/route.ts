import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return NextResponse.json({ error: "No DATABASE_URL" }, { status: 500 });

  const sql = neon(url);
  await sql`CREATE TABLE IF NOT EXISTS bikes (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'City',
    price INTEGER NOT NULL DEFAULT 0,
    "originalPrice" INTEGER NOT NULL DEFAULT 0,
    year INTEGER NOT NULL DEFAULT 2024,
    mileage INTEGER NOT NULL DEFAULT 0,
    "condition" TEXT NOT NULL DEFAULT 'Good',
    "batteryCapacityWh" INTEGER DEFAULT 0,
    "batteryHealthPercent" INTEGER DEFAULT 100,
    "estimatedRangeKm" INTEGER DEFAULT 0,
    "motorPowerW" INTEGER DEFAULT 0,
    "torqueNm" INTEGER DEFAULT 0,
    "frameSize" TEXT DEFAULT 'Medium',
    "frameType" TEXT DEFAULT 'Step-through',
    "wheelSize" TEXT DEFAULT '26"',
    "weightKg" REAL DEFAULT 0,
    brakes TEXT DEFAULT 'Disc',
    drivetrain TEXT DEFAULT 'Single-speed',
    color TEXT DEFAULT '',
    "inspectionScore" TEXT DEFAULT '0/32',
    "serviceStatus" TEXT DEFAULT 'pending',
    warranty TEXT DEFAULT '30-day',
    "bestFor" TEXT DEFAULT '',
    description TEXT DEFAULT '',
    image TEXT DEFAULT '',
    images TEXT DEFAULT '[]',
    "inventoryStatus" TEXT NOT NULL DEFAULT 'draft',
    featured INTEGER DEFAULT 0,
    "recentlyArrived" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
  )`;

  // Publish all draft bikes
  const result = await sql`UPDATE bikes SET "inventoryStatus" = 'live', "updatedAt" = NOW() WHERE "inventoryStatus" = 'draft' RETURNING id, name`;
  return NextResponse.json({ ok: true, published: result.length, bikes: result });
}
