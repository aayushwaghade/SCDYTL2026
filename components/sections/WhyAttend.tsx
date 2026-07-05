"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Users, Cpu, Laptop, Network, Compass, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Condensed Data-driven Array ────────────────────────────────────────────────

interface WhyAttendItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const WHY_ATTEND_DATA: WhyAttendItem[] = [
  {
    id: "experts",
    title: "Learn from Industry Experts",
    description: "Learn directly from AWS Heroes, Solutions Architects, and regional developer community leaders.",
    icon: Users,
  },
  {
    id: "cloud-ai",
    title: "Cloud & AI Learning",
    description: "Deep dive into AWS cloud computing for students, including a Generative AI workshop and AWS re/Start details.",
    icon: Cpu,
  },
  {
    id: "hands-on",
    title: "Hands-on Experience",
    description: "Participate in our cloud computing workshop in India, building real projects with direct platform access.",
    icon: Laptop,
  },
  {
    id: "networking",
    title: "Networking Opportunities",
    description: "Connect with hundreds of peers in the tech community in Yavatmal and tech meetup Yavatmal organizers.",
    icon: Network,
  },
  {
    id: "career",
    title: "Career Guidance",
    description: "Get AWS certification guidance for students, internship pathways, and connect with technical event leaders.",
    icon: Compass,
  },
  {
    id: "swag",
    title: "Certificates, Goodies & Prizes",
    description: "Earn official participation certificates, win prizes, and enjoy exclusive AWS student developer conference schwag.",
    icon: Gift,
  },
];

// ─── Highlight Card Component ──────────────────────────────────────────────────

function WhyAttendCard({ item, index }: { item: WhyAttendItem; index: number }) {
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.05,
      }}
      className="flex flex-col items-start gap-3 p-6 rounded-xl w-full"
      style={{
        background: "#0d0d11",
      }}
    >
      {/* Accent color flat icon — no per-card color variation, no background container */}
      <Icon className="w-7 h-7 text-[#ff9900] shrink-0" />

      {/* Info text block — compact vertical spacing */}
      <div className="flex flex-col gap-1.5 mt-1.5">
        <h3 className="text-base sm:text-lg font-extrabold text-white tracking-wide uppercase leading-tight">
          {item.title}
        </h3>
        
        <p className="text-xs sm:text-sm text-[#9d9dae] leading-relaxed max-w-[95%] font-medium">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export function WhyAttend() {
  return (
    <Section id="why-attend" className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Decorative ambient background glows */}
      <div className="absolute top-[20%] left-[10%] w-[26rem] h-[26rem] rounded-full bg-aws-orange/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-purple-primary/5 blur-[140px] pointer-events-none z-0" />

      <Container className="relative z-10">
        <SectionHeading
          title="Why Attend"
          gradientTitle="AWS Student Community Day?"
          gradientVariant="purple-pink"
          subtitle="Unlock new opportunities, elevate your cloud knowledge, and fast-track your tech career."
          badge="Empower Your Journey"
          badgeVariant="aws"
        />

        {/* Tightened 3-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 mt-12 md:mt-16">
          {WHY_ATTEND_DATA.map((item, index) => (
            <WhyAttendCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
