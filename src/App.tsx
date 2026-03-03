import CursorGlow from '@/components/effects/CursorGlow';
import SmoothScroll from '@/components/effects/SmoothScroll';
import BackstageSection from '@/components/sections/BackstageSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import GovernanceSection from '@/components/sections/GovernanceSection';
import HeroSection from '@/components/sections/HeroSection';
import Navbar from '@/components/sections/Navbar';
import ProblemSection from '@/components/sections/ProblemSection';
import I18nProvider from '@/i18n/I18nProvider';

export default function App() {
  return (
    <I18nProvider>
      <SmoothScroll>
        <CursorGlow />
        <Navbar />
        <main>
          <HeroSection />
          <div className="section-divider" />
          <ProblemSection />
          <div className="section-divider" />
          <ComparisonSection />
          <div className="section-divider" />
          <BackstageSection />
          <div className="section-divider" />
          <GovernanceSection />
          <div className="section-divider" />
          <CTASection />
        </main>
        <Footer />
      </SmoothScroll>
    </I18nProvider>
  );
}
