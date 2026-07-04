"use client";

import React, { useState } from "react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { GlassCard } from "@/components/cards/GlassCard";
import { Reveal } from "@/components/animations/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    question: "What is AWS Student Community Day?",
    answer: "It is a student-led, community-focused cloud conference where technology enthusiasts gather to learn, collaborate, and share knowledge about Amazon Web Services (AWS) cloud technologies.",
  },
  {
    question: "Who can attend this event?",
    answer: "Any college student, academic faculty member, professional developer, or tech enthusiast interested in learning about cloud computing, artificial intelligence, and modern engineering is welcome to join.",
  },
  {
    question: "Is there a registration fee?",
    answer: "The Student Pass is entirely free of charge but requires a valid student email/ID verification and registration approval. Professional Passes are paid tickets.",
  },
  {
    question: "Will I get a certificate of attendance?",
    answer: "Yes, all registered attendees who participate in the conference tracks will receive an official digital Certificate of Attendance signed by the organizers.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="relative">
      <Container>
        <SectionHeading
          title="Frequently Asked"
          gradientTitle="Questions"
          gradientVariant="purple-pink"
          subtitle="Got questions? We've got answers. If you can't find what you are looking for, contact us."
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={faq.question} delay={0.05 * index}>
                <GlassCard
                  glowColor="purple"
                  hoverGlow={false}
                  className="p-0 border border-white/5 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left font-bold text-foreground hover:text-aws-orange transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="shrink-0 ml-4 p-1.5 rounded-lg bg-white/5 border border-white/5">
                      {isOpen ? <Minus className="w-4 h-4 text-aws-orange" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-muted-foreground p-6 pt-0 border-t border-white/5 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
