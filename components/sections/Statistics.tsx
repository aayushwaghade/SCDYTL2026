"use client";

import React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { StatCard } from "@/components/cards/StatCard";

const STATS = [
  { value: 600, suffix: "+", label: "Expected Students", glow: "orange" as const },
  { value: 12, suffix: "+", label: "Industry Speakers", glow: "purple" as const },
  { value: 10, suffix: "+", label: "Technical Sessions", glow: "pink" as const },
  { value: 5, suffix: "+", label: "Interactive Activities", glow: "orange" as const },
  { value: 8, suffix: "+", label: "Community Partners", glow: "purple" as const },
  { value: 1, suffix: "", label: "Historic Event for Yavatmal", glow: "pink" as const },
];

export function Statistics() {
  return (
    <Section className="relative border-y border-white/[0.04] py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[15rem] rounded-full bg-purple-primary/5 blur-[120px] pointer-events-none z-0" />
      
      <Container className="relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {STATS.map((stat, index) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              glowColor={stat.glow}
              delay={0.08 * index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
