"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Speaker } from "@/data/speakers";

interface FeaturedSpeakerCardProps {
  speaker: Speaker;
  onViewProfile: (speaker: Speaker) => void;
  index: number;
}

export function FeaturedSpeakerCard({ speaker, onViewProfile, index }: FeaturedSpeakerCardProps) {
  const shouldReduceMotion = useReducedMotion();

  // Shimmering border colors for featured card
  const themeGradients = [
    "from-aws-orange via-purple-primary to-pink-primary",
    "from-purple-primary via-pink-primary to-indigo-primary",
    "from-indigo-primary via-aws-orange to-purple-primary"
  ];
  const borderGradient = themeGradients[index % themeGradients.length];

  // Handle clicking the LinkedIn button separately from opening the modal
  const handleLinkedInClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
      onClick={() => onViewProfile(speaker)}
      className="group relative w-full rounded-xl p-[1.5px] overflow-hidden transition-all duration-300 cursor-pointer select-none"
    >
      {/* Animated Glowing Shimmer Border */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r ${borderGradient} bg-[length:200%_200%] opacity-40 group-hover:opacity-100 transition-opacity duration-500`}
        style={shouldReduceMotion ? {} : {
          animation: "shimmerBorder 4s linear infinite"
        }}
      />
      
      {/* Core Card Content */}
      <div className="relative z-10 w-full h-full rounded-[11px] bg-[#0e0709] p-6 sm:p-8 flex flex-col items-center text-center">
        {/* Background Subtle Red Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08)_0%,transparent_70%)] pointer-events-none" />

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
        <div className="relative w-36 h-36 sm:w-40 sm:h-40 rounded-full mb-6 shrink-0 flex items-center justify-center">
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
          <h3 className="text-xl font-extrabold text-white tracking-wider uppercase mb-3 group-hover:text-aws-orange transition-colors duration-300">
            {speaker.name}
          </h3>
          
          {/* Designation and Company */}
          <p className="text-sm text-gray-300/90 leading-relaxed font-light line-clamp-3">
            {speaker.designation}
            {speaker.company && (
              <span className="block mt-1 font-semibold text-gray-400 text-xs group-hover:text-aws-orange/80 transition-colors duration-300">
                {speaker.company}
              </span>
            )}
          </p>
        </div>
      </div>

      {/* Animation rule styles */}
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
