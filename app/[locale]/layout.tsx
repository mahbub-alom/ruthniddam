import React from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { getDictionary, isValidLocale, locales } from '@/lib/i18n';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dictionary = getDictionary(locale);

  return (
    <div className="flex flex-col min-h-screen">
      <Header locale={locale} dictionary={dictionary} />
      <main className="flex-1">
        {children}
      </main>
      <Footer locale={locale} dictionary={dictionary} />
      <CartDrawer locale={locale} />
    </div>
  );
}
