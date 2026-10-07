'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getLocalized } from '@/lib/i18n';
import { BookingModal } from './BookingModal';
import { Clock, Calendar, Check, Sparkles } from 'lucide-react';

interface TreatmentCardProps {
  treatment: any;
  locale: string;
}

export function TreatmentCard({ treatment, locale }: TreatmentCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const title = getLocalized(treatment.title, locale, 'Soin Haute Couture');
  const description = getLocalized(treatment.description, locale, '');
  const image = treatment.images?.[0] || 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80';

  return (
    <>
      <div className="bg-white border border-stone-200/80 rounded-xs overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-all duration-300 group">
        {/* Treatment Image */}
        <div className="md:w-5/12 relative aspect-4/3 md:aspect-auto overflow-hidden bg-stone-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 bg-[#1C1917]/90 text-white text-[10px] uppercase tracking-widest px-2.5 py-1 flex items-center gap-1.5 backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-[#C8A882]" />
            <span>Cabine Paris 8</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:w-7/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50]">
                {treatment.categoryLabel ? getLocalized(treatment.categoryLabel, locale, 'Visage & Cou') : 'Soin Signature'}
              </span>
              <span className="flex items-center gap-1 text-xs text-stone-500 font-medium">
                <Clock className="w-3.5 h-3.5 text-[#C8A882]" />
                {treatment.duration}
              </span>
            </div>

            <h3 className="font-serif-luxury text-xl sm:text-2xl font-semibold text-stone-900 group-hover:text-[#A07A50] transition-colors">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 mt-2 line-clamp-3 leading-relaxed">
              {description}
            </p>

            {/* Benefits list */}
            {treatment.benefits && treatment.benefits.length > 0 && (
              <ul className="mt-4 space-y-1.5 text-xs text-stone-700">
                {treatment.benefits.slice(0, 3).map((b: any, idx: number) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#C8A882] shrink-0" />
                    <span>{getLocalized(b, locale, '')}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Pricing & CTA */}
          <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
            <div>
              <span className="text-lg font-serif-luxury font-bold text-stone-900">
                {treatment.price} €
              </span>
              <span className="text-[11px] text-stone-400 block -mt-0.5">
                séance sur mesure
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 rounded-xs shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C8A882]" />
              <span>Réserver</span>
            </button>
          </div>
        </div>
      </div>

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedTreatment={{
          slug: treatment.slug,
          title,
          price: treatment.price,
          duration: treatment.duration
        }}
      />
    </>
  );
}
