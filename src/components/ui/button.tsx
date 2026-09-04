import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-asphalt shadow-vybe-lime hover:bg-lime-dark hover:shadow-vybe-md active:bg-lime-deeper",
        destructive:
          "bg-coral text-white shadow-vybe-coral hover:bg-coral-dark hover:shadow-vybe-md active:bg-coral-dark/90",
        outline:
          "border-2 border-neutral-border bg-transparent text-foreground hover:bg-muted hover:shadow-vybe-sm hover:border-lime/40 active:bg-muted/70",
        secondary:
          "bg-coral text-white shadow-vybe-coral hover:bg-coral-dark hover:shadow-vybe-md active:bg-coral-dark/90",
        ghost:
          "text-foreground hover:bg-muted hover:shadow-vybe-sm",
        link: "text-foreground underline-offset-4 hover:underline",
        lime:
          "bg-primary text-asphalt shadow-vybe-lime hover:bg-lime-dark hover:shadow-vybe-md active:bg-lime-deeper",
        dark:
          "bg-asphalt text-lime shadow-vybe hover:bg-asphalt/90 hover:shadow-vybe-md active:bg-asphalt/80",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        xl: "h-14 px-10 text-lg",
        icon: "h-11 w-11 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          // Icon slide micro-interaction
          "[&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-out",
          "group-hover:[&_svg]:translate-x-0.5"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
