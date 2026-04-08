export const dynamic = 'force-dynamic';

import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { HeroSection } from '@/components/landing/hero-section';
import { FeatureGrid } from '@/components/landing/feature-grid';
import { LatestArticles } from '@/components/landing/latest-articles';
import { CTASection } from '@/components/landing/cta-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureGrid />
        <LatestArticles />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
