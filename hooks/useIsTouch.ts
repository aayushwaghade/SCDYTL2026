"use client";

import { useState } from "react";

export function useIsTouch() {
  // Use lazy state initialization to prevent hook warning and perform single mount check
  const [isTouch] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    }
    return false;
  });

  return isTouch;
}
