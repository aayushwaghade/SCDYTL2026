"use client";

import React from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";
import { GlassCard } from "@/components/cards/GlassCard";
import { Magnetic } from "@/components/animations/Magnetic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Calendar,
  MapPin,
  Users,
  Mic,
  Zap,
  Trophy,
  ChevronDown,
  Cloud,
  Cpu,
  Server,
  Network
} from "lucide-react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Framer Motion staggered orchestration variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const visualVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.5 },
    },
  };

  const floatAnimation = shouldReduceMotion
    ? {}
    : {
        animate: {
          y: [0, -12, 0],
        },
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      };

  return (
    <Section id="hero" className="relative min-h-screen flex flex-col justify-center items-center pt-28 lg:pt-0 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-[20%] left-[10%] w-96 h-96 rounded-full bg-purple-primary/10 blur-[130px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-aws-orange/5 blur-[160px] pointer-events-none z-0" />

      <Container className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1 my-auto">
        
        {/* Left Column: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col justify-center text-left items-start"
        >
          {/* Tagline */}
          <motion.div variants={itemVariants} className="mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-aws-orange/20 bg-aws-orange/5 text-aws-orange text-xs font-semibold uppercase tracking-wider select-none">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Vidarbha Region&apos;s Largest Tech Summit
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 leading-[1.08] select-none"
          >
            AWS Student <br />
            <GradientText variant="aws" className="text-gradient-aws">
              Community Day
            </GradientText>{" "}
            <br />
            Yavatmal 2026
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
          >
            The biggest student-led AWS Cloud, AI, and technology event in the Vidarbha region, bringing together students, developers, community leaders, and industry experts.
          </motion.p>

          {/* Chips Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl mb-8"
          >
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <Calendar className="w-4.5 h-4.5 text-aws-orange shrink-0" />
              <span className="text-xs font-medium text-muted-foreground">Coming Soon</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <MapPin className="w-4.5 h-4.5 text-aws-orange shrink-0" />
              <span className="text-xs font-medium text-muted-foreground">JDIET, Yavatmal</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm col-span-2 sm:col-span-1">
              <Users className="w-4.5 h-4.5 text-aws-orange shrink-0" />
              <span className="text-xs font-medium text-muted-foreground">600+ Students</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <Mic className="w-4.5 h-4.5 text-aws-orange shrink-0" />
              <span className="text-xs font-medium text-muted-foreground">12+ Speakers</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
              <Server className="w-4.5 h-4.5 text-aws-orange shrink-0" />
              <span className="text-xs font-medium text-muted-foreground">10+ Sessions</span>
            </div>
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm col-span-2 sm:col-span-1">
              <Trophy className="w-4.5 h-4.5 text-aws-orange shrink-0" />
              <span className="text-xs font-medium text-muted-foreground">Workshops</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 items-center mb-10 w-full"
          >
            <Button size="lg" variant="default" asChild>
              <a href="#tickets">Register Now</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#volunteers">Become a Volunteer</a>
            </Button>
            <a
              href="#agenda"
              className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 ml-2 group"
            >
              View Agenda
              <span className="group-hover:translate-y-0.5 transition-transform duration-200">↓</span>
            </a>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-4 gap-4 w-full border-t border-white/5 pt-8 max-w-xl"
          >
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-foreground leading-none mb-1">
                <CountUp end={600} suffix="+" duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none">
                Students
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-foreground leading-none mb-1">
                <CountUp end={12} suffix="+" duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none">
                Speakers
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-foreground leading-none mb-1">
                <CountUp end={10} suffix="+" duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none">
                Sessions
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-foreground leading-none mb-1">
                <CountUp end={1} duration={2.5} enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none">
                Experience
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Premium Visual Illustration */}
        <motion.div
          variants={visualVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex items-center justify-center relative w-full h-[320px] sm:h-[450px]"
        >
          <motion.div
            {...floatAnimation}
            className="relative w-full h-full flex items-center justify-center"
          >
            {/* Ambient Background Glows */}
            <div className="absolute w-64 h-64 rounded-full bg-purple-primary/10 blur-3xl z-0" />
            <div className="absolute w-48 h-48 rounded-full bg-aws-orange/5 blur-3xl z-0" />

            {/* Rotating Outer Ring */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] rounded-full border border-white/5 border-dashed z-0 flex items-center justify-center"
            >
              {/* Nodes on outer ring */}
              <div className="absolute top-0 w-3 h-3 rounded-full bg-aws-orange glow-orange" />
              <div className="absolute bottom-0 w-3 h-3 rounded-full bg-purple-primary glow-purple" />
            </motion.div>

            {/* Rotating Inner Ring */}
            <motion.div
              animate={shouldReduceMotion ? {} : { rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[160px] h-[160px] sm:w-[220px] sm:h-[220px] rounded-full border border-white/5 z-0"
            >
              {/* Node on inner ring */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-pink-primary" />
            </motion.div>

            {/* Core Floating Glass Panel */}
            <Magnetic range={80} strength={0.4}>
              <GlassCard
                glowColor="purple"
                hoverGlow
                className="w-48 h-48 sm:w-56 sm:h-56 flex flex-col items-center justify-center relative z-10 border border-white/10"
              >
                <div className="w-16 h-16 rounded-2xl bg-aws-orange/10 flex items-center justify-center text-aws-orange mb-4 shadow-[0_0_20px_rgba(255,153,0,0.15)]">
                  <Cloud className="w-9 h-9 fill-current animate-pulse" />
                </div>
                <span className="text-xs font-extrabold tracking-widest text-muted-foreground uppercase leading-none mb-1">
                  AWS JDIET
                </span>
                <span className="text-[9px] font-semibold text-aws-orange uppercase tracking-wider">
                  Cloud Builders
                </span>
              </GlassCard>
            </Magnetic>

            {/* Floating Supporting Glass Panel 1: Code Snippet */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-[10px] -right-[10px] sm:top-5 sm:right-5 z-20"
            >
              <GlassCard glowColor="none" hoverGlow={false} className="p-3 bg-black/60 rounded-xl border border-white/5 max-w-[150px]">
                <div className="flex gap-1.5 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
                <code className="text-[9px] font-mono text-purple-300 leading-tight block select-none">
                  const aws = new AWS.Cloud(); <br />
                  aws.deploy(&apos;AI&apos;);
                </code>
              </GlassCard>
            </motion.div>

            {/* Floating Supporting Glass Panel 2: CPU Stats */}
            <motion.div
              animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-[10px] -left-[10px] sm:bottom-5 sm:left-5 z-20"
            >
              <GlassCard glowColor="none" hoverGlow={false} className="p-3.5 bg-black/60 rounded-xl border border-white/5 flex items-center gap-2">
                <Cpu className="w-4.5 h-4.5 text-aws-orange shrink-0 animate-pulse" />
                <div className="text-left">
                  <div className="text-[9px] font-bold text-foreground leading-none mb-0.5 select-none">CPU Latency</div>
                  <div className="text-[8px] font-semibold text-green-400 leading-none select-none">0.05ms (Optimal)</div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Network Node Icon */}
            <div className="absolute top-[20%] left-[20%] z-0 text-white/5">
              <Network className="w-10 h-10 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* Bottom Center: Scroll Indicator */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 select-none"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors group"
        >
          <span>Scroll to Explore</span>
          <span className="flex items-center justify-center w-7 h-7 rounded-full border border-white/10 group-hover:border-white/20 transition-colors bg-white/[0.02]">
            <ChevronDown className="w-4 h-4 text-aws-orange group-hover:translate-y-0.5 transition-transform duration-300 animate-bounce" />
          </span>
        </a>
      </motion.div>
    </Section>
  );
}
