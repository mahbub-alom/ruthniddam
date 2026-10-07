import frDict from '@/messages/fr.json';
import enDict from '@/messages/en.json';
import esDict from '@/messages/es.json';
import itDict from '@/messages/it.json';
import ptDict from '@/messages/pt.json';

export const locales = ['fr', 'en', 'es', 'it', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español',
  it: 'Italiano',
  pt: 'Português'
};

export const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇬🇧',
  es: '🇪🇸',
  it: '🇮🇹',
  pt: '🇵🇹'
};

const dictionaries: Record<Locale, typeof frDict> = {
  fr: frDict,
  en: enDict as unknown as typeof frDict,
  es: esDict as unknown as typeof frDict,
  it: itDict as unknown as typeof frDict,
  pt: ptDict as unknown as typeof frDict,
};

export function getDictionary(locale: string): typeof frDict {
  const loc = (locales.includes(locale as Locale) ? locale : defaultLocale) as Locale;
  return dictionaries[loc] || dictionaries.fr;
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Helper to get localized string from database objects having { fr, en, es, it, pt }
export function getLocalized(
  localizedObj: Record<string, string> | string | undefined | null,
  locale: string,
  fallback = ''
): string {
  if (!localizedObj) return fallback;
  if (typeof localizedObj === 'string') return localizedObj;

  const loc = locale as Locale;
  if (localizedObj[loc] && localizedObj[loc].trim().length > 0) {
    return localizedObj[loc];
  }

  // Fallback to fr, then en, then first non-empty value, then fallback
  if (localizedObj.fr && localizedObj.fr.trim().length > 0) {
    return localizedObj.fr;
  }
  if (localizedObj.en && localizedObj.en.trim().length > 0) {
    return localizedObj.en;
  }

  for (const key of locales) {
    if (localizedObj[key] && localizedObj[key].trim().length > 0) {
      return localizedObj[key];
    }
  }

  return fallback;
}
