import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  id?: string;
  hasBackground?: boolean;
}

export function Section({ children, className, id, hasBackground = false, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // Sections are transparent — they inherit the global Layer 1 background from body.
        // Only add a faint surface tint when hasBackground is explicitly requested.
        "relative py-16 md:py-24 lg:py-32 overflow-hidden",
        hasBackground && "bg-white/[0.02] border-y border-white/[0.04]",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

