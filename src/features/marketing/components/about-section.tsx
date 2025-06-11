'use client';

import { Badge } from '@/shared/components/ui/badge';
import { MarketingSection } from '@/shared/components/ui/marketing-section';
import { OptimizedImage } from '@/shared/components/ui/optimized-image';
import { motion } from 'framer-motion';

const containerVariants = {
  visible: { transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const AboutSection = () => {
  const features = [
    'Platform Terintegrasi',
    'Soal Berbasis Field Report',
    'Evaluasi Diagnostik Presisi Tinggi',
    'Komunitas Profesional'
  ];

  return (
    <MarketingSection id="about" aria-labelledby="about-heading" className="bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <OptimizedImage
              src="/images/illustrations/marketing/about-asset.svg"
              alt="Tentang Prestige Academy"
              width={550}
              height={450}
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div variants={itemVariants}>
              <Badge variant="secondary">Tentang Kami</Badge>
            </motion.div>

            <motion.h2 variants={itemVariants} id="about-heading" className="text-3xl md:text-4xl font-bold tracking-tight">
              Tingkatkan Peluangmu dengan Platform Berbasis Riset
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
              Selamat datang di Prestige Academy. Kami bukan sekadar platform tryout, melainkan mitra strategis Anda dalam menaklukkan seleksi CASN. Dengan soal berkualitas tinggi dan analisis mendalam, kami mempersiapkan Anda secara komprehensif.
            </motion.p>

            <div className="flex flex-wrap gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                >
                  <Badge variant="default" className="text-sm py-1.5 px-4">{feature}</Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </MarketingSection>
  );
};

export default AboutSection;