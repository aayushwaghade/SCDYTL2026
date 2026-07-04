"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { Sparkles, ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Speaker } from "@/data/speakers";

interface FeaturedSpeakerCardProps {
  speaker: Speaker;
  onViewProfile: (speaker: Speaker) => void;
  index: number;
}

export function FeaturedSpeakerCard({ speaker, onViewProfile, index }: FeaturedSpeakerCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Color schemes based on index or category
  const themeGradients = [
    "from-aws-orange via-purple-primary to-pink-primary",
    "from-purple-primary via-pink-primary to-indigo-primary",
    "from-indigo-primary via-aws-orange to-purple-primary"
  ];
  const borderGradient = themeGradients[index % themeGradients.length];

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
      className="group relative w-full rounded-2xl p-[1.5px] overflow-hidden transition-all duration-300"
    >
      {/* Animated Glowing Gradient Border (Apple/AWS Event style) */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${borderGradient} bg-[length:200%_200%] opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
        style={shouldReduceMotion ? {} : {
          animation: "shimmerBorder 4s linear infinite"
        }}
      />
      
      {/* Core Card Content with Glassmorphism */}
      <div className="relative z-10 w-full h-full rounded-[15px] bg-card/85 backdrop-blur-xl border border-white/5 p-6 sm:p-8 flex flex-col items-center text-center">
        {/* Large Circular Image Wrapper */}
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full mb-6 group-hover:scale-105 transition-transform duration-500 ease-out">
          {/* Inner ring gradient border */}
          <div className={`absolute -inset-1.5 rounded-full bg-gradient-to-tr ${borderGradient} opacity-70 group-hover:opacity-100 transition-opacity duration-300 blur-[2px]`} />
          <div className="absolute -inset-1 rounded-full bg-near-black" />
          
          <div className="w-full h-full rounded-full overflow-hidden relative border-2 border-white/10">
            <Image
              src={speaker.image}
              alt={speaker.name}
              fill
              unoptimized={true} // Bypasses Next.js remote pattern requirements
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Online Indicator Glow */}
          <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-[#10b981] border-2 border-near-black shadow-[0_0_12px_#10b981] z-20 flex items-center justify-center">
            <span className="absolute w-full h-full bg-[#10b981] rounded-full animate-ping opacity-75" />
          </div>
        </div>

        {/* Tag / Category */}
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-semibold tracking-wider text-aws-orange uppercase mb-3">
          <Sparkles className="w-3 h-3 text-aws-orange" />
          {speaker.sessionCategory}
        </span>

        {/* Profile Info */}
        <h3 className="text-2xl font-extrabold text-foreground group-hover:text-aws-orange transition-colors duration-300 mb-1">
          {speaker.name}
        </h3>
        <p className="text-sm font-medium text-purple-300 mb-3">
          {speaker.designation} <span className="text-muted-foreground/60">at</span> <span className="text-white font-semibold">{speaker.company}</span>
        </p>

        {/* Session Abstract Box */}
        <div className="w-full bg-white/5 rounded-xl border border-white/5 p-4 mb-6 group-hover:bg-white/10 transition-colors duration-300 flex-grow flex flex-col justify-center">
          <span className="text-[10px] text-muted-foreground font-bold tracking-widest uppercase block mb-1">Session Topic</span>
          <p className="text-sm text-foreground/90 font-semibold line-clamp-2 leading-relaxed">
            {speaker.sessionTitle}
          </p>
        </div>

        {/* Action Buttons & Socials */}
        <div className="w-full flex items-center justify-between mt-auto pt-4 border-t border-white/5 gap-4">
          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {speaker.linkedin && (
              <a
                href={speaker.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-aws-orange hover:bg-white/10 hover:border-aws-orange/30 transition-all duration-300"
                aria-label={`${speaker.name} LinkedIn Profile`}
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
            )}
            {speaker.twitter && (
              <a
                href={speaker.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-aws-orange hover:bg-white/10 hover:border-aws-orange/30 transition-all duration-300"
                aria-label={`${speaker.name} Twitter Profile`}
              >
                <FaTwitter className="w-4 h-4" />
              </a>
            )}
            {speaker.github && (
              <a
                href={speaker.github}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-aws-orange hover:bg-white/10 hover:border-aws-orange/30 transition-all duration-300"
                aria-label={`${speaker.name} GitHub Profile`}
              >
                <FaGithub className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* View Profile Button */}
          <button
            onClick={() => onViewProfile(speaker)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-white/5 hover:bg-aws-orange hover:text-near-black text-white border border-white/10 hover:border-transparent transition-all duration-300 cursor-pointer shadow-sm group/btn"
          >
            View Profile
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>
        </div>
      </div>

      {/* Tailwind v4 animation rule inject fallback style */}
      <style jsx global>{`
        @keyframes shimmerBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </motion.div>
  );
}
