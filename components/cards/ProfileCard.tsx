"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";
import { Globe } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export interface ProfileCardProps {
  id: string;
  image?: string;
  name: string;
  role: string;
  organization?: string;
  bio?: string;
  description?: string; // Used for talk description or abstract
  talkTitle?: string;
  talkTime?: string;
  isKeynote?: boolean;
  socials?: {
    linkedin?: string;
    instagram?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
  variant?: "team" | "speaker";
  index: number;
  hoveredMember: string | null;
  setHoveredMember: (name: string | null) => void;
  pinnedMember: string | null;
  setPinnedMember: (name: string | null) => void;
}

function PersonSilhouette() {
  return (
    <svg
      viewBox="0 0 80 80"
      className="w-full h-full text-white/10 Gpu"
      fill="currentColor"
    >
      <circle cx="40" cy="28" r="16" fill="#1f1f2e" />
      <ellipse cx="40" cy="68" rx="28" ry="20" fill="#2a2a36" />
    </svg>
  );
}

export function ProfileCard({
  image,
  name,
  role,
  organization,
  bio,
  description,
  talkTitle,
  talkTime,
  isKeynote = false,
  socials,
  variant = "team",
  index,
  hoveredMember,
  setHoveredMember,
  pinnedMember,
  setPinnedMember,
}: ProfileCardProps) {
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const revealProps = useScrollReveal({ opacity: 0, y: 14 });

  const showPhoto = image && !imgError;
  const isHovered = hoveredMember === name;
  const isPinned = pinnedMember === name;
  const isActive = isHovered || isPinned;
  
  const isAnyActive = hoveredMember !== null || pinnedMember !== null;
  const isDimmed = isAnyActive && !isActive;

  const [renderExpandedHeight, setRenderExpandedHeight] = useState(false);

  // Height transition synchronization to prevent layout snapping
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setRenderExpandedHeight(true);
      }, 0);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setRenderExpandedHeight(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleCardClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.stopPropagation();
    if (isPinned) {
      setPinnedMember(null);
    } else {
      setPinnedMember(name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCardClick(e);
    } else if (e.key === "Escape") {
      setPinnedMember(null);
    }
  };

  // Determine appropriate card heights based on section variant requirements
  const compactHeight = 210;
  const expandedHeight = variant === "speaker" ? 385 : 360;

  return (
    <motion.div
      {...revealProps}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ 
        duration: 0.4, 
        delay: (index % 8) * 0.04, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      }}
      className="relative w-full outline-none focus-visible:ring-2 focus-visible:ring-purple-primary rounded-2xl"
      style={{ height: `${compactHeight}px` }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        if (window.innerWidth >= 768) {
          setHoveredMember(name);
        }
      }}
      onMouseLeave={() => {
        if (window.innerWidth >= 768) {
          setHoveredMember(null);
        }
      }}
      onClick={(e) => {
        handleCardClick(e);
      }}
      role="button"
      aria-haspopup="dialog"
      aria-expanded={isActive}
      aria-label={`${name}, ${role} at ${organization || "SCD Yavatmal"}. Expand details.`}
    >
      {/* Absolute positioning container overlays neighbor cards elegantly during scale transformations */}
      <div
        ref={cardRef}
        className={`absolute top-0 inset-x-0 z-10 transition-all duration-300 rounded-2xl flex flex-col items-center p-5 select-none ${
          isDimmed ? "opacity-60 blur-[0.5px]" : "opacity-100"
        } ${isActive ? "z-30 pointer-events-auto cursor-default shadow-2xl" : "z-10 cursor-pointer"}`}
        style={{
          height: `${renderExpandedHeight ? expandedHeight : compactHeight}px`,
        }}
      >
        {/* GPU Accelerated Morphing Background Card */}
        <motion.div
          initial="compact"
          animate={isActive ? "expanded" : "compact"}
          variants={{
            compact: {
              scaleY: compactHeight / expandedHeight,
              filter: "brightness(1)",
              boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
            },
            expanded: {
              scaleY: 1,
              filter: "brightness(1.05)",
              boxShadow: variant === "speaker" 
                ? "0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.18)"
                : "0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(168,85,247,0.15)",
            },
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="absolute inset-0 bg-[#0d0d11] rounded-2xl border border-white/5 z-0 origin-top pointer-events-none"
        />

        {/* Card Content Layer - Centered with no scale distortion */}
        <div className="relative z-10 w-full flex flex-col items-center">
          {/* Profile Circular Image wrapper */}
          <motion.div
            animate={{ scale: isActive ? 1.05 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`w-[72%] max-w-[95px] aspect-square relative rounded-full overflow-hidden flex items-center justify-center border border-transparent transition-all duration-300 ${
              isActive ? "photo-glow shadow-2xl" : ""
            }`}
            style={{
              background: "radial-gradient(circle at 40% 35%, rgba(74,26,18,0.5) 0%, rgba(14,14,20,0.96) 70%)",
            }}
          >
            {showPhoto ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover select-none pointer-events-none"
                style={{ textIndent: "-9999px" }}
                onError={() => setImgError(true)}
                draggable={false}
              />
            ) : (
              <PersonSilhouette />
            )}
          </motion.div>

          {/* Keynote Tag (Speaker specific) */}
          {variant === "speaker" && isKeynote && (
            <div className="absolute top-0 right-0 z-20 px-2 py-0.5 rounded-full border border-[#a855f7]/20 text-[8px] font-black text-white uppercase tracking-wider bg-[#a855f7]/20 backdrop-blur-md">
              KEYNOTE
            </div>
          )}

          {/* Name & Role block */}
          <div className="text-center mt-3.5 w-full px-1">
            <h3 className="font-extrabold text-white uppercase tracking-wide text-[13px] leading-tight">
              {name}
            </h3>
            {role && (
              <p className="text-[#ff9900] font-bold text-[9.5px] leading-snug mt-0.5 uppercase tracking-wider">
                {role}
                {organization && <span className="text-white/60 lowercase normal-case"> at {organization}</span>}
              </p>
            )}
          </div>

          {/* Close button - visible ONLY when pinned */}
          {isPinned && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setPinnedMember(null);
              }}
              className="absolute -top-2.5 -right-2.5 p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 pointer-events-auto z-50 cursor-pointer border border-white/5 backdrop-blur-md"
              aria-label={`Close ${name} details modal`}
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Expanded Information Progressive Reveal */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.05,
                    },
                  },
                }}
                className="w-full flex flex-col items-center mt-2.5 pointer-events-auto"
              >
                {/* Divider */}
                <motion.div
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="h-px w-full bg-white/10 my-2"
                />

                {/* Short Bio */}
                {bio && (
                <motion.p
                  variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
                  className="text-[10px] text-muted-foreground text-center line-clamp-3 leading-relaxed px-1.5"
                >
                  {bio}
                </motion.p>
                )}

                {/* Speaker Talk Details (Speaker specific) */}
                {variant === "speaker" && talkTitle && (
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }}
                    className="w-full text-left mt-2.5 pt-2 border-t border-white/5 px-1.5"
                  >
                    <div className="text-[8px] uppercase tracking-wider text-[#a855f7] font-black mb-0.5">
                      Presentation {talkTime ? `@ ${talkTime}` : ""}
                    </div>
                    <h4 className="text-[11px] font-bold text-white line-clamp-1">
                      {talkTitle}
                    </h4>
                    {description && (
                      <p className="text-[9.5px] text-muted-foreground/60 line-clamp-2 mt-0.5 leading-snug">
                        {description}
                      </p>
                    )}
                  </motion.div>
                )}

                {/* Divider */}
                <motion.div
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
                  className="h-px w-full bg-white/10 my-2"
                />

                {/* Social links block */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
                  className="flex items-center gap-3.5 mt-0.5"
                >
                  {socials?.linkedin && socials.linkedin !== "#" ? (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/5"
                      aria-label={`${name} LinkedIn`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </a>
                  ) : (
                    <span className="text-white/20 p-1 cursor-not-allowed" aria-label="LinkedIn unavailable">
                      <FaLinkedin className="w-4 h-4" />
                    </span>
                  )}
                  
                  {variant === "team" ? (
                    socials?.instagram && socials.instagram !== "#" ? (
                      <a
                        href={socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/5"
                        aria-label={`${name} Instagram`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaInstagram className="w-4 h-4" />
                      </a>
                    ) : (
                      <span className="text-white/20 p-1 cursor-not-allowed" aria-label="Instagram unavailable">
                        <FaInstagram className="w-4 h-4" />
                      </span>
                    )
                  ) : (
                    <>
                      {socials?.twitter && socials.twitter !== "#" ? (
                        <a
                          href={socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/5"
                          aria-label={`${name} Twitter`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaTwitter className="w-4 h-4" />
                        </a>
                      ) : null}
                      {socials?.github && socials.github !== "#" ? (
                        <a
                          href={socials.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/5"
                          aria-label={`${name} GitHub`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaGithub className="w-4 h-4" />
                        </a>
                      ) : null}
                      {socials?.website && socials.website !== "#" ? (
                        <a
                          href={socials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors duration-200 p-1 rounded hover:bg-white/5"
                          aria-label={`${name} Website`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      ) : null}
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
