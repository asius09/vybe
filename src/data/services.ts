export type ServiceCategory = "essential" | "maintenance" | "repair" | "diagnostic";

export interface Service {
  id: string;
  name: string;
  description: string;
  category: ServiceCategory;
  startingPrice: number;
  duration: string;
  icon: string;
  includedWithPurchase: boolean;
  popular: boolean;
  steps: string[];
}

export const services: Service[] = [
  {
    id: "safety-check",
    name: "32-Point Safety Check",
    description: "Comprehensive inspection covering frame, brakes, battery, motor, tires, and all electrical systems. Every VYBE bike passes this before sale.",
    category: "essential",
    startingPrice: 39,
    duration: "1-2 hours",
    icon: "Shield",
    includedWithPurchase: true,
    popular: true,
    steps: [
      "Frame and fork inspection",
      "Brake pad and rotor check",
      "Battery health diagnostic",
      "Motor function test",
      "Tire tread and pressure",
      "Chain and drivetrain wear",
      "Electrical connections",
      "Charging system test",
    ],
  },
  {
    id: "full-service",
    name: "Full Service Tune-Up",
    description: "Complete bike overhaul. We strip, clean, adjust, and replace worn parts. Your bike rides like new.",
    category: "maintenance",
    startingPrice: 89,
    duration: "1-2 days",
    icon: "Wrench",
    includedWithPurchase: false,
    popular: true,
    steps: [
      "Full drivetrain clean and lube",
      "Brake adjustment and bleed",
      "Wheel true and tension",
      "Headset and bottom bracket check",
      "Tire inspection and inflation",
      "Battery calibration",
      "Firmware update (if applicable)",
      "Test ride verification",
    ],
  },
  {
    id: "battery-health",
    name: "Battery Health Check",
    description: "Detailed battery diagnostic. We test capacity, cell balance, and charging performance. You get a full health report.",
    category: "diagnostic",
    startingPrice: 29,
    duration: "30-60 min",
    icon: "Battery",
    includedWithPurchase: true,
    popular: false,
    steps: [
      "Full charge and discharge cycle",
      "Cell voltage balance test",
      "Capacity vs. rated comparison",
      "Charging port inspection",
      "BMS diagnostic check",
      "Health report with recommendations",
    ],
  },
  {
    id: "brake-service",
    name: "Brake Service",
    description: "Pad replacement, rotor inspection, hydraulic bleed. Safe stopping is non-negotiable.",
    category: "repair",
    startingPrice: 49,
    duration: "2-4 hours",
    icon: "CircleDot",
    includedWithPurchase: false,
    popular: false,
    steps: [
      "Brake pad thickness measurement",
      "Pad replacement (if needed)",
      "Rotor inspection and resurface",
      "Hydraulic line bleed",
      "Cable tension adjustment",
      "Stopping distance test",
    ],
  },
  {
    id: "diagnostic",
    name: "Full Diagnostic",
    description: "Not sure what's wrong? We run a complete system diagnostic on motor, battery, controller, and wiring.",
    category: "diagnostic",
    startingPrice: 49,
    duration: "1-2 hours",
    icon: "Settings",
    includedWithPurchase: false,
    popular: false,
    steps: [
      "Motor error code read",
      "Battery voltage and current test",
      "Controller communication check",
      "Wiring harness inspection",
      "Display/head unit test",
      "Recommendation report",
    ],
  },
  {
    id: "pickup-delivery",
    name: "Pickup & Delivery",
    description: "Can't bring your bike in? We pick it up and deliver it back. Available within 15 km.",
    category: "essential",
    startingPrice: 19,
    duration: "Same day",
    icon: "Truck",
    includedWithPurchase: false,
    popular: false,
    steps: [
      "Schedule pickup window",
      "Careful collection and transport",
      "Service completed",
      "Quality check before return",
      "Delivered back to you",
    ],
  },
];
