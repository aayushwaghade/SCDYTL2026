import React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/animations/Reveal";
import { GlassCard } from "@/components/cards/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Clock, MapPin } from "lucide-react";

const SESSIONS = [
  {
    time: "09:00 AM - 10:00 AM",
    title: "Registrations & Welcome Kit Distribution",
    description: "Collect your passes, entry badges, and event schwag at the JDIET entrance desk.",
    location: "Main Lobby",
  },
  {
    time: "10:00 AM - 10:45 AM",
    title: "Keynote: Next-Gen Dev with AWS GenAI",
    description: "Opening keynote highlighting modern AI capabilities, Amazon Bedrock, and cloud-native developments.",
    location: "Auditorium",
  },
  {
    time: "10:45 AM - 11:30 AM",
    title: "Serverless Solutions at Scale",
    description: "Building production-ready architectures using AWS Lambda, API Gateway, and DynamoDB.",
    location: "Seminar Hall 1",
  },
];

export function Agenda() {
  return (
    <Section id="agenda" className="relative">
      <Container>
        <SectionHeading
          title="Event"
          gradientTitle="Agenda"
          gradientVariant="purple-pink"
          subtitle="Explore the timeline of keynotes, breakout sessions, hands-on labs, and networking tracks."
        />

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l border-border/40 pl-6 sm:pl-8 space-y-8">
            {SESSIONS.map((session, index) => (
              <Reveal key={session.title} delay={0.1 * index}>
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-7 w-4.5 h-4.5 rounded-full bg-aws-orange border-4 border-background" />

                <GlassCard glowColor="orange" className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-2 text-xs font-semibold text-aws-orange">
                      <Clock className="w-4 h-4" />
                      <span>{session.time}</span>
                    </span>
                    <span className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{session.location}</span>
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{session.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {session.description}
                  </p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
