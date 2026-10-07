'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { initialRituals } from '@/lib/seed-data';
import { getLocalized } from '@/lib/i18n';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';

interface RitualsSectionProps {
  locale: string;
}

export function RitualsSection({ locale }: RitualsSectionProps) {
  const { addItem } = useCart();

  return (
    <section className="py-20 lg:py-28 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-2xl sm:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal mb-3">
            Nos Rituels Beauté
          </h2>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mb-4" />
          <p className="font-poppins text-xs sm:text-sm text-stone-600 font-light max-w-2xl mx-auto">
            Découvrez nos quatre rituels conçus pour répondre aux besoins spécifiques de chaque type de peau.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-14">
          {initialRituals.map((ritual) => {
            const title = getLocalized(ritual.title, locale, 'Rituel Beauté');
            const description = getLocalized(ritual.description, locale, '');
            const image = ritual.images?.[0] || 'https://ruthniddam.fr/wp-content/uploads/2025/03/Routine-le-soir-peau-normale-a-mixte-433x516.jpg';

            const handleAddToCart = () => {
              addItem({
                slug: ritual.slug,
                name: title,
                price: ritual.discountPrice,
                image,
                variation: 'Coffret Rituel -15%'
              });
            };

            return (
              <div
                key={ritual.slug}
                className="group flex flex-col bg-[#FDFBF7] border border-stone-200/80 rounded-xs overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image & Sale Ribbon */}
                <div className="relative aspect-4/5 overflow-hidden bg-stone-100">
                  <Link href={`/${locale}/nos-rituels-beaute`}>
                    <img
                      src={image}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </Link>

                  {/* 15% Badge */}
                  <span className="absolute top-3 left-3 bg-[#A07A50] text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs shadow-sm">
                    -15%
                  </span>

                  {/* Quick Add Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="w-full py-2.5 bg-stone-900 hover:bg-[#A07A50] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 rounded-xs shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Ajouter au panier</span>
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-1">
                      Visage & Cou
                    </span>
                    <h3 className="font-heading text-base sm:text-lg font-semibold text-stone-900 group-hover:text-[#A07A50] transition-colors leading-snug">
                      <Link href={`/${locale}/nos-rituels-beaute`}>
                        {title}
                      </Link>
                    </h3>

                    <p className="text-xs text-stone-600 mt-2 font-light line-clamp-2 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-200/60 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-serif-luxury font-bold text-stone-900">
                          {ritual.discountPrice.toFixed(2)} €
                        </span>
                        <span className="text-xs text-stone-400 line-through">
                          {ritual.originalPrice.toFixed(2)} €
                        </span>
                      </div>
                      <span className="text-[10px] text-emerald-700 font-medium block">
                        Économisez {(ritual.originalPrice - ritual.discountPrice).toFixed(2)} €
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      aria-label="Ajouter au panier"
                      className="p-2.5 bg-stone-900 hover:bg-[#A07A50] text-white rounded-xs transition-colors shrink-0"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 Bottom Centered Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={`/${locale}/nos-rituels-beaute`}
            className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-xs shadow-md text-center"
          >
            Tous nos Rituels Beauté
          </Link>
          <Link
            href={`/${locale}/boutique`}
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent hover:bg-stone-900 hover:text-white text-stone-900 border border-stone-900 text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-xs text-center"
          >
            Tous nos cosmétiques
          </Link>
        </div>
      </div>
    </section>
  );
}
