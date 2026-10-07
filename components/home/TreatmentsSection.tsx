'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface TreatmentsSectionProps {
  locale: string;
}

export function TreatmentsSection({ locale }: TreatmentsSectionProps) {
  const treatments = [
    {
      title: 'Soin Signature',
      slug: 'soin-signature-ruth-niddam',
      bgImage: 'https://ruthniddam.fr/wp-content/uploads/2024/07/2-SIGNATURE-png.jpg',
      description: 'Fort de 30 ans d’expérience, notre soin signature combine expertise et techniques innovantes pour offrir un vrai lift naturel et un rajeunissement éclatant.'
    },
    {
      title: 'KOBIDO',
      slug: 'massage-kobido-ancestral',
      bgImage: 'https://ruthniddam.fr/wp-content/uploads/2024/07/KOBIDO-1.jpg',
      description: 'Le Kobido est un massage facial japonais ancestral qui lisse la peau et stimule la circulation sanguine. Il offre un lifting naturel grâce au lissage, au pétrissage et aux étirements.'
    },
    {
      title: 'Radiofréquence',
      slug: 'radiofrequence-haute-precision',
      bgImage: 'https://ruthniddam.fr/wp-content/uploads/2024/07/3-RADIOFREQUANCE.jpg',
      description: 'La radiofréquence visage est une technique non-invasive qui utilise des ondes électromagnétiques pour stimuler la production de collagène, raffermir la peau et réduire les rides.'
    },
    {
      title: 'Microneedling',
      slug: 'microneedling-expert',
      bgImage: 'https://ruthniddam.fr/wp-content/uploads/2026/02/microneedling-ruth-niddam-paris.jpg',
      description: 'Le microneedling est aujourd’hui l’un des soins esthétiques non invasifs les plus prisés pour améliorer durablement la qualité de la peau. Il cible efficacement les rides, les pores dilatés…'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-2xl sm:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal">
            Nos Soins Incontournables
          </h2>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mt-4" />
        </div>

        {/* 4 Cards Grid with Background Images matching exact Elementor design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((t) => (
            <div
              key={t.title}
              className="relative rounded-xs overflow-hidden shadow-md group min-h-[460px] flex flex-col justify-end transition-all duration-500 hover:shadow-2xl"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${t.bgImage})` }}
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />

              {/* Content on bottom */}
              <div className="relative z-10 p-6 flex flex-col justify-end text-white">
                <h3 className="font-heading text-xl font-semibold uppercase tracking-wider text-white mb-3 group-hover:text-[#DFBE99] transition-colors">
                  {t.title}
                </h3>
                <p className="text-xs text-stone-200 leading-relaxed font-light mb-6 opacity-95">
                  {t.description}
                </p>
                <div>
                  <Link
                    href={`/${locale}/prise-de-rendez-vous`}
                    className="inline-flex items-center justify-center w-full py-3 bg-[#C8A882] hover:bg-white text-stone-950 font-semibold text-xs uppercase tracking-widest transition-colors rounded-xs shadow-md"
                  >
                    <span>Prendre un RDV</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
