"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { ArrowUpRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Speaker } from "@/data/speakers";
import { GlassCard } from "./GlassCard";

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
}

export function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Pick glow colors based on index or category
  const glowColors: Array<"purple" | "orange" | "pink"> = ["purple", "orange", "pink"];
  const selectedGlow = glowColors[index % glowColors.length];

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="h-full"
    >
      <GlassCard 
        glowColor={selectedGlow} 
        className="flex flex-col h-full p-5 sm:p-6 group relative rounded-2xl border border-white/5 bg-card/45 hover:bg-card/75 transition-all duration-300 hover:border-white/10"
      >
        {/* Profile Image & Category Tag */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5 border border-white/10 bg-white/5">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            unoptimized={true}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          {/* Category Tag overlay */}
          <div className="absolute top-3 left-3 z-20">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-[10px] font-bold tracking-wider bg-near-black/85 text-aws-orange border border-aws-orange/30 uppercase backdrop-blur-sm">
              {speaker.sessionCategory}
            </span>
          </div>
        </div>

        {/* Text Details */}
        <div className="flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-foreground group-hover:text-aws-orange transition-colors duration-300 line-clamp-1">
            {speaker.name}
          </h3>
          <p className="text-xs font-semibold text-purple-300 mt-0.5 line-clamp-1">
            {speaker.designation}
          </p>
          <p className="text-[11px] text-muted-foreground/80 mt-1 line-clamp-1">
            {speaker.company}
          </p>

          {/* Session Topic (sessionTitle) */}
          <div className="mt-4 pt-3 border-t border-white/5 mb-5 flex-grow">
            <span className="text-[9px] text-muted-foreground/60 font-bold uppercase tracking-wider block mb-1">Session Topic</span>
            <p className="text-xs text-foreground/90 font-medium line-clamp-2 leading-relaxed">
              {speaker.sessionTitle}
            </p>
          </div>

          {/* LinkedIn Button at the bottom */}
          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-white/5 hover:bg-[#0a66c2]/90 text-white border border-white/10 hover:border-transparent transition-all duration-300 group/btn shadow-sm cursor-pointer"
              aria-label={`Connect with ${speaker.name} on LinkedIn`}
            >
              <FaLinkedin className="w-4 h-4 text-muted-foreground group-hover/btn:text-white transition-colors duration-300" />
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-all duration-300" />
            </a>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}
