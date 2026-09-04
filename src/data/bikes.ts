export type BikeType = "city" | "folding" | "cargo" | "mountain" | "hybrid" | "commuter";
export type BikeCondition = "Like New" | "Good" | "Fair";
export type BikeStatus = "draft" | "inspection" | "ready" | "live" | "reserved" | "sold";

export type RideIntent =
  | "commute"
  | "weekend"
  | "hills"
  | "cargo"
  | "small-space"
  | "getting-around";

export const rideIntentLabels: Record<RideIntent, string> = {
  commute: "Daily Commute",
  weekend: "Weekend Rides",
  hills: "Hills & Trails",
  cargo: "Carrying Stuff",
  "small-space": "Small-Space Living",
  "getting-around": "Just Getting Around",
};

export const rideIntentDescriptions: Record<RideIntent, string> = {
  commute: "Reliable, comfortable, and built for daily city riding.",
  weekend: "Fun to ride with good range for longer outings.",
  hills: "Powerful motor and sturdy frame for steep terrain.",
  cargo: "Extra capacity for groceries, gear, or passengers.",
  "small-space": "Compact, foldable, easy to store in tight spaces.",
  "getting-around": "Affordable and practical for short trips.",
};

export interface InspectionCheck {
  label: string;
  passed: boolean;
}

export interface Bike {
  id: string;
  brand: string;
  model: string;
  type: BikeType;
  condition: BikeCondition;
  status: BikeStatus;
  price: number;
  year: number;
  mileage: number;
  battery: string;
  batteryHealth: number; // percentage 0-100
  estimatedRange: string;
  motor: string;
  motorPower: string;
  frameSize: string;
  weight: string;
  topSpeed: string;
  description: string;
  specs: Record<string, string>;
  bestFor: RideIntent[];
  inventoryTag: string[]; // "just-arrived", "recently-serviced", "low-mileage", "popular", "almost-gone"
  inspectionDate: string;
  inspectionChecks: InspectionCheck[];
  serviceHistory: { date: string; note: string }[];
  warranty: string;
  monthlyEstimate?: number; // financing estimate
  thumbnail?: string;
}

// Helper functions
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatMileage(miles: number): string {
  return `${miles.toLocaleString()} mi`;
}

export function getBikeById(id: string): Bike | undefined {
  return bikes.find((b) => b.id === id);
}

export function getFeaturedBikes(): Bike[] {
  return bikes.filter((b) => b.status === "live").slice(0, 6);
}

export function getBikesByIntent(intent: RideIntent): Bike[] {
  return bikes.filter((b) => b.status === "live" && b.bestFor.includes(intent));
}

export function getBikesByType(type: BikeType): Bike[] {
  return bikes.filter((b) => b.status === "live" && b.type === type);
}

export function getLiveBikes(): Bike[] {
  return bikes.filter((b) => b.status === "live");
}

export const bikes: Bike[] = [
  {
    id: "rad-radcity-3-2022",
    brand: "Rad Power",
    model: "RadCity 3 Plus",
    type: "city",
    condition: "Like New",
    status: "live",
    price: 1299,
    year: 2022,
    mileage: 1200,
    battery: "48V 14Ah",
    batteryHealth: 95,
    estimatedRange: "40-60 mi",
    motor: "750W Geared Hub",
    motorPower: "750W",
    frameSize: "Medium (17\")",
    weight: "62 lbs",
    topSpeed: "20 mph",
    description: "Excellent condition RadCity 3 Plus. Perfect for daily commutes and errands. Recently serviced with new brake pads and chain. Includes fenders, rear rack, and integrated lights.",
    specs: {
      "Motor": "750W Geared Hub",
      "Battery": "48V 14Ah (672Wh)",
      "Range": "40-60 miles",
      "Top Speed": "20 mph",
      "Weight": "62 lbs",
      "Frame": "Aluminum, Medium (17\")",
      "Brakes": "Tektro mechanical disc",
      "Gears": "Shimano 7-speed",
      "Tires": "26\" x 2.3\"",
      "Lights": "Integrated front & rear",
      "Cargo": "Rear rack included",
    },
    bestFor: ["commute", "getting-around"],
    inventoryTag: ["recently-serviced"],
    inspectionDate: "2026-08-15",
    inspectionChecks: [
      { label: "Frame integrity", passed: true },
      { label: "Battery health test", passed: true },
      { label: "Motor function", passed: true },
      { label: "Brake inspection", passed: true },
      { label: "Tire condition", passed: true },
      { label: "Electrical systems", passed: true },
      { label: "Drivetrain", passed: true },
      { label: "Charging system", passed: true },
    ],
    serviceHistory: [
      { date: "2026-08-10", note: "Full tune-up, brake pads replaced, chain replaced" },
      { date: "2026-03-20", note: "Battery health check — 95% capacity" },
    ],
    warranty: "30-day service support included",
    monthlyEstimate: 108,
  },
  {
    id: "trek-verve-2-2023",
    brand: "Trek",
    model: "Verve+ 2",
    type: "hybrid",
    condition: "Like New",
    status: "live",
    price: 1599,
    year: 2023,
    mileage: 800,
    battery: "36V 11.6Ah",
    batteryHealth: 98,
    estimatedRange: "35-50 mi",
    motor: "Bosch Active Line Plus",
    motorPower: "250W",
    frameSize: "Large (20\")",
    weight: "47 lbs",
    topSpeed: "20 mph",
    description: "Nearly new Trek Verve+ 2 with Bosch powertrain. Smooth, quiet motor perfect for mixed terrain. Includes lights, rack, and fenders.",
    specs: {
      "Motor": "Bosch Active Line Plus",
      "Battery": "36V 11.6Ah (400Wh)",
      "Range": "35-50 miles",
      "Top Speed": "20 mph",
      "Weight": "47 lbs",
      "Frame": "Alpha Gold Aluminum, Large",
      "Brakes": "Tektro hydraulic disc",
      "Gears": "Shimano Alivio 9-speed",
      "Tires": "700c x 45mm",
      "Lights": "Integrated front & rear",
      "Display": "Bosch Purion",
    },
    bestFor: ["weekend", "commute"],
    inventoryTag: ["low-mileage", "popular"],
    inspectionDate: "2026-09-01",
    inspectionChecks: [
      { label: "Frame integrity", passed: true },
      { label: "Battery health test", passed: true },
      { label: "Motor function", passed: true },
      { label: "Brake inspection", passed: true },
      { label: "Tire condition", passed: true },
      { label: "Electrical systems", passed: true },
      { label: "Drivetrain", passed: true },
      { label: "Charging system", passed: true },
    ],
    serviceHistory: [
      { date: "2026-08-28", note: "Pre-sale inspection, full diagnostic" },
    ],
    warranty: "30-day service support included",
    monthlyEstimate: 133,
  },
  {
    id: "rad-expand-5-2023",
    brand: "Rad Power",
    model: "RadExpand 5",
    type: "folding",
    condition: "Good",
    status: "live",
    price: 1099,
    year: 2023,
    mileage: 1500,
    battery: "48V 14Ah",
    batteryHealth: 88,
    estimatedRange: "35-45 mi",
    motor: "750W Geared Hub",
    motorPower: "750W",
    frameSize: "One Size (Folds)",
    weight: "62.7 lbs",
    topSpeed: "20 mph",
    description: "Versatile folding e-bike. Great for commuters with limited storage. Folds in seconds. Some cosmetic wear on frame but mechanically excellent.",
    specs: {
      "Motor": "750W Geared Hub",
      "Battery": "48V 14Ah (672Wh)",
      "Range": "35-45 miles",
      "Top Speed": "20 mph",
      "Weight": "62.7 lbs",
      "Frame": "Aluminum, Folds to 28\"x38\"x45\"",
      "Brakes": "Tektro mechanical disc",
      "Gears": "Shimano 7-speed",
      "Tires": "20\" x 3.0\"",
      "Fold Time": "Under 10 seconds",
      "Lights": "Integrated front & rear",
    },
    bestFor: ["small-space", "commute"],
    inventoryTag: [],
    inspectionDate: "2026-08-20",
    inspectionChecks: [
      { label: "Frame integrity", passed: true },
      { label: "Battery health test", passed: true },
      { label: "Motor function", passed: true },
      { label: "Brake inspection", passed: true },
      { label: "Tire condition", passed: true },
      { label: "Electrical systems", passed: true },
      { label: "Folding mechanism", passed: true },
      { label: "Charging system", passed: true },
    ],
    serviceHistory: [
      { date: "2026-08-18", note: "Brake adjustment, tire pressure check" },
    ],
    warranty: "30-day service support included",
    monthlyEstimate: 92,
  },
  {
    id: "giant-revolt-e-2022",
    brand: "Giant",
    model: "Revolt E+ 2",
    type: "mountain",
    condition: "Good",
    status: "live",
    price: 2199,
    year: 2022,
    mileage: 2200,
    battery: "500Wh Integrated",
    batteryHealth: 85,
    estimatedRange: "30-50 mi",
    motor: "Giant SyncDrive Sport",
    motorPower: "250W",
    frameSize: "Large",
    weight: "42 lbs",
    topSpeed: "20 mph",
    description: "Capable gravel/adventure e-bike. Handles trails and road equally well. Good condition with normal trail wear. Excellent for mixed-terrain riding.",
    specs: {
      "Motor": "Giant SyncDrive Sport (250W)",
      "Battery": "EnergyPak 500Wh",
      "Range": "30-50 miles",
      "Top Speed": "20 mph",
      "Weight": "42 lbs",
      "Frame": "ALUXX SL Aluminum, Large",
      "Brakes": "Shimano hydraulic disc",
      "Gears": "Shimano Deore 10-speed",
      "Tires": "700c x 45mm gravel",
      "Suspension": "Front fork, 60mm travel",
      "Display": "Giant RideControl ONE",
    },
    bestFor: ["hills", "weekend"],
    inventoryTag: ["popular"],
    inspectionDate: "2026-08-25",
    inspectionChecks: [
      { label: "Frame integrity", passed: true },
      { label: "Battery health test", passed: true },
      { label: "Motor function", passed: true },
      { label: "Brake inspection", passed: true },
      { label: "Tire condition", passed: true },
      { label: "Suspension", passed: true },
      { label: "Electrical systems", passed: true },
      { label: "Drivetrain", passed: true },
    ],
    serviceHistory: [
      { date: "2026-08-20", note: "Chain replaced, drivetrain cleaned and lubricated" },
      { date: "2026-04-10", note: "Suspension fork serviced" },
    ],
    warranty: "30-day service support included",
    monthlyEstimate: 183,
  },
  {
    id: "rad-wagon-4-2023",
    brand: "Rad Power",
    model: "RadWagon 4",
    type: "cargo",
    condition: "Good",
    status: "live",
    price: 1799,
    year: 2023,
    mileage: 1800,
    battery: "48V 14Ah",
    batteryHealth: 90,
    estimatedRange: "30-45 mi",
    motor: "750W Geared Hub",
    motorPower: "750W",
    frameSize: "One Size",
    weight: "76.7 lbs",
    topSpeed: "20 mph",
    description: "Electric cargo bike ready for work. Hauls up to 120 lbs of cargo. Includes running boards and passenger seat. Perfect for families or deliveries.",
    specs: {
      "Motor": "750W Geared Hub",
      "Battery": "48V 14Ah (672Wh)",
      "Range": "30-45 miles",
      "Top Speed": "20 mph",
      "Weight": "76.7 lbs",
      "Frame": "Aluminum, Long Tail",
      "Brakes": "Tektro hydraulic disc",
      "Gears": "Shimano 7-speed",
      "Tires": "22\" x 3.0\"",
      "Cargo Capacity": "120 lbs rear rack",
      "Passenger": "Seat included",
    },
    bestFor: ["cargo", "commute"],
    inventoryTag: [],
    inspectionDate: "2026-08-22",
    inspectionChecks: [
      { label: "Frame integrity", passed: true },
      { label: "Battery health test", passed: true },
      { label: "Motor function", passed: true },
      { label: "Brake inspection", passed: true },
      { label: "Tire condition", passed: true },
      { label: "Electrical systems", passed: true },
      { label: "Cargo rack", passed: true },
      { label: "Charging system", passed: true },
    ],
    serviceHistory: [
      { date: "2026-08-15", note: "Hydraulic brake bleed, rotor inspection" },
    ],
    warranty: "30-day service support included",
    monthlyEstimate: 150,
  },
  {
    id: "specialized-turbo-vado-3-2022",
    brand: "Specialized",
    model: "Turbo Vado 3.0",
    type: "commuter",
    condition: "Like New",
    status: "live",
    price: 1999,
    year: 2022,
    mileage: 900,
    battery: "Specialized M2-500",
    batteryHealth: 96,
    estimatedRange: "40-60 mi",
    motor: "Specialized SL 2.0, 250W",
    motorPower: "250W",
    frameSize: "Medium",
    weight: "47 lbs",
    topSpeed: "28 mph",
    description: "Premium commuter e-bike in excellent condition. Smooth, quiet motor with excellent range. Includes lights, fenders, and rack. UL certified.",
    specs: {
      "Motor": "Specialized SL 2.0 (250W)",
      "Battery": "M2-500 (500Wh)",
      "Range": "40-60 miles",
      "Top Speed": "28 mph (Class 3)",
      "Weight": "47 lbs",
      "Frame": "E5 Aluminum, Medium",
      "Brakes": "Tektro hydraulic disc",
      "Gears": "Shimano Nexus 8-speed",
      "Tires": "700c x 38mm",
      "Display": "Specialized Turbo Connect",
      "Certification": "UL 2849 Certified",
    },
    bestFor: ["commute"],
    inventoryTag: ["low-mileage", "just-arrived"],
    inspectionDate: "2026-09-02",
    inspectionChecks: [
      { label: "Frame integrity", passed: true },
      { label: "Battery health test", passed: true },
      { label: "Motor function", passed: true },
      { label: "Brake inspection", passed: true },
      { label: "Tire condition", passed: true },
      { label: "Electrical systems", passed: true },
      { label: "Drivetrain", passed: true },
      { label: "UL certification", passed: true },
    ],
    serviceHistory: [
      { date: "2026-09-01", note: "Full pre-sale inspection, battery calibration" },
    ],
    warranty: "30-day service support included",
    monthlyEstimate: 167,
  },
];
