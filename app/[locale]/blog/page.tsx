import React from 'react';
import Link from 'next/link';
import { initialBlogPosts } from '@/lib/seed-data';
import { getLocalized } from '@/lib/i18n';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-2">
            Journal & Expertise
          </span>
          <h1 className="font-serif-luxury text-4xl sm:text-5xl text-stone-900 font-light mb-4">
            Le Carnet de Soins
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto">
            Conseils de maître facialiste, rituels d&apos;automassage et secrets de longévité cellulaire partagés par Ruth Niddam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {initialBlogPosts.map((post) => (
            <article
              key={post.slug}
              className="bg-white border border-stone-200/80 rounded-xs overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="aspect-16/9 overflow-hidden bg-stone-100">
                <img
                  src={post.image}
                  alt={getLocalized(post.title, locale, '')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-[11px] text-stone-400 mb-3">
                    <span className="uppercase tracking-wider font-semibold text-[#A07A50]">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-[#C8A882]" />
                      {post.author}
                    </span>
                  </div>

                  <h2 className="font-serif-luxury text-2xl font-semibold text-stone-900 group-hover:text-[#A07A50] transition-colors mb-3 leading-snug">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {getLocalized(post.title, locale, '')}
                    </Link>
                  </h2>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light line-clamp-3">
                    {getLocalized(post.excerpt, locale, '')}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100">
                  <Link
                    href={`/${locale}/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-[#A07A50] transition-colors"
                  >
                    <span>Lire l&apos;article complet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
