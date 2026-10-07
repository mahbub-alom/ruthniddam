'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { getLocalized } from '@/lib/i18n';
import { Sparkles, ShoppingBag, Check } from 'lucide-react';

interface RitualCardProps {
  ritual: any;
  locale: string;
}

export function RitualCard({ ritual, locale }: RitualCardProps) {
  const { addItem } = useCart();

  const title = getLocalized(ritual.title, locale, 'Rituel Beauté');
  const description = getLocalized(ritual.description, locale, '');
  const image = ritual.images?.[0] || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80';

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
    <div className="bg-white border border-stone-200/90 rounded-xs overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300">
      <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-[#1C1917] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
          -15% Avantage Privilège
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-1">
            Rituel Beauté & Cabine
          </span>
          <h3 className="font-serif-luxury text-xl sm:text-2xl font-semibold text-stone-900 group-hover:text-[#A07A50] transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
            {description}
          </p>

          {ritual.productsIncluded && ritual.productsIncluded.length > 0 && (
            <div className="mt-4 p-3 bg-[#FAF7F2] border border-stone-200/60 rounded-xs">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 block mb-1.5">
                Ce rituel comprend :
              </span>
              <ul className="space-y-1 text-xs text-stone-700">
                {ritual.productsIncluded.map((prod: any, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C8A882] shrink-0" />
                    <span>{getLocalized(prod, locale, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-serif-luxury font-bold text-stone-900">
                {ritual.discountPrice.toFixed(2)} €
              </span>
              <span className="text-xs text-stone-400 line-through">
                {ritual.originalPrice.toFixed(2)} €
              </span>
            </div>
            <span className="text-[10px] text-emerald-700 font-medium">
              Économie immédiate de {(ritual.originalPrice - ritual.discountPrice).toFixed(2)} €
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="px-5 py-2.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 rounded-xs shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#C8A882]" />
            <span>Commander</span>
          </button>
        </div>
      </div>
    </div>
  );
}
