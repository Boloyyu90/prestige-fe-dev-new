'use client';

import { useState } from 'react';
import { Card } from '@/presentation/components/ui/atoms/card';

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

const FaqSection = () => {
    const [openFaq, setOpenFaq] = useState<string | null>('faq1');

    const faqs: FAQ[] = [
        {
            id: 'faq1',
            question: 'Bagaimana cara membuat akun di Prestige Academy?',
            answer: 'Kamu bisa klik tombol Daftar, lalu mengisi form yang telah disediakan.'
        },
        {
            id: 'faq2',
            question: 'Berapa lama masa berlaku paket yang saya beli?',
            answer: 'Masa berlaku paket bervariasi tergantung jenis paket yang dipilih. Paket gratis berlaku 30 hari, sedangkan paket premium berlaku 6-12 bulan.'
        },
        {
            id: 'faq3',
            question: 'Paket belajarnya bisa buat fresh graduate ngga ya?',
            answer: 'Tentu saja! Paket belajar kami dirancang khusus untuk fresh graduate dan cocok untuk semua level, dari pemula hingga mahir.'
        },
        {
            id: 'faq4',
            question: 'Pembayaran bisa melalui media apa aja sih?',
            answer: 'Kami menerima berbagai metode pembayaran seperti transfer bank, e-wallet (GoPay, OVO, DANA), dan kartu kredit/debit.'
        },
        {
            id: 'faq5',
            question: 'Apakah Prestige Academy bisa diakses lewat smartphone?',
            answer: 'Ya, platform kami fully responsive dan bisa diakses melalui smartphone, tablet, maupun desktop dengan pengalaman yang optimal.'
        },
        {
            id: 'faq6',
            question: 'Saya lupa akun password, bagaimana recoverynya?',
            answer: 'Kamu bisa klik "Lupa Password" di halaman login, lalu ikuti instruksi reset password yang dikirim ke email terdaftar.'
        }
    ];

    const toggleFaq = (faqId: string) => {
        setOpenFaq(openFaq === faqId ? null : faqId);
    };

    return (
        <section id="faq" className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        Pertanyaan Seputar Fitur<br />
                        Prestige Academy
                    </h2>
                </div>

                {/* FAQ Items */}
                <div className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <Card
                                key={faq.id}
                                className="border border-gray-200 bg-white"
                            >
                                <button
                                    className="w-full p-6 text-left flex items-center justify-between"
                                    onClick={() => toggleFaq(faq.id)}
                                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>

                                    <div className={`transform transition-transform duration-200 ${
                                        openFaq === faq.id ? 'rotate-180' : ''
                                    }`}>
                                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                {openFaq === faq.id && (
                                    <div className="px-6 pb-6">
                                        <div className="pt-4 border-t border-gray-100">
                                            <p className="text-gray-700 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;
