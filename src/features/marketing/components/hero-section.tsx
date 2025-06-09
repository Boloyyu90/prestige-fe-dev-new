'use client';

import { motion } from 'framer-motion';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set window size after component mounts
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className="relative h-[calc(100vh-64px)] bg-white overflow-hidden">
      {/* Background SVG Ornaments */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute bottom-0 left-0 w-[58vw] h-full -translate-x-[9%] hidden md:block">
          <Image
            src="/images/illustrations/marketing/hero-asset-left.svg"
            alt=""
            fill
            className="object-contain"
            priority={false}
          />
        </div>

        <div className="absolute bottom-0 right-0 w-[58vw] h-full translate-x-[9%]">
          <Image
            src="/images/illustrations/marketing/hero-asset-right.svg"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 h-full">
        <div className="container h-full">
          <div className="flex items-center h-full">
            <motion.div
              className="w-full lg:w-[50%] space-y-8 md:-translate-y-16 px-4 md:px-0 md:ml-20"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >

              {/* Heading */}
              <motion.div variants={itemVariants}>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.15]">
                  <span className="block">Langkah Awal</span>
                  <span className="block">Menuju Karir</span>
                  <span className="block">
                    Impian{' '}
                    <span className="relative">
                      <span className="relative z-10 gradient-text">CPNS!</span>

                    </span>
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-base text-foreground/80 font-medium max-w-[90%] leading-[1.7]"
              >
                Prestige Academy membuka sayap menuju era cemerlangmu!
                Seperti Jalak Bali yang istimewa, kami mengubah pengetahuan
                menjadi pencerahan. Terbang tinggi bersama kami, melestarikan
                nilai berharga sambil menembus batas potensimu!
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  variant="default"
                  className="group"
                  asChild
                >
                  <Link href="/register">
                    Belajar Sekarang!
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="group"
                  asChild
                >
                  <Link href="/login">
                    Masuk
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

    </section>
  );
}

export default HeroSection;