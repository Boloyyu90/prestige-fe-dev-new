// src/features/marketing/components/about-section.tsx
'use client';

import { motion } from 'framer-motion';
import { Target, BarChart, BookOpen, Users, Trophy, Zap } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Card } from '@/shared/components/ui/card';
import { AnimatedText } from '@/shared/components/ui/animated-text';
import { FloatingElement } from '@/shared/components/ui/floating-element';
import { ParallaxContainer } from '@/shared/components/ui/parallax-container';
import { EntranceAnimation } from '@/shared/components/ui/entrance-animation';
import { SectionReveal } from '@/shared/components/ui/section-reveal';
import { MagneticWrapper } from '@/shared/components/ui/magnetic-wrapper';
import { Grid } from '@/shared/components/layout/grid';
import { Stack} from '@/shared/components/layout/stack';
import { useInViewAnimation } from '@/shared/design-system/motion/hooks';

const features = [
  {
    icon: Target,
    title: 'Akurasi Tinggi',
    description: 'Soal-soal yang disusun berdasarkan kisi-kisi resmi dan pola ujian terbaru',
    color: 'bg-blue-500',
    lightColor: 'bg-blue-50',
    stats: '99.8% Akurat'
  },
  {
    icon: BarChart,
    title: 'Analisis Mendalam',
    description: 'Laporan performa detail dengan rekomendasi pembelajaran yang personal',
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    stats: '15+ Metrik'
  },
  {
    icon: BookOpen,
    title: 'Materi Lengkap',
    description: 'Bank soal terlengkap dengan pembahasan step-by-step dari ahli',
    color: 'bg-purple-500',
    lightColor: 'bg-purple-50',
    stats: '50K+ Soal'
  },
  {
    icon: Users,
    title: 'Komunitas Aktif',
    description: 'Bergabung dengan ribuan calon ASN yang saling mendukung',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    stats: '50K+ Member'
  }
];

const achievements = [
  { number: '95%', label: 'Tingkat Kelulusan', suffix: '' },
  { number: '50', label: 'Ribu Peserta', suffix: 'K+' },
  { number: '4.9', label: 'Rating Pengguna', suffix: '/5' },
  { number: '24/7', label: 'Support Online', suffix: '' }
];

export default function AboutSection() {
  const { ref: sectionRef, variants: containerVariants, animate, initial } = useInViewAnimation('fadeInUp', {
    threshold: 0.1,
    stagger: true,
    staggerDelay: 0.2
  });

  return (
    <section className="section bg-gradient-to-b from-background to-muted/30 relative overflow-hidden" id="about">
      {/* Background Decorations */}
      <div className="absolute inset-0 -z-10">
        <ParallaxContainer speed={0.2} className="absolute top-20 right-0 opacity-30">
          <FloatingElement intensity="subtle" speed="slow">
            <div className="w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl" />
          </FloatingElement>
        </ParallaxContainer>

        <ParallaxContainer speed={-0.15} className="absolute bottom-20 left-0 opacity-30">
          <FloatingElement intensity="normal" speed="normal">
            <div className="w-48 h-48 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 blur-3xl" />
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
                <Trophy className="w-4 h-4" />
                Tentang Prestige Academy
              </div>
            </EntranceAnimation>

            <AnimatedText
              variant="reveal"
              stagger
              delay={0.3}
              as="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            >
              Platform Tryout Terdepan untuk Masa Depan Cemerlang
            </AnimatedText>

            <AnimatedText
              variant="fadeInUp"
              delay={0.6}
              as="p"
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Kami tidak hanya menyediakan soal tryout, tetapi membangun ekosistem pembelajaran yang komprehensif
              untuk mempersiapkan Anda menjadi ASN yang unggul dan kompeten.
            </AnimatedText>
          </div>

          {/* Main Content Grid */}
          <Grid cols={1} responsive={{ lg: 2 }} gap="xl" className="mb-20">
            {/* Left: Image & Stats */}
            <div className="space-y-8">
              <SectionReveal direction="left" delay={0.8}>
                <div className="relative">
                  <FloatingElement intensity="subtle" speed="slow">
                    <Card hover className="p-0 overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-primary to-secondary p-8 text-white relative">
                        <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold mb-4">Teknologi CAT Terdepan</h3>
                          <p className="text-white/90 mb-6">
                            Sistem Computer Assisted Test yang identik dengan ujian sesungguhnya
                          </p>
                          <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                              {[1,2,3,4].map(i => (
                                <div key={i} className="w-8 h-8 bg-white/20 rounded-full border-2 border-white" />
                              ))}
                            </div>
                            <span className="text-sm">+50K Pengguna Aktif</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </FloatingElement>

                  {/* Floating Achievement Cards */}
                  <ParallaxContainer speed={0.3} className="absolute -bottom-6 -right-6">
                    <FloatingElement intensity="normal" speed="fast">
                      <Card className="p-4 bg-white border shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Zap className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <div className="font-semibold text-sm">Teknologi AI</div>
                            <div className="text-xs text-muted-foreground">Smart Analysis</div>
                          </div>
                        </div>
                      </Card>
                    </FloatingElement>
                  </ParallaxContainer>
                </div>
              </SectionReveal>

              {/* Achievement Stats */}
              <SectionReveal direction="up" delay={1}>
                <Grid cols={2} gap="md">
                  {achievements.map((achievement, index) => (
                    <MagneticWrapper key={achievement.label} strength={0.1}>
                      <Card
                        hover
                        className="p-6 text-center group cursor-pointer"
                        elevation={2}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: 1.2 + index * 0.1, type: 'spring' }}
                          className="text-3xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform"
                        >
                          {achievement.number}{achievement.suffix}
                        </motion.div>
                        <div className="text-sm text-muted-foreground font-medium">
                          {achievement.label}
                        </div>
                      </Card>
                    </MagneticWrapper>
                  ))}
                </Grid>
              </SectionReveal>
            </div>

            {/* Right: Features */}
            <div className="space-y-6">
              <SectionReveal direction="right" delay={0.8}>
                <AnimatedText
                  variant="fadeInUp"
                  as="h3"
                  className="text-2xl font-bold mb-6"
                >
                  Mengapa Memilih Prestige Academy?
                </AnimatedText>
              </SectionReveal>

              <Stack direction="vertical" spacing="md">
                {features.map((feature, index) => (
                  <SectionReveal key={feature.title} direction="right" delay={1 + index * 0.1}>
                    <MagneticWrapper strength={0.05}>
                      <Card
                        hover
                        interactive
                        className="p-6 group cursor-pointer"
                        elevation={1}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 ${feature.lightColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <feature.icon className={`w-6 h-6 ${feature.color.replace('bg-', 'text-')}`} />
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                {feature.title}
                              </h4>
                              <span className={`text-xs px-2 py-1 ${feature.lightColor} ${feature.color.replace('bg-', 'text-')} rounded-full font-medium`}>
                                {feature.stats}
                              </span>
                            </div>
                            <p className="text-muted-foreground">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </MagneticWrapper>
                  </SectionReveal>
                ))}
              </Stack>
            </div>
          </Grid>

          {/* Bottom CTA Section */}
          <SectionReveal direction="up" delay={1.5}>
            <Card
              className="p-8 md:p-12 text-center bg-gradient-to-r from-primary to-secondary text-white relative overflow-hidden"
              elevation={3}
            >
              <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10" />
              <div className="relative z-10 max-w-2xl mx-auto">
                <AnimatedText
                  variant="fadeInUp"
                  as="h3"
                  className="text-2xl md:text-3xl font-bold mb-4"
                >
                  Siap Memulai Perjalanan Menuju ASN?
                </AnimatedText>
                <AnimatedText
                  variant="fadeInUp"
                  delay={0.2}
                  as="p"
                  className="text-white/90 mb-8 text-lg"
                >
                  Bergabunglah dengan ribuan calon ASN yang telah mempercayai Prestige Academy
                  sebagai partner terbaik dalam persiapan ujian CPNS.
                </AnimatedText>

                <EntranceAnimation variant="bounce" delay={0.4}>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="secondary"
                      size="lg"
                      animation="lift"
                      className="bg-white text-primary hover:bg-white/90"
                    >
                      Mulai Tryout Gratis
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      animation="glow"
                      className="border-white text-white hover:bg-white hover:text-primary"
                    >
                      Pelajari Lebih Lanjut
                    </Button>
                  </div>
                </EntranceAnimation>
              </div>
            </Card>
          </SectionReveal>
        </motion.div>
      </div>
    </section>
  );
}