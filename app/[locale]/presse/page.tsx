import React from 'react';
import { initialPress } from '@/lib/seed-data';
import { getLocalized } from '@/lib/i18n';
import { Award, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-2">
            REVUE DE PRESSE & MÉDIAS
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-normal text-stone-900 uppercase tracking-[0.14em] mb-4">
            Ruth Niddam dans la Presse
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto font-light">
            Retrouvez les articles, couvertures de magazines et distinctions consacrés à Ruth Niddam, à sa méthode « Walking on the skin » et au Gua Sha iconique My Jeaneth™.
          </p>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mt-4" />
        </div>

        {/* ELLE Headline Banner */}
        <div className="mb-14 p-8 bg-[#FAF7F2] border border-stone-200/90 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1C1917] text-[#DFBE99] flex items-center justify-center font-serif-luxury font-bold text-xl shrink-0">
              ELLE
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#A07A50] font-bold block">Palmarès d&apos;Excellence</span>
              <h2 className="font-heading text-xl sm:text-2xl text-stone-900 uppercase tracking-wider font-semibold">
                Élue par le magazine ELLE parmi le Top 5 des meilleures facialistes en France
              </h2>
            </div>
          </div>
          <Link
            href={`/${locale}/prise-de-rendez-vous`}
            className="px-6 py-3 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shrink-0 whitespace-nowrap"
          >
            Réserver un soin
          </Link>
        </div>

        {/* Press Clippings Grid with authentic images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {initialPress.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-stone-200/80 rounded-xs overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                <img
                  src={item.image}
                  alt={item.publication}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-[#1C1917] text-white px-3 py-1 text-xs uppercase font-bold tracking-widest">
                  {item.logo}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-heading text-lg font-bold tracking-widest uppercase text-stone-900">
                      {item.publication}
                    </span>
                    <span className="text-xs text-stone-400 font-medium">{item.date}</span>
                  </div>

                  <h3 className="font-heading text-base font-semibold text-stone-900 mb-3 leading-snug">
                    {getLocalized(item.title, locale, '')}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed font-light">
                    {getLocalized(item.quote, locale, '')}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-[#A07A50] font-semibold uppercase tracking-wider">
                    Parution officielle
                  </span>
                  <a
                    href="https://ruthniddam.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-stone-400 hover:text-stone-900 flex items-center gap-1 text-xs"
                  >
                    <span>Consulter</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
