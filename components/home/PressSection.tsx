'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

interface PressSectionProps {
  locale: string;
}

export function PressSection({ locale }: PressSectionProps) {
  const pressItems = [
    {
      id: 1,
      source: 'ELLE Magazine',
      title: 'Top 5 des Meilleures Facialistes en France',
      image: 'https://ruthniddam.fr/wp-content/uploads/2026/02/Screenshot-2026-02-26-at-15.42.36.jpg'
    },
    {
      id: 2,
      source: 'VOGUE',
      title: 'L’art du soin sur-mesure par Ruth Niddam',
      image: 'https://ruthniddam.fr/wp-content/uploads/2024/06/RUTH-NIDDAM-VOGUE.avif'
    },
    {
      id: 3,
      source: 'INFRAROUGE',
      title: 'Couverture & Interview exclusive Ruth Niddam',
      image: 'https://ruthniddam.fr/wp-content/uploads/2025/04/1-infrarouge-magazine-couv-ruth-niddam-paris-1.jpg'
    },
    {
      id: 4,
      source: 'BFM TV',
      title: 'L’excellence des rituels et innovations facialistes',
      image: 'https://ruthniddam.fr/wp-content/uploads/2025/01/ruthniddam_bfmtv_18_12_2024_page-0001.jpg'
    },
    {
      id: 5,
      source: 'L’Officiel des Modes',
      title: 'My Jeaneth™ : Le Gua Sha d’exception',
      image: 'https://ruthniddam.fr/wp-content/uploads/2026/02/OMC2.png'
    },
    {
      id: 6,
      source: 'L’Officiel',
      title: 'Architecture & Modelage du visage',
      image: 'https://ruthniddam.fr/wp-content/uploads/2026/02/OMC3.png'
    },
    {
      id: 7,
      source: 'ELLE Édition Spéciale',
      title: 'Walking on the skin : Révélation beauté',
      image: 'https://ruthniddam.fr/wp-content/uploads/2025/01/RuthNiddam_Elle_Octobre24_page-0001.jpg'
    },
    {
      id: 8,
      source: 'Presse Beauté',
      title: 'Le soin Signature en cabine Matignon',
      image: 'https://ruthniddam.fr/wp-content/uploads/2025/07/1.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, pressItems.length - 4) : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= pressItems.length - 4 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-heading text-2xl sm:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal mb-3">
            Ruth Niddam à l&apos;honneur dans la Presse
          </h2>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mb-4" />
          <p className="font-poppins text-xs sm:text-sm text-stone-600 font-light">
            Découvrez les parutions et éloges des plus grands titres de la presse féminine et d&apos;art de vivre.
          </p>
        </div>

        {/* Carousel / Slider */}
        <div className="relative mb-12">
          {/* Arrow Buttons */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Image précédente"
            className="absolute -left-3 sm:-left-5 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-3 bg-white/95 hover:bg-[#C8A882] text-stone-900 hover:text-white rounded-full shadow-lg border border-stone-200/60 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Image suivante"
            className="absolute -right-3 sm:-right-5 top-1/2 -translate-y-1/2 z-10 p-2.5 sm:p-3 bg-white/95 hover:bg-[#C8A882] text-stone-900 hover:text-white rounded-full shadow-lg border border-stone-200/60 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Grid of 4 items with smooth offset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pressItems.slice(currentIndex, currentIndex + 4).map((item) => (
              <div
                key={item.id}
                className="group relative bg-[#FAF7F2] rounded-xs border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer"
                onClick={() => setSelectedImage(item.image)}
              >
                <div className="aspect-3/4 overflow-hidden bg-stone-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-stone-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-3 bg-white/90 rounded-full shadow-md text-stone-900">
                      <ZoomIn className="w-5 h-5" />
                    </span>
                  </div>
                </div>

                <div className="p-4 text-center bg-white flex-1 flex flex-col justify-center">
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#A07A50] block mb-1">
                    {item.source}
                  </span>
                  <h3 className="font-heading text-xs sm:text-sm text-stone-800 font-medium line-clamp-2">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View More Button */}
        <div className="text-center">
          <Link
            href={`/${locale}/presse`}
            className="inline-flex items-center justify-center px-10 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-xs shadow-md"
          >
            Voir Plus
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 text-white hover:text-[#C8A882] transition-colors"
            aria-label="Fermer la vue agrandie"
          >
            <X className="w-8 h-8" />
          </button>
          <div
            className="max-w-4xl max-h-[90vh] overflow-hidden rounded-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Presse agrandie"
              className="max-w-full max-h-[85vh] object-contain rounded-xs shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
