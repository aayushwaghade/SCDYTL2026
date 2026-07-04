import React from "react";
import { GlassCard } from "./GlassCard";
import { FadeUp } from "@/components/animations/MotionPresets";
import { cn } from "@/lib/utils";

interface SponsorCardProps {
  name: string;
  logoIcon: React.ReactNode;
  tier: "gold" | "silver" | "community";
  glowColor?: "orange" | "purple" | "pink";
  delay?: number;
}

export function SponsorCard({
  name,
  logoIcon,
  tier,
  glowColor = "purple",
  delay = 0,
}: SponsorCardProps) {
  const heightStyles = {
    gold: "h-28",
    silver: "h-24",
    community: "h-20",
  }[tier];

  return (
    <FadeUp delay={delay}>
      <GlassCard
        glowColor={glowColor}
        className={cn("flex items-center justify-center border border-white/5", heightStyles)}
      >
        <span className="text-sm text-muted-foreground font-bold flex items-center justify-center gap-2 select-none w-full h-full">
          {logoIcon}
          <span>{name}</span>
        </span>
      </GlassCard>
    </FadeUp>
  );
}
