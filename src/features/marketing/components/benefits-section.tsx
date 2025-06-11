'use client';

import { MarketingSection } from '@/shared/components/ui/marketing-section';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, BarChart, BookOpen, UserCheck } from 'lucide-react';

interface Benefit {
  icon: React.ElementType;
  title: string;
  description: string;
}

const BenefitsSection = () => {
  const benefits: Benefit[] = [
    {
      icon: Target,
      title: "Latihan Akurat & Realistis",
      description: "Rasakan sensasi ujian CPNS sesungguhnya dengan sistem CAT dan soal-soal berkualitas FR.",
    },
    {
      icon: BarChart,
      title: "Analisis Peluang Kelulusan",
      description: "Dapatkan analisis mendalam untuk mengetahui posisi dan peluang kelulusanmu secara jelas.",
    },
    {
      icon: CheckCircle2,
      title: "Pembahasan Detail & Mudah Dipahami",
      description: "Setiap soal dilengkapi pembahasan terperinci yang membantu kamu menguasai konsep.",
    },
    {
      icon: BookOpen,
      title: "Bank Soal Terlengkap & Terupdate",
      description: "Akses ribuan soal yang selalu diperbarui sesuai dengan pola dan kisi-kisi ujian terbaru.",
    },
    {
      icon: UserCheck,
      title: "Progress Tracking Real-time",
      description: "Pantau perkembangan skormu melalui grafik interaktif dan identifikasi kelemahanmu.",
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <MarketingSection id="benefits" aria-labelledby="benefits-heading" className="marketing-gradient">
      <div className="container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="benefits-heading" className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Kenapa Tryout di Prestige Academy?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Kami menyediakan semua yang Anda butuhkan untuk meraih skor tertinggi dan mengamankan posisi impian Anda sebagai ASN.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="p-6 bg-card/50 backdrop-blur-sm border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-4">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </MarketingSection>
  );
};

export default BenefitsSection;