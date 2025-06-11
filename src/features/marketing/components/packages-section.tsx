'use client';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { PriceDisplay } from '@/shared/components/ui/price-display';
import { AnimateOnScroll } from '@/shared/design-system/components/animations/animate-on-scroll';
import { SectionReveal } from '@/shared/design-system/components/animations/section-reveal';
import { EntranceAnimation } from '@/shared/design-system/components/animations/entrance-animation';
import { FloatingElement } from '@/shared/design-system/components/animations/floating-element';
import { ParallaxContainer } from '@/shared/design-system/components/animations/parallax-container';
import { Grid } from '@/shared/components/layout/grid';
import { Stack } from '@/shared/components/layout/stack';
import { useInViewAnimation } from '@/shared/design-system/motion/hooks';
import { useAnimatedCounter } from '@/shared/hooks/use-ani';
import { motion } from 'framer-motion';
import { OptimizedImage } from '@/shared/design-system/components/animations/optimized-image';
import { Check, Zap, ArrowRight, Gift } from 'lucide-react';

interface Package {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    price: number;
    features: string[];
    popular?: boolean;
}

const CardBanner = () => (
  <div className="relative h-32 w-full overflow-hidden rounded-t-xl mt-4 px-4">
      <div className="relative h-full w-full">
          <OptimizedImage
            src="./images/illustrations/marketing/card-banner.svg"
            alt="Card Banner"
            fill
            className="object-contain"
            priority
          />
      </div>
  </div>
);

const CardHeader = ({ title, subtitle, index }: {
    title: string;
    subtitle: string;
    index: number;
}) => (
  <div className="flex justify-between items-start mb-4">
      <div>
          <h3 className="text-lg font-bold text-foreground mb-1">
              {title}
          </h3>
          <p className="text-foreground font-semibold">
              {subtitle}
          </p>
      </div>
      <Badge
        variant={index === 0 ? "default" : "secondary"}
        className="border-2 border-primary text-primary"
      >
          {index === 0 ? "Gratis!" : "Premium!"}
      </Badge>
  </div>
);

const CardDescription = ({ description }: { description: string }) => (
  <div className="mb-4 space-y-2">
      <p className="text-sm font-semibold text-foreground">
          TRYOUT AKBAR GRATIS SKD TAHAP 1
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed text-pretty">
          {description}
      </p>
  </div>
);

const FeatureItem = ({ feature }: { feature: string }) => (
  <li className="flex items-start gap-3 text-sm">
      <div className="w-5 h-5 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
          <Check className="w-3 h-3" />
      </div>
      <span className="text-muted-foreground">{feature}</span>
  </li>
);

const FeaturesList = ({ features }: { features: string[] }) => (
  <ul className="space-y-2 mb-4">
      {features.map((feature, idx) => (
        <FeatureItem key={idx} feature={feature} />
      ))}
  </ul>
);

const PackageCard = ({ pkg, index }: { pkg: Package; index: number }) => {
    const { ref, count } = useAnimatedCounter({
        end: pkg.price,
        duration: 1500,
        prefix: 'Rp ',
    });

    return (
      <SectionReveal direction="up" delay={index * 0.2}>
          <Card
            hover
            interactive
            className="relative overflow-hidden transition-all duration-300 h-full group"
            elevation={pkg.popular ? 4 : 2}
          >
              {pkg.popular && (
                <motion.div
                  className="absolute top-2 right-2 z-20"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                    <Badge className="bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-glow">
                        <Zap className="w-3 h-3 mr-1" />
                        Populer
                    </Badge>
                </motion.div>
              )}

              <div className="flex flex-col h-full">
                  <CardBanner />

                  <div className="relative px-4 pb-6 flex-1">
                      <div className="card-base mt-2 p-4 h-full flex flex-col">
                          <div className="flex-1">
                              <CardHeader title={pkg.title} subtitle={pkg.subtitle} index={index} />
                              <CardDescription description={pkg.description} />

                              <div className="mb-4" ref={ref}>
                                  <div className="flex items-baseline gap-1">
                                      <span className="text-xs text-muted-foreground">RP</span>
                                      <span className="text-3xl font-bold text-foreground tabular-nums">
                      {count}
                    </span>
                                  </div>
                              </div>

                              <FeaturesList features={pkg.features} />
                          </div>

                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                variant={pkg.popular ? "gradient" : "default"}
                                size="default"
                                animation="lift"
                                className="w-full group"
                                rightIcon={
                                    <motion.span
                                      animate={{ x: [0, 5, 0] }}
                                      transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.span>
                                }
                              >
                                  Coba Sekarang!
                              </Button>
                          </motion.div>
                      </div>
                  </div>
              </div>

              {/* Floating Elements for interactive effect */}
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  <FloatingElement intensity="subtle" speed="fast" className="absolute top-4 right-4">
                      <div className="w-4 h-4 bg-primary/20 rounded-full" />
                  </FloatingElement>
                  <FloatingElement intensity="normal" speed="slow" className="absolute bottom-4 left-4">
                      <div className="w-3 h-3 bg-secondary/10 rounded-full" />
                  </FloatingElement>
              </div>
          </Card>
      </SectionReveal>
    );
};

const PackagesSection = () => {
    const { ref: sectionRef, variants: containerVariants, animate, initial } = useInViewAnimation('fadeInUp', {
        threshold: 0.1,
        stagger: true,
        staggerDelay: 0.3
    });

    const packages: Package[] = [
        {
            id: "1",
            title: "Paket Gratis",
            subtitle: "Untuk Pemula",
            description: "Pengenalan TryOut SKD Berisi soal-soal HOTS berdasarkan FR Peserta SKD CPNS 2024",
            price: 0,
            features: [
                "Akses 1 Tryout SKD",
                "Pembahasan Soal",
                "Analisis Hasil"
            ]
        },
        {
            id: "2",
            title: "Paket Premium",
            subtitle: "Rekomendasi",
            description: "Persiapan lengkap untuk TryOut SKD dengan soal-soal berkualitas tinggi",
            price: 99000,
            features: [
                "Akses 5 Tryout SKD",
                "Pembahasan Video",
                "Analisis Detail",
                "Konsultasi",
                "Materi Pembelajaran"
            ],
            popular: true
        },
        {
            id: "3",
            title: "Paket Ultimate",
            subtitle: "Persiapan Penuh",
            description: "Persiapan maksimal dengan fitur lengkap dan garansi kelulusan",
            price: 199000,
            features: [
                "Akses 10 Tryout SKD",
                "Pembahasan Video",
                "Analisis Detail",
                "Konsultasi Pribadi",
                "Materi Pembelajaran",
                "Garansi Kelulusan"
            ]
        }
    ];

    return (
      <section className="section bg-gradient-to-b from-muted/30 to-background relative overflow-hidden" id="packages">
          {/* Background Decorations using design system */}
          <div className="absolute inset-0 -z-10">
              <ParallaxContainer speed={0.2} className="absolute top-10 left-10 opacity-20">
                  <FloatingElement intensity="subtle" speed="slow">
                      <div className="w-40 h-40 rounded-full bg-gradient-to-r from-primary/30 to-secondary/30 blur-3xl" />
                  </FloatingElement>
              </ParallaxContainer>

              <ParallaxContainer speed={-0.1} className="absolute bottom-10 right-10 opacity-20">
                  <FloatingElement intensity="normal" speed="normal">
                      <div className="w-60 h-60 rounded-full bg-gradient-to-r from-secondary/30 to-primary/30 blur-3xl" />
                  </FloatingElement>
              </ParallaxContainer>
          </div>

          <div className="container mx-auto px-4" ref={sectionRef}>
              <motion.div
                variants={containerVariants}
                initial={initial}
                animate={animate}
              >
                  {/* Header using design system */}
                  <div className="text-center mb-16 max-w-3xl mx-auto">
                      <EntranceAnimation variant="scale" delay={0.1}>
                          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                              <Gift className="w-4 h-4" />
                              Paket Tryout
                          </div>
                      </EntranceAnimation>

                      <SectionReveal direction="up" delay={0.3}>
                          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                              Pilih Paket yang Tepat untuk Kesuksesanmu
                          </h2>
                      </SectionReveal>

                      <SectionReveal direction="up" delay={0.6}>
                          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
                              Dapatkan akses ke ribuan soal berkualitas tinggi dengan sistem pembelajaran yang
                              dipersonalisasi untuk memaksimalkan peluang kelulusanmu.
                          </p>
                      </SectionReveal>
                  </div>

                  {/* Packages Grid using design system */}
                  <Grid
                    cols={1}
                    responsive={{ md: 2, lg: 3 }}
                    gap="lg"
                    className="max-w-7xl mx-auto mb-16"
                    animate
                    stagger
                  >
                      {packages.map((pkg, index) => (
                        <PackageCard
                          key={pkg.id}
                          pkg={pkg}
                          index={index}
                        />
                      ))}
                  </Grid>

                  {/* Bottom CTA using design system */}
                  <SectionReveal direction="up" delay={1}>
                      <div className="text-center max-w-2xl mx-auto">
                          <Card className="p-8 marketing-gradient border-dashed border-2 border-primary/20">
                              <Stack direction="vertical" spacing="md" align="center">
                                  <h3 className="text-xl font-bold">
                                      Tidak yakin paket mana yang tepat?
                                  </h3>
                                  <p className="text-muted-foreground text-center">
                                      Konsultasi gratis dengan tim ahli kami untuk mendapatkan rekomendasi
                                      paket yang sesuai dengan kebutuhan dan target ujianmu.
                                  </p>
                                  <EntranceAnimation variant="bounce" delay={0.4}>
                                      <Button
                                        variant="outline"
                                        animation="glow"
                                        className="mx-auto"
                                      >
                                          Konsultasi Gratis
                                      </Button>
                                  </EntranceAnimation>
                              </Stack>
                          </Card>
                      </div>
                  </SectionReveal>
              </motion.div>
          </div>
      </section>
    );
};

export default PackagesSection;