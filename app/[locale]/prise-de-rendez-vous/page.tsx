'use client';

import React, { useState } from 'react';
import { Calendar, Clock, User, Mail, Phone, FileText, CheckCircle2, MapPin, Sparkles, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function BookingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [resolvedLocale, setResolvedLocale] = useState('fr');
  const [step, setStep] = useState(1);
  const [activeCategory, setActiveCategory] = useState('visage-cou');
  const [selectedService, setSelectedService] = useState('Soin Signature Ruth Niddam');
  const [selectedSlug, setSelectedSlug] = useState('soin-signature-ruth-niddam');
  const [price, setPrice] = useState(240);
  const [duration, setDuration] = useState('75 min');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('11:00');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  React.useEffect(() => {
    params.then((p) => setResolvedLocale(p.locale));
  }, [params]);

  const availableTimes = ['09:30', '11:00', '12:30', '14:00', '15:30', '17:00', '18:15'];

  // Categories matching live ruthniddam.fr/prise-de-rendez-vous
  const categories = [
    { id: 'visage-cou', label: 'Visage & Cou' },
    { id: 'ventre-dos', label: 'Ventre ou Dos' },
    { id: 'cuisses-fesses', label: 'Cuisses & Fesses' },
    { id: 'bras', label: 'Bras' },
    { id: 'cheveux', label: 'Cheveux' },
    { id: 'epilation', label: 'Épilation' }
  ];

  // Authentic treatments by category
  const allServices: Record<string, Array<{ title: string; slug: string; price: number; duration: string; desc: string }>> = {
    'visage-cou': [
      {
        title: 'Soin Signature Ruth Niddam',
        slug: 'soin-signature-ruth-niddam',
        price: 240,
        duration: '75 min',
        desc: 'Diagnostic facialiste poussé, chorégraphie manuelle exclusive « Walking on the skin », drainage et actifs purs.'
      },
      {
        title: 'Massage Kobido Ancestral Japonais',
        slug: 'massage-kobido-ancestral',
        price: 190,
        duration: '60 min',
        desc: 'Percussions rapides, vibrations et pétrissages profonds sur les 43 muscles et fascias pour relancer la tonicité.'
      },
      {
        title: 'Radiofréquence Tenseur Haute Précision',
        slug: 'radiofrequence-haute-precision',
        price: 210,
        duration: '60 min',
        desc: 'Élévation thermique contrôlée stimulant une néocollagenèse puissante et un raffermissement durable.'
      },
      {
        title: 'Microneedling Expert & Booster Cellulaire',
        slug: 'microneedling-expert',
        price: 220,
        duration: '60 min',
        desc: 'Micro-perforations ultra-fines associées à l’infusion profonde d’acide hyaluronique pur et peptides.'
      },
      {
        title: 'Jet Peel Esthétique Haute Performance',
        slug: 'jet-peel-esthetique-haute-performance',
        price: 240,
        duration: '75 min',
        desc: 'Infusion supersonique sans aiguille pour un nettoyage en profondeur et un éclat immédiat.'
      }
    ],
    'ventre-dos': [
      {
        title: 'Modelage Détox Ventre & Dos',
        slug: 'modelage-detox-ventre-dos',
        price: 170,
        duration: '60 min',
        desc: 'Soin de libération du diaphragme, dégonflement abdominal et délassement postural des lombaires.'
      }
    ],
    'cuisses-fesses': [
      {
        title: 'Sculpt Remodelant Cuisses & Fesses',
        slug: 'sculpt-remodelant-cuisses-fesses',
        price: 160,
        duration: '50 min',
        desc: 'Palper-rouler manuel vigoureux et drainage colombien pour lisser la cellulite et regalber les fessiers.'
      }
    ],
    'bras': [
      {
        title: 'Soin Raffermissant Bras & Décolleté',
        slug: 'soin-raffermissant-bras-decollete',
        price: 140,
        duration: '45 min',
        desc: 'Tonification ciblée des zones relâchées des triceps et lissage du décolleté.'
      }
    ],
    'cheveux': [
      {
        title: 'Rituel Détox & Vitalité Cuir Chevelu',
        slug: 'rituel-detox-vitalite-cuir-chevelu',
        price: 130,
        duration: '45 min',
        desc: 'Micro-stimulation par acupression et infusion vitaminée pour stimuler le bulbe capillaire.'
      }
    ],
    'epilation': [
      {
        title: 'Épilation Visage & Zones Sensibles',
        slug: 'epilation-visage-zones-sensibles',
        price: 50,
        duration: '30 min',
        desc: 'Cire tiède haute tolérance enrichie en azulène apaisante pour un respect total des peaux réactives.'
      }
    ]
  };

  const currentCategoryServices = allServices[activeCategory] || allServices['visage-cou'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          treatmentTitle: selectedService,
          treatmentSlug: selectedSlug,
          treatmentPrice: price,
          treatmentDuration: duration,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          bookingDate: bookingDate || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          bookingTime,
          notes
        })
      });
      const data = await res.json();
      if (data.success) {
        setReferenceNumber(data.data.referenceNumber);
        setStep(4);
      }
    } catch (err) {
      console.warn('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-2">
            32 AVENUE MATIGNON, 75008 PARIS
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-normal text-stone-900 uppercase tracking-[0.14em] mb-3">
            Prise de Rendez-vous en Ligne
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto font-light leading-relaxed">
            Sélectionnez votre protocole sur-mesure au Centre Ruth Niddam Paris dans le Triangle d&apos;Or.
          </p>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mt-4" />
        </div>

        {/* Wizard Card */}
        <div className="bg-white border border-stone-200/90 rounded-xs shadow-xl overflow-hidden">
          {/* Progress bar */}
          <div className="grid grid-cols-3 bg-[#FAF7F2] border-b border-stone-200 text-xs text-center font-medium">
            <div className={`py-3.5 border-r border-stone-200 ${step >= 1 ? 'text-stone-900 font-semibold bg-white' : 'text-stone-400'}`}>
              1. Choix du Soin
            </div>
            <div className={`py-3.5 border-r border-stone-200 ${step >= 2 ? 'text-stone-900 font-semibold bg-white' : 'text-stone-400'}`}>
              2. Date & Créneau
            </div>
            <div className={`py-3.5 ${step >= 3 ? 'text-stone-900 font-semibold bg-white' : 'text-stone-400'}`}>
              3. Vos Coordonnées
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {/* STEP 1: CATEGORY & TREATMENT CHOOSER */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg font-semibold text-stone-900 uppercase tracking-wider mb-3">
                    Zone & Catégorie de soin :
                  </h3>
                  {/* Category Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {categories.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setActiveCategory(c.id);
                          const firstInCat = allServices[c.id]?.[0];
                          if (firstInCat) {
                            setSelectedService(firstInCat.title);
                            setSelectedSlug(firstInCat.slug);
                            setPrice(firstInCat.price);
                            setDuration(firstInCat.duration);
                          }
                        }}
                        className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors ${
                          activeCategory === c.id
                            ? 'bg-stone-900 text-white'
                            : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-200'
                        }`}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading text-sm font-semibold text-stone-800 uppercase tracking-wider">
                    Protocoles disponibles :
                  </h4>
                  {currentCategoryServices.map((s) => (
                    <label
                      key={s.slug}
                      className={`block p-4 sm:p-5 border rounded-xs cursor-pointer transition-all ${
                        selectedSlug === s.slug
                          ? 'border-[#C8A882] bg-[#FAF7F2] shadow-xs ring-1 ring-[#C8A882]'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="treatment"
                            checked={selectedSlug === s.slug}
                            onChange={() => {
                              setSelectedService(s.title);
                              setSelectedSlug(s.slug);
                              setPrice(s.price);
                              setDuration(s.duration);
                            }}
                            className="mt-1 text-[#C8A882] focus:ring-[#C8A882]"
                          />
                          <div>
                            <span className="font-heading text-sm sm:text-base font-semibold text-stone-900 block">
                              {s.title}
                            </span>
                            <p className="text-xs text-stone-600 mt-1 font-light leading-relaxed">
                              {s.desc}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="font-heading text-base font-bold text-stone-900 block">
                            {s.price} €
                          </span>
                          <span className="text-[11px] text-stone-500 font-light flex items-center justify-end gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-[#C8A882]" />
                            {s.duration}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs flex items-center gap-2"
                  >
                    <span>Continuer : Date & Heure</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: DATE & TIME */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="p-4 bg-[#FAF7F2] border border-stone-200 rounded-xs flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-stone-500 block">Soin sélectionné :</span>
                    <strong className="text-stone-900 text-sm">{selectedService}</strong>
                  </div>
                  <span className="text-sm font-bold text-stone-900">{price} € • {duration}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                      Date souhaitée :
                    </label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 text-xs bg-[#FAF7F2] border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2">
                      Créneau horaire disponible :
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setBookingTime(time)}
                          className={`py-2.5 text-xs font-semibold rounded-xs border transition-colors ${
                            bookingTime === time
                              ? 'bg-stone-900 text-white border-stone-900'
                              : 'bg-white border-stone-200 text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-6 py-3 border border-stone-300 text-stone-700 hover:text-stone-900 text-xs uppercase tracking-wider rounded-xs flex items-center gap-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Retour</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs flex items-center gap-2"
                  >
                    <span>Continuer : Coordonnées</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT COORDINATES */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 bg-[#FAF7F2] border border-stone-200 rounded-xs flex items-center justify-between text-xs">
                  <div>
                    <span className="text-stone-500 block">Récapitulatif :</span>
                    <strong className="text-stone-900">{selectedService} ({duration})</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-500 block">Créneau choisi :</span>
                    <strong className="text-stone-900">{bookingDate || 'Prochain disponible'} à {bookingTime}</strong>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Nom et Prénom *
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        Téléphone *
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
                      Remarques ou besoins particuliers :
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      placeholder="Type de peau, sensibilités particulières, allergies..."
                      className="w-full px-4 py-3 text-xs bg-[#FAF7F2] border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-3 border border-stone-300 text-stone-700 hover:text-stone-900 text-xs uppercase tracking-wider rounded-xs flex items-center gap-2"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Retour</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs flex items-center gap-2 shadow-md"
                  >
                    <span>{isSubmitting ? 'Confirmation...' : 'Confirmer le Rendez-vous'}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#C8A882]" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: SUCCESS CONFIRMATION */}
            {step === 4 && (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl text-stone-900 uppercase tracking-wider font-semibold">
                  Votre demande est confirmée !
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-light">
                  Notre équipe de conciergerie du 32 Avenue Matignon vous a adressé un email de confirmation récapitulatif.
                </p>

                {referenceNumber && (
                  <div className="inline-block p-4 bg-[#FAF7F2] border border-stone-200 rounded-xs text-xs">
                    <span className="text-stone-500 block">Référence de réservation :</span>
                    <strong className="text-stone-900 font-mono text-sm">{referenceNumber}</strong>
                  </div>
                )}

                <div className="pt-6">
                  <Link
                    href={`/${resolvedLocale}`}
                    className="px-8 py-3.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold rounded-xs inline-block transition-colors"
                  >
                    Retour à l&apos;accueil
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
