import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "default" | "aws" | "outline" | "secondary";
}

export function Badge({ children, variant = "default", className, ...props }: BadgeProps) {
  const variantStyles = {
    default: "border-purple-primary/30 bg-purple-primary/10 text-purple-300",
    aws: "border-aws-orange/30 bg-aws-orange/10 text-aws-orange",
    secondary: "border-pink-primary/30 bg-pink-primary/10 text-pink-300",
    outline: "border-border/50 bg-white/5 text-muted-foreground",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider select-none",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
