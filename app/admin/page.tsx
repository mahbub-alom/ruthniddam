'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShoppingBag, 
  Calendar, 
  Package, 
  DollarSign, 
  Mail, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Sparkles,
  ArrowRight,
  Database
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<any>({
    totalProducts: 7,
    totalBookings: 4,
    pendingBookings: 2,
    totalOrders: 12,
    totalRevenue: 2840,
    totalSubscribers: 86,
    unreadMessages: 3
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
        if (data.recentBookings) setRecentBookings(data.recentBookings);
        if (data.recentOrders) setRecentOrders(data.recentOrders);
      })
      .catch((err) => console.warn(err));
  }, []);

  const handleSeedDB = async () => {
    setSeeding(true);
    setSeedSuccess(false);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSeedSuccess(true);
        setTimeout(() => setSeedSuccess(false), 5000);
      }
    } catch (e) {
      console.warn(e);
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-xs border border-stone-200/80 shadow-xs">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-1">
            Tableau de Bord
          </span>
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-light text-stone-900">
            Conciergerie Ruth Niddam Paris
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Bienvenue dans votre centre de gestion des soins, commandes et réservations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSeedDB}
            disabled={seeding}
            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-xs border border-stone-300 flex items-center gap-2 transition-colors"
          >
            <Database className="w-3.5 h-3.5 text-[#C8A882]" />
            <span>{seeding ? 'Initialisation...' : 'Synchroniser Données (Seed)'}</span>
          </button>
        </div>
      </div>

      {seedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs flex items-center gap-2">
          <span>✨</span>
          <span>Base de données Ruth Niddam initialisée et synchronisée avec succès !</span>
        </div>
      )}

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-6 border border-stone-200/80 rounded-xs shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Chiffre d&apos;Affaires</span>
            <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xs">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-serif-luxury font-bold text-stone-900">
            {stats.totalRevenue ? stats.totalRevenue.toFixed(2) : '2,840.00'} €
          </p>
          <p className="text-[11px] text-stone-400 mt-1">Boutique & Soins confirmés</p>
        </div>

        <div className="bg-white p-6 border border-stone-200/80 rounded-xs shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Réservations Cabine</span>
            <span className="p-2 bg-amber-50 text-amber-700 rounded-xs">
              <Calendar className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-serif-luxury font-bold text-stone-900">
            {stats.totalBookings}
          </p>
          <p className="text-[11px] text-amber-700 font-medium mt-1">
            {stats.pendingBookings} en attente de confirmation
          </p>
        </div>

        <div className="bg-white p-6 border border-stone-200/80 rounded-xs shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Commandes Boutique</span>
            <span className="p-2 bg-stone-100 text-stone-700 rounded-xs">
              <Package className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-serif-luxury font-bold text-stone-900">
            {stats.totalOrders}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">Expédiées sous 24h</p>
        </div>

        <div className="bg-white p-6 border border-stone-200/80 rounded-xs shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-stone-400">Catalogue Produits</span>
            <span className="p-2 bg-amber-50 text-[#C8A882] rounded-xs">
              <ShoppingBag className="w-4 h-4" />
            </span>
          </div>
          <p className="text-2xl font-serif-luxury font-bold text-stone-900">
            {stats.totalProducts}
          </p>
          <p className="text-[11px] text-stone-400 mt-1">{stats.totalSubscribers} abonnés newsletter</p>
        </div>
      </div>

      {/* Two columns: Recent Bookings & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Bookings Table */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 border border-stone-200/80 rounded-xs shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif-luxury text-xl font-semibold text-stone-900">
              Dernières Demandes de Réservation
            </h2>
            <Link
              href="/admin/bookings"
              className="text-xs uppercase tracking-wider font-semibold text-[#A07A50] hover:text-stone-950 flex items-center gap-1"
            >
              <span>Voir tout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3">Client</th>
                  <th className="pb-3">Soin</th>
                  <th className="pb-3">Date & Heure</th>
                  <th className="pb-3">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-stone-400">
                      Aucune nouvelle réservation en attente.
                    </td>
                  </tr>
                ) : (
                  recentBookings.map((b: any) => (
                    <tr key={b._id || b.referenceNumber}>
                      <td className="py-3.5 font-medium text-stone-900">
                        {b.customerName}
                        <span className="block text-[11px] text-stone-400">{b.customerPhone}</span>
                      </td>
                      <td className="py-3.5 text-stone-700">{b.treatmentTitle}</td>
                      <td className="py-3.5 text-stone-600">
                        {b.bookingDate} à {b.bookingTime}
                      </td>
                      <td className="py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-semibold ${
                          b.status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status === 'confirmed' ? 'Confirmé' : b.status === 'cancelled' ? 'Annulé' : 'En attente'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Quick shortcuts */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-6 border border-stone-200/80 rounded-xs shadow-xs">
            <h3 className="font-serif-luxury text-lg font-semibold text-stone-900 mb-4">
              Raccourcis de Gestion
            </h3>
            <div className="space-y-2.5">
              <Link
                href="/admin/products"
                className="w-full p-3 bg-[#FAF7F2] hover:bg-[#F6EFE6] border border-stone-200 rounded-xs flex items-center justify-between text-xs text-stone-800 font-medium transition-colors"
              >
                <span>Gérer les cosmétiques & Gua Sha</span>
                <ArrowRight className="w-4 h-4 text-[#C8A882]" />
              </Link>
              <Link
                href="/admin/treatments"
                className="w-full p-3 bg-[#FAF7F2] hover:bg-[#F6EFE6] border border-stone-200 rounded-xs flex items-center justify-between text-xs text-stone-800 font-medium transition-colors"
              >
                <span>Gérer les soins en cabine</span>
                <ArrowRight className="w-4 h-4 text-[#C8A882]" />
              </Link>
              <Link
                href="/admin/rituals"
                className="w-full p-3 bg-[#FAF7F2] hover:bg-[#F6EFE6] border border-stone-200 rounded-xs flex items-center justify-between text-xs text-stone-800 font-medium transition-colors"
              >
                <span>Gérer les Rituels Beauté (-15%)</span>
                <ArrowRight className="w-4 h-4 text-[#C8A882]" />
              </Link>
              <Link
                href="/admin/orders"
                className="w-full p-3 bg-[#FAF7F2] hover:bg-[#F6EFE6] border border-stone-200 rounded-xs flex items-center justify-between text-xs text-stone-800 font-medium transition-colors"
              >
                <span>Suivre les commandes e-commerce</span>
                <ArrowRight className="w-4 h-4 text-[#C8A882]" />
              </Link>
            </div>
          </div>

          <div className="p-6 bg-[#1C1917] text-white rounded-xs border border-stone-800">
            <span className="text-[10px] uppercase tracking-widest text-[#C8A882] block mb-1 font-semibold">
              Boutique & Institut
            </span>
            <p className="font-serif-luxury text-xl mb-2">32 Avenue Matignon</p>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Téléphone : 01 40 73 10 10<br />
              Email : contact@ruthniddam.fr
            </p>
            <a
              href="/"
              target="_blank"
              className="text-xs text-[#DFBE99] hover:underline"
            >
              Prévisualiser la vitrine →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
