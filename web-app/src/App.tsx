import React, { useState } from 'react';
import { Navbar, ActiveView } from './components/Navbar';
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
import { CompilerView } from './components/CompilerView';
import { UserProfileView } from './components/UserProfileView';
import { RoadmapView } from './components/RoadmapView';
import { CpArenaView } from './components/CpArenaView';
import { CommunityView } from './components/CommunityView';
import { JobPrepView } from './components/JobPrepView';
import { ReusableComponentDrawer } from './components/ReusableComponentDrawer';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [searchOpen, setSearchOpen] = useState(false);
  const [componentDocsOpen, setComponentDocsOpen] = useState(false);

  const handleLaunchCompiler = (problemId?: string | number) => {
    setCurrentView('compiler');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectView = (view: ActiveView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col font-sans selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Global Spotlight Search Palette */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Reusable Component Documentation & Code Reference Drawer */}
      <ReusableComponentDrawer 
        isOpen={componentDocsOpen}
        onClose={() => setComponentDocsOpen(false)}
        onNavigateToView={(view) => handleSelectView(view)}
      />

      {/* Top Fixed Header with Global Navigation & View Switcher */}
      <Navbar 
        currentView={currentView}
        onSelectView={handleSelectView}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenComponentDocs={() => setComponentDocsOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 1. Hero with Interactive Step-by-Step Algorithm Visualizer & Code Editor */}
            <HeroSection 
              onLaunchCompiler={() => handleLaunchCompiler()}
              onExploreRoadmap={() => handleSelectView('roadmap')}
            />

            {/* 2. LeetCode-style 365-Day Continuous Activity Heatmap & Streaks */}
            <ActivityHeatmap />

            {/* 3. High-Frequency Company Question Vaults */}
            <CompanyTrustBar />

            {/* 4. Telemetry Metrics */}
            <StatsBar />

            {/* 5. Algorithmic Skill Calibration with Visual SVG Radar Spider Chart */}
            <DynamicModeShowcase />

            {/* 6. 520 Curated Problem Catalog with Difficulty Meters */}
            <div id="problems">
              <ProblemExplorer onSolveProblem={(id) => handleLaunchCompiler(id)} />
            </div>

            {/* 7. Weekly Rated Contests with Live SVG Rating Progression Graph */}
            <div id="contests">
              <ContestArena />
            </div>

            {/* 8. Solution Walkthroughs & Algorithmic Editorials */}
            <CommunityShowcase />

            {/* 9. Structured Pattern Roadmaps */}
            <JobPrepTrack />

            {/* 10. FAQ Accordion */}
            <FaqSection />

            {/* 11. High-Converting CTA Banner */}
            <CtaSection />
          </>
        )}

        {/* Dedicated Page Views for every route of CodeHurdle */}
        {currentView === 'problems' && (
          <div className="py-6 space-y-6">
            <StatsBar />
            <ProblemExplorer onSolveProblem={(id) => handleLaunchCompiler(id)} />
          </div>
        )}

        {currentView === 'cp' && (
          <CpArenaView onSolveProblem={(id) => handleLaunchCompiler(id)} />
        )}

        {currentView === 'compiler' && (
          <CompilerView onBackToDirectory={() => handleSelectView('problems')} />
        )}

        {currentView === 'profile' && (
          <UserProfileView />
        )}

        {currentView === 'roadmap' && (
          <RoadmapView onSelectProblem={(id) => handleLaunchCompiler(id)} />
        )}

        {currentView === 'community' && (
          <CommunityView />
        )}

        {currentView === 'jobprep' && (
          <JobPrepView />
        )}
      </main>

      {/* Developer Footer */}
      <Footer />
    </div>
  );
};
