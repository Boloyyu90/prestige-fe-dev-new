// src/app/(marketing)/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/shared/components/feedback/loading-spinner';
import { Metadata } from 'next';

// Dynamic imports untuk performance optimization
const HeroSection = dynamic(
  () => import('@/features/marketing/components/hero-section'),
  {
    loading: () => (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    ),
    ssr: true
  }
);

const AboutSection = dynamic(
  () => import('@/features/marketing/components/about-section'),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    ),
    ssr: true
  }
);

const BenefitsSection = dynamic(
  () => import('@/features/marketing/components/benefits-section'),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }
);

const FeaturesSection = dynamic(
  () => import('@/features/marketing/components/features-section'),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }
);

const PackagesSection = dynamic(
  () => import('@/features/marketing/components/packages-showcase'),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }
);

const TestimonialsSection = dynamic(
  () => import('@/features/marketing/components/testimonials-section'),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }
);

const FaqSection = dynamic(
  () => import('@/features/marketing/components/faq-section'),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }
);

// SEO Metadata
export const metadata: Metadata = {
  title: 'Prestige Academy - Platform Tryout CASN Terpercaya #1 di Indonesia',
  description: 'Platform tryout online terpercaya untuk persiapan ujian CASN dengan sistem CAT yang terintegrasi. Raih impian menjadi ASN dengan persiapan terbaik bersama 50K+ peserta aktif.',
  keywords: [
    'tryout CPNS',
    'tryout PPPK',
    'CAT BKN',
    'ujian CASN',
    'simulasi ujian',
    'persiapan CPNS',
    'soal CPNS',
    'platform tryout',
    'belajar online',
    'ASN'
  ],
  authors: [{ name: 'Prestige Academy' }],
  creator: 'Prestige Academy',
  publisher: 'Prestige Academy',
  openGraph: {
    title: 'Prestige Academy - Platform Tryout CASN Terpercaya',
    description: 'Persiapkan diri dengan simulasi ujian yang mirip asli. 95% tingkat kelulusan, 50K+ peserta aktif. Raih impian menjadi ASN bersama Prestige Academy.',
    type: 'website',
    locale: 'id_ID',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Prestige Academy',
    images: [
      {
        url: '/images/og-image-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Prestige Academy - Platform Tryout CASN Terpercaya',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prestige Academy - Platform Tryout CASN Terpercaya',
    description: 'Persiapkan diri dengan simulasi ujian yang mirip asli. 95% tingkat kelulusan.',
    images: ['/images/twitter-card-home.jpg'],
    creator: '@prestigeacademy',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL,
  },
};

// JSON-LD Structured Data
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Prestige Academy',
  description: 'Platform tryout online terpercaya untuk persiapan ujian CASN dengan sistem CAT yang terintegrasi',
  url: process.env.NEXT_PUBLIC_APP_URL,
  logo: `${process.env.NEXT_PUBLIC_APP_URL}/images/logo.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+62-812-3456-7890',
    contactType: 'customer service',
    availableLanguage: ['Indonesian']
  },
  sameAs: [
    'https://facebook.com/prestigeacademy',
    'https://instagram.com/prestigeacademy',
    'https://twitter.com/prestigeacademy',
    'https://youtube.com/prestigeacademy'
  ],
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'IDR',
    lowPrice: '0',
    highPrice: '599000',
    offerCount: '3'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1250',
    bestRating: '5',
    worstRating: '1'
  }
};

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section - Critical, loaded immediately */}
      <HeroSection />

      {/* Other sections loaded with Suspense boundaries */}
      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <AboutSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <BenefitsSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <FeaturesSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <PackagesSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <TestimonialsSection />
      </Suspense>

      <Suspense
        fallback={
          <div className="h-96 flex items-center justify-center">
            <LoadingSpinner size="lg" />
          </div>
        }
      >
        <FaqSection />
      </Suspense>
    </>
  );
}