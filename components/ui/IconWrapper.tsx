import React from "react";
import { cn } from "@/lib/utils";

interface IconWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  animate?: "none" | "pulse" | "spin" | "bounce";
  variant?: "default" | "orange" | "purple" | "pink" | "glass";
}

export function IconWrapper({
  children,
  size = "md",
  animate = "none",
  variant = "default",
  className,
  ...props
}: IconWrapperProps) {
  const sizeStyles = {
    sm: "w-8 h-8 rounded-lg text-sm [&_svg]:size-4",
    md: "w-11 h-11 rounded-xl text-base [&_svg]:size-5",
    lg: "w-14 h-14 rounded-2xl text-lg [&_svg]:size-6.5",
  }[size];

  const variantStyles = {
    default: "bg-white/5 border border-white/5 text-foreground",
    glass: "glass-card text-foreground",
    orange: "bg-aws-orange/10 border border-aws-orange/15 text-aws-orange",
    purple: "bg-purple-primary/10 border border-purple-primary/15 text-purple-primary",
    pink: "bg-pink-primary/10 border border-pink-primary/15 text-pink-primary",
  }[variant];

  const animationStyles = {
    none: "",
    pulse: "animate-pulse",
    spin: "hover:rotate-12 transition-transform duration-300",
    bounce: "hover:-translate-y-1 transition-transform duration-300",
  }[animate];

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 transition-all select-none duration-300",
        sizeStyles,
        variantStyles,
        animationStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
