"use client";

import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface Partner {
  name: string;
  logo: string;
}

const PARTNERS: Partner[] = [
  {
    name: "AWS User Group Nagpur",
    logo: "/images/Community Partners logos/aws_user_group_nagpur_logo.jpg",
  },
  {
    name: "AWS User Group Pune",
    logo: "/images/Community Partners logos/aws_user_group_pune_logo.jpg",
  },
  {
    name: "AWS Student Builder Group SIPNA",
    logo: "/images/Community Partners logos/ChatGPT Image Jul 7, 2026, 11_05_54 PM.png",
  },
  {
    name: "AWS Student Builder Group PRMITR",
    logo: "/images/Community Partners logos/WhatsApp Image 2026-07-07 at 11.02.18 PM.jpeg",
  },
];

interface PartnerTileProps {
  partner: Partner;
  index: number;
}

function PartnerTile({ partner, index }: PartnerTileProps) {
  const reveal20 = useScrollReveal({ opacity: 0, y: 20 });

  return (
    <motion.div
      {...reveal20}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center gap-3.5 w-full group"
    >
      {/* White background logo tile */}
      <div
        className="h-28 sm:h-32 w-full rounded-2xl overflow-hidden flex items-center justify-center bg-white transition-all duration-300 relative cursor-pointer group-hover:scale-[1.03] group-hover:shadow-[0_0_20px_rgba(255,153,0,0.18)]"
      >
        <div className="w-[72%] h-[60%] flex items-center justify-center relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={partner.logo}
            alt={partner.name}
            className="max-w-full max-h-full object-contain filter group-hover:brightness-105 transition-all duration-300"
            draggable={false}
          />
        </div>
      </div>
      {/* Label beneath the logo */}
      <span className="text-xs sm:text-[13px] font-bold text-[#c8c8d4] text-center px-1 leading-snug group-hover:text-white transition-colors duration-300">
        {partner.name}
      </span>
    </motion.div>
  );
}

export function CommunityPartners() {
  const reveal18 = useScrollReveal({ opacity: 0, y: 18 });
  const reveal10 = useScrollReveal({ opacity: 0, y: 10 });
  return (
    <section
      id="community-partners"
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
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

        {/* ── Heading ── */}
        <motion.h2
          {...reveal18}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4"
        >
          Friends across the ecosystem
        </motion.h2>

        {/* ── Subtitle ── */}
        <motion.p
          {...reveal10}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-sm sm:text-base text-[#a1a1b2] mb-14 md:mb-16 max-w-lg mx-auto leading-relaxed"
        >
          User groups and communities helping us spread the word.
        </motion.p>

        {/* ── Partner logo grid — 2 cols mobile, 4 cols desktop ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-5">
          {PARTNERS.map((partner, i) => (
            <PartnerTile key={partner.name} partner={partner} index={i} />
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.p
          {...reveal10}
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

export default CommunityPartners;
