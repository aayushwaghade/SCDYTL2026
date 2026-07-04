import React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { TicketCard } from "@/components/cards/TicketCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TICKET_TIERS = [
  {
    name: "Student Pass",
    price: "Free",
    description: "For active college students with a valid ID card.",
    features: [
      "Access to all Keynotes & Tracks",
      "Event Badge & Certificate",
      "Welcome Kit & AWS Goodies",
      "Lunch & Refreshments",
    ],
    ctaText: "Claim Free Ticket",
    variant: "default" as const,
    glow: "orange" as const,
  },
  {
    name: "Professional Pass",
    price: "Rs. 299",
    description: "For industry developers, freelancers, and academics.",
    features: [
      "Access to all Keynotes & Tracks",
      "Event Badge & Certificate",
      "Premium Swag & Welcome Kit",
      "Lunch & Networking Session",
      "Exclusive Q&A with Speakers",
    ],
    ctaText: "Buy Ticket",
    variant: "premium" as const,
    glow: "purple" as const,
  },
];

export function Tickets() {
  return (
    <Section id="tickets" className="relative bg-muted/10 border-y border-border/10">
      <Container>
        <SectionHeading
          title="Get Your"
          gradientTitle="Tickets"
          gradientVariant="purple-pink"
          subtitle="Choose your pass level. Please register early as seats are strictly limited."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {TICKET_TIERS.map((tier, index) => (
            <TicketCard
              key={tier.name}
              name={tier.name}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              ctaText={tier.ctaText}
              variant={tier.variant}
              glowColor={tier.glow}
              delay={0.1 * index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
