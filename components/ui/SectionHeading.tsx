import React from "react";
import { cn } from "@/lib/utils";
import { GradientText } from "./GradientText";

interface SectionHeadingProps {
  title: string;
  gradientTitle?: string;
  gradientVariant?: "aws" | "purple-pink" | "indigo-purple";
  subtitle?: string;
  badge?: string;
  badgeVariant?: "default" | "aws" | "outline" | "secondary";
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  title,
  gradientTitle,
  gradientVariant = "purple-pink",
  subtitle,
  badge,
  badgeVariant = "default",
  align = "center",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col mb-8 sm:mb-12 md:mb-16 lg:mb-20 max-w-3xl w-full",
        isCentered ? "mx-auto text-center items-center" : "text-left items-start",
        className
      )}
    >
      {badge && (
        <span
          className={cn(
            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-3.5 select-none",
            {
              default: "border-purple-primary/30 bg-purple-primary/10 text-purple-300",
              aws: "border-aws-orange/30 bg-aws-orange/10 text-aws-orange",
              secondary: "border-pink-primary/30 bg-pink-primary/10 text-pink-300",
              outline: "border-border/50 bg-white/5 text-muted-foreground",
            }[badgeVariant]
          )}
        >
          {badge}
        </span>
      )}

      <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 leading-tight text-white">
        {title}{" "}
        {gradientTitle && (
          <GradientText variant={gradientVariant}>{gradientTitle}</GradientText>
        )}
      </h2>

      {subtitle && (
        <p className="text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
