"use client";

import React, { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { Button } from "@/components/ui/button";
import { GradientText } from "@/components/ui/GradientText";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { EVENT_CONFIG } from "@/lib/event";
import { Countdown } from "@/components/ui/Countdown";

export function Hero() {

  // Refs for the cursor-follow glow effect (desktop only)
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

  // Cursor-follow ambient glow — desktop only (hover devices)
  useEffect(() => {
    // Only enable on devices with hover capability (not touch)
    if (window.matchMedia("(hover: none)").matches) return;

    const wrapper = wrapperRef.current;
    const glow = glowRef.current;
    if (!wrapper || !glow) return;

    wrapper.addEventListener("mousemove", handleMouseMove);

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
  }, [handleMouseMove]);

  const stats = [
    { end: 600, suffix: "+", label: "Students" },
    { end: 12,  suffix: "+", label: "Speakers" },
    { end: 10,  suffix: "+", label: "Sessions" },
    { end: 1,   suffix: "",  label: "Experience" },
  ];

  return (
    <Section
      id="hero"
      className="relative min-h-dvh flex flex-col justify-center items-center pt-24 pb-8 md:p-0 overflow-hidden"
    >
      {/* Outer wrapper — receives mouse events for cursor glow */}
      <div
        ref={wrapperRef}
        className="relative w-full min-h-fit md:min-h-dvh flex flex-col justify-center items-center py-12 md:py-24 lg:py-32"
      >
        {/* ── Static background glows ───────────────────────────────────────── */}
        <div className="absolute top-[20%] left-[10%] w-96 h-96 rounded-full bg-purple-primary/10 blur-[130px] pointer-events-none z-0" />
        <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] rounded-full bg-aws-orange/5 blur-[160px] pointer-events-none z-0" />

        {/* ── Cursor-follow ambient glow ─────────────────────── */}
        <div
          ref={glowRef}
          aria-hidden="true"
          className="hero-cursor-glow absolute inset-0 pointer-events-none z-0"
          style={{ "--gx": "50%", "--gy": "50%" } as React.CSSProperties}
        />

        {/* ── Yavatmal Skyline Background ───────────────────────── */}
        {/* CSS controls opacity & blend-mode: lower opacity + no blend on touch, higher + blend on hover devices */}
        <div
          className="hero-skyline-layer absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[35vh] sm:h-[45vh] md:h-[65%] lg:h-[70%] z-[1] pointer-events-none select-none"
        >
          <div className="w-full h-full relative hero-skyline-blend">
            <Image
              src="/images/yavatmal-skyline.png"
              alt="Yavatmal Skyline"
              fill
              className="object-cover object-bottom"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* ── Arc & Birds layer ──────────────────────────────────── */}
        <div
          className="hero-arc-layer absolute bottom-[10vh] md:bottom-[18%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[60vh] sm:h-[70vh] md:h-[82%] lg:h-[88%] z-[1] pointer-events-none select-none"
        >
          <div className="w-full h-full relative hero-skyline-blend">
            <Image
              src="/images/yavatmal-skyline.png"
              alt="Yavatmal Arc & Birds"
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* ── Content ─────────────────────────────────────────────────────── */}
        {/* Content is ALWAYS visible. CSS animation for entrance, not Framer Motion. */}
        {/* This guarantees visibility even if JS hydration is delayed. */}
        <Container className="relative z-10 w-full flex flex-col items-center text-center">
          <div className="flex flex-col items-center hero-content-entrance">
            {/* AWS Logo */}
            <div className="mb-3 flex items-center justify-center hero-stagger-1">
              <Image
                src="/logos/aws-logo.png"
                alt="AWS"
                width={120}
                height={74}
                className="select-none object-contain w-24 md:w-28 h-auto"
                priority
              />
            </div>

            {/* Headline */}
            <h1
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 leading-[1.08] select-none hero-stagger-2"
            >
              <GradientText variant="aws" className="text-gradient-aws">
                Student Community Day
              </GradientText>
              <br />
              Yavatmal 2026
            </h1>

            {/* Organiser line */}
            <p
              className="text-sm sm:text-base md:text-lg font-semibold text-foreground/80 mb-4 md:mb-5 select-none hero-stagger-3"
            >
              Organized by AWS Student Builder Group JDIET
            </p>

            {/* Date | Venue pill */}
            <div className="mb-2 hero-stagger-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-aws-orange/15 border border-aws-orange/30 text-aws-orange text-xs sm:text-sm font-semibold">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                {EVENT_CONFIG.displayDate}
                <span className="text-aws-orange/50 mx-0.5">|</span>
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {EVENT_CONFIG.venue}
              </span>
            </div>

            {/* LIVE COUNTDOWN */}
            <Countdown />

            {/* CTA */}
            <div className="mb-8 md:mb-14 hero-stagger-5">
              <Button size="lg" variant="default" asChild>
                <a href="#tickets">Register Now →</a>
              </Button>
            </div>

            {/* Stats row */}
            <div
              className="grid grid-cols-4 gap-2.5 sm:gap-6 md:gap-10 w-full max-w-lg border-t border-white/5 pt-6 md:pt-8 hero-stagger-6"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <div className="text-lg sm:text-2xl font-extrabold text-foreground leading-none mb-1">
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={2}
                      delay={i * 0.1}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  <div className="text-[8px] sm:text-[10px] uppercase font-bold text-muted-foreground tracking-wider leading-none">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>

        {/* ── Scroll indicator (desktop only) ────────────────────────────────── */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 select-none hero-stagger-7"
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
        </div>
      </div>

      {/* Scoped styles — CSS-only animations, no JS dependency */}
      <style>{`
        .hero-cursor-glow {
          background: radial-gradient(
            600px circle at var(--gx, 50%) var(--gy, 50%),
            rgba(30, 60, 120, 0.10) 0%,
            rgba(60, 30, 90, 0.06) 40%,
            transparent 70%
          );
        }

        /* CSS entrance animation — works even if JS fails */
        @keyframes hero-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-stagger-1,
        .hero-stagger-2,
        .hero-stagger-3,
        .hero-stagger-4,
        .hero-stagger-5,
        .hero-stagger-6,
        .hero-stagger-7 {
          animation: hero-fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .hero-stagger-1 { animation-delay: 0.1s; }
        .hero-stagger-2 { animation-delay: 0.19s; }
        .hero-stagger-3 { animation-delay: 0.28s; }
        .hero-stagger-4 { animation-delay: 0.37s; }
        .hero-stagger-5 { animation-delay: 0.46s; }
        .hero-stagger-6 { animation-delay: 0.55s; }
        .hero-stagger-7 { animation-delay: 1.8s; }

        @media (prefers-reduced-motion: reduce) {
          .hero-cursor-glow { display: none; }
          .hero-stagger-1,
          .hero-stagger-2,
          .hero-stagger-3,
          .hero-stagger-4,
          .hero-stagger-5,
          .hero-stagger-6,
          .hero-stagger-7 {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        /* Skyline background layers — touch vs hover device handling */
        .hero-skyline-layer { opacity: 0.1; }
        .hero-arc-layer { opacity: 0.06; }
        .hero-skyline-blend { /* no blend on touch by default */ }
        .hero-cursor-glow { display: none; }

        @media (hover: hover) {
          .hero-skyline-layer { opacity: 0.18; }
          .hero-arc-layer { opacity: 0.12; }
          .hero-skyline-blend { mix-blend-mode: screen; }
          .hero-cursor-glow { display: block; }
        }
      `}</style>
    </Section>
  );
}
