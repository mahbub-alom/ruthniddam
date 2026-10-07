'use client';

import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Mail, Phone, FileText } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTreatment?: {
    slug: string;
    title: string;
    price: number;
    duration: string;
  } | null;
  treatmentsList?: any[];
}

export function BookingModal({
  isOpen,
  onClose,
  preselectedTreatment,
  treatmentsList = []
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>(
    preselectedTreatment?.title || 'Soin Kobido Signature Paris'
  );
  const [selectedSlug, setSelectedSlug] = useState<string>(
    preselectedTreatment?.slug || 'kobido-signature-ruth-niddam'
  );
  const [price, setPrice] = useState<number>(preselectedTreatment?.price || 190);
  const [duration, setDuration] = useState<string>(preselectedTreatment?.duration || '60 min');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('11:00');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState<string>('');

  if (!isOpen) return null;

  const availableTimes = [
    '10:00', '11:15', '12:30', '14:00', '15:30', '17:00', '18:15'
  ];

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
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-xl bg-[#FDFBF7] rounded-xs shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95">
          {/* Header */}
          <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A882] font-semibold block">
                32 Avenue Matignon, Paris 8
              </span>
              <h3 className="font-serif-luxury text-xl font-semibold text-stone-900">
                Réservation de Soin Haute Couture
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-800 rounded-full hover:bg-stone-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Stepper tracker */}
          <div className="px-6 py-2.5 bg-[#F6EFE6] border-b border-stone-200/80 flex items-center justify-between text-xs text-stone-600">
            <span className={step >= 1 ? 'font-semibold text-stone-900' : ''}>1. Protocole</span>
            <span>→</span>
            <span className={step >= 2 ? 'font-semibold text-stone-900' : ''}>2. Date & Heure</span>
            <span>→</span>
            <span className={step >= 3 ? 'font-semibold text-stone-900' : ''}>3. Coordonnées</span>
          </div>

          <div className="p-6">
            {step === 1 && (
              <div className="space-y-4">
                <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700">
                  Choisissez votre soin :
                </label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {[
                    { title: 'Soin Kobido Signature Paris', slug: 'kobido-signature-ruth-niddam', price: 190, duration: '60 min' },
                    { title: 'Jet Peel Esthétique Haute Performance', slug: 'jet-peel-esthetique-haute-performance', price: 240, duration: '75 min' },
                    { title: 'Modelage Détox Ventre & Dos', slug: 'massage-signature-ventre-et-dos', price: 170, duration: '60 min' },
                    { title: 'Sculpt Remodelant Cuisses & Fesses', slug: 'sculpt-remueur-cuisses-fesses', price: 160, duration: '50 min' },
                    { title: 'Rituel Détox Cuir Chevelu', slug: 'soin-reparateur-cuir-chevelu', price: 130, duration: '45 min' }
                  ].map((s) => (
                    <div
                      key={s.slug}
                      onClick={() => {
                        setSelectedService(s.title);
                        setSelectedSlug(s.slug);
                        setPrice(s.price);
                        setDuration(s.duration);
                      }}
                      className={`p-3.5 border rounded-xs cursor-pointer flex items-center justify-between transition-colors ${
                        selectedSlug === s.slug
                          ? 'border-[#C8A882] bg-white ring-1 ring-[#C8A882]'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-semibold text-stone-900">{s.title}</p>
                        <p className="text-xs text-stone-500">{s.duration} — Sur mesure</p>
                      </div>
                      <span className="text-sm font-bold text-[#A07A50]">{s.price} €</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C8A882] transition-colors rounded-xs"
                  >
                    Suivant : Date & Heure
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#C8A882]" />
                    Date souhaitée
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#C8A882]" />
                    Créneau horaire disponible
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {availableTimes.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setBookingTime(t)}
                        className={`py-2 text-xs font-medium rounded-xs border transition-colors ${
                          bookingTime === t
                            ? 'bg-[#C8A882] text-white border-[#C8A882]'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-stone-400'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900"
                  >
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C8A882] transition-colors rounded-xs"
                  >
                    Suivant : Coordonnées
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1 flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#C8A882]" />
                    Nom et Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ex. Éléonore de Montmirail"
                    className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#C8A882]" />
                      Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.fr"
                      className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1 flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-[#C8A882]" />
                      Téléphone portable *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="06 12 34 56 78"
                      className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#C8A882]" />
                    Demandes ou allergies éventuelles
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Précisez tout besoin particulier..."
                    className="w-full p-2.5 text-xs bg-white border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                  />
                </div>

                <div className="p-3 bg-[#FAF7F2] border border-stone-200/80 rounded-xs text-[11px] text-stone-600">
                  <p><strong>Récapitulatif :</strong> {selectedService} ({duration}) — {price} €</p>
                  <p>Date : {bookingDate || 'Prochain créneau'} à {bookingTime} au 32 Avenue Matignon</p>
                </div>

                <div className="pt-3 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C8A882] transition-colors rounded-xs shadow-sm"
                  >
                    {isSubmitting ? 'Transmission...' : 'Confirmer le Rendez-vous'}
                  </button>
                </div>
              </form>
            )}

            {step === 4 && (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 bg-emerald-50 rounded-full mx-auto flex items-center justify-center text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8 text-[#C8A882]" />
                </div>
                <h4 className="font-serif-luxury text-2xl font-semibold text-stone-900">
                  Votre Demande est Enregistrée
                </h4>
                <div className="p-4 bg-white border border-stone-200 rounded-xs inline-block text-left text-xs text-stone-700 space-y-1">
                  <p><strong>Numéro de dossier :</strong> <span className="font-mono text-stone-900">{referenceNumber}</span></p>
                  <p><strong>Soin réservé :</strong> {selectedService}</p>
                  <p><strong>Créneau :</strong> {bookingDate} à {bookingTime}</p>
                  <p><strong>Lieu :</strong> 32 Avenue Matignon, 75008 Paris</p>
                </div>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  La conciergerie Ruth Niddam vous adressera un SMS et un email de confirmation. À très bientôt pour votre parenthèse de beauté.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#C8A882] transition-colors rounded-xs"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
