"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconWrapper } from "@/components/ui/IconWrapper";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Mic, Laptop, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const HIGHLIGHTS = [
  {
    title: "Expert Talks",
    description: "Learn directly from industry professionals, cloud experts, AWS community leaders, and experienced speakers as they share real-world knowledge, best practices, and career insights.",
    icon: Mic,
    color: "purple" as const,
    glow: "rgba(139, 92, 246, 0.15)",
    borderGlow: "from-purple-primary/40 to-purple-500/10",
  },
  {
    title: "Hands-on Workshops",
    description: "Participate in interactive hands-on sessions designed to help students explore AWS services, cloud technologies, AI, and practical application development through guided learning.",
    icon: Laptop,
    color: "orange" as const,
    glow: "rgba(255, 153, 0, 0.15)",
    borderGlow: "from-aws-orange/40 to-aws-orange/10",
  },
  {
    title: "AWS Quiz Challenge",
    description: "Compete in exciting AWS quizzes throughout the event, test your cloud knowledge, climb the leaderboard, and win exclusive goodies and exciting prizes.",
    icon: Trophy,
    color: "pink" as const,
    glow: "rgba(236, 72, 153, 0.15)",
    borderGlow: "from-pink-primary/40 to-pink-500/10",
  },
  {
    title: "Networking",
    description: "Meet students, developers, professionals, AWS community leaders, and technology enthusiasts while building meaningful connections and expanding your professional network.",
    icon: Users,
    color: "orange" as const,
    glow: "rgba(255, 153, 0, 0.15)",
    borderGlow: "from-aws-orange/40 to-purple-primary/20",
  },
];

interface HighlightCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: "purple" | "orange" | "pink";
  glow: string;
  borderGlow: string;
  index: number;
}

function HighlightCard({ title, description, icon: Icon, color, glow, borderGlow, index }: HighlightCardProps) {
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

  // Staggered card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: index * 0.1,
      },
    },
  };



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
      whileHover={shouldReduceMotion ? {} : { y: -8 }}
      className={cn(
        "relative rounded-2xl p-[1px] bg-gradient-to-b from-white/10 via-white/5 to-white/10 transition-all duration-500 h-full",
        isHovered ? `bg-gradient-to-br ${borderGlow} shadow-[0_20px_45px_rgba(0,0,0,0.5)]` : ""
      )}
    >
      {/* Interactive Spotlight Effect */}
      {isHovered && !shouldReduceMotion && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl z-0"
          style={{
            background: `radial-gradient(220px circle at ${coords.x}px ${coords.y}px, ${glow}, transparent 80%)`,
          }}
        />
      )}

      {/* Card Content Grid */}
      <div className="relative z-10 glass-card bg-card/65 rounded-[15px] p-7 h-full flex flex-col items-start border-none">
        
        {/* Floating Icon Wrapper */}
        <motion.div
          animate={!shouldReduceMotion && isHovered ? { y: [0, -6, 0] } : { y: 0 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <IconWrapper variant={color} size="lg" className={cn(
            "shadow-md transition-all duration-300",
            isHovered ? (
              color === "purple" ? "shadow-[0_0_15px_rgba(139,92,246,0.25)]" : 
              color === "pink" ? "shadow-[0_0_15px_rgba(236,72,153,0.25)]" : 
              "shadow-[0_0_15px_rgba(255,153,0,0.25)]"
            ) : ""
          )}>
            <Icon />
          </IconWrapper>
        </motion.div>

        {/* Highlight Card Copy */}
        <h3 className="text-xl font-bold mb-3 text-foreground tracking-wide transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {description}
        </p>

        {/* Card Decorative Detail */}
        <div className={cn(
          "w-12 h-1 rounded-full mt-6 bg-white/5 transition-all duration-300",
          isHovered ? (
            color === "purple" ? "bg-purple-primary" : 
            color === "pink" ? "bg-pink-primary" : 
            "bg-aws-orange"
          ) : ""
        )} />
      </div>
    </motion.div>
  );
}

export function EventHighlights() {
  return (
    <Section id="highlights" className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Background Radial Glow */}
      <div className="absolute top-[40%] right-[10%] w-[32rem] h-[32rem] rounded-full bg-purple-primary/5 blur-[150px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] left-[5%] w-[24rem] h-[24rem] rounded-full bg-aws-orange/5 blur-[120px] pointer-events-none z-0" />

      <Container className="relative z-10">
        <SectionHeading
          title="Event"
          gradientTitle="Highlights"
          gradientVariant="aws"
          subtitle="Discover what makes the AWS Student Community Day Yavatmal an unmissable technology conference."
          badge="What to Expect"
          badgeVariant="default"
        />

        {/* Highlights Cards Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HIGHLIGHTS.map((highlight, index) => (
            <HighlightCard
              key={highlight.title}
              title={highlight.title}
              description={highlight.description}
              icon={highlight.icon}
              color={highlight.color}
              glow={highlight.glow}
              borderGlow={highlight.borderGlow}
              index={index}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
