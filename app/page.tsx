import React from "react";
import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundSystem } from "@/components/background/BackgroundSystem";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

/* Defer below-the-fold components using next/dynamic for minimal initial JS bundle */
const WhyAttend = dynamic(() => import("@/components/sections/WhyAttend").then(mod => mod.WhyAttend));
const Speakers = dynamic(() => import("@/components/sections/Speakers").then(mod => mod.Speakers));
const Agenda = dynamic(() => import("@/components/sections/Agenda").then(mod => mod.Agenda));
const Sponsors = dynamic(() => import("@/components/sections/Sponsors").then(mod => mod.Sponsors));
const CommunityPartners = dynamic(() => import("@/components/sections/CommunityPartners").then(mod => mod.CommunityPartners));
const Tickets = dynamic(() => import("@/components/sections/Tickets").then(mod => mod.Tickets));
const MeetTheTeam = dynamic(() => import("@/components/sections/MeetTheTeam").then(mod => mod.MeetTheTeam));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ));
const Venue = dynamic(() => import("@/components/sections/Venue").then(mod => mod.Venue));

export default function Home() {
  return (
    <BackgroundSystem>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />

        <WhyAttend />
        <Speakers />
        <Agenda />
        <Sponsors />
        <CommunityPartners />
        <Tickets />
        <MeetTheTeam />
        <FAQ />
        <Venue />
      </main>
      <Footer />
    </BackgroundSystem>
  );
}
