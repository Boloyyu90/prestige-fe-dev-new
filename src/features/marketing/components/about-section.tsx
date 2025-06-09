'use client';

import Image from 'next/image';
import { Badge } from '@/shared/components/ui/badge';
import { AnimateOnScroll } from '@/shared/components/ui/animate-on-scroll';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const features = [
    '#Platform Terintegrasi',
    '#Soal Berbasis Field Report',
    '#Evaluasi Diagnostik Presisi Tinggi',
    '#Komunitas Profesional'
  ];

  return (
    <section className="section bg-white">
      <div className="container">
        <AnimateOnScroll animation="fadeInUp">
          <div className="mb-16 flex justify-center">
            <motion.div
              className="inline-flex items-center rounded-full bg-white border border-gray-200 px-4 py-2 shadow-soft hover:shadow-md transition-shadow"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-gray-800 text-sm lg:text-base font-medium">
                Tingkatkan nilai dengan simulasi berbasis riset!
              </span>
              <span className="ml-2 text-primary text-sm md:text-base font-medium whitespace-nowrap">
                Jadilah peserta berikutnya →
              </span>
            </motion.div>
          </div>
        </AnimateOnScroll>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          {/* Left - Image */}
          <AnimateOnScroll
            animation="slideInLeft"
            className="lg:w-1/2 relative order-2 lg:order-1"
            delay={0.2}
          >
            <motion.div
              className="relative max-w-md mx-auto lg:mx-0"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "tween", stiffness: 300 }}
            >
              <Image
                src="./images/illustrations/marketing/about-asset.svg"
                alt="About Asset"
                width={550}
                height={450}
                className="w-full h-auto filter drop-shadow-xl"
                priority
              />
            </motion.div>
          </AnimateOnScroll>

          {/* Right - Content */}
          <AnimateOnScroll
            animation="slideInRight"
            className="lg:w-1/2 order-1 lg:order-2"
            delay={0.4}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-gray-900">Tentang,</span><br />
              <span className="text-primary-500">Prestige <span className="text-secondary-500">Academy</span></span>
            </h2>

            <div className="space-y-4 md:space-y-6">
              <p className="text-gray-900 leading-relaxed text-responsive">
                Selamat datang di Prestige Academy, tempat di mana semangat
                belajar dan potensi berharga bertemu. Seperti Jalak Bali yang
                langka dan istimewa, kami percaya bahwa setiap individu
                memiliki keunikan, transformasi pengetahuan, dan kebebasan
                untuk terbang menuju puncak prestasi.
              </p>

              <p className="text-gray-900 leading-relaxed text-responsive">
                Bersama kami, kamu akan dipersiapkan dengan materi dan tryout
                berkualitas untuk menghadapi seleksi-seleksi penting, dengan
                keseimbangan sempurna antara tradisi dan inovasi.
                Bergabunglah dan terbang lebih tinggi bersama kami,
                melestarikan nilai berhargamu sambil mencapai tujuan dengan
                penuh pencerahan dan percaya diri!
              </p>
            </div>

            <motion.div
              className="flex flex-wrap gap-2 md:gap-3 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, staggerChildren: 0.1 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Badge
                    variant="default"
                    className="hover:scale-110 transition-transform cursor-default"
                  >
                    {feature}
                  </Badge>
                </motion.div>
              ))}
            </motion.div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;