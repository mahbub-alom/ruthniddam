'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Clock, User } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setMessages(data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xs border border-stone-200/80 shadow-xs">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-1">
          Conciergerie & Accueil
        </span>
        <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
          Messages & Demandes de Renseignements
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Messages reçus via le formulaire de contact du 32 Avenue Matignon.
        </p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-white p-12 text-center border border-stone-200 rounded-xs text-stone-400 text-xs">
            Aucun nouveau message reçu.
          </div>
        ) : (
          messages.map((m, idx) => (
            <div
              key={idx}
              className="bg-white p-6 border border-stone-200/80 rounded-xs shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#A07A50] flex items-center justify-center font-bold text-xs">
                    {m.name?.charAt(0) || 'C'}
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 text-xs sm:text-sm">{m.name}</h3>
                    <div className="flex items-center gap-3 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-stone-400" />
                        {m.email}
                      </span>
                      {m.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-stone-400" />
                          {m.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-semibold px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-700">
                    {m.subject || 'Demande de contact'}
                  </span>
                </div>
              </div>

              <div className="text-xs text-stone-700 leading-relaxed bg-[#FAF7F2] p-3.5 rounded-xs font-light">
                {m.message}
              </div>

              <div className="flex justify-end pt-1">
                <a
                  href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || 'Votre demande Ruth Niddam')}`}
                  className="px-4 py-2 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-wider font-semibold rounded-xs transition-colors"
                >
                  Répondre par email
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
