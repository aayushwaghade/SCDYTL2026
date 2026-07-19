"use client";

import React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechOrbit } from "@/components/sections/highlights";

// ─── Main Section ──────────────────────────────────────────────────────────────

export function WhyAttend() {
  return (
    <Section id="why-attend" className="relative overflow-hidden py-16 md:py-24 lg:py-28">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[20%] left-[10%] w-[26rem] h-[26rem] rounded-full bg-aws-orange/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-purple-primary/5 blur-[140px] pointer-events-none z-0" />

      <Container className="relative z-10">
        <SectionHeading
          title="Event"
          gradientTitle="Highlights"
          gradientVariant="purple-pink"
          subtitle="Explore the pillars of AWS Student Community Day — hover or tap to discover each experience."
          badge="Interactive Orbit"
          badgeVariant="aws"
        />

        {/* Interactive Tech Orbit replaces the old highlight cards */}
        <div className="mt-8 md:mt-12">
          <TechOrbit />
        </div>
      </Container>
    </Section>
  );
}
