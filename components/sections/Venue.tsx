import React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { VenueCard } from "@/components/cards/VenueCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { MapPin } from "lucide-react";

export function Venue() {
  return (
    <Section id="venue" className="relative">
      <Container>
        <SectionHeading
          title="Event"
          gradientTitle="Venue"
          gradientVariant="purple-pink"
          subtitle="Find your way to the biggest student cloud conference in the region."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <VenueCard
            name="JDIET Yavatmal"
            description="Jawaharlal Darda Institute of Engineering and Technology (JDIET) campus auditorium and seminar halls. Located in Yavatmal, Maharashtra, India."
            address="Arni Road, Yavatmal, Maharashtra 445001"
            googleMapsUrl="https://maps.google.com"
            delay={0.1}
          />

          <Reveal delay={0.2}>
            {/* Map Placeholder */}
            <div className="w-full h-[350px] rounded-2xl border border-white/5 bg-white/5 overflow-hidden flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(139,92,246,0.05),transparent)]" />
              <MapPin className="w-12 h-12 text-aws-orange mb-4 animate-bounce" />
              <p className="text-sm font-bold text-foreground">Interactive Map Placeholder</p>
              <p className="text-xs text-muted-foreground mt-1 px-6 text-center leading-relaxed">
                A customized Google Map iframe or dynamic map component will load here in the future.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
