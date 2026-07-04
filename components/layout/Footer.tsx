import React from "react";
import Link from "next/link";
import { Cloud } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { Container } from "@/components/shared/Container";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/20 bg-background/50 backdrop-blur-sm py-12 mt-auto">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-aws-orange text-near-black">
                <Cloud className="w-5 h-5 fill-current" />
              </span>
              <span>AWS SCD Yavatmal</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm">
              The premier student-led cloud computing event in Yavatmal, organized by the AWS Club of JDIET. Connecting innovators, cloud builders, and tech enthusiasts.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-aws-orange transition-colors">About Us</a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-aws-orange transition-colors">Speakers</a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-aws-orange transition-colors">Agenda</a>
              </li>
              <li>
                <a href="#tickets" className="hover:text-aws-orange transition-colors">Register</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-aws-orange transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-aws-orange transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-aws-orange transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-aws-orange transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              For queries: <a href="mailto:info@awsstudents.community" className="underline hover:text-foreground">info@awsstudents.community</a>
            </p>
          </div>
        </div>

        <div className="border-t border-border/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} AWS Student Community Day Yavatmal. All rights reserved.</p>
          <p>
            Organized by the AWS Student Community and AWS Club, JDIET Yavatmal.
          </p>
        </div>
      </Container>
    </footer>
  );
}
