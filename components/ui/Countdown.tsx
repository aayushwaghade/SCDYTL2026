"use client";

import React, { useState, useEffect, useSyncExternalStore } from "react";
import { EVENT_CONFIG } from "@/lib/event";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
}

function calculateTimeLeft(targetTimestamp: number): TimeLeft {
  const now = Date.now();
  const difference = targetTimestamp - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds, isLive: false };
}

const emptySubscribe = () => () => {};

export function Countdown() {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(EVENT_CONFIG.targetTimestamp)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(EVENT_CONFIG.targetTimestamp));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) {
    // Skeleton placeholder to prevent hydration mismatch and layout shift
    return (
      <div 
        className="my-5 sm:my-7 w-full max-w-xl mx-auto px-2"
        aria-hidden="true"
      >
        <div className="bg-[#0d0d11]/80 backdrop-blur-md rounded-2xl border border-white/10 p-3 sm:p-4 md:p-5 shadow-[0_0_25px_rgba(168,85,247,0.15)] flex justify-center items-center gap-2 sm:gap-4 md:gap-6 min-h-[80px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              <div className="h-8 sm:h-10 w-10 sm:w-14 bg-white/5 rounded animate-pulse mb-1" />
              <div className="h-3 w-8 bg-white/5 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (timeLeft.isLive) {
    return (
      <div 
        className="my-5 sm:my-7 w-full max-w-xl mx-auto px-2"
        role="region"
        aria-label="Event Status"
      >
        <div className="bg-[#0d0d11]/90 backdrop-blur-md rounded-2xl border border-aws-orange/40 p-4 sm:p-5 shadow-[0_0_30px_rgba(255,153,0,0.25)] text-center animate-pulse">
          <span className="text-base sm:text-xl font-extrabold text-aws-orange tracking-wide">
            🎉 We&apos;re Live Today!
          </span>
          <p className="text-xs sm:text-sm text-foreground/80 mt-1 font-medium">
            Welcome to Student Community Day Yavatmal 2026
          </p>
        </div>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div
      className="my-5 sm:my-7 w-full max-w-xl mx-auto px-2 select-none hero-stagger-4"
      role="timer"
      aria-label="Event Live Countdown Timer"
    >
      <div className="bg-[#0d0d11]/80 backdrop-blur-md rounded-2xl border border-white/10 p-3 sm:p-4 md:p-5 shadow-[0_0_25px_rgba(168,85,247,0.15)] hover:border-purple-primary/30 transition-colors duration-300">
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4 md:gap-6 items-center justify-center">
          {units.map((unit, index) => (
            <div
              key={unit.label}
              className="flex flex-col items-center justify-center relative group"
            >
              {/* Digit Box */}
              <div className="relative w-full flex flex-col items-center justify-center py-1 sm:py-2 px-1 rounded-xl bg-white/[0.03] border border-white/5 group-hover:border-aws-orange/30 transition-colors duration-300">
                <span 
                  className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-mono leading-none"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {String(unit.value).padStart(2, "0")}
                </span>
                <span className="text-[9px] sm:text-[11px] font-bold text-aws-orange uppercase tracking-wider mt-1 sm:mt-1.5 leading-none">
                  {unit.label}
                </span>
              </div>

              {/* Separator dots for desktop & tablet */}
              {index < units.length - 1 && (
                <span className="hidden sm:block absolute -right-2 sm:-right-3 md:-right-3.5 top-1/2 -translate-y-1/2 text-white/30 font-bold text-sm select-none">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
