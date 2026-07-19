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
    question: "What is the AWS Student Community Day Yavatmal 2026?",
    answer: "It is the first AWS Student Community Day in Yavatmal — a premier student-led, community-focused cloud conference where tech enthusiasts, student builders, and members of the developer community in Yavatmal gather to learn, collaborate, and share knowledge about Amazon Web Services (AWS) cloud technologies.",
  },
  {
    question: "Who is organizing this AWS Cloud Club JDIET Yavatmal event?",
    answer: "This landmark technical event in Yavatmal is proudly organized by the AWS Student Builder Group JDIET (AWS SBG JDIET) and the AWS Cloud Club Yavatmal. The organizing team is led by Pranav Shinde, the AWS Student Builder Group Leader and Captain of AWS Cloud Club JDIET, bringing together the JDIET Yavatmal developer community.",
  },
  {
    question: "Who can attend this student tech conference in Maharashtra?",
    answer: "Any student, developer, academic faculty member, or cloud enthusiast in the Vidarbha region and Maharashtra is welcome to join. It is designed to be the best tech event for students in Vidarbha, catering to all skill levels from beginner to advanced.",
  },
  {
    question: "How do I complete the AWS student event Yavatmal 2026 registration?",
    answer: "You can complete your registration directly on our website by visiting the Tickets section. We offer a Student Pass (which requires verification of your JDIET Yavatmal or other college ID) as well as Professional Passes for industry members.",
  },
  {
    question: "Will there be Generative AI workshops and AWS certification guidance?",
    answer: "Absolutely! The agenda features specialized sessions on AWS cloud computing for students, a Generative AI workshop for students, details on the AWS re/Start student event, and hands-on cloud computing workshops. Attendees will also receive direct AWS certification guidance for students to help boost their professional career paths.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section id="faq" className="relative py-12 md:py-16 lg:py-20">
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
