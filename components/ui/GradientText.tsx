import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "aws" | "purple-pink" | "indigo-purple";
}

export function GradientText({ children, variant = "purple-pink", className, ...props }: GradientTextProps) {
  const gradientClass = {
    aws: "text-gradient-aws",
    "purple-pink": "text-gradient-purple-pink",
    "indigo-purple": "text-gradient-indigo-purple",
  }[variant];

  return (
    <span className={cn("font-bold inline-block", gradientClass, className)} {...props}>
      {children}
    </span>
  );
}
