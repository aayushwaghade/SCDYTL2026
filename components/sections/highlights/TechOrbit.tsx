"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Cloud, Cpu, Mic, Wrench, Users,
  Briefcase, Heart, Lightbulb, Award, Gift,
} from "lucide-react";
import { LucideIcon } from "lucide-react";
import { OrbitNode } from "./OrbitNode";
import { OrbitCard } from "./OrbitCard";
import { OrbitConnections } from "./OrbitConnections";
import { OrbitBackground } from "./OrbitBackground";

/* ── Feature data ─────────────────────────────────────────────── */
interface FeatureData {
  id: string;
  name: string;
  shortName: string; // Compact label for mobile to prevent overlap
  icon: LucideIcon;
  description: string;
  ring: 1 | 2;
}

const FEATURES: FeatureData[] = [
  { id: "aws-cloud",   name: "AWS Cloud",       shortName: "Cloud",      icon: Cloud,     ring: 1, description: "Dive deep into AWS services, serverless architectures, and container deployments with industry best practices." },
  { id: "ai",          name: "AI & ML",         shortName: "AI",         icon: Cpu,       ring: 1, description: "Explore Generative AI, Amazon Bedrock, and machine learning models driving next-gen industrial automation." },
  { id: "speakers",    name: "Expert Speakers",  shortName: "Speakers",   icon: Mic,       ring: 1, description: "Learn directly from AWS Heroes, community leaders, and industry professionals sharing real-world insights." },
  { id: "workshops",   name: "Workshops",        shortName: "Labs",       icon: Wrench,    ring: 1, description: "Build live projects in guided interactive labs covering cloud security, DevOps, and IaC pipelines." },
  { id: "networking",  name: "Networking",        shortName: "Network",    icon: Users,     ring: 2, description: "Connect with 500+ student developers, peers, and tech professionals to collaborate on cloud innovation." },
  { id: "careers",     name: "Careers",           shortName: "Careers",    icon: Briefcase, ring: 2, description: "Unlock career paths, internships, and hiring opportunities with leading cloud-native enterprises." },
  { id: "community",   name: "Community",         shortName: "Community",  icon: Heart,     ring: 2, description: "Join a thriving AWS Student Builder network and grow through peer-to-peer developer meetups." },
  { id: "innovation",  name: "Innovation",        shortName: "Innovate",   icon: Lightbulb, ring: 2, description: "Discover how cutting-edge cloud architectures are transforming modern business landscapes." },
  { id: "certificates",name: "Certificates",      shortName: "Certs",      icon: Award,     ring: 2, description: "Earn participation and workshop certificates to showcase your cloud competencies on LinkedIn." },
  { id: "sponsor-expo",name: "Sponsor Expo",      shortName: "Expo",       icon: Gift,      ring: 2, description: "Interact with sponsors, explore demos, and grab exclusive giveaways and official AWS swags." },
];

const RING1 = FEATURES.filter((f) => f.ring === 1);
const RING2 = FEATURES.filter((f) => f.ring === 2);

/* ── Helpers ──────────────────────────────────────────────────── */
function distributeAngles(count: number, offsetDeg: number): number[] {
  const step = 360 / count;
  return Array.from({ length: count }, (_, i) => offsetDeg + i * step);
}

function useContainerWidth(ref: React.RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) setWidth(entry.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return width;
}

/* ── Main Component ───────────────────────────────────────────── */
export function TechOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useContainerWidth(containerRef);
  const prefersReduced = useReducedMotion();

  // The orbit area is always a square based on width, capped at 700px
  const orbitSize = Math.min(containerWidth, 700);
  const isMobile = orbitSize < 420;

  // Orbit rotation angles (continuously animated)
  const [ring1Angle, setRing1Angle] = useState(0);
  const [ring2Angle, setRing2Angle] = useState(0);

  // Interaction states
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const activeId = pinnedId ?? hoveredId;
  const isPaused = activeId !== null;

  // Responsive radii — compact inner on mobile, push outer for spacing
  const innerRadius = useMemo(() => {
    if (orbitSize < 340) return orbitSize * 0.17;
    if (orbitSize < 420) return orbitSize * 0.19;
    if (orbitSize < 500) return orbitSize * 0.24;
    return orbitSize * 0.22;
  }, [orbitSize]);

  const outerRadius = useMemo(() => {
    if (orbitSize < 340) return orbitSize * 0.43;
    if (orbitSize < 420) return orbitSize * 0.44;
    if (orbitSize < 500) return orbitSize * 0.42;
    return orbitSize * 0.40;
  }, [orbitSize]);

  // Continuous rotation animation frame loop
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isTabVisibleRef = useRef(true);

  useEffect(() => {
    const handleVisibility = () => {
      isTabVisibleRef.current = !document.hidden;
      if (!document.hidden) lastTimeRef.current = performance.now();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;

    const RING1_SPEED = 6;  // degrees per second
    const RING2_SPEED = -4; // counter-rotate

    const tick = (now: number) => {
      if (!isTabVisibleRef.current || isPaused) {
        lastTimeRef.current = now;
        animRef.current = requestAnimationFrame(tick);
        return;
      }
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      setRing1Angle((a) => (a + RING1_SPEED * dt) % 360);
      setRing2Angle((a) => (a + RING2_SPEED * dt) % 360);

      animRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [isPaused, prefersReduced]);

  // Compute current node positions
  const ring1Angles = distributeAngles(RING1.length, ring1Angle - 90);
  const ring2Angles = distributeAngles(RING2.length, ring2Angle - 90);

  const allNodes = useMemo(() => {
    const nodes: { feature: FeatureData; angle: number; radius: number }[] = [];
    RING1.forEach((f, i) => nodes.push({ feature: f, angle: ring1Angles[i], radius: innerRadius }));
    RING2.forEach((f, i) => nodes.push({ feature: f, angle: ring2Angles[i], radius: outerRadius }));
    return nodes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ring1Angle, ring2Angle, innerRadius, outerRadius]);

  // Connection data for SVG
  const connectionNodes = useMemo(() => {
    return allNodes.map(({ feature, angle, radius }) => {
      const rad = (angle * Math.PI) / 180;
      return {
        id: feature.id,
        x: radius * Math.cos(rad),
        y: radius * Math.sin(rad),
        isActive: feature.id === activeId,
        isDimmed: activeId !== null && feature.id !== activeId,
      };
    });
  }, [allNodes, activeId]);

  // Active feature for the card
  const activeFeature = activeId ? FEATURES.find((f) => f.id === activeId) : null;

  // Click handlers
  const handleActivate = useCallback((id: string) => {
    setPinnedId((prev) => (prev === id ? null : id));
  }, []);

  const handleHoverStart = useCallback((id: string) => {
    if (!pinnedId) setHoveredId(id);
  }, [pinnedId]);

  const handleHoverEnd = useCallback(() => {
    if (!pinnedId) setHoveredId(null);
  }, [pinnedId]);

  const handleClose = useCallback(() => {
    setPinnedId(null);
    setHoveredId(null);
  }, []);

  // Dismiss pinned card on background click
  const handleBgClick = useCallback(() => {
    if (pinnedId) handleClose();
  }, [pinnedId, handleClose]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (!containerRef.current?.contains(document.activeElement) && focusedIndex === -1) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = (focusedIndex + 1) % FEATURES.length;
        setFocusedIndex(next);
        const btn = containerRef.current?.querySelector(`[data-node-index="${next}"]`) as HTMLElement | null;
        btn?.focus();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (focusedIndex - 1 + FEATURES.length) % FEATURES.length;
        setFocusedIndex(prev);
        const btn = containerRef.current?.querySelector(`[data-node-index="${prev}"]`) as HTMLElement | null;
        btn?.focus();
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < FEATURES.length) {
          handleActivate(FEATURES[focusedIndex].id);
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focusedIndex, handleActivate, handleClose]);

  // Don't render until measured
  if (containerWidth === 0) {
    return (
      <div ref={containerRef} className="relative w-full max-w-[700px] mx-auto" style={{ aspectRatio: "1" }} />
    );
  }

  // Hub sizing
  const hubSize = isMobile ? 80 : orbitSize < 500 ? 100 : 130;

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[700px] mx-auto"
      onClick={handleBgClick}
      role="group"
      aria-label="Interactive Tech Orbit — explore event features"
    >
      {/* Orbit area — always square */}
      <div className="relative w-full" style={{ paddingBottom: `${(orbitSize / containerWidth) * 100}%` }}>
        <div className="absolute inset-0">
          <OrbitBackground />

          {/* Concentric orbit ring visual guides */}
          {[innerRadius, outerRadius].map((r, i) => (
            <div
              key={i}
              className="absolute rounded-full border pointer-events-none"
              style={{
                width: r * 2,
                height: r * 2,
                left: orbitSize / 2 - r,
                top: orbitSize / 2 - r,
                borderColor: activeId ? "rgba(168,85,247,0.08)" : "rgba(168,85,247,0.06)",
                borderWidth: 1,
                borderStyle: "dashed",
                transition: "border-color 0.4s ease",
              }}
            />
          ))}

          {/* SVG connection lines */}
          <OrbitConnections nodes={connectionNodes} size={orbitSize} />

          {/* ── Central Hub ──────────────────────────────────────── */}
          <motion.div
            className="absolute flex flex-col items-center justify-center text-center rounded-full pointer-events-none select-none z-20"
            style={{
              width: hubSize,
              height: hubSize,
              left: orbitSize / 2 - hubSize / 2,
              top: orbitSize / 2 - hubSize / 2,
              background: "radial-gradient(circle, rgba(13,13,20,0.95) 40%, rgba(168,85,247,0.12) 100%)",
              border: "1.5px solid rgba(168,85,247,0.3)",
              boxShadow: "0 0 40px rgba(168,85,247,0.2), 0 0 80px rgba(255,153,0,0.08), inset 0 0 20px rgba(168,85,247,0.1)",
              backdropFilter: "blur(12px)",
            }}
            animate={{
              scale: [1, 1.04, 1],
              boxShadow: [
                "0 0 40px rgba(168,85,247,0.2), 0 0 80px rgba(255,153,0,0.08), inset 0 0 20px rgba(168,85,247,0.1)",
                "0 0 55px rgba(168,85,247,0.35), 0 0 100px rgba(255,153,0,0.15), inset 0 0 25px rgba(168,85,247,0.2)",
                "0 0 40px rgba(168,85,247,0.2), 0 0 80px rgba(255,153,0,0.08), inset 0 0 20px rgba(168,85,247,0.1)",
              ],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span
              className="font-extrabold uppercase text-aws-orange/90 leading-tight"
              style={{ fontSize: isMobile ? 7 : 9, letterSpacing: "0.2em" }}
            >
              Student
            </span>
            <span
              className="font-extrabold uppercase text-white/90 leading-tight"
              style={{ fontSize: isMobile ? 7 : 9, letterSpacing: "0.15em" }}
            >
              Community Day
            </span>
            <span
              className="font-bold tracking-wider text-purple-400/70 mt-0.5"
              style={{ fontSize: isMobile ? 6 : 8 }}
            >
              YTL 2026
            </span>
          </motion.div>

          {/* ── Orbit Nodes ──────────────────────────────────────── */}
          {allNodes.map(({ feature, angle, radius }, globalIdx) => (
            <OrbitNode
              key={feature.id}
              name={isMobile ? feature.shortName : feature.name}
              icon={feature.icon}
              angle={angle}
              radius={radius}
              index={globalIdx}
              isActive={feature.id === activeId}
              isDimmed={activeId !== null && feature.id !== activeId}
              containerSize={orbitSize}
              onActivate={() => handleActivate(feature.id)}
              onHoverStart={() => handleHoverStart(feature.id)}
              onHoverEnd={handleHoverEnd}
            />
          ))}

          {/* ── Desktop Detail Card (centered overlay) ─────────── */}
          {!isMobile && (
            <AnimatePresence mode="wait">
              {activeFeature && (
                <div
                  className="absolute z-50 flex items-center justify-center pointer-events-auto"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <OrbitCard
                    key={activeFeature.id}
                    title={activeFeature.name}
                    description={activeFeature.description}
                    icon={activeFeature.icon}
                    isPinned={pinnedId !== null}
                    onClose={handleClose}
                  />
                </div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* ── Mobile Detail Card (anchored below orbit) ──────────── */}
      {isMobile && (
        <div className="relative w-full mt-4 min-h-[100px] flex items-start justify-center pointer-events-auto">
          <AnimatePresence mode="wait">
            {activeFeature ? (
              <OrbitCard
                key={activeFeature.id}
                title={activeFeature.name}
                description={activeFeature.description}
                icon={activeFeature.icon}
                isPinned={pinnedId !== null}
                onClose={handleClose}
              />
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-[11px] text-white/30 font-medium uppercase tracking-widest pt-2"
              >
                Tap a node to explore
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
