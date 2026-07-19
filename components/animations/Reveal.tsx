"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  x = 0,
  once = true,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: 0.15 });

  // Touch/mobile check
  const [forceVisible, setForceVisible] = useState(() => {
    if (typeof window !== "undefined") {
      const isTouch =
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      if (isTouch) return true;
    }
    return false;
  });

  useEffect(() => {
    if (forceVisible) return;
    const timer = setTimeout(() => {
      setForceVisible(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [forceVisible]);

  // Bypass Framer Motion completely on touch devices and render raw HTML.
  // This eliminates physical mobile rendering locks caused by delayed JS hydration.
  if (forceVisible) {
    return <div className={className}>{children}</div>;
  }

  const shouldShow = isInView || forceVisible;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={shouldShow ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{
        duration,
        delay,
        ease: [0.21, 1.02, 0.43, 1.01],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
