'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
import { Card } from '@/shared/components/ui/card';
import { AnimateOnScroll } from '@/shared/components/ui/animate-on-scroll';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { useInViewAnimation } from '@/shared/design-system/motion/hooks';
import { SectionReveal } from '@/shared/components/ui/section-reveal';
import { EntranceAnimation } from '@/shared/components/ui/entrance-animation';
import { Grid } from '@/shared/components/layout/grid';
import { Stack } from '@/shared/components/layout/stack';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';
import {
  Search,
  ChevronDown,
  MessageCircle,
  BookOpen,
  CreditCard,
  Settings,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface FAQ {
  id: string;
  category: 'general' | 'payment' | 'platform' | 'account' | 'features';
  question: string;
  answer: string;
  tags: string[];
  popular?: boolean;
}

interface FAQCategory {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  count: number;
}

const FaqSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openFaq, setOpenFaq] = useState<string | null>('faq1');

  const { ref: sectionRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  const { ref: contentRef, variants: containerVariants, animate, initial } = useInViewAnimation('fadeInUp', {
    threshold: 0.1,
    stagger: true,
    staggerDelay: 0.2
  });

  const faqs: FAQ[] = [
    {
      id: 'faq1',
      category: 'general',
      question: 'Bagaimana cara membuat akun di Prestige Academy?',
      answer: 'Kamu bisa klik tombol "Daftar" di pojok kanan atas halaman, lalu mengisi form pendaftaran dengan data yang lengkap dan valid. Setelah itu, kamu akan menerima email verifikasi untuk mengaktifkan akun.',
      tags: ['daftar', 'akun', 'registrasi'],
      popular: true
    },
    {
      id: 'faq2',
      category: 'payment',
      question: 'Berapa lama masa berlaku paket yang saya beli?',
      answer: 'Masa berlaku paket bervariasi: Paket Gratis berlaku 7 hari, Paket Premium berlaku 30 hari, dan Paket Ultimate berlaku 90 hari. Kamu bisa memperpanjang paket sebelum masa berlaku habis dengan harga khusus.',
      tags: ['paket', 'masa berlaku', 'durasi'],
      popular: true
    },
    {
      id: 'faq3',
      category: 'features',
      question: 'Paket belajarnya bisa buat fresh graduate ngga ya?',
      answer: 'Tentu saja! Paket belajar kami dirancang khusus untuk semua level, termasuk fresh graduate. Kami menyediakan materi dari dasar hingga advanced, plus tips khusus untuk fresh graduate dalam menghadapi ujian CPNS.',
      tags: ['fresh graduate', 'level', 'materi'],
      popular: true
    },
    {
      id: 'faq4',
      category: 'payment',
      question: 'Pembayaran bisa melalui media apa aja sih?',
      answer: 'Kami menerima berbagai metode pembayaran: Transfer Bank (BCA, BNI, BRI, Mandiri), E-wallet (GoPay, OVO, DANA, ShopeePay), dan Kartu Kredit/Debit. Semua pembayaran diproses secara real-time.',
      tags: ['pembayaran', 'transfer', 'ewallet'],
      popular: true
    },
    {
      id: 'faq5',
      category: 'platform',
      question: 'Apakah Prestige Academy bisa diakses lewat smartphone?',
      answer: 'Ya! Platform kami fully responsive dan dioptimasi untuk semua device. Kamu bisa mengakses melalui smartphone, tablet, atau desktop dengan pengalaman yang sama baiknya.',
      tags: ['smartphone', 'mobile', 'responsive'],
      popular: true
    },
    {
      id: 'faq6',
      category: 'account',
      question: 'Saya lupa password, bagaimana cara resetnya?',
      answer: 'Klik "Lupa Password" di halaman login, masukkan email terdaftar, lalu cek inbox untuk link reset password. Jika tidak ada di inbox, cek folder spam. Link reset berlaku 1 jam.',
      tags: ['password', 'reset', 'lupa'],
      popular: true
    },
    {
      id: 'faq7',
      category: 'features',
      question: 'Apakah ada garansi uang kembali?',
      answer: 'Ya, kami memberikan garansi uang kembali 100% dalam 3 hari pertama jika kamu tidak puas dengan layanan kami. Syarat dan ketentuan berlaku.',
      tags: ['garansi', 'uang kembali', 'refund']
    },
    {
      id: 'faq8',
      category: 'features',
      question: 'Bagaimana sistem ranking di Prestige Academy?',
      answer: 'Sistem ranking kami menampilkan peringkat berdasarkan skor tryout terbaru. Ranking diupdate real-time dan kamu bisa melihat posisimu di level nasional, regional, atau institusi.',
      tags: ['ranking', 'leaderboard', 'peringkat']
    },
    {
      id: 'faq9',
      category: 'platform',
      question: 'Bisakah mengunduh materi untuk dibaca offline?',
      answer: 'Saat ini materi hanya bisa diakses online untuk menjaga keamanan konten. Namun kamu bisa mengakses platform 24/7 selama masa aktif paket.',
      tags: ['download', 'offline', 'materi']
    },
    {
      id: 'faq10',
      category: 'general',
      question: 'Bagaimana cara menghubungi customer service?',
      answer: 'Kamu bisa menghubungi CS kami melalui: WhatsApp (081234567890), Email (cs@prestigeacademy.id), atau Live Chat di platform. Kami siap membantu 24/7.',
      tags: ['customer service', 'bantuan', 'kontak']
    }
  ];

  const categories: FAQCategory[] = [
    { id: 'all', name: 'Semua', icon: HelpCircle, count: faqs.length },
    { id: 'general', name: 'Umum', icon: MessageCircle, count: faqs.filter(f => f.category === 'general').length },
    { id: 'features', name: 'Fitur', icon: BookOpen, count: faqs.filter(f => f.category === 'features').length },
    { id: 'payment', name: 'Pembayaran', icon: CreditCard, count: faqs.filter(f => f.category === 'payment').length },
    { id: 'platform', name: 'Platform', icon: Settings, count: faqs.filter(f => f.category === 'platform').length },
    { id: 'account', name: 'Akun', icon: MessageCircle, count: faqs.filter(f => f.category === 'account').length },
  ];

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    let filtered = faqs;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(faq =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort by popularity
    return filtered.sort((a, b) => {
      if (a.popular && !b.popular) return -1;
      if (!a.popular && b.popular) return 1;
      return 0;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFaq = (faqId: string) => {
    setOpenFaq(openFaq === faqId ? null : faqId);
  };

  const popularFaqs = faqs.filter(faq => faq.popular);

  return (
    <section className="section bg-background" ref={sectionRef}>
      <div className="container" ref={contentRef}>
        {/* Header using design system */}
        <motion.div
          variants={containerVariants}
          initial={initial}
          animate={animate}
        >
          <SectionReveal direction="up" className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Pertanyaan Seputar{' '}
              <span className="gradient-text-animated">Prestige Academy</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              Temukan jawaban untuk pertanyaan yang sering ditanyakan tentang platform, fitur, dan layanan kami
            </p>
          </SectionReveal>

          <div className="max-w-6xl mx-auto">
            {/* Search & Filter using design system */}
            <SectionReveal direction="up" delay={0.2} className="mb-12">
              <Card className="p-6 bg-muted/50">
                {/* Search Bar */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Cari pertanyaan atau kata kunci..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base border-border bg-background shadow-sm"
                  />
                </div>

                {/* Category Filter using design system Grid */}
                <Grid cols={2} responsive={{ sm: 3, md: 6 }} gap="sm">
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium focus-visible-ring',
                          selectedCategory === category.id
                            ? 'bg-primary text-primary-foreground shadow-elevation-2 scale-105'
                            : 'bg-background text-muted-foreground hover:bg-muted hover:text-foreground'
                        )}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{category.name}</span>
                        <Badge
                          variant={selectedCategory === category.id ? "secondary" : "outline"}
                          className="text-xs px-2 py-0.5"
                        >
                          {category.count}
                        </Badge>
                      </button>
                    );
                  })}
                </Grid>

                {/* Search Results Info */}
                {searchQuery && (
                  <div className="mt-4 text-sm text-muted-foreground">
                    Ditemukan <span className="font-semibold">{filteredFaqs.length}</span> hasil
                    untuk "<span className="font-semibold">{searchQuery}</span>"
                  </div>
                )}
              </Card>
            </SectionReveal>

            {/* Popular FAQs (shown when no search) */}
            {!searchQuery && selectedCategory === 'all' && (
              <SectionReveal direction="up" delay={0.3} className="mb-12">
                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-foreground mb-4">
                    🔥 Pertanyaan Populer
                  </h3>
                  <p className="text-muted-foreground">
                    Pertanyaan yang paling sering ditanyakan oleh pengguna kami
                  </p>
                </div>

                <Grid cols={1} responsive={{ md: 2, lg: 3 }} gap="md">
                  {popularFaqs.slice(0, 6).map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => {
                        setOpenFaq(faq.id);
                        // Scroll to FAQ
                        setTimeout(() => {
                          document.getElementById(faq.id)?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                          });
                        }, 100);
                      }}
                      className="text-left p-4 marketing-gradient rounded-xl hover:shadow-elevation-2 transition-all group focus-visible-ring"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                          <HelpCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm leading-relaxed">
                            {faq.question}
                          </h4>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              Popular
                            </Badge>
                            <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </Grid>
              </SectionReveal>
            )}

            {/* FAQ List */}
            <SectionReveal direction="up" delay={0.4}>
              <Stack direction="vertical" spacing="md">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <div
                      key={faq.id}
                      id={faq.id}
                      className={cn(
                        'card-base border-2 transition-all duration-300 overflow-hidden',
                        openFaq === faq.id
                          ? 'border-primary shadow-elevation-2'
                          : 'border-border hover:border-muted-foreground/40 hover:shadow-elevation-1'
                      )}
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: isIntersecting ? 'fade-in-up 0.5s ease-out forwards' : undefined
                      }}
                    >
                      {/* FAQ Header */}
                      <button
                        className="w-full p-6 text-left flex items-center justify-between focus-visible-ring"
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={openFaq === faq.id}
                        aria-controls={`faq-content-${faq.id}`}
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground leading-tight">
                              {faq.question}
                            </h3>
                            {faq.popular && (
                              <Badge variant="secondary" className="text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full"
                              >
                              #{tag}
                            </span>
                            ))}
                          </div>
                        </div>

                        <div className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0',
                          openFaq === faq.id ? 'bg-primary text-primary-foreground rotate-180' : 'bg-muted text-muted-foreground'
                        )}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* FAQ Content */}
                      <AnimatePresence>
                        {openFaq === faq.id && (
                          <motion.div
                            id={`faq-content-${faq.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6">
                              <div className="border-t border-border pt-4">
                                <p className="text-muted-foreground leading-relaxed text-pretty">
                                  {faq.answer}
                                </p>

                                {/* Additional Actions */}
                                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-muted">
                                  <button className="text-sm text-primary hover:text-primary/80 font-medium">
                                    Apakah ini membantu?
                                  </button>
                                  <button className="text-sm text-muted-foreground hover:text-foreground">
                                    Masih butuh bantuan?
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Tidak ada hasil ditemukan
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Coba gunakan kata kunci yang berbeda atau pilih kategori lain
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                    >
                      Reset Pencarian
                    </Button>
                  </div>
                )}
              </Stack>
            </SectionReveal>

            {/* Contact Support using design system */}
            <SectionReveal direction="up" delay={0.6} className="text-center mt-16">
              <Card className="p-8 marketing-gradient">
                <Stack direction="vertical" spacing="md" align="center">
                  <h3 className="text-xl font-bold text-foreground">
                    Tidak menemukan jawaban yang kamu cari?
                  </h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto text-center">
                    Tim customer service kami siap membantu menjawab pertanyaan spesifik dan memberikan solusi terbaik untuk kebutuhanmu
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild>
                      <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                        💬 Chat WhatsApp
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a href="mailto:cs@prestigeacademy.id">
                        📧 Email Support
                      </a>
                    </Button>
                  </div>

                  {/* Response Time */}
                  <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                      <span>Respon dalam 5 menit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-info rounded-full" />
                      <span>Tersedia 24/7</span>
                    </div>
                  </div>
                </Stack>
              </Card>
            </SectionReveal>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;