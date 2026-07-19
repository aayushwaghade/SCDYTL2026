"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Section, SectionHeader, SectionTitle, SectionDescription } from "@/components/layout/Primitives";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SPEAKERS } from "@/data/speakers";
import { ProfileCard } from "@/components/cards/ProfileCard";

const SPEAKERS_CONFIG = {
  heading: "Meet The Speakers",
  subtitle:
    "Industry experts, AWS Community Builders, Developers, AI Engineers and inspiring leaders coming together for one unforgettable day.",
} as const;

export function Speakers() {
  const [hoveredSpeaker, setHoveredSpeaker] = useState<string | null>(null);
  const [pinnedSpeaker, setPinnedSpeaker] = useState<string | null>(null);
  const reveal20 = useScrollReveal({ opacity: 0, y: 20 });

  // Keyboard navigation support: Close pinned card on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinnedSpeaker(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Document tap event: Close pinned card when tapping outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("#speakers")) {
        return;
      }
      setPinnedSpeaker(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <Section id="speakers" className="border-t border-white/5 relative z-10 bg-[#030303]">
      {/* Local scoped styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-glow-gradient {
          background: linear-gradient(135deg, #ffffff 30%, rgba(255, 255, 255, 0.7) 70%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shadow-glow-purple {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }
      `}} />

      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#ec4899]/10 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <SectionHeader align="center">
          <motion.div
            {...reveal20}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] tracking-[0.2em] font-black uppercase text-[#a855f7] mb-3 block">
              COHORT 2026
            </span>
          </motion.div>
          <motion.div
            {...reveal20}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionTitle className="text-glow-gradient font-black tracking-tighter">
              {SPEAKERS_CONFIG.heading}
            </SectionTitle>
          </motion.div>
          <motion.div
            {...reveal20}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionDescription>
              {SPEAKERS_CONFIG.subtitle}
            </SectionDescription>
          </motion.div>
        </SectionHeader>

        {/* Speaker Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
          {SPEAKERS.map((speaker, index) => (
            <ProfileCard
              key={speaker.id}
              id={speaker.id}
              image={speaker.image}
              name={speaker.name}
              role={speaker.role || ""}
              organization={speaker.company}
              bio={speaker.bio}
              description={speaker.talkDescription}
              talkTitle={speaker.talkTitle}
              talkTime={speaker.talkTime}
              isKeynote={speaker.isKeynote}
              socials={speaker.socials}
              variant="speaker"
              index={index}
              hoveredMember={hoveredSpeaker}
              setHoveredMember={setHoveredSpeaker}
              pinnedMember={pinnedSpeaker}
              setPinnedMember={setPinnedSpeaker}
            />
          ))}
        </div>

        {/* Action Section */}
        <motion.div
          {...reveal20}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <a
            href="#tickets"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-[#a855f7] hover:bg-[#a855f7]/90 hover:scale-102 hover:-translate-y-0.5 active:scale-98 transition-all duration-300 text-white shadow-glow-purple"
          >
            Reserve Your Seat
          </a>
          <a
            href="#agenda"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-full border border-white/10 hover:border-white/20 text-xs uppercase tracking-widest font-bold text-white bg-white/2 hover:bg-white/5 hover:scale-102 active:scale-98 transition-all duration-300"
          >
            View Event Schedule
          </a>
        </motion.div>
      </Container>
    </Section>
  );
}

export default Speakers;
