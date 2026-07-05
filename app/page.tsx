import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundSystem } from "@/components/background/BackgroundSystem";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { HighlightsSection } from "@/components/sections/HighlightsSection";

import { WhyAttend } from "@/components/sections/WhyAttend";
import { Speakers } from "@/components/sections/Speakers";
import { Agenda } from "@/components/sections/Agenda";
import { Tickets } from "@/components/sections/Tickets";
import { MeetTheTeam } from "@/components/sections/MeetTheTeam";
// import { Volunteers } from "@/components/sections/Volunteers";
import { Venue } from "@/components/sections/Venue";
import { Sponsors } from "@/components/sections/Sponsors";
import { CommunityPartners } from "@/components/sections/CommunityPartners";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <BackgroundSystem>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <HighlightsSection />

        <WhyAttend />
        <Speakers />
        <Sponsors />
        <CommunityPartners />
        <Agenda />
        <Tickets />
        <MeetTheTeam />
        {/* <Volunteers /> */}
        <FAQ />
        <Venue />
      </main>
      <Footer />
    </BackgroundSystem>
  );
}
