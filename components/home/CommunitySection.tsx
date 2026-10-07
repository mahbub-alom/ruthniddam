'use client';

import React from 'react';

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

function LinkedinIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
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

export function CommunitySection() {
  const posts = [
    {
      id: 1,
      image: 'https://ruthniddam.fr/wp-content/uploads/2024/05/Capture-decran-2024-07-09-a-16.24.06.jpg',
      link: 'https://www.instagram.com/ruthniddamparis/'
    },
    {
      id: 2,
      image: 'https://ruthniddam.fr/wp-content/uploads/2024/05/Capture-decran-2024-07-09-a-16.24.02.jpg',
      link: 'https://www.instagram.com/ruthniddamparis/'
    },
    {
      id: 3,
      image: 'https://ruthniddam.fr/wp-content/uploads/2024/05/Capture-decran-2024-07-09-a-16.23.56-1.jpg',
      link: 'https://www.instagram.com/ruthniddamparis/'
    },
    {
      id: 4,
      image: 'https://ruthniddam.fr/wp-content/uploads/2024/05/Capture-decran-2024-07-09-a-16.23.49.jpg',
      link: 'https://www.instagram.com/ruthniddamparis/'
    },
    {
      id: 5,
      image: 'https://ruthniddam.fr/wp-content/uploads/2024/05/Capture-decran-2024-07-09-a-16.23.43.jpg',
      link: 'https://www.instagram.com/ruthniddamparis/'
    }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      icon: InstagramIcon,
      href: 'https://www.instagram.com/ruthniddamparis/',
      color: 'hover:bg-[#E1306C]'
    },
    {
      name: 'Facebook',
      icon: FacebookIcon,
      href: 'https://www.facebook.com/RuthNiddamParis/',
      color: 'hover:bg-[#1877F2]'
    },
    {
      name: 'LinkedIn',
      icon: LinkedinIcon,
      href: 'https://www.linkedin.com/in/ruth-niddam-soins-beaute',
      color: 'hover:bg-[#0077b5]'
    },
    {
      name: 'YouTube',
      icon: YoutubeIcon,
      href: 'https://www.youtube.com/channel/UCH9Xd1PWLzG87ydGXhHzA6w',
      color: 'hover:bg-[#FF0000]'
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Headings */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-heading text-2xl sm:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal mb-3">
            Rejoignez la Communauté Ruth Niddam !
          </h2>

          <h4 className="font-heading text-base sm:text-lg text-[#A07A50] uppercase tracking-widest font-semibold mb-4">
            Plus de 100K d&apos;abonnés !
          </h4>

          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mb-6" />

          <p className="font-poppins text-xs sm:text-sm text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Intégrez notre communauté de plus de 100k abonnés et bénéficiez de contenus exclusifs, tutoriels, et conseils d’experts pour prendre soin de vous. Suivez Ruth Niddam sur les réseaux sociaux et plongez dans un univers dédié à la beauté, au bien-être, et à l’apprentissage personnalisé.
          </p>

          {/* Social Network Icon Buttons */}
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 bg-stone-100 text-stone-800 rounded-full transition-all duration-300 hover:text-white shadow-xs ${s.color}`}
                  aria-label={`Suivre Ruth Niddam sur ${s.name}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* 5 Instagram Posts Carousel / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-xs bg-stone-100 shadow-xs hover:shadow-xl transition-all duration-300"
            >
              <img
                src={post.image}
                alt="Instagram @ruthniddamparis"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/60 rounded-full text-xs font-medium backdrop-blur-xs">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@ruthniddamparis</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
