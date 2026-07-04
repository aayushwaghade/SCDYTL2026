"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconWrapper } from "@/components/ui/IconWrapper";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Users, Cpu, Laptop, Network, Compass, Gift } from "lucide-react";
import { cn } from "@/lib/utils";

const REASONS = [
  {
    title: "Learn from Industry Experts",
    description: "Interact with AWS Heroes, Solutions Architects, and tech leaders sharing real-world insights and best practices.",
    icon: Users,
    color: "purple" as const,
    glow: "rgba(139, 92, 246, 0.12)",
    borderGlow: "from-purple-primary/30 to-purple-500/5",
  },
  {
    title: "Cloud & AI Learning",
    description: "Deep dive into Cloud Computing, Generative AI, serverless architectures, and advanced engineering concepts.",
    icon: Cpu,
    color: "orange" as const,
    glow: "rgba(255, 153, 0, 0.12)",
    borderGlow: "from-aws-orange/30 to-aws-orange/5",
  },
  {
    title: "Hands-on Experience",
    description: "Build projects in real-time, work on interactive labs, and get direct experience with the AWS platform.",
    icon: Laptop,
    color: "pink" as const,
    glow: "rgba(236, 72, 153, 0.12)",
    borderGlow: "from-pink-primary/30 to-pink-500/5",
  },
  {
    title: "Networking Opportunities",
    description: "Connect with hundreds of like-minded students, professional developers, and regional tech communities.",
    icon: Network,
    color: "purple" as const,
    glow: "rgba(139, 92, 246, 0.12)",
    borderGlow: "from-purple-primary/30 to-indigo-500/5",
  },
  {
    title: "Career Guidance",
    description: "Gain career advice, resume insights, and learn about internship opportunities in the cloud ecosystem.",
    icon: Compass,
    color: "orange" as const,
    glow: "rgba(255, 153, 0, 0.12)",
    borderGlow: "from-aws-orange/30 to-pink-primary/10",
  },
  {
    title: "Certificates, Goodies & Prizes",
    description: "Earn an official participation certificate, win quiz prizes, and collect exclusive AWS schwag.",
    icon: Gift,
    color: "pink" as const,
    glow: "rgba(236, 72, 153, 0.12)",
    borderGlow: "from-pink-primary/30 to-purple-primary/10",
  },
];

interface WhyAttendCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "purple" | "orange" | "pink";
  glow: string;
  borderGlow: string;
  index: number;
}

function WhyAttendCard({ title, description, icon: Icon, color, glow, borderGlow, index }: WhyAttendCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: index * 0.08,
      },
    },
  } as const;

  // Removed iconBounceAnimation in favor of inline type-safe animation props

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={shouldReduceMotion ? {} : { y: -6 }}
      className={cn(
        "relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 to-white/5 transition-all duration-500 h-full",
        isHovered ? `bg-gradient-to-br ${borderGlow} shadow-[0_15px_30px_rgba(0,0,0,0.4)]` : ""
      )}
    >
      {/* Interactive spotlight on hover */}
      {isHovered && !shouldReduceMotion && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl z-0"
          style={{
            background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, ${glow}, transparent 80%)`,
          }}
        />
      )}

      {/* Glass card panel */}
      <div className="relative z-10 glass-card bg-card/60 rounded-[15px] p-6 h-full flex flex-col items-start border-none">
        
        {/* Glowing Large Icon */}
        <motion.div
          animate={{
            scale: !shouldReduceMotion && isHovered ? 1.05 : 1,
            rotate: !shouldReduceMotion && isHovered ? [0, -3, 3, 0] : 0,
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
          className="mb-5"
        >
          <IconWrapper variant={color} size="md" className={cn(
            "shadow-sm transition-all duration-300",
            isHovered ? (
              color === "purple" ? "shadow-[0_0_12px_rgba(139,92,246,0.2)]" : 
              color === "pink" ? "shadow-[0_0_12px_rgba(236,72,153,0.2)]" : 
              "shadow-[0_0_12px_rgba(255,153,0,0.2)]"
            ) : ""
          )}>
            <Icon />
          </IconWrapper>
        </motion.div>

        {/* Info Text */}
        <h3 className="text-lg font-bold mb-2.5 text-foreground tracking-wide">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>
      </div>
    </motion.div>
  );
}

export function WhyAttend() {
  return (
    <Section id="why-attend" className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Background Glows */}
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

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {REASONS.map((reason, index) => (
            <WhyAttendCard
              key={reason.title}
              title={reason.title}
              description={reason.description}
              icon={reason.icon}
              color={reason.color}
              glow={reason.glow}
              borderGlow={reason.borderGlow}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
