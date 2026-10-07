'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Download, UserCheck } from 'lucide-react';

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/newsletter')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setSubscribers(data.data);
      })
      .catch(() => {});
  }, []);

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,Email,Langue,Date\n' +
      subscribers
        .map((s) => `${s.email},${s.locale || 'fr'},${s.createdAt || ''}`)
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'abonnes_ruth_niddam.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-stone-200/80 shadow-xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-1">
            Communication & Privilège
          </span>
          <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
            Abonnés à la Lettre Confidentielle
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            {subscribers.length} membres inscrits pour recevoir les invitations exclusives.
          </p>
        </div>

        <button
          type="button"
          onClick={handleExportCSV}
          className="px-4 py-2 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-wider font-semibold rounded-xs shadow-xs flex items-center gap-2 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Exporter CSV</span>
        </button>
      </div>

      <div className="bg-white border border-stone-200/80 rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] bg-[#FAF7F2]">
                <th className="py-3 px-4">Adresse Email</th>
                <th className="py-3 px-4">Langue</th>
                <th className="py-3 px-4">Date d&apos;inscription</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-8 text-center text-stone-400">
                    Aucun abonné enregistré.
                  </td>
                </tr>
              ) : (
                subscribers.map((s, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4 font-medium text-stone-900 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#C8A882]" />
                      <span>{s.email}</span>
                    </td>
                    <td className="py-3.5 px-4 uppercase text-stone-600 font-semibold text-[11px]">
                      {s.locale || 'fr'}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500">
                      {s.createdAt ? new Date(s.createdAt).toLocaleDateString('fr-FR') : 'Aujourd&apos;hui'}
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
