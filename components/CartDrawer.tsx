'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  locale: string;
}

export function CartDrawer({ locale }: CartDrawerProps) {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  if (!isOpen) return null;

  const freeShippingThreshold = 80;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-stone-200">
          {/* Header */}
          <div className="p-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C8A882]" />
              <h2 className="text-base font-semibold uppercase tracking-wider text-stone-900 font-serif-luxury">
                Votre Panier ({itemCount})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping bar */}
          <div className="bg-[#F6EFE6] px-5 py-3 border-b border-stone-200/60">
            {remainingForFreeShipping > 0 ? (
              <p className="text-xs text-stone-700">
                Plus que <strong className="text-stone-900 font-semibold">{remainingForFreeShipping.toFixed(2)} €</strong> pour la livraison offerte en France !
              </p>
            ) : (
              <p className="text-xs font-medium text-emerald-800 flex items-center gap-1.5">
                <span>✨</span> Félicitations, vous bénéficiez de la livraison offerte !
              </p>
            )}
            <div className="w-full bg-stone-200/80 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-[#C8A882] h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-stone-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-stone-500">
                <ShoppingBag className="w-12 h-12 text-stone-300 mb-3 stroke-[1.2]" />
                <p className="text-base font-serif-luxury text-stone-700 mb-1">Votre panier est vide</p>
                <p className="text-xs text-stone-500 mb-6">Explorez nos créations visage et nos outils de soin signature.</p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 text-xs uppercase tracking-widest bg-stone-900 text-white hover:bg-[#C8A882] transition-colors"
                >
                  Découvrir la boutique
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  <div className="w-20 h-20 bg-stone-100 rounded-sm relative overflow-hidden shrink-0 border border-stone-200/60">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-stone-900 truncate">{item.name}</h3>
                    {item.variation && (
                      <p className="text-xs text-stone-500 mt-0.5">Option: {item.variation}</p>
                    )}
                    <p className="text-sm font-semibold text-stone-900 mt-1">
                      {item.price.toFixed(2)} €
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-stone-200 rounded bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                          aria-label="Diminuer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-medium text-stone-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-stone-500 hover:text-stone-900 transition-colors"
                          aria-label="Augmenter"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-stone-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout */}
          {items.length > 0 && (
            <div className="p-5 bg-white border-t border-stone-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs uppercase tracking-wider text-stone-500">Sous-total</span>
                <span className="text-base font-semibold text-stone-900">{subtotal.toFixed(2)} €</span>
              </div>
              <p className="text-[11px] text-stone-400 mb-4">
                Frais de port et taxes calculés lors de la validation.
              </p>

              <div className="space-y-2">
                <Link
                  href={`/${locale}/checkout`}
                  onClick={closeCart}
                  className="w-full py-3.5 px-4 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <span>Passer la commande</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  href={`/${locale}/cart`}
                  onClick={closeCart}
                  className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs uppercase tracking-wider font-medium flex items-center justify-center transition-colors"
                >
                  Voir le panier complet
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
