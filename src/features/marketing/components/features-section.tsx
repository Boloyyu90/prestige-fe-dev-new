'use client';

import { useState } from 'react';
import { OptimizedImage } from '@/shared/components/ui/optimized-image';
import { Button } from '@/shared/components/ui/button';
import { AnimateOnScroll } from '@/shared/components/ui/animate-on-scroll';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { useInViewAnimation } from '@/shared/design-system/motion/hooks';
import { SectionReveal } from '@/shared/components/ui/section-reveal';
import { Grid } from '@/shared/components/layout/grid';
import { Stack } from '@/shared/components/layout/stack';
import { ParallaxContainer } from '@/shared/components/ui/parallax-container';
import { FloatingElement } from '@/shared/components/ui/floating-element';
import { EntranceAnimation } from '@/shared/components/ui/entrance-animation';
import { cn } from '@/shared/lib/utils/cn';
import { Check, ChevronDown, Zap } from 'lucide-react';

interface Feature {
    id: string;
    title: string;
    icon: string;
    description: string;
    benefits: string[];
    mockup: string;
}

const FeaturesSection = () => {
    const [activeFeature, setActiveFeature] = useState('simulasi');
    const { ref, isIntersecting } = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '50px',
    });

    const { ref: sectionRef, variants: containerVariants, animate, initial } = useInViewAnimation('fadeInUp', {
        threshold: 0.1,
        stagger: true,
        staggerDelay: 0.3
    });

    const features: Feature[] = [
        {
            id: 'simulasi',
            title: 'Simulasi Nyata',
            icon: '/icons/features/to-do-list.svg',
            description: 'Rasakan pengalaman ujian yang sesungguhnya dengan sistem tryout yang memberikan pengalaman ujian asli',
            benefits: [
                'Materi & soal terbaru',
                'Analisis hasil otomatis',
                'Simulasi ujian real-time'
            ],
            mockup: '/images/mockups/laptop-mockup-ujian.png'
        },
        {
            id: 'statistik',
            title: 'Sistem Statistik',
            icon: '/icons/features/statistic.svg',
            description: 'Pantau perkembangan belajar dengan analisis statistik yang komprehensif dan mudah dipahami',
            benefits: [
                'Grafik perkembangan detail',
                'Analisis kelemahan & kekuatan',
                'Laporan performa real-time'
            ],
            mockup: '/images/mockups/laptop-mockup-statistik.png'
        },
        {
            id: 'peringkat',
            title: 'Sistem Peringkat',
            icon: '/icons/features/ranking.svg',
            description: 'Bersaing dengan peserta lain dan lihat posisi peringkat untuk memotivasi belajar lebih baik',
            benefits: [
                'Leaderboard nasional',
                'Ranking berdasarkan kategori',
                'Kompetisi mingguan & bulanan'
            ],
            mockup: '/images/mockups/laptop-mockup-ranking.png'
        }
    ];

    const activeFeatureData = features.find(f => f.id === activeFeature) || features[0];

    return (
      <section className="section bg-background relative overflow-hidden" ref={ref}>
          {/* Background Pattern using design system */}
          <div className="absolute inset-0 opacity-5">
              <ParallaxContainer speed={0.3} className="absolute top-0 left-0">
                  <FloatingElement intensity="subtle" speed="slow">
                      <div className="w-72 h-72 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2" />
                  </FloatingElement>
              </ParallaxContainer>

              <ParallaxContainer speed={-0.2} className="absolute bottom-0 right-0">
                  <FloatingElement intensity="normal" speed="normal">
                      <div className="w-96 h-96 bg-secondary rounded-full translate-x-1/2 translate-y-1/2" />
                  </FloatingElement>
              </ParallaxContainer>
          </div>

          <div className="container relative z-10" ref={sectionRef}>
              {/* Header using design system */}
              <EntranceAnimation variant="fadeInUp" className="text-center mb-16">
                  <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                      <Zap className="w-4 h-4" />
                      Fitur Unggulan
                  </div>

                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                      Fitur Unggulan{' '}
                      <span className="gradient-text-animated">Prestige Academy</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
                      Persiapkan diri dengan pengalaman terbaik berbasis riset untuk menghadapi ujian di depan mu
                  </p>
              </EntranceAnimation>

              <div className="max-w-6xl mx-auto">
                  {/* Features Navigation using design system */}
                  <SectionReveal direction="up" delay={0.2} className="mb-12">
                      <div className="card-base p-2 shadow-elevation-2 mx-auto max-w-4xl">
                          <Grid cols={1} responsive={{ md: 3 }} gap="sm">
                              {features.map((feature, index) => (
                                <button
                                  key={feature.id}
                                  onClick={() => setActiveFeature(feature.id)}
                                  className={cn(
                                    'relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left w-full',
                                    'focus-visible-ring',
                                    activeFeature === feature.id
                                      ? 'bg-primary text-primary-foreground shadow-elevation-2 scale-105'
                                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                  )}
                                  aria-pressed={activeFeature === feature.id}
                                  role="tab"
                                  tabIndex={0}
                                >
                                    {/* Icon */}
                                    <div className={cn(
                                      'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300',
                                      activeFeature === feature.id
                                        ? 'bg-primary-foreground/20'
                                        : 'bg-muted'
                                    )}>
                                        <OptimizedImage
                                          src={feature.icon}
                                          alt={`${feature.title} icon`}
                                          width={24}
                                          height={24}
                                          className={cn(
                                            'transition-all duration-300',
                                            activeFeature === feature.id
                                              ? 'brightness-0 invert'
                                              : 'opacity-70'
                                          )}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-base md:text-lg mb-1 truncate">
                                            {feature.title}
                                        </h3>
                                        <p className={cn(
                                          'text-sm opacity-80 hidden md:block',
                                          activeFeature === feature.id
                                            ? 'text-primary-foreground/80'
                                            : 'text-muted-foreground'
                                        )}>
                                            {feature.description.slice(0, 50)}...
                                        </p>
                                    </div>

                                    {/* Active Indicator */}
                                    {activeFeature === feature.id && (
                                      <div className="absolute inset-0 rounded-xl ring-2 ring-primary/20 ring-offset-2" />
                                    )}
                                </button>
                              ))}
                          </Grid>
                      </div>
                  </SectionReveal>

                  {/* Feature Content using design system Grid */}
                  <Grid cols={1} responsive={{ lg: 2 }} gap="xl" className="items-center">
                      {/* Left - Visual */}
                      <SectionReveal direction="left" delay={0.3} className="order-2 lg:order-1">
                          <div className="relative">
                              {/* Background Decoration using design system gradients */}
                              <div className="absolute inset-0 marketing-gradient rounded-3xl transform rotate-3" />
                              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-primary/5 rounded-3xl transform -rotate-2" />

                              {/* Main Content using design system card */}
                              <div className="relative card-base p-8 shadow-elevation-3">
                                  {/* Feature Image */}
                                  <div className="aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-muted/50 to-muted mb-6">
                                      <OptimizedImage
                                        src={activeFeatureData.mockup}
                                        alt={`${activeFeatureData.title} mockup`}
                                        width={600}
                                        height={400}
                                        className="w-full h-full object-cover transition-all duration-500"
                                        priority={activeFeature === 'simulasi'}
                                      />
                                  </div>

                                  {/* Features Preview using design system Grid */}
                                  <Grid cols={3} gap="md">
                                      {activeFeatureData.benefits.map((benefit, index) => (
                                        <div
                                          key={index}
                                          className="text-center p-3 rounded-xl bg-muted hover:bg-muted/80 transition-colors"
                                        >
                                            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                                                <Check className="w-4 h-4 text-primary" />
                                            </div>
                                            <p className="text-xs font-medium text-foreground leading-tight">
                                                {benefit}
                                            </p>
                                        </div>
                                      ))}
                                  </Grid>
                              </div>
                          </div>
                      </SectionReveal>

                      {/* Right - Content */}
                      <SectionReveal direction="right" delay={0.4} className="order-1 lg:order-2">
                          <Stack direction="vertical" spacing="lg">
                              {/* Feature Title & Description */}
                              <div>
                                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
                                      {activeFeatureData.title.replace(' ', ' ')}
                                      <span className="block text-primary">Mirip Asli</span>
                                  </h3>

                                  <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                                      {activeFeatureData.description}
                                  </p>
                              </div>

                              {/* Benefits List */}
                              <div>
                                  <h4 className="text-lg font-semibold text-foreground mb-4">
                                      Keunggulan Fitur:
                                  </h4>
                                  <Stack direction="vertical" spacing="sm">
                                      {activeFeatureData.benefits.map((benefit, index) => (
                                        <div
                                          key={index}
                                          className="flex items-start gap-3 group"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                                                <Check className="w-3.5 h-3.5 text-secondary-foreground" strokeWidth={3} />
                                            </div>
                                            <span className="text-muted-foreground font-medium leading-relaxed">
                          {benefit}
                        </span>
                                        </div>
                                      ))}
                                  </Stack>
                              </div>

                              {/* Statistics using design system Grid */}
                              <Grid cols={2} gap="md" className="p-6 marketing-gradient rounded-2xl">
                                  <div className="text-center">
                                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1 tabular-nums">
                                          {isIntersecting ? '95%' : '0%'}
                                      </div>
                                      <p className="text-sm text-muted-foreground font-medium">
                                          Akurasi Simulasi
                                      </p>
                                  </div>
                                  <div className="text-center">
                                      <div className="text-2xl md:text-3xl font-bold text-secondary mb-1 tabular-nums">
                                          {isIntersecting ? '10K+' : '0'}
                                      </div>
                                      <p className="text-sm text-muted-foreground font-medium">
                                          Bank Soal
                                      </p>
                                  </div>
                              </Grid>

                              {/* CTA using design system Button */}
                              <div className="pt-4">
                                  <Button
                                    size="lg"
                                    variant="default"
                                    animation="lift"
                                    className="group"
                                  >
                                      Coba Fitur Ini
                                      <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                  </Button>
                              </div>
                          </Stack>
                      </SectionReveal>
                  </Grid>
              </div>
          </div>
      </section>
    );
};

export default FeaturesSection;