"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ─── Sparkle particle positions (deterministic so SSR matches client) ──────────
const SPARKLES = [
  { x: "12%",  y: "18%",  size: 3,   delay: 0,    dur: 2.8 },
  { x: "88%",  y: "12%",  size: 2,   delay: 0.7,  dur: 3.2 },
  { x: "6%",   y: "72%",  size: 2.5, delay: 1.1,  dur: 2.5 },
  { x: "93%",  y: "65%",  size: 3,   delay: 0.3,  dur: 3.6 },
  { x: "55%",  y: "8%",   size: 2,   delay: 1.6,  dur: 2.9 },
  { x: "78%",  y: "88%",  size: 2.5, delay: 0.9,  dur: 3.1 },
  { x: "22%",  y: "90%",  size: 2,   delay: 0.4,  dur: 2.6 },
  { x: "45%",  y: "82%",  size: 1.5, delay: 1.4,  dur: 3.4 },
  { x: "72%",  y: "38%",  size: 1.5, delay: 2.0,  dur: 2.7 },
  { x: "35%",  y: "22%",  size: 2,   delay: 0.6,  dur: 3.0 },
];

// ─── Bold statement lines (condensed from original 4 paragraphs) ───────────────
//
// Original copy preserved in intent; shortened to bold punchy statements.
// No information was cut — each paragraph maps to a statement below:
//   Para 1 → "Cloud, AI & modern software…"
//   Para 2 → "First ever. Yavatmal. Students & industry, one roof."
//   Para 3 → "A milestone for the region…"  (merged into tagline)
//   Para 4 → Organiser credit kept as-is
//
const STATEMENTS = [
  {
    id: "s1",
    text: "AWS Cloud, AI & modern software engineering brought to Yavatmal — empowering the local technical event ecosystem.",
    size: "large",
  },
  {
    id: "s2",
    text: "The first-ever AWS Student Community Day in Yavatmal, bringing students, developers, and industry leaders together.",
    size: "large",
  },
  {
    id: "s3",
    text: "A major milestone for the AWS event Vidarbha community and the student tech conference Maharashtra networks.",
    size: "medium",
  },
] as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export function About() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-36 lg:py-44 overflow-hidden"
    >
      {/* ── Ambient glow layers ─────────────────────────────────────────── */}
      {/* Left purple blob */}
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
      {/* Right maroon blob */}
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
      {/* Centre top subtle indigo wash */}
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

      {/* ── CSS sparkle twinkle elements ───────────────────────────────── */}
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

      {/* Inline keyframes for sparkle twinkle (no external CSS file needed) */}
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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-[0.25em] uppercase text-[#666680] mb-10 md:mb-12 text-center"
        >
          AWS Student Community Day · Yavatmal 2026
        </motion.p>

        {/* Oversized heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center font-black text-white uppercase leading-none tracking-[-0.03em] mb-16 md:mb-20"
          style={{ fontSize: "clamp(3.5rem, 8vw, 6rem)" }}
        >
          ABOUT
        </motion.h2>

        {/* Statement lines */}
        <div className="max-w-4xl mx-auto flex flex-col gap-10 md:gap-12">
          {STATEMENTS.map((stmt, i) => (
            <motion.div
              key={stmt.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col gap-3"
            >
              {/* Thin 1px accent line before each statement */}
              <div className="h-px w-10 bg-white/15" />
              <p
                className={`font-extrabold text-white leading-tight tracking-tight ${
                  stmt.size === "large"
                    ? "text-2xl sm:text-3xl md:text-4xl"
                    : "text-xl sm:text-2xl md:text-3xl text-[#c8c8d4]"
                }`}
              >
                {stmt.text}
              </p>
            </motion.div>
          ))}

          {/* Organiser credit — secondary gray text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-sm sm:text-base text-[#7a7a8c] leading-relaxed pt-4 border-t border-white/6"
          >
            Proudly organised by the{" "}
            <span className="text-[#e5e5e5] font-semibold">
              AWS Student Builder Group, JDIET
            </span>{" "}
            — with a vision to build a stronger cloud community across Yavatmal
            and the Vidarbha region.
          </motion.p>
        </div>

        {/* Bottom thin divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-20 md:mt-28 h-px bg-white/8 max-w-4xl mx-auto origin-left"
        />
      </div>
    </section>
  );
}
