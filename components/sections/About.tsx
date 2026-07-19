"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// ─── Sparkle particle positions (deterministic so SSR matches client) ──────────
const SPARKLES = [
  { x: "12%", y: "15%", size: "2px", delay: 0.1, dur: 3.2 },
  { x: "85%", y: "25%", size: "1.5px", delay: 0.5, dur: 2.8 },
  { x: "5%", y: "75%", size: "2px", delay: 0.8, dur: 4.1 },
  { x: "92%", y: "65%", size: "1px", delay: 0.3, dur: 3.5 },
  { x: "45%", y: "82%", size: "1.5px", delay: 1.2, dur: 2.9 },
  { x: "78%", y: "88%", size: "2px", delay: 0.2, dur: 3.8 },
];

const SLIDES = [
  {
    id: "about-slide-jdiet",
    title: "AWS Cloud Club JDIET",
    description:
      "A student-led group focused on building, deploying, and learning cloud computing at Jawaharlal Darda Institute of Engineering and Technology (JDIET) Yavatmal.",
    icon: "☁️",
  },
  {
    id: "about-slide-yavatmal",
    title: "First Student Day in Yavatmal",
    description:
      "Bringing standard cloud industry workshops, AWS certification path resources, and community networking directly to the students of Vidarbha.",
    icon: "🚀",
  },
  {
    id: "about-slide-restart",
    title: "AWS re/Start Initiative",
    description:
      "Guiding students through entry paths in Amazon Web Services cloud architecture, DevOps, and cloud-practitioner certification tracks.",
    icon: "🎓",
  },
];

const basicVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch swipe gesture refs
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Auto-play interval effect (2.8 seconds)
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion]);

  // Handle manual interaction with automatic resume
  const handleInteraction = (action: () => void) => {
    setIsPaused(true);
    action();
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const deltaX = touchStartX.current - touchEndX.current;
      const swipeThreshold = 35; // Natural small swipe threshold
      if (deltaX > swipeThreshold) {
        // Swiped Left -> Next slide
        setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
      } else if (deltaX < -swipeThreshold) {
        // Swiped Right -> Previous slide
        setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;

    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      handleInteraction(() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length));
    } else if (e.key === "ArrowLeft") {
      handleInteraction(() => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length));
    }
  };

  return (
    <section
      id="about"
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden bg-[#030303]"
    >
      {/* ── Ambient glow layers ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute pointer-events-none -z-10"
        style={{
          top: "10%",
          left: "-8%",
          width: "520px",
          height: "520px",
          background:
            "radial-gradient(circle at center, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none -z-10"
        style={{
          bottom: "5%",
          right: "-6%",
          width: "480px",
          height: "480px",
          background:
            "radial-gradient(circle at center, rgba(58,20,16,0.30) 0%, rgba(74,26,18,0.12) 45%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none -z-10"
        style={{
          top: "-10%",
          left: "40%",
          width: "600px",
          height: "320px",
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 65%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Sparkle twinkle elements ───────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none -z-10 hidden sm:block">
        {SPARKLES.map((sp, i) => (
          <span
            key={i}
            className="sparkle-dot"
            style={
              {
                position: "absolute",
                left: sp.x,
                top: sp.y,
                width: sp.size,
                height: sp.size,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.75)",
                animationDelay: `${sp.delay}s`,
                animationDuration: `${sp.dur}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <style>{`
        @keyframes sparkleTwinkle {
          0%, 100% { opacity: 0.08; transform: scale(0.6); }
          50%       { opacity: 0.55; transform: scale(1);   }
        }
        .sparkle-dot {
          animation: sparkleTwinkle var(--sp-dur, 3s) ease-in-out infinite;
        }
      `}</style>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Sub-label */}
        <p className="text-xs font-bold tracking-[0.25em] uppercase text-[#666680] mb-6 md:mb-8 text-center">
          AWS Student Community Day · Yavatmal 2026
        </p>

        {/* Heading */}
        <h2
          className="text-center font-black text-white uppercase leading-none tracking-[-0.03em] mb-12 md:mb-16"
          style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
        >
          ABOUT
        </h2>

        {/* ── Clean Glass Text-Only Rotating Storytelling Card (Desktop & Mobile) ── */}
        <div className="max-w-3xl mx-auto px-2">
          <div
            tabIndex={0}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
              resumeTimerRef.current = setTimeout(() => setIsPaused(false), 2000);
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            onKeyDown={handleKeyDown}
            style={{ touchAction: "pan-y" }}
            className="w-full relative min-h-[220px] sm:min-h-[240px] md:min-h-[260px] bg-[#0d0d11]/80 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-10 md:p-12 flex flex-col justify-between focus:outline-none focus:ring-1 focus:ring-aws-orange/40 transition-all duration-300 select-none cursor-grab active:cursor-grabbing"
          >
            {/* Slide content container */}
            <div className="relative w-full flex-1 flex flex-col justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={basicVariants}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col items-center text-center gap-3 w-full"
                >
                  <span className="text-3xl select-none">{SLIDES[currentSlide].icon}</span>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white select-none uppercase tracking-wide leading-tight">
                    {SLIDES[currentSlide].title}
                  </h3>
                  <p className="text-[#c8c8d4] text-xs sm:text-sm md:text-base font-medium leading-relaxed select-none max-w-xl">
                    {SLIDES[currentSlide].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress indicator dot matrix */}
            <div className="flex items-center justify-center gap-2.5 mt-6 select-none pointer-events-auto">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleInteraction(() => setCurrentSlide(idx))}
                  className="h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer p-0 border-0"
                  style={{
                    width: idx === currentSlide ? 24 : 8,
                    backgroundColor: idx === currentSlide ? "#ff9900" : "rgba(255,255,255,0.25)",
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Organizer credit — secondary gray text */}
        <p className="text-xs sm:text-sm text-[#7a7a8c] leading-relaxed text-center mt-8 px-4 max-w-2xl mx-auto">
          Proudly organized by the{" "}
          <span className="text-[#e5e5e5] font-semibold">
            AWS Student Builder Group, JDIET
          </span>{" "}
          — building a stronger student cloud community in Vidarbha.
        </p>

        {/* Bottom divider line */}
        <div className="mt-16 md:mt-24 h-px bg-white/8 max-w-4xl mx-auto origin-left" />
      </div>
    </section>
  );
}

export default About;
