"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useIsTouch } from "@/hooks/useIsTouch";
import { TEAM_MEMBERS } from "@/data/team";
import { ProfileCard } from "@/components/cards/ProfileCard";

export function MeetTheTeam() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const [pinnedMember, setPinnedMember] = useState<string | null>(null);
  const reveal20 = useScrollReveal({ opacity: 0, y: 20 });
  const reveal8 = useScrollReveal({ opacity: 0, y: 8 });
  const isTouch = useIsTouch();

  // Keyboard navigation support: Close pinned card on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setPinnedMember(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Document tap event: Close pinned card when tapping outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.closest("#team")) {
        return;
      }
      setPinnedMember(null);
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <section
      id="team"
      className="relative pt-20 md:pt-28 lg:pt-36 pb-0 overflow-hidden bg-[#030303]"
    >
      {/* Scoped styles block */}
      <style dangerouslySetInnerHTML={{ __html: `
        .photo-glow {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.45), 0 0 40px rgba(236, 72, 153, 0.25);
          border-color: rgba(168, 85, 247, 0.4);
        }
        .text-glow-gradient {
          background: linear-gradient(135deg, #ffffff 30%, rgba(255, 255, 255, 0.7) 70%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}} />

      {/* Decorative backdrop glow */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[560px] h-[240px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(168,85,247,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-14 md:mb-18">
          <motion.h2
            {...reveal20}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="font-black text-white uppercase leading-none tracking-[-0.03em] text-glow-gradient"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 5rem)" }}
          >
            ORGANIZING TEAM
          </motion.h2>
          <motion.div
            initial={isTouch ? { scaleX: 1 } : { scaleX: 0 }}
            animate={isTouch ? { scaleX: 1 } : undefined}
            whileInView={isTouch ? undefined : { scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="mt-5 mx-auto h-px w-14 bg-white/20 origin-left"
          />
          <motion.p
            {...reveal8}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-5 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            Led by Pranav Shinde, the AWS Student Builder Group Leader and Captain of AWS Cloud Club JDIET, our dedicated team at JDIET Yavatmal is proud to organize the first-ever AWS Student Community Day Yavatmal 2026.
          </motion.p>
        </div>

        {/* Continuous Grid for all 29 Team Members */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
          {TEAM_MEMBERS.map((member, i) => (
            <ProfileCard
              key={member.name}
              id={`team-${i}`}
              image={member.photo}
              name={member.name}
              role={member.role}
              bio={member.bio}
              socials={{
                linkedin: member.linkedin,
                instagram: member.instagram,
              }}
              variant="team"
              index={i}
              hoveredMember={hoveredMember}
              setHoveredMember={setHoveredMember}
              pinnedMember={pinnedMember}
              setPinnedMember={setPinnedMember}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MeetTheTeam;
