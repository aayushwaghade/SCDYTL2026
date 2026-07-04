import React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SponsorCard } from "@/components/cards/SponsorCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Cloud, Shield, Heart } from "lucide-react";

export function Sponsors() {
  return (
    <Section id="sponsors" className="relative">
      <Container>
        <SectionHeading
          title="Our"
          gradientTitle="Sponsors"
          gradientVariant="purple-pink"
          subtitle="Partner with us to support student tech innovations in Central India."
        />

        <div className="space-y-12 max-w-4xl mx-auto">
          {/* Gold Sponsors */}
          <div>
            <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              Gold Sponsors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center">
              <SponsorCard
                name="Gold Sponsor"
                logoIcon={<Cloud className="w-6 h-6 text-aws-orange" />}
                tier="gold"
                glowColor="orange"
                delay={0.1}
              />
              <SponsorCard
                name="Gold Partner"
                logoIcon={<Shield className="w-6 h-6 text-aws-orange" />}
                tier="gold"
                glowColor="orange"
                delay={0.2}
              />
            </div>
          </div>

          {/* Community Partners */}
          <div>
            <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              Community Partners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 justify-center">
              <SponsorCard
                name="Partner 1"
                logoIcon={<Heart className="w-4 h-4 text-purple-primary" />}
                tier="community"
                glowColor="purple"
                delay={0.1}
              />
              <SponsorCard
                name="Partner 2"
                logoIcon={<Heart className="w-4 h-4 text-purple-primary" />}
                tier="community"
                glowColor="purple"
                delay={0.2}
              />
              <SponsorCard
                name="Partner 3"
                logoIcon={<Heart className="w-4 h-4 text-purple-primary" />}
                tier="community"
                glowColor="purple"
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
