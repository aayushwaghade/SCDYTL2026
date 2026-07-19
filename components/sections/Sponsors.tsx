'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { Container, Stack, Section, SectionHeader, SectionTitle, SectionDescription } from '@/components/layout/Primitives'
import { useScrollReveal } from '@/hooks/useScrollReveal'

// Config & Data types
export type SponsorTier = 'title' | 'platinum' | 'gold' | 'silver'

export const SPONSORS_CONFIG = {
  heading: 'Our Partners',
  subtitle: 'Backed by organizations that believe in empowering the next generation of builders.',
} as const

export const TIER_ORDER: SponsorTier[] = ['title', 'platinum', 'gold', 'silver']

export const TIER_LABELS: Record<SponsorTier, string> = {
  title: 'POWERED BY',
  platinum: 'PLATINUM',
  gold: 'GOLD',
  silver: 'SILVER',
}

export const TIER_GLOW: Record<SponsorTier, string> = {
  title: 'rgba(168, 85, 247, 0.35)',
  platinum: 'rgba(168, 85, 247, 0.25)',
  gold: 'rgba(247, 181, 56, 0.25)',
  silver: 'rgba(148, 163, 184, 0.2)',
}

export interface SponsorEntry {
  id: string
  name: string
  logo: string
  website: string
  tier: SponsorTier
  description?: string
  order: number
}

// Sponsor data mapping target project's slots
export const SPONSORS_DATA: SponsorEntry[] = [
  {
    id: 'sponsor-title-1',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'title',
    description: 'Become the powered by sponsor of Student Community Day Yavatmal 2026',
    order: 1,
  },
  {
    id: 'sponsor-plat-1',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'platinum',
    description: 'Platinum sponsorship opportunity available',
    order: 1,
  },
  {
    id: 'sponsor-plat-2',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'platinum',
    order: 2,
  },
  {
    id: 'sponsor-plat-3',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'platinum',
    order: 3,
  },
  {
    id: 'sponsor-gold-1',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'gold',
    order: 1,
  },
  {
    id: 'sponsor-gold-2',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'gold',
    order: 2,
  },
  {
    id: 'sponsor-gold-3',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'gold',
    order: 3,
  },
  {
    id: 'sponsor-silver-1',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'silver',
    order: 1,
  },
  {
    id: 'sponsor-silver-2',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'silver',
    order: 2,
  },
  {
    id: 'sponsor-silver-3',
    name: 'Your Logo Here',
    logo: '',
    website: '#',
    tier: 'silver',
    order: 3,
  },
]

export function Sponsors() {
  // Group sponsors by their tier type
  const sponsorsByTier = React.useMemo(() => {
    const grouped: Record<SponsorTier, typeof SPONSORS_DATA> = {
      title: [],
      platinum: [],
      gold: [],
      silver: [],
    }
    SPONSORS_DATA.forEach((sponsor) => {
      grouped[sponsor.tier].push(sponsor)
    })
    return grouped
  }, [])

  // Dynamic grid configuration mapping based on the tier levels
  const getTierGridClasses = (tier: SponsorTier) => {
    switch (tier) {
      case 'title':
        return 'grid-cols-1 max-w-lg'
      case 'platinum':
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 max-w-3xl'
      case 'gold':
        return 'grid-cols-2 md:grid-cols-3 max-w-3xl'
      case 'silver':
        return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-3 max-w-3xl'
      default:
        return 'grid-cols-2 md:grid-cols-3'
    }
  }

  // Dynamic card size class mapping based on tier level
  const getTierCardClasses = (tier: SponsorTier) => {
    switch (tier) {
      case 'title':
        return 'h-40 p-8 text-lg border-2 border-[#a855f7]/20 bg-[#a855f7]/2 hover:border-[#a855f7]/40'
      case 'platinum':
        return 'h-32 p-6 text-base border border-[#a855f7]/10 hover:border-[#a855f7]/30'
      case 'gold':
        return 'h-28 p-5 text-sm hover:border-amber-500/20'
      case 'silver':
        return 'h-24 p-4 text-xs hover:border-slate-400/20'
      default:
        return 'h-24 p-4'
    }
  }

  const reveal20 = useScrollReveal({ opacity: 0, y: 20 });
  const revealScale = useScrollReveal({ opacity: 0, scale: 0.95 });
  const reveal15 = useScrollReveal({ opacity: 0, y: 15 });

  return (
    <Section id="sponsors" className="border-t border-white/5 relative z-10 bg-[#030303] py-14 md:py-20 lg:py-24">
      {/* Local scoped styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-glow-gradient {
          background: linear-gradient(135deg, #ffffff 30%, rgba(255, 255, 255, 0.7) 70%, #a855f7 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .shadow-glow-purple {
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
        }
        .glass {
          background: rgba(10, 10, 16, 0.5);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .glass:hover {
          background: rgba(16, 16, 26, 0.65);
          border-color: rgba(255, 255, 255, 0.15);
        }
      `}} />

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-80 bg-[#a855f7]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-80 h-80 bg-[#06b6d4]/5 rounded-full blur-[120px] pointer-events-none" />

      <Container>
        <SectionHeader align="center">
          <motion.div
            {...reveal20}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] tracking-[0.2em] font-black uppercase text-[#a855f7] mb-3 block">
              PARTNERSHIP
            </span>
          </motion.div>
          <motion.div
            {...reveal20}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionTitle className="text-glow-gradient font-black tracking-tighter">
              {SPONSORS_CONFIG.heading}
            </SectionTitle>
          </motion.div>
          <motion.div
            {...reveal20}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <SectionDescription>
              {SPONSORS_CONFIG.subtitle}
            </SectionDescription>
          </motion.div>
        </SectionHeader>

        {/* Sponsor Tiers Rows */}
        <Stack gap={12} className="mt-16 md:mt-24">
          {TIER_ORDER.map((tier) => {
            const sponsors = sponsorsByTier[tier]
            if (!sponsors || sponsors.length === 0) return null

            const glowColor = TIER_GLOW[tier]

            return (
              <div key={tier} className="w-full flex flex-col items-center">
                {/* Tier Title Label */}
                <motion.div
                  {...revealScale}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-6 flex items-center gap-2"
                >
                  <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-white/10" />
                  <span className="text-[10px] tracking-[0.3em] font-black uppercase text-white/40 font-mono">
                    {TIER_LABELS[tier]}
                  </span>
                  <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-white/10" />
                </motion.div>

                {/* Tier Grid Wrapper */}
                <div className={`grid gap-6 w-full justify-center ${getTierGridClasses(tier)}`}>
                  {sponsors.map((sponsor, index) => (
                    <motion.a
                      key={sponsor.id}
                      href={sponsor.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      {...reveal15}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                      className={`group/sponsor relative rounded-xl flex flex-col items-center justify-center text-center overflow-hidden transition-all duration-300 hover:scale-102 hover:-translate-y-1 glass border border-white/5 bg-white/[0.01] ${getTierCardClasses(
                        tier
                      )}`}
                      style={{
                        boxShadow: `0 4px 30px rgba(0,0,0,0.3), 0 0 25px ${glowColor}05`,
                      }}
                      role="link"
                      aria-label={`${sponsor.name} Sponsor Slot`}
                    >
                      {/* Inner border glow highlight effect */}
                      <span className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover/sponsor:opacity-100 transition-opacity duration-500" />

                      {/* Display content: Real logo OR Availability slots placeholder */}
                      {sponsor.logo ? (
                        <div className="relative w-full h-full p-2 flex items-center justify-center">
                          <Image
                            src={sponsor.logo}
                            alt={sponsor.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-contain p-2 opacity-70 group-hover/sponsor:opacity-100 group-hover/sponsor:scale-105 transition-all duration-500"
                            loading="lazy"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-1.5 p-4 text-muted-foreground/30 hover:text-[#a855f7]/50 transition-colors duration-300 font-mono select-none">
                          <Plus className="h-4 w-4 stroke-[2]" />
                          <div className="font-black uppercase tracking-widest text-[9px]">
                            {sponsor.name}
                          </div>
                          {sponsor.description && (
                            <div className="text-[8px] text-muted-foreground/30 max-w-[180px] leading-tight mt-0.5">
                              {sponsor.description}
                            </div>
                          )}
                        </div>
                      )}
                    </motion.a>
                  ))}
                </div>
              </div>
            )
          })}
        </Stack>

        {/* Dynamic Partner CTA Block */}
        <motion.div
          {...reveal20}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 p-8 rounded-2xl glass border border-white/5 bg-gradient-to-r from-[#a855f7]/5 via-[#ec4899]/2 to-transparent max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-left">
            <h3 className="text-white text-base font-bold tracking-tight">
              Interested in Sponsoring?
            </h3>
            <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-[420px]">
              Support Student Community Day Yavatmal 2026. Get your brand in front of 500+ student developers, creators, and cloud-native experts.
            </p>
          </div>
          <a
            href="mailto:awsclubs.jdiet@gmail.com"
            className="px-6 py-3 rounded-xl bg-[#a855f7] hover:bg-[#a855f7]/95 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-102 hover:-translate-y-0.5 active:scale-98 shrink-0 text-center shadow-glow-purple"
          >
            Become a Partner
          </a>
        </motion.div>
      </Container>
    </Section>
  )
}
export default Sponsors
