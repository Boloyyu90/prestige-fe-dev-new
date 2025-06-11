'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/shared/components/ui/button';
import { OptimizedImage } from '@/shared/components/ui/optimized-image';
import { useBreakpoint } from '@/shared/design-system/theme/responsive';
import { useInViewAnimation } from '@/shared/design-system/motion/hooks';
import { marketingVariants } from '@/shared/design-system/motion/variants';
import Link from 'next/link';
import { ArrowRight, Sparkles, Play } from 'lucide-react';
import { memo, useCallback, useMemo } from 'react';

// Animation configurations for better performance
const ANIMATION_CONFIG = {
  stagger: 0.15,
  delay: 0.2,
  duration: 0.6,
  ease: [0.4, 0, 0.2, 1] as const,
} as const;

// Memoized background components for performance
const BackgroundAssets = memo(() => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, 30]);

  return (
    <motion.div
      className="absolute inset-0 z-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Left decorative asset */}
      <motion.div
        className="absolute bottom-0 left-0 w-[45vw] lg:w-[40vw] h-full -translate-x-[5%] hidden md:block"
        style={{ y: y1 }}
      >
        <OptimizedImage
          src="/images/illustrations/marketing/hero-asset-left.svg"
          alt=""
          fill
          className="object-contain object-bottom"
          priority={false}
          quality={60}
        />
      </motion.div>

      {/* Right decorative asset */}
      <motion.div
        className="absolute bottom-0 right-0 w-[50vw] lg:w-[45vw] h-full translate-x-[5%]"
        style={{ y: y2 }}
      >
        <OptimizedImage
          src="/images/illustrations/marketing/hero-asset-right.svg"
          alt=""
          fill
          className="object-contain object-bottom"
          priority
          quality={75}
        />
      </motion.div>

      {/* Marketing gradient overlay */}
      <div className="absolute inset-0 marketing-gradient pointer-events-none" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
});

BackgroundAssets.displayName = 'BackgroundAssets';

// Memoized content components
const HeroContent = memo(() => {
  const { isMobile, isTablet } = useBreakpoint();

  // Use integrated animation system
  const { ref: heroRef, variants: containerVariants, animate, initial } = useInViewAnimation('fadeInUp', {
    threshold: 0.2,
    stagger: true,
    staggerDelay: 0.2
  });

  // Optimized button handlers
  const handleGetStarted = useCallback(() => {
    // Add analytics tracking here
    console.log('Get started clicked');
  }, []);

  const handleWatchDemo = useCallback(() => {
    // Add analytics tracking here
    console.log('Watch demo clicked');
  }, []);

  return (
    <motion.div
      ref={heroRef}
      className="relative z-10 min-h-screen flex items-center"
      variants={containerVariants}
      initial={initial}
      animate={animate}
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Main content */}
          <motion.div
            className="space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
            variants={marketingVariants.hero}
          >
            {/* Badge - using design system badge */}
            <motion.div
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium border border-primary/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4" />
              <span>Platform Tryout #1 di Indonesia</span>
            </motion.div>

            {/* Main heading using design system typography */}
            <motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight lg:leading-[1.1]">
                <span className="block text-foreground">Langkah Awal</span>
                <span className="block text-foreground">Menuju Karir</span>
                <span className="block">
                  Impian{' '}
                  <span className="relative">
                    <span className="relative z-10 gradient-text-animated">CPNS!</span>
                    <motion.span
                      className="absolute inset-0 bg-secondary/20 -skew-x-12 -z-10"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1, duration: 0.6 }}
                    />
                  </span>
                </span>
              </h1>
            </motion.div>

            {/* Description using design system text utilities */}
            <motion.p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 text-pretty">
              Prestige Academy membuka sayap menuju era cemerlangmu!
              Seperti Jalak Bali yang istimewa, kami mengubah pengetahuan
              menjadi pencerahan. Terbang tinggi bersama kami, melestarikan
              nilai berharga sambil menembus batas potensimu!
            </motion.p>

            {/* Stats using design system grid */}
            <motion.div className="grid grid-cols-3 gap-6 lg:gap-8 justify-center lg:justify-start">
              {[
                { number: "10K+", label: "Peserta Lulus" },
                { number: "95%", label: "Tingkat Keberhasilan" },
                { number: "1000+", label: "Soal Berkualitas" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                >
                  <div className="text-2xl lg:text-3xl font-bold text-primary tabular-nums">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons using design system buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size={isMobile ? "lg" : "xl"}
                variant="gradient"
                animation="glow"
                className="group"
                onClick={handleGetStarted}
                asChild
              >
                <Link href="/register">
                  Belajar Sekarang!
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.span>
                </Link>
              </Button>

              <Button
                variant="outline"
                size={isMobile ? "lg" : "xl"}
                animation="lift"
                className="group"
                onClick={handleWatchDemo}
                icon={<Play className="w-5 h-5" />}
              >
                Tonton Demo
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <span className="text-sm text-muted-foreground">Dipercaya oleh:</span>
              <div className="flex items-center gap-6 opacity-60">
                <span className="text-sm font-medium">BKN</span>
                <span className="text-sm font-medium">Kemendikbud</span>
                <span className="text-sm font-medium">BUMN</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero visual using design system image optimization */}
          <motion.div
            className="relative order-1 lg:order-2 h-[300px] md:h-[400px] lg:h-[500px]"
            variants={marketingVariants.heroImage}
          >
            <motion.div
              className="relative w-full h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Main hero illustration */}
              <OptimizedImage
                src="/images/illustrations/marketing/hero-main-visual.svg"
                alt="Prestige Academy Hero Illustration"
                fill
                className="object-contain"
                priority
                quality={85}
              />

              {/* Floating elements using design system FloatingElement pattern */}
              <motion.div
                className="absolute top-10 right-10 w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-8 h-8 text-secondary" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

HeroContent.displayName = 'HeroContent';

// Main Hero Section component
export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-background overflow-hidden section"
      aria-label="Hero section"
    >
      <BackgroundAssets />
      <HeroContent />

      {/* Scroll indicator using design system animation */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ height: [12, 6, 12] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}