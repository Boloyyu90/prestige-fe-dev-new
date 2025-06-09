'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/presentation/components/ui/atoms/button';

interface Feature {
    id: string;
    title: string;
    icon: string;
}

const FeaturesSection = () => {
    const [activeFeature, setActiveFeature] = useState('simulasi');

    const features: Feature[] = [
        { id: 'simulasi', title: 'Simulasi Nyata', icon: 'icons/features/to-do-list.svg' },
        { id: 'statistik', title: 'Sistem Statistik', icon: 'icons/features/statistic.svg' },
        { id: 'peringkat', title: 'Sistem Peringkat', icon: 'icons/features/ranking.svg' }
    ];

    const featureContent = {
        simulasi: {
            title: 'Simulasi Ujian Mirip Asli',
            description: 'Rasakan pengalaman ujian yang sesungguhnya dengan sistem tryout yang memberikan pengalaman ujian asli',
            benefits: [
                'Materi & soal terbaru',
                'Analisis hasil otomatis',
                'Simulasi ujian real-time'
            ],
            mockup: '/illustrations/features/laptop-mockup-ujian.png'
        },
        statistik: {
            title: 'Sistem Statistik Lengkap',
            description: 'Pantau perkembangan belajar dengan analisis statistik yang komprehensif dan mudah dipahami',
            benefits: [
                'Grafik perkembangan detail',
                'Analisis kelemahan & kekuatan',
                'Laporan performa real-time'
            ],
            mockup: '/illustrations/features/laptop-mockup-ujian'
        },
        peringkat: {
            title: 'Sistem Peringkat Kompetitif',
            description: 'Bersaing dengan peserta lain dan lihat posisi peringkat untuk memotivasi belajar lebih baik',
            benefits: [
                'Leaderboard nasional',
                'Ranking berdasarkan kategori',
                'Kompetisi mingguan & bulanan'
            ],
            mockup: '/illustrations/features/laptop-mockup-ujian'
        }
    };

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10 max-w-6xl">
                {/* Header */}
                <div className="text-center mb-2">
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                        Fitur Unggulan Prestige Academy
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Persiapkan diri dengan pengalaman terbaik berbasis riset untuk menghadapi ujian di depan mu
                    </p>
                </div>

                {/* Features Navigation */}
                <div className="flex justify-center items-center gap-0 mb-8 flex-wrap">
                    {features.map((feature, index) => (
                        <button
                            key={feature.id}
                            onClick={() => setActiveFeature(feature.id)}
                            className={`relative flex items-center gap-3 px-8 py-4 transition-all duration-300 min-w-fit ${
                                activeFeature === feature.id
                                    ? 'bg-white text-primary'
                                    : 'bg-white text-gray-600 hover:bg-white'
                            } ${
                                index === 0 ? 'rounded-l-full' :
                                    index === features.length - 1 ? 'rounded-r-full' : ''
                            }`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                activeFeature === feature.id
                                    ? 'bg-primary'
                                    : 'bg-gray-50'
                            }`}>
                                <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    width={20}
                                    height={20}
                                    className={activeFeature === feature.id ? 'brightness-0 invert' : 'opacity-70'}
                                />
                            </div>
                            <span className="font-medium text-base">{feature.title}</span>

                            {/* Active indicator line */}
                            {activeFeature === feature.id && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary"></div>
                            )}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                        <div className="absolute inset-0 z-0 flex items-center justify-center">
                            <Image
                                src="/illustrations/features/features-asset.svg"
                                alt="Dots Pattern"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>

                        {/* Laptop mockup - Foreground */}
                        <div className="relative z-10">
                            <Image
                                src={featureContent[activeFeature as keyof typeof featureContent].mockup}
                                alt="Feature Mockup"
                                width={500}
                                height={350}
                                className="w-full h-auto transition-all duration-500"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right Side - Content */}
                    <div className="space-y-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                            {featureContent[activeFeature as keyof typeof featureContent].title}
                        </h3>

                        <p className="text-gray-600 text-lg leading-relaxed">
                            {featureContent[activeFeature as keyof typeof featureContent].description}
                        </p>

                        {/* Benefits List */}
                        <div className="space-y-4">
                            {featureContent[activeFeature as keyof typeof featureContent].benefits.map((benefit, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-700 font-medium">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Button
                                variant="default"
                                className="bg-primary hover:primary/80 text-white px-8 py-6 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Pelajari Lebih Lanjut!
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;