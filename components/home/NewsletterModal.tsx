'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { X, Sparkles, CheckCircle2 } from 'lucide-react';

interface NewsletterModalProps {
  locale: string;
}

export function NewsletterModal({ locale }: NewsletterModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if dismissed previously
    const dismissed = sessionStorage.getItem('rn_newsletter_dismissed');
    if (!dismissed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('rn_newsletter_dismissed', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError('Veuillez renseigner tous les champs.');
      return;
    }
    if (!acceptedTerms) {
      setError('Veuillez accepter les termes et conditions.');
      return;
    }

    setError('');
    setIsSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-white rounded-xs shadow-2xl overflow-hidden border border-stone-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 z-20 p-2 text-stone-500 hover:text-stone-900 bg-white/80 hover:bg-white rounded-full transition-colors"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[400px]">
          {/* Left Side */}
          <div className="md:col-span-5 bg-[#1C1917] p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#C8A882]/20 text-[#DFBE99] text-[10px] uppercase font-bold tracking-widest rounded-xs mb-6">
                <Sparkles className="w-3 h-3" />
                <span>Privilège Membre</span>
              </div>

              <h2 className="font-heading text-lg sm:text-xl font-normal uppercase tracking-wider text-stone-100 leading-snug mb-4">
                Recevez en exclusivité nos rituels d’auto-massage, conseils beauté et lancements.
              </h2>

              <p className="font-poppins text-xs text-[#C8A882] font-light leading-relaxed">
                Un contenu confidentiel réservé à notre communauté.
              </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-stone-800 text-[10px] text-stone-400 font-light tracking-widest uppercase">
              Ruth Niddam Paris
            </div>

            {/* Subtle background glow */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#C8A882]/10 rounded-full blur-2xl pointer-events-none" />
          </div>

          {/* Right Side Form */}
          <div className="md:col-span-7 p-6 sm:p-8 bg-[#FAF7F2] flex flex-col justify-center">
            {isSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-[#A07A50] mx-auto mb-3" />
                <h3 className="font-heading text-base font-semibold text-stone-900 uppercase tracking-wider mb-2">
                  Bienvenue dans le cercle privé
                </h3>
                <p className="text-xs text-stone-600 font-light">
                  Votre invitation exclusive vous a été envoyée par email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="font-heading text-sm uppercase tracking-widest text-stone-900 font-semibold mb-4">
                  Inscription Privilège
                </h3>

                {error && (
                  <div className="mb-3 p-2 text-xs bg-red-50 text-red-700 rounded-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                      Prénom*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Prénom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#C8A882]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                      Nom*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#C8A882]"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-[10px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                    Email*
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#C8A882]"
                  />
                </div>

                <div className="flex items-start gap-2 mb-5">
                  <input
                    type="checkbox"
                    id="modal-terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 h-3.5 w-3.5 rounded-xs border-stone-300 text-[#C8A882] focus:ring-[#C8A882]"
                  />
                  <label htmlFor="modal-terms" className="text-[10px] text-stone-600 font-light">
                    J&apos;accepte les{' '}
                    <Link
                      href={`/${locale}/politique-de-confidentialite`}
                      className="underline hover:text-[#A07A50]"
                    >
                      conditions de confidentialité
                    </Link>.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-colors rounded-xs shadow-md"
                >
                  S&apos;inscrire
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
