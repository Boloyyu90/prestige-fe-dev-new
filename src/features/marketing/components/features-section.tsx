'use client';

import { useState } from 'react';
import { OptimizedImage } from '@/shared/components/ui/optimized-image';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { MarketingSection } from '@/shared/components/ui/marketing-section';
import { cn } from '@/shared/lib/utils/cn';

const featuresData = {
    simulasi: {
        title: 'Simulasi Ujian Realistis',
        description: 'Rasakan pengalaman ujian sesungguhnya dengan antarmuka dan sistem penilaian yang identik dengan CAT BKN.',
        benefits: ['Timer & navigasi standar CAT', 'Soal terupdate sesuai kisi-kisi', 'Pengalaman bebas gangguan'],
        mockup: '/images/illustrations/features/laptop-mockup-ujian.png'
    },
    statistik: {
        title: 'Analisis Performa Cerdas',
        description: 'Pantau kemajuanmu dengan analisis statistik komprehensif untuk mengidentifikasi kekuatan dan kelemahan.',
        benefits: ['Grafik progres skor', 'Analisis topik terlemah', 'Perbandingan dengan rata-rata nasional'],
        mockup: '/images/illustrations/features/laptop-mockup-statistik.png' // Pastikan gambar ini ada
    },
    peringkat: {
        title: 'Peringkat Nasional Kompetitif',
        description: 'Ukur kemampuanmu melawan ribuan peserta lain dan pacu semangat belajarmu untuk menjadi yang terbaik.',
        benefits: ['Leaderboard nasional real-time', 'Filter peringkat per sub-tes', 'Sertifikat digital untuk peraih skor tertinggi'],
        mockup: '/images/illustrations/features/laptop-mockup-peringkat.png' // Pastikan gambar ini ada
    }
};

type FeatureKey = keyof typeof featuresData;

const FeaturesSection = () => {
    const [activeFeature, setActiveFeature] = useState<FeatureKey>('simulasi');
    const feature = featuresData[activeFeature];

    return (
      <MarketingSection id="features" aria-labelledby="features-heading" className="bg-background">
          <div className="container">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                  <h2 id="features-heading" className="text-3xl md:text-4xl font-bold mb-4">Fitur Unggulan Kami</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                      Kami merancang setiap fitur untuk memberikan pengalaman belajar terbaik dan hasil yang maksimal.
                  </p>
              </motion.div>

              <div className="flex justify-center border-b mb-12">
                  {(Object.keys(featuresData) as FeatureKey[]).map(key => (
                    <button
                      key={key}
                      onClick={() => setActiveFeature(key)}
                      className={cn(
                        "relative px-4 py-3 text-sm md:text-base font-medium transition-colors",
                        activeFeature === key ? "text-primary" : "text-muted-foreground hover:text-primary"
                      )}
                    >
                        {featuresData[key].title.split(' ')[0]}
                        {activeFeature === key && (
                          <motion.div className="absolute bottom-[-1px] left-0 right-0 h-0.5 bg-primary" layoutId="underline" />
                        )}
                    </button>
                  ))}
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    key={activeFeature + '-image'}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="relative"
                  >
                      <OptimizedImage
                        src={feature.mockup}
                        alt={feature.title}
                        width={600}
                        height={400}
                        containerClassName="rounded-lg overflow-hidden shadow-2xl"
                        className="w-full h-auto"
                      />
                  </motion.div>

                  <AnimatePresence mode="wait">
                      <motion.div
                        key={activeFeature}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="space-y-6"
                      >
                          <h3 className="text-2xl md:text-3xl font-bold">{feature.title}</h3>
                          <p className="text-muted-foreground text-lg">{feature.description}</p>
                          <ul className="space-y-3">
                              {feature.benefits.map((benefit) => (
                                <li key={benefit} className="flex items-center gap-3">
                                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                                    <span className="font-medium text-foreground">{benefit}</span>
                                </li>
                              ))}
                          </ul>
                      </motion.div>
                  </AnimatePresence>
              </div>
          </div>
      </MarketingSection>
    );
};

export default FeaturesSection;