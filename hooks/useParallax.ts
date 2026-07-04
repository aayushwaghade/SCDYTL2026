"use client";

import { useState, useEffect, useRef } from "react";

export function useParallax(speed = 0.2) {
  const [offset, setOffset] = useState(0);
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const elementTop = rect.top + window.scrollY;
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const distanceFromCenter = scrollPosition - (elementTop + rect.height / 2);
      setOffset(distanceFromCenter * speed);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed]);

  return { elementRef, offset };
}
