'use client';

import React, { useState } from 'react';
import { initialFormations } from '@/lib/seed-data';
import { Award, CheckCircle2, FileText, Send, Sparkles, BookOpen, Clock, Calendar, Check } from 'lucide-react';

export default function FormationsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [resolvedLocale, setResolvedLocale] = useState('fr');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedFormation, setSelectedFormation] = useState(initialFormations[0]?.slug || '');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  React.useEffect(() => {
    params.then((p) => setResolvedLocale(p.locale));
  }, [params]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: `Candidature Formation: ${selectedFormation}`,
          message: `Demande de dossier d'inscription pour la formation ${selectedFormation}`
        })
      });
      setStatus('success');
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#1C1917] text-[#DFBE99] text-xs uppercase tracking-[0.2em] font-semibold rounded-full mb-4 shadow-md">
            <Award className="w-4 h-4 text-[#C8A882]" />
            <span>Organisme de Formation Certifié Qualiopi</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-5xl font-normal text-stone-900 uppercase tracking-[0.14em] mb-4">
            Nos Formations
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm tracking-wide max-w-xl mx-auto leading-relaxed">
            Formations certifiantes éligibles aux financements de la formation continue : <strong>FAFCEA, OPCO EP, AGEFICE, FIF PL</strong>. Transmettre l&apos;excellence du geste facialiste à Paris 8ème.
          </p>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mt-4" />
        </div>

        {/* 3 Formations Cards Grid */}
        <div className="space-y-12 mb-20">
          {initialFormations.map((f, idx) => (
            <div key={f.slug} className="bg-white border border-stone-200/90 rounded-xs shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-5 relative aspect-4/3 lg:aspect-auto">
                <img
                  src={f.image}
                  alt={f.title.fr}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#1C1917] text-white px-3 py-1.5 text-xs font-semibold rounded-xs">
                  {f.duration}
                </div>
              </div>

              <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50]">
                      Module {idx + 1} • Présentiel Paris 8
                    </span>
                    <span className="text-sm font-heading font-bold text-stone-900">
                      {f.price} € TTC
                    </span>
                  </div>

                  <h2 className="font-heading text-xl sm:text-2xl font-semibold uppercase tracking-wider text-stone-900 mb-3">
                    {f.title.fr}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-light">
                    {f.description.fr}
                  </p>

                  <div className="space-y-4 mb-6">
                    {f.program.map((p, pIdx) => (
                      <div key={pIdx} className="p-4 bg-[#FAF7F2] border border-stone-200/70 rounded-xs">
                        <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-stone-900 mb-2">
                          {p.title.fr}
                        </h4>
                        <ul className="space-y-1 text-xs text-stone-600">
                          {p.details.map((d, dIdx) => (
                            <li key={dIdx} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-[#C8A882] shrink-0" />
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#A07A50] font-medium">
                    <Award className="w-4 h-4" />
                    <span>{f.certification}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFormation(f.slug);
                      document.getElementById('candidature-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs"
                  >
                    Postuler à ce module
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Candidature & Info Form */}
        <div id="candidature-form" className="max-w-3xl mx-auto bg-white p-8 sm:p-12 border border-stone-200/90 rounded-xs shadow-xl">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
              INSCRIPTION & PRISE EN CHARGE
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-stone-900 uppercase tracking-wider font-normal">
              Demande de Dossier de Financement
            </h3>
            <p className="text-xs text-stone-600 mt-2 font-light">
              Remplissez ce formulaire pour recevoir le programme détaillé et la convention de formation.
            </p>
          </div>

          {status === 'success' ? (
            <div className="p-6 bg-[#FAF7F2] border border-[#C8A882] rounded-xs text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[#C8A882] mx-auto" />
              <h4 className="font-heading text-lg font-semibold text-stone-900">Demande envoyée avec succès</h4>
              <p className="text-xs text-stone-600">
                Notre responsable pédagogique vous contactera sous 24h avec votre dossier complet.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Nom & Prénom *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Votre nom complet"
                    className="w-full px-4 py-3 text-xs bg-[#FAF7F2] border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                    Numéro de Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+33 6 00 00 00 00"
                    className="w-full px-4 py-3 text-xs bg-[#FAF7F2] border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Adresse E-mail *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="votre.email@domaine.com"
                  className="w-full px-4 py-3 text-xs bg-[#FAF7F2] border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                  Formation souhaitée *
                </label>
                <select
                  value={selectedFormation}
                  onChange={(e) => setSelectedFormation(e.target.value)}
                  className="w-full px-4 py-3 text-xs bg-[#FAF7F2] border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882] text-stone-800"
                >
                  {initialFormations.map((f) => (
                    <option key={f.slug} value={f.slug}>
                      {f.title.fr} ({f.price} €)
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#C8A882]" />
                  <span>{status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma candidature'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
