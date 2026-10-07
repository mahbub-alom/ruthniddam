import React from 'react';
import { getDictionary } from '@/lib/i18n';
import { initialTreatments } from '@/lib/seed-data';
import { TreatmentCard } from '@/components/TreatmentCard';
import { Sparkles, Calendar, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';

export default async function TreatmentsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale);

  const categories = [
    { id: 'all', label: 'Tous les protocoles' },
    { id: 'visage-cou', label: 'Visage & Cou' },
    { id: 'ventre-dos', label: 'Ventre & Dos' },
    { id: 'cuisses-fesses', label: 'Cuisses & Fesses' },
    { id: 'cheveux', label: 'Cheveux & Cuir Chevelu' }
  ];

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-2">
            32 Avenue Matignon, Paris 8
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-stone-900 font-light mb-4">
            Nos Soins & Traitements Haute Couture
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Chaque protocole d&apos;exception est sculpté sur-mesure pour votre anatomie faciale et corporelle, alliant la virtuosité manuelle du Kobido aux technologies esthétiques les plus avancées.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href={`/${locale}/prise-de-rendez-vous`}
              className="px-6 py-3 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-xs flex items-center gap-2"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C8A882]" />
              <span>{dict.common.bookAppointment}</span>
            </Link>
          </div>
        </div>

        {/* Treatments List */}
        <div className="space-y-8">
          {initialTreatments.map((treatment) => (
            <TreatmentCard
              key={treatment.slug}
              treatment={treatment}
              locale={locale}
            />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-20 p-8 sm:p-12 bg-[#FAF7F2] border border-stone-200/80 rounded-xs text-center max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
            Sur Mesure & Conciergerie
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-light text-stone-900 mb-3">
            Vous souhaitez un bilan cutané ou une cure personnalisée ?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto mb-6">
            Ruth Niddam vous reçoit sur rendez-vous au 32 Avenue Matignon pour concevoir un programme personnalisé combinant cabine et rituels quotidiens.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href={`/${locale}/contact`}
              className="px-6 py-3 border border-stone-300 hover:border-stone-900 text-stone-900 text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs"
            >
              Contacter la conciergerie
            </Link>
            <a
              href="tel:0140731010"
              className="px-6 py-3 bg-stone-900 text-white hover:bg-[#C8A882] text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs"
            >
              01 40 73 10 10
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
