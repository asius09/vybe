// CMS Content Configuration
// Uses Neon Postgres for persistence on Vercel, in-memory for local dev

import { neon } from "@neondatabase/serverless";

export interface CMSContent {
  announcement: {
    text: string;
    location: string;
    enabled: boolean;
  };
  hero: {
    tagline: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  repairs: {
    tagline: string;
    title: string;
    titleHighlight: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    address: string;
  };
}

const defaultContent: CMSContent = {
  announcement: {
    text: "Free test rides · Serviced bikes · 30-day support",
    location: "",
    enabled: true,
  },
  hero: {
    tagline: "New arrivals weekly",
    title: "Find your\nnext ride.",
    titleHighlight: "next ride.",
    subtitle: "Inspected, serviced, and ready to ride. Every VYBE bike passes 32 checks before it reaches you.",
    ctaPrimary: "Browse All Bikes",
    ctaSecondary: "Sell Your Bike",
  },
  repairs: {
    tagline: "Repair Services",
    title: "Expert e-bike\nrepairs.",
    titleHighlight: "repairs.",
    subtitle: "From quick safety checks to full overhauls. Our in-house team services all e-bike brands and models.",
  },
  contact: {
    title: "What do you need?",
    subtitle: "Select what brings you here and we'll guide you through it.",
    phone: "+91 93154 05304",
    email: "itsmeasius@gmail.com",
    address: "India",
  },
};

let memStore: CMSContent | null = null;

function getSQL() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) return null;
  return neon(url);
}

export async function getCMSContent(): Promise<CMSContent> {
  const sql = getSQL();
  if (sql) {
    try {
      await sql`CREATE TABLE IF NOT EXISTS cms_content (
        id TEXT PRIMARY KEY DEFAULT 'main',
        content JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )`;
      const rows = await sql`SELECT content FROM cms_content WHERE id = 'main'`;
      if (rows.length > 0) return rows[0].content as CMSContent;
    } catch (e) {
      console.error("CMS read error:", e);
    }
  }
  if (memStore) return memStore;
  return defaultContent;
}

export async function updateCMSContent(updates: Partial<CMSContent>): Promise<CMSContent> {
  const current = await getCMSContent();
  const merged = { ...current, ...updates };

  const sql = getSQL();
  if (sql) {
    try {
      await sql`CREATE TABLE IF NOT EXISTS cms_content (
        id TEXT PRIMARY KEY DEFAULT 'main',
        content JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )`;
      const payload = JSON.stringify(merged);
      await sql`INSERT INTO cms_content (id, content, updated_at) VALUES ('main', ${payload}::jsonb, NOW())
        ON CONFLICT (id) DO UPDATE SET content = ${payload}::jsonb, updated_at = NOW()`;
    } catch (e) {
      console.error("CMS write error:", e);
    }
  }

  memStore = merged;
  return merged;
}

export async function resetCMSContent(): Promise<CMSContent> {
  const sql = getSQL();
  if (sql) {
    try {
      await sql`CREATE TABLE IF NOT EXISTS cms_content (
        id TEXT PRIMARY KEY DEFAULT 'main',
        content JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW()
      )`;
      const payload = JSON.stringify(defaultContent);
      await sql`INSERT INTO cms_content (id, content, updated_at) VALUES ('main', ${payload}::jsonb, NOW())
        ON CONFLICT (id) DO UPDATE SET content = ${payload}::jsonb, updated_at = NOW()`;
    } catch (e) {
      console.error("CMS reset error:", e);
    }
  }
  memStore = defaultContent;
  return defaultContent;
}
