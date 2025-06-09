'use client';

import Image from 'next/image';

interface Benefit {
    step: number;
    title: string;
    subtitle: string;
    description: string;
    position: 'left' | 'right';
}

const BenefitsSection = () => {
    const benefits: Benefit[] = [
        {
            step: 1,
            title: "Latihan Seru Mirip",
            subtitle: "UJIAN ASLI!",
            description: "Rasakan sensasi ujian CPNS, SNBT, dan P3K tanpa perlu tegang! Soal-soal kami dibuat persis seperti ujian sungguhan, jadi kamu bisa berlatih dengan nyaman dan tidak kaget saat hari-H. Seperti berlatih dengan pelatih yang tau persis apa yang akan ditanyakan!",
            position: 'left'
        },
        {
            step: 2,
            title: "Tahu Peluang Kelulusanmu",
            subtitle: "SEJAK AWAL!",
            description: "Gak perlu nebak-nebak kucing dalam karung! Berdasarkan hasil latihanmu, kami bisa kasih gambaran peluang kelulusanmu dengan jelas. Jadi kamu tahu harus berapa semangat lagi untuk mencapai impianmu!",
            position: 'right'
        },
        {
            step: 3,
            title: "Penjelasan yang Bikin",
            subtitle: "\"OHHHH\"!",
            description: "Dapatkan jawaban yang bikin kamu langsung paham! Bukan cuma tau jawaban benarnya apa, tapi juga \"kenapa\" dengan bahasa yang enak dibaca. Dijamin ada momen \"Ohhh, jadi begitu!\" setiap kali belajar.",
            position: 'left'
        },
        {
            step: 4,
            title: "Lemari Soal yang Selalu",
            subtitle: "DIISI ULANG",
            description: "Jangan khawatir kehabisan soal! Lemari soal kami selalu penuh dengan berbagai tipe pertanyaan yang selalu diperbarui. Dari yang gampang sampai yang bikin mikir, semua ada untuk membuat belajarmu lebih seru dan tidak membosankan.",
            position: 'right'
        },
        {
            step: 5,
            title: "Lihat Kemajuanmu",
            subtitle: "NAIK TERUS!",
            description: "Saksikan perjalanan belajarmu melalui grafik yang colorful dan mudah dipahami melalui statistik ranking. Rasakan kegembiraan melihat garis progressmu naik terus, seperti menonton tanaman yang kamu rawat tumbuh setiap hari!",
            position: 'left'
        }
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Logo - Faded in the background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <div className="w-2/3 h-2/3 relative">
                    <Image
                        src="/images/logo/logo-prestige-blue.svg"
                        alt="Prestige Academy Logo"
                        width={150}
                        height={370}
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Top decorative asset - positioned at the top left */}
            <div className="absolute top-40 left-0 pointer-events-none">
                <Image
                    src="/images/backgrounds/benefit-asset-top.svg"
                    alt="Top Decorative Asset"
                    width={150}
                    height={150}
                    className="object-contain"
                />
            </div>

            {/* Bottom decorative asset - positioned at the bottom right */}
            <div className="absolute bottom-0 right-0 pointer-events-none">
                <Image
                    src="/images/backgrounds/benefit-asset-bottom.svg"
                    alt="Bottom Decorative Asset"
                    width={150}
                    height={150}
                    className="object-contain"
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                        Kenapa harus Tryout<br />
                        di Prestige Academy?
                    </h2>
                </div>

                {/* Main content with border */}
                <div className="relative border border-[#D9D9D9] rounded-3xl p-6 md:p-10 bg-white max-w-5xl mx-auto">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-[1100px] bg-primary z-0"></div>

                    {benefits.map((benefit, index) => (
                        <div key={index} className="relative mb-24 last:mb-0">
                            {/* Circle with number - centered on the vertical line */}
                            <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                                    {benefit.step}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex">
                                {/* Left content */}
                                <div className={`w-1/2 pr-16 ${index % 2 === 0 ? 'block' : 'invisible'}`}>
                                    <div className="text-right mt-[7px]">
                                        <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                                        <h4 className="text-2xl font-bold text-primary mb-2">{benefit.subtitle}</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                                    </div>
                                </div>

                                {/* Spacer for the circle */}
                                <div className="w-0"></div>

                                {/* Right content */}
                                <div className={`w-1/2 pl-16 ${index % 2 === 1 ? 'block' : 'invisible'}`}>
                                    <div className="text-left mt-[7px]">
                                        <h3 className="text-xl font-bold text-gray-900">{benefit.title}</h3>
                                        <h4 className="text-2xl font-bold text-primary mb-2">{benefit.subtitle}</h4>
                                        <p className="text-sm text-gray-600 leading-relaxed">{benefit.description}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
