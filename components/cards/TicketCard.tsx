import React from "react";
import { GlassCard } from "./GlassCard";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FadeUp } from "@/components/animations/MotionPresets";

interface TicketCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  ctaText: string;
  variant?: "default" | "premium";
  glowColor?: "purple" | "orange";
  delay?: number;
}

export function TicketCard({
  name,
  price,
  description,
  features,
  ctaText,
  variant = "default",
  glowColor = "orange",
  delay = 0,
}: TicketCardProps) {
  const isPremium = variant === "premium";

  return (
    <FadeUp delay={delay}>
      <GlassCard glowColor={glowColor} className="flex flex-col h-full p-8 border border-white/5 relative">
        {isPremium && (
          <span className="absolute -top-3 right-8 px-3 py-1 bg-gradient-to-r from-purple-primary to-pink-primary text-white text-xs font-bold rounded-full uppercase tracking-wider select-none shadow-md">
            Recommended
          </span>
        )}
        
        <h3 className="text-2xl font-bold mb-2 text-foreground">{name}</h3>
        <div className="flex items-baseline gap-1.5 mb-4">
          <span className="text-4xl font-extrabold text-foreground">{price}</span>
        </div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
              <Check className="w-5 h-5 text-aws-orange shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button variant={isPremium ? "premium" : "default"} className="w-full">
          {ctaText}
        </Button>
      </GlassCard>
    </FadeUp>
  );
}
