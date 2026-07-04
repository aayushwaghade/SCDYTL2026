"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/cards/GlassCard";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  GraduationCap,
  Users,
  Cpu,
  Laptop,
  Network,
  TrendingUp,
  Cloud,
  Brain,
  Database,
  Sparkles,
  Server,
  Code
} from "lucide-react";

const BADGES = [
  { label: "Student-led", icon: GraduationCap, color: "purple" as const },
  { label: "Community Driven", icon: Users, color: "orange" as const },
  { label: "Cloud & AI", icon: Cpu, color: "pink" as const },
  { label: "Workshops", icon: Laptop, color: "purple" as const },
  { label: "Networking", icon: Network, color: "orange" as const },
  { label: "Career Growth", icon: TrendingUp, color: "pink" as const }
];

export function About() {
  const shouldReduceMotion = useReducedMotion();

  // Framer Motion variants
  const textContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const badgeContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.3,
      },
    },
  };

  const badgeItemVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const glowColorStyles = {
    purple: "border-purple-primary/20 bg-purple-primary/5 text-purple-300 hover:border-purple-primary/40 hover:bg-purple-primary/10 hover:shadow-[0_0_15px_rgba(139,92,246,0.15)]",
    orange: "border-aws-orange/20 bg-aws-orange/5 text-aws-orange hover:border-aws-orange/40 hover:bg-aws-orange/10 hover:shadow-[0_0_15px_rgba(255,153,0,0.15)]",
    pink: "border-pink-primary/20 bg-pink-primary/5 text-pink-300 hover:border-pink-primary/40 hover:bg-pink-primary/10 hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]",
  };

  const visualVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <Section id="about" className="relative overflow-hidden py-20 md:py-28 lg:py-32">
      {/* Background Orbs */}
      <div className="absolute top-[30%] -left-[10%] w-80 h-80 rounded-full bg-purple-primary/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] -right-[5%] w-96 h-96 rounded-full bg-aws-orange/5 blur-[140px] pointer-events-none z-0" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <SectionHeading
              title="About AWS Student"
              gradientTitle="Community Day"
              gradientVariant="aws"
              align="left"
              badge="First Ever in Yavatmal"
              badgeVariant="aws"
              className="mb-6 w-full"
            />

            {/* Paragraphs */}
            <div className="space-y-5 text-muted-foreground text-sm sm:text-base leading-relaxed max-w-2xl">
              <motion.p variants={textItemVariants}>
                AWS Student Community Day Yavatmal is a community-driven technology conference designed to inspire, educate, and connect students with the rapidly evolving world of Cloud Computing, Artificial Intelligence, and modern software development.
              </motion.p>
              
              <motion.p variants={textItemVariants}>
                For the very first time, Yavatmal is hosting a large-scale AWS Student Community Day, bringing together students, developers, technology enthusiasts, industry experts, community leaders, and future innovators under one roof.
              </motion.p>

              <motion.p variants={textItemVariants}>
                This marks a significant milestone for the region by introducing a professional cloud community event of this scale, creating new opportunities for learning, networking, collaboration, and career growth.
              </motion.p>

              <motion.p variants={textItemVariants}>
                The event is proudly organized by the <strong>AWS Student Builder Group JDIET</strong> with the vision of building a stronger cloud community across Yavatmal and the Vidarbha region.
              </motion.p>
            </div>

            {/* Animated Badges Grid */}
            <motion.div
              variants={badgeContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-2xl mt-8 pt-6 border-t border-white/5"
            >
              {BADGES.map((badge) => {
                const IconComponent = badge.icon;
                return (
                  <motion.div
                    key={badge.label}
                    variants={badgeItemVariants}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border backdrop-blur-md transition-all duration-300 font-semibold select-none cursor-default ${glowColorStyles[badge.color]}`}
                  >
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span className="text-xs tracking-wide">{badge.label}</span>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right Column: Animated Illustration */}
          <motion.div
            variants={visualVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center relative w-full h-[360px] sm:h-[480px]"
          >
            {/* Animated Network Background (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="gradient-orange" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff9900" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Connecting lines between central hub and orbiting panels */}
              <motion.line
                x1="50%"
                y1="50%"
                x2="80%"
                y2="20%"
                stroke="url(#gradient-purple)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                animate={shouldReduceMotion ? {} : { strokeDashoffset: [-20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="50%"
                y1="50%"
                x2="20%"
                y2="30%"
                stroke="url(#gradient-orange)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                animate={shouldReduceMotion ? {} : { strokeDashoffset: [0, 20] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <motion.line
                x1="50%"
                y1="50%"
                x2="70%"
                y2="80%"
                stroke="url(#gradient-purple)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                animate={shouldReduceMotion ? {} : { strokeDashoffset: [-25, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              />

              {/* Outer orbits */}
              <circle cx="50%" cy="50%" r="140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" fill="none" />
              <circle cx="50%" cy="50%" r="90" stroke="rgba(255,153,0,0.03)" strokeWidth="1" fill="none" />
            </svg>

            {/* Central Cloud Hub */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                rotate: 360,
              }}
              transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
              className="absolute w-[200px] h-[200px] rounded-full border border-white/5 border-dashed flex items-center justify-center z-10"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-aws-orange glow-orange" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-primary glow-purple" />
            </motion.div>

            {/* Central Glass Card */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                y: [0, -6, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute z-20"
            >
              <GlassCard
                glowColor="orange"
                hoverGlow
                className="w-36 h-36 flex flex-col items-center justify-center border border-white/10"
              >
                <div className="w-12 h-12 rounded-xl bg-aws-orange/15 flex items-center justify-center text-aws-orange mb-3 shadow-[0_0_15px_rgba(255,153,0,0.1)]">
                  <Cloud className="w-7 h-7 fill-current" />
                </div>
                <span className="text-[10px] font-extrabold tracking-widest text-muted-foreground uppercase text-center leading-none">
                  AWS JDIET
                </span>
                <span className="text-[8px] font-semibold text-aws-orange uppercase tracking-wider mt-1">
                  Community Hub
                </span>
              </GlassCard>
            </motion.div>

            {/* Orbiting Panel 1: Generative AI (Top Right) */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                y: [0, 8, 0],
                x: [0, -4, 0]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-10 right-6 sm:top-14 sm:right-10 z-20"
            >
              <GlassCard glowColor="pink" className="p-3 bg-black/60 rounded-2xl border border-white/5 flex flex-col gap-2 w-36 hover:scale-[1.03]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-pink-primary/10 border border-pink-primary/15 flex items-center justify-center text-pink-300">
                    <Brain className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-extrabold text-foreground tracking-wide">GenAI Models</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
                  <Sparkles className="w-3 h-3 text-pink-300 animate-pulse" />
                  <span className="text-[8px] text-muted-foreground font-mono leading-none select-none">Claude/Llama active</span>
                </div>
              </GlassCard>
            </motion.div>

            {/* Orbiting Panel 2: Cloud Infrastructure (Left) */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                y: [0, -8, 0],
                x: [0, 4, 0]
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-[40%] left-2 sm:left-4 z-20"
            >
              <GlassCard glowColor="purple" className="p-3 bg-black/60 rounded-2xl border border-white/5 flex flex-col gap-2 w-36 hover:scale-[1.03]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-primary/10 border border-purple-primary/15 flex items-center justify-center text-purple-300">
                    <Server className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-extrabold text-foreground tracking-wide">Serverless EC2</span>
                </div>
                <div className="flex items-center justify-between gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5">
                  <span className="text-[8px] text-muted-foreground font-mono leading-none">CPU load</span>
                  <div className="w-10 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      animate={{ width: ["20%", "80%", "45%"] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full bg-purple-primary"
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Orbiting Panel 3: Code Deployment (Bottom Right) */}
            <motion.div
              animate={shouldReduceMotion ? {} : {
                y: [0, 6, 0],
                x: [0, 3, 0]
              }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute bottom-10 right-10 sm:bottom-16 sm:right-14 z-20"
            >
              <GlassCard glowColor="none" className="p-3 bg-black/60 rounded-2xl border border-white/5 flex flex-col gap-2 w-36 hover:scale-[1.03]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground">
                    <Code className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-[10px] font-extrabold text-foreground tracking-wide">Deploy App</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.02] p-1.5 rounded-lg border border-white/5 font-mono text-[8px] text-green-400 select-none">
                  <Database className="w-3 h-3 text-green-400" />
                  <span>Success [200 OK]</span>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </Section>
  );
}
