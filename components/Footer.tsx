'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface FooterProps {
  locale: string;
  dictionary?: any;
}

export function Footer({ locale }: FooterProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !email.includes('@')) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    if (!acceptedTerms) {
      setError('Veuillez accepter les termes et conditions.');
      return;
    }

    setStatus('loading');
    setError('');

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName, locale })
      });
      setStatus('success');
      setEmail('');
      setFirstName('');
      setLastName('');
    } catch {
      setStatus('success'); // graceful fallback for frontend demo
    }
  };

  return (
    <footer className="w-full bg-white text-[#130D01] border-t border-stone-200/80">
      {/* 1. TOP NEWSLETTER BOX (EXACT LIVE SITE ELEMENTOR FOOTER SECTION 1: #111111) */}
      <div className="w-full bg-[#111111] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Heading & Subtitle */}
            <div className="lg:col-span-5 text-center lg:text-left">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-[34px] font-normal uppercase tracking-[0.12em] text-white leading-tight mb-3">
                Inscrivez-vous a la newsletter Ruth Niddam
              </h2>
              <p className="font-poppins text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Recevez nos rituels exclusifs, nos conseils beaute et les dernieres actualites de Ruth Niddam.
              </p>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              {status === 'success' ? (
                <div className="p-6 bg-stone-900 border border-[#BB763E]/40 rounded-xs text-center">
                  <CheckCircle2 className="w-10 h-10 text-[#BB763E] mx-auto mb-2" />
                  <h3 className="font-heading text-base uppercase tracking-wider text-white font-semibold mb-1">
                    Merci pour votre inscription !
                  </h3>
                  <p className="text-xs text-stone-300 font-light">
                    Vous recevrez prochainement nos secrets et rituels exclusifs.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  {error && (
                    <div className="p-2.5 bg-red-950/50 border border-red-500/50 text-red-200 text-xs rounded-xs">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Votre Prénom*"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-stone-800 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-[#BB763E] transition-colors rounded-xs"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Votre Nom*"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1A1A1A] border border-stone-800 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-[#BB763E] transition-colors rounded-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Votre Email*"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1A1A1A] border border-stone-800 text-xs text-white placeholder-stone-400 focus:outline-hidden focus:border-[#BB763E] transition-colors rounded-xs"
                    />
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <input
                      type="checkbox"
                      id="footer-terms"
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      className="mt-1 h-3.5 w-3.5 rounded-xs border-stone-700 bg-stone-900 text-[#BB763E] focus:ring-[#BB763E]"
                    />
                    <label htmlFor="footer-terms" className="text-[11px] text-stone-300 font-light">
                      J&apos;accepte les{' '}
                      <Link
                        href={`/${locale}/politique-de-confidentialite`}
                        className="underline hover:text-[#BB763E] transition-colors"
                      >
                        termes et conditions
                      </Link>{' '}
                      et la politique de confidentialité.
                    </label>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-[#BB763E] text-stone-950 hover:text-white font-semibold text-xs uppercase tracking-[0.2em] transition-all duration-300 rounded-xs shadow-md cursor-pointer"
                    >
                      <span>{status === 'loading' ? 'Envoi...' : "Je m'inscris"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN 5-COLUMN FOOTER LINKS (EXACT LIVE SITE SECTION 2) */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12 py-16 sm:py-20">
        
        {/* Mobile: Logo on Top */}
        <div className="block lg:hidden mb-12 text-center">
          <Link href={`/${locale}`} className="inline-block">
            <img
              src="https://ruthniddam.fr/wp-content/uploads/2024/05/RUTH_NIDDAM_LOGO_COMPLET_NOIR_RGB.jpg"
              alt="Ruth Niddam Paris"
              className="h-24 sm:h-28 w-auto mx-auto object-contain"
            />
          </Link>
        </div>

        {/* 5 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Column 1: liens utiles */}
          <div>
            <h6 className="font-poppins text-base font-semibold uppercase text-[#130D01] tracking-wider mb-6">
              liens utiles
            </h6>
            <ul className="space-y-3 font-poppins text-[13px] text-[#130D01]">
              <li>
                <Link href={`/${locale}/prise-de-rendez-vous`} className="hover:text-[#BB763E] transition-colors">
                  Prendre RDV
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/boutique`} className="hover:text-[#BB763E] transition-colors">
                  Nos produits
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/ruth-niddam`} className="hover:text-[#BB763E] transition-colors">
                  RUTH NIDDAM
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produit/gua-sha-my-jeaneth`} className="hover:text-[#BB763E] transition-colors">
                  GUA SHA
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/presse`} className="hover:text-[#BB763E] transition-colors">
                  Presse
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/blog`} className="hover:text-[#BB763E] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.youtube.com/channel/UCH9Xd1PWLzG87ydGXhHzA6w" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#BB763E] transition-colors"
                >
                  YouTube
                </a>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-[#BB763E] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: soins & TRAiTeMENTS */}
          <div>
            <h6 className="font-poppins text-base font-semibold uppercase text-[#130D01] tracking-wider mb-6">
              soins &amp; TRAiTeMENTS
            </h6>
            <ul className="space-y-3 font-poppins text-[13px] text-[#130D01]">
              <li>
                <Link href={`/${locale}/nos-soins-et-traitements/visage-et-cou`} className="hover:text-[#BB763E] transition-colors">
                  Visage ou Cou
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/nos-soins-et-traitements/ventre-dos`} className="hover:text-[#BB763E] transition-colors">
                  Ventre ou Dos
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/nos-soins-et-traitements/cuisses-fesses`} className="hover:text-[#BB763E] transition-colors">
                  Cuisses &amp; Fesses
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/nos-soins-et-traitements/bras`} className="hover:text-[#BB763E] transition-colors">
                  Bras
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/nos-soins-et-traitements/cheveux`} className="hover:text-[#BB763E] transition-colors">
                  Cheveux
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/epilation`} className="hover:text-[#BB763E] transition-colors">
                  Epilation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand Logo in Center (Desktop) */}
          <div className="hidden lg:flex flex-col items-center justify-start pt-2 px-2">
            <Link href={`/${locale}`} className="inline-block group">
              <img
                src="https://ruthniddam.fr/wp-content/uploads/2024/05/RUTH_NIDDAM_LOGO_COMPLET_NOIR_RGB.jpg"
                alt="Ruth Niddam Paris"
                className="w-full max-w-[220px] h-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </Link>
          </div>

          {/* Column 4: Nos Formations & TECHNOLOGIES */}
          <div>
            {/* Header 1 */}
            <h6 className="font-poppins text-base font-semibold uppercase text-[#130D01] tracking-wider mb-4">
              <Link href={`/${locale}/nos-formations`} className="hover:text-[#BB763E] transition-colors">
                Nos Formations​
              </Link>
            </h6>

            {/* Header 2 */}
            <h6 className="font-poppins text-base font-semibold uppercase text-[#130D01] tracking-wider mt-8 mb-4">
              TECHNOLOGIES
            </h6>
            <ul className="space-y-3 font-poppins text-[13px] text-[#130D01]">
              <li>
                <Link href={`/${locale}/technologies`} className="hover:text-[#BB763E] transition-colors">
                  Toutes nos technologies
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/accent-prime-radiofrequence-et-ultrasons`} className="hover:text-[#BB763E] transition-colors">
                  Accent Prime - Radiofréquence et Ultrasons
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/jet-peel`} className="hover:text-[#BB763E] transition-colors">
                  Jet Peel
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: CONTACT */}
          <div>
            <h6 className="font-poppins text-base font-semibold uppercase text-[#130D01] tracking-wider mb-6">
              CONTACT
            </h6>
            <div className="space-y-3 font-poppins text-[13px] text-[#130D01]">
              <p>
                <span className="font-medium">E-mail : </span>
                <a href="mailto:contact@ruthniddam.com" className="hover:text-[#BB763E] transition-colors">
                  contact@ruthniddam.com
                </a>
              </p>
              <p>
                <span className="font-medium">Téléphone : </span>
                <a href="tel:0140731010" className="hover:text-[#BB763E] transition-colors">
                  01 40 73 10 10
                </a>
              </p>
              <p className="pt-2 text-stone-700 leading-relaxed font-light">
                <span className="font-medium text-[#130D01]">Centre esthétique :</span><br />
                32 Avenue Matignon, 75008 Paris.
              </p>
              <p className="text-stone-600 text-xs font-light leading-relaxed">
                Métro : Franklin D. Roosevelt - Ligne 1<br />
                Métro Miromesnil - Ligne 9
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. DIVIDER & BOTTOM LEGAL BAR */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="border-t border-[#C4BDBD] py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-poppins text-[#130D01]">
          {/* Copyright */}
          <div>
            <a 
              href="https://aboutyouandco.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-[#BB763E] transition-colors"
            >
              © Ruth Niddam 2026 - Tous droits réservés - Réalisation About You &amp; Co
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-stone-700">
            <Link href={`/${locale}/retractation`} className="hover:text-[#BB763E] transition-colors">
              Rétractation
            </Link>
            <Link href={`/${locale}/conditions-generales-de-vente`} className="hover:text-[#BB763E] transition-colors">
              CGV
            </Link>
            <Link href={`/${locale}/politique-de-retour`} className="hover:text-[#BB763E] transition-colors">
              Politique de retour
            </Link>
            <Link href={`/${locale}/politique-de-confidentialite`} className="hover:text-[#BB763E] transition-colors">
              Politique de confidentialité
            </Link>
            <Link href={`/${locale}/mentions-legales`} className="hover:text-[#BB763E] transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
