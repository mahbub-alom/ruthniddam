'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { CheckCircle2, Lock, ShieldCheck, ArrowRight, Truck } from 'lucide-react';

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [resolvedLocale, setResolvedLocale] = useState('fr');
  const { items, subtotal, clearCart } = useCart();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('France');
  const [paymentMethod, setPaymentMethod] = useState('Carte Bancaire');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<any>(null);

  useEffect(() => {
    params.then((p) => setResolvedLocale(p.locale));
  }, [params]);

  const shipping = subtotal >= 80 ? 0 : 5.90;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          customer: {
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            postalCode,
            country
          },
          paymentMethod
        })
      });
      const data = await res.json();
      if (data.success) {
        setOrderConfirmed(data.data);
        clearCart();
      }
    } catch (err) {
      console.warn('Checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 sm:p-14 border border-stone-200/90 rounded-xs shadow-xl space-y-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full mx-auto flex items-center justify-center text-emerald-600 border border-emerald-200">
              <CheckCircle2 className="w-10 h-10 text-[#C8A882]" />
            </div>

            <h1 className="font-serif-luxury text-3xl sm:text-4xl font-light text-stone-900">
              Merci pour votre commande
            </h1>

            <div className="p-6 bg-[#FAF7F2] border border-stone-200/80 rounded-xs text-xs text-stone-700 text-left space-y-2">
              <p><strong>Numéro de commande :</strong> <span className="font-mono text-stone-900 font-bold">{orderConfirmed.orderNumber}</span></p>
              <p><strong>Client :</strong> {orderConfirmed.customer?.firstName} {orderConfirmed.customer?.lastName}</p>
              <p><strong>Email de confirmation :</strong> {orderConfirmed.customer?.email}</p>
              <p><strong>Livraison à :</strong> {orderConfirmed.customer?.address}, {orderConfirmed.customer?.postalCode} {orderConfirmed.customer?.city}</p>
              <p><strong>Montant réglé :</strong> {orderConfirmed.total?.toFixed(2)} € (TTC)</p>
            </div>

            <p className="text-xs text-stone-500 max-w-md mx-auto leading-relaxed">
              Votre colis est en cours de préparation dans notre atelier du 32 Avenue Matignon. Un numéro de suivi vous sera communiqué dès expédition.
            </p>

            <div className="pt-4">
              <Link
                href={`/${resolvedLocale}`}
                className="px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs inline-block"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#FDFBF7] min-h-screen py-20 text-center">
        <h2 className="font-serif-luxury text-2xl font-light text-stone-900 mb-4">
          Votre panier est vide
        </h2>
        <Link
          href={`/${resolvedLocale}/boutique`}
          className="px-6 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold rounded-xs"
        >
          Retour à la boutique
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif-luxury text-3xl sm:text-4xl text-stone-900 font-light mb-8 text-center sm:text-left">
          Validation de votre Commande
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Shipping Coordinates Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-stone-200/80 rounded-xs shadow-xs space-y-6">
            <h2 className="font-serif-luxury text-xl font-semibold text-stone-900 border-b border-stone-100 pb-3">
              1. Coordonnées de Livraison
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Prénom *
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Éléonore"
                  className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Nom *
                </label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="de Montmirail"
                  className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Email de confirmation *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.fr"
                  className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Téléphone (pour le transporteur) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                Adresse postale *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="ex. 12 rue du Faubourg Saint-Honoré"
                className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Code Postal *
                </label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder="75008"
                  className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Ville *
                </label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Paris"
                  className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Pays *
                </label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs text-stone-800 focus:outline-hidden focus:border-[#C8A882]"
                >
                  <option value="France">France</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Suisse">Suisse</option>
                  <option value="Italie">Italie</option>
                  <option value="Espagne">Espagne</option>
                  <option value="Portugal">Portugal</option>
                </select>
              </div>
            </div>

            {/* Payment Method */}
            <div className="pt-6 border-t border-stone-100 space-y-4">
              <h2 className="font-serif-luxury text-xl font-semibold text-stone-900">
                2. Mode de Règlement Sécurisé
              </h2>
              <div className="space-y-2">
                {[
                  { id: 'Carte Bancaire', label: 'Carte Bancaire (Visa, Mastercard, Amex)', icon: '💳' },
                  { id: 'Apple Pay', label: 'Apple Pay / Google Pay', icon: '📱' },
                  { id: 'Virement', label: 'Virement bancaire direct', icon: '🏛️' }
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`p-3.5 border rounded-xs flex items-center justify-between cursor-pointer transition-colors ${
                      paymentMethod === m.id
                        ? 'border-[#C8A882] bg-[#FAF7F2] ring-1 ring-[#C8A882]'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        className="text-[#C8A882] focus:ring-[#C8A882]"
                      />
                      <span className="text-xs font-medium text-stone-800">{m.label}</span>
                    </div>
                    <span className="text-base">{m.icon}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 border border-stone-200/80 rounded-xs shadow-xs h-fit space-y-6">
            <h3 className="font-serif-luxury text-xl font-semibold text-stone-900 border-b border-stone-100 pb-3">
              Articles commandés ({items.length})
            </h3>

            <div className="divide-y divide-stone-100 max-h-64 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item.id} className="py-3 flex gap-3 items-center">
                  <div className="w-12 h-12 bg-stone-50 rounded-xs overflow-hidden shrink-0 border border-stone-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-stone-900 truncate">{item.name}</h4>
                    <p className="text-[11px] text-stone-500">
                      Qté: {item.quantity} {item.variation ? `(${item.variation})` : ''}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-stone-900">
                    {(item.price * item.quantity).toFixed(2)} €
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-4 border-t border-stone-100 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Sous-total</span>
                <span className="font-medium text-stone-900">{subtotal.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700">Offerte</strong> : `${shipping.toFixed(2)} €`}</span>
              </div>
              <div className="pt-2 border-t border-stone-100 flex justify-between text-base font-semibold text-stone-900">
                <span>Total à régler</span>
                <span className="text-xl font-serif-luxury">{total.toFixed(2)} €</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors flex items-center justify-center gap-2 rounded-xs shadow-md"
            >
              <Lock className="w-4 h-4 text-[#C8A882]" />
              <span>{isSubmitting ? 'Traitement sécurisé...' : `Payer ${total.toFixed(2)} €`}</span>
            </button>

            <div className="pt-4 border-t border-stone-100 text-[11px] text-stone-500 space-y-1.5">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A882]" />
                Transaction sécurisée SSL chiffrée 256 bits
              </p>
              <p className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#C8A882]" />
                Expédition sous 24h depuis Paris 8ème
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
