import React from 'react';
import { initialRituals } from '@/lib/seed-data';
import { RitualCard } from '@/components/RitualCard';
import { Sparkles, Gift, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function RitualsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-2">
            RITUELS BEAUTÉ EXCLUSIFS
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-normal text-stone-900 uppercase tracking-[0.14em] mb-4">
            Nos Rituels Beauté
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto font-light">
            Optimisez vos résultats et profitez de -15% sur l&apos;achat de votre pack complet de soins à domicile.
          </p>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mt-4" />
        </div>

        {/* Free Shipping & International Delivery Banner */}
        <div className="mb-12 p-3.5 bg-[#FAF7F2] border border-stone-200/80 rounded-xs flex items-center justify-center gap-2 text-xs text-stone-700 text-center">
          <Sparkles className="w-4 h-4 text-[#C8A882]" />
          <span>✨ NOUVEAUTÉ : -15% sur tous les packs rituels complets 📦 France & International Delivery 🌍</span>
        </div>

        {/* 4 Rituals Grid matching live site */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {initialRituals.map((ritual) => (
            <RitualCard
              key={ritual.slug}
              ritual={ritual}
              locale={locale}
            />
          ))}
        </div>

        {/* Methodology Banner */}
        <div className="p-8 sm:p-12 bg-white border border-stone-200/80 rounded-xs shadow-xs mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#C8A882]/40 text-[#A07A50] flex items-center justify-center mx-auto">
                <span className="font-bold text-sm">1</span>
              </div>
              <h3 className="font-heading text-base font-semibold text-stone-900 uppercase tracking-wider">Synergie Active</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Des associations d&apos;actifs purs et d&apos;outils pensées par Ruth Niddam pour démultiplier les résultats.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#C8A882]/40 text-[#A07A50] flex items-center justify-center mx-auto">
                <span className="font-bold text-sm">2</span>
              </div>
              <h3 className="font-heading text-base font-semibold text-stone-900 uppercase tracking-wider">-15% Privilège</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Une remise avantageuse permanente de 15% appliquée automatiquement sur chaque pack complet.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#C8A882]/40 text-[#A07A50] flex items-center justify-center mx-auto">
                <span className="font-bold text-sm">3</span>
              </div>
              <h3 className="font-heading text-base font-semibold text-stone-900 uppercase tracking-wider">Conseil Sur-Mesure</h3>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Chaque commande inclut la fiche rituel d&apos;application détaillée rédigée par notre maître facialiste.
              </p>
            </div>
          </div>
        </div>

        {/* Gift Card Teaser */}
        <div className="p-8 sm:p-12 bg-[#FAF7F2] border border-stone-200/80 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1C1917] text-[#C8A882] flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-stone-900 uppercase tracking-wider">
                Offrez une Carte Cadeau Ruth Niddam
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 font-light">
                Valable sur l&apos;ensemble de la boutique en ligne et nos rituels de beauté.
              </p>
            </div>
          </div>
          <Link
            href={`/${locale}/produit/carte-kdo-eshop`}
            className="px-6 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shrink-0 flex items-center gap-2"
          >
            <span>Découvrir la carte cadeau</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
