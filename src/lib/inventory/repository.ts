import Database from "better-sqlite3";
import path from "path";
import type { Bike, CreateBikeInput, UpdateBikeInput, InventoryStatus, BikeListResult } from "./types";
import { generateSlug, ensureUniqueSlug } from "./slug";

const DB_PATH = path.join(process.cwd(), "data", "vybe.db");

let _db: Database.Database | null = null;

function getDb(): Database.Database {
  if (_db) return _db;
  _db = new Database(DB_PATH);
  _db.pragma("journal_mode = WAL");
  _db.pragma("foreign_keys = ON");
  initSchema(_db);
  return _db;
}

function initSchema(db: Database.Database) {
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
}

function rowToBike(row: Record<string, unknown>): Bike {
  return {
    id: row.id as number,
    slug: row.slug as string,
    name: row.name as string,
    category: row.category as string,
    price: row.price as number,
    originalPrice: row.originalPrice as number,
    year: row.year as number,
    mileage: row.mileage as number,
    condition: row.condition as string,
    batteryCapacityWh: row.batteryCapacityWh as number,
    batteryHealthPercent: row.batteryHealthPercent as number,
    estimatedRangeKm: row.estimatedRangeKm as number,
    motorPowerW: row.motorPowerW as number,
    torqueNm: row.torqueNm as number,
    frameSize: row.frameSize as string,
    frameType: row.frameType as string,
    wheelSize: row.wheelSize as string,
    weightKg: row.weightKg as number,
    brakes: row.brakes as string,
    drivetrain: row.drivetrain as string,
    color: row.color as string,
    inspectionScore: row.inspectionScore as string,
    serviceStatus: row.serviceStatus as string,
    warranty: row.warranty as string,
    bestFor: row.bestFor as string,
    description: row.description as string,
    image: row.image as string,
    images: JSON.parse((row.images as string) || "[]"),
    inventoryStatus: row.inventoryStatus as InventoryStatus,
    featured: Boolean(row.featured),
    recentlyArrived: Boolean(row.recentlyArrived),
    createdAt: row.createdAt as string,
    updatedAt: row.updatedAt as string,
  };
}

// ─── Public Queries ───

export function getPublicBikes(): Bike[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM bikes WHERE inventoryStatus = 'live' ORDER BY createdAt DESC").all() as Record<string, unknown>[];
  return rows.map(rowToBike);
}

export function getPublicBikeBySlug(slug: string): Bike | undefined {
  const db = getDb();
  const row = db.prepare("SELECT * FROM bikes WHERE slug = ? AND inventoryStatus = 'live'").get(slug) as Record<string, unknown> | undefined;
  return row ? rowToBike(row) : undefined;
}

// ─── Admin Queries ───

export function getAllBikes(): Bike[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM bikes ORDER BY updatedAt DESC").all() as Record<string, unknown>[];
  return rows.map(rowToBike);
}

export function getBikeById(id: number): Bike | undefined {
  const db = getDb();
  const row = db.prepare("SELECT * FROM bikes WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  return row ? rowToBike(row) : undefined;
}

export function getBikesByPage(page: number, pageSize: number, status?: InventoryStatus): BikeListResult {
  const db = getDb();
  const where = status ? "WHERE inventoryStatus = ?" : "";
  const params = status ? [status] : [];

  const total = (db.prepare(`SELECT COUNT(*) as count FROM bikes ${where}`).get(...params) as { count: number }).count;
  const offset = (page - 1) * pageSize;
  const rows = db.prepare(`SELECT * FROM bikes ${where} ORDER BY updatedAt DESC LIMIT ? OFFSET ?`).all(...params, pageSize, offset) as Record<string, unknown>[];

  return {
    bikes: rows.map(rowToBike),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export function getInventoryCounts(): Record<string, number> {
  const db = getDb();
  const rows = db.prepare("SELECT inventoryStatus, COUNT(*) as count FROM bikes GROUP BY inventoryStatus").all() as { inventoryStatus: string; count: number }[];
  const counts: Record<string, number> = { all: 0 };
  for (const row of rows) {
    counts[row.inventoryStatus] = row.count;
    counts.all += row.count;
  }
  return counts;
}

export function searchBikes(query: string): Bike[] {
  const db = getDb();
  const q = `%${query}%`;
  const rows = db.prepare(
    "SELECT * FROM bikes WHERE name LIKE ? OR category LIKE ? OR color LIKE ? OR bestFor LIKE ? ORDER BY updatedAt DESC"
  ).all(q, q, q, q) as Record<string, unknown>[];
  return rows.map(rowToBike);
}

export function filterBikes(opts: {
  category?: string;
  status?: InventoryStatus;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): BikeListResult {
  const db = getDb();
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (opts.status) {
    conditions.push("inventoryStatus = ?");
    params.push(opts.status);
  } else {
    conditions.push("inventoryStatus = 'live'");
  }
  if (opts.category && opts.category !== "all") {
    conditions.push("category = ?");
    params.push(opts.category);
  }
  if (opts.minPrice) {
    conditions.push("price >= ?");
    params.push(opts.minPrice);
  }
  if (opts.maxPrice) {
    conditions.push("price <= ?");
    params.push(opts.maxPrice);
  }
  if (opts.condition) {
    conditions.push("condition = ?");
    params.push(opts.condition);
  }
  if (opts.search) {
    const q = `%${opts.search}%`;
    conditions.push("(name LIKE ? OR category LIKE ? OR color LIKE ?)");
    params.push(q, q, q);
  }

  const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const total = (db.prepare(`SELECT COUNT(*) as count FROM bikes ${where}`).get(...params) as { count: number }).count;

  const page = opts.page || 1;
  const pageSize = opts.pageSize || 6;
  const offset = (page - 1) * pageSize;
  const rows = db.prepare(`SELECT * FROM bikes ${where} ORDER BY updatedAt DESC LIMIT ? OFFSET ?`).all(...params, pageSize, offset) as Record<string, unknown>[];

  return {
    bikes: rows.map(rowToBike),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// ─── Mutations ───

export function createBike(input: CreateBikeInput): Bike {
  const db = getDb();

  const existingSlugs = (db.prepare("SELECT slug FROM bikes").all() as { slug: string }[]).map((r) => r.slug);
  const slug = ensureUniqueSlug(generateSlug(input.name), existingSlugs);

  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO bikes (slug, name, category, price, originalPrice, year, mileage, condition,
      batteryCapacityWh, batteryHealthPercent, estimatedRangeKm, motorPowerW, torqueNm,
      frameSize, frameType, wheelSize, weightKg, brakes, drivetrain, color,
      inspectionScore, serviceStatus, warranty, bestFor, description, image, images,
      inventoryStatus, featured, recentlyArrived, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    slug, input.name, input.category, input.price, input.originalPrice,
    input.year, input.mileage, input.condition,
    input.batteryCapacityWh, input.batteryHealthPercent, input.estimatedRangeKm,
    input.motorPowerW, input.torqueNm,
    input.frameSize, input.frameType, input.wheelSize, input.weightKg,
    input.brakes, input.drivetrain, input.color,
    input.inspectionScore, input.serviceStatus, input.warranty, input.bestFor,
    input.description, input.image, JSON.stringify(input.images || []),
    input.inventoryStatus || "draft", input.featured ? 1 : 0, input.recentlyArrived ? 1 : 0, now, now
  );

  return getBikeById(result.lastInsertRowid as number)!;
}

export function updateBike(id: number, input: UpdateBikeInput): Bike | null {
  const db = getDb();
  const existing = getBikeById(id);
  if (!existing) return null;

  const fields: string[] = [];
  const values: unknown[] = [];

  const updatableFields = [
    "name", "category", "price", "originalPrice", "year", "mileage", "condition",
    "batteryCapacityWh", "batteryHealthPercent", "estimatedRangeKm",
    "motorPowerW", "torqueNm", "frameSize", "frameType", "wheelSize", "weightKg",
    "brakes", "drivetrain", "color", "inspectionScore", "serviceStatus",
    "warranty", "bestFor", "description", "image", "inventoryStatus",
  ];

  for (const field of updatableFields) {
    if (field in input) {
      fields.push(`${field} = ?`);
      values.push((input as Record<string, unknown>)[field]);
    }
  }

  if ("images" in input) {
    fields.push("images = ?");
    values.push(JSON.stringify(input.images || []));
  }

  if (fields.length === 0) return existing;

  fields.push("updatedAt = ?");
  values.push(new Date().toISOString());
  values.push(id);

  db.prepare(`UPDATE bikes SET ${fields.join(", ")} WHERE id = ?`).run(...values);

  return getBikeById(id)!;
}

export function updateBikeStatus(id: number, status: InventoryStatus): Bike | null {
  const db = getDb();
  const existing = getBikeById(id);
  if (!existing) return null;

  const now = new Date().toISOString();
  db.prepare("UPDATE bikes SET inventoryStatus = ?, updatedAt = ? WHERE id = ?").run(status, now, id);

  return getBikeById(id)!;
}

export function deleteBike(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM bikes WHERE id = ?").run(id);
  return result.changes > 0;
}

export function getCategories(): { name: string; count: number }[] {
  const db = getDb();
  const rows = db.prepare(
    "SELECT category as name, COUNT(*) as count FROM bikes WHERE inventoryStatus = 'live' GROUP BY category"
  ).all() as { name: string; count: number }[];
  return rows;
}

export function getFeaturedBikes(): Bike[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM bikes WHERE inventoryStatus = 'live' AND (bestFor LIKE '%commute%' OR bestFor LIKE '%daily%' OR inspectionScore LIKE '%32%') ORDER BY createdAt DESC LIMIT 6").all() as Record<string, unknown>[];
  return rows.map(rowToBike);
}

export function getNewArrivals(): Bike[] {
  const db = getDb();
  const rows = db.prepare("SELECT * FROM bikes WHERE inventoryStatus = 'live' ORDER BY createdAt DESC LIMIT 6").all() as Record<string, unknown>[];
  return rows.map(rowToBike);
}
