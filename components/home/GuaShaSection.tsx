'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';

interface GuaShaSectionProps {
  locale: string;
}

export function GuaShaSection({ locale }: GuaShaSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Description */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DFBE99]/20 text-[#A07A50] text-[11px] uppercase tracking-widest font-semibold rounded-xs mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Innovation Brevetée</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-4xl text-stone-900 uppercase tracking-[0.14em] font-normal mb-4 leading-tight">
            MY JEANETH, le GUA SHA iconique par Ruth Niddam
          </h2>

          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mb-6" />

          <p className="font-poppins text-xs sm:text-sm text-stone-700 font-light leading-relaxed max-w-2xl mx-auto">
            Plongez dans l’univers de My Jeaneth, le Gua Sha emblématique façonné par Ruth Niddam.
            Breveté et fusionnant les meilleures fonctionnalités en un seul outil, explorez ses bienfaits polyvalents pour le visage et le corps.
          </p>
        </div>

        {/* Video Presentation Banner */}
        <div className="relative max-w-5xl mx-auto rounded-xs overflow-hidden shadow-2xl bg-stone-950 mb-12 group">
          <div className="aspect-16/9 sm:aspect-21/9 w-full relative">
            <video
              ref={videoRef}
              src="https://ruthniddam.fr/wp-content/uploads/2024/10/HORIZONTAL.mp4#t=10"
              poster="https://ruthniddam.fr/wp-content/uploads/2024/05/PRINCIPALE-couverture--433x516.jpg"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-stone-950/10 transition-colors" />

            {/* Video Control Buttons */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
                className="p-2.5 bg-stone-900/80 hover:bg-[#C8A882] text-white rounded-full transition-colors backdrop-blur-xs"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                className="p-2.5 bg-stone-900/80 hover:bg-[#C8A882] text-white rounded-full transition-colors backdrop-blur-xs"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Link
            href={`/${locale}/produit/gua-sha-my-jeaneth`}
            className="inline-flex items-center gap-2.5 px-10 py-4 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-[0.2em] font-semibold transition-all rounded-xs shadow-lg"
          >
            <span>Découvrez GUA SHA MY JEANETH™</span>
            <ArrowRight className="w-4 h-4 text-[#DFBE99]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
