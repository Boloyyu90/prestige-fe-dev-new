'use client';

import { AnimatedCard } from '@/shared/components/ui/animated-card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { PriceDisplay } from '@/shared/components/ui/price-display';
import { AnimateOnScroll } from '@/shared/components/ui/animate-on-scroll';
import { useAnimatedCounter } from '@/shared/hooks/use-animated-counter';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Zap } from 'lucide-react';

interface Package {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const CardBanner = () => (
  <div className="relative h-32 w-full overflow-hidden rounded-t-xl mt-4 px-4">
    <div className="relative h-full w-full">
      <Image
        src="./images/illustrations/marketing/card-banner.svg"
        alt="Card Banner"
        fill
        className="object-contain"
        priority
      />
    </div>
  </div>
);

const CardHeader = ({ title, subtitle, index }: {
  title: string;
  subtitle: string;
  index: number;
}) => (
  <div className="flex justify-between items-start mb-4">
    <div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">
        {title}
      </h3>
      <p className="text-gray-900 font-semibold">
        {subtitle}
      </p>
    </div>
    <Badge
      className={"bg-white border-2 border-primary text-primary"}
    >
      {index === 0 ? "Gratis!" : "Premium!"}
    </Badge>
  </div>
);

const CardDescription = ({ description }: { description: string }) => (
  <div className="mb-4 space-y-2">
    <p className="text-sm font-semibold text-gray-900">
      TRYOUT AKBAR GRATIS SKD TAHAP 1
    </p>
    <p className="text-xs text-gray-600 leading-relaxed">
      {description}
    </p>
  </div>
);

const FeatureItem = ({ feature }: { feature: string }) => (
  <li className="flex items-start gap-3 text-sm">
    <div className="w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-xs mt-0.5 flex-shrink-0">
      <Check className="w-3 h-3" />
    </div>
    <span className="text-gray-700">{feature}</span>
  </li>
);

const FeaturesList = ({ features }: { features: string[] }) => (
  <ul className="space-y-2 mb-4">
    {features.map((feature, idx) => (
      <FeatureItem key={idx} feature={feature} />
    ))}
  </ul>
);

const PackageCard = ({ pkg, index }: { pkg: Package; index: number }) => {
  const { ref, count } = useAnimatedCounter({
    end: pkg.price,
    duration: 1500,
    prefix: 'Rp ',
  });

  return (
    <AnimatedCard
      delay={index * 0.2}
      className="relative overflow-hidden transition-all duration-300 h-full group"
    >
      {pkg.popular && (
        <motion.div
          className="absolute top-2 right-2 z-20"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Badge className="bg-gradient-primary text-white shadow-glow">
            <Zap className="w-3 h-3 mr-1" />
            Populer
          </Badge>
        </motion.div>
      )}

      <div className="flex flex-col h-full">
        <CardBanner />

        <div className="relative px-4 pb-6 flex-1">
          <div className="bg-white rounded-3xl p-4 mt-2 h-full flex flex-col">
            <div className="flex-1">
              <CardHeader title={pkg.title} subtitle={pkg.subtitle} index={index} />
              <CardDescription description={pkg.description} />

              <div className="mb-4" ref={ref}>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-gray-600">RP</span>
                  <span className="text-3xl font-bold text-gray-900">
                    {count}
                  </span>
                </div>
              </div>

              <FeaturesList features={pkg.features} />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full group">
                Coba Sekarang!
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatedCard>
  );
};

const PackagesSection = () => {
  const packages: Package[] = [
    {
      id: "1",
      title: "Paket Gratis",
      subtitle: "Untuk Pemula",
      description: "Pengenalan TryOut SKD Berisi soal-soal HOTS berdasarkan FR Peserta SKD CPNS 2024",
      price: 0,
      features: [
        "Akses 1 Tryout SKD",
        "Pembahasan Soal",
        "Analisis Hasil"
      ]
    },
    {
      id: "2",
      title: "Paket Premium",
      subtitle: "Rekomendasi",
      description: "Persiapan lengkap untuk TryOut SKD dengan soal-soal berkualitas tinggi",
      price: 99000,
      features: [
        "Akses 5 Tryout SKD",
        "Pembahasan Video",
        "Analisis Detail",
        "Konsultasi",
        "Materi Pembelajaran"
      ],
      popular: true
    },
    {
      id: "3",
      title: "Paket Ultimate",
      subtitle: "Persiapan Penuh",
      description: "Persiapan maksimal dengan fitur lengkap dan garansi kelulusan",
      price: 199000,
      features: [
        "Akses 10 Tryout SKD",
        "Pembahasan Video",
        "Analisis Detail",
        "Konsultasi Pribadi",
        "Materi Pembelajaran",
        "Garansi Kelulusan"
      ]
    }
  ];

  return (
    <section className="section">
      <div className="container">
        <AnimateOnScroll animation="fadeInUp">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Pilih Paket Tryout Anda
            </h2>
            <p className="text-gray-600 text-lg">
              Dapatkan akses ke ribuan soal berkualitas untuk persiapan ujian CPNS
            </p>
          </div>
        </AnimateOnScroll>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;