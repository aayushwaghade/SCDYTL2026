"use client";

import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState({
    pixels: 0,
    percentage: 0,
  });

  useEffect(() => {
    const handleScroll = () => {
      const pixels = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = totalHeight > 0 ? pixels / totalHeight : 0;
      setScrollProgress({ pixels, percentage });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollProgress;
}
