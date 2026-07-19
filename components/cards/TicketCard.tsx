"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { Ticket } from "@/data/tickets";

interface TicketCardProps {
  ticket: Ticket;
  delay?: number;
}

export function TicketCard({ ticket, delay = 0 }: TicketCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const {
    id,
    name,
    price,
    badge,
    description,
    benefits,
    featured,
    buttonText,
    buttonLink,
    originalPrice,
    discountPercentage,
  } = ticket;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Determine glow colors and border gradients based on ticket type
  const isProfessional = id === "professional";
  const glowColor = featured
    ? "rgba(255, 153, 0, 0.15)"
    : isProfessional
    ? "rgba(236, 72, 153, 0.15)"
    : "rgba(139, 92, 246, 0.1)";

  const borderGlow = featured
    ? "from-aws-orange via-pink-primary to-purple-primary"
    : isProfessional
    ? "from-pink-primary via-purple-primary to-indigo-primary"
    : "from-white/10 to-white/5";

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
        delay,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={shouldReduceMotion ? {} : { y: featured ? -10 : -6, scale: featured ? 1.03 : 1.01 }}
      className={cn(
        "relative rounded-2xl p-[1px] transition-all duration-500 h-full flex flex-col",
        featured
          ? "bg-gradient-to-br from-aws-orange via-pink-primary to-purple-primary shadow-[0_20px_50px_rgba(255,153,0,0.25)] md:scale-105 z-10"
          : cn("bg-gradient-to-b", isHovered ? `bg-gradient-to-br ${borderGlow} shadow-[0_15px_30px_rgba(0,0,0,0.4)]` : "from-white/10 to-white/5")
      )}
    >
      {/* Interactive spotlight on hover */}
      {isHovered && !shouldReduceMotion && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl z-0"
          style={{
            background: `radial-gradient(280px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 80%)`,
          }}
        />
      )}

      {/* Glow Pulse for Featured Card */}
      {featured && (
        <div className="absolute inset-0 rounded-2xl bg-aws-orange/10 blur-xl animate-pulse pointer-events-none -z-10" />
      )}

      {/* Ribbon / Badge */}
      {badge && (
        <div
          className={cn(
            "absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider select-none shadow-lg z-20 flex items-center gap-1.5",
            featured
              ? "bg-gradient-to-r from-aws-orange to-pink-primary text-near-black animate-bounce"
              : isProfessional
              ? "bg-gradient-to-r from-pink-primary to-purple-primary text-white"
              : "bg-muted border border-white/10 text-muted-foreground"
          )}
        >
          {badge}
        </div>
      )}

      {/* Main card content */}
      <div
        className={cn(
          "relative z-10 glass-card bg-card/75 rounded-[15px] p-6 md:p-8 h-full flex flex-col items-stretch border-none flex-1",
          featured ? "bg-near-black/80" : ""
        )}
      >
        <div className="mb-6 mt-2">
          <h3 className="text-xl md:text-2xl font-bold text-foreground tracking-wide">{name}</h3>
          <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">{description}</p>
        </div>

        {/* Pricing */}
        <div className="flex flex-col gap-1.5 mb-6 border-b border-white/5 pb-6">
          {originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-sm line-through text-muted-foreground">{originalPrice}</span>
              {discountPercentage && (
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">{price}</span>
            <span className="text-xs text-muted-foreground">/ ticket</span>
          </div>
        </div>

        {/* Benefits list */}
        <div className="space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">What&apos;s Included:</h4>
            <ul className="space-y-2.5">
              {benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  whileHover={shouldReduceMotion ? {} : { x: 4 }}
                  className="flex items-center gap-3 text-sm text-muted-foreground cursor-default group"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-200 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="group-hover:text-foreground transition-colors duration-200">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="mt-8 pt-4 border-t border-white/5">
            <a href={buttonLink} className="block w-full">
              <Button
                variant={featured ? "premium" : isProfessional ? "premium" : "default"}
                className={cn(
                  "w-full group/btn relative overflow-hidden transition-all duration-300 rounded-xl py-5 text-sm font-bold shadow-lg cursor-pointer",
                  featured
                    ? "shadow-aws-orange/10 hover:shadow-aws-orange/20"
                    : isProfessional
                    ? "shadow-purple-primary/10 hover:shadow-purple-primary/20"
                    : "shadow-white/5 hover:shadow-white/10"
                )}
              >
                <span>{buttonText}</span>
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
