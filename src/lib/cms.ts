// CMS Content Configuration
// Uses Vercel KV for persistence, falls back to in-memory for local dev

import { kv } from "@vercel/kv";

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

const KV_KEY = "vybe:cms";

// In-memory fallback for local dev (when KV isn't configured)
let memStore: CMSContent | null = null;

async function hasKV(): Promise<boolean> {
  try {
    await kv.get(KV_KEY);
    return true;
  } catch {
    return false;
  }
}

export async function getCMSContent(): Promise<CMSContent> {
  // Try KV first
  try {
    const data = await kv.get<CMSContent>(KV_KEY);
    if (data) return data;
  } catch {}

  // Fallback to in-memory
  if (memStore) return memStore;
  return defaultContent;
}

export async function updateCMSContent(updates: Partial<CMSContent>): Promise<CMSContent> {
  const current = await getCMSContent();
  const merged = { ...current, ...updates };

  // Try KV
  try {
    await kv.set(KV_KEY, merged);
  } catch {}

  // Always update in-memory fallback
  memStore = merged;
  return merged;
}

export async function resetCMSContent(): Promise<CMSContent> {
  try {
    await kv.set(KV_KEY, defaultContent);
  } catch {}
  memStore = defaultContent;
  return defaultContent;
}
