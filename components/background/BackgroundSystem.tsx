import React from "react";
import { NoiseOverlay } from "./NoiseOverlay";
import { GridBackground } from "./GridBackground";
import { AuroraBackground } from "./AuroraBackground";

interface BackgroundSystemProps {
  children?: React.ReactNode;
}

export function BackgroundSystem({ children }: BackgroundSystemProps) {
  return (
    <div className="relative min-h-screen w-full bg-near-black text-foreground overflow-hidden">
      {/* Background Aurora Orbs */}
      <AuroraBackground />

      {/* Grid Pattern */}
      <GridBackground type="grid" />

      {/* Noise Texture */}
      <NoiseOverlay />

      {/* Page Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
