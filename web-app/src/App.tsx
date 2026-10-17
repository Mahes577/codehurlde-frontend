import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ActivityHeatmap } from './components/ActivityHeatmap';
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
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Global Spotlight Search Palette */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Top Fixed Header */}
      <Navbar onOpenSearch={() => setSearchOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero with Interactive Step-by-Step Algorithm Visualizer & Code Editor */}
        <HeroSection />

        {/* 2. LeetCode-style 365-Day Continuous Activity Heatmap & Streaks */}
        <ActivityHeatmap />

        {/* 3. High-Frequency Company Question Vaults */}
        <CompanyTrustBar />

        {/* 4. Telemetry Metrics */}
        <StatsBar />

        {/* 5. Algorithmic Skill Calibration with Visual SVG Radar Spider Chart */}
        <DynamicModeShowcase />

        {/* 6. 520 Curated Problem Catalog with Difficulty Meters */}
        <ProblemExplorer />

        {/* 7. Weekly Rated Contests with Live SVG Rating Progression Graph */}
        <ContestArena />

        {/* 8. Solution Walkthroughs & Algorithmic Editorials */}
        <CommunityShowcase />

        {/* 9. Structured Pattern Roadmaps */}
        <JobPrepTrack />

        {/* 10. FAQ Accordion */}
        <FaqSection />

        {/* 11. High-Converting CTA Banner */}
        <CtaSection />
      </main>

      {/* Developer Footer */}
      <Footer />
    </div>
  );
};
