'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';

interface MethodSectionProps {
  locale: string;
}

export function MethodSection({ locale }: MethodSectionProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: 3-Photo Authentic Elementor Collage */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xs overflow-hidden shadow-md">
                <img
                  src="https://ruthniddam.fr/wp-content/uploads/2024/07/1.webp"
                  alt="Centre Ruth Niddam Paris"
                  className="w-full h-56 sm:h-72 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-xs overflow-hidden shadow-md">
                <img
                  src="https://ruthniddam.fr/wp-content/uploads/2024/07/3-819x1024.jpg"
                  alt="La méthode Walking on the skin"
                  className="w-full h-44 sm:h-56 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            <div className="pt-8">
              <div className="rounded-xs overflow-hidden shadow-lg h-full max-h-[500px]">
                <img
                  src="https://ruthniddam.fr/wp-content/uploads/2024/07/2-819x1024.jpg"
                  alt="Facialiste d'exception Paris 8"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right: Text & Authentic Copy */}
          <div className="lg:col-span-6">
            <h2 className="font-heading text-2xl sm:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal leading-tight">
              Centre Ruth Niddam paris
            </h2>

            <div className="w-16 h-0.5 bg-[#C8A882] my-4" />

            <h3 className="font-heading text-xl sm:text-2xl text-stone-800 uppercase tracking-wider font-semibold mb-6">
              LA MÉTHODE &ldquo;WALKING ON THE SKIN&rdquo;
            </h3>

            <div className="space-y-4 text-stone-700 text-xs sm:text-sm leading-relaxed font-light mb-8">
              <p>
                Avec plus de 30 ans d’expérience dans le domaine médical esthétique à Paris, je propose un univers de soins holistique & confidentiel « haut de gamme » et sur mesure. Je rends hommage à la nature et à sa ressource la plus précieuse, le corps, les méridiens et les points d’acupuncture. Fluidité, aisance, « walking on the skin » rythme les soins visage et corps pour répondre aux aspirations, crée un accord avec soi pour bien vieillir avec son âge.
              </p>
              <p>
                Découvrez une gamme complète de soins et traitements pour chaque partie du corps et pour chaque problématique, garantissant des solutions personnalisées et efficaces.
              </p>
              <p>
                Explorez la différence que peut apporter une expertise avancée et un soin sur mesure en prenant rendez-vous dès aujourd’hui pour une consultation personnalisée.
              </p>
            </div>

            <div>
              <Link
                href={`/${locale}/prise-de-rendez-vous`}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-md"
              >
                <Calendar className="w-4 h-4 text-[#C8A882]" />
                <span>Prendre Un RDV</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
