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
        "relative py-16 md:py-24 lg:py-32 overflow-hidden",
        hasBackground && "bg-muted/30 border-y border-border/20",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
