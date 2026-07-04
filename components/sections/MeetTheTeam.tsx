import React from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { TeamCard } from "@/components/cards/TeamCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TEAM = [
  {
    name: "Organizer Lead 1",
    role: "Community Organizer / Lead",
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Organizer Lead 2",
    role: "Technical Program Director",
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
  {
    name: "Organizer Lead 3",
    role: "Sponsorship & Logistics Lead",
    twitter: "#",
    linkedin: "#",
    github: "#",
  },
];

export function MeetTheTeam() {
  return (
    <Section id="team" className="relative">
      <Container>
        <SectionHeading
          title="Organizing"
          gradientTitle="Team"
          gradientVariant="purple-pink"
          subtitle="Meet the core organizers of the AWS Club JDIET Yavatmal working behind the scenes."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM.map((member, index) => (
            <TeamCard
              key={member.name}
              name={member.name}
              role={member.role}
              twitter={member.twitter}
              linkedin={member.linkedin}
              github={member.github}
              delay={0.1 * index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
