'use client';

import React, { useState, useEffect } from 'react';
import { initialTreatments } from '@/lib/seed-data';
import { Plus, Edit2, Trash2, X, Globe, Clock } from 'lucide-react';

export default function AdminTreatmentsPage() {
  const [treatments, setTreatments] = useState<any[]>(initialTreatments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTreatment, setEditingTreatment] = useState<any | null>(null);
  const [langTab, setLangTab] = useState<'fr' | 'en' | 'es' | 'it' | 'pt'>('fr');

  const [formData, setFormData] = useState<any>({
    slug: '',
    category: 'visage-cou',
    categoryLabel: { fr: 'Visage & Cou', en: 'Face & Neck', es: 'Rostro y Cuello', it: 'Viso e Collo', pt: 'Rosto e Pescoço' },
    duration: '60 min',
    price: 190,
    images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
    title: { fr: '', en: '', es: '', it: '', pt: '' },
    description: { fr: '', en: '', es: '', it: '', pt: '' }
  });

  const loadTreatments = () => {
    fetch('/api/treatments')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setTreatments(data.data);
      })
      .catch(() => setTreatments(initialTreatments));
  };

  useEffect(() => {
    loadTreatments();
  }, []);

  const openCreateModal = () => {
    setEditingTreatment(null);
    setFormData({
      slug: `soin-${Date.now().toString().slice(-4)}`,
      category: 'visage-cou',
      categoryLabel: { fr: 'Visage & Cou', en: 'Face & Neck', es: 'Rostro y Cuello', it: 'Viso e Collo', pt: 'Rosto e Pescoço' },
      duration: '60 min',
      price: 190,
      images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
      title: { fr: '', en: '', es: '', it: '', pt: '' },
      description: { fr: '', en: '', es: '', it: '', pt: '' }
    });
    setLangTab('fr');
    setIsModalOpen(true);
  };

  const openEditModal = (t: any) => {
    setEditingTreatment(t);
    setFormData({
      slug: t.slug,
      category: t.category,
      categoryLabel: t.categoryLabel || { fr: 'Visage & Cou', en: 'Face & Neck', es: 'Rostro y Cuello', it: 'Viso e Collo', pt: 'Rosto e Pescoço' },
      duration: t.duration,
      price: t.price,
      images: t.images || ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'],
      title: { ...t.title },
      description: { ...t.description }
    });
    setLangTab('fr');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingTreatment ? `/api/treatments/${editingTreatment.slug}` : '/api/treatments';
      const method = editingTreatment ? 'PUT' : 'POST';
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setIsModalOpen(false);
      loadTreatments();
    } catch {
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Supprimer ce soin de la carte ?')) return;
    try {
      await fetch(`/api/treatments/${slug}`, { method: 'DELETE' });
      loadTreatments();
    } catch {
      setTreatments((prev) => prev.filter((t) => t.slug !== slug));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-stone-200/80 shadow-xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-1">
            Cabine Paris 8
          </span>
          <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
            Gestion des Soins & Traitements
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Gérez la carte des protocoles et les durées/tarifs au 32 Avenue Matignon.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs flex items-center gap-2 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Soin</span>
        </button>
      </div>

      <div className="bg-white border border-stone-200/80 rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] bg-[#FAF7F2]">
                <th className="py-3 px-4">Protocole</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Durée</th>
                <th className="py-3 px-4">Tarif</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {treatments.map((t) => (
                <tr key={t.slug} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xs overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img src={t.images?.[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">{t.title?.fr || t.slug}</p>
                        <p className="text-[11px] text-stone-400 font-mono">{t.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 font-medium">
                    {t.categoryLabel?.fr || t.category}
                  </td>
                  <td className="py-3.5 px-4 text-stone-700 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C8A882]" />
                    <span>{t.duration}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-stone-900">{t.price} €</td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(t)}
                        className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xs"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(t.slug)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xs"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-xs shadow-2xl border border-stone-200 overflow-hidden">
              <div className="px-6 py-4 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-serif-luxury text-xl font-semibold text-stone-900">
                  {editingTreatment ? 'Modifier le Soin' : 'Créer un Nouveau Soin'}
                </h3>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Slug *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Durée (min)
                    </label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                      Tarif (€) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xs"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-800 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C8A882]" />
                      Traductions Multilingues
                    </span>
                    <div className="flex border border-stone-200 rounded-xs overflow-hidden">
                      {(['fr', 'en', 'es', 'it', 'pt'] as const).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLangTab(l)}
                          className={`px-3 py-1 text-xs uppercase font-semibold ${
                            langTab === l ? 'bg-stone-900 text-white' : 'bg-white text-stone-600'
                          }`}
                        >
                          {l.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 bg-[#FAF7F2] p-4 rounded-xs border border-stone-200">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                        Titre du soin ({langTab.toUpperCase()}) *
                      </label>
                      <input
                        type="text"
                        required={langTab === 'fr'}
                        value={formData.title[langTab] || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: { ...formData.title, [langTab]: e.target.value }
                          })
                        }
                        className="w-full p-2 text-xs bg-white border border-stone-300 rounded-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-700 mb-1">
                        Description du soin ({langTab.toUpperCase()})
                      </label>
                      <textarea
                        rows={3}
                        value={formData.description[langTab] || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: { ...formData.description, [langTab]: e.target.value }
                          })
                        }
                        className="w-full p-2 text-xs bg-white border border-stone-300 rounded-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-200 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-xs uppercase tracking-wider text-stone-500"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-stone-900 text-white text-xs uppercase tracking-widest font-semibold rounded-xs"
                  >
                    Enregistrer le Soin
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
