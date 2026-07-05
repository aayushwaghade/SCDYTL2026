"use client";

import React from "react";
import { motion } from "framer-motion";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum?: number;
  timelineRef?: React.RefObject<HTMLDivElement | null>;
  customVariants?: any;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}

export function TimelineContent({
  children,
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
  as = "div",
  ...props
}: TimelineContentProps) {
  // Select the appropriate motion tag based on the 'as' prop
  const Component = (motion as any)[as as any] || motion.div;

  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const variants = customVariants || defaultVariants;

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      custom={animationNum}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
