"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { useSectionVisibility } from "@/hooks/useSectionVisibility";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#hero", id: "hero" },
  { label: "About", href: "#about", id: "about" },
  { label: "Speakers", href: "#speakers", id: "speakers" },
  { label: "Agenda", href: "#agenda", id: "agenda" },
  { label: "Tickets", href: "#tickets", id: "tickets" },
  { label: "Team", href: "#team", id: "team" },
  { label: "Venue", href: "#venue", id: "venue" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);


  const activeSection = useSectionVisibility(
    NAV_LINKS.map((link) => link.id)
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 border-b border-transparent navbar-entrance",
        scrolled
          ? "glass-panel py-3"
          : "bg-transparent py-5"
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 select-none font-bold text-xl tracking-tight">
          <Image
            src="/logos/scd-logo.png"
            alt="AWS SCD Logo"
            width={38}
            height={38}
            className="rounded-lg hover:scale-105 transition-transform duration-300"
            priority
          />
          <span className="flex flex-col">
            <span className="text-sm font-extrabold tracking-wide text-foreground leading-none">AWS STUDENT</span>
            <span className="text-[10px] font-semibold text-aws-orange tracking-widest uppercase mt-0.5 leading-none">Community Day</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id || (link.id === "hero" && activeSection === "");
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors relative py-1",
                  isActive
                    ? "text-aws-orange font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-aws-orange rounded-full animate-in fade-in zoom-in-95 duration-200" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button size="sm" variant="default" asChild>
            <a href="#tickets">Register Now</a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="p-2 lg:hidden text-foreground hover:text-aws-orange transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 top-[59px] z-40 bg-background/98 backdrop-blur-md flex flex-col p-6 border-t border-white/5"
          >
            <nav className="flex flex-col gap-5 my-8">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id || (link.id === "hero" && activeSection === "");
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors",
                      isActive ? "text-aws-orange font-bold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
            <Button size="lg" className="w-full mt-auto" asChild>
              <a href="#tickets" onClick={() => setIsOpen(false)}>
                Register Now
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
