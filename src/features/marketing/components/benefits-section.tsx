'use client';

import { useState, useEffect } from 'react';
import { OptimizedImage } from '@/shared/design-system/components/animations/optimized-image';
import { AnimateOnScroll } from '@/shared/design-system/components/animations/animate-on-scroll';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { useInViewAnimation } from '@/shared/design-system/motion/hooks';
import { SectionReveal } from '@/shared/design-system/components/animations/section-reveal';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/lib/utils/cn';

interface Benefit {
  step: number;
  title: string;
  subtitle: string;
  description: string;
  position: 'left' | 'right';
  color: 'primary' | 'secondary';
  icon?: string;
}

const BenefitsSection = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '50px',
  });

  const { ref: contentRef, variants: containerVariants, animate, initial } = useInViewAnimation('fadeInUp', {
    threshold: 0.1,
    stagger: true,
    staggerDelay: 0.2
  });

  // Auto-advance through steps when in view
  useEffect(() => {
    if (!isIntersecting) return;

    const interval = setInterval(() => {
      setActiveStep(prev => prev >= 5 ? 1 : prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [isIntersecting]);

  const benefits: Benefit[] = [
    {
      step: 1,
      title: "Latihan Seru Mirip",
      subtitle: "UJIAN ASLI!",
      description: "Rasakan sensasi ujian CPNS, SNBT, dan P3K tanpa perlu tegang! Soal-soal kami dibuat persis seperti ujian sungguhan, jadi kamu bisa berlatih dengan nyaman dan tidak kaget saat hari-H.",
      position: 'left',
      color: 'primary',
      icon: '🎯'
    },
    {
      step: 2,
      title: "Tahu Peluang Kelulusanmu",
      subtitle: "SEJAK AWAL!",
      description: "Gak perlu nebak-nebak kucing dalam karung! Berdasarkan hasil latihanmu, kami bisa kasih gambaran peluang kelulusanmu dengan jelas. Jadi kamu tahu harus berapa semangat lagi untuk mencapai impianmu!",
      position: 'right',
      color: 'secondary',
      icon: '📊'
    },
    {
      step: 3,
      title: "Penjelasan yang Bikin",
      subtitle: "\"OHHHH\"!",
      description: "Dapatkan jawaban yang bikin kamu langsung paham! Bukan cuma tau jawaban benarnya apa, tapi juga \"kenapa\" dengan bahasa yang enak dibaca. Dijamin ada momen \"Ohhh, jadi begitu!\" setiap kali belajar.",
      position: 'left',
      color: 'primary',
      icon: '💡'
    },
    {
      step: 4,
      title: "Lemari Soal yang Selalu",
      subtitle: "DIISI ULANG",
      description: "Jangan khawatir kehabisan soal! Lemari soal kami selalu penuh dengan berbagai tipe pertanyaan yang selalu diperbarui. Dari yang gampang sampai yang bikin mikir, semua ada untuk membuat belajarmu lebih seru.",
      position: 'right',
      color: 'secondary',
      icon: '📚'
    },
    {
      step: 5,
      title: "Lihat Kemajuanmu",
      subtitle: "NAIK TERUS!",
      description: "Saksikan perjalanan belajarmu melalui grafik yang colorful dan mudah dipahami. Rasakan kegembiraan melihat garis progressmu naik terus, seperti menonton tanaman yang kamu rawat tumbuh setiap hari!",
      position: 'left',
      color: 'primary',
      icon: '📈'
    }
  ];

  return (
    <section className="section bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements using design system */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {/* Top decorative asset */}
        <div className="absolute top-20 left-8 w-32 h-32">
          <OptimizedImage
            src="/images/illustrations/marketing/benefit-asset-top.svg"
            alt=""
            width={128}
            height={128}
            className="object-contain animate-float"
          />
        </div>

        {/* Bottom decorative asset */}
        <div className="absolute bottom-8 right-8 w-32 h-32">
          <OptimizedImage
            src="/images/illustrations/marketing/benefit-asset-bottom.svg"
            alt=""
            width={128}
            height={128}
            className="object-contain animate-float"
            style={{ animationDelay: '1s' }}
          />
        </div>

        {/* Central logo watermark */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 opacity-10">
          <OptimizedImage
            src="/images/logo/logo-prestige-blue.svg"
            alt=""
            width={320}
            height={320}
            className="object-contain"
          />
        </div>
      </div>

      <div className="container relative z-10" ref={contentRef}>
        {/* Header using design system */}
        <SectionReveal direction="up" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Kenapa harus Tryout di{' '}
            <span className="gradient-text-animated">Prestige Academy</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Temukan 5 alasan mengapa Prestige Academy adalah pilihan terbaik untuk persiapan ujian impianmu
          </p>
        </SectionReveal>

        {/* Timeline Container using design system card */}
        <div className="max-w-6xl mx-auto">
          <SectionReveal direction="up" delay={0.2}>
            <div className="relative card-base p-8 md:p-12 shadow-elevation-2">
              {/* Central Timeline Line */}
              <div className="absolute left-1/2 top-8 bottom-8 w-1 bg-gradient-to-b from-primary via-secondary to-primary transform -translate-x-1/2 hidden md:block">
                <div className="absolute inset-0 bg-background rounded-full scale-50" />
              </div>

              {/* Mobile Timeline Indicator */}
              <div className="md:hidden mb-8">
                <div className="flex justify-center items-center gap-2">
                  {benefits.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index + 1)}
                      className={cn(
                        'w-8 h-8 rounded-full transition-all duration-300 focus-visible-ring',
                        activeStep === index + 1
                          ? 'bg-primary scale-125'
                          : 'bg-muted hover:bg-muted-foreground/20'
                      )}
                      aria-label={`Go to step ${index + 1}`}
                    >
                      <span className="text-white text-sm font-bold">
                        {activeStep === index + 1 ? index + 1 : ''}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline Items */}
              <div className="space-y-16 md:space-y-24">
                {benefits.map((benefit, index) => (
                  <div
                    key={benefit.step}
                    className={cn(
                      'relative transition-all duration-700',
                      activeStep >= benefit.step ? 'opacity-100' : 'opacity-50'
                    )}
                  >
                    {/* Step Number Circle */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
                      <button
                        onClick={() => setActiveStep(benefit.step)}
                        className={cn(
                          'w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-300 shadow-elevation-2 hover:scale-110 focus-visible-ring',
                          benefit.color === 'primary'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
                          activeStep === benefit.step && 'ring-4 ring-background ring-offset-4 ring-offset-muted scale-110'
                        )}
                        aria-label={`Step ${benefit.step}`}
                      >
                        {benefit.icon || benefit.step}
                      </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col md:flex-row">
                      {/* Left Content */}
                      <div className={cn(
                        'w-full md:w-1/2 md:pr-16',
                        benefit.position === 'right' && 'md:order-2 md:pl-16 md:pr-0',
                        benefit.position === 'right' && 'md:invisible md:h-0'
                      )}>
                        <div className={cn(
                          'space-y-4 p-6 rounded-2xl transition-all duration-300',
                          benefit.position === 'left' ? 'md:text-right' : 'md:text-left',
                          activeStep === benefit.step
                            ? 'bg-gradient-to-br from-muted/50 to-background shadow-elevation-1'
                            : 'bg-transparent'
                        )}>
                          {/* Mobile Step Indicator */}
                          <div className="md:hidden flex items-center gap-3 mb-4">
                            <div className={cn(
                              'w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold',
                              benefit.color === 'primary' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                            )}>
                              {benefit.icon || benefit.step}
                            </div>
                            <div className="flex-1 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                          </div>

                          <h3 className="text-xl md:text-2xl font-bold text-foreground">
                            {benefit.title}
                          </h3>
                          <h4 className={cn(
                            'text-2xl md:text-3xl font-bold mb-3',
                            benefit.color === 'primary' ? 'text-primary' : 'text-secondary'
                          )}>
                            {benefit.subtitle}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed text-pretty">
                            {benefit.description}
                          </p>

                          {/* Progress Indicator */}
                          <div className="flex items-center gap-2 pt-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  'h-full transition-all duration-1000 ease-out',
                                  benefit.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                                )}
                                style={{
                                  width: activeStep >= benefit.step ? '100%' : '0%'
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground tabular-nums">
                              {benefit.step}/5
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Content - Mirror for right-positioned items */}
                      <div className={cn(
                        'w-full md:w-1/2 md:pl-16',
                        benefit.position === 'left' && 'md:order-2 md:invisible md:h-0'
                      )}>
                        <div className={cn(
                          'space-y-4 p-6 rounded-2xl transition-all duration-300 md:text-left',
                          activeStep === benefit.step
                            ? 'bg-gradient-to-br from-muted/50 to-background shadow-elevation-1'
                            : 'bg-transparent'
                        )}>
                          <h3 className="text-xl md:text-2xl font-bold text-foreground">
                            {benefit.title}
                          </h3>
                          <h4 className={cn(
                            'text-2xl md:text-3xl font-bold mb-3',
                            benefit.color === 'primary' ? 'text-primary' : 'text-secondary'
                          )}>
                            {benefit.subtitle}
                          </h4>
                          <p className="text-muted-foreground leading-relaxed text-pretty">
                            {benefit.description}
                          </p>

                          {/* Progress Indicator */}
                          <div className="flex items-center gap-2 pt-2">
                            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className={cn(
                                  'h-full transition-all duration-1000 ease-out',
                                  benefit.color === 'primary' ? 'bg-primary' : 'bg-secondary'
                                )}
                                style={{
                                  width: activeStep >= benefit.step ? '100%' : '0%'
                                }}
                              />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground tabular-nums">
                              {benefit.step}/5
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Navigation using design system buttons */}
              <div className="mt-12 flex justify-center items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                  disabled={activeStep === 1}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Sebelumnya
                </Button>

                <div className="flex gap-2">
                  {benefits.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        'w-2 h-2 rounded-full transition-all duration-300',
                        activeStep === index + 1 ? 'bg-primary w-8' : 'bg-muted'
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveStep(Math.min(5, activeStep + 1))}
                  disabled={activeStep === 5}
                  className="disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Selanjutnya
                </Button>
              </div>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;