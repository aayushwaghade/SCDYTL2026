"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
    image: "/images/Community Partners logos/SIPNA.jpg",
    title: "AWS Cloud Club JDIET",
    description:
      "A student-led group focused on building, deploying, and learning cloud computing at Jawaharlal Darda Institute of Engineering and Technology (JDIET) Yavatmal.",
    icon: "☁️",
  },
  {
    id: "about-slide-yavatmal",
    image: "/images/Community Partners logos/PRMIT.jpg",
    title: "First Student Day in Yavatmal",
    description:
      "Bringing standard cloud industry workshops, AWS certification path resources, and community networking directly to the students of Vidarbha.",
    icon: "🚀",
  },
  {
    id: "about-slide-restart",
    image: "/images/Community Partners logos/SIPNA.jpg",
    title: "AWS re/Start Initiative",
    description:
      "Guiding students through entry paths in Amazon Web Services cloud architecture, DevOps, and cloud-practitioner certification tracks.",
    icon: "🎓",
  },
];

const basicVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play interval effect (3 seconds)
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, shouldReduceMotion]);

  // Keyboard navigation support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    } else if (e.key === "ArrowLeft") {
      setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
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
        <motion.p
          initial={false}
          variants={basicVariants}
          animate="visible"
          className="text-xs font-bold tracking-[0.25em] uppercase text-[#666680] mb-10 md:mb-12 text-center"
        >
          AWS Student Community Day · Yavatmal 2026
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={false}
          variants={basicVariants}
          animate="visible"
          className="text-center font-black text-white uppercase leading-none tracking-[-0.03em] mb-16 md:mb-20"
          style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
        >
          ABOUT
        </motion.h2>

        {/* ── Desktop & Laptop Layout: Image-Based Storytelling Card ── */}
        <div className="hidden md:block max-w-4xl mx-auto">
          <div
            tabIndex={0}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onKeyDown={handleKeyDown}
            className="w-full relative h-[380px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 focus:outline-none focus:ring-1 focus:ring-purple-primary/30"
          >
            {/* Background images */}
            {SLIDES.map((slide, idx) => (
              <motion.div
                key={slide.id}
                initial={false}
                variants={basicVariants}
                animate="visible"
                className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700"
                style={{ opacity: idx === currentSlide ? 1 : 0 }}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  sizes="896px"
                  priority={idx === 0}
                />
              </motion.div>
            ))}

            {/* Dark premium gradient overlay */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/30 z-10 pointer-events-none"
            />

            {/* Foreground content layout */}
            <div className="absolute inset-0 p-12 md:p-16 flex flex-col justify-between z-20 text-left pointer-events-none">
              <div className="relative w-full">
                <motion.div
                  initial={false}
                  variants={basicVariants}
                  animate="visible"
                  className="flex flex-col gap-3 max-w-xl text-left transition-all duration-300"
                >
                  <span className="text-2xl select-none">{SLIDES[currentSlide].icon}</span>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white select-none uppercase tracking-wide leading-none">
                    {SLIDES[currentSlide].title}
                  </h3>
                  <p className="text-[#e2e2ee] text-sm sm:text-base md:text-[17px] font-semibold leading-relaxed select-none mt-1">
                    {SLIDES[currentSlide].description}
                  </p>
                </motion.div>
              </div>

              {/* Progress capsule indicators dot matrix */}
              <div className="flex items-center gap-2 mt-4 select-none pointer-events-auto">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className="h-1.5 rounded-full transition-all duration-300 focus:outline-none cursor-pointer"
                    style={{
                      width: idx === currentSlide ? 20 : 6,
                      backgroundColor: idx === currentSlide ? "#ff9900" : "rgba(255,255,255,0.35)",
                    }}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile Layout: Text-Only Rotating Storytelling Card ── */}
        <div className="block md:hidden max-w-md mx-auto">
          <div className="w-full relative min-h-[220px] bg-[#0d0d11]/80 backdrop-blur-md rounded-2xl border border-white/5 shadow-2xl p-8 flex flex-col justify-between">
            {/* Rotating text content */}
            <div className="relative w-full">
              <motion.div
                initial={false}
                variants={basicVariants}
                animate="visible"
                className="flex flex-col gap-3 text-center transition-all duration-300"
              >
                <span className="text-2xl select-none">{SLIDES[currentSlide].icon}</span>
                <h3 className="text-lg font-black text-white select-none uppercase tracking-wide leading-none">
                  {SLIDES[currentSlide].title}
                </h3>
                <p className="text-[#c8c8d4] text-xs sm:text-sm font-medium leading-relaxed select-none">
                  {SLIDES[currentSlide].description}
                </p>
              </motion.div>
            </div>

            {/* Progress capsule indicators dot matrix */}
            <div className="flex items-center justify-center gap-2 mt-6 select-none">
              {SLIDES.map((_, idx) => (
                <span
                  key={idx}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: idx === currentSlide ? 16 : 4,
                    backgroundColor: idx === currentSlide ? "#ff9900" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Organizer credit — secondary gray text */}
        <motion.p
          initial={false}
          variants={basicVariants}
          animate="visible"
          className="text-xs sm:text-sm text-[#7a7a8c] leading-relaxed text-center mt-8 px-4 max-w-2xl mx-auto"
        >
          Proudly organized by the{" "}
          <span className="text-[#e5e5e5] font-semibold">
            AWS Student Builder Group, JDIET
          </span>{" "}
          — building a stronger student cloud community in Vidarbha.
        </motion.p>

        {/* Bottom divider line */}
        <motion.div
          initial={false}
          variants={basicVariants}
          animate="visible"
          className="mt-20 md:mt-28 h-px bg-white/8 max-w-4xl mx-auto origin-left transition-all duration-500"
        />
      </div>
    </section>
  );
}

export default About;
