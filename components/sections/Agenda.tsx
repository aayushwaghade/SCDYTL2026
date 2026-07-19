"use client";

import React, { useMemo } from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Reveal } from "@/components/animations/Reveal";
import { GlassCard } from "@/components/cards/GlassCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Clock, User2 } from "lucide-react";
import { SPEAKERS } from "@/data/speakers";
import { TimelineMobile } from "./TimelineMobile";

export type AgendaCategory =
  | 'registration'
  | 'keynote'
  | 'workshop'
  | 'break'
  | 'networking'
  | 'closing'
  | 'session';

export interface AgendaItem {
  id: string;
  startTime: string;
  endTime: string;
  title: string;
  description?: string;
  speakerId?: string;
  category: AgendaCategory;
  duration: string;
}

export const AGENDA_DATA: AgendaItem[] = [
  {
    id: 'agenda-1',
    startTime: '09:00 AM',
    endTime: '10:00 AM',
    title: 'Registrations & Welcome Kit Distribution',
    description: 'Check-in, collect your exclusive student kit, badge, and grab morning refreshments. Network with fellow peers.',
    category: 'registration',
    duration: '60 min',
  },
  {
    id: 'agenda-2',
    startTime: '10:00 AM',
    endTime: '10:45 AM',
    title: 'Next-Gen Dev with AWS GenAI',
    description: 'Welcome address and keynote exploring dynamic generative AI applications and developer ecosystems on AWS.',
    speakerId: 'spk-4',
    category: 'keynote',
    duration: '45 min',
  },
  {
    id: 'agenda-3',
    startTime: '10:45 AM',
    endTime: '11:30 AM',
    title: 'Serverless Solutions at Scale',
    description: 'Deep dive into serverless architecture, microservices, and asynchronous event-driven design pipelines.',
    category: 'session',
    duration: '45 min',
  },
  {
    id: 'agenda-4',
    startTime: '11:30 AM',
    endTime: '12:15 PM',
    title: 'Agentic AI & Super Agents: Next-Gen AI Infrastructure',
    description: 'Discover NVIDIA solutions architecture and the transition from static LLMs to autonomous, collaborative agents.',
    speakerId: 'spk-1',
    category: 'session',
    duration: '45 min',
  },
  {
    id: 'agenda-5',
    startTime: '12:15 PM',
    endTime: '01:00 PM',
    title: 'Navigating an AI-Driven World: Thinking Beyond Coding',
    description: 'Special panel discussion focusing on developer workflows, system engineering, and student community builders.',
    speakerId: 'spk-2',
    category: 'session',
    duration: '45 min',
  },
  {
    id: 'agenda-6',
    startTime: '01:00 PM',
    endTime: '01:45 PM',
    title: 'Lunch & Networking Hour',
    description: 'Buffet lunch for all attendees. Connect with industry experts, AWS community leaders, and peers at developer booths.',
    category: 'break',
    duration: '45 min',
  },
  {
    id: 'agenda-7',
    startTime: '01:45 PM',
    endTime: '03:15 PM',
    title: 'Hands-on Lab: GenAI on AWS Cloud Club',
    description: 'Step-by-step technical workshop building and deploying actual GenAI agents on AWS platforms.',
    speakerId: 'spk-3',
    category: 'workshop',
    duration: '90 min',
  },
  {
    id: 'agenda-8',
    startTime: '03:15 PM',
    endTime: '04:00 PM',
    title: 'Closing Ceremony & Swag Giveaways',
    description: 'Summary awards, community photo, certificate distribution, and closing remarks.',
    category: 'closing',
    duration: '30 min',
  },
];

export function Agenda() {
  // Resolve speaker details for each item
  const items = useMemo(() => {
    return AGENDA_DATA.map((item) => {
      const speaker = item.speakerId
        ? SPEAKERS.find((s) => s.id === item.speakerId)
        : undefined;
      return {
        ...item,
        speaker,
      };
    });
  }, []);

  return (
    <Section id="agenda" className="relative py-14 md:py-20 lg:py-24">
      <Container>
        <SectionHeading
          title="Event"
          gradientTitle="Agenda"
          gradientVariant="purple-pink"
          subtitle="Explore the timeline of keynotes, breakout sessions, hands-on labs, and networking tracks."
        />

        {/* ── Desktop Layout: Original Vertical Timeline (>= 1024px) ── */}
        <div className="hidden lg:block max-w-4xl mx-auto">
          <div className="relative border-l border-white/15 pl-8 space-y-8">
            {items.map((session, index) => (
              <Reveal key={session.id} delay={0.08 * index}>
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-7 w-4.5 h-4.5 rounded-full bg-aws-orange border-4 border-background z-10" />

                <GlassCard glowColor="orange" className="p-6">
                  {/* Time and Duration metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <span className="flex items-center gap-2 text-xs font-semibold text-aws-orange">
                      <Clock className="w-4 h-4" />
                      <span>{session.startTime} - {session.endTime}</span>
                    </span>
                    {session.duration && (
                      <span className="text-xs text-muted-foreground font-mono">
                        {session.duration}
                      </span>
                    )}
                  </div>

                  {/* Title and Description */}
                  <h3 className="text-lg font-bold mb-2 text-white">{session.title}</h3>
                  {session.description && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {session.description}
                    </p>
                  )}

                  {/* Speaker block (if speaker is present) */}
                  {session.speaker && (
                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-3">
                      {session.speaker.image ? (
                        <div className="relative h-8 w-8 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={session.speaker.image}
                            alt={session.speaker.name}
                            className="w-full h-full object-cover contrast-[1.05] saturate-[0.9] brightness-[0.98]"
                            draggable={false}
                          />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground flex-shrink-0">
                          <User2 className="h-4 w-4" />
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-bold text-white leading-none">
                          {session.speaker.name}
                        </div>
                        <div className="text-[10px] text-muted-foreground mt-1.5 leading-none">
                          {session.speaker.designation || session.speaker.role} at {session.speaker.company}
                        </div>
                      </div>
                    </div>
                  )}
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ── Mobile/Tablet Layout: Horizontal Curved Roadmap (< 1024px) ── */}
        <div className="block lg:hidden">
          <TimelineMobile items={items} />
        </div>
      </Container>
    </Section>
  );
}

export default Agenda;
