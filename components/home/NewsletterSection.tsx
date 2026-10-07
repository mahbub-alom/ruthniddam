'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface NewsletterSectionProps {
  locale: string;
}

export function NewsletterSection({ locale }: NewsletterSectionProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (!acceptedTerms) {
      setError('Veuillez accepter les termes et conditions.');
      return;
    }

    setError('');
    setIsSubmitted(true);
  };

  return (
    <section className="py-20 lg:py-24 bg-[#FAF7F2] border-t border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal mb-3">
              Inscrivez-vous a la newsletter Ruth Niddam
            </h2>
            <div className="w-16 h-0.5 bg-[#C8A882] mx-auto lg:mx-0 mb-4" />
            <p className="font-poppins text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Recevez nos rituels exclusifs, nos conseils beaute et les dernieres actualites de Ruth Niddam.
            </p>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            {isSubmitted ? (
              <div className="p-8 bg-white border border-[#C8A882]/40 rounded-xs shadow-md text-center">
                <CheckCircle2 className="w-12 h-12 text-[#A07A50] mx-auto mb-3" />
                <h3 className="font-heading text-lg text-stone-900 uppercase tracking-wider mb-2 font-semibold">
                  Merci pour votre inscription !
                </h3>
                <p className="text-xs text-stone-600 font-light">
                  Vous recevrez prochainement nos secrets de soin et privilèges confidentiels.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xs border border-stone-200/70 shadow-sm">
                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 text-xs rounded-xs">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                      Votre Prénom*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Prénom"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#C8A882] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                      Votre Nom*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nom"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#C8A882] transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-medium">
                    Votre Email*
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="adresse@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 text-xs text-stone-900 focus:outline-none focus:border-[#C8A882] transition-colors"
                  />
                </div>

                <div className="flex items-start gap-2.5 mb-6">
                  <input
                    type="checkbox"
                    id="terms-newsletter"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-3.5 w-3.5 rounded-xs border-stone-300 text-[#C8A882] focus:ring-[#C8A882]"
                  />
                  <label htmlFor="terms-newsletter" className="text-[11px] text-stone-600 font-light">
                    J&apos;accepte les{' '}
                    <Link
                      href={`/${locale}/politique-de-confidentialite`}
                      className="underline hover:text-[#A07A50] transition-colors"
                    >
                      termes et conditions
                    </Link>{' '}
                    et la politique de confidentialité.
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-xs shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Je m&apos;inscris</span>
                    <ArrowRight className="w-4 h-4 text-[#DFBE99]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
