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
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Check,
  Navigation,
  MessageSquare,
  Wrench,
  Bike,
  HelpCircle,
} from "lucide-react";

const intents = [
  { id: "bike", label: "I'm interested in a bike", icon: Bike, description: "Tell us which bike and we'll get back to you" },
  { id: "test-ride", label: "I want a test ride", icon: MapPin, description: "Book a time to test ride any bike in our inventory" },
  { id: "repair", label: "I need a repair", icon: Wrench, description: "Book a service or get a repair quote" },
  { id: "sell", label: "I want to sell my bike", icon: ArrowRight, description: "Get an estimate for your used e-bike" },
  { id: "question", label: "I have a question", icon: HelpCircle, description: "General enquiries about VYBE" },
] as const;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      return;
    }
    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`);
        setLocationLoading(false);
      },
      () => {
        setLocation("Location access denied");
        setLocationLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-6xl px-5 py-16">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <Badge variant="outline" className="w-fit">Contact</Badge>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            What do you need?
          </h1>
          <p className="max-w-lg text-muted-foreground">
            Select what brings you here and we&apos;ll guide you through it.
          </p>
        </div>

        {/* Intent Selection */}
        {!selectedIntent && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {intents.map((intent) => {
              const Icon = intent.icon;
              return (
                <button
                  key={intent.id}
                  onClick={() => setSelectedIntent(intent.id)}
                  className="group flex flex-col items-start gap-3 rounded-card border-2 border-border bg-white p-6 text-left transition-all duration-200 hover:border-lime/40 hover:shadow-vybe-md"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime/15 transition-colors group-hover:bg-lime/25">
                    <Icon className="h-5 w-5 text-lime-deeper" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">{intent.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{intent.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Form */}
        {selectedIntent && (
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <div className="rounded-card border border-border bg-white p-6 md:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  {intents.find((i) => i.id === selectedIntent)?.label}
                </h2>
                <button
                  onClick={() => setSelectedIntent(null)}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Change
                </button>
              </div>

              {submitted ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime">
                    <Check className="h-8 w-8 text-asphalt" />
                  </div>
                  <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                    Message sent!
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button className="mt-6" variant="outline" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@email.com" required />
                    </div>
                  </div>

                  {selectedIntent === "bike" && (
                    <div className="space-y-2">
                      <Label htmlFor="bike-link">Which bike are you interested in?</Label>
                      <Input id="bike-link" placeholder="Paste the bike URL or describe the bike" />
                    </div>
                  )}

                  {selectedIntent === "test-ride" && (
                    <div className="space-y-2">
                      <Label htmlFor="date">Preferred date</Label>
                      <Input id="date" type="date" />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us more..." rows={4} required />
                  </div>

                  {/* Location */}
                  <div className="rounded-card border border-border bg-muted/30 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Navigation className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-semibold">Share your location</p>
                          <p className="text-xs text-muted-foreground">Helps us find bikes near you</p>
                        </div>
                      </div>
                      {location ? (
                        <Badge variant="lime">{location}</Badge>
                      ) : (
                        <Button type="button" size="sm" variant="outline" onClick={requestLocation} disabled={locationLoading}>
                          {locationLoading ? "Getting..." : "Allow"}
                        </Button>
                      )}
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-card border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">Contact Details</h3>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">India</p>
                      <p className="text-xs text-muted-foreground">Local pickup available</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">+91 93154 05304</p>
                      <p className="text-xs text-muted-foreground">Mon-Sat, 9am-6pm IST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold">itsmeasius@gmail.com</p>
                      <p className="text-xs text-muted-foreground">We reply within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-card border border-border bg-white p-6">
                <h3 className="font-heading text-lg font-bold text-foreground">Opening Hours</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Mon - Fri</span>
                    <span className="font-semibold">9am - 6pm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-semibold">10am - 4pm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-semibold text-muted-foreground">Closed</span>
                  </div>
                </div>
              </div>

              <div className="rounded-card bg-asphalt p-6 text-center">
                <p className="font-heading text-sm font-bold text-lime">Emergency repairs?</p>
                <p className="mt-1 text-xs text-warm-white/60">Call us directly.</p>
                <Button size="sm" className="mt-3 bg-lime text-asphalt hover:bg-lime-dark" asChild>
                  <a href="tel:+919315405304">
                    <Phone className="h-3.5 w-3.5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
