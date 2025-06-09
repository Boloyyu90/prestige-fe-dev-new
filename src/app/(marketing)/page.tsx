import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { LoadingSpinner } from '@/shared/components/feedback/loading-spinner'

// Dynamic imports for better performance
const HeroSection = dynamic(() => import('@/features/marketing/components/hero-section'), {
  loading: () => <div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>,
})

const AboutSection = dynamic(() => import('@/features/marketing/components/about-section'))
const PackagesSection = dynamic(() => import('@/features/marketing/components/packages-section'))


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<LoadingSpinner />}>
        <AboutSection />
        <PackagesSection />
      </Suspense>
    </>
  )
}