'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { getLocalized } from '@/lib/i18n';
import { ShoppingBag, Star } from 'lucide-react';

interface ProductCardProps {
  product: any;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const { addItem } = useCart();

  const name = getLocalized(product.name, locale, 'Soin Ruth Niddam');
  const shortDesc = getLocalized(product.shortDescription, locale, '');
  const image = product.images?.[0] || 'https://images.unsplash.com/photo-1608248597359-5613532b3191?auto=format&fit=crop&w=800&q=80';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      slug: product.slug,
      name,
      price: product.discountPrice > 0 ? product.discountPrice : product.price,
      image,
      variation: product.variations?.[0]?.name
    });
  };

  return (
    <div className="group relative bg-white border border-stone-200/70 rounded-xs overflow-hidden flex flex-col hover:shadow-lg transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {(product.ribbon || (product.discountPrice > 0 && product.price > product.discountPrice)) && (
          <span className="bg-[#1C1917] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1">
            {product.ribbon ? `-${product.ribbon.replace('-', '')}` : `-${Math.round((1 - product.discountPrice / product.price) * 100)}%`}
          </span>
        )}
        {product.isNewProduct && (
          <span className="bg-[#C8A882] text-white text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5">
            Nouveauté
          </span>
        )}
      </div>

      {/* Image container */}
      <Link href={`/${locale}/produit/${product.slug}`} className="block relative aspect-square overflow-hidden bg-stone-50">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Quick Add Overlay on desktop hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full py-2.5 bg-white/95 text-stone-900 text-xs uppercase tracking-wider font-semibold hover:bg-[#C8A882] hover:text-white transition-colors flex items-center justify-center gap-2 shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Ajouter au panier</span>
          </button>
        </div>
      </Link>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A07A50] font-semibold block mb-1">
            {product.category || 'Soin Visage'}
          </span>
          <Link href={`/${locale}/produit/${product.slug}`}>
            <h3 className="font-serif-luxury text-base font-semibold text-stone-900 group-hover:text-[#A07A50] transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          {shortDesc && (
            <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
              {shortDesc}
            </p>
          )}
        </div>

        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {product.discountPrice > 0 ? (
              <>
                <span className="text-sm font-bold text-stone-900">
                  {product.discountPrice.toFixed(2)} €
                </span>
                <span className="text-xs text-stone-400 line-through">
                  {product.price.toFixed(2)} €
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-stone-900">
                {product.price.toFixed(2)} €
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[11px] text-stone-500">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>5.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
