'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, Shield, Users, Award } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { AnimatedText } from '@/shared/components/ui/animated-text';
import { FloatingElement } from '@/shared/components/ui/floating-element';
import { ParallaxContainer } from '@/shared/components/ui/parallax-container';
import { EntranceAnimation} from '@/shared/components/ui/entrance-animation';
import { useInViewAnimation } from '@/shared/design-system/motion/hooks';
import { marketingVariants } from '@/shared/design-system/motion/variants';

const stats = [
  { icon: Users, value: '50K+', label: 'Peserta Aktif' },
  { icon: Award, value: '95%', label: 'Tingkat Kelulusan' },
  { icon: Shield, value: '100%', label: 'Terpercaya' },
];

export function HeroSection() {
  const { ref: heroRef, variants: heroVariants, animate: heroAnimate, initial } = useInViewAnimation('fadeInUp', {
    threshold: 0.2,
    stagger: true,
    staggerDelay: 0.2
  });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <ParallaxContainer speed={0.3} className="absolute top-20 right-10 opacity-20">
          <FloatingElement intensity="subtle" speed="slow">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary blur-3xl" />
          </FloatingElement>
        </ParallaxContainer>

        <ParallaxContainer speed={-0.2} className="absolute bottom-20 left-10 opacity-20">
          <FloatingElement intensity="normal" speed="normal" direction="diagonal">
            <div className="w-48 h-48 rounded-full bg-gradient-to-r from-secondary to-primary blur-3xl" />
          </FloatingElement>
        </ParallaxContainer>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-5" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">

          {/* Left Content */}
          <motion.div
            ref={heroRef}
            variants={heroVariants}
            initial={initial}
            animate={heroAnimate}
            className="space-y-8"
          >
            {/* Badge */}
            <EntranceAnimation variant="scale" delay={0.1}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Shield className="w-4 h-4" />
                Platform Tryout #1 di Indonesia
              </div>
            </EntranceAnimation>

            {/* Main Heading */}
            <div className="space-y-4">
              <AnimatedText
                variant="reveal"
                stagger
                delay={0.3}
                as="h1"
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              >
                Wujudkan Impian
              </AnimatedText>

              <AnimatedText
                variant="shimmer"
                delay={0.6}
                as="div"
                className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text-animated"
              >
                Menjadi ASN
              </AnimatedText>

              <AnimatedText
                variant="fadeInUp"
                delay={0.9}
                as="p"
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
              >
                Platform tryout online terpercaya dengan sistem CAT yang identik dengan ujian asli.
                Raih skor tertinggi dengan persiapan yang tepat!
              </AnimatedText>
            </div>

            {/* CTA Buttons */}
            <EntranceAnimation variant="fade" delay={1.2}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button
                    variant="gradient"
                    size="lg"
                    animation="glow"
                    className="group"
                    rightIcon={
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    }
                  >
                    Mulai Tryout Gratis
                  </Button>
                </Link>

                <Button
                  variant="outline"
                  size="lg"
                  animation="lift"
                  icon={<Play className="w-5 h-5" />}
                >
                  Lihat Demo
                </Button>
              </div>
            </EntranceAnimation>

            {/* Stats */}
            <EntranceAnimation variant="slide" direction="up" delay={1.5}>
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.7 + index * 0.1, type: 'spring' }}
                    className="text-center group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-2 mx-auto group-hover:bg-primary/20 transition-colors">
                      <stat.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </EntranceAnimation>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            variants={marketingVariants.heroImage}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            {/* Main Hero Image */}
            <div className="relative">
              <FloatingElement intensity="normal" speed="slow">
                <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border">
                  {/* Header Bar */}
                  <div className="bg-gradient-to-r from-primary to-secondary p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 bg-white/30 rounded-full" />
                        <div className="w-3 h-3 bg-white/30 rounded-full" />
                        <div className="w-3 h-3 bg-white/30 rounded-full" />
                      </div>
                      <div className="text-white font-medium">Sistem CAT - Tryout CPNS</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">Tes Wawasan Kebangsaan</h3>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        85/100
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="text-sm text-gray-600 mb-2">Soal 15 dari 100</div>
                        <div className="font-medium mb-3">Pancasila sebagai dasar negara Indonesia mengandung nilai-nilai...</div>
                        <div className="space-y-2">
                          {['A. Ketuhanan', 'B. Kemanusiaan', 'C. Persatuan', 'D. Kerakyatan'].map((option, i) => (
                            <div key={i} className={`p-2 rounded ${i === 1 ? 'bg-primary text-white' : 'bg-white border'}`}>
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="text-sm text-gray-500">⏱️ 45:30 tersisa</div>
                      <Button size="sm" variant="secondary">
                        Lanjut
                      </Button>
                    </div>
                  </div>
                </div>
              </FloatingElement>

              {/* Floating Cards */}
              <ParallaxContainer speed={0.5} className="absolute -top-4 -right-4">
                <FloatingElement intensity="subtle" speed="fast">
                  <div className="bg-white rounded-xl shadow-lg p-4 border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Ranking #1</div>
                        <div className="text-xs text-gray-500">Nasional</div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </ParallaxContainer>

              <ParallaxContainer speed={-0.3} className="absolute -bottom-6 -left-6">
                <FloatingElement intensity="normal" speed="slow" direction="horizontal">
                  <div className="bg-white rounded-xl shadow-lg p-4 border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">50,247</div>
                        <div className="text-xs text-gray-500">Peserta aktif</div>
                      </div>
                    </div>
                  </div>
                </FloatingElement>
              </ParallaxContainer>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <EntranceAnimation variant="bounce" delay={2}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="flex flex-col items-center text-muted-foreground"
          >
            <div className="text-sm mb-2">Scroll untuk melihat lebih</div>
            <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-current rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </EntranceAnimation>
    </section>
  );
}