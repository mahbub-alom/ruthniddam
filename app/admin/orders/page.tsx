'use client';

import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, Clock, Mail, MapPin } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.data) setOrders(data.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xs border border-stone-200/80 shadow-xs">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#A07A50] font-semibold block mb-1">
          Boutique E-commerce
        </span>
        <h1 className="font-serif-luxury text-2xl font-light text-stone-900">
          Suivi des Commandes
        </h1>
        <p className="text-xs text-stone-500 mt-1">
          Consultez les colis à préparer et les adresses de livraison des clientes.
        </p>
      </div>

      <div className="bg-white border border-stone-200/80 rounded-xs shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-stone-200 text-stone-400 uppercase tracking-wider text-[10px] bg-[#FAF7F2]">
                <th className="py-3 px-4">Commande</th>
                <th className="py-3 px-4">Destinataire</th>
                <th className="py-3 px-4">Adresse de Livraison</th>
                <th className="py-3 px-4">Articles</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-stone-400">
                    Aucune commande boutique pour l&apos;instant.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o._id || o.orderNumber} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-semibold text-stone-900">
                      {o.orderNumber}
                      <span className="block text-[11px] text-stone-400 font-normal">
                        {new Date(o.createdAt || Date.now()).toLocaleDateString('fr-FR')}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-stone-900">
                        {o.customer?.firstName} {o.customer?.lastName}
                      </p>
                      <p className="text-[11px] text-stone-500">{o.customer?.email}</p>
                      <p className="text-[11px] text-stone-500">{o.customer?.phone}</p>
                    </td>
                    <td className="py-3.5 px-4 text-stone-700">
                      <p>{o.customer?.address}</p>
                      <p className="text-[11px] text-stone-500">
                        {o.customer?.postalCode} {o.customer?.city}, {o.customer?.country}
                      </p>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="space-y-1">
                        {o.items?.map((item: any, i: number) => (
                          <p key={i} className="text-stone-800">
                            <strong>{item.quantity}x</strong> {item.name}{' '}
                            {item.variation ? <span className="text-stone-400">({item.variation})</span> : ''}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-serif-luxury font-bold text-stone-900 text-sm">
                      {o.total?.toFixed(2)} €
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Payée / En préparation
                      </span>
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
