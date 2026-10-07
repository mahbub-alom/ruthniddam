'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  locale: string;
}

export function HeroSection({ locale }: HeroSectionProps) {
  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center text-white overflow-hidden bg-stone-950">
      {/* Background Video directly from ruthniddam.fr */}
      <div className="absolute inset-0 z-0">
        <video
          src="https://ruthniddam.fr/wp-content/uploads/2024/07/VIDEO-PAGE-DACCEUIL-_HORIZONTAL.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/30" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Monogram brand element if available */}
        <div className="mb-6 opacity-90">
          <img
            src="https://ruthniddam.fr/wp-content/uploads/2024/05/RUTH_NIDDAM_MONOGRAMME_GAUCHE_TYPO_NOIR_RGB-1.svg"
            alt="Ruth Niddam Paris"
            className="h-10 sm:h-12 w-auto invert brightness-200"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* H1 Title matching exact live element */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-white uppercase tracking-[0.16em] max-w-4xl mb-4 leading-tight">
          LE CENTRE RUTH NIDDAM PARIS
        </h1>

        {/* H3 Subtitle: ELLE Distinction */}
        <h3 className="font-poppins text-xs sm:text-sm md:text-base font-light text-[#DFBE99] uppercase tracking-[0.2em] mb-3 max-w-2xl">
          Élue par le magazine ELLE Top 5 des meilleures facialistes en France
        </h3>

        {/* H4 Address Line */}
        <h4 className="font-poppins text-xs sm:text-sm text-stone-300 font-light tracking-[0.22em] uppercase mb-10 flex items-center justify-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#C8A882]" />
          <span>32 Avenue Matignon , 75008 Paris</span>
        </h4>

        {/* 2 Buttons matching exact live site CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href={`/${locale}/prise-de-rendez-vous`}
            className="w-full sm:w-auto px-8 py-4 bg-[#C8A882] hover:bg-white text-stone-950 font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-xs shadow-xl flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-4 h-4 text-stone-950" />
            <span>Prendre Rendez-Vous</span>
          </Link>

          <Link
            href={`/${locale}/boutique`}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/50 font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-xs flex items-center justify-center gap-2"
          >
            <span>Commander des cosmétiques</span>
            <ArrowRight className="w-4 h-4 text-[#C8A882]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
