import React from "react";
import { GlassCard } from "./GlassCard";
import { User } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { FadeUp } from "@/components/animations/MotionPresets";

interface TeamCardProps {
  name: string;
  role: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  delay?: number;
}

export function TeamCard({
  name,
  role,
  twitter,
  linkedin,
  github,
  delay = 0,
}: TeamCardProps) {
  return (
    <FadeUp delay={delay}>
      <GlassCard glowColor="purple" className="flex flex-col items-center text-center p-6 h-full">
        <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 overflow-hidden relative group select-none">
          <User className="w-12 h-12 text-muted-foreground group-hover:scale-105 transition-transform duration-300" />
        </div>
        <h3 className="text-lg font-bold mb-1 text-foreground">{name}</h3>
        <p className="text-xs text-aws-orange font-semibold mb-4">{role}</p>

        <div className="flex gap-4 mt-auto">
          {twitter && (
            <a href={twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-aws-orange transition-colors" aria-label="Twitter">
              <FaTwitter className="w-4 h-4" />
            </a>
          )}
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-aws-orange transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="w-4 h-4" />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-aws-orange transition-colors" aria-label="GitHub">
              <FaGithub className="w-4 h-4" />
            </a>
          )}
        </div>
      </GlassCard>
    </FadeUp>
  );
}
