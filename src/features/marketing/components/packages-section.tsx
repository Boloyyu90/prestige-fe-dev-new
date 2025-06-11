'use client';

import { SectionWrapper } from '@/shared/components/ui/section-wrapper';
import { Card } from '@/shared/components/ui/card';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

interface Package {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    price: number;
    features: string[];
    popular?: boolean;
}

const PackageCard = ({ pkg, index }: { pkg: Package; index: number }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.2 }}
        className="h-full"
      >
          <Card className={`relative h-full p-6 ${pkg.popular ? 'border-primary shadow-lg' : ''}`}>
              {pkg.popular && (
                <motion.div
                  className="absolute -top-4 right-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                    <Badge className="bg-primary text-white px-3 py-1">
                        <Zap className="w-3 h-3 mr-1" />
                        Populer
                    </Badge>
                </motion.div>
              )}

              <div className="space-y-4">
                  <div>
                      <h3 className="text-xl font-bold">{pkg.title}</h3>
                      <p className="text-muted-foreground">{pkg.subtitle}</p>
                  </div>

                  <p className="text-sm text-muted-foreground">
                      {pkg.description}
                  </p>

                  <div className="py-4">
                      <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold">
                {inView && (
                  <CountUp
                    end={pkg.price}
                    duration={2}
                    separator="."
                    prefix="Rp "
                  />
                )}
              </span>
                      </div>
                  </div>

                  <ul className="space-y-2">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                            <Check className="w-5 h-5 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                      ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                  >
                      Pilih Paket
                  </Button>
              </div>
          </Card>
      </motion.div>
    );
};

const PackagesSection = () => {
    const packages: Package[] = [
        {
            id: "1",
            title: "Paket Gratis",
            subtitle: "Untuk Pemula",
            description: "Coba gratis dengan akses terbatas",
            price: 0,
            features: [
                "1 Tryout SKD",
                "Pembahasan Soal",
                "Analisis Hasil"
            ]
        },
        {
            id: "2",
            title: "Paket Premium",
            subtitle: "Rekomendasi",
            description: "Persiapan lengkap dengan fitur premium",
            price: 99000,
            features: [
                "5 Tryout SKD",
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
            description: "Paket terlengkap dengan garansi",
            price: 199000,
            features: [
                "10 Tryout SKD",
                "Pembahasan Video",
                "Analisis Detail",
                "Konsultasi Pribadi",
                "Materi Pembelajaran",
                "Garansi Kelulusan"
            ]
        }
    ];

    return (
      <SectionWrapper className="bg-gray-50">
          <div className="container">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      Pilih Paket Tryout Anda
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                      Dapatkan akses ke ribuan soal berkualitas untuk persiapan ujian CPNS
                  </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {packages.map((pkg, index) => (
                    <PackageCard key={pkg.id} pkg={pkg} index={index} />
                  ))}
              </div>
          </div>
      </SectionWrapper>
    );
};

export default PackagesSection;