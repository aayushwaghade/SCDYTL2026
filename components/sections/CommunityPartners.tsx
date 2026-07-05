"use client";

import React from "react";
import { motion } from "framer-motion";

// ─── Partner slots — add logo images here when ready ──────────────────────────
// 6 empty placeholder tiles in a 3-column grid (2 visible rows, matching the
// reference layout). Add more slots to extend the grid as partners join.

const PARTNER_SLOTS = [
  { id: "cp-1" },
  { id: "cp-2" },
  { id: "cp-3" },
  { id: "cp-4" },
  { id: "cp-5" },
  { id: "cp-6" },
];

// ─── Partner Logo Tile ──────────────────────────────────────────────────────────
// Matches the Sponsors tile treatment: white card, slightly darker inner area
// for the logo placeholder, rounded corners, no border.

function PartnerTile({ id: _id, index }: { id: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="h-28 sm:h-32 w-full rounded-2xl overflow-hidden flex items-center justify-center"
      style={{ background: "#ffffff" }}
    >
      {/* Slightly darker inner area — logo image goes here */}
      <div
        className="w-[72%] h-[60%] rounded-lg flex items-center justify-center"
        style={{ background: "#ebebeb" }}
      >
        {/* Logo image will be placed here */}
      </div>
    </motion.div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────────────────

export function CommunityPartners() {
  return (
    <section
      id="community-partners"
      className="relative py-20 md:py-28 lg:py-32 overflow-hidden"
    >
      {/* Subtle top divider to visually separate from Sponsors */}
      <div className="absolute top-0 inset-x-0 h-px bg-white/[0.05]" />

      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* ── Top badge ── */}
        <div className="flex justify-center mb-6">
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border select-none"
            style={{
              borderColor: "rgba(255,153,0,0.35)",
              color: "#ff9900",
              background: "rgba(255,153,0,0.06)",
            }}
          >
            COMMUNITY PARTNERS
          </span>
        </div>

        {/* ── Heading — exact text from reference ── */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4"
        >
          Friends across the ecosystem
        </motion.h2>

        {/* ── Subtitle — "reach out" email line removed as requested ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-sm sm:text-base text-[#a1a1b2] mb-14 md:mb-16 max-w-lg mx-auto leading-relaxed"
        >
          User groups and communities helping us spread the word. Want to be listed?
        </motion.p>

        {/* ── Partner logo grid — 3 columns ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
          {PARTNER_SLOTS.map((slot, i) => (
            <PartnerTile key={slot.id} id={slot.id} index={i} />
          ))}
        </div>

        {/* ── CTA — no email, just a contact nudge ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-[#7a7a8c] mt-12 md:mt-14"
        >
          Want your community listed?{" "}
          <a
            href="mailto:awsclubs.jdiet@gmail.com"
            className="text-[#ff9900] hover:underline transition-colors font-semibold"
          >
            Get in touch →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
