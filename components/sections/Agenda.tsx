"use client";

import React from "react";
import { motion } from "framer-motion";

// ─── Data ───────────────────────────────────────────────────────────────────────

interface AgendaItem {
  time: string;
  title: string;
  tag?: string; // optional session-type label, e.g. "Keynote Address"
}

const AGENDA_ITEMS: AgendaItem[] = [
  {
    time: "09:00 AM",
    title: "Registrations & Welcome Kit Distribution",
  },
  {
    time: "10:00 AM",
    title: "Next-Gen Dev with AWS GenAI",
    tag: "Keynote Address",
  },
  {
    time: "10:45 AM",
    title: "Serverless Solutions at Scale",
  },
  {
    time: "11:30 AM",
    title: "Agentic AI & Super Agents: Next-Gen AI Infrastructure",
  },
  {
    time: "12:15 PM",
    title: "Navigating an AI-Driven World: Thinking Beyond Coding",
    tag: "Talk",
  },
  {
    time: "01:00 PM",
    title: "Lunch & Networking Break",
  },
  {
    time: "02:00 PM",
    title: "Embedding AI into Enterprise Service Delivery Operating Models",
    tag: "Talk",
  },
  {
    time: "02:45 PM",
    title: "Building Intelligent Applications with Snowflake and AWS",
  },
  {
    time: "03:30 PM",
    title: "The Power of Open-Weight Models in Enterprise AI",
    tag: "Talk",
  },
  {
    time: "04:15 PM",
    title: "Lessons from Scaling Swiggy and Building the Future of Search",
    tag: "Panel Discussion",
  },
  {
    time: "05:00 PM",
    title: "Scaling AWS Developer Communities and Ecosystems",
  },
  {
    time: "05:45 PM",
    title: "Closing Ceremony & Networking",
    tag: "Closing",
  },
];

// ─── AgendaItem Row ─────────────────────────────────────────────────────────────

function AgendaRow({ item, index }: { item: AgendaItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-stretch min-h-[80px] sm:min-h-[90px] rounded-sm mb-3"
      style={{
        background: "#161412",
        borderLeft: "3px solid rgba(255, 153, 0, 0.85)",
      }}
    >
      {/* Time column */}
      <div className="flex items-center justify-center px-5 sm:px-8 shrink-0 w-[120px] sm:w-[160px]">
        <span className="text-base sm:text-xl font-black text-white tracking-tight tabular-nums whitespace-nowrap">
          {item.time}
        </span>
      </div>

      {/* Thin vertical divider */}
      <div className="w-px self-stretch bg-white/10 shrink-0" />

      {/* Content column */}
      <div className="flex flex-col justify-center px-5 sm:px-8 py-4 flex-1 min-w-0">
        {/* Optional tag pill */}
        {item.tag && (
          <span className="inline-block self-start text-[10px] font-bold tracking-widest uppercase text-[#8a8a9a] border border-white/10 rounded-full px-2.5 py-0.5 mb-2">
            {item.tag}
          </span>
        )}

        {/* Session title + underline accent */}
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight leading-snug">
            {item.title}
          </h3>
          {/* Thin underline */}
          <div className="mt-2 h-px w-12 bg-white/20" />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────────────────

export function Agenda() {
  return (
    <section
      id="agenda"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div
        className="absolute top-0 right-1/4 w-[500px] h-[300px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,153,0,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Heading ── */}
        <div className="text-center mb-20 md:mb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.5rem,8vw,6rem)] font-black text-white tracking-[-0.03em] uppercase leading-none"
          >
            AGENDA
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-6 mx-auto h-px w-16 bg-white/20 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-[#a1a1b2] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            A full-day lineup of keynotes, deep-dives, and networking — all on the
            AWS Student Community Day Yavatmal 2026 stage.
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div className="max-w-4xl mx-auto">
          {AGENDA_ITEMS.map((item, index) => (
            <AgendaRow key={`${item.time}-${index}`} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
