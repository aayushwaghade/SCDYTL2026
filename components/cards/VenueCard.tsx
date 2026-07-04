import React from "react";
import { GlassCard } from "./GlassCard";
import { MapPin, School, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/MotionPresets";

interface VenueCardProps {
  name: string;
  description: string;
  address: string;
  googleMapsUrl: string;
  delay?: number;
}

export function VenueCard({
  name,
  description,
  address,
  googleMapsUrl,
  delay = 0,
}: VenueCardProps) {
  return (
    <FadeUp delay={delay}>
      <GlassCard glowColor="orange" className="p-8 h-full">
        <div className="w-12 h-12 rounded-xl bg-aws-orange/10 flex items-center justify-center text-aws-orange mb-6">
          <School className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold mb-3 text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        <div className="space-y-4 mb-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-aws-orange shrink-0" />
            <span>{address}</span>
          </div>
        </div>

        <Button variant="default" className="w-full sm:w-auto" asChild>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Directions</span>
          </a>
        </Button>
      </GlassCard>
    </FadeUp>
  );
}
