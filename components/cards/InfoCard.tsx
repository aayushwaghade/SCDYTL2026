import React from "react";
import { GlassCard } from "./GlassCard";
import { IconWrapper } from "@/components/ui/IconWrapper";
import { LucideIcon } from "lucide-react";
import { FadeUp } from "@/components/animations/MotionPresets";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  glowColor?: "purple" | "orange" | "pink";
  delay?: number;
}

export function InfoCard({ icon: Icon, title, description, glowColor = "purple", delay = 0 }: InfoCardProps) {
  return (
    <FadeUp delay={delay}>
      <GlassCard glowColor={glowColor} className="flex flex-col h-full items-start p-6">
        <IconWrapper variant={glowColor} size="md" className="mb-6">
          <Icon />
        </IconWrapper>
        <h3 className="text-xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </GlassCard>
    </FadeUp>
  );
}
