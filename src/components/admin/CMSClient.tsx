"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, Save, RotateCcw, Megaphone, Layout, Wrench, Phone } from "lucide-react";

interface CMSContent {
  announcement: { text: string; location: string; enabled: boolean };
  hero: { tagline: string; title: string; titleHighlight: string; subtitle: string; ctaPrimary: string; ctaSecondary: string };
  repairs: { tagline: string; title: string; titleHighlight: string; subtitle: string };
  contact: { title: string; subtitle: string; phone: string; email: string; address: string };
}

const sections = [
  { id: "announcement", label: "Announcement Bar", icon: Megaphone },
  { id: "hero", label: "Homepage Hero", icon: Layout },
  { id: "repairs", label: "Repairs Page", icon: Wrench },
  { id: "contact", label: "Contact Page", icon: Phone },
] as const;

export function CMSClient() {
  const [content, setContent] = useState<CMSContent | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("announcement");

  useEffect(() => {
    fetch("/api/admin/cms").then((r) => r.json()).then(setContent);
  }, []);

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/cms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    const res = await fetch("/api/admin/cms", { method: "DELETE" });
    const data = await res.json();
    setContent(data.content);
  };

  if (!content) {
    return (
      <div className="mx-auto max-w-4xl px-5 py-20 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Link href="/admin/inventory" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" /> Admin
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Site Content</h1>
          <p className="mt-1 text-sm text-muted-foreground">Edit static content across your site</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving}>
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Saved" : saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Section tabs */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
                activeSection === sec.id
                  ? "bg-foreground text-warm-white"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {sec.label}
            </button>
          );
        })}
      </div>

      {/* Announcement Bar */}
      {activeSection === "announcement" && (
        <div className="rounded-2xl border border-border bg-white p-6 space-y-5">
          <h2 className="font-heading text-lg font-bold">Announcement Bar</h2>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={content.announcement.enabled}
                onChange={(e) => setContent({ ...content, announcement: { ...content.announcement, enabled: e.target.checked } })}
                className="h-4 w-4 rounded border-border"
              />
              <span className="text-sm font-semibold">Enabled</span>
            </label>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Location</label>
            <Input
              value={content.announcement.location}
              onChange={(e) => setContent({ ...content, announcement: { ...content.announcement, location: e.target.value } })}
              placeholder="DELHI NCR"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Announcement Text</label>
            <Input
              value={content.announcement.text}
              onChange={(e) => setContent({ ...content, announcement: { ...content.announcement, text: e.target.value } })}
              placeholder="Free test rides · Serviced bikes · 30-day support"
            />
          </div>
          <div className="rounded-xl bg-asphalt p-4">
            <p className="text-[11px] text-warm-white/50 mb-1">Preview</p>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-lime font-bold">{content.announcement.location}</span>
              <span className="text-warm-white/20">|</span>
              <span className="text-warm-white/60">{content.announcement.text}</span>
            </div>
          </div>
        </div>
      )}

      {/* Hero */}
      {activeSection === "hero" && (
        <div className="rounded-2xl border border-border bg-white p-6 space-y-5">
          <h2 className="font-heading text-lg font-bold">Homepage Hero</h2>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Tagline</label>
            <Input
              value={content.hero.tagline}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, tagline: e.target.value } })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Title</label>
            <Textarea
              value={content.hero.title}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
              rows={2}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Subtitle</label>
            <Textarea
              value={content.hero.subtitle}
              onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Primary CTA</label>
              <Input
                value={content.hero.ctaPrimary}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaPrimary: e.target.value } })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Secondary CTA</label>
              <Input
                value={content.hero.ctaSecondary}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, ctaSecondary: e.target.value } })}
              />
            </div>
          </div>
        </div>
      )}

      {/* Repairs */}
      {activeSection === "repairs" && (
        <div className="rounded-2xl border border-border bg-white p-6 space-y-5">
          <h2 className="font-heading text-lg font-bold">Repairs Page</h2>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Tagline</label>
            <Input
              value={content.repairs.tagline}
              onChange={(e) => setContent({ ...content, repairs: { ...content.repairs, tagline: e.target.value } })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Title</label>
            <Textarea
              value={content.repairs.title}
              onChange={(e) => setContent({ ...content, repairs: { ...content.repairs, title: e.target.value } })}
              rows={2}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Subtitle</label>
            <Textarea
              value={content.repairs.subtitle}
              onChange={(e) => setContent({ ...content, repairs: { ...content.repairs, subtitle: e.target.value } })}
              rows={2}
            />
          </div>
        </div>
      )}

      {/* Contact */}
      {activeSection === "contact" && (
        <div className="rounded-2xl border border-border bg-white p-6 space-y-5">
          <h2 className="font-heading text-lg font-bold">Contact Page</h2>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Title</label>
            <Input
              value={content.contact.title}
              onChange={(e) => setContent({ ...content, contact: { ...content.contact, title: e.target.value } })}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Subtitle</label>
            <Textarea
              value={content.contact.subtitle}
              onChange={(e) => setContent({ ...content, contact: { ...content.contact, subtitle: e.target.value } })}
              rows={2}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Phone</label>
              <Input
                value={content.contact.phone}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground block mb-1">Email</label>
              <Input
                value={content.contact.email}
                onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Address</label>
            <Input
              value={content.contact.address}
              onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })}
            />
          </div>
        </div>
      )}
    </div>
  );
}
