"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Speaker } from "@/data/speakers";

interface SpeakerCardProps {
  speaker: Speaker;
  index: number;
  onViewProfile: (speaker: Speaker) => void;
}

export function SpeakerCard({ speaker, index, onViewProfile }: SpeakerCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Handle clicking the LinkedIn button separately from opening the modal
  const handleLinkedInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 25 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.01 }}
      onClick={() => onViewProfile(speaker)}
      className="group relative flex flex-col h-full p-6 bg-[#0e0709] border border-[#2a1114] hover:border-red-900/60 rounded-xl transition-all duration-300 shadow-xl overflow-hidden cursor-pointer select-none text-center"
    >
      {/* Background Subtle Red Radial Glow behind the image */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Floating Glassmorphic LinkedIn Button */}
      {speaker.linkedin && (
        <a
          href={speaker.linkedin}
          target="_blank"
          rel="noreferrer"
          onClick={handleLinkedInClick}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-[#0a66c2] hover:border-transparent flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 backdrop-blur-md shadow-lg"
          aria-label={`Connect with ${speaker.name} on LinkedIn`}
        >
          <FaLinkedin className="w-4 h-4" />
        </a>
      )}

      {/* Centered Circular Speaker Image Container */}
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full mx-auto mb-6 shrink-0 flex items-center justify-center">
        {/* Deep Blue Circular Background */}
        <div className="absolute inset-0 rounded-full bg-[#16274e] border border-white/5 shadow-inner" />
        
        {/* Circular image overlay */}
        <div className="w-[92%] h-[92%] rounded-full overflow-hidden relative z-10">
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            unoptimized={true}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* Speaker Info Text Details */}
      <div className="flex flex-col flex-grow justify-start">
        {/* Name in all-caps, white, bold, tracking-wider */}
        <h3 className="text-lg font-extrabold text-white tracking-wider uppercase mb-3 group-hover:text-aws-orange transition-colors duration-300">
          {speaker.name}
        </h3>
        
        {/* Designation and Company */}
        <p className="text-xs text-gray-300/90 leading-relaxed font-light line-clamp-3">
          {speaker.designation}
          {speaker.company && (
            <span className="block mt-1 font-semibold text-gray-400 text-[11px] group-hover:text-aws-orange/80 transition-colors duration-300">
              {speaker.company}
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
