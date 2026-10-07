'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, Navigation } from 'lucide-react';

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message })
      });
      setStatus('success');
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-2">
            TRIANGLE D&apos;OR • PARIS 8ÈME
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-normal text-stone-900 uppercase tracking-[0.14em] mb-4">
            Contactez le Centre Ruth Niddam
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl mx-auto font-light">
            Notre conciergerie et nos facialistes sont à votre disposition pour vous conseiller et organiser vos rendez-vous personnalisés.
          </p>
          <div className="w-16 h-0.5 bg-[#C8A882] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 border border-stone-200/80 rounded-xs shadow-xs space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
                  ADRESSE DU CENTRE
                </span>
                <p className="flex items-start gap-3 text-sm text-stone-800">
                  <MapPin className="w-4 h-4 text-[#C8A882] shrink-0 mt-1" />
                  <span>
                    <strong className="font-heading uppercase tracking-wide">32 Avenue Matignon</strong><br />
                    75008 Paris (Triangle d&apos;Or)
                  </span>
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
                  ACCÈS & TRANSPORTS
                </span>
                <div className="space-y-1.5 text-xs text-stone-600 font-light">
                  <p className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-[#C8A882]" />
                    <span><strong>Métro Ligne 1 & 9 :</strong> Franklin D. Roosevelt</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-[#C8A882]" />
                    <span><strong>Métro Ligne 9 & 13 :</strong> Miromesnil</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Navigation className="w-3.5 h-3.5 text-[#C8A882]" />
                    <span><strong>Parking public :</strong> Rond-Point des Champs-Élysées / Matignon</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
                  TÉLÉPHONE & CONCIERGERIE
                </span>
                <p className="flex items-center gap-3 text-sm text-stone-800">
                  <Phone className="w-4 h-4 text-[#C8A882] shrink-0" />
                  <a href="tel:0140731010" className="hover:text-[#A07A50] font-medium">
                    +33 (0)1 40 73 10 10
                  </a>
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
                  EMAIL OFFICIEL
                </span>
                <p className="flex items-center gap-3 text-sm text-stone-800">
                  <Mail className="w-4 h-4 text-[#C8A882] shrink-0" />
                  <a href="mailto:contact@ruthniddam.fr" className="hover:text-[#A07A50]">
                    contact@ruthniddam.fr
                  </a>
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
                  HORAIRES D&apos;OUVERTURE
                </span>
                <p className="flex items-start gap-3 text-xs text-stone-700">
                  <Clock className="w-4 h-4 text-[#C8A882] shrink-0 mt-0.5" />
                  <span>
                    Du Lundi au Samedi : 09h00 - 19h30<br />
                    Dimanche : Fermé (séances privées sur demande)
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 sm:p-10 border border-stone-200/80 rounded-xs shadow-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A07A50] block mb-2">
                FORMULAIRE DE CONTACT
              </span>
              <h2 className="font-heading text-xl sm:text-2xl font-semibold text-stone-900 uppercase tracking-wider mb-6">
                Envoyez-nous un Message
              </h2>

              {status === 'success' ? (
                <div className="p-6 bg-[#FAF7F2] border border-[#C8A882] rounded-xs text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-[#C8A882] mx-auto" />
                  <h3 className="font-heading text-lg font-semibold text-stone-900">Message envoyé</h3>
                  <p className="text-xs text-stone-600 font-light">
                    Merci pour votre message. Notre conciergerie vous répondra dans les meilleurs délais.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                        Nom et Prénom *
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Votre nom"
                        className="w-full px-4 py-3 text-xs bg-[#FAF7F2] border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                        Numéro de Téléphone
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
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
                      Objet de votre demande *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      placeholder="Réservation, conseil produit, formation..."
                      className="w-full px-4 py-3 text-xs bg-[#FAF7F2] border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Votre Message *
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      placeholder="Écrivez-nous votre message..."
                      className="w-full px-4 py-3 text-xs bg-[#FAF7F2] border border-stone-300 rounded-xs focus:outline-hidden focus:border-[#C8A882]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold transition-colors rounded-xs shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#C8A882]" />
                    <span>{status === 'loading' ? 'Envoi...' : 'Envoyer le Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
