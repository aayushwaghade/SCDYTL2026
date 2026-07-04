"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, Sparkles, AlertCircle } from "lucide-react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeaturedSpeakerCard } from "@/components/cards/FeaturedSpeakerCard";
import { SpeakerCard } from "@/components/cards/SpeakerCard";
import { SPEAKERS, Speaker } from "@/data/speakers";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const CATEGORIES = ["All", "Cloud", "AI", "DevOps", "Security", "Career", "Frontend", "Backend"] as const;

export function Speakers() {
  const shouldReduceMotion = useReducedMotion();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  
  // Mobile swipe carousel tracking
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  // Filter speakers based on search query and category
  const filteredSpeakers = SPEAKERS.filter((speaker) => {
    const matchesCategory =
      activeCategory === "All" || speaker.sessionCategory === activeCategory;

    const lowerQuery = searchQuery.toLowerCase();
    const matchesSearch =
      speaker.name.toLowerCase().includes(lowerQuery) ||
      speaker.company.toLowerCase().includes(lowerQuery) ||
      speaker.sessionTitle.toLowerCase().includes(lowerQuery) ||
      speaker.sessionCategory.toLowerCase().includes(lowerQuery);

    return matchesCategory && matchesSearch;
  });

  // Separate featured and regular speakers
  const featuredSpeakers = filteredSpeakers
    .filter((s) => s.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const regularSpeakers = filteredSpeakers
    .filter((s) => !s.featured)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  // Handle mobile swipe carousel dots
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth > 0) {
      const activeIndex = Math.round(scrollLeft / clientWidth);
      setActiveDot(activeIndex);
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
    };
  }, [featuredSpeakers.length]);

  // Handle keyboard events for Modal escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedSpeaker(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Section id="speakers" className="relative py-20 md:py-28 lg:py-36 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-primary/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-float" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-aws-orange/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <Container>
        {/* Section Heading */}
        <SectionHeading
          title="Meet Our"
          gradientTitle="Speakers"
          gradientVariant="aws"
          subtitle="Learn from industry experts, AWS Community Builders, cloud architects, AI professionals, startup founders, and technology leaders sharing practical knowledge and real-world experiences."
          badge="AWS COMMUNITY DAY"
          badgeVariant="aws"
          align="center"
        />

        {/* Filters & Search Layout */}
        <div className="flex flex-col gap-6 md:gap-8 mb-12 max-w-4xl mx-auto">
          {/* Search Input Bar */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-aws-orange transition-colors">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Search speakers by name, company, session topic, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3.5 sm:py-4 bg-white/5 border border-white/10 rounded-2xl text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-aws-orange/50 focus:ring-2 focus:ring-aws-orange/20 transition-all duration-300 backdrop-blur-md shadow-inner"
              aria-label="Search speakers"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-white transition-colors cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </motion.div>

          {/* Animated Filter Chips */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full overflow-x-auto pb-2 scrollbar-none flex items-center justify-start md:justify-center gap-2.5 sm:gap-3"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer select-none whitespace-nowrap border ${
                    isActive
                      ? "border-transparent text-near-black"
                      : "border-white/10 text-muted-foreground hover:text-white hover:border-white/20 bg-white/5"
                  }`}
                >
                  {/* Dynamic background slider using Framer Motion */}
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterBackdrop"
                      className="absolute inset-0 bg-gradient-to-r from-aws-orange to-aws-orange-light rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Speakers Content Area */}
        <AnimatePresence mode="wait">
          {filteredSpeakers.length === 0 ? (
            /* Empty State */
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center text-center max-w-lg mx-auto py-12 md:py-20"
            >
              {/* Premium Animated SVG Tech Illustration */}
              <div className="relative w-44 h-44 mb-8 flex items-center justify-center">
                {/* Orbital Rings */}
                <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-4 rounded-full border border-dashed border-aws-orange/10 animate-[spin_15s_linear_infinite_reverse]" />
                <div className="absolute inset-8 rounded-full border border-white/10 animate-[spin_8s_linear_infinite]" />
                
                {/* Hexagon & Orbs */}
                <motion.div
                  animate={{ y: [-6, 6, -6] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-24 h-24 bg-gradient-to-b from-white/5 to-white/0 rounded-3xl border border-white/10 flex items-center justify-center shadow-xl backdrop-blur-sm"
                >
                  <AlertCircle className="w-10 h-10 text-aws-orange" />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-purple-primary shadow-[0_0_10px_#8b5cf6]"
                  />
                  <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-pink-primary/40 blur-[4px]" />
                </motion.div>
              </div>
              
              <h4 className="text-2xl font-extrabold text-foreground mb-3">
                Speaker announcements coming soon.
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We are currently curating a lineup of industry leaders, AWS Heroes, and cloud architects. Check back soon for updates or adjust your search filter!
              </p>
            </motion.div>
          ) : (
            <motion.div key="speaker-content" className="space-y-16 sm:space-y-24">
              {/* FEATURED SPEAKERS SECTION */}
              {featuredSpeakers.length > 0 && (
                <div className="space-y-8 sm:space-y-12">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-aws-orange/50" />
                    <h3 className="text-lg sm:text-xl font-bold tracking-widest text-aws-orange uppercase flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                      Featured Speakers
                    </h3>
                    <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-aws-orange/50" />
                  </div>

                  {/* Tablet/Desktop Grid Layout (Featured) */}
                  <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {featuredSpeakers.map((speaker, index) => (
                      <FeaturedSpeakerCard
                        key={speaker.id}
                        speaker={speaker}
                        onViewProfile={setSelectedSpeaker}
                        index={index}
                      />
                    ))}
                  </div>

                  {/* Mobile Horizontal Swipe Carousel (Featured) */}
                  <div className="block sm:hidden relative w-full">
                    <div
                      ref={carouselRef}
                      className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-5 px-4 pb-6 w-full -mx-4"
                      style={{ scrollbarWidth: "none" }}
                    >
                      {featuredSpeakers.map((speaker, index) => (
                        <div
                          key={speaker.id}
                          className="min-w-[280px] w-[85vw] snap-center shrink-0"
                        >
                          <FeaturedSpeakerCard
                            speaker={speaker}
                            onViewProfile={setSelectedSpeaker}
                            index={index}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Carousel Navigation Dots */}
                    {featuredSpeakers.length > 1 && (
                      <div className="flex justify-center gap-2 mt-4">
                        {featuredSpeakers.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              if (carouselRef.current) {
                                const cardWidth = carouselRef.current.scrollWidth / featuredSpeakers.length;
                                carouselRef.current.scrollTo({
                                  left: cardWidth * idx,
                                  behavior: "smooth"
                                });
                              }
                            }}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              activeDot === idx ? "w-6 bg-aws-orange" : "w-2 bg-white/20"
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ALL SPEAKERS SECTION (GRID) */}
              {regularSpeakers.length > 0 && (
                <div className="space-y-8 sm:space-y-12">
                  <div className="flex items-center gap-3 justify-center">
                    <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-purple-primary/50" />
                    <h3 className="text-lg sm:text-xl font-bold tracking-widest text-purple-300 uppercase">
                      All Speakers
                    </h3>
                    <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-purple-primary/50" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {regularSpeakers.map((speaker, index) => (
                      <SpeakerCard
                        key={speaker.id}
                        speaker={speaker}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* SPEAKER DETAIL PROFILE MODAL */}
        <AnimatePresence>
          {selectedSpeaker && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-near-black/80 backdrop-blur-lg"
                onClick={() => setSelectedSpeaker(null)}
              />

              {/* Modal Frame Container */}
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-card rounded-2xl border border-white/10 p-6 md:p-8 shadow-2xl flex flex-col gap-6 scrollbar-thin"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedSpeaker(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-muted-foreground hover:text-white transition-all cursor-pointer z-20"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Profile Header Block */}
                <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                  {/* Speaker Image */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 border-2 border-aws-orange/40 shadow-[0_0_20px_rgba(255,153,0,0.15)] bg-white/5">
                    <Image
                      src={selectedSpeaker.image}
                      alt={selectedSpeaker.name}
                      width={128}
                      height={128}
                      unoptimized={true}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-grow">
                    {/* Category badge */}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wider bg-aws-orange/10 text-aws-orange border border-aws-orange/20 uppercase mb-2">
                      {selectedSpeaker.sessionCategory}
                    </span>
                    <h4 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {selectedSpeaker.name}
                    </h4>
                    <p className="text-sm font-semibold text-purple-300 mt-1">
                      {selectedSpeaker.designation}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      at <span className="text-foreground font-semibold">{selectedSpeaker.company}</span>
                    </p>

                    {/* Social networks links */}
                    <div className="flex gap-3 justify-center sm:justify-start mt-4">
                      {selectedSpeaker.linkedin && (
                        <a
                          href={selectedSpeaker.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-aws-orange hover:bg-white/10 hover:border-aws-orange/20 transition-all"
                        >
                          <FaLinkedin className="w-4 h-4" />
                        </a>
                      )}
                      {selectedSpeaker.twitter && (
                        <a
                          href={selectedSpeaker.twitter}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-aws-orange hover:bg-white/10 hover:border-aws-orange/20 transition-all"
                        >
                          <FaTwitter className="w-4 h-4" />
                        </a>
                      )}
                      {selectedSpeaker.github && (
                        <a
                          href={selectedSpeaker.github}
                          target="_blank"
                          rel="noreferrer"
                          className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-aws-orange hover:bg-white/10 hover:border-aws-orange/20 transition-all"
                        >
                          <FaGithub className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Speaker Biography */}
                {selectedSpeaker.bio && (
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">About the Speaker</h5>
                    <p className="text-sm text-foreground/90 leading-relaxed font-light">
                      {selectedSpeaker.bio}
                    </p>
                  </div>
                )}

                {/* Session abstract details */}
                <div className="space-y-3 bg-white/5 border border-white/5 p-4 rounded-xl">
                  <div>
                    <span className="text-[10px] font-bold text-aws-orange tracking-widest uppercase block mb-1">Speaker Session</span>
                    <h5 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      {selectedSpeaker.sessionTitle}
                    </h5>
                  </div>
                  {selectedSpeaker.sessionAbstract && (
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {selectedSpeaker.sessionAbstract}
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Section>
  );
}
