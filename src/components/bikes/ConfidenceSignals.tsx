import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ConfidenceSignalProps {
  label: string;
  passed?: boolean;
  className?: string;
}

export function ConfidenceSignal({ label, passed = true, className }: ConfidenceSignalProps) {
  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <div className={cn(
        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
        passed ? "bg-lime/20" : "bg-coral/20"
      )}>
        <Check className={cn("h-3 w-3", passed ? "text-lime-deeper" : "text-coral")} strokeWidth={2.5} />
      </div>
      <span className={passed ? "text-foreground" : "text-muted-foreground line-through"}>
        {label}
      </span>
    </div>
  );
}

export function ConfidenceSignals({ checks }: { checks: { label: string; passed: boolean }[] }) {
  const passedCount = checks.filter((c) => c.passed).length;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="font-heading text-sm font-bold text-foreground">
          {passedCount}/{checks.length} checks passed
        </span>
      </div>
      <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {checks.map((check) => (
          <ConfidenceSignal key={check.label} label={check.label} passed={check.passed} />
        ))}
      </div>
    </div>
  );
}

export function InventoryTag({ tag }: { tag: string }) {
  const tagStyles: Record<string, string> = {
    "just-arrived": "bg-lime/15 text-lime-deeper border-lime/30",
    "recently-serviced": "bg-purple/15 text-purple border-purple/30",
    "low-mileage": "bg-coral/15 text-coral border-coral/30",
    popular: "bg-amber-100 text-amber-800 border-amber-200",
    "almost-gone": "bg-red-100 text-red-800 border-red-200",
  };

  const tagLabels: Record<string, string> = {
    "just-arrived": "Just Arrived",
    "recently-serviced": "Recently Serviced",
    "low-mileage": "Low Mileage",
    popular: "Popular",
    "almost-gone": "Almost Gone",
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold",
      tagStyles[tag] || "bg-muted text-muted-foreground border-border"
    )}>
      {tagLabels[tag] || tag}
    </span>
  );
}
