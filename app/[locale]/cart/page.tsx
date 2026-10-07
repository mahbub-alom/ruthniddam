'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [resolvedLocale, setResolvedLocale] = useState('fr');
  const { items, updateQuantity, removeItem, clearCart, subtotal, itemCount } = useCart();

  useEffect(() => {
    params.then((p) => setResolvedLocale(p.locale));
  }, [params]);

  const shipping = subtotal >= 80 ? 0 : 5.90;
  const total = subtotal + shipping;

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-light mb-8 text-center sm:text-left">
          Votre Panier d&apos;Achats ({itemCount})
        </h1>

        {items.length === 0 ? (
          <div className="bg-white p-12 text-center border border-stone-200/80 rounded-xs shadow-xs max-w-xl mx-auto">
            <ShoppingBag className="w-16 h-16 text-stone-300 mx-auto mb-4 stroke-1" />
            <h2 className="font-serif-luxury text-2xl font-light text-stone-900 mb-2">
              Votre panier est vide
            </h2>
            <p className="text-xs text-stone-500 mb-8 max-w-sm mx-auto">
              Découvrez nos soins visage haute performance et nos outils de massage sculptant.
            </p>
            <Link
              href={`/${resolvedLocale}/boutique`}
              className="px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs inline-block"
            >
              Explorer la boutique
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Items Column */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-8 border border-stone-200/80 rounded-xs shadow-xs">
              <div className="divide-y divide-stone-100">
                {items.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start">
                    <div className="w-24 h-24 bg-stone-50 rounded-xs overflow-hidden shrink-0 border border-stone-200">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-semibold text-stone-900">{item.name}</h3>
                          {item.variation && (
                            <p className="text-xs text-stone-500 mt-0.5">Option : {item.variation}</p>
                          )}
                        </div>
                        <span className="text-base font-serif-luxury font-bold text-stone-900">
                          {(item.price * item.quantity).toFixed(2)} €
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-stone-200 rounded-xs bg-white">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1.5 text-stone-500 hover:text-stone-900"
                            aria-label="Diminuer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-stone-900">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-stone-500 hover:text-stone-900"
                            aria-label="Augmenter"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-stone-400 hover:text-rose-600 transition-colors p-1 flex items-center gap-1 text-xs"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Supprimer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-stone-100 flex justify-between items-center">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs text-stone-400 hover:text-stone-700 underline"
                >
                  Vider le panier
                </button>
                <Link
                  href={`/${resolvedLocale}/boutique`}
                  className="text-xs uppercase tracking-wider text-stone-700 hover:text-stone-950 font-semibold"
                >
                  Continuer les achats
                </Link>
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 border border-stone-200/80 rounded-xs shadow-xs h-fit space-y-6">
              <h3 className="font-serif-luxury text-xl font-semibold text-stone-900 border-b border-stone-100 pb-4">
                Récapitulatif de commande
              </h3>

              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-medium text-stone-900">{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Frais de livraison</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700">Offert</strong> : `${shipping.toFixed(2)} €`}</span>
                </div>
                <div className="pt-3 border-t border-stone-100 flex justify-between text-sm font-semibold text-stone-900">
                  <span>Total TTC</span>
                  <span className="text-lg font-serif-luxury">{total.toFixed(2)} €</span>
                </div>
              </div>

              <Link
                href={`/${resolvedLocale}/checkout`}
                className="w-full py-4 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-colors rounded-xs shadow-md"
              >
                <span>Passer la commande</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="space-y-2 pt-4 border-t border-stone-100 text-[11px] text-stone-500">
                <p className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-[#C8A882]" />
                  Livraison offerte dès 80€ en France
                </p>
                <p className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A882]" />
                  Paiement 3D Secure chiffré
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
