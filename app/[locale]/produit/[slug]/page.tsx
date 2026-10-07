'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { initialProducts } from '@/lib/seed-data';
import { useCart } from '@/lib/cart-context';
import { getLocalized } from '@/lib/i18n';
import { ProductCard } from '@/components/ProductCard';
import { 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  RotateCcw, 
  ChevronRight,
  Plus,
  Minus
} from 'lucide-react';

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const [locale, setLocale] = useState('fr');
  const [slug, setSlug] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariation, setSelectedVariation] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'desc' | 'ingredients' | 'usage'>('desc');
  const { addItem } = useCart();

  useEffect(() => {
    params.then((p) => {
      setLocale(p.locale);
      setSlug(p.slug);
    });
  }, [params]);

  const product: any = initialProducts.find((p) => p.slug === slug) || initialProducts[0];
  const relatedProducts = initialProducts.filter((p) => p.slug !== product?.slug).slice(0, 3);

  useEffect(() => {
    if (product?.variations?.length) {
      setSelectedVariation(product.variations[0].name);
    }
  }, [product]);

  if (!product) return null;

  const name = getLocalized(product.name, locale, 'Création Ruth Niddam');
  const desc = getLocalized(product.description, locale, '');
  const ingredients = getLocalized(product.ingredients, locale, 'Formule exclusive hautement concentrée.');
  const usage = getLocalized(product.usage, locale, 'Appliquer matin et soir sur peau propre et masser délicatement.');
  const price = product.discountPrice > 0 ? product.discountPrice : product.price;

  const handleAddToCart = () => {
    addItem({
      slug: product.slug,
      name,
      price,
      quantity,
      image: product.images[selectedImage] || product.images[0],
      variation: selectedVariation || undefined
    });
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-stone-900">Accueil</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <Link href={`/${locale}/boutique`} className="hover:text-stone-900">Boutique</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-900 font-medium truncate">{name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-6 sm:p-10 border border-stone-200/80 rounded-xs shadow-xs mb-16">
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-square bg-stone-50 overflow-hidden rounded-xs border border-stone-200/70 relative">
              <img
                src={product.images[selectedImage] || product.images[0]}
                alt={name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              {product.discountPrice > 0 && (
                <span className="absolute top-4 left-4 bg-stone-900 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                  -15% Privilège
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-xs overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-[#C8A882]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#A07A50]">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-stone-600">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="font-semibold">5.0</span>
                  <span className="text-stone-400">({product.reviewCount || 18} avis vérifiés)</span>
                </div>
              </div>

              <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900 mb-4 leading-tight">
                {name}
              </h1>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-2xl sm:text-3xl font-serif-luxury font-bold text-stone-900">
                  {price.toFixed(2)} €
                </span>
                {product.discountPrice > 0 && (
                  <span className="text-base text-stone-400 line-through">
                    {product.price.toFixed(2)} €
                  </span>
                )}
                <span className="text-xs text-stone-500">TTC</span>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-light">
                {getLocalized(product.shortDescription, locale, desc)}
              </p>

              {/* Variations (if any) */}
              {product.variations && product.variations.length > 0 && (
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                    Minéral / Déclinaison : <strong className="text-stone-900">{selectedVariation}</strong>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.map((v: any) => (
                      <button
                        key={v.name}
                        type="button"
                        onClick={() => setSelectedVariation(v.name)}
                        className={`px-4 py-2 text-xs rounded-xs border transition-colors ${
                          selectedVariation === v.name
                            ? 'bg-stone-900 text-white border-stone-900'
                            : 'bg-white text-stone-700 border-stone-300 hover:border-stone-500'
                        }`}
                      >
                        {v.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <div className="flex items-center border border-stone-300 rounded-xs bg-white w-32 justify-between px-2">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-stone-500 hover:text-stone-900"
                    aria-label="Diminuer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-semibold text-stone-900">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-stone-500 hover:text-stone-900"
                    aria-label="Augmenter"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 px-6 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 rounded-xs shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au panier</span>
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C8A882]" />
                  <span>Livraison offerte dès 80€</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C8A882]" />
                  <span>Pochon satin de protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C8A882]" />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#C8A882]" />
                  <span>Expédition soignée sous 24h</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Description, Ingredients, Usage */}
        <div className="bg-white p-6 sm:p-10 border border-stone-200/80 rounded-xs shadow-xs mb-16">
          <div className="flex border-b border-stone-200 gap-6 sm:gap-10 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === 'desc'
                  ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C8A882]'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Description & Bienfaits
            </button>
            <button
              onClick={() => setActiveTab('ingredients')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === 'ingredients'
                  ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C8A882]'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Ingrédients & Matières
            </button>
            <button
              onClick={() => setActiveTab('usage')}
              className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors relative whitespace-nowrap ${
                activeTab === 'usage'
                  ? 'text-stone-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#C8A882]'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              Conseils d&apos;Application
            </button>
          </div>

          <div className="text-xs sm:text-sm text-stone-700 leading-relaxed max-w-3xl font-light">
            {activeTab === 'desc' && <p>{desc}</p>}
            {activeTab === 'ingredients' && <p>{ingredients}</p>}
            {activeTab === 'usage' && <p>{usage}</p>}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="font-serif-luxury text-2xl sm:text-3xl font-light text-stone-900 mb-8">
            Complétez votre rituel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
