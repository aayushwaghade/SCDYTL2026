"use client";

import React from "react";
import { GlassCard } from "./GlassCard";
import CountUp from "react-countup";
import { FadeUp } from "@/components/animations/MotionPresets";

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  glowColor?: "purple" | "orange" | "pink";
  delay?: number;
}

export function StatCard({ value, suffix = "", label, glowColor = "orange", delay = 0 }: StatCardProps) {
  return (
    <FadeUp delay={delay}>
      <GlassCard glowColor={glowColor} className="flex flex-col items-center justify-center p-8 text-center h-full">
        <div className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gradient-aws mb-2">
          <CountUp end={value} duration={2.5} enableScrollSpy scrollSpyOnce />
          <span>{suffix}</span>
        </div>
        <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
      </GlassCard>
    </FadeUp>
  );
}
