import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSection from '@/components/sections/ProblemSection';
import ComparisonSection from '@/components/sections/ComparisonSection';
import BackstageSection from '@/components/sections/BackstageSection';
import GovernanceSection from '@/components/sections/GovernanceSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';
import CursorGlow from '@/components/effects/CursorGlow';
import SmoothScroll from '@/components/effects/SmoothScroll';

export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'es' },
  ];
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <SmoothScroll>
      <CursorGlow />
      <Navbar locale={locale} />
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
  );
}
