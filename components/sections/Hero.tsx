"use client";

import React, { useRef, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import CountUp from "react-countup";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Calendar, MapPin, ChevronDown } from "lucide-react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Refs for the cursor-follow glow effect
  const wrapperRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetPos = useRef({ x: 50, y: 50 });
  const currentPos = useRef({ x: 50, y: 50 });

  // Update target position on mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      targetPos.current = {
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      };
    },
    []
  );

  // Cursor-follow ambient glow — disabled on touch devices & reduced-motion
  useEffect(() => {
    if (shouldReduceMotion) return;
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) return;

    const wrapper = wrapperRef.current;
    const glow = glowRef.current;
    if (!wrapper || !glow) return;

    wrapper.addEventListener("mousemove", handleMouseMove);

    // Smooth interpolation via lerp (~0.08 ≈ 0.2-0.3s lag feel)
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, 0.08);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, 0.08);
      glow.style.setProperty("--gx", `${currentPos.current.x}%`);
      glow.style.setProperty("--gy", `${currentPos.current.y}%`);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [shouldReduceMotion, handleMouseMove]);

  // ── Animation variants ──────────────────────────────────────────────────────

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const stats = [
    { end: 600, suffix: "+", label: "Students" },
    { end: 12,  suffix: "+", label: "Speakers" },
    { end: 10,  suffix: "+", label: "Sessions" },
    { end: 1,   suffix: "",  label: "Experience" },
  ];

  return (
    <Section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center pt-28 lg:pt-0 overflow-hidden p-0"
    >
      {/* Outer wrapper — receives mouse events for cursor glow */}
      <div
        ref={wrapperRef}
        className="relative w-full min-h-screen flex flex-col justify-center items-center py-16 md:py-24 lg:py-32"
      >
        {/* ── Static background glows ───────────────────────────────────────── */}
        <div className="absolute top-[20%] left-[10%] w-96 h-96 rounded-full bg-purple-primary/10 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-aws-orange/5 blur-[160px] pointer-events-none z-0" />

        {/* ── Cursor-follow ambient glow ───────────────────────────────────── */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="hero-cursor-glow absolute inset-0 pointer-events-none z-0"
          style={{ "--gx": "50%", "--gy": "50%" } as React.CSSProperties}
        />

        {/* ── Content ─────────────────────────────────────────────────────── */}
        <Container className="relative z-10 w-full flex flex-col items-center text-center">

          {/* Staggered text + controls */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* AWS Logo */}
            <motion.div variants={itemVariants} className="mb-3 flex items-center justify-center">
              <Image
                src="/logos/aws-logo.png"
                alt="AWS"
                width={130}
                height={80}
                className="select-none object-contain"
                priority
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.08] select-none"
            >
              <GradientText variant="aws" className="text-gradient-aws">
                Student Community Day
              </GradientText>
              <br />
              Yavatmal 2026
            </motion.h1>

            {/* Organiser line — plain semibold text, matches reference */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg font-semibold text-foreground/80 mb-5 select-none"
            >
              Organized by AWS Student Builder Group JDIET
            </motion.p>

            {/* Date | Venue — single dark pill, orange text, matches reference */}
            <motion.div variants={itemVariants} className="mb-8">
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-aws-orange/15 border border-aws-orange/30 text-aws-orange text-sm font-semibold">
                <Calendar className="w-4 h-4 shrink-0" />
                Aug 22, 2026
                <span className="text-aws-orange/50 mx-0.5">|</span>
                <MapPin className="w-4 h-4 shrink-0" />
                Venue to be announced
              </span>
            </motion.div>

            {/* CTA — Register Now only */}
            <motion.div
              variants={itemVariants}
              className="mb-14"
            >
              <Button size="lg" variant="default" asChild>
                <a href="#tickets">Register Now →</a>
              </Button>
            </motion.div>


            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-4 gap-6 sm:gap-10 w-full max-w-lg border-t border-white/5 pt-8"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <div className="text-xl sm:text-2xl font-extrabold text-foreground leading-none mb-1">
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={2}
                      delay={i * 0.1}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </Container>

        {/* ── Scroll indicator ──────────────────────────────────────────────── */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
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
      </div>

      {/* Scoped styles for cursor glow — no global pollution */}
      <style>{`
        .hero-cursor-glow {
          background: radial-gradient(
            600px circle at var(--gx, 50%) var(--gy, 50%),
            rgba(30, 60, 120, 0.10) 0%,
            rgba(60, 30, 90, 0.06) 40%,
            transparent 70%
          );
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-cursor-glow { display: none; }
        }
      `}</style>
    </Section>
  );
}
