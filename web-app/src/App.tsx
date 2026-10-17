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
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
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

        {/* 3. Platform Key Metrics */}
        <StatsBar />

        {/* 4. Adaptive AI Dynamic Mode (Killer Feature Showcase) */}
        <DynamicModeShowcase />

        {/* 5. Interactive DSA Problem Explorer Table */}
        <ProblemExplorer />

        {/* 6. CP Arena & Live Contest Countdown */}
        <ContestArena />

        {/* 7. Live Developer Community & Voice Study Rooms */}
        <CommunityShowcase />

        {/* 8. Tech Interview & ATS Career Prep Track */}
        <JobPrepTrack />

        {/* 9. Interactive FAQ Accordion */}
        <FaqSection />

        {/* 10. High-Conversion CTA Banner */}
        <CtaSection />
      </main>

      {/* Developer Footer */}
      <Footer />
    </div>
  );
};
