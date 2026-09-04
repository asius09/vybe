// CMS Content Configuration
// Admin can edit these values via the admin panel or directly

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
    location: "DELHI NCR",
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
    address: "Delhi, India",
  },
};

// In-memory store (resets on server restart)
let contentStore: CMSContent = { ...defaultContent };

export function getCMSContent(): CMSContent {
  return contentStore;
}

export function updateCMSContent(updates: Partial<CMSContent>): CMSContent {
  contentStore = { ...contentStore, ...updates };
  return contentStore;
}

export function resetCMSContent(): CMSContent {
  contentStore = { ...defaultContent };
  return contentStore;
}
