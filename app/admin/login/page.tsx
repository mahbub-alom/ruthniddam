'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@ruthniddam.fr');
  const [password, setPassword] = useState('RuthNiddam2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Identifiants invalides');
        setLoading(false);
        return;
      }

      router.push('/admin');
    } catch {
      setError('Erreur de communication avec le serveur');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1C1917] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#23201D] border border-stone-800 rounded-xs shadow-2xl p-8 sm:p-10 text-white">
        <div className="text-center mb-8">
          <span className="font-serif-luxury text-2xl tracking-[0.25em] uppercase text-white block">
            Ruth Niddam
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C8A882] block mt-1">
            Portail d&apos;Administration Sécurisé
          </span>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs rounded-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#C8A882]" />
              Adresse Email Admin
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-3 text-xs bg-stone-900 border border-stone-700 rounded-xs text-white focus:outline-hidden focus:border-[#C8A882]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-stone-400 mb-2 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#C8A882]" />
              Mot de passe
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-3 text-xs bg-stone-900 border border-stone-700 rounded-xs text-white focus:outline-hidden focus:border-[#C8A882]"
            />
          </div>

          <div className="p-3 bg-stone-900/60 border border-stone-800 rounded-xs text-[11px] text-stone-400">
            <p className="flex items-center gap-1.5 text-[#DFBE99] font-medium mb-0.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Accès Démonstration Initial :
            </p>
            <p>Email : <code className="text-stone-300">admin@ruthniddam.fr</code></p>
            <p>Mot de passe : <code className="text-stone-300">RuthNiddam2026!</code></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#C8A882] hover:bg-white text-stone-950 font-semibold text-xs uppercase tracking-widest transition-colors rounded-xs shadow-md flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Connexion en cours...' : 'Se connecter au Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-800/80 text-center">
          <a
            href="/"
            className="text-[11px] uppercase tracking-wider text-stone-500 hover:text-stone-300 transition-colors"
          >
            ← Retour au site public
          </a>
        </div>
      </div>
    </div>
  );
}
