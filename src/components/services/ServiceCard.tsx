import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Service } from "@/data/services";
import {
  Wrench,
  Shield,
  Battery,
  CircleDot,
  Settings,
  Check,
  ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Wrench,
  Shield,
  Battery,
  CircleDot,
  Settings,
  Check,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = iconMap[service.icon] || Wrench;

  return (
    <div className="group overflow-hidden rounded-card border-2 border-border bg-white shadow-vybe-sm transition-all duration-300 group-hover:border-coral/40 group-hover:shadow-vybe-md">
      <div className="p-5 space-y-4">
        {/* Icon + Category */}
        <div className="flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-coral/10 transition-all duration-300 group-hover:bg-coral/20">
            <Icon className="h-6 w-6 text-coral" strokeWidth={1.5} />
          </div>
          <Badge variant="coral">{service.category}</Badge>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-heading text-lg font-bold text-foreground">
            {service.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Price + Duration */}
        <div className="flex items-center justify-between border-t border-border pt-4">
          <div>
            <p className="font-heading text-xl font-extrabold text-foreground">
              From ${service.startingPrice}
            </p>
            <p className="text-xs text-muted-foreground">{service.duration}</p>
          </div>
          <Button size="sm" variant="outline" asChild>
            <a href="/contact">
              Book
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
