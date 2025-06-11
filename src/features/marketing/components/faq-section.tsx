'use client';

import { useState } from 'react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { Card } from '@/shared/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Bagaimana cara membuat akun di Prestige Academy?',
      answer: 'Klik tombol Daftar, lalu isi form pendaftaran dengan data yang valid.'
    },
    {
      id: '2',
      question: 'Berapa lama masa berlaku paket yang saya beli?',
      answer: 'Masa berlaku paket bervariasi. Paket gratis 30 hari, premium 6 bulan, ultimate 1 tahun.'
    },
    {
      id: '3',
      question: 'Apakah soal-soalnya sesuai dengan ujian CPNS asli?',
      answer: 'Ya, semua soal disusun berdasarkan kisi-kisi dan pola soal CPNS terbaru.'
    },
    {
      id: '4',
      question: 'Metode pembayaran apa saja yang tersedia?',
      answer: 'Transfer bank, e-wallet (GoPay, OVO, DANA), dan kartu kredit/debit.'
    },
    {
      id: '5',
      question: 'Apakah ada garansi kelulusan?',
      answer: 'Paket Ultimate menyediakan garansi uang kembali jika tidak lulus seleksi.'
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <SectionReveal className="bg-gray-50">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Pertanyaan Umum
          </h2>
          <p className="text-muted-foreground">
            Temukan jawaban untuk pertanyaan yang sering diajukan
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === faq.id ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openFaq === faq.id && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-muted-foreground">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
};

export default FaqSection;