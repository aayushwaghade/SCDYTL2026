import React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { GlassCard } from "@/components/cards/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { Heart } from "lucide-react";

export function Volunteers() {
  return (
    <Section className="relative">
      <Container>
        <SectionHeading
          title="Our"
          gradientTitle="Volunteers"
          gradientVariant="purple-pink"
          subtitle="Special thanks to the passionate students who dedicated their time and effort to bring this community day to life."
        />

        <Reveal delay={0.2}>
          <GlassCard glowColor="pink" className="p-8 text-center max-w-4xl mx-auto">
            <div className="w-12 h-12 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-primary mx-auto mb-6">
              <Heart className="w-6 h-6 fill-current animate-pulse" />
            </div>
            <h3 className="text-xl font-bold mb-4">Want to Join Us?</h3>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6 leading-relaxed">
              We are looking for energetic student volunteers to help manage registrations, assist speakers, run operations, and document the event.
            </p>
            <div className="inline-flex flex-wrap justify-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-muted-foreground font-semibold">Registration Desk</span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-muted-foreground font-semibold">Technical Support</span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-muted-foreground font-semibold">Photography & Media</span>
              <span className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-muted-foreground font-semibold">Logistics Crew</span>
            </div>
          </GlassCard>
        </Reveal>
      </Container>
    </Section>
  );
}
