"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Bike,
  Upload,
  Calculator,
  Shield,
  ClipboardCheck,
} from "lucide-react";

const steps = ["About your bike", "Condition", "Photos", "Estimate"];

const bikeTypes = ["City", "Folding", "Cargo", "Mountain", "Hybrid", "Commuter"];
const conditions = ["Like New", "Good", "Fair", "Needs Work"];

export default function SellPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [type, setType] = useState("");
  const [condition, setCondition] = useState("");
  const [mileage, setMileage] = useState("");
  const [description, setDescription] = useState("");

  const estimatedRange = condition === "Like New"
    ? "₹80,000 - ₹1,20,000"
    : condition === "Good"
    ? "₹50,000 - ₹90,000"
    : condition === "Fair"
    ? "₹30,000 - ₹60,000"
    : "We'll assess it";

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="mx-auto max-w-2xl px-5 py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime mx-auto">
            <Check className="h-8 w-8 text-asphalt" />
          </div>
          <h1 className="mt-6 font-heading text-3xl font-bold text-foreground">
            We&apos;ve received your bike details!
          </h1>
          <p className="mt-4 text-muted-foreground">
            Our team will review your submission and get back to you within 48 hours with an estimate.
          </p>
          <Button className="mt-8" asChild>
            <a href="/">Back to Home</a>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-2xl px-5 py-16">
        {/* Header */}
        <div className="mb-10 space-y-4">
          <Badge variant="outline" className="w-fit">Sell Your Bike</Badge>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Sell to VYBE
          </h1>
          <p className="max-w-lg text-muted-foreground">
            Tell us about your bike. We&apos;ll give you a fair estimate and handle the rest.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  i <= step ? "bg-lime text-asphalt" : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`hidden h-0.5 w-12 sm:block ${i < step ? "bg-lime" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Step {step + 1} of {steps.length}: {steps[step]}</p>
        </div>

        {/* Step 1: About your bike */}
        {step === 0 && (
          <div className="rounded-card border border-border bg-white p-6 md:p-8 space-y-5">
            <h2 className="font-heading text-lg font-bold text-foreground">About your bike</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input placeholder="e.g. Rad Power, Trek, Giant" value={brand} onChange={(e) => setBrand(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Model</Label>
                <Input placeholder="e.g. RadCity 3" value={model} onChange={(e) => setModel(e.target.value)} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Year</Label>
                <Input type="number" placeholder="2023" value={year} onChange={(e) => setYear(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {bikeTypes.map((t) => (
                      <SelectItem key={t} value={t.toLowerCase()}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Mileage (approximate)</Label>
              <Input type="number" placeholder="1500" value={mileage} onChange={(e) => setMileage(e.target.value)} />
            </div>
            <Button className="w-full" onClick={() => setStep(1)}>
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Condition */}
        {step === 1 && (
          <div className="rounded-card border border-border bg-white p-6 md:p-8 space-y-5">
            <h2 className="font-heading text-lg font-bold text-foreground">Condition</h2>
            <div className="space-y-3">
              {conditions.map((c) => (
                <button
                  key={c}
                  onClick={() => setCondition(c)}
                  className={`w-full rounded-card border-2 p-4 text-left transition-all ${
                    condition === c
                      ? "border-lime bg-lime/10"
                      : "border-border hover:border-lime/40"
                  }`}
                >
                  <p className="font-heading text-sm font-bold">{c}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {c === "Like New" && "Minimal wear, looks and rides like new"}
                    {c === "Good" && "Normal use marks, mechanically excellent"}
                    {c === "Fair" && "Visible wear, fully functional"}
                    {c === "Needs Work" && "Has issues that need addressing"}
                  </p>
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <Label>Describe any issues or notes</Label>
              <Textarea placeholder="e.g. Small scratch on frame, needs new tires..." value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(0)}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(2)}>
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Photos */}
        {step === 2 && (
          <div className="rounded-card border border-border bg-white p-6 md:p-8 space-y-5">
            <h2 className="font-heading text-lg font-bold text-foreground">Photos</h2>
            <p className="text-sm text-muted-foreground">
              Upload clear photos of your bike. Include frame, tires, battery, and any damage.
            </p>
            <div className="rounded-card border-2 border-dashed border-border p-10 text-center">
              <Upload className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">Drag photos here or click to upload</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Optional — you can skip this step</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button className="flex-1" onClick={() => setStep(3)}>
                Get Estimate
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Estimate */}
        {step === 3 && (
          <div className="rounded-card border border-border bg-white p-6 md:p-8 space-y-5">
            <h2 className="font-heading text-lg font-bold text-foreground">Your Estimate</h2>

            <div className="rounded-card bg-lime/10 p-6 text-center">
              <Calculator className="h-8 w-8 mx-auto text-lime-deeper mb-2" />
              <p className="font-heading text-2xl font-extrabold text-foreground">{estimatedRange}</p>
              <p className="text-xs text-muted-foreground mt-1">Estimated value range</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-card bg-muted/30 p-3">
                <ClipboardCheck className="h-4 w-4 text-lime-deeper" />
                <p className="text-sm">VYBE will inspect your bike in person</p>
              </div>
              <div className="flex items-center gap-3 rounded-card bg-muted/30 p-3">
                <Shield className="h-4 w-4 text-lime-deeper" />
                <p className="text-sm">No obligation — get your estimate for free</p>
              </div>
            </div>

            <div className="rounded-card border border-border p-4 space-y-3">
              <p className="font-heading text-sm font-bold">Your submission</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Brand: </span>
                  <span className="font-semibold">{brand || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Model: </span>
                  <span className="font-semibold">{model || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Year: </span>
                  <span className="font-semibold">{year || "N/A"}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Condition: </span>
                  <span className="font-semibold">{condition || "N/A"}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <Button className="flex-1" onClick={() => setSubmitted(true)}>
                Submit
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
