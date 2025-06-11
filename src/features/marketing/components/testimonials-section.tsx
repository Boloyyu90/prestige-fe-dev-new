'use client';

import { useState } from 'react';
import { SectionReveal } from '@/components/ui/section-reveal';
import { Card } from '@/shared/components/ui/card';
import { OptimizedImage } from '@/shared/components/ui/optimized-image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  position: string;
  avatar: string;
  content: string;
}

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Nurul Hidayah',
      position: 'PNS Kemenkeu',
      avatar: '/images/avatars/nurul.jpg',
      content: 'Platform yang sangat membantu dalam persiapan CPNS. Soal-soalnya mirip dengan ujian asli.'
    },
    {
      id: '2',
      name: 'Ahmad Fadli',
      position: 'PNS Kemendikbud',
      avatar: '/images/avatars/ahmad.jpg',
      content: 'Berkat Prestige Academy, saya berhasil lolos seleksi CPNS dengan nilai memuaskan.'
    },
    {
      id: '3',
      name: 'Siti Rahma',
      position: 'PNS Kemenkes',
      avatar: '/images/avatars/siti.jpg',
      content: 'Fitur analisis dan pembahasannya sangat detail, membantu saya memahami konsep dengan baik.'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <SectionReveal className="bg-white">
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Apa Kata Mereka
          </h2>
          <p className="text-muted-foreground">
            Testimoni dari para alumni yang telah berhasil
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0">
                    <OptimizedImage
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <p className="text-lg mb-4 italic">
                      "{testimonials[currentIndex].content}"
                    </p>
                    <div>
                      <h4 className="font-semibold">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[currentIndex].position}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
};

export default TestimonialsSection;