import React from 'react';
import Link from 'next/link';
import { initialProducts } from '@/lib/seed-data';
import { ProductCard } from '@/components/ProductCard';
import { Award, Sparkles, HeartHandshake, CheckCircle2, Calendar, Leaf, Flag, Clock, ArrowRight } from 'lucide-react';

export default async function AboutRuthNiddamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const bestSellers = initialProducts.slice(0, 4);

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero About */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-5 relative">
            <div className="aspect-3/4 overflow-hidden rounded-xs border border-stone-200/90 shadow-2xl">
              <img
                src="https://ruthniddam.fr/wp-content/uploads/2024/05/2-819x1024.jpg"
                alt="Ruth Niddam Maître Facialiste Paris"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 p-4 bg-[#1C1917] text-white rounded-xs shadow-xl hidden sm:block max-w-xs border border-stone-800">
              <span className="text-[10px] uppercase tracking-widest text-[#C8A882] block mb-1 font-semibold">
                DISTINCTION ELLE MAGAZINE
              </span>
              <p className="text-xs font-serif-luxury italic">
                « Top 5 des meilleures facialistes en France »
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#A07A50] font-semibold block">
              MAÎTRE FACIALISTE • 32 AVENUE MATIGNON PARIS 8
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-normal text-stone-900 uppercase tracking-[0.14em] leading-tight">
              Pourquoi Ruth Niddam
            </h1>
            <div className="w-16 h-0.5 bg-[#C8A882]" />

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              Pionnière du soin facialiste en France et forte de <strong>plus de 25 ans d&apos;expérience</strong>, Ruth Niddam a consacré sa carrière à l&apos;architecture du visage, à la biomécanique des 43 muscles faciaux et à la puissance du massage ancestral japonais Kobido.
            </p>
            <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
              Installée au 32 Avenue Matignon, dans le cœur vibrant du Triangle d&apos;Or à Paris 8ème, elle a créé la méthode signature exclusive <strong>« Walking on the skin »</strong> : une danse millimétrique des doigts qui stimule la microcirculation, libère les tensions myofasciales et lifte l&apos;ovale de manière spectaculaire sans aucune effraction cutanée.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-200">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#C8A882] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-stone-900">
                    Artisanat Manuel & Fascias
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5 font-light">
                    Chaque protocole débute par un diagnostic morpho-facial personnalisé et une lecture attentive sous la peau.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-[#C8A882] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-stone-900">
                    Académie Certifiée Qualiopi
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5 font-light">
                    Organisme officiel transmettant la méthode &ldquo;Walking on the skin&rdquo; et le Kobido aux professionnels de santé et beauté.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={`/${locale}/prise-de-rendez-vous`}
                className="w-full sm:w-auto px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#C8A882]" />
                <span>Prendre rendez-vous au centre</span>
              </Link>

              <Link
                href={`/${locale}/nos-formations`}
                className="w-full sm:w-auto px-8 py-3.5 border border-stone-300 hover:border-stone-900 text-stone-900 text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs flex items-center justify-center gap-2"
              >
                <span>Découvrir les formations</span>
              </Link>
            </div>
          </div>
        </div>

        {/* The 4 Core Pillars of Ruth Niddam */}
        <div className="bg-[#FAF7F2] p-8 sm:p-14 border border-stone-200/80 rounded-xs mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
              L&apos;ENGAGEMENT QUALITÉ
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal">
              Les Piliers de l&apos;Excellence
            </h2>
            <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-stone-700 text-xs">
            <div className="p-6 bg-white border border-stone-200/70 rounded-xs flex flex-col items-center text-center">
              <Leaf className="w-6 h-6 text-[#A07A50] mb-3" />
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-stone-900 mb-2">
                Produit Green
              </h3>
              <p className="text-stone-600 leading-relaxed font-light">
                Formules saines, ingrédients nobles, éco-responsabilité et respect absolu de la barrière cutanée.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-200/70 rounded-xs flex flex-col items-center text-center">
              <HeartHandshake className="w-6 h-6 text-[#A07A50] mb-3" />
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-stone-900 mb-2">
                Non testé sur les animaux
              </h3>
              <p className="text-stone-600 leading-relaxed font-light">
                Cruelty-free, éthique et engagement total pour le respect animal et de l&apos;écosystème.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-200/70 rounded-xs flex flex-col items-center text-center">
              <Clock className="w-6 h-6 text-[#A07A50] mb-3" />
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-stone-900 mb-2">
                + de 25 ans D&apos;expérience
              </h3>
              <p className="text-stone-600 leading-relaxed font-light">
                Une pratique approfondie auprès d&apos;une clientèle prestigieuse et exigeante au 32 Avenue Matignon.
              </p>
            </div>

            <div className="p-6 bg-white border border-stone-200/70 rounded-xs flex flex-col items-center text-center">
              <Flag className="w-6 h-6 text-[#A07A50] mb-3" />
              <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-stone-900 mb-2">
                Made in France
              </h3>
              <p className="text-stone-600 leading-relaxed font-light">
                Conception et fabrication françaises dans les laboratoires cosmétiques les plus renommés.
              </p>
            </div>
          </div>
        </div>

        {/* Best-sellers from the Maison */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
              SÉLECTION OFFICIELLE
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal">
              Les Créations les plus Plébiscitées
            </h2>
            <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.slug} product={product} locale={locale} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href={`/${locale}/boutique`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-md"
            >
              <span>Voir toute la boutique</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
