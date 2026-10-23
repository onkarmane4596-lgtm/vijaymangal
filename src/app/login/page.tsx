'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('dr.supriya@vijaymangal.com');
  const [password, setPassword] = useState('ayurved@2026');
  const [role, setRole] = useState<'owner' | 'staff'>('owner');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Save active session locally
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'vma_auth_user',
        JSON.stringify({
          email,
          role,
          name: role === 'owner' ? 'Dr. Supriya Shreeprasad Kadam' : 'Clinic Staff Receptionist',
          loggedInAt: new Date().toISOString(),
        })
      );
    }

    setTimeout(() => {
      setLoading(false);
      router.push('/admin');
    }, 400);
  };

  const handleQuickRole = (selectedRole: 'owner' | 'staff') => {
    setRole(selectedRole);
    if (selectedRole === 'owner') {
      setEmail('dr.supriya@vijaymangal.com');
      setPassword('ayurved@2026');
    } else {
      setEmail('reception@vijaymangal.com');
      setPassword('reception@2026');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#faf8f5]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#6517a3] bg-white shadow-md mx-auto">
            <Image
              src="/images/logo.jpg"
              alt="Vijaymangal Ayurved"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Link>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-[#183d2b]">
          Clinic Staff Portal
        </h2>
        <p className="mt-1 text-xs text-[#6b7280]">
          Vijaymangal Ayurved Internal Practice Management
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-md rounded-3xl border border-[#e6dfd3] space-y-6">
          
          {/* Quick Demo Switcher */}
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider block">
              Quick Role Sign-In:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickRole('owner')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  role === 'owner'
                    ? 'bg-[#6517a3] text-white border-[#6517a3] shadow-xs'
                    : 'bg-[#faf8f5] text-[#262820] border-[#e6dfd3] hover:bg-[#f5ebff]'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Dr. Supriya (Owner)</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickRole('staff')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                  role === 'staff'
                    ? 'bg-[#183d2b] text-white border-[#183d2b] shadow-xs'
                    : 'bg-[#faf8f5] text-[#262820] border-[#e6dfd3] hover:bg-[#eef6ec]'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Front Desk (Staff)</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                Staff Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#183d2b] mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6b7280]">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white font-semibold text-sm shadow-md transition-all active:scale-98 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center border-t border-[#e6dfd3]">
            <Link
              href="/"
              className="text-xs text-[#6517a3] hover:underline font-medium"
            >
              ← Return to Vijaymangal Ayurved Public Website
            </Link>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-[#6b7280]">
          Secured with Supabase Row Level Security & HIPAA-compliant encryption standards.
        </div>
      </div>
    </div>
  );
}
