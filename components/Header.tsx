'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { LanguageSwitcher } from './LanguageSwitcher';
import { 
  Menu, 
  X, 
  Search, 
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface HeaderProps {
  locale: string;
  dictionary: any;
}

export function Header({ locale, dictionary }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [treatmentsDropdownOpen, setTreatmentsDropdownOpen] = useState(false);
  const { openCart, itemCount, subtotal } = useCart();
  const pathname = usePathname();

  const treatments = [
    { label: 'Soin Signature', href: `/${locale}/prise-de-rendez-vous` },
    { label: 'KOBIDO', href: `/${locale}/prise-de-rendez-vous` },
    { label: 'Radiofréquence', href: `/${locale}/prise-de-rendez-vous` },
    { label: 'Microneedling', href: `/${locale}/prise-de-rendez-vous` },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/${locale}/boutique?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all bg-white shadow-xs">
      {/* 1. TOPBAR (ANNOUNCEMENT BAR) - EXACT LIVE SITE: #BB763E, white text, 14px */}
      <div className="w-full bg-[#BB763E] text-white text-center py-2.5 px-4 transition-colors hover:bg-[#a96833]">
        <Link 
          href={`/${locale}/nos-rituels-beaute`}
          className="inline-block text-xs sm:text-[13px] md:text-[14px] text-white tracking-wide font-normal leading-snug cursor-pointer hover:underline"
        >
          <strong>✨ NOUVEAUTÉ </strong> 
          <span> Nos Rituels Beauté : Optimisez vos résultats et profitez de -15% sur l&apos;achat de votre pack complet 📦 France &amp; International Delivery 🌍</span>
        </Link>
      </div>

      {/* 2. NAVBAR (MAIN HEADER) - EXACT LIVE SITE: pure white, 3 columns, exact fonts & icons */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            
            {/* Mobile: Hamburger Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-stone-900 hover:text-[#BB763E] focus:outline-hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-6 h-6 stroke-[1.8]" />
              </button>
            </div>

            {/* Left Column: Brand Logo */}
            <div className="flex items-center shrink-0">
              <Link href={`/${locale}`} className="inline-block">
                {/* Desktop Logo */}
                <img
                  src="https://ruthniddam.fr/wp-content/uploads/2025/06/Ruth-logo-03-1.jpg"
                  alt="Ruth Niddam Paris"
                  className="hidden sm:block h-12 sm:h-14 md:h-16 w-auto object-contain"
                />
                {/* Mobile Monogram Logo */}
                <img
                  src="https://ruthniddam.fr/wp-content/uploads/2024/05/RUTH_NIDDAM_MONOGRAMME_GAUCHE_TYPO_NOIR_RGB-1.svg"
                  alt="Ruth Niddam Paris"
                  className="block sm:hidden h-8 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Center Column: Navigation Menu (Desktop) */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-7">
              {/* Nos Soins with Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setTreatmentsDropdownOpen(true)}
                onMouseLeave={() => setTreatmentsDropdownOpen(false)}
              >
                <Link
                  href={`/${locale}/prise-de-rendez-vous`}
                  className={`flex items-center gap-1 text-[13px] uppercase font-semibold tracking-[-0.45px] transition-colors py-2 ${
                    pathname.includes('/prise-de-rendez-vous')
                      ? 'text-black border-b-2 border-black'
                      : 'text-black hover:text-[#BB763E]'
                  }`}
                >
                  <span>Nos Soins</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </Link>

                {treatmentsDropdownOpen && (
                  <div className="absolute top-full left-0 w-48 bg-white border border-stone-100 shadow-xl py-2 z-50 animate-in fade-in-50 zoom-in-95">
                    {treatments.map((t) => (
                      <Link
                        key={t.label}
                        href={t.href}
                        className="block px-4 py-2.5 text-xs text-stone-800 hover:bg-[#130D01] hover:text-white uppercase font-medium tracking-wide transition-colors"
                      >
                        {t.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Nos Rituels Beauté */}
              <Link
                href={`/${locale}/nos-rituels-beaute`}
                className={`text-[13px] uppercase font-semibold tracking-[-0.45px] transition-colors py-2 ${
                  pathname.includes('/nos-rituels-beaute')
                    ? 'text-black border-b-2 border-black'
                    : 'text-black hover:text-[#BB763E]'
                }`}
              >
                Nos Rituels Beauté
              </Link>

              {/* Shop */}
              <Link
                href={`/${locale}/boutique`}
                className={`text-[13px] uppercase font-semibold tracking-[-0.45px] transition-colors py-2 ${
                  pathname.includes('/boutique')
                    ? 'text-black border-b-2 border-black'
                    : 'text-black hover:text-[#BB763E]'
                }`}
              >
                Shop
              </Link>

              {/* GUA SHA */}
              <Link
                href={`/${locale}/produit/gua-sha-my-jeaneth`}
                className={`text-[13px] uppercase font-semibold tracking-[-0.45px] transition-colors py-2 ${
                  pathname.includes('/produit/gua-sha-my-jeaneth')
                    ? 'text-black border-b-2 border-black'
                    : 'text-black hover:text-[#BB763E]'
                }`}
              >
                GUA SHA
              </Link>

              {/* Nos Formations */}
              <Link
                href={`/${locale}/nos-formations`}
                className={`text-[13px] uppercase font-semibold tracking-[-0.45px] transition-colors py-2 ${
                  pathname.includes('/nos-formations')
                    ? 'text-black border-b-2 border-black'
                    : 'text-black hover:text-[#BB763E]'
                }`}
              >
                Nos Formations
              </Link>
            </nav>

            {/* Right Column: Utilities, Cart & CTA Button */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Account Icon (Desktop) */}
              <Link
                href={`/${locale}/admin/login`}
                className="hidden md:inline-flex p-1.5 text-black hover:text-[#BB763E] transition-colors"
                aria-label="Mon compte"
                title="Mon compte"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 20" fill="none" width="16" height="20">
                  <path d="M13.6481 17.3808C12.4893 15.4683 10.2591 14.167 7.68198 14.167C5.10388 14.167 2.87372 15.4683 1.71982 17.3746L1.64807 17.5307" stroke="#0E070F" strokeWidth="1.8" strokeLinecap="square" />
                  <path d="M11.2727 6.76923C11.2727 4.68754 9.58518 3 7.50348 3C5.42179 3 3.73425 4.68754 3.73425 6.76923C3.73425 8.852 5.42179 10.5385 7.50348 10.5385C9.58518 10.5385 11.2727 8.852 11.2727 6.76923" stroke="#0E070F" strokeWidth="1.8" />
                </svg>
              </Link>

              {/* Search Toggle Icon (Desktop) */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="hidden md:inline-flex p-1.5 text-black hover:text-[#BB763E] transition-colors"
                aria-label="Recherche"
                title="Rechercher"
              >
                <Search className="w-4 h-4 stroke-[2]" />
              </button>

              {/* Shopping Bag Cart Button (Exact live Elementor WooCommerce styling) */}
              <button
                onClick={openCart}
                className="flex items-center gap-2 p-1.5 text-black hover:text-[#BB763E] transition-colors cursor-pointer"
                aria-label="Panier d'achats"
              >
                <span className="hidden sm:inline-block font-sans text-xs font-semibold text-black tracking-tight">
                  {subtotal.toFixed(2).replace('.', ',')} €
                </span>

                <div className="relative flex items-center">
                  {/* Exact SVG bag from ruthniddam.fr */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20" fill="none">
                    <path d="M14.5 7.0157C14.5 4.7977 12.4848 3 10 3C7.5148 3 5.5 4.7977 5.5 7.0157" stroke="#0E070F" strokeWidth="1.8" strokeLinecap="round" />
                    <rect x="3.5" y="6.5" width="13" height="11" rx="1" stroke="#0E070F" strokeWidth="1.8" />
                  </svg>

                  {/* Quantity Indicator Bubble */}
                  <span className="ml-1 min-w-[18px] h-[18px] px-1 bg-[#130D01] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                </div>
              </button>

              {/* Language Switcher Dropdown */}
              <LanguageSwitcher currentLocale={locale} />

              {/* Booking CTA Button (Exact live styling: #130D01, 12px, tracking 1.2px, rounded 5px) */}
              <Link
                href={`/${locale}/prise-de-rendez-vous`}
                className="hidden sm:inline-flex items-center justify-center px-5 py-3 bg-[#130D01] hover:bg-black text-white text-[12px] uppercase font-semibold tracking-[1.2px] transition-colors rounded-[5px] shadow-xs"
              >
                Réserver un soin
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Input Bar (Dropdown) */}
      {searchOpen && (
        <div className="bg-[#FAF7F2] border-t border-b border-stone-200 p-4 transition-all animate-in slide-in-from-top duration-200">
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un soin, un rituel ou le Gua Sha My Jeaneth..."
                className="w-full pl-10 pr-28 py-2.5 text-xs bg-white border border-stone-300 rounded-[5px] focus:outline-hidden focus:border-[#BB763E] shadow-2xs"
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-1 px-4 py-1.5 text-xs uppercase tracking-wider bg-[#130D01] text-white hover:bg-black transition-colors rounded-[4px]"
              >
                Rechercher
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-stone-100">
                <Link href={`/${locale}`} onClick={() => setMobileMenuOpen(false)}>
                  <img
                    src="https://ruthniddam.fr/wp-content/uploads/2024/05/RUTH_NIDDAM_MONOGRAMME_GAUCHE_TYPO_NOIR_RGB-1.svg"
                    alt="Ruth Niddam"
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-stone-600 hover:text-stone-900"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Navigation Links */}
              <nav className="py-6 space-y-3">
                <Link
                  href={`/${locale}/prise-de-rendez-vous`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-[#BB763E] py-2 border-b border-stone-100"
                >
                  <span>Nos Soins</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </Link>

                <div className="pl-4 space-y-2 py-1">
                  {treatments.map((t) => (
                    <Link
                      key={t.label}
                      href={t.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-[11px] uppercase tracking-wide text-stone-600 hover:text-black py-1"
                    >
                      {t.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/${locale}/nos-rituels-beaute`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-[#BB763E] py-2 border-b border-stone-100"
                >
                  <span>Nos Rituels Beauté</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </Link>

                <Link
                  href={`/${locale}/boutique`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-[#BB763E] py-2 border-b border-stone-100"
                >
                  <span>Shop</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </Link>

                <Link
                  href={`/${locale}/produit/gua-sha-my-jeaneth`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-[#BB763E] py-2 border-b border-stone-100"
                >
                  <span>GUA SHA</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </Link>

                <Link
                  href={`/${locale}/nos-formations`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-[#BB763E] py-2 border-b border-stone-100"
                >
                  <span>Nos Formations</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </Link>

                <Link
                  href={`/${locale}/presse`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-stone-900 hover:text-[#BB763E] py-2 border-b border-stone-100"
                >
                  <span>Presse</span>
                  <ChevronRight className="w-4 h-4 text-stone-400" />
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-stone-100 space-y-4">
              <Link
                href={`/${locale}/prise-de-rendez-vous`}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 bg-[#130D01] text-white text-xs uppercase tracking-[1.2px] font-semibold flex items-center justify-center gap-2 rounded-[5px]"
              >
                <span>Réserver un soin</span>
              </Link>

              <div className="text-[11px] text-stone-500 space-y-1 text-center">
                <p>32 Avenue Matignon, 75008 Paris</p>
                <p>+33 (0)1 40 73 10 10</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
