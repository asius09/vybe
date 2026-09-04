"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Shield,
  Wrench,
  Bike,
  Battery,
  Gauge,
  Calendar,
  Ruler,
  MapPin,
  Phone,
  Mail,
  Star,
  Heart,
  Search,
  Filter,
  ChevronRight,
  Check,
  X,
  AlertTriangle,
  Info,
  Package,
  Truck,
  RotateCcw,
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  Target,
  Megaphone,
  Layers,
  Palette,
  Type,
  MousePointerClick,
  Move,
  SunMedium,
  Eye,
  Accessibility,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  Settings,
  FileText,
  Hammer,
  CircleDot,
  Square,
  Minus,
  Plus,
  ArrowLeft,
} from "lucide-react";

/* ─── Color Swatch ─── */
function ColorSwatch({
  name,
  hex,
  use,
  contrast,
  className,
}: {
  name: string;
  hex: string;
  use: string;
  contrast?: string;
  className?: string;
}) {
  return (
    <div className="space-y-2">
      <div
        className={`h-24 w-full rounded-card border border-border ${className}`}
        style={{ backgroundColor: hex }}
      />
      <div>
        <p className="text-sm font-bold text-foreground">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{hex}</p>
        <p className="text-xs text-muted-foreground">{use}</p>
        {contrast && (
          <p className="mt-1 text-xs font-medium text-coral">{contrast}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Typography Sample ─── */
function TypographySample({
  label,
  className,
  sample,
}: {
  label: string;
  className: string;
  sample: string;
}) {
  return (
    <div className="space-y-2 border-b border-border pb-6">
      <p className={className}>{sample}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

/* ─── Icon Card ─── */
function IconCard({
  icon: Icon,
  name,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  name: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-card border-2 border-border bg-white p-4 transition-all duration-300 hover:border-lime/30 hover:shadow-vybe-sm">
      <Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
      <span className="text-xs text-muted-foreground">{name}</span>
    </div>
  );
}

/* ─── Shadow Swatch ─── */
function ShadowSwatch({
  name,
  utility,
  description,
  className,
}: {
  name: string;
  utility: string;
  description: string;
  className: string;
}) {
  return (
    <div className="space-y-3">
      <div
        className={`h-20 w-full rounded-card bg-white ${className}`}
      />
      <div>
        <p className="text-sm font-bold text-foreground">{name}</p>
        <p className="font-mono text-xs text-muted-foreground">{utility}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [sliderValue, setSliderValue] = useState([50]);

  return (
    <div className="min-h-screen bg-background">
      {/* ─── Navigation ─── */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Zap className="h-5 w-5" fill="#151515" strokeWidth={0} />
            </div>
            <span className="font-heading text-xl font-extrabold text-foreground">
              VYBE
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/design-system"
              className="text-sm font-semibold text-primary"
            >
              Design System
            </Link>
            <Link
              href="/bikes"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Bikes
            </Link>
            <Link
              href="/repairs"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Repairs
            </Link>
            <Link
              href="/contact"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </nav>
          <Button size="sm" asChild>
            <Link href="/contact">
              Enquire Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-16">
        {/* ─── Hero ─── */}
        <section className="mb-20 space-y-6">
          <Badge variant="outline" className="w-fit">
            VYBE Design System v1.0
          </Badge>
          <h1 className="font-heading text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            VYBE Design
            <span className="block text-lime-deeper">System</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            The visual language, components, and interaction rules behind the
            VYBE marketplace. Every decision is documented here.
          </p>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            BRAND
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-20 space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Brand
            </h2>
            <p className="mt-2 text-muted-foreground">
              The core identity elements that make VYBE recognisable.
            </p>
          </div>

          {/* Logo + Wordmark */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Logo</CardTitle>
                <CardDescription>
                  Wordmark + lightning/wheel symbol
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 rounded-card bg-asphalt p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                    <Zap className="h-8 w-8" fill="#151515" strokeWidth={0} />
                  </div>
                  <span className="font-heading text-4xl font-extrabold text-lime">
                    VYBE
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Wordmark</CardTitle>
                <CardDescription>
                  Standalone wordmark without symbol
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-card bg-muted/40 p-8">
                  <span className="font-heading text-5xl font-extrabold tracking-tight text-foreground">
                    VYBE
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Favicon + Tagline + Personality */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Favicon</CardTitle>
                <CardDescription>Compact mark for small sizes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 rounded-card bg-muted/40 p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
                    <Zap className="h-7 w-7" fill="#151515" strokeWidth={0} />
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Zap className="h-5 w-5" fill="#151515" strokeWidth={0} />
                  </div>
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary">
                    <Zap className="h-3.5 w-3.5" fill="#151515" strokeWidth={0} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tagline</CardTitle>
                <CardDescription>Primary and supporting lines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-card bg-muted/40 p-6 text-center">
                  <p className="font-heading text-2xl font-bold text-foreground">
                    Find your next ride.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Used bikes. Fresh rides.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Brand Personality</CardTitle>
                <CardDescription>The adjectives that define VYBE</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Urban",
                    "Energetic",
                    "Playful",
                    "Friendly",
                    "Slightly Rebellious",
                    "Trustworthy",
                  ].map((trait) => (
                    <Badge key={trait} variant="secondary">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Target Audience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-coral" />
                Target Audience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-heading text-sm font-bold text-foreground">
                    Primary
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Younger urban riders (22–35) looking for affordable,
                    sustainable transport. They value style, speed, and trust.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-heading text-sm font-bold text-foreground">
                    Secondary
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Commuters upgrading from cars. They want reliable e-bikes
                    without the new-bike price tag.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-heading text-sm font-bold text-foreground">
                    Mindset
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    They browse products the way they browse social media — fast,
                    visual, and mobile-first.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Brand Language */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5 text-purple" />
                Brand Language
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-heading text-sm font-bold text-foreground">
                    Voice
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Confident, not arrogant</li>
                    <li>• Friendly, not childish</li>
                    <li>• Short sentences, punchy copy</li>
                    <li>• Active voice, direct address (&quot;you&quot;)</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-heading text-sm font-bold text-foreground">
                    Tone Rules
                  </h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Headlines: bold, 2-5 words max</li>
                    <li>• Descriptions: 1-2 sentences, plain language</li>
                    <li>• CTAs: action verbs (Browse, Enquire, Book)</li>
                    <li>• Avoid jargon unless it&apos;s bike-specific</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-20" />

        {/* ═══════════════════════════════════════════════════════════
            COLORS
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-20 space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Colors
            </h2>
            <p className="mt-2 text-muted-foreground">
              The VYBE palette. Lime is the primary brand color. Coral and
              purple are used selectively.
            </p>
          </div>

          {/* Why These Colors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-lime-deeper" />
                Why These Colors
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 rounded-card bg-asphalt p-4">
                  <p className="font-heading text-sm font-bold text-lime">
                    Electric Lime #C8FF3D
                  </p>
                  <p className="text-xs text-warm-white/80">
                    Energy, freshness, sustainability. Lime feels electric and
                    modern — exactly how e-bikes should feel. It&apos;s the
                    strongest recognizable brand color.
                  </p>
                </div>
                <div className="space-y-2 rounded-card bg-coral p-4">
                  <p className="font-heading text-sm font-bold text-white">
                    Coral #FF6B4A
                  </p>
                  <p className="text-xs text-white/80">
                    Attention, urgency, warmth. Coral draws the eye for
                    important actions and creates energy without competing with
                    lime.
                  </p>
                </div>
                <div className="space-y-2 rounded-card bg-purple p-4">
                  <p className="font-heading text-sm font-bold text-white">
                    Soft Purple #8B7CFF
                  </p>
                  <p className="text-xs text-white/80">
                    Trust, quality, premium. Purple adds depth and signals
                    quality. Used sparingly for supporting moments.
                  </p>
                </div>
                <div className="space-y-2 rounded-card bg-asphalt p-4">
                  <p className="font-heading text-sm font-bold text-warm-white">
                    Asphalt #151515
                  </p>
                  <p className="text-xs text-warm-white/80">
                    Grounding, urban, confident. Asphalt is the foundation —
                    it&apos;s the street, the city, the rider&apos;s world.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <ColorSwatch
              name="Asphalt"
              hex="#151515"
              use="Primary text, navigation"
              className="bg-asphalt"
            />
            <ColorSwatch
              name="Warm White"
              hex="#F5F3EA"
              use="Main background"
              className="bg-warm-white"
            />
            <ColorSwatch
              name="Electric Lime"
              hex="#C8FF3D"
              use="Primary accent, CTAs"
              contrast="Use on dark bg only for text"
              className="bg-lime"
            />
            <ColorSwatch
              name="Coral"
              hex="#FF6B4A"
              use="Secondary accent, energy"
              className="bg-coral"
            />
            <ColorSwatch
              name="Soft Purple"
              hex="#8B7CFF"
              use="Supporting accent"
              className="bg-purple"
            />
            <ColorSwatch
              name="Neutral"
              hex="#D9D9D2"
              use="Borders, separators"
              className="bg-neutral-border"
            />
            <ColorSwatch
              name="Muted Text"
              hex="#6B6B65"
              use="Secondary information"
              className="bg-muted-text"
            />
            <ColorSwatch
              name="White"
              hex="#FFFFFF"
              use="Cards, surfaces"
              className="bg-white"
            />
          </div>

          {/* Contrast Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-coral" />
                Contrast Instructions
              </CardTitle>
              <CardDescription>
                Critical rules for using colors safely
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-card bg-emerald-50 p-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Lime on dark backgrounds
                    </p>
                    <p className="text-xs text-emerald-700">
                      #C8FF3D on #151515 → contrast ratio 12.5:1. Perfect for
                      CTAs and highlights.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-card bg-emerald-50 p-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <div>
                    <p className="text-sm font-bold text-emerald-800">
                      Dark text on lime background
                    </p>
                    <p className="text-xs text-emerald-700">
                      #151515 on #C8FF3D → contrast ratio 12.5:1. Use for
                      buttons and badges.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-card bg-red-50 p-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <div>
                    <p className="text-sm font-bold text-red-800">
                      Lime text on light backgrounds — NEVER
                    </p>
                    <p className="text-xs text-red-700">
                      #C8FF3D on #F5F3EA → contrast ratio 1.4:1. Fails
                      accessibility. Use dark text instead.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-card bg-red-50 p-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                  <div>
                    <p className="text-sm font-bold text-red-800">
                      Coral text on white — AVOID
                    </p>
                    <p className="text-xs text-red-700">
                      #FF6B4A on #FFFFFF → contrast ratio 3.1:1. Fails WCAG AA
                      for small text. Use for large text only.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-card bg-amber-50 p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                  <div>
                    <p className="text-sm font-bold text-amber-800">
                      Purple on white — large text only
                    </p>
                    <p className="text-xs text-amber-700">
                      #8B7CFF on #FFFFFF → contrast ratio 3.5:1. Passes for
                      large text (18px+ bold), fails for body.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Usage Table */}
          <Card>
            <CardHeader>
              <CardTitle>Color Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 font-heading font-bold">Color</th>
                      <th className="pb-3 font-heading font-bold">As background</th>
                      <th className="pb-3 font-heading font-bold">As text</th>
                      <th className="pb-3 font-heading font-bold">As border</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-3 font-semibold text-foreground">Lime</td>
                      <td className="py-3">Buttons, badges, highlights</td>
                      <td className="py-3">On dark bg only</td>
                      <td className="py-3">Focus rings only</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 font-semibold text-foreground">Coral</td>
                      <td className="py-3">Alerts, CTAs, sold badges</td>
                      <td className="py-3">Large text on dark only</td>
                      <td className="py-3">Error borders</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 font-semibold text-foreground">Purple</td>
                      <td className="py-3">Accent surfaces</td>
                      <td className="py-3">Large text on light</td>
                      <td className="py-3">Not used</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-3 font-semibold text-foreground">Asphalt</td>
                      <td className="py-3">Dark surfaces, nav</td>
                      <td className="py-3">Primary text everywhere</td>
                      <td className="py-3">Dark borders</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-foreground">Neutral</td>
                      <td className="py-3">Muted backgrounds</td>
                      <td className="py-3">Never</td>
                      <td className="py-3">Default borders</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-20" />

        {/* ═══════════════════════════════════════════════════════════
            TYPOGRAPHY
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-20 space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Typography
            </h2>
            <p className="mt-2 text-muted-foreground">
              Syne for headings — bold, geometric, urban energy. Inter for body
              text — clean, legible, proven.
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-8">
              <TypographySample
                label="Display — Syne 800, 72px / 1.05"
                className="font-heading text-7xl font-extrabold leading-[1.05] tracking-tight text-foreground"
                sample="FIND YOUR NEXT RIDE."
              />
              <TypographySample
                label="Heading 1 — Syne 700, 48px / 1.1"
                className="font-heading text-5xl font-bold tracking-tight text-foreground"
                sample="Browse Bikes"
              />
              <TypographySample
                label="Heading 2 — Syne 700, 36px / 1.2"
                className="font-heading text-4xl font-bold tracking-tight text-foreground"
                sample="Quality Used E-Bikes"
              />
              <TypographySample
                label="Heading 3 — Syne 600, 24px / 1.3"
                className="font-heading text-2xl font-semibold text-foreground"
                sample="Why Choose VYBE?"
              />
              <TypographySample
                label="Body — Inter 400, 16px / 1.6"
                className="font-body text-base leading-relaxed text-foreground"
                sample="Every bike we sell has been inspected, tested, and certified by our team. We stand behind every ride."
              />
              <TypographySample
                label="Small / Metadata — Inter 400, 14px"
                className="font-body text-sm text-muted-foreground"
                sample="2022 · 1,200 miles · Like New · 48V 14Ah"
              />
              <TypographySample
                label="Price — Syne 800, 28px"
                className="font-heading text-2xl font-extrabold text-foreground"
                sample="$1,299"
              />
              <TypographySample
                label="Label — Inter 600, 12px, uppercase"
                className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                sample="Condition · Battery · Motor"
              />
            </CardContent>
          </Card>
        </section>

        <Separator className="my-20" />

        {/* ═══════════════════════════════════════════════════════════
            ICONS
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-20 space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Icons
            </h2>
            <p className="mt-2 text-muted-foreground">
              Sharp, clean icons with consistent 1.5px stroke weight. Icons
              should feel as sharp as the Syne typeface — geometric, precise,
              no rounded softness.
            </p>
          </div>

          {/* Icon Principles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-lime-deeper" />
                Icon Design Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 rounded-card bg-muted/40 p-4">
                  <p className="font-heading text-sm font-bold text-foreground">
                    Sharp & Geometric
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Match Syne&apos;s character. Clean angles, no unnecessary
                    curves. Icons should feel precise and modern.
                  </p>
                </div>
                <div className="space-y-2 rounded-card bg-muted/40 p-4">
                  <p className="font-heading text-sm font-bold text-foreground">
                    Consistent Stroke
                  </p>
                  <p className="text-xs text-muted-foreground">
                    1.5px stroke weight across all icons. 24x24px default size.
                    Ensures visual harmony at any scale.
                  </p>
                </div>
                <div className="space-y-2 rounded-card bg-muted/40 p-4">
                  <p className="font-heading text-sm font-bold text-foreground">
                    Meaningful First
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Icons communicate before text. Use recognizable symbols.
                    Always pair with labels in navigation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Icon Collection — Bike Specific */}
          <Card>
            <CardHeader>
              <CardTitle>Icon Collection — Bike & Product</CardTitle>
              <CardDescription>
                Lucide icons at 1.5px stroke. Sharp, geometric, matches Syne.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
                <IconCard icon={Bike} name="Bike" />
                <IconCard icon={Battery} name="Battery" />
                <IconCard icon={Gauge} name="Gauge" />
                <IconCard icon={Wrench} name="Wrench" />
                <IconCard icon={Shield} name="Shield" />
                <IconCard icon={Zap} name="Zap" />
                <IconCard icon={Calendar} name="Calendar" />
                <IconCard icon={Ruler} name="Ruler" />
                <IconCard icon={Package} name="Package" />
                <IconCard icon={Truck} name="Truck" />
                <IconCard icon={RotateCcw} name="Return" />
                <IconCard icon={Clock} name="Clock" />
                <IconCard icon={Star} name="Star" />
                <IconCard icon={Heart} name="Heart" />
                <IconCard icon={Search} name="Search" />
                <IconCard icon={Filter} name="Filter" />
              </div>
            </CardContent>
          </Card>

          {/* Icon Collection — Navigation & UI */}
          <Card>
            <CardHeader>
              <CardTitle>Icon Collection — Navigation & UI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3 md:grid-cols-8">
                <IconCard icon={ArrowRight} name="Arrow" />
                <IconCard icon={ArrowUpRight} name="External" />
                <IconCard icon={ChevronRight} name="Chevron" />
                <IconCard icon={Check} name="Check" />
                <IconCard icon={X} name="Close" />
                <IconCard icon={AlertTriangle} name="Warning" />
                <IconCard icon={Info} name="Info" />
                <IconCard icon={Phone} name="Phone" />
                <IconCard icon={Mail} name="Mail" />
                <IconCard icon={MapPin} name="Location" />
                <IconCard icon={Users} name="Users" />
                <IconCard icon={TrendingUp} name="Trending" />
                <IconCard icon={Sparkles} name="Sparkles" />
                <IconCard icon={Settings} name="Settings" />
                <IconCard icon={FileText} name="Document" />
                <IconCard icon={Hammer} name="Tools" />
              </div>
            </CardContent>
          </Card>

          {/* Icon Sizes */}
          <Card>
            <CardHeader>
              <CardTitle>Icon Sizes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-8">
                <div className="flex flex-col items-center gap-2">
                  <Search className="h-4 w-4 text-foreground" strokeWidth={1.5} />
                  <span className="text-xs text-muted-foreground">16px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Search className="h-5 w-5 text-foreground" strokeWidth={1.5} />
                  <span className="text-xs text-muted-foreground">20px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Search className="h-6 w-6 text-foreground" strokeWidth={1.5} />
                  <span className="text-xs text-muted-foreground">24px (default)</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Search className="h-8 w-8 text-foreground" strokeWidth={1.5} />
                  <span className="text-xs text-muted-foreground">32px</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Search className="h-10 w-10 text-foreground" strokeWidth={1.5} />
                  <span className="text-xs text-muted-foreground">40px</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-20" />

        {/* ═══════════════════════════════════════════════════════════
            COMPONENTS
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-20 space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Components
            </h2>
            <p className="mt-2 text-muted-foreground">
              The building blocks of VYBE. All built on shadcn primitives.
            </p>
          </div>

          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                Pill-shaped (rounded-full). Lime for primary actions. Always
                use with icons for CTAs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Button>
                  <Zap className="h-4 w-4" />
                  Primary (Lime)
                </Button>
                <Button variant="secondary">
                  <ArrowRight className="h-4 w-4" />
                  Secondary (Coral)
                </Button>
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                  Outline
                </Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="dark">
                  <Zap className="h-4 w-4" />
                  Dark
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="xl">Extra Large</Button>
                <Button size="lg">Large</Button>
                <Button>Default</Button>
                <Button size="sm">Small</Button>
                <Button size="icon">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Badges */}
          <Card>
            <CardHeader>
              <CardTitle>Badges</CardTitle>
              <CardDescription>
                Condition badges, categories, and status indicators.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge variant="lime">Lime Badge</Badge>
                <Badge variant="coral">Coral Badge</Badge>
                <Badge variant="purple">Purple Badge</Badge>
                <Badge variant="dark">Dark Badge</Badge>
                <Badge variant="outline">Outline Badge</Badge>
                <Badge variant="destructive">Sold</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Cards</CardTitle>
              <CardDescription>
                20px border radius. Flat and clean. Shadows used lightly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {/* Bike Card with Image */}
                <div className="group overflow-hidden rounded-card border-2 border-border bg-white shadow-vybe-sm transition-all duration-300 group-hover:border-lime/50 group-hover:shadow-vybe-md">
                  <div className="relative h-48 overflow-hidden bg-muted/40">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lime/20 to-purple/10 transition-all duration-500 group-hover:from-lime/30 group-hover:to-purple/20">
                      <Bike className="h-20 w-20 text-foreground/20 transition-all duration-500 group-hover:scale-110 group-hover:text-foreground/30" strokeWidth={1} />
                    </div>
                    <div className="absolute right-3 top-3">
                      <Badge variant="lime">Like New</Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="font-heading text-lg font-bold text-foreground">
                      Rad Power RadCity
                    </p>
                    <p className="text-sm text-muted-foreground">
                      2022 · 1,200 miles · 48V 14Ah
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <p className="font-heading text-xl font-extrabold text-foreground">
                        $1,299
                      </p>
                      <Button size="sm" variant="ghost" className="group/btn">
                        View
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Service Card */}
                <div className="group overflow-hidden rounded-card border-2 border-border bg-white shadow-vybe-sm transition-all duration-300 group-hover:border-coral/40 group-hover:shadow-vybe-md">
                  <div className="relative h-48 overflow-hidden bg-muted/40">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-coral/10 to-purple/5 transition-all duration-500 group-hover:from-coral/20 group-hover:to-purple/10">
                      <Wrench className="h-20 w-20 text-foreground/20 transition-all duration-500 group-hover:scale-110 group-hover:text-foreground/30" strokeWidth={1} />
                    </div>
                    <div className="absolute right-3 top-3">
                      <Badge variant="purple">Popular</Badge>
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="font-heading text-lg font-bold text-foreground">
                      Full Service
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Complete bike overhaul and tune-up
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <p className="font-heading text-xl font-extrabold text-foreground">
                        From $89
                      </p>
                      <Button size="sm" variant="ghost" className="group/btn">
                        Book
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Trust Card */}
                <div className="group overflow-hidden rounded-card border-2 border-border bg-white shadow-vybe-sm transition-all duration-300 group-hover:border-lime/40 group-hover:shadow-vybe-md">
                  <div className="relative h-48 overflow-hidden bg-muted/40">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lime/10 to-coral/5 transition-all duration-500 group-hover:from-lime/20 group-hover:to-coral/10">
                      <Shield className="h-20 w-20 text-foreground/20 transition-all duration-500 group-hover:scale-110 group-hover:text-foreground/30" strokeWidth={1} />
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="font-heading text-lg font-bold text-foreground">
                      Safety Check
                    </p>
                    <p className="text-sm text-muted-foreground">
                      25-point inspection and certification
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <p className="font-heading text-xl font-extrabold text-foreground">
                        From $39
                      </p>
                      <Button size="sm" variant="ghost" className="group/btn">
                        Book
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Inputs & Forms */}
          <Card>
            <CardHeader>
              <CardTitle>Inputs & Forms</CardTitle>
              <CardDescription>
                Soft rounded corners (12px) with clear focus states.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ds-name">Name</Label>
                  <Input id="ds-name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ds-email">Email</Label>
                  <Input id="ds-email" type="email" placeholder="you@email.com" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ds-msg">Message</Label>
                <Textarea id="ds-msg" placeholder="Tell us what you're looking for..." />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rad">Rad Power</SelectItem>
                      <SelectItem value="trek">Trek</SelectItem>
                      <SelectItem value="specialized">Specialized</SelectItem>
                      <SelectItem value="giant">Giant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={5000}
                    step={100}
                  />
                  <p className="text-xs text-muted-foreground">
                    Up to ${sliderValue[0].toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Tabs</CardTitle>
              <CardDescription>
                Pill-shaped tab navigation for switching between views.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="specs">
                <TabsList>
                  <TabsTrigger value="specs">Specifications</TabsTrigger>
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                </TabsList>
                <TabsContent value="specs" className="space-y-2 pt-4">
                  <div className="flex justify-between border-b border-border py-2">
                    <span className="text-sm text-muted-foreground">Motor</span>
                    <span className="text-sm font-semibold">250W Hub Motor</span>
                  </div>
                  <div className="flex justify-between border-b border-border py-2">
                    <span className="text-sm text-muted-foreground">Battery</span>
                    <span className="text-sm font-semibold">48V 14Ah</span>
                  </div>
                  <div className="flex justify-between border-b border-border py-2">
                    <span className="text-sm text-muted-foreground">Range</span>
                    <span className="text-sm font-semibold">40-60 miles</span>
                  </div>
                </TabsContent>
                <TabsContent value="description" className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    This bike is in excellent condition. Perfect for daily
                    commutes and weekend rides. Recently serviced with new
                    brake pads and chain.
                  </p>
                </TabsContent>
                <TabsContent value="shipping" className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    Free local pickup. Shipping available for $99 flat rate
                    within the continental US.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Dialog */}
          <Card>
            <CardHeader>
              <CardTitle>Dialog / Modal</CardTitle>
              <CardDescription>
                Used for enquiry forms and important actions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Mail className="h-4 w-4" />
                    Open Enquiry Form
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Ask about this bike</DialogTitle>
                    <DialogDescription>
                      We&apos;ll get back to you within 24 hours.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="modal-name">Name</Label>
                      <Input id="modal-name" placeholder="Your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="modal-email">Email</Label>
                      <Input id="modal-email" placeholder="you@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="modal-msg">Message</Label>
                      <Textarea id="modal-msg" placeholder="I'm interested in this bike..." />
                    </div>
                    <Button className="w-full">
                      Send Enquiry
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* Skeleton */}
          <Card>
            <CardHeader>
              <CardTitle>Loading States</CardTitle>
              <CardDescription>
                Skeleton placeholders for content that is loading.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="space-y-3 rounded-card border border-border p-4"
                  >
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                    <div className="flex justify-between">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-20" />

        {/* ═══════════════════════════════════════════════════════════
            LAYOUT
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-20 space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Layout
            </h2>
            <p className="mt-2 text-muted-foreground">
              The spatial rules that keep every page consistent.
            </p>
          </div>

          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">Page Width</p>
                  <p className="text-sm text-muted-foreground">
                    Max 1152px (max-w-6xl), centred with auto margins
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">Grid</p>
                  <p className="text-sm text-muted-foreground">
                    12-column responsive. 4 cols mobile, 8 tablet, 12 desktop
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">Spacing</p>
                  <p className="text-sm text-muted-foreground">
                    4px base. Sections: 80px. Components: 24px. Internal: 16px
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">Breakpoints</p>
                  <p className="text-sm text-muted-foreground">
                    Mobile: 0-767px. Tablet: 768-1023px. Desktop: 1024px+
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">Image Ratios</p>
                  <p className="text-sm text-muted-foreground">
                    Bike cards: 4:3. Hero: 16:9. Gallery: 1:1 mobile
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-foreground">Padding</p>
                  <p className="text-sm text-muted-foreground">
                    20px mobile, 32px tablet, 40px desktop
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-20" />

        {/* ═══════════════════════════════════════════════════════════
            SHAPE
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-20 space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Shape
            </h2>
            <p className="mt-2 text-muted-foreground">
              Border radius values that define the visual language.
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid gap-8 md:grid-cols-4">
                <div className="text-center space-y-3">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[20px] border-2 border-border bg-muted/40">
                    <span className="text-xs text-muted-foreground">20px</span>
                  </div>
                  <p className="text-sm font-bold">Card Radius</p>
                  <p className="text-xs text-muted-foreground">
                    Softer, more approachable
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-border bg-muted/40">
                    <span className="text-xs text-muted-foreground">9999px</span>
                  </div>
                  <p className="text-sm font-bold">Button Radius</p>
                  <p className="text-xs text-muted-foreground">
                    Pill shape, playful and friendly
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-xl border-2 border-border bg-muted/40">
                    <span className="text-xs text-muted-foreground">12px</span>
                  </div>
                  <p className="text-sm font-bold">Input Radius</p>
                  <p className="text-xs text-muted-foreground">
                    Soft corners, clear focus states
                  </p>
                </div>
                <div className="text-center space-y-3">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-md border-2 border-border bg-muted/40">
                    <span className="text-xs text-muted-foreground">8px</span>
                  </div>
                  <p className="text-sm font-bold">Small Elements</p>
                  <p className="text-xs text-muted-foreground">
                    Badges, tags, small UI pieces
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-20" />

        {/* ═══════════════════════════════════════════════════════════
            SHADOWS
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-20 space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Shadows
            </h2>
            <p className="mt-2 text-muted-foreground">
              Subtle, warm-toned shadows that feel grounded and natural. Not
              flat — layered for depth without distraction.
            </p>
          </div>

          <Card>
            <CardContent className="p-8">
              <div className="grid gap-6 md:grid-cols-3">
                <ShadowSwatch
                  name="Shadow SM"
                  utility="shadow-vybe-sm"
                  description="Subtle lift. Cards at rest."
                  className="shadow-vybe-sm"
                />
                <ShadowSwatch
                  name="Shadow Default"
                  utility="shadow-vybe"
                  description="Standard elevation. Hovered cards."
                  className="shadow-vybe"
                />
                <ShadowSwatch
                  name="Shadow MD"
                  utility="shadow-vybe-md"
                  description="Medium depth. Active elements."
                  className="shadow-vybe-md"
                />
                <ShadowSwatch
                  name="Shadow LG"
                  utility="shadow-vybe-lg"
                  description="Deep lift. Modals, dropdowns."
                  className="shadow-vybe-lg"
                />
                <ShadowSwatch
                  name="Lime Glow"
                  utility="shadow-vybe-lime"
                  description="Brand glow. Primary CTAs."
                  className="shadow-vybe-lime"
                />
                <ShadowSwatch
                  name="Coral Glow"
                  utility="shadow-vybe-coral"
                  description="Warm glow. Secondary CTAs."
                  className="shadow-vybe-coral"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shadow System Rationale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-deeper" />
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Warm-toned, not pure black
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Shadows use rgba(21, 21, 21, ...) to match the asphalt
                      brand color. Feels natural on warm white.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-deeper" />
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Layered, not flat
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Two shadow layers (close + far) create realistic depth.
                      Single-layer shadows look artificial.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-lime-deeper" />
                  <div>
                    <p className="text-sm font-bold text-foreground">
                      Brand glow for CTAs
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Lime and coral glows make primary buttons feel alive and
                      draw attention without being loud.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-20" />

        {/* ═══════════════════════════════════════════════════════════
            MOTION
        ═══════════════════════════════════════════════════════════ */}
        <section className="mb-20 space-y-8">
          <div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Motion
            </h2>
            <p className="mt-2 text-muted-foreground">
              Motion makes the product feel alive, not distracting.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="group cursor-pointer transition-all hover:-translate-y-1 hover:shadow-vybe-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Move className="h-4 w-4 text-lime-deeper" />
                  Card Hover Lift
                </CardTitle>
                <CardDescription>
                  <span className="text-lime-deeper font-semibold">Decision →</span> Hover
                  signals interactivity and draws attention.
                  <br />
                  <span className="text-lime-deeper font-semibold">Tradeoff →</span> Slightly
                  less dense than a static grid.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative h-32 overflow-hidden bg-muted/40">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <Bike className="h-16 w-16 text-foreground/20" strokeWidth={1} />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointerClick className="h-4 w-4 text-lime-deeper" />
                  Image Zoom on Hover
                </CardTitle>
                <CardDescription>
                  <span className="text-lime-deeper font-semibold">Decision →</span> Subtle
                  zoom (1.05) makes images feel tactile.
                  <br />
                  <span className="text-lime-deeper font-semibold">Tradeoff →</span> Requires
                  overflow-hidden on parent.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointerClick className="h-4 w-4 text-lime-deeper" />
                  Button Press
                </CardTitle>
                <CardDescription>
                  <span className="text-lime-deeper font-semibold">Decision →</span>{" "}
                  scale(0.98) on press gives tactile feedback.
                  <br />
                  <span className="text-lime-deeper font-semibold">Tradeoff →</span> Very
                  subtle, most users feel it subconsciously.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="active:scale-95 transition-transform">
                  Press Me
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 text-lime-deeper" />
                  Page Transitions
                </CardTitle>
                <CardDescription>
                  <span className="text-lime-deeper font-semibold">Decision →</span> Fade
                  + slide up (12px) for page entry.
                  <br />
                  <span className="text-lime-deeper font-semibold">Tradeoff →</span> Adds
                  200ms to perceived load, but feels polished.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <Separator className="mb-12" />
        <footer className="pb-12 text-center">
          <p className="font-heading text-2xl font-bold text-foreground">
            VYBE Design System
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Every visual decision has a reason. This system scales consistently
            as features are added.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/bikes">
              <Button>
                Browse Bikes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}
