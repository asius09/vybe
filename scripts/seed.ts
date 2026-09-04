import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

const DB_PATH = path.join(process.cwd(), "data", "vybe.db");
const CSV_PATH = path.join(process.cwd(), "src/data/vybe-bikes-final.csv");

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Remove existing database
if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
}

const db = new Database(DB_PATH);
db.pragma("journal_mode = WAL");

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS bikes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT 'City',
    price INTEGER NOT NULL DEFAULT 0,
    originalPrice INTEGER NOT NULL DEFAULT 0,
    year INTEGER NOT NULL DEFAULT 2024,
    mileage INTEGER NOT NULL DEFAULT 0,
    condition TEXT NOT NULL DEFAULT 'Good',
    batteryCapacityWh INTEGER DEFAULT 0,
    batteryHealthPercent INTEGER DEFAULT 100,
    estimatedRangeKm INTEGER DEFAULT 0,
    motorPowerW INTEGER DEFAULT 0,
    torqueNm INTEGER DEFAULT 0,
    frameSize TEXT DEFAULT 'Medium',
    frameType TEXT DEFAULT 'Step-through',
    wheelSize TEXT DEFAULT '26"',
    weightKg REAL DEFAULT 0,
    brakes TEXT DEFAULT 'Disc',
    drivetrain TEXT DEFAULT 'Single-speed',
    color TEXT DEFAULT '',
    inspectionScore TEXT DEFAULT '0/32',
    serviceStatus TEXT DEFAULT 'pending',
    warranty TEXT DEFAULT '30-day',
    bestFor TEXT DEFAULT '',
    description TEXT DEFAULT '',
    image TEXT DEFAULT '',
    images TEXT DEFAULT '[]',
    inventoryStatus TEXT NOT NULL DEFAULT 'draft',
    featured INTEGER DEFAULT 0,
    recentlyArrived INTEGER DEFAULT 0,
    createdAt TEXT NOT NULL DEFAULT (datetime('now')),
    updatedAt TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_bikes_category ON bikes(category);
  CREATE INDEX IF NOT EXISTS idx_bikes_inventory_status ON bikes(inventoryStatus);
  CREATE INDEX IF NOT EXISTS idx_bikes_price ON bikes(price);
  CREATE INDEX IF NOT EXISTS idx_bikes_slug ON bikes(slug);
`);

// Read CSV
const csvContent = fs.readFileSync(CSV_PATH, "utf-8");
const records = parse(csvContent, { columns: true, skip_empty_lines: true, cast: true }) as Record<string, string>[];

console.log(`Seeding ${records.length} bikes from CSV...`);

const stmt = db.prepare(`
  INSERT INTO bikes (slug, name, category, price, originalPrice, year, mileage, condition,
    batteryCapacityWh, batteryHealthPercent, estimatedRangeKm, motorPowerW, torqueNm,
    frameSize, frameType, wheelSize, weightKg, brakes, drivetrain, color,
    inspectionScore, serviceStatus, warranty, bestFor, description, image, images,
    inventoryStatus, featured, recentlyArrived, createdAt, updatedAt)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((rows: Record<string, string>[]) => {
  for (const r of rows) {
    const now = new Date().toISOString();
    const images = r.images ? JSON.stringify(JSON.parse(r.images.replace(/""/g, '"'))) : "[]";
    const inventoryStatus = r.inventoryStatus || "live";
    const featured = r.featured === "True" ? 1 : 0;
    const recentlyArrived = r.recentlyArrived === "True" ? 1 : 0;

    stmt.run(
      r.slug, r.name, r.category,
      Number(r.price), Number(r.originalPrice),
      Number(r.year), Number(r.mileage), r.condition,
      Number(r.batteryCapacityWh), Number(r.batteryHealthPercent), Number(r.estimatedRangeKm),
      Number(r.motorPowerW), Number(r.torqueNm),
      r.frameSize, r.frameType, r.wheelSize, Number(r.weightKg),
      r.brakes, r.drivetrain, r.color,
      r.inspectionScore, r.serviceStatus, r.warranty, r.bestFor,
      r.description, r.image, images,
      inventoryStatus, featured, recentlyArrived, now, now
    );
  }
});

insertMany(records);

console.log(`Seeded ${records.length} bikes successfully.`);
console.log(`Database: ${DB_PATH}`);

db.close();
