-- VYBE Bikes Database Schema
-- For Vercel Postgres (production deployment)
--
-- Setup:
--   1. Run `npx vercel env add POSTGRES_URL` to add your Vercel Postgres URL
--   2. Run this SQL in your Vercel Postgres dashboard
--   3. Update API routes to use `@vercel/postgres` instead of CSV

CREATE TABLE IF NOT EXISTS bikes (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'City',
  price INTEGER NOT NULL DEFAULT 0,
  original_price INTEGER NOT NULL DEFAULT 0,
  year INTEGER NOT NULL DEFAULT 2024,
  mileage INTEGER NOT NULL DEFAULT 0,
  condition VARCHAR(50) NOT NULL DEFAULT 'Good',
  battery_capacity_wh INTEGER DEFAULT 0,
  battery_health_percent INTEGER DEFAULT 100,
  estimated_range_km INTEGER DEFAULT 0,
  motor_power_w INTEGER DEFAULT 0,
  torque_nm INTEGER DEFAULT 0,
  frame_size VARCHAR(50) DEFAULT 'Medium',
  frame_type VARCHAR(100) DEFAULT 'Step-through',
  wheel_size VARCHAR(50) DEFAULT '26"',
  weight_kg DECIMAL(5,1) DEFAULT 0,
  brakes VARCHAR(100) DEFAULT 'Disc',
  drivetrain VARCHAR(100) DEFAULT 'Single-speed',
  color VARCHAR(100) DEFAULT '',
  inspection_score VARCHAR(20) DEFAULT '0/32',
  service_status VARCHAR(50) DEFAULT 'pending',
  warranty VARCHAR(100) DEFAULT '30-day',
  best_for TEXT DEFAULT '',
  status VARCHAR(50) NOT NULL DEFAULT 'available',
  inventory_status VARCHAR(50) NOT NULL DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  recently_arrived BOOLEAN DEFAULT FALSE,
  images TEXT DEFAULT '[]',
  description TEXT DEFAULT '',
  image TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_bikes_category ON bikes(category);
CREATE INDEX IF NOT EXISTS idx_bikes_status ON bikes(status);
CREATE INDEX IF NOT EXISTS idx_bikes_inventory_status ON bikes(inventory_status);
CREATE INDEX IF NOT EXISTS idx_bikes_price ON bikes(price);
CREATE INDEX IF NOT EXISTS idx_bikes_slug ON bikes(slug);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bikes_updated_at
  BEFORE UPDATE ON bikes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
