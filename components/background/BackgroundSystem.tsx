import React from "react";
import { NoiseOverlay } from "./NoiseOverlay";
import { AuroraBackground } from "./AuroraBackground";

interface BackgroundSystemProps {
  children?: React.ReactNode;
}

/**
 * BackgroundSystem — renders ambient aurora orbs + noise overlay on top of
 * the global Layer 1 background (grid + near-black, defined once in body CSS).
 * This wrapper is intentionally transparent so it never resets or overrides
 * the shared page background.
 */
export function BackgroundSystem({ children }: BackgroundSystemProps) {
  return (
    <div className="relative min-h-dvh w-full text-foreground overflow-hidden">
      {/* Ambient aurora orbs — sit above Layer 1, below content */}
      <AuroraBackground />

      {/* Subtle noise texture overlay */}
      <NoiseOverlay />

      {/* Page Content (Layer 2 surfaces + section content) */}
      <div className="relative z-10 w-full min-h-dvh flex flex-col">
        {children}
      </div>
    </div>
  );
}
