"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
}

export function Tag({ children, active = false, className, ...props }: TagProps) {
  return (
    <button
      type="button"
      className={cn(
        "px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 active:scale-[0.97] cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        active
          ? "bg-aws-orange text-near-black border-aws-orange shadow-[0_0_15px_rgba(255,153,0,0.25)]"
          : "bg-white/5 border-white/5 text-muted-foreground hover:text-foreground hover:bg-white/10 hover:border-white/10",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
