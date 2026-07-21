"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Container } from "@/components/shared/Container";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import {
  Mic,
  Cloud,
  Users,
  Code2,
  Rocket,
  Award,
  Gift,
  Globe,
  X,
  Check,
  ChevronRight,
} from "lucide-react";

/* ─── 8 Feature Highlight Cards Data ───────────────────────────────────────── */
interface HighlightItem {
  id: string;
  icon: React.ElementType;
  label: string;
  color: string;
  description: string;
  highlights: string[];
}

const HIGHLIGHTS: HighlightItem[] = [
  {
    id: "expert-sessions",
    icon: Mic,
    label: "Expert Sessions",
    color: "#ff9900",
    description:
      "Learn directly from AWS Community Builders, experienced professionals, and technology leaders through inspiring keynote sessions and technical talks designed to expand your knowledge.",
    highlights: [
      "AWS Community Builders",
      "Industry Experts",
      "Technical Sessions",
      "Live Q&A",
      "Career Guidance",
      "Latest Cloud Trends",
    ],
  },
  {
    id: "cloud-ai",
    icon: Cloud,
    label: "Cloud & AI",
    color: "#a855f7",
    description:
      "Explore modern cloud computing and Artificial Intelligence through practical demonstrations, real-world applications, and emerging AWS technologies.",
    highlights: [
      "AWS Cloud",
      "Generative AI",
      "Machine Learning",
      "Real Projects",
      "Future Technologies",
    ],
  },
  {
    id: "networking",
    icon: Users,
    label: "Networking",
    color: "#6366f1",
    description:
      "Meet like-minded students, developers, professionals, speakers, and community leaders while building valuable connections.",
    highlights: [
      "Meet Experts",
      "Connect with Students",
      "Career Opportunities",
      "Community Discussions",
      "Build Relationships",
    ],
  },
  {
    id: "hands-on-learning",
    icon: Code2,
    label: "Hands-on Learning",
    color: "#22c55e",
    description:
      "Participate in interactive sessions that focus on practical implementation instead of only theoretical concepts.",
    highlights: [
      "Live Demos",
      "Practical Learning",
      "Workshops",
      "Interactive Activities",
      "Problem Solving",
    ],
  },
  {
    id: "career-growth",
    icon: Rocket,
    label: "Career Growth",
    color: "#ec4899",
    description:
      "Discover learning paths, certifications, internships, and career opportunities in cloud computing and modern technologies.",
    highlights: [
      "Career Advice",
      "Learning Roadmap",
      "Certifications",
      "Internship Guidance",
      "Industry Insights",
    ],
  },
  {
    id: "certificate",
    icon: Award,
    label: "Certificate",
    color: "#eab308",
    description:
      "Receive an official participation certificate recognizing your attendance and involvement in the event.",
    highlights: [
      "Participation Certificate",
      "Digital Recognition",
      "Resume Value",
      "LinkedIn Friendly",
    ],
  },
  {
    id: "swags-goodies",
    icon: Gift,
    label: "Swags & Goodies",
    color: "#3b82f6",
    description:
      "Enjoy exciting event merchandise, surprise gifts, and exclusive goodies available for participants.",
    highlights: [
      "Event Swag",
      "Stickers",
      "Merchandise",
      "Surprise Gifts",
    ],
  },
  {
    id: "community-driven",
    icon: Globe,
    label: "Community Driven",
    color: "#14b8a6",
    description:
      "Become part of an active technology community where learning, collaboration, and innovation continue even after the event.",
    highlights: [
      "Open Community",
      "Collaborative Learning",
      "Future Events",
      "Long-Term Networking",
    ],
  },
];

export function About() {
  const reducedMotion = useReducedMotion();
  const [selectedHighlight, setSelectedHighlight] = useState<HighlightItem | null>(null);

  /* Section InView Refs */
  const introRef = useRef<HTMLDivElement>(null);
  const isIntroInView = useInView(introRef, {
    once: true,
    margin: "-60px 0px -60px 0px",
  });

  const gridRef = useRef<HTMLDivElement>(null);
  const isGridInView = useInView(gridRef, {
    once: true,
    margin: "-40px 0px -40px 0px",
  });

  /* Body scroll lock when modal is active */
  useEffect(() => {
    if (selectedHighlight) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedHighlight]);

  /* Keyboard escape listener for accessibility */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedHighlight(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="about"
      className="relative py-16 md:py-24 lg:py-28 overflow-hidden bg-[#030303]"
    >
      {/* ── Background atmosphere ────────────────────────────────────── */}
      <div aria-hidden className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />

        <div
          className="absolute top-0 -left-[10%] w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 75%)",
            filter: "blur(120px)",
          }}
        />

        <div
          className="absolute top-[40%] -right-[8%] w-[450px] h-[450px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255,153,0,0.3) 0%, transparent 75%)",
            filter: "blur(110px)",
          }}
        />
      </div>

      <Container>
        {/* ════════════════════════════════════════════════════════════════
            PART 1: Short Introduction (Consistent across all devices)
        ════════════════════════════════════════════════════════════════ */}
        <motion.div
          ref={introRef}
          initial={reducedMotion ? false : { opacity: 0, y: 24 }}
          animate={!reducedMotion && isIntroInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 md:mb-14 lg:mb-16"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-[#ff9900] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#a0a0b8]">
              About The Event
            </span>
          </div>

          {/* Large Heading */}
          <h2
            className="font-extrabold text-white tracking-tight leading-[1.15] mb-4"
            style={{ fontSize: "var(--font-size-section-title)" }}
          >
            What is{" "}
            <span className="bg-gradient-to-r from-[#ff9900] via-[#ffb84d] to-[#a78bfa] bg-clip-text text-transparent">
              Student Community Day?
            </span>
          </h2>

          {/* Concise Paragraph (3-5 lines) */}
          <p
            className="text-[#a0a0b8] font-medium leading-relaxed max-w-3xl mx-auto px-2"
            style={{ fontSize: "var(--font-size-subtitle)" }}
          >
            Student Community Day is a community-led technology event where students, developers, and industry experts come together to learn, build, network, and grow. It offers an opportunity to explore cloud computing, AI, and modern technologies through inspiring sessions and hands-on experiences.
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════
            PART 2: Interactive Feature Showcase ("WHY ATTEND?")
            Grid: Desktop (4 cols x 2 rows), Tablet (2 cols x 4 rows), Mobile (2 cols x 4 rows)
        ════════════════════════════════════════════════════════════════ */}
        <div ref={gridRef}>
          <div className="text-center mb-6 flex items-center justify-center gap-2">
            <span className="text-xs sm:text-sm font-extrabold tracking-[0.22em] uppercase text-[#ff9900]">
              WHY ATTEND?
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-white/40 uppercase tracking-widest hidden sm:inline-block">
              · Click any feature to explore
            </span>
          </div>

          {/* Responsive Feature Grid */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {HIGHLIGHTS.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = selectedHighlight?.id === item.id;

              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedHighlight(item)}
                  whileHover={reducedMotion ? undefined : { y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={!reducedMotion && isGridInView ? { opacity: 1, y: 0 } : undefined}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    group relative text-left flex items-center justify-between p-3.5 sm:p-4 lg:p-5 rounded-2xl
                    bg-[#0c0a16]/75 border transition-all duration-300 backdrop-blur-xl shadow-xl cursor-pointer
                    overflow-hidden
                    ${
                      isSelected
                        ? "border-[#ff9900] bg-[#120e24] shadow-[0_0_30px_rgba(255,153,0,0.2)]"
                        : "border-white/[0.08] hover:border-white/25 hover:bg-[#100d20]/90"
                    }
                  `}
                >
                  {/* Hover ambient color glow */}
                  <div
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                    style={{ background: item.color }}
                  />

                  <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
                    <div
                      className="p-2 sm:p-2.5 rounded-xl shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${item.color}18` }}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: item.color }} />
                    </div>

                    <span className="text-xs sm:text-sm font-bold text-white/95 tracking-wide truncate group-hover:text-white">
                      {item.label}
                    </span>
                  </div>

                  {/* Subtle chevron indicator */}
                  <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                </motion.button>
              );
            })}
          </div>
        </div>
      </Container>

      {/* ════════════════════════════════════════════════════════════════
          UNIVERSAL MODAL / BOTTOM SHEET
          Desktop & Tablet: Centered Glass Modal
          Mobile: Bottom Sheet
      ════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedHighlight && (
          <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSelectedHighlight(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={
                window.innerWidth < 768
                  ? { y: "100%" }
                  : { opacity: 0, scale: 0.94, y: 20 }
              }
              animate={
                window.innerWidth < 768
                  ? { y: 0 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              exit={
                window.innerWidth < 768
                  ? { y: "100%" }
                  : { opacity: 0, scale: 0.94, y: 20 }
              }
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              drag={window.innerWidth < 768 ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.8 }}
              onDragEnd={(_, info) => {
                if (window.innerWidth < 768 && info.offset.y > 100) {
                  setSelectedHighlight(null);
                }
              }}
              className="relative w-full max-w-lg md:max-w-xl max-h-[85vh] overflow-y-auto rounded-t-[28px] md:rounded-3xl bg-[#0a0914]/95 border-t md:border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-2xl z-10 flex flex-col gap-6 text-left"
              style={{
                boxShadow: `0 0 50px ${selectedHighlight.color}25`,
              }}
            >
              {/* Mobile Drag Indicator Bar */}
              <div className="w-12 h-1.5 rounded-full bg-white/20 mx-auto shrink-0 mb-1 md:hidden" />

              {/* Header Row */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div
                    className="p-3 rounded-2xl border"
                    style={{
                      backgroundColor: `${selectedHighlight.color}18`,
                      borderColor: `${selectedHighlight.color}30`,
                    }}
                  >
                    {React.createElement(selectedHighlight.icon, {
                      className: "w-6 h-6 sm:w-7 sm:h-7",
                      style: { color: selectedHighlight.color },
                    })}
                  </div>
                  <div>
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase text-[#ff9900]">
                      Event Highlight
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                      {selectedHighlight.label}
                    </h3>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setSelectedHighlight(null)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Middle Section: Detailed Explanation */}
              <div className="py-2 border-y border-white/[0.08]">
                <p className="text-xs sm:text-sm text-[#a0a0b8] font-medium leading-relaxed">
                  {selectedHighlight.description}
                </p>
              </div>

              {/* Bottom Section: Key Highlights Checklist */}
              <div>
                <span className="block text-[11px] sm:text-xs font-bold tracking-[0.15em] uppercase text-white/60 mb-3">
                  Key Takeaways
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedHighlight.highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                    >
                      <div
                        className="p-1 rounded-md shrink-0"
                        style={{ backgroundColor: `${selectedHighlight.color}20` }}
                      >
                        <Check
                          className="w-3.5 h-3.5"
                          style={{ color: selectedHighlight.color }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-white/90">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dismiss tip */}
              <div className="pt-1 text-center">
                <span className="text-[10px] font-medium text-white/30">
                  Press ESC or click outside to close
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Hover glow styling ─────────────────────────────────────────── */}
      <style>{`
        .hover-glow {
          transition: opacity 0.5s ease;
        }
        *:hover > .hover-glow {
          opacity: 0.65 !important;
        }
      `}</style>
    </section>
  );
}

export default About;
