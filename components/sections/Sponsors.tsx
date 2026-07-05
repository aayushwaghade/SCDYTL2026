"use client";

import React from "react";
import { motion } from "framer-motion";

// ─── Data ───────────────────────────────────────────────────────────────────────

const TIERS = [
  {
    label: "POWERED BY",
    cols: 1, // single large centered card
    slots: [{ id: "powered-1" }],
  },
  {
    label: "PLATINUM",
    cols: 3,
    slots: [
      { id: "platinum-1" },
      { id: "platinum-2" },
      { id: "platinum-3" },
    ],
  },
  {
    label: "GOLD",
    cols: 3,
    slots: [
      { id: "gold-1" },
      { id: "gold-2" },
      { id: "gold-3" },
    ],
  },
  {
    label: "SILVER",
    cols: 3,
    slots: [
      { id: "silver-1" },
      { id: "silver-2" },
      { id: "silver-3" },
    ],
  },
] as const;

// ─── Tier Divider  ──────────────────────────────────────────────────────────────
// Horizontal rule with a pill label centred on it — matches the DevSparks pattern.

function TierDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-10 md:my-12">
      <div className="flex-1 h-px bg-white/8" />
      <span
        className="text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1 rounded-full border select-none whitespace-nowrap"
        style={{
          borderColor: "rgba(255,153,0,0.35)",
          color: "#ff9900",
          background: "rgba(255,153,0,0.06)",
        }}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-white/8" />
    </div>
  );
}

// ─── Sponsor Logo Tile ──────────────────────────────────────────────────────────
// White-background rounded card with a slightly darker placeholder area inside
// where the logo image will be placed when available.

interface SponsorTileProps {
  id: string;
  large?: boolean;
  index: number;
}

function SponsorTile({ id: _id, large = false, index }: SponsorTileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className={`
        rounded-2xl overflow-hidden
        flex items-center justify-center
        ${large ? "h-36 sm:h-40 max-w-xs mx-auto w-full" : "h-28 sm:h-32 w-full"}
      `}
      style={{ background: "#ffffff" }}
    >
      {/* Slightly darker inner placeholder where the logo image will sit */}
      <div
        className="w-[80%] h-[65%] rounded-lg flex items-center justify-center"
        style={{ background: "#ebebeb" }}
      >
        {/* Logo image will go here — leave empty for now */}
      </div>
    </motion.div>
  );
}

// ─── Main Section ───────────────────────────────────────────────────────────────

export function Sponsors() {
  return (
    <section id="sponsors" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">

        {/* ── Top badge ── */}
        <div className="flex justify-center mb-6">
          <span
            className="text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border select-none"
            style={{
              borderColor: "rgba(255,255,255,0.15)",
              color: "#e5e5e5",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            SPONSORS
          </span>
        </div>

        {/* ── Section heading — exact text from reference ── */}
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-2"
        >
          Backed by the builders we look up to
        </motion.h2>

        {/* ── Tier rows ── */}
        <div>
          {TIERS.map((tier) => (
            <div key={tier.label}>
              <TierDivider label={tier.label} />

              {tier.cols === 1 ? (
                /* Single centered large tile (POWERED BY) */
                <SponsorTile id={tier.slots[0].id} large index={0} />
              ) : (
                /* Multi-column grid */
                <div
                  className="grid gap-4 sm:gap-5"
                  style={{
                    gridTemplateColumns: `repeat(${tier.cols}, minmax(0, 1fr))`,
                  }}
                >
                  {tier.slots.map((slot, i) => (
                    <SponsorTile key={slot.id} id={slot.id} index={i} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── CTA footer text ── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-[#7a7a8c] mt-14 md:mt-16"
        >
          Interested in sponsoring?{" "}
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
