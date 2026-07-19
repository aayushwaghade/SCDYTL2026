"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { X } from "lucide-react";

interface OrbitCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  onClose?: () => void;
  isPinned?: boolean;
}

export function OrbitCard({ title, description, icon: Icon, onClose, isPinned = false }: OrbitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 15 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[320px] p-5 rounded-2xl border border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl shadow-2xl z-40 text-left"
      style={{
        boxShadow: "0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(168, 85, 247, 0.15)",
      }}
    >
      {/* Glow gradient accent border */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-40"
        style={{
          border: "1px solid transparent",
          backgroundImage: "linear-gradient(135deg, rgba(168,85,247,0.4) 0%, rgba(255,153,0,0.3) 100%)",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          maskComposite: "exclude",
        }}
      />

      <div className="flex items-start gap-4">
        {/* Glowing Icon container */}
        <div 
          className="p-2.5 rounded-xl bg-gradient-to-br from-[#a855f7]/15 to-[#ff9900]/10 border border-[#a855f7]/20 text-[#a855f7] shrink-0"
        >
          <Icon className="w-5 h-5 text-aws-orange" />
        </div>

        {/* Text Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1.5">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">
              {title}
            </h4>
            {isPinned && onClose && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label="Close pinned details"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <p className="text-[11.5px] text-gray-400 leading-relaxed font-normal">
            {description}
          </p>
        </div>
      </div>

      {isPinned && (
        <div className="mt-3 pt-2.5 border-t border-white/5 flex justify-between items-center text-[9px] font-black uppercase tracking-wider text-aws-orange/80">
          <span>Pinned State</span>
          <span className="text-[8px] text-muted-foreground lowercase normal-case">press ESC or ✕ to close</span>
        </div>
      )}
    </motion.div>
  );
}
