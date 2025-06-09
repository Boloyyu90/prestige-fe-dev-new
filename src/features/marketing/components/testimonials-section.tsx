'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/presentation/components/ui/atoms/card';

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
            name: 'Nurul',
            position: 'PNS Pemerintah Nganjuk',
            avatar: '/images/avatars/nurul.png',
            content: 'Menurutku kak, Prestige Academy itu platform yang paling cocok sama aku kak, yang budget paspasan untuk freshgraduate, yang harganya gak terlalu mahal tapi ilmunya yang didapat sangat mahal.'
        },
        {
            id: '2',
            name: 'Jessica Halim',
            position: 'PNS Pemerintah Guangzho',
            avatar: '/images/avatars/jessica.png',
            content: 'Menurutku kak, Prestige Academy itu platform yang paling cocok sama aku kak, yang budget paspasan untuk freshgraduate, yang harganya gak terlalu mahal tapi ilmunya yang didapat sangat mahal.'
        },
        {
            id: '3',
            name: 'Darrel Simanjuntak',
            position: 'PNS Pemerintah Bukittinggi',
            avatar: '/images/avatars/darrel.png',
            content: 'Menurutku kak, Prestige Academy itu platform yang paling cocok sama aku kak, yang budget paspasan untuk freshgraduate, yang harganya gak terlalu mahal tapi ilmunya yang didapat sangat mahal.'
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        Apa kata mereka mengenai<br />
                        Prestige Academy
                    </h2>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="flex flex-col items-center">
                            {/* Card */}
                            <Card className="relative w-full mb-6 shadow-md">
                                {/* Position Badge */}
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                                    <div className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap">
                                        {testimonial.position}
                                    </div>
                                </div>

                                {/* Avatar Container - Reduced height */}
                                <div className="h-[280px]">
                                    <div className="w-full h-full mx-auto relative rounded-2xl overflow-hidden">
                                        <Image
                                            src={testimonial.avatar}
                                            alt={testimonial.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover object-center"
                                            quality={85}
                                        />
                                    </div>

                                    <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 z-10">
                                        <div className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full whitespace-nowrap">
                                            {testimonial.name}
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Content */}
                            <div className="w-full max-w-sm relative rounded-xl"
                                 style={{
                                     background: "linear-gradient(to bottom, rgba(255, 255, 255), rgba(50, 116, 152, 1))"
                                 }}>
                                {/* Inner content with background */}
                                <div className="bg-white m-1 rounded-lg">
                                    <p className="text-gray-600 text-sm leading-relaxed py-4 px-4">
                                        {testimonial.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-10">
                    {[...Array(3)].map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
