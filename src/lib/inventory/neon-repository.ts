import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import type { Bike, CreateBikeInput, UpdateBikeInput, InventoryStatus, BikeListResult } from "./types";
import { generateSlug, ensureUniqueSlug } from "./slug";

let _sql: NeonQueryFunction<false, false> | null = null;

function getSQL() {
  if (_sql) return _sql;
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  _sql = neon(url);
  return _sql;
}

async function ensureTable(sql: NeonQueryFunction<false, false>) {
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
    "inventoryStatus" TEXT NOT NULL DEFAULT 'live',
    featured INTEGER DEFAULT 0,
    "recentlyArrived" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "updatedAt" TIMESTAMP DEFAULT NOW()
  )`;
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
    images: (() => { try { return JSON.parse(row.images as string || "[]"); } catch { return []; } })(),
    inventoryStatus: row.inventoryStatus as InventoryStatus,
    featured: Boolean(row.featured),
    recentlyArrived: Boolean(row.recentlyArrived),
    createdAt: (row.createdAt as string) || "",
    updatedAt: (row.updatedAt as string) || "",
  };
}

export async function getAllBikes(): Promise<Bike[]> {
  const sql = getSQL();
  if (!sql) return [];
  try {
    await ensureTable(sql);
    const rows = await sql`SELECT * FROM bikes ORDER BY "updatedAt" DESC`;
    return (rows as Record<string, unknown>[]).map(rowToBike);
  } catch { return []; }
}

export async function getPublicBikes(): Promise<Bike[]> {
  const sql = getSQL();
  if (!sql) return [];
  try {
    await ensureTable(sql);
    const rows = await sql`SELECT * FROM bikes WHERE "inventoryStatus" = 'live' ORDER BY "createdAt" DESC`;
    return (rows as Record<string, unknown>[]).map(rowToBike);
  } catch { return []; }
}

export async function getPublicBikeBySlug(slug: string): Promise<Bike | undefined> {
  const sql = getSQL();
  if (!sql) return undefined;
  try {
    await ensureTable(sql);
    const rows = await sql`SELECT * FROM bikes WHERE slug = ${slug} AND "inventoryStatus" = 'live'`;
    return rows.length > 0 ? rowToBike(rows[0] as Record<string, unknown>) : undefined;
  } catch { return undefined; }
}

export async function getBikeById(id: number): Promise<Bike | undefined> {
  const sql = getSQL();
  if (!sql) return undefined;
  try {
    await ensureTable(sql);
    const rows = await sql`SELECT * FROM bikes WHERE id = ${id}`;
    return rows.length > 0 ? rowToBike(rows[0] as Record<string, unknown>) : undefined;
  } catch { return undefined; }
}

export async function createBike(input: CreateBikeInput): Promise<Bike> {
  const sql = getSQL();
  if (!sql) throw new Error("No database connection");
  await ensureTable(sql);

  const existing = await sql`SELECT slug FROM bikes`;
  const slug = ensureUniqueSlug(generateSlug(input.name), (existing as { slug: string }[]).map((r) => r.slug));
  const now = new Date().toISOString();
  const images = JSON.stringify(input.images || []);

  const rows = await sql`
    INSERT INTO bikes (slug, name, category, price, "originalPrice", year, mileage, "condition",
      "batteryCapacityWh", "batteryHealthPercent", "estimatedRangeKm", "motorPowerW", "torqueNm",
      "frameSize", "frameType", "wheelSize", "weightKg", brakes, drivetrain, color,
      "inspectionScore", "serviceStatus", warranty, "bestFor", description, image, images,
      "inventoryStatus", featured, "recentlyArrived", "createdAt", "updatedAt")
    VALUES (${slug}, ${input.name}, ${input.category}, ${input.price}, ${input.originalPrice},
      ${input.year}, ${input.mileage}, ${input.condition},
      ${input.batteryCapacityWh}, ${input.batteryHealthPercent}, ${input.estimatedRangeKm},
      ${input.motorPowerW}, ${input.torqueNm},
      ${input.frameSize}, ${input.frameType}, ${input.wheelSize}, ${input.weightKg},
      ${input.brakes}, ${input.drivetrain}, ${input.color},
      ${input.inspectionScore}, ${input.serviceStatus}, ${input.warranty}, ${input.bestFor},
      ${input.description}, ${input.image}, ${images},
      ${input.inventoryStatus || "live"}, ${input.featured ? 1 : 0}, ${input.recentlyArrived ? 1 : 0}, ${now}, ${now})
    RETURNING *
  `;
  return rowToBike(rows[0] as Record<string, unknown>);
}

export async function createBikesBulk(inputs: CreateBikeInput[]): Promise<{ bikes: Bike[]; errors: string[] }> {
  const sql = getSQL();
  if (!sql) throw new Error("No database connection");
  await ensureTable(sql);

  const existing = await sql`SELECT slug FROM bikes`;
  const existingSlugs = (existing as { slug: string }[]).map((r) => r.slug);
  const bikes: Bike[] = [];
  const errors: string[] = [];

  for (let i = 0; i < inputs.length; i++) {
    try {
      const input = inputs[i];
      const slug = ensureUniqueSlug(generateSlug(input.name), existingSlugs);
      existingSlugs.push(slug);
      const now = new Date().toISOString();
      const images = JSON.stringify(input.images || []);

      const rows = await sql`
        INSERT INTO bikes (slug, name, category, price, "originalPrice", year, mileage, "condition",
          "batteryCapacityWh", "batteryHealthPercent", "estimatedRangeKm", "motorPowerW", "torqueNm",
          "frameSize", "frameType", "wheelSize", "weightKg", brakes, drivetrain, color,
          "inspectionScore", "serviceStatus", warranty, "bestFor", description, image, images,
          "inventoryStatus", featured, "recentlyArrived", "createdAt", "updatedAt")
        VALUES (${slug}, ${input.name}, ${input.category}, ${input.price}, ${input.originalPrice},
          ${input.year}, ${input.mileage}, ${input.condition},
          ${input.batteryCapacityWh}, ${input.batteryHealthPercent}, ${input.estimatedRangeKm},
          ${input.motorPowerW}, ${input.torqueNm},
          ${input.frameSize}, ${input.frameType}, ${input.wheelSize}, ${input.weightKg},
          ${input.brakes}, ${input.drivetrain}, ${input.color},
          ${input.inspectionScore}, ${input.serviceStatus}, ${input.warranty}, ${input.bestFor},
          ${input.description}, ${input.image}, ${images},
          ${input.inventoryStatus || "live"}, ${input.featured ? 1 : 0}, ${input.recentlyArrived ? 1 : 0}, ${now}, ${now})
        RETURNING *
      `;
      bikes.push(rowToBike(rows[0] as Record<string, unknown>));
    } catch (e) {
      errors.push(`Row ${i + 2}: ${e instanceof Error ? e.message : "Unknown error"}`);
    }
  }
  return { bikes, errors };
}

export async function updateBike(id: number, input: UpdateBikeInput): Promise<Bike | null> {
  const sql = getSQL();
  if (!sql) return null;
  const existing = await getBikeById(id);
  if (!existing) return null;

  // Build SET clause dynamically
  const setParts: string[] = [];
  const values: unknown[] = [];

  const updatable = [
    "name", "category", "price", "originalPrice", "year", "mileage", "condition",
    "batteryCapacityWh", "batteryHealthPercent", "estimatedRangeKm",
    "motorPowerW", "torqueNm", "frameSize", "frameType", "wheelSize", "weightKg",
    "brakes", "drivetrain", "color", "inspectionScore", "serviceStatus",
    "warranty", "bestFor", "description", "image", "inventoryStatus",
  ];

  for (const field of updatable) {
    if (field in input) {
      setParts.push(`"${field}" = $${values.length + 1}`);
      values.push((input as Record<string, unknown>)[field]);
    }
  }
  if ("images" in input) { setParts.push(`images = $${values.length + 1}`); values.push(JSON.stringify(input.images || [])); }
  if ("featured" in input) { setParts.push(`featured = $${values.length + 1}`); values.push(input.featured ? 1 : 0); }
  if ("recentlyArrived" in input) { setParts.push(`"recentlyArrived" = $${values.length + 1}`); values.push(input.recentlyArrived ? 1 : 0); }

  if (setParts.length === 0) return existing;
  setParts.push(`"updatedAt" = NOW()`);
  values.push(id);

  const query = `UPDATE bikes SET ${setParts.join(", ")} WHERE id = $${values.length} RETURNING *`;
  const rows = await sql.query(query, values);
  return rows.length > 0 ? rowToBike(rows[0] as Record<string, unknown>) : null;
}

export async function deleteBike(id: number): Promise<boolean> {
  const sql = getSQL();
  if (!sql) return false;
  try {
    await sql`DELETE FROM bikes WHERE id = ${id}`;
    return true;
  } catch { return false; }
}

export async function getInventoryCounts(): Promise<Record<string, number>> {
  const sql = getSQL();
  if (!sql) return { all: 0 };
  try {
    await ensureTable(sql);
    const rows = await sql`SELECT "inventoryStatus", COUNT(*) as count FROM bikes GROUP BY "inventoryStatus"`;
    const counts: Record<string, number> = { all: 0 };
    for (const row of rows as { inventoryStatus: string; count: number }[]) {
      counts[row.inventoryStatus] = Number(row.count);
      counts.all += Number(row.count);
    }
    return counts;
  } catch { return { all: 0 }; }
}

export async function searchBikes(query: string): Promise<Bike[]> {
  const sql = getSQL();
  if (!sql) return [];
  try {
    const q = `%${query}%`;
    const rows = await sql`SELECT * FROM bikes WHERE name ILIKE ${q} OR category ILIKE ${q} OR color ILIKE ${q} OR "bestFor" ILIKE ${q} ORDER BY "updatedAt" DESC`;
    return (rows as Record<string, unknown>[]).map(rowToBike);
  } catch { return []; }
}

export async function getBikesByPage(page: number, pageSize: number, status?: InventoryStatus): Promise<BikeListResult> {
  const sql = getSQL();
  if (!sql) return { bikes: [], total: 0, page, pageSize, totalPages: 0 };
  try {
    await ensureTable(sql);
    if (status) {
      const countRows = await sql`SELECT COUNT(*) as count FROM bikes WHERE "inventoryStatus" = ${status}`;
      const total = Number((countRows[0] as { count: number }).count);
      const offset = (page - 1) * pageSize;
      const rows = (await sql`SELECT * FROM bikes WHERE "inventoryStatus" = ${status} ORDER BY "updatedAt" DESC LIMIT ${pageSize} OFFSET ${offset}`) as Record<string, unknown>[];
      return { bikes: rows.map(rowToBike), total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
    } else {
      const countRows = await sql`SELECT COUNT(*) as count FROM bikes`;
      const total = Number((countRows[0] as { count: number }).count);
      const offset = (page - 1) * pageSize;
      const rows = (await sql`SELECT * FROM bikes ORDER BY "updatedAt" DESC LIMIT ${pageSize} OFFSET ${offset}`) as Record<string, unknown>[];
      return { bikes: rows.map(rowToBike), total, page, pageSize, totalPages: Math.ceil(total / pageSize) };
    }
  } catch { return { bikes: [], total: 0, page, pageSize, totalPages: 0 }; }
}

export async function filterBikes(opts: {
  category?: string;
  status?: InventoryStatus;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<BikeListResult> {
  const sql = getSQL();
  if (!sql) return { bikes: [], total: 0, page: opts.page || 1, pageSize: opts.pageSize || 12, totalPages: 0 };
  try {
    await ensureTable(sql);

    // For filter, use dynamic query with sql() (not tagged template)
    const conditions: string[] = [];
    const values: unknown[] = [];

    if (opts.status) {
      conditions.push(`"inventoryStatus" = $${values.length + 1}`);
      values.push(opts.status);
    } else {
      conditions.push(`"inventoryStatus" = 'live'`);
    }
    if (opts.category && opts.category !== "all") {
      conditions.push(`category = $${values.length + 1}`);
      values.push(opts.category);
    }
    if (opts.minPrice) {
      conditions.push(`price >= $${values.length + 1}`);
      values.push(opts.minPrice);
    }
    if (opts.maxPrice) {
      conditions.push(`price <= $${values.length + 1}`);
      values.push(opts.maxPrice);
    }
    if (opts.condition) {
      conditions.push(`"condition" = $${values.length + 1}`);
      values.push(opts.condition);
    }
    if (opts.search) {
      conditions.push(`(name ILIKE $${values.length + 1} OR category ILIKE $${values.length + 1} OR color ILIKE $${values.length + 1})`);
      values.push(`%${opts.search}%`);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
    const page = opts.page || 1;
    const pageSize = opts.pageSize || 12;
    const offset = (page - 1) * pageSize;

    const countResult = await sql.query(`SELECT COUNT(*) as count FROM bikes ${where}`, values);
    const total = Number((countResult[0] as { count: number }).count);

    values.push(pageSize, offset);
    const dataResult = await sql.query(`SELECT * FROM bikes ${where} ORDER BY "updatedAt" DESC LIMIT $${values.length - 1} OFFSET $${values.length}`, values);

    return {
      bikes: (dataResult as Record<string, unknown>[]).map(rowToBike),
      total, page, pageSize, totalPages: Math.ceil(total / pageSize),
    };
  } catch { return { bikes: [], total: 0, page: opts.page || 1, pageSize: opts.pageSize || 12, totalPages: 0 }; }
}
