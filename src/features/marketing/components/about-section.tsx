'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { OptimizedImage } from '@/shared/components/ui/optimized-image';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { useBreakpoint } from '@/shared/design-system/theme/responsive';
import { useInViewAnimation } from '@/shared/design-system/motion/hooks';
import { Grid } from '@/shared/components/layout/grid';
import { Stack } from '@/shared/components/layout/stack';
import { SectionReveal } from '@/shared/components/ui/section-reveal';
import { FloatingElement } from '@/shared/components/ui/floating-element';
import { ParallaxContainer } from '@/shared/components/ui/parallax-container';
import { useRef, memo, useMemo } from 'react';
import {
  Users,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  Sparkles
} from 'lucide-react';

// Animation configurations
const ANIMATION_CONFIG = {
  threshold: 0.1,
  triggerOnce: true,
  stagger: 0.1,
  duration: 0.6,
} as const;

// Features data with icons
const FEATURES = [
  {
    id: 'platform',
    icon: Users,
    text: '#Platform Terintegrasi',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'field-report',
    icon: Target,
    text: '#Soal Berbasis Field Report',
    color: 'from-green-500 to-green-600',
  },
  {
    id: 'evaluation',
    icon: TrendingUp,
    text: '#Evaluasi Diagnostik Presisi Tinggi',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 'community',
    icon: Award,
    text: '#Komunitas Profesional',
    color: 'from-orange-500 to-orange-600',
  },
] as const;

// Statistics data
const STATS = [
  { value: '50K+', label: 'Peserta Aktif', icon: Users },
  { value: '98%', label: 'Tingkat Kepuasan', icon: TrendingUp },
  { value: '5000+', label: 'Soal Premium', icon: Target },
  { value: '24/7', label: 'Support', icon: Award },
] as const;

// Memoized animated badge component using design system
const AnimatedBadge = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    threshold: ANIMATION_CONFIG.threshold,
    once: ANIMATION_CONFIG.triggerOnce
  });

  return (
    <motion.div
      ref={ref}
      className="mb-12 lg:mb-16 flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: ANIMATION_CONFIG.duration }}
    >
      <motion.div
        className="inline-flex items-center gap-3 glass-effect px-6 py-3 shadow-elevation-2 hover:shadow-elevation-3 transition-all duration-300 rounded-full"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="w-5 h-5 text-primary" />
        </motion.div>
        <span className="text-foreground text-sm lg:text-base font-medium">
          Tingkatkan nilai dengan simulasi berbasis riset!
        </span>
        <motion.span
          className="text-primary text-sm md:text-base font-semibold whitespace-nowrap"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Jadilah peserta berikutnya →
        </motion.span>
      </motion.div>
    </motion.div>
  );
});

AnimatedBadge.displayName = 'AnimatedBadge';

// Memoized image component with parallax using design system
const AboutImage = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const isInView = useInView(ref, {
    threshold: ANIMATION_CONFIG.threshold,
    once: ANIMATION_CONFIG.triggerOnce
  });

  return (
    <SectionReveal direction="left" delay={0.2}>
      <motion.div
        ref={ref}
        className="lg:w-1/2 relative order-2 lg:order-1"
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: ANIMATION_CONFIG.duration, delay: 0.2 }}
      >
        <motion.div
          className="relative max-w-lg mx-auto lg:mx-0"
          style={{ y, scale }}
        >
          {/* Decorative background elements using design system floating elements */}
          <ParallaxContainer speed={0.2} className="absolute -top-8 -left-8">
            <FloatingElement intensity="subtle" speed="slow">
              <div className="w-24 h-24 bg-primary/10 rounded-full blur-xl" />
            </FloatingElement>
          </ParallaxContainer>

          <ParallaxContainer speed={-0.1} className="absolute -bottom-8 -right-8">
            <FloatingElement intensity="normal" speed="normal">
              <div className="w-32 h-32 bg-secondary/10 rounded-full blur-xl" />
            </FloatingElement>
          </ParallaxContainer>

          {/* Main image using design system OptimizedImage */}
          <motion.div
            className="relative z-10"
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <OptimizedImage
              src="/images/illustrations/marketing/about-asset.svg"
              alt="About Prestige Academy"
              width={600}
              height={500}
              className="w-full h-auto filter drop-shadow-2xl"
              priority={false}
              quality={80}
            />
          </motion.div>

          {/* Floating achievement badges using design system Card */}
          <motion.div
            className="absolute top-8 right-4 card-base p-3 shadow-elevation-3 border"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-success" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">95%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </SectionReveal>
  );
});

AboutImage.displayName = 'AboutImage';

// Memoized content component using design system
const AboutContent = memo(() => {
  const { ref: contentRef, variants: containerVariants, animate, initial } = useInViewAnimation('fadeInUp', {
    threshold: ANIMATION_CONFIG.threshold,
    stagger: true,
    staggerDelay: ANIMATION_CONFIG.stagger
  });

  return (
    <motion.div
      ref={contentRef}
      className="lg:w-1/2 order-1 lg:order-2"
      variants={containerVariants}
      initial={initial}
      animate={animate}
    >
      <Stack direction="vertical" spacing="lg" animate stagger>
        {/* Main heading using design system typography */}
        <motion.div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
            <motion.span
              className="block text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Tentang,
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-primary">Prestige </span>
              <span className="text-secondary">Academy</span>
            </motion.span>
          </h2>
        </motion.div>

        {/* Description paragraphs using design system text utilities */}
        <Stack direction="vertical" spacing="md">
          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed text-pretty">
            Selamat datang di Prestige Academy, tempat di mana semangat
            belajar dan potensi berharga bertemu. Seperti Jalak Bali yang
            langka dan istimewa, kami percaya bahwa setiap individu
            memiliki keunikan, transformasi pengetahuan, dan kebebasan
            untuk terbang menuju puncak prestasi.
          </p>

          <p className="text-base lg:text-lg text-muted-foreground leading-relaxed text-pretty">
            Bersama kami, kamu akan dipersiapkan dengan materi dan tryout
            berkualitas untuk menghadapi seleksi-seleksi penting, dengan
            keseimbangan sempurna antara tradisi dan inovasi.
            Bergabunglah dan terbang lebih tinggi bersama kami,
            melestarikan nilai berhargamu sambil mencapai tujuan dengan
            penuh pencerahan dan percaya diri!
          </p>
        </Stack>

        {/* Statistics using design system Grid */}
        <Grid cols={2} responsive={{ lg: 4 }} gap="md" className="py-6">
          {STATS.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center group card-hover p-4 rounded-xl"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xl lg:text-2xl font-bold text-foreground tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            );
          })}
        </Grid>

        {/* Feature badges using design system Badge */}
        <div className="flex flex-wrap gap-3 lg:gap-4">
          {FEATURES.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant="outline"
                  className="group glass-effect border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 px-4 py-2 cursor-default"
                >
                  <IconComponent className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  {feature.text}
                </Badge>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button using design system Button */}
        <div>
          <Button
            size="lg"
            variant="default"
            animation="lift"
            className="group"
            asChild
          >
            <a href="#packages">
              Jelajahi Paket Kami
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </Stack>
    </motion.div>
  );
});

AboutContent.displayName = 'AboutContent';

// Main About Section component using design system
export default function AboutSection() {
  const { isMobile } = useBreakpoint();

  return (
    <section
      className="section marketing-gradient relative overflow-hidden"
      aria-label="About Prestige Academy"
    >
      {/* Background decorative elements using design system ParallaxContainer */}
      <div className="absolute inset-0 pointer-events-none">
        <ParallaxContainer speed={0.3} className="absolute top-1/4 left-4">
          <FloatingElement intensity="subtle" speed="slow">
            <div className="w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          </FloatingElement>
        </ParallaxContainer>

        <ParallaxContainer speed={-0.2} className="absolute bottom-1/4 right-4">
          <FloatingElement intensity="normal" speed="normal">
            <div className="w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          </FloatingElement>
        </ParallaxContainer>
      </div>

      <div className="container relative z-10">
        <AnimatedBadge />

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 xl:gap-20">
          <AboutImage />
          <AboutContent />
        </div>
      </div>
    </section>
  );
}