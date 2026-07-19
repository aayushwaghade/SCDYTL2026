"use client";

import React from "react";
import { motion } from "framer-motion";

interface ConnectionNode {
  id: string;
  x: number;
  y: number;
  isActive: boolean;
  isDimmed: boolean;
}

interface OrbitConnectionsProps {
  nodes: ConnectionNode[];
  size: number; // Width/Height of the SVG box
}

export function OrbitConnections({ nodes, size }: OrbitConnectionsProps) {
  const center = size / 2;

  return (
    <svg
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-visible"
      viewBox={`0 0 ${size} ${size}`}
    >
      <defs>
        <radialGradient id="lineGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff9900" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {nodes.map((node) => {
        // Calculate absolute destination coordinates
        const destX = center + node.x;
        const destY = center + node.y;

        return (
          <React.Fragment key={node.id}>
            {/* Background connection line */}
            <line
              x1={center}
              y1={center}
              x2={destX}
              y2={destY}
              stroke={node.isActive ? "rgba(168, 85, 247, 0.45)" : "rgba(255, 255, 255, 0.05)"}
              strokeWidth={node.isActive ? 2 : 1}
              className="transition-all duration-300"
            />

            {/* Glowing active path segment */}
            {node.isActive && (
              <line
                x1={center}
                y1={center}
                x2={destX}
                y2={destY}
                stroke="url(#lineGlow)"
                strokeWidth={4}
                className="transition-all duration-300"
                style={{
                  filter: "blur(2px)",
                }}
              />
            )}

            {/* Animated data pulse packets moving along the connector */}
            {!node.isDimmed && (
              <motion.circle
                r={node.isActive ? 3.5 : 2.5}
                fill={node.isActive ? "#ff9900" : "#a855f7"}
                animate={{
                  cx: [center, destX],
                  cy: [center, destY],
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: node.isActive ? 1.5 : 2.8 + (parseInt(node.id.slice(-1)) || 0) * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (parseInt(node.id.slice(-1)) || 0) * 0.3,
                }}
                style={{
                  filter: node.isActive 
                    ? "drop-shadow(0 0 6px #ff9900)" 
                    : "drop-shadow(0 0 3px #a855f7)",
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </svg>
  );
}
