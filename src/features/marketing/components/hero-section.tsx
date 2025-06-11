'use client';

import { motion } from 'framer-motion';
import { Button } from '@/shared/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="min-h-[calc(100vh-64px)] flex items-center">
          <motion.div
            className="w-full lg:w-1/2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block">Langkah Awal</span>
              <span className="block">Menuju Karir</span>
              <span className="block">
                Impian{' '}
                <span className="gradient-text">CPNS!</span>
              </span>
            </motion.h1>

            <motion.p className="text-lg text-muted-foreground max-w-xl">
              Prestige Academy membuka sayap menuju era cemerlangmu!
              Seperti Jalak Bali yang istimewa, kami mengubah pengetahuan
              menjadi pencerahan.
            </motion.p>

            <motion.div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/register">Belajar Sekarang!</Link>
              </Button>
              <Button variant="default" size="lg" asChild>
                <Link href="/login">Masuk</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 3. Latar Belakang: Diposisikan absolut di belakang semua konten. */}
      {/* Logikanya diubah agar lebih sederhana dan tidak menyebabkan overflow. */}
      <div className="absolute inset-y-0 left-0 w-[58%] z-0 hidden md:block">
        <motion.div
          className="w-full h-full"
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/images/illustrations/marketing/hero-asset-left.svg"
            alt="Background Asset Left"
            fill
            className="object-contain object-left"
            priority
          />
        </motion.div>
      </div>

      <div className="absolute inset-y-0 right-0 w-[58%] z-0">
        <motion.div
          className="w-full h-full"
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/images/illustrations/marketing/hero-asset-right.svg"
            alt="Background Asset Right"
            fill
            className="object-contain object-right"
            priority
          />
        </motion.div>
      </div>

    </section>
  );
}

export default HeroSection;