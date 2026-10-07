'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle, Phone, Mail, Trash2 } from 'lucide-react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBookings = () => {
    setLoading(true);
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setBookings(data.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      loadBookings();
    } catch {
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette demande de réservation ?')) return;
    try {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      loadBookings();
    } catch {
      setBookings((prev) => prev.filter((b) => b._id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xs border border-stone-200/80 shadow-xs">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-1">
          Conciergerie Paris 8
        </span>
        <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
          Gestion des Réservations Cabine
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Confirmez les séances et gérez les créneaux au 32 Avenue Matignon.
        </p>
      </div>

      <div className="bg-white border border-stone-200/80 rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] bg-[#FAF7F2]">
                <th className="py-3 px-4">Dossier</th>
                <th className="py-3 px-4">Patiente / Client</th>
                <th className="py-3 px-4">Soin Réservé</th>
                <th className="py-3 px-4">Créneau</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    Aucune réservation enregistrée pour le moment.
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b._id || b.referenceNumber} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-stone-900">
                      {b.referenceNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-stone-900">{b.customerName}</p>
                      <p className="text-[11px] text-stone-500 flex items-center gap-1">
                        <Mail className="w-3 h-3 text-stone-400" />
                        {b.customerEmail}
                      </p>
                      {b.customerPhone && (
                        <p className="text-[11px] text-stone-500 flex items-center gap-1">
                          <Phone className="w-3 h-3 text-stone-400" />
                          {b.customerPhone}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-medium text-stone-900 block">{b.treatmentTitle}</span>
                      <span className="text-[11px] text-stone-500">{b.treatmentDuration} — {b.treatmentPrice} €</span>
                      {b.notes && (
                        <p className="text-[11px] text-amber-800 italic mt-1 bg-amber-50 p-1 rounded-xs">
                          Note : {b.notes}
                        </p>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-stone-800">
                      {b.bookingDate} à {b.bookingTime}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={b.status || 'pending'}
                        onChange={(e) => handleUpdateStatus(b._id, e.target.value)}
                        className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full border ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : b.status === 'completed'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : b.status === 'cancelled'
                            ? 'bg-rose-50 text-rose-800 border-rose-300'
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}
                      >
                        <option value="pending">En attente</option>
                        <option value="confirmed">Confirmé</option>
                        <option value="completed">Effectué</option>
                        <option value="cancelled">Annulé</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(b._id)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 rounded-xs transition-colors"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
