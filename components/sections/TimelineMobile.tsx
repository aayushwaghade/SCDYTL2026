"use client";

import React, { useRef, useState, useEffect } from "react";
import { Clock, User, Coffee, Sparkles, Laptop, Users, Award, BookOpen, HelpCircle } from "lucide-react";
import { AgendaItem } from "./Agenda";

interface TimelineMobileProps {
  items: (AgendaItem & {
    speaker?: {
      name: string;
      image?: string;
      designation?: string;
      role?: string;
      company?: string;
    };
  })[];
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  registration: KeyIcon,
  keynote: Sparkles,
  workshop: Laptop,
  break: Coffee,
  networking: Users,
  closing: Award,
  session: BookOpen,
};

function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3" />
      <path d="M17.5 5.5l3 3" />
    </svg>
  );
}

export function TimelineMobile({ items }: TimelineMobileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Setup optimized IntersectionObserver to watch SNAP centers
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observerOptions = {
      root: container,
      rootMargin: "0px -45% 0px -45%", // Restrict to central 10% horizontal viewport zone
      threshold: 0, // Trigger callback immediately on entering/leaving center region
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const indexAttr = entry.target.getAttribute("data-index");
          if (indexAttr !== null) {
            const newIdx = parseInt(indexAttr, 10);
            setActiveIndex(newIdx);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const cols = container.querySelectorAll(".timeline-column");
    cols.forEach((col) => {
      observer.observe(col);
    });

    return () => {
      observer.disconnect();
    };
  }, [items.length]);

  // Compute node coordinates: x: i * 100 + 50 (in vw equivalent units), y: alternating (190 for peak, 310 for valley)
  const points = items.map((_, i) => ({
    x: i * 100 + 50,
    y: i % 2 === 0 ? 190 : 310,
  }));

  // Generate background continuous bezier wave path
  let fullPathD = "";
  if (points.length > 0) {
    fullPathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      fullPathD += ` C ${p0.x + 50} ${p0.y}, ${p0.x + 50} ${p1.y}, ${p1.x} ${p1.y}`;
    }
  }

  // Generate active glowing path up to activeIndex
  let activePathD = "";
  if (points.length > 0 && activeIndex > 0) {
    activePathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < activeIndex; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      activePathD += ` C ${p0.x + 50} ${p0.y}, ${p0.x + 50} ${p1.y}, ${p1.x} ${p1.y}`;
    }
  }

  return (
    <div className="w-full relative py-2 select-none overflow-hidden">
      {/* Horizontal Swipe Indicator Label */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/60 mb-4 uppercase tracking-[0.2em]">
        <span>Swipe horizontally</span>
        <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>

      {/* Snap Scroll container */}
      <div
        ref={containerRef}
        className="w-full overflow-x-auto scrollbar-none snap-x snap-mandatory cursor-grab active:cursor-grabbing scroll-smooth relative"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div 
          className="relative h-[500px] flex items-center" 
          style={{ width: `${items.length * 100}vw` }}
        >
          {/* SVG curved roadmap system coordinates */}
          <svg
            className="absolute top-0 left-0 pointer-events-none z-0"
            style={{
              width: `${items.length * 100}vw`,
              height: "500px",
            }}
            viewBox={`0 0 ${items.length * 100} 500`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="baseTrackGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
              </linearGradient>
              <linearGradient id="activeTrackGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ff9900" />
              </linearGradient>
            </defs>

            {/* Inactive Track baseline */}
            <path
              d={fullPathD}
              fill="none"
              stroke="url(#baseTrackGrad)"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Glowing Active Track overlay segment */}
            {activePathD && (
              <path
                d={activePathD}
                fill="none"
                stroke="url(#activeTrackGrad)"
                strokeWidth="4.5"
                strokeLinecap="round"
                className="transition-all duration-500"
                style={{
                  filter: "drop-shadow(0 0 6px #a855f7) drop-shadow(0 0 12px #ff9900)",
                }}
              />
            )}
          </svg>

          {/* Render Snap Columns: Each slide occupies 100vw width */}
          {items.map((session, index) => {
            const isAbove = index % 2 === 0;
            const isActive = index === activeIndex;
            const CategoryIcon = CATEGORY_ICONS[session.category] || HelpCircle;

            return (
              <div 
                key={session.id}
                data-index={index}
                className="timeline-column w-screen flex-shrink-0 snap-center flex flex-col justify-between items-center h-[500px] px-6 relative z-10"
                style={{ width: "100vw" }}
              >
                {/* ── CARD SLOT ABOVE (Even indices) ── */}
                {isAbove ? (
                  <>
                    <div 
                      className={`absolute top-[15px] w-full max-w-[310px] h-[155px] flex flex-col justify-between p-4.5 rounded-2xl border transition-all duration-500 bg-[#0d0d11]/75 backdrop-blur-md shadow-2xl ${
                        isActive 
                          ? "border-[#a855f7]/30 opacity-100 scale-100 pointer-events-auto" 
                          : "border-white/5 opacity-40 scale-[0.93] pointer-events-none"
                      }`}
                    >
                      <div className="w-full overflow-hidden">
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-aws-orange">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{session.startTime}</span>
                          </span>
                          <div className={`p-1 rounded-lg border text-purple-300 ${
                            isActive ? "bg-[#a855f7]/10 border-[#a855f7]/20" : "bg-white/5 border-white/5"
                          }`}>
                            <CategoryIcon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-extrabold text-white line-clamp-1 uppercase tracking-wide leading-tight mb-1">
                          {session.title}
                        </h3>
                        {session.description && (
                          <p className="text-[10px] text-muted-foreground/80 leading-relaxed line-clamp-2">
                            {session.description}
                          </p>
                        )}
                      </div>

                      {session.speaker && (
                        <div className="pt-2 border-t border-white/5 flex items-center gap-2 mt-auto">
                          {session.speaker.image ? (
                            <div className="relative h-6.5 w-6.5 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={session.speaker.image}
                                alt={session.speaker.name}
                                className="w-full h-full object-cover"
                                draggable={false}
                              />
                            </div>
                          ) : (
                            <div className="h-6.5 w-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground flex-shrink-0">
                              <User className="h-3 w-3" />
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <div className="text-[9px] font-black text-white truncate leading-none">
                              {session.speaker.name}
                            </div>
                            <div className="text-[8px] text-muted-foreground/60 truncate mt-1 leading-none">
                              {session.speaker.company}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Vertical Connector */}
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 w-[1.5px] transition-all duration-500 origin-top h-[20px] top-[170px] ${
                        isActive 
                          ? "bg-gradient-to-b from-[#a855f7] to-[#ff9900]/80 shadow-[0_0_8px_#a855f7]" 
                          : "bg-white/10"
                      }`}
                    />

                    {/* Milestone Point */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 rounded-full border-4 border-[#030303] z-20 ${
                        isActive ? "w-6.5 h-6.5" : "w-4.5 h-4.5"
                      }`}
                      style={{
                        top: "190px",
                        background: isActive
                          ? "radial-gradient(circle, #ff9900 0%, #a855f7 100%)"
                          : "#1a1a24",
                        borderColor: isActive ? "#030303" : "rgba(255,255,255,0.08)",
                        boxShadow: isActive
                          ? "0 0 20px rgba(255, 153, 0, 0.85), 0 0 35px rgba(168, 85, 247, 0.65)"
                          : "none",
                      }}
                    />
                  </>
                ) : (
                  <>
                    {/* Milestone Point */}
                    <div
                      className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 rounded-full border-4 border-[#030303] z-20 ${
                        isActive ? "w-6.5 h-6.5" : "w-4.5 h-4.5"
                      }`}
                      style={{
                        top: "310px",
                        background: isActive
                          ? "radial-gradient(circle, #a855f7 0%, #ff9900 100%)"
                          : "#1a1a24",
                        borderColor: isActive ? "#030303" : "rgba(255,255,255,0.08)",
                        boxShadow: isActive
                          ? "0 0 20px rgba(168, 85, 247, 0.85), 0 0 35px rgba(255, 153, 0, 0.65)"
                          : "none",
                      }}
                    />

                    {/* Vertical Connector */}
                    <div 
                      className={`absolute left-1/2 -translate-x-1/2 w-[1.5px] transition-all duration-500 origin-bottom h-[20px] top-[310px] ${
                        isActive 
                          ? "bg-gradient-to-t from-[#ff9900] to-[#a855f7]/80 shadow-[0_0_8px_#ff9900]" 
                          : "bg-white/10"
                      }`}
                    />

                    {/* ── CARD SLOT BELOW (Odd indices) ── */}
                    <div 
                      className={`absolute top-[330px] w-full max-w-[310px] h-[155px] flex flex-col justify-between p-4.5 rounded-2xl border transition-all duration-500 bg-[#0d0d11]/75 backdrop-blur-md shadow-2xl ${
                        isActive 
                          ? "border-[#ff9900]/30 opacity-100 scale-100 pointer-events-auto" 
                          : "border-white/5 opacity-40 scale-[0.93] pointer-events-none"
                      }`}
                    >
                      <div className="w-full overflow-hidden">
                        <div className="flex items-center justify-between gap-1 mb-2">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-aws-orange">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{session.startTime}</span>
                          </span>
                          <div className={`p-1 rounded-lg border text-aws-orange ${
                            isActive ? "bg-[#ff9900]/10 border-[#ff9900]/20" : "bg-white/5 border-white/5"
                          }`}>
                            <CategoryIcon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                        <h3 className="text-xs sm:text-[13px] font-extrabold text-white line-clamp-1 uppercase tracking-wide leading-tight mb-1">
                          {session.title}
                        </h3>
                        {session.description && (
                          <p className="text-[10px] text-muted-foreground/80 leading-relaxed line-clamp-2">
                            {session.description}
                          </p>
                        )}
                      </div>

                      {session.speaker && (
                        <div className="pt-2 border-t border-white/5 flex items-center gap-2 mt-auto">
                          {session.speaker.image ? (
                            <div className="relative h-6.5 w-6.5 rounded-full overflow-hidden border border-white/10 flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={session.speaker.image}
                                alt={session.speaker.name}
                                className="w-full h-full object-cover"
                                draggable={false}
                              />
                            </div>
                          ) : (
                            <div className="h-6.5 w-6.5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground flex-shrink-0">
                              <User className="h-3 w-3" />
                            </div>
                          )}
                          <div className="overflow-hidden">
                            <div className="text-[9px] font-black text-white truncate leading-none">
                              {session.speaker.name}
                            </div>
                            <div className="text-[8px] text-muted-foreground/60 truncate mt-1 leading-none">
                              {session.speaker.company}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress dot indicators */}
      <div className="flex items-center justify-center gap-2 mt-2 select-none">
        {items.map((_, idx) => (
          <span
            key={idx}
            className="h-1 rounded-full transition-all duration-300"
            style={{
              width: idx === activeIndex ? 16 : 4,
              backgroundColor: idx === activeIndex ? "#ff9900" : "rgba(255,255,255,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
