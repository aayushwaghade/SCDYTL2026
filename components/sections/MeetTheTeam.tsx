"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

// ─── Team Data ─────────────────────────────────────────────────────────────────

interface TeamMember {
  name: string;
  role: string;
  linkedin: string;
  photo?: string;
}

// Group A — Leader + Dept Leads (8 people → 2 rows × 4 cols)
const GROUP_A: TeamMember[] = [
  { name: "Pranav Shinde",     role: "Leader & Organizer",                          linkedin: "#", photo: "/team/pranav-shinde.jpg" },
  { name: "Purvesh Upasni",    role: "Technical Lead & Assistant Organizer",         linkedin: "#", photo: "/team/purvesh-upasni.jpg" },
  { name: "Tushar Dagwar",     role: "Event Management Lead & Assistant Organizer",  linkedin: "#", photo: "/team/tushar-dagwar.jpg" },
  { name: "Arushi Gode",       role: "Web Development Lead",                         linkedin: "#", photo: "/team/arushi-gode.jpg" },
  { name: "Yathayat Ramdale",  role: "Certification Lead",                           linkedin: "#", photo: "/team/yathayat-ramdale.jpg" },
  { name: "Zubair Khan",       role: "Media & Publicity Lead",                       linkedin: "#", photo: "/team/zubair-khan.jpg" },
  { name: "Sreejith Deshmukh", role: "Content & Graphics Lead",                      linkedin: "#", photo: "/team/sreejith-deshmukh.jpg" },
  { name: "Ayush Vagade",      role: "Graphics & Design Lead",                       linkedin: "#", photo: "/team/ayush-vagade.jpg" },
];

// Group B — Co-Leads + Event Sub-Coordinators + Executive Members (15 people → 4 cols)
// Sarika Ballal is first among Executive Members.
const GROUP_B: TeamMember[] = [
  // Co-Leads
  { name: "Shrived Chavare",   role: "Content & Graphics Co-Lead",   linkedin: "#", photo: "/team/shrived-chavare.jpg" },
  { name: "Chaitanya Satao",   role: "Web Development Co-Lead",       linkedin: "#", photo: "/team/chaitanya-satao.jpg" },
  { name: "Piyush Bhedarkar",  role: "Graphics & Design Co-Lead",     linkedin: "#", photo: "/team/piyush-bhedarkar.jpg" },

  // Event Sub-Coordinators
  { name: "Dhruvi Suchak",     role: "Event Sub-Coordinator",         linkedin: "#", photo: "/team/dhruvi-suchak.jpg" },
  { name: "Vinayak Maske",     role: "Event Sub-Coordinator",         linkedin: "#", photo: "/team/vinayak-maske.jpg" },
  { name: "Piyush Palan",      role: "Event Sub-Coordinator",         linkedin: "#", photo: "/team/piyush-palan.jpg" },

  // Executive Members — Sarika Ballal is first
  { name: "Sarika Ballal",     role: "Executive Member",              linkedin: "#", photo: "/team/sarika-ballal.jpg" },
  { name: "Vallabh Mahure",    role: "Executive Member",              linkedin: "#", photo: "/team/vallabh-mahure.jpg" },
  { name: "Laxmi Vakhekar",    role: "Executive Member",              linkedin: "#", photo: "/team/laxmi-vakhekar.jpg" },
  { name: "Sonal Dahi",        role: "Executive Member",              linkedin: "#", photo: "/team/sonal-dahi.jpg" },
  { name: "Bilal Ahmad",       role: "Executive Member",              linkedin: "#", photo: "/team/bilal-ahmad.jpg" },
  { name: "Shreya Vakode",     role: "Executive Member",              linkedin: "#", photo: "/team/shreya-vakode.jpg" },
  { name: "Tanmay Rathod",     role: "Executive Member",              linkedin: "#", photo: "/team/tanmay-rathod.jpg" },
  { name: "Sanjivani",         role: "Executive Member",              linkedin: "#", photo: "/team/sanjivani.jpg" },
  { name: "Naina",             role: "Executive Member",              linkedin: "#", photo: "/team/naina.jpg" },
];


// ─── Person Silhouette ─────────────────────────────────────────────────────────
// Fills its parent circle container via CSS — scales automatically.

function PersonSilhouette() {
  return (
    <svg
      className="w-[62%] h-[62%]"
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
    >
      {/* Head */}
      <circle cx="40" cy="28" r="18" fill="#2a2a36" />
      {/* Shoulders / body */}
      <ellipse cx="40" cy="68" rx="28" ry="20" fill="#2a2a36" />
    </svg>
  );
}

// ─── Flip Card ─────────────────────────────────────────────────────────────────
// Only the circular photo flips — card container, name, and role are STATIC.

function FlipCard({ member, index }: { member: TeamMember; index: number }) {
  const [flipped, setFlipped]     = useState(false);
  // Falls back to silhouette when the image file doesn't exist yet.
  const [imgError, setImgError]   = useState(false);
  const showPhoto = member.photo && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04, ease: [0.16, 1, 0.3, 1] }}
      // Card — content-sized (not aspect-square), no border, flat dark surface
      className="w-full flex flex-col items-center rounded-xl px-3 pt-5 pb-4 cursor-pointer select-none"
      style={{ background: "#0d0d11" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      aria-label={member.name}
    >
      {/* ── Circle flip container ─────────────────────────────────────────── */}
      {/* w-[72%] means the circle is ~72% of the card width — dominant element */}
      <div
        className="w-[72%] aspect-square relative"
        style={{ perspective: "700px" }}
      >
        {/* Inner wrapper — ONLY this rotates */}
        <div
          className="absolute inset-0 transition-transform ease-out"
          style={{
            transitionDuration: "0.5s",
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front face — photo / silhouette */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              background:
                "radial-gradient(circle at 40% 35%, rgba(74,26,18,0.5) 0%, rgba(14,14,20,0.96) 70%)",
            }}
          >
            {showPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <PersonSilhouette />
            )}
          </div>

          {/* Back face — LinkedIn icon, entire circle is the link */}
          <a
            href={member.linkedin !== "#" ? member.linkedin : undefined}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "#3a1410",
            }}
            aria-label={`LinkedIn — ${member.name}`}
          >
            <FaLinkedin className="text-white w-8 h-8 opacity-90" />
          </a>
        </div>
      </div>

      {/* ── Name + Role — static, anchored tight below the circle ─────────── */}
      <div className="text-center mt-3 w-full px-1">
        <p className="font-extrabold text-white uppercase tracking-wide text-[13px] leading-tight">
          {member.name}
        </p>
        <p className="text-[#ff9900] font-bold text-[10px] leading-snug mt-0.5 line-clamp-2">
          {member.role}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Thin group separator ──────────────────────────────────────────────────────

function GroupSeparator() {
  return <div className="h-px w-full bg-white/[0.05] my-3" />;
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function MeetTheTeam() {
  return (
    <section
      id="team"
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
    >
      {/* Ambient glow — decorative */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[560px] h-[240px] pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(58,20,16,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Section heading ── */}
        <div className="text-center mb-14 md:mb-18">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-black text-white uppercase leading-none tracking-[-0.03em]"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            ORGANIZING TEAM
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15, ease: "easeOut" }}
            className="mt-5 mx-auto h-px w-14 bg-white/20 origin-left"
          />
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="mt-5 text-[#7a7a8c] text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
          >
            The people behind AWS Student Community Day Yavatmal 2026.
          </motion.p>
        </div>

        {/* ── Group A — Leader + Dept Leads : 8 people, 2 rows × 4 cols ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
          {GROUP_A.map((member, i) => (
            <FlipCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Very thin separator between the two groups */}
        <GroupSeparator />

        {/* ── Group B — Co-Leads + Sub-Coords + Exec : 14 people, 4 cols ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 md:gap-3">
          {GROUP_B.map((member, i) => (
            <FlipCard key={member.name} member={member} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
