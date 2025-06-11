// src/features/marketing/components/packages-section.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Star, Zap, Shield, Crown, ArrowRight, Gift } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { AnimatedText } from '@/shared/components/ui/animated-text';
import { FloatingElement } from '@/shared/components/ui/floating-element';
import { ParallaxContainer } from '@/shared/components/ui/parallax-container';
import { EntranceAnimation } from '@/shared/components/ui/entrance-animation';
import { SectionReveal } from '@/shared/components/ui/section-reveal';
import { MagneticWrapper } from '@/shared/components/ui/magnetic-wrapper';
import { Grid } from '@/shared/components/layout/grid';
import { useInViewAnimation } from '@/shared/design-system/motion/hooks';

interface Package {
    id: string;
    name: string;
    subtitle: string;
    description: string;
    price: number;
    originalPrice?: number;
    duration: string;
    features: string[];
    popular?: boolean;
    recommended?: boolean;
    icon: React.ElementType;
    color: string;
    gradient: string;
    badge?: string;
}

const packages: Package[] = [
    {
        id: 'basic',
        name: 'Basic',
        subtitle: 'Untuk Pemula',
        description: 'Paket ideal untuk mengenal sistem CAT dan memulai persiapan ujian',
        price: 0,
        duration: '30 hari',
        icon: Gift,
        color: 'text-blue-600',
        gradient: 'from-blue-500 to-blue-600',
        badge: 'Gratis',
        features: [
            '5 Tryout SKD',
            'Pembahasan Soal Dasar',
            'Laporan Hasil Sederhana',
            'Akses Materi PDF',
            'Forum Diskusi',
        ]
    },
    {
        id: 'premium',
        name: 'Premium',
        subtitle: 'Paling Populer',
        description: 'Paket lengkap dengan fitur premium untuk persiapan maksimal',
        price: 149000,
        originalPrice: 299000,
        duration: '6 bulan',
        icon: Star,
        color: 'text-orange-600',
        gradient: 'from-orange-500 to-red-500',
        popular: true,
        badge: 'Hemat 50%',
        features: [
            '50 Tryout SKD Unlimited',
            'Pembahasan Video HD',
            'Analisis AI Personal',
            'Live Class Mingguan',
            'Konsultasi 1-on-1',
            'Materi Premium PDF + Video',
            'Mock Test Intensif',
            'Leaderboard Nasional',
        ]
    },
    {
        id: 'ultimate',
        name: 'Ultimate',
        subtitle: 'Garansi Lulus',
        description: 'Paket terlengkap dengan garansi kelulusan dan mentoring intensif',
        price: 599000,
        originalPrice: 999000,
        duration: '1 tahun',
        icon: Crown,
        color: 'text-purple-600',
        gradient: 'from-purple-600 to-pink-600',
        recommended: true,
        badge: 'Best Value',
        features: [
            'Unlimited Tryout Semua Jenis',
            'Pembahasan Video 4K + Notes',
            'AI Tutor Personal 24/7',
            'Live Class + Recording',
            'Mentoring 1-on-1 Unlimited',
            'Bootcamp Intensif',
            'Simulasi Interview',
            'Garansi Uang Kembali',
            'Priority Support',
            'Sertifikat Digital',
        ]
    }
];

const PackageCard = ({ pkg, index }: { pkg: Package; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = pkg.icon;

    return (
      <SectionReveal direction="up" delay={index * 0.2}>
          <MagneticWrapper strength={0.1}>
              <Card
                className={`relative h-full overflow-hidden transition-all duration-300 ${
                  pkg.popular ? 'ring-2 ring-primary shadow-xl scale-105' : ''
                } ${pkg.recommended ? 'ring-2 ring-purple-500 shadow-xl' : ''}`}
                hover
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                elevation={pkg.popular || pkg.recommended ? 4 : 2}
              >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${pkg.gradient} opacity-0 transition-opacity duration-300 ${isHovered ? 'opacity-5' : ''}`} />

                  {/* Popular/Recommended Badge */}
                  {(pkg.popular || pkg.recommended) && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                        <motion.div
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: 'spring' }}
                          className={`px-4 py-1 rounded-full text-white text-sm font-bold shadow-lg ${
                            pkg.popular ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'
                          }`}
                        >
                            {pkg.popular ? '🔥 Populer' : '👑 Recommended'}
                        </motion.div>
                    </div>
                  )}

                  <div className="p-6 relative z-10">
                      {/* Header */}
                      <div className="text-center mb-6">
                          <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pkg.gradient} flex items-center justify-center`}>
                              <Icon className="w-8 h-8 text-white" />
                          </div>

                          <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                          <p className="text-sm text-muted-foreground mb-1">{pkg.subtitle}</p>
                          {pkg.badge && (
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${pkg.color} bg-current bg-opacity-10`}>
                  {pkg.badge}
                </span>
                          )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground text-center mb-6">
                          {pkg.description}
                      </p>

                      {/* Pricing */}
                      <div className="text-center mb-6">
                          <div className="flex items-center justify-center gap-2 mb-2">
                              {pkg.originalPrice && (
                                <span className="text-lg text-muted-foreground line-through">
                    Rp {pkg.originalPrice.toLocaleString('id-ID')}
                  </span>
                              )}
                          </div>
                          <div className="flex items-baseline justify-center gap-1">
                <span className="text-3xl font-bold">
                  {pkg.price === 0 ? 'Gratis' : `Rp ${pkg.price.toLocaleString('id-ID')}`}
                </span>
                              {pkg.price > 0 && (
                                <span className="text-muted-foreground">/{pkg.duration}</span>
                              )}
                          </div>
                      </div>

                      {/* Features */}
                      <ul className="space-y-3 mb-8">
                          {pkg.features.map((feature, idx) => (
                            <motion.li
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 * idx }}
                              className="flex items-start gap-3"
                            >
                                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                            </motion.li>
                          ))}
                      </ul>

                      {/* CTA Button */}
                      <Button
                        variant={pkg.popular ? "gradient" : pkg.recommended ? "secondary" : "outline"}
                        className="w-full"
                        animation="lift"
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                          {pkg.price === 0 ? 'Mulai Gratis' : 'Pilih Paket'}
                      </Button>
                  </div>

                  {/* Floating Elements */}
                  {isHovered && (
                    <>
                        <FloatingElement intensity="subtle" speed="fast" className="absolute top-4 right-4">
                            <div className="w-4 h-4 bg-white/20 rounded-full" />
                        </FloatingElement>
                        <FloatingElement intensity="normal" speed="slow" className="absolute bottom-4 left-4">
                            <div className="w-3 h-3 bg-white/10 rounded-full" />
                        </FloatingElement>
                    </>
                  )}
              </Card>
          </MagneticWrapper>
      </SectionReveal>
    );
};

export default function PackagesSection() {
    const { ref: sectionRef, variants: containerVariants, animate, initial } = useInViewAnimation('fadeInUp', {
        threshold: 0.1,
        stagger: true,
        staggerDelay: 0.3
    });

    return (
      <section className="section bg-gradient-to-b from-muted/30 to-background relative overflow-hidden" id="packages">
          {/* Background Decorations */}
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
                  {/* Header */}
                  <div className="text-center mb-16 max-w-3xl mx-auto">
                      <EntranceAnimation variant="scale" delay={0.1}>
                          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                              <Zap className="w-4 h-4" />
                              Paket Tryout
                          </div>
                      </EntranceAnimation>

                      <AnimatedText
                        variant="reveal"
                        stagger
                        delay={0.3}
                        as="h2"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                      >
                          Pilih Paket yang Tepat untuk Kesuksesanmu
                      </AnimatedText>

                      <AnimatedText
                        variant="fadeInUp"
                        delay={0.6}
                        as="p"
                        className="text-lg text-muted-foreground leading-relaxed"
                      >
                          Dapatkan akses ke ribuan soal berkualitas tinggi dengan sistem pembelajaran yang
                          dipersonalisasi untuk memaksimalkan peluang kelulusanmu.
                      </AnimatedText>
                  </div>

                  {/* Packages Grid */}
                  <Grid
                    cols={1}
                    responsive={{ md: 2, lg: 3 }}
                    gap="lg"
                    className="max-w-7xl mx-auto mb-16"
                  >
                      {packages.map((pkg, index) => (
                        <PackageCard key={pkg.id} pkg={pkg} index={index} />
                      ))}
                  </Grid>

                  {/* Bottom CTA */}
                  <SectionReveal direction="up" delay={1}>
                      <div className="text-center max-w-2xl mx-auto">
                          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border-dashed border-2 border-primary/20">
                              <AnimatedText
                                variant="fadeInUp"
                                as="h3"
                                className="text-xl font-bold mb-4"
                              >
                                  Tidak yakin paket mana yang tepat?
                              </AnimatedText>
                              <AnimatedText
                                variant="fadeInUp"
                                delay={0.2}
                                as="p"
                                className="text-muted-foreground mb-6"
                              >
                                  Konsultasi gratis dengan tim ahli kami untuk mendapatkan rekomendasi
                                  paket yang sesuai dengan kebutuhan dan target ujianmu.
                              </AnimatedText>

                              <EntranceAnimation variant="bounce" delay={0.4}>
                                  <Button
                                    variant="outline"
                                    animation="glow"
                                    className="mx-auto"
                                  >
                                      Konsultasi Gratis
                                  </Button>
                              </EntranceAnimation>
                          </Card>
                      </div>
                  </SectionReveal>
              </motion.div>
          </div>
      </section>
    );
}