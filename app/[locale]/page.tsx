import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/home/HeroSection';
import { TreatmentsSection } from '@/components/home/TreatmentsSection';
import { MethodSection } from '@/components/home/MethodSection';
import { RitualsSection } from '@/components/home/RitualsSection';
import { GuaShaSection } from '@/components/home/GuaShaSection';
import { PressSection } from '@/components/home/PressSection';
import { PillarsSection } from '@/components/home/PillarsSection';
import { CommunitySection } from '@/components/home/CommunitySection';
import { NewsletterModal } from '@/components/home/NewsletterModal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: "Centre Ruth Niddam Paris | Soins Facialistes d'Exception & Cosmétiques",
    description:
      "Élue par le magazine ELLE Top 5 des meilleures facialistes en France. Soin signature, Kobido, radiofréquence, microneedling et Gua Sha My Jeaneth au 32 Avenue Matignon Paris 8.",
    alternates: {
      canonical: `https://ruthniddam.fr/${locale}`
    }
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7]">
      {/* 1. Hero: Video, Logo, Titles, Distinction & CTAs */}
      <HeroSection locale={locale} />

      {/* 2. Nos Soins Incontournables: Signature, Kobido, Radiofréquence, Microneedling */}
      <TreatmentsSection locale={locale} />

      {/* 3. La Méthode "Walking on the skin": Authentic 3-photo collage & copy */}
      <MethodSection locale={locale} />

      {/* 4. Nos Rituels Beauté: 4 Coffrets avec avantage -15% & Add-to-cart */}
      <RitualsSection locale={locale} />

      {/* 5. GUA SHA MY JEANETH™: Video démonstration & innovation brevetée */}
      <GuaShaSection locale={locale} />

      {/* 6. Presse: ELLE, VOGUE, Infrarouge, BFM TV & modal plein écran */}
      <PressSection locale={locale} />

      {/* 7. Les 4 Piliers: Produit Green, Cruelty-free, +25 ans d'expérience, Made in France */}
      <PillarsSection />

      {/* 8. Communauté: +100K abonnés, feed Instagram & réseaux officiels */}
      <CommunitySection />

      {/* 9. Newsletter Modal: Popup confidentielle après interaction */}
      <NewsletterModal locale={locale} />
    </div>
  );
}
