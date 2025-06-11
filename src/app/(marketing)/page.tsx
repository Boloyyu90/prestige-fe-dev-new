import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/feedback/loading-spinner';

// Dynamic imports with loading states
const HeroSection = dynamic(
  () => import('@/features/marketing/components/hero-section'),
  {
    loading: () => <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>,
    ssr: true
  }
);

const AboutSection = dynamic(
  () => import('@/features/marketing/components/about-section')
);

const BenefitsSection = dynamic(
  () => import('@/features/marketing/components/benefits-section')
);

const FeaturesSection = dynamic(
  () => import('@/features/marketing/components/features-section')
);

const PackagesSection = dynamic(
  () => import('@/features/marketing/components/packages-section')
);

const TestimonialsSection = dynamic(
  () => import('@/features/marketing/components/testimonials-section')
);

const FaqSection = dynamic(
  () => import('@/features/marketing/components/faq-section')
);

export const metadata = {
  title: 'Prestige Academy - Platform Tryout CASN Terpercaya',
  description: 'Platform tryout online untuk persiapan ujian CASN dengan sistem CAT terintegrasi',
  keywords: ['tryout', 'CASN', 'CPNS', 'PPPK', 'ujian online'],
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<LoadingSpinner />}>
        <AboutSection />
        <BenefitsSection />
        <FeaturesSection />
        <PackagesSection />
        <TestimonialsSection />
        <FaqSection />
      </Suspense>
    </>
  );
}