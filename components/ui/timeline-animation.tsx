/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
"use client"


import React from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
  const revealProps = useScrollReveal();

  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const variants = customVariants || defaultVariants;

  // Merge default initial variant with the dynamic revealProps state (prevents duplicate initial prop error)
  const motionProps = {
    ...revealProps,
    initial: revealProps.initial !== undefined ? revealProps.initial : "hidden",
    whileInView: revealProps.whileInView !== undefined ? revealProps.whileInView : "visible",
  };

  return (
    <Component
      variants={variants}
      {...motionProps}
      viewport={{ once: true, amount: 0.1 }}
      custom={animationNum}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

