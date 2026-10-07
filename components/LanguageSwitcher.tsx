'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n';
import { ChevronDown } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale: string;
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (newLocale: Locale) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    const segments = pathname.split('/');
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    const newPath = segments.join('/') || `/${newLocale}`;
    router.push(newPath);
  };

  const activeLocale = (locales.includes(currentLocale as Locale) ? currentLocale : 'fr') as Locale;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 p-1.5 text-xs text-stone-800 hover:text-black transition-colors rounded-xs focus:outline-hidden"
        aria-label="Sélectionner la langue"
      >
        <span className="text-base leading-none">{localeFlags[activeLocale]}</span>
        <span className="font-semibold text-[11px] uppercase tracking-wider">{activeLocale}</span>
        <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 rounded-xs bg-white shadow-xl border border-stone-100 z-50 py-1 animate-in fade-in-50 zoom-in-95">
          {locales.map((loc) => (
            <button
              key={loc}
              type="button"
              onClick={() => handleSelectLanguage(loc)}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                loc === activeLocale
                  ? 'bg-stone-50 text-black font-semibold'
                  : 'text-stone-600 hover:bg-stone-50 hover:text-black'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm">{localeFlags[loc]}</span>
                <span className="uppercase tracking-wider">{localeNames[loc]}</span>
              </span>
              {loc === activeLocale && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#BB763E]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
