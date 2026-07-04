"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98] relative overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-aws-orange text-near-black hover:bg-aws-orange-light shadow-[0_0_20px_rgba(255,153,0,0.15)] hover:shadow-[0_0_25px_rgba(255,153,0,0.35)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-border/40 bg-transparent hover:bg-muted/50 hover:text-foreground",
        secondary:
          "bg-muted text-foreground hover:bg-muted/80 border border-white/5",
        ghost: "hover:bg-muted/50 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        premium:
          "bg-gradient-to-r from-purple-primary via-pink-primary to-indigo-primary text-white border-0 hover:opacity-95 shadow-[0_0_25px_rgba(139,92,246,0.25)] hover:shadow-[0_0_35px_rgba(236,72,153,0.4)]",
        glass:
          "glass-card hover:bg-white/10 hover:border-white/20 text-foreground",
      },
      size: {
        default: "h-10 px-5 py-2 rounded-xl",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        icon: "h-9 w-9 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface Ripple {
  key: number;
  x: number;
  y: number;
  size: number;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, disabled, children, onClick, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([]);
    const Comp = asChild ? Slot : "button";

    const handleTriggerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) return;

      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      
      const sizeValue = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - sizeValue / 2;
      const y = e.clientY - rect.top - sizeValue / 2;

      const newRipple: Ripple = {
        key: Date.now() + Math.random(),
        x,
        y,
        size: sizeValue,
      };

      setRipples((prev) => [...prev, newRipple]);

      if (onClick) {
        onClick(e);
      }
    };

    React.useEffect(() => {
      if (ripples.length > 0) {
        const timeout = setTimeout(() => {
          setRipples((prev) => prev.slice(1));
        }, 600);
        return () => clearTimeout(timeout);
      }
    }, [ripples]);

    if (asChild) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLButtonElement>}
          disabled={disabled || isLoading}
          onClick={handleTriggerClick}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        onClick={handleTriggerClick}
        ref={ref as React.Ref<HTMLButtonElement>}
        aria-busy={isLoading}
        aria-disabled={disabled || isLoading}
        {...props}
      >
        {/* Ripple Overlay */}
        <span className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 rounded-[inherit]">
          {ripples.map((ripple) => (
            <span
              key={ripple.key}
              className="absolute bg-white/20 rounded-full animate-ripple pointer-events-none"
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </span>

        {/* Loading Spinner */}
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current z-10 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {/* Button Content */}
        <span className={cn("relative z-10 flex items-center justify-center gap-2", isLoading && "opacity-80")}>
          {children}
        </span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
