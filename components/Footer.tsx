'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

function InstagramIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" />
    </svg>
  );
}

interface FooterProps {
  locale: string;
  dictionary: any;
}

export function Footer({ locale, dictionary }: FooterProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !agreed) return;
    setStatus('loading');
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
      setStatus('idle');
    }
  };

  return (
    <footer className="bg-[#1C1917] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section matching live site */}
        <div className="pb-16 border-b border-stone-800">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C8A882] font-semibold flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C8A882]" />
              LETTRE CONFIDENTIELLE
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-white font-normal uppercase tracking-wider">
              Inscrivez-vous à la newsletter Ruth Niddam
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm mt-3 leading-relaxed">
              Recevez en exclusivité les conseils de notre maître facialiste, nos nouveautés cosmétiques et nos invitations privées.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {status === 'success' ? (
              <div className="p-4 bg-stone-900 border border-[#C8A882]/40 rounded-xs flex items-center justify-center gap-3 text-emerald-400 text-xs">
                <CheckCircle2 className="w-4 h-4 text-[#C8A882]" />
                <span>Merci pour votre inscription à la lettre confidentielle Ruth Niddam Paris !</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Prénom"
                    required
                    className="w-full px-4 py-3 text-xs bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                  />
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Nom"
                    required
                    className="w-full px-4 py-3 text-xs bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-mail"
                    required
                    className="w-full px-4 py-3 text-xs bg-stone-900/90 border border-stone-700 text-white placeholder-stone-500 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
                  <label className="flex items-start gap-2.5 text-[11px] text-stone-400 cursor-pointer max-w-xl text-left select-none">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-0.5 rounded-xs border-stone-600 text-[#C8A882] focus:ring-[#C8A882]"
                      required
                    />
                    <span>
                      J&apos;accepte de recevoir les newsletters de Ruth Niddam et je confirme avoir pris connaissance de la Politique de Confidentialité.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={status === 'loading' || !agreed}
                    className="w-full sm:w-auto px-8 py-3 text-xs uppercase tracking-widest font-semibold bg-[#C8A882] hover:bg-white text-stone-950 transition-colors rounded-xs shrink-0 disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Envoi...' : "S'ABONNER"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* 4 Main Categorized Columns */}
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-xs">
          {/* Column 1: LIENS UTILES */}
          <div>
            <h4 className="font-heading text-sm text-white uppercase tracking-[0.2em] font-semibold mb-5 pb-2 border-b border-stone-800">
              LIENS UTILES
            </h4>
            <ul className="space-y-3 text-stone-400">
              <li>
                <Link href={`/${locale}/ruth-niddam`} className="hover:text-white transition-colors">
                  Pourquoi Ruth Niddam
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/prise-de-rendez-vous`} className="hover:text-white transition-colors">
                  Nos Soins incontournables
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/nos-rituels-beaute`} className="hover:text-white transition-colors">
                  Nos Rituels Beauté
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/boutique`} className="hover:text-white transition-colors">
                  Shop Cosmétiques
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/produit/gua-sha-my-jeaneth`} className="hover:text-white transition-colors">
                  GUA SHA My Jeaneth™
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/nos-formations`} className="hover:text-white transition-colors">
                  Nos Formations (Qualiopi)
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/presse`} className="hover:text-white transition-colors">
                  Presse & Distinctions
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: SOINS & TRAITEMENTS */}
          <div>
            <h4 className="font-heading text-sm text-white uppercase tracking-[0.2em] font-semibold mb-5 pb-2 border-b border-stone-800">
              SOINS & TRAITEMENTS
            </h4>
            <ul className="space-y-3 text-stone-400">
              <li>
                <Link href={`/${locale}/prise-de-rendez-vous`} className="hover:text-white transition-colors">
                  Soin Signature Ruth Niddam
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/prise-de-rendez-vous`} className="hover:text-white transition-colors">
                  Massage Kobido Ancestral Japonais
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/prise-de-rendez-vous`} className="hover:text-white transition-colors">
                  Radiofréquence Tenseur Visage
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/prise-de-rendez-vous`} className="hover:text-white transition-colors">
                  Microneedling Régénérant Expert
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/prise-de-rendez-vous`} className="hover:text-white transition-colors">
                  Jet Peel Esthétique & Acide Pur
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/prise-de-rendez-vous`} className="hover:text-white transition-colors">
                  Diagnostic Morpho-Facial 3D
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: TECHNOLOGIES */}
          <div>
            <h4 className="font-heading text-sm text-white uppercase tracking-[0.2em] font-semibold mb-5 pb-2 border-b border-stone-800">
              TECHNOLOGIES
            </h4>
            <ul className="space-y-3 text-stone-400">
              <li>
                <span className="text-white font-medium">La Méthode « Walking on the skin »</span>
                <p className="text-[11px] text-stone-500 mt-0.5">Chorégraphie brevetée sur les fascias</p>
              </li>
              <li>
                <span className="text-white font-medium">Céramique minérale naturelle</span>
                <p className="text-[11px] text-stone-500 mt-0.5">Conception artisanale haute performance</p>
              </li>
              <li>
                <span className="text-white font-medium">Bio-stimulation cellulaire</span>
                <p className="text-[11px] text-stone-500 mt-0.5">Radiofréquence et mésothérapie sans aiguille</p>
              </li>
              <li>
                <span className="text-white font-medium">Actifs d&apos;or pur 24 carats</span>
                <p className="text-[11px] text-stone-500 mt-0.5">Gamme de cosmétiques nobles fabriquée en France</p>
              </li>
            </ul>
          </div>

          {/* Column 4: CONTACT & INSTITUT */}
          <div>
            <h4 className="font-heading text-sm text-white uppercase tracking-[0.2em] font-semibold mb-5 pb-2 border-b border-stone-800">
              CENTRE PARIS 8
            </h4>
            <div className="space-y-3 text-stone-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C8A882] shrink-0 mt-0.5" />
                <span>32 Avenue Matignon, 75008 Paris<br /><span className="text-[11px] text-stone-500">Triangle d&apos;Or — Métro Matignon / Miromesnil</span></span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C8A882] shrink-0" />
                <a href="tel:0140731010" className="hover:text-white transition-colors">
                  +33 (0)1 40 73 10 10
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C8A882] shrink-0" />
                <a href="mailto:contact@ruthniddam.fr" className="hover:text-white transition-colors">
                  contact@ruthniddam.fr
                </a>
              </p>
              <div className="pt-2 text-[11px] text-stone-500">
                <p className="font-medium text-stone-400">Horaires d&apos;ouverture :</p>
                <p>Du Lundi au Samedi : 09h00 - 19h30</p>
                <p>Sur rendez-vous uniquement</p>
              </div>

              {/* Social links */}
              <div className="pt-3 flex items-center gap-3">
                <a
                  href="https://www.instagram.com/ruthniddamparis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-[#C8A882] hover:border-[#C8A882] transition-colors"
                  aria-label="Instagram Ruth Niddam"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-[#C8A882] hover:border-[#C8A882] transition-colors"
                  aria-label="Facebook Ruth Niddam"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center text-stone-300 hover:text-[#C8A882] hover:border-[#C8A882] transition-colors"
                  aria-label="YouTube Ruth Niddam"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row matching live site */}
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div>
            © 2025 Ruth Niddam Paris — Tous droits réservés.
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-400">
            <Link href={`/${locale}/retractation`} className="hover:text-[#C8A882] transition-colors">
              Rétractation
            </Link>
            <span>•</span>
            <Link href={`/${locale}/cgv`} className="hover:text-[#C8A882] transition-colors">
              Conditions Générales de Vente
            </Link>
            <span>•</span>
            <Link href={`/${locale}/politique-de-retour`} className="hover:text-[#C8A882] transition-colors">
              Politique de retour
            </Link>
            <span>•</span>
            <Link href={`/${locale}/politique-de-confidentialite`} className="hover:text-[#C8A882] transition-colors">
              Politique de confidentialité
            </Link>
            <span>•</span>
            <Link href={`/${locale}/mentions-legales`} className="hover:text-[#C8A882] transition-colors">
              Mentions Légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
