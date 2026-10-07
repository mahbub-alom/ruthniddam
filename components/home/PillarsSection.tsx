'use client';

import React from 'react';

export function PillarsSection() {
  const pillars = [
    {
      title: 'Produit Green',
      icon: 'https://ruthniddam.fr/wp-content/uploads/2024/08/icone.png',
      description: 'Formulations naturelles et respectueuses de l’épiderme et de la planète.'
    },
    {
      title: 'Non testé sur les animaux',
      icon: 'https://ruthniddam.fr/wp-content/uploads/2024/05/capture_d___e__cran_2024-04-09_a___10.14-3.jpg',
      description: 'Engagement éthique inconditionnel, certifié sans cruauté animale.'
    },
    {
      title: '+ de 25 ans D’expérience',
      icon: 'https://ruthniddam.fr/wp-content/uploads/2024/08/25EXPERIENCES-1.png',
      description: 'Une maîtrise d’exception forgée au contact des peaux les plus exigeantes.'
    },
    {
      title: 'Made in France',
      icon: 'https://ruthniddam.fr/wp-content/uploads/2024/05/capture_d___e__cran_2024-04-09_a___10.14-2.jpg',
      description: 'Formulé et confectionné avec rigueur au sein de nos laboratoires français.'
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2] border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-2xl sm:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal mb-3">
            Cosmétiques Ruth Niddam Paris
          </h2>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto" />
        </div>

        {/* 4 Pillars Grid matching Elementor structure */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="flex flex-col items-center text-center p-6 bg-white/70 hover:bg-white rounded-xs border border-stone-200/60 shadow-xs hover:shadow-md transition-all duration-300"
            >
              {/* Pillar Image / Icon */}
              <div className="w-20 h-20 mb-5 flex items-center justify-center">
                <img
                  src={pillar.icon}
                  alt={pillar.title}
                  className="max-w-full max-h-full object-contain filter drop-shadow-xs"
                />
              </div>

              {/* Title */}
              <h3 className="font-heading text-base sm:text-lg font-semibold uppercase tracking-wider text-stone-900 mb-2">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="font-poppins text-xs text-stone-600 font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
