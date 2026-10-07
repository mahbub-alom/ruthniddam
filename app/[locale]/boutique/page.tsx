'use client';

import React, { useState, useMemo } from 'react';
import { initialProducts } from '@/lib/seed-data';
import { ProductCard } from '@/components/ProductCard';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';

export default function ShopPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [resolvedLocale, setResolvedLocale] = useState('fr');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRange, setSelectedRange] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  React.useEffect(() => {
    params.then((p) => setResolvedLocale(p.locale));

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const search = urlParams.get('search');
      if (search) setSearchQuery(search);
      const category = urlParams.get('category');
      if (category) setSelectedCategory(category);
    }
  }, [params]);

  // Authentic Categories from ruthniddam.fr/boutique
  const categories = [
    { id: 'all', label: 'Tous les produits' },
    { id: 'Gua Sha', label: 'Gua Sha' },
    { id: 'Visage & Cou', label: 'Visage & Cou' },
    { id: 'Yeux', label: 'Yeux' },
    { id: 'Corps', label: 'Corps' },
    { id: 'Tote Bag', label: 'Tote Bag' },
    { id: 'Cartes cadeau', label: 'Cartes cadeau' }
  ];

  const ranges = [
    { id: 'all', label: 'Toutes les gammes' },
    { id: 'gold', label: 'Gamme Or 24K' },
    { id: 'green', label: 'Gamme Green' },
    { id: 'nude', label: 'Gamme Nude' },
    { id: 'rituels', label: 'Rituels -15%' }
  ];

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    if (selectedRange !== 'all') {
      list = list.filter((p) => p.range === selectedRange);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.fr.toLowerCase().includes(q) ||
          p.name.en.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q)
      );
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    }

    return list;
  }, [selectedCategory, selectedRange, searchQuery, sortBy]);

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-2">
            BOUTIQUE OFFICIELLE RUTH NIDDAM
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-normal text-stone-900 uppercase tracking-[0.14em] mb-4">
            Cosmétiques & Outils d&apos;Exception
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto font-light">
            Formulés en France et hautement concentrés en principes actifs purs. Prolongez chez vous les résultats des soins d&apos;exception du 32 Avenue Matignon.
          </p>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mt-4" />
        </div>

        {/* Free Shipping & International Delivery Banner */}
        <div className="mb-10 p-3.5 bg-[#FAF7F2] border border-stone-200/80 rounded-xs flex items-center justify-center gap-2 text-xs text-stone-700 text-center">
          <Sparkles className="w-4 h-4 text-[#C8A882]" />
          <span>✨ NOUVEAUTÉ Nos Rituels Beauté : Optimisez vos résultats et profitez de -15% sur l&apos;achat de votre pack complet 📦 France & International Delivery 🌍</span>
        </div>

        {/* Filters and Controls */}
        <div className="mb-8 space-y-4">
          {/* Categories Row */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(c.id);
                  setSelectedRange('all');
                }}
                className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors ${
                  selectedCategory === c.id
                    ? 'bg-stone-900 text-white'
                    : 'bg-white border border-stone-200 text-stone-700 hover:border-stone-900'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Gammes Sub-filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-stone-200/50">
            {ranges.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedRange(r.id)}
                className={`px-3 py-1.5 text-[11px] uppercase tracking-wider font-medium rounded-xs transition-colors ${
                  selectedRange === r.id
                    ? 'bg-[#C8A882] text-white font-semibold'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher par nom..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
              />
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <span className="text-xs text-stone-500 whitespace-nowrap">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-stone-200 rounded-xs focus:outline-hidden focus:border-[#C8A882] text-stone-700"
              >
                <option value="featured">Tri par défaut</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-stone-200/70 rounded-xs">
            <p className="text-stone-500 text-sm mb-4">Aucun soin ne correspond à votre sélection.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedRange('all');
                setSearchQuery('');
              }}
              className="px-6 py-2 bg-stone-900 text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#C8A882] transition-colors"
            >
              Réinitialiser les filtres
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                locale={resolvedLocale}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
