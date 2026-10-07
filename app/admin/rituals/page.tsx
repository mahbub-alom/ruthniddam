'use client';

import React, { useState, useEffect } from 'react';
import { initialRituals } from '@/lib/seed-data';
import { Plus, Edit2, Trash2, X, Sparkles, Gift } from 'lucide-react';

export default function AdminRitualsPage() {
  const [rituals, setRituals] = useState<any[]>(initialRituals);

  const loadRituals = () => {
    fetch('/api/rituals')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setRituals(data.data);
      })
      .catch(() => setRituals(initialRituals));
  };

  useEffect(() => {
    loadRituals();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-stone-200/80 shadow-xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-1">
            Offre Privilège
          </span>
          <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
            Gestion des Rituels Beauté (-15%)
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Gérez les coffrets alliant soins en cabine et cosmétiques avec remise promotionnelle.
          </p>
        </div>
      </div>

      <div className="bg-white border border-stone-200/80 rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] bg-[#FAF7F2]">
                <th className="py-3 px-4">Rituel</th>
                <th className="py-3 px-4">Prix Normal</th>
                <th className="py-3 px-4">Prix Remisé (-15%)</th>
                <th className="py-3 px-4">Économie Client</th>
                <th className="py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {rituals.map((r) => (
                <tr key={r.slug} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-stone-900">
                    {r.title?.fr || r.slug}
                    <span className="block text-[11px] text-stone-400 font-normal font-mono">{r.slug}</span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-500 line-through">
                    {r.originalPrice?.toFixed(2)} €
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-900 text-sm">
                    {r.discountPrice?.toFixed(2)} €
                  </td>
                  <td className="py-3.5 px-4 text-emerald-700 font-semibold">
                    -{(r.originalPrice - r.discountPrice).toFixed(2)} €
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                      Actif en vitrine
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
