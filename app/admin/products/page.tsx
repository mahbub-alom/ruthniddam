'use client';

import React, { useState, useEffect } from 'react';
import { initialProducts } from '@/lib/seed-data';
import { Plus, Edit2, Trash2, X, Check, Globe } from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [langTab, setLangTab] = useState<'fr' | 'en' | 'es' | 'it' | 'pt'>('fr');

  // Form State
  const [formData, setFormData] = useState<any>({
    slug: '',
    price: 0,
    discountPrice: 0,
    category: 'Gamme Nude',
    range: 'nude',
    stockQuantity: 50,
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'],
    name: { fr: '', en: '', es: '', it: '', pt: '' },
    shortDescription: { fr: '', en: '', es: '', it: '', pt: '' },
    description: { fr: '', en: '', es: '', it: '', pt: '' },
    ingredients: { fr: '', en: '', es: '', it: '', pt: '' },
    usage: { fr: '', en: '', es: '', it: '', pt: '' }
  });

  const loadProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setProducts(data.data);
      })
      .catch(() => setProducts(initialProducts));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      slug: `produit-${Date.now().toString().slice(-4)}`,
      price: 95,
      discountPrice: 0,
      category: 'Gamme Nude',
      range: 'nude',
      stockQuantity: 30,
      images: ['https://images.unsplash.com/photo-1608248597359-5613532b3191?auto=format&fit=crop&w=800&q=80'],
      name: { fr: '', en: '', es: '', it: '', pt: '' },
      shortDescription: { fr: '', en: '', es: '', it: '', pt: '' },
      description: { fr: '', en: '', es: '', it: '', pt: '' },
      ingredients: { fr: '', en: '', es: '', it: '', pt: '' },
      usage: { fr: '', en: '', es: '', it: '', pt: '' }
    });
    setLangTab('fr');
    setIsModalOpen(true);
  };

  const openEditModal = (p: any) => {
    setEditingProduct(p);
    setFormData({
      slug: p.slug,
      price: p.price,
      discountPrice: p.discountPrice || 0,
      category: p.category || 'Gamme Nude',
      range: p.range || 'nude',
      stockQuantity: p.stockQuantity || 50,
      images: p.images || ['https://images.unsplash.com/photo-1608248597359-5613532b3191?auto=format&fit=crop&w=800&q=80'],
      name: { ...p.name },
      shortDescription: { ...p.shortDescription },
      description: { ...p.description },
      ingredients: { ...p.ingredients },
      usage: { ...p.usage }
    });
    setLangTab('fr');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct ? `/api/products/${editingProduct.slug}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        loadProducts();
      }
    } catch {
      // In-memory update fallback
      if (editingProduct) {
        setProducts((prev) => prev.map((p) => (p.slug === editingProduct.slug ? { ...p, ...formData } : p)));
      } else {
        setProducts((prev) => [formData, ...prev]);
      }
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return;
    try {
      await fetch(`/api/products/${slug}`, { method: 'DELETE' });
      loadProducts();
    } catch {
      setProducts((prev) => prev.filter((p) => p.slug !== slug));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xs border border-stone-200/80 shadow-xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-1">
            Boutique & Cosmétiques
          </span>
          <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
            Gestion du Catalogue Produits
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Gérez les prix, images, stocks et traductions en 5 langues (FR, EN, ES, IT, PT).
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs flex items-center gap-2 transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Produit</span>
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200/80 rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] bg-[#FAF7F2]">
                <th className="py-3 px-4">Produit</th>
                <th className="py-3 px-4">Catégorie</th>
                <th className="py-3 px-4">Prix Public</th>
                <th className="py-3 px-4">Prix Promo</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products.map((p) => (
                <tr key={p.slug} className="hover:bg-stone-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xs overflow-hidden bg-stone-100 shrink-0 border border-stone-200">
                        <img src={p.images?.[0]} alt="" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900">{p.name?.fr || p.slug}</p>
                        <p className="text-[11px] text-stone-400 font-mono">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 font-medium">{p.category}</td>
                  <td className="py-3.5 px-4 font-bold text-stone-900">{p.price?.toFixed(2)} €</td>
                  <td className="py-3.5 px-4 text-stone-500">
                    {p.discountPrice > 0 ? (
                      <span className="text-rose-600 font-bold">{p.discountPrice.toFixed(2)} €</span>
                    ) : (
                      '—'
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      p.inStock !== false ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {p.inStock !== false ? `${p.stockQuantity || 50} en stock` : 'Rupture'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(p)}
                        className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-xs transition-colors"
                        title="Modifier"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.slug)}
                        className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xs transition-colors"
                        title="Supprimer"
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

      {/* Multilingual Product Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />

          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative w-full max-w-3xl bg-white rounded-xs shadow-2xl border border-stone-200 overflow-hidden">
              <div className="px-6 py-4 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#A07A50] font-semibold block">
                    Catalogue Ruth Niddam
                  </span>
                  <h3 className="font-serif-luxury text-xl font-semibold text-stone-900">
                    {editingProduct ? 'Modifier le Produit' : 'Créer un Nouveau Produit'}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-6">
                {/* General Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                      Identifiant (Slug) *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xs focus:border-[#C8A882]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                      Catégorie
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xs focus:border-[#C8A882]"
                    >
                      <option value="Gua Sha">Gua Sha</option>
                      <option value="Gamme Nude">Gamme Nude</option>
                      <option value="Gamme Verte">Gamme Verte</option>
                      <option value="Gamme Or">Gamme Or 24K</option>
                      <option value="Coffrets">Coffrets</option>
                      <option value="Cartes Cadeaux">Cartes Cadeaux</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                      Prix (€) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xs focus:border-[#C8A882]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                      Prix Promo (€)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.discountPrice}
                      onChange={(e) => setFormData({ ...formData, discountPrice: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2 text-xs border border-stone-300 rounded-xs focus:border-[#C8A882]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-stone-600 mb-1 font-semibold">
                    URL de l&apos;Image principale
                  </label>
                  <input
                    type="url"
                    value={formData.images[0] || ''}
                    onChange={(e) => setFormData({ ...formData, images: [e.target.value] })}
                    className="w-full p-2 text-xs border border-stone-300 rounded-xs focus:border-[#C8A882]"
                  />
                </div>

                {/* Multilingual Translation Tabs */}
                <div className="pt-4 border-t border-stone-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-wider font-semibold text-stone-800 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-[#C8A882]" />
                      Traductions Multilingues
                    </span>
                    {/* Tabs */}
                    <div className="flex border border-stone-200 rounded-xs overflow-hidden">
                      {(['fr', 'en', 'es', 'it', 'pt'] as const).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setLangTab(l)}
                          className={`px-3 py-1 text-xs uppercase font-semibold transition-colors ${
                            langTab === l ? 'bg-[#1C1917] text-white' : 'bg-white text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {l.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 bg-[#FAF7F2] p-4 border border-stone-200 rounded-xs">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-700 mb-1 font-semibold">
                        Nom du produit ({langTab.toUpperCase()}) *
                      </label>
                      <input
                        type="text"
                        required={langTab === 'fr'}
                        value={formData.name[langTab] || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            name: { ...formData.name, [langTab]: e.target.value }
                          })
                        }
                        placeholder={`ex. Gua Sha My Jeaneth (${langTab})`}
                        className="w-full p-2 text-xs bg-white border border-stone-300 rounded-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-700 mb-1 font-semibold">
                        Description courte ({langTab.toUpperCase()})
                      </label>
                      <input
                        type="text"
                        value={formData.shortDescription[langTab] || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            shortDescription: { ...formData.shortDescription, [langTab]: e.target.value }
                          })
                        }
                        className="w-full p-2 text-xs bg-white border border-stone-300 rounded-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-stone-700 mb-1 font-semibold">
                        Description détaillée ({langTab.toUpperCase()})
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
                    className="px-4 py-2 text-xs uppercase tracking-wider text-stone-500 hover:text-stone-800"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-stone-900 hover:bg-[#C8A882] text-white text-xs uppercase tracking-widest font-semibold rounded-xs shadow-xs transition-colors"
                  >
                    Enregistrer le Produit
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
