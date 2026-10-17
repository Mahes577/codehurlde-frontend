import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CompanyTrustBar } from './components/CompanyTrustBar';
import { StatsBar } from './components/StatsBar';
import { DynamicModeShowcase } from './components/DynamicModeShowcase';
import { ProblemExplorer } from './components/ProblemExplorer';
import { ContestArena } from './components/ContestArena';
import { CommunityShowcase } from './components/CommunityShowcase';
import { JobPrepTrack } from './components/JobPrepTrack';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';

export const App: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Global Spotlight Search Palette */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Top Fixed Header */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Interactive In-Browser Runner */}
        <HeroSection />

        {/* 2. Top Hiring Company Question Vaults */}
        <CompanyTrustBar />

        {/* 3. Platform Telemetry & Metrics */}
        <StatsBar />

        {/* 4. Skill Calibration & Adaptive Sequencing */}
        <DynamicModeShowcase />

        {/* 5. Curated Problem Catalog */}
        <ProblemExplorer />

        {/* 6. Weekly Rated Contests & Leaderboard */}
        <ContestArena />

        {/* 7. Algorithmic Discussions & Editorials */}
        <CommunityShowcase />

        {/* 8. Pattern Roadmaps */}
        <JobPrepTrack />

        {/* 9. FAQ Accordion */}
        <FaqSection />

        {/* 10. Start Practice Banner */}
        <CtaSection />
      </main>

      {/* Developer Footer */}
      <Footer />
    </div>
  );
};
