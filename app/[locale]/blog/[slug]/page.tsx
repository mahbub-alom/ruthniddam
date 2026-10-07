import React from 'react';
import Link from 'next/link';
import { initialBlogPosts } from '@/lib/seed-data';
import { getLocalized } from '@/lib/i18n';
import { ChevronRight, Calendar, User, ArrowLeft, Share2 } from 'lucide-react';

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const post = initialBlogPosts.find((p) => p.slug === slug) || initialBlogPosts[0];

  const title = getLocalized(post.title, locale, '');
  const excerpt = getLocalized(post.excerpt, locale, '');
  const content = getLocalized(post.content, locale, '');

  return (
    <article className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 mb-8">
          <Link href={`/${locale}`} className="hover:text-stone-900">Accueil</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <Link href={`/${locale}/blog`} className="hover:text-stone-900">Journal</Link>
          <ChevronRight className="w-3 h-3 text-stone-400" />
          <span className="text-stone-900 font-medium truncate">{title}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-3">
            {post.category}
          </span>
          <h1 className="font-serif-luxury text-3xl sm:text-5xl font-light text-stone-900 leading-tight mb-4">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-light leading-relaxed mb-6">
            {excerpt}
          </p>

          <div className="flex items-center justify-center gap-6 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#C8A882]" />
              Par {post.author}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#C8A882]" />
              {new Date(post.publishedAt).toLocaleDateString(locale)}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-16/9 overflow-hidden rounded-xs border border-stone-200/90 shadow-xl mb-12 bg-stone-100">
          <img
            src={post.image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="bg-white p-8 sm:p-14 border border-stone-200/80 rounded-xs shadow-xs mb-12">
          <div className="prose prose-stone max-w-none text-stone-800 text-sm sm:text-base leading-relaxed space-y-6 font-light">
            <p className="first-letter:text-5xl first-letter:font-serif-luxury first-letter:font-light first-letter:text-[#A07A50] first-letter:mr-3 first-letter:float-left">
              {content}
            </p>
            <p>
              Pour expérimenter ces bienfaits en direct avec Ruth Niddam, vous pouvez réserver votre séance personnalisée au 32 Avenue Matignon, Paris 8ème.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-stone-100 flex items-center justify-between">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-700 hover:text-stone-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au journal</span>
            </Link>

            <Link
              href={`/${locale}/prise-de-rendez-vous`}
              className="px-6 py-3 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
