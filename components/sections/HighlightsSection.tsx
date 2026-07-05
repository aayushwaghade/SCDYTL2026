"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// ─── Highlights Data ──────────────────────────────────────────────────────────

interface HighlightItem {
  id: string;
  headline: string;
  description: string;
  image: string;
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    id: "talks",
    headline: "EXPERT TALKS & TECH KEYNOTES",
    description: "Learn directly from cloud leaders, AWS Heroes, and industry professionals sharing career-accelerating insights.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "workshops",
    headline: "HANDS-ON CLOUD WORKSHOPS",
    description: "Build cloud architectures in real-time, working directly in AWS environments with expert mentorship.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "quizzes",
    headline: "AWS TRIVIA & QUIZ CHALLENGES",
    description: "Test your cloud knowledge, climb the leaderboard, and win exclusive goodies and community prizes.",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "networking",
    headline: "COMMUNITY NETWORKING SECTOR",
    description: "Connect with developers, peers, and potential employers to accelerate your technological horizon.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
  },
];

// ─── Geometric Line-Art Icon ───────────────────────────────────────────────────

function GeometricIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ff9900"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      {/* A stylized futuristic triangle/arrowhead */}
      <polygon points="5,3 19,12 5,21 9,12" />
    </svg>
  );
}

// ─── Highlight Card Component ──────────────────────────────────────────────────

function HighlightCard({ item, index }: { item: HighlightItem; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.08,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
      className="relative flex flex-col h-[400px] w-full rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{ background: "#0d0d11" }}
    >
      {/* ── Top Zone (~40% height) ── */}
      <div className="relative h-[42%] w-full overflow-hidden shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.image}
          alt={item.headline}
          className="w-full h-full object-cover transition-transform duration-700 ease-out"
          style={{
            transform: isHovered ? "scale(1.06)" : "scale(1)",
          }}
        />
        {/* Overlay to blend image smoothly into the bottom panel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-[#0d0d11]" />
      </div>

      {/* ── Bottom Zone (~58% height) ── */}
      <div className="relative flex-1 w-full bg-[#0d0d11] p-6 flex flex-col overflow-hidden">
        
        {/* 1. Base Layer (Dark theme — Default state) */}
        <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
          <div className="text-center flex flex-col items-center gap-3">
            <h3 className="text-white font-extrabold text-sm tracking-wide leading-tight max-w-[90%] uppercase">
              {item.headline}
            </h3>
            <p className="text-xs text-[#9d9dae] leading-relaxed max-w-[85%] font-medium">
              {item.description}
            </p>
          </div>
          {/* Geometric icon bottom-left */}
          <div className="mt-auto self-start">
            <GeometricIcon />
          </div>
        </div>

        {/* 2. Revealed Layer (White theme — Hover/Tap state) */}
        <div
          className="absolute inset-0 p-6 flex flex-col justify-between z-20 pointer-events-none transition-all"
          style={{
            background: "#ffffff",
            clipPath: isHovered
              ? "circle(150% at 36px calc(100% - 36px))"
              : "circle(0% at 36px calc(100% - 36px))",
            transition: "clip-path 0.55s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          <div className="text-center flex flex-col items-center gap-3">
            <h3 className="text-black font-extrabold text-sm tracking-wide leading-tight max-w-[90%] uppercase">
              {item.headline}
            </h3>
            <p className="text-xs text-[#555568] leading-relaxed max-w-[85%] font-bold">
              {item.description}
            </p>
          </div>
          {/* Geometric icon stays at bottom-left */}
          <div className="mt-auto self-start">
            <GeometricIcon />
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export function HighlightsSection() {
  return (
    <section id="highlights" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* ── Section Header ── */}
        <div className="text-center mb-16 md:mb-24">
          <div className="flex justify-center mb-5">
            <span
              className="text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border select-none"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                color: "#e5e5e5",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              WHAT TO EXPECT
            </span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-white uppercase leading-none tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
          >
            EVENT HIGHLIGHTS
          </motion.h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-6 mx-auto h-px w-16 bg-white/20 origin-left"
          />
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-[#a1a1b2] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Discover what makes the AWS Student Community Day Yavatmal 2026 an unmissable cloud conference.
          </motion.p>
        </div>

        {/* ── Grid Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HIGHLIGHTS.map((item, index) => (
            <HighlightCard key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}
