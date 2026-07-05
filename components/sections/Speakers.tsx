"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { SPEAKERS, Speaker } from "@/data/speakers";

// ─── Speaker Card ──────────────────────────────────────────────────────────────

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center group"
    >
      {/* Photo + glow wrapper */}
      <div className="relative mb-6 w-[160px] h-[160px] sm:w-[180px] sm:h-[180px]">
        {/* Radial glow behind the circle */}
        <div
          className="absolute inset-[-20px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,102,241,0.18) 0%, rgba(139,92,246,0.10) 40%, transparent 72%)",
            filter: "blur(8px)",
          }}
        />
        {/* Circular image */}
        <div className="relative w-full h-full rounded-full overflow-hidden ring-1 ring-white/8">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            unoptimized={true}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* Name */}
      <h3 className="text-sm sm:text-base font-extrabold text-white tracking-widest uppercase leading-tight mb-2">
        {speaker.name}
      </h3>

      {/* Designation — 2-line clamp */}
      <p className="text-xs sm:text-[13px] text-[#a1a1b2] leading-relaxed line-clamp-2 max-w-[180px]">
        {speaker.designation}
      </p>

      {/* Company */}
      <p className="text-[11px] text-[#666680] mt-1 font-medium tracking-wide">
        {speaker.company}
      </p>
    </motion.div>
  );
}

// ─── Speaker Detail Modal ───────────────────────────────────────────────────────

interface SpeakerModalProps {
  speaker: Speaker;
  onClose: () => void;
}

function SpeakerModal({ speaker, onClose }: SpeakerModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 24 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative z-10 w-full max-w-xl max-h-[88vh] overflow-y-auto rounded-2xl border border-white/8 bg-[#0d0d0d] p-6 md:p-8 flex flex-col gap-6"
        style={{ scrollbarWidth: "thin" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-[#a1a1b2] hover:text-white transition-all cursor-pointer z-20"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 ring-1 ring-white/10">
            <Image
              src={speaker.image}
              alt={speaker.name}
              fill
              unoptimized={true}
              className="object-cover"
            />
          </div>

          <div className="flex-grow">
            <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-[#a1a1b2] border border-white/10 px-2.5 py-0.5 rounded mb-2">
              {speaker.sessionCategory}
            </span>
            <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              {speaker.name}
            </h4>
            <p className="text-sm font-medium text-[#a1a1b2] mt-1 leading-snug">
              {speaker.designation}
            </p>
            <p className="text-xs text-[#666680] mt-0.5">
              {speaker.company}
            </p>
            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs text-[#a1a1b2] hover:text-white transition-colors"
                aria-label={`Connect with ${speaker.name} on LinkedIn`}
              >
                <FaLinkedin className="w-3.5 h-3.5" />
                LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/6" />

        {/* Bio */}
        {speaker.bio && (
          <div className="space-y-1.5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#666680]">
              About
            </p>
            <p className="text-sm text-[#c0c0cc] leading-relaxed">
              {speaker.bio}
            </p>
          </div>
        )}

        {/* Session block */}
        <div
          className="p-4 rounded-xl border border-white/6"
          style={{ background: "#1a0b09" }}
        >
          <p className="text-[10px] font-bold tracking-widest uppercase text-[#ff9900] mb-1">
            Session
          </p>
          <h5 className="text-base font-bold text-white leading-snug">
            {speaker.sessionTitle}
          </h5>
          {speaker.sessionAbstract && (
            <p className="text-xs text-[#a1a1b2] leading-relaxed mt-2">
              {speaker.sessionAbstract}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────────────────

export function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);

  const sortedSpeakers = [...SPEAKERS].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );

  // Close modal on Escape
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedSpeaker(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      id="speakers"
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      {/* Subtle ambient glow — purely decorative, low opacity */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
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
            SPEAKERS
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
            Industry experts, AWS Heroes, and cloud architects sharing real‑world
            knowledge at AWS Student Community Day Yavatmal 2026.
          </motion.p>
        </div>

        {/* ── Speaker Grid ── */}
        <div
          className="grid gap-x-8 gap-y-16 sm:gap-y-20 lg:gap-x-12"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
        >
          {sortedSpeakers.map((speaker, index) => (
            <button
              key={speaker.id}
              onClick={() => setSelectedSpeaker(speaker)}
              className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-xl"
              aria-label={`View profile of ${speaker.name}`}
            >
              <SpeakerCard speaker={speaker} index={index} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Modal ── */}
      <AnimatePresence>
        {selectedSpeaker && (
          <SpeakerModal
            speaker={selectedSpeaker}
            onClose={() => setSelectedSpeaker(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
