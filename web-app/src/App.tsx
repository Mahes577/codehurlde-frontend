import React, { useState } from 'react';
import { Navbar, ActiveView } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CompanyTrustBar } from './components/CompanyTrustBar';
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
import { ContestPage } from './components/ContestPage';

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
    <div className="min-h-screen bg-[#000000] text-zinc-100 flex flex-col font-sans selection:bg-lime-500/30 selection:text-lime-200">
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

            {/* High-Frequency Company Question Vaults */}
            <CompanyTrustBar />

            {/* Algorithmic Skill Calibration with Visual SVG Radar Spider Chart */}
            <DynamicModeShowcase />

            {/* 520 Curated Problem Catalog with Difficulty Meters */}
            <div id="problems">
              <ProblemExplorer onSolveProblem={(id) => handleLaunchCompiler(id)} />
            </div>

            {/* Weekly Rated Contests with Live SVG Rating Progression Graph */}
            <div id="contests">
              <ContestArena />
            </div>

            {/* Solution Walkthroughs & Algorithmic Editorials */}
            <CommunityShowcase />

            {/* Structured Pattern Roadmaps */}
            <JobPrepTrack />

            {/* FAQ Accordion */}
            <FaqSection />

            {/* Final CTA Banner */}
            <CtaSection />
          </>
        )}

        {/* Dedicated Page Views for every route of CodeHurdle */}
        {currentView === 'contest' && (
          <ContestPage onOpenContest={() => handleSelectView('cp')} />
        )}

        {currentView === 'problems' && (
          <div className="py-6 space-y-6">
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
