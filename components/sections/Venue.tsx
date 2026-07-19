import React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/animations/Reveal";
import { MapPin } from "lucide-react";

export function Venue() {
  return (
    <Section id="venue" className="relative py-12 md:py-16 lg:py-20">
      {/* Background ambient glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[350px] aspect-square bg-aws-orange/5 blur-[100px] rounded-full pointer-events-none -z-10" 
      />

      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <Reveal delay={0.1}>
            <div className="flex flex-col items-center">
              {/* Clean MapPin icon sitting directly on the background */}
              <MapPin className="w-8 h-8 text-aws-orange mb-4 shrink-0" />

              {/* Main Announcement Content */}
              <h3 className="text-2xl md:text-3xl font-extrabold mb-3 tracking-tight text-white">
                Location Revealed Soon
              </h3>
              
              <p className="text-sm md:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed">
                We are finalizing a premier venue to host high-energy sessions, hands-on labs, and community networking. Check back soon for the official location details and travel instructions!
              </p>

              {/* Region Badge */}
              <div className="mt-6 text-xs text-aws-orange/70 font-semibold tracking-widest uppercase border-t border-white/5 pt-4 w-full max-w-[200px]">
                Yavatmal, Maharashtra, India
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}


