'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Sparkles, 
  Gift, 
  Calendar, 
  Package, 
  Mail, 
  MessageSquare, 
  LogOut, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Skip layout on login page
  if (pathname === '/admin/login' || pathname.endsWith('/admin/login')) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
      router.push('/admin/login');
    } catch {
      router.push('/admin/login');
    }
  };

  const navItems = [
    { label: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
    { label: 'Produits & Cosmétiques', href: '/admin/products', icon: ShoppingBag },
    { label: 'Soins & Traitements', href: '/admin/treatments', icon: Sparkles },
    { label: 'Rituels Beauté (-15%)', href: '/admin/rituals', icon: Gift },
    { label: 'Réservations Cabine', href: '/admin/bookings', icon: Calendar },
    { label: 'Commandes Boutique', href: '/admin/orders', icon: Package },
    { label: 'Abonnés Newsletter', href: '/admin/subscribers', icon: Mail },
    { label: 'Messages & Contact', href: '/admin/messages', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F2] flex flex-col md:flex-row text-stone-900">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-[#1C1917] text-white shrink-0 hidden md:flex flex-col justify-between border-r border-stone-800">
        <div>
          {/* Brand header */}
          <div className="p-6 border-b border-stone-800">
            <span className="font-serif-luxury text-xl tracking-[0.2em] uppercase text-white block">
              Ruth Niddam
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#C8A882] block mt-0.5">
              Portail Conciergerie
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-medium rounded-xs transition-colors ${
                    isActive
                      ? 'bg-[#C8A882] text-stone-950 font-semibold shadow-xs'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-[#C8A882]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-stone-800 space-y-2 text-xs">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-2 text-stone-400 hover:text-white rounded-xs hover:bg-stone-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-[#C8A882]" />
            <span>Voir le site public</span>
          </a>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 text-rose-400 hover:text-rose-300 rounded-xs hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#1C1917] text-white p-4 flex items-center justify-between border-b border-stone-800">
        <div>
          <span className="font-serif-luxury text-lg tracking-widest uppercase">Ruth Niddam</span>
          <span className="text-[9px] uppercase tracking-wider text-[#C8A882] block">Admin</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-1.5 text-stone-300 hover:text-white"
        >
          {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-[#1C1917] text-white border-b border-stone-800 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2 text-xs font-medium rounded-xs ${
                  isActive ? 'bg-[#C8A882] text-stone-950 font-semibold' : 'text-stone-300'
                }`}
              >
                <Icon className="w-4 h-4 text-[#C8A882]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-4 border-t border-stone-800 flex justify-between text-xs">
            <a href="/" target="_blank" className="text-stone-400 flex items-center gap-1">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Voir le site</span>
            </a>
            <button onClick={handleLogout} className="text-rose-400 flex items-center gap-1">
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
