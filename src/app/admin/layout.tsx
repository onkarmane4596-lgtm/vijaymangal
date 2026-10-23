'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Repeat,
  Stethoscope,
  FileText,
  CalendarDays,
  CalendarCheck,
  MessageSquare,
  BarChart3,
  UserCog,
  Settings,
  ShieldAlert,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell,
  Clock,
} from 'lucide-react';
import { db } from '@/lib/db';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    name: string;
    role: string;
    email: string;
  }>({
    name: 'Dr. Supriya Shreeprasad Kadam',
    role: 'owner',
    email: 'dr.supriya@vijaymangal.com',
  });

  const metrics = db.getDashboardMetrics();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('vma_auth_user');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.name) setCurrentUser(parsed);
        } catch {
          // ignore
        }
      }
    }
  }, []);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('vma_auth_user');
    }
    router.push('/login');
  };

  const navLinks = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Patients Directory', href: '/admin/patients', icon: Users, badge: metrics.totalPatients },
    { label: 'Treatment Courses', href: '/admin/courses', icon: Repeat, badge: metrics.activeCourses },
    { label: 'Monthly Visits', href: '/admin/visits', icon: Stethoscope },
    { label: 'Prescriptions', href: '/admin/prescriptions', icon: FileText },
    {
      label: 'Follow-up Calendar',
      href: '/admin/follow-ups',
      icon: CalendarDays,
      badge: metrics.followUpsDueToday,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      label: 'Appointments',
      href: '/admin/appointments',
      icon: CalendarCheck,
      badge: metrics.pendingAppointments,
      badgeColor: 'bg-emerald-600 text-white',
    },
    { label: 'WhatsApp Center', href: '/admin/communications', icon: MessageSquare },
    { label: 'Reports & Analytics', href: '/admin/reports', icon: BarChart3 },
    { label: 'Staff Management', href: '/admin/staff', icon: UserCog },
    { label: 'Clinic Settings', href: '/admin/settings', icon: Settings },
    { label: 'Audit Log', href: '/admin/audit-log', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8faf9] text-[#262820]">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-[#183d2b] text-[#f7f4ea] shrink-0 border-r border-[#122e20]">
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-[#d99136] shrink-0">
            <Image
              src="/images/logo.jpg"
              alt="Vijaymangal Ayurved"
              fill
              className="object-cover"
            />
          </div>
          <div className="overflow-hidden">
            <h2 className="font-bold text-sm text-white truncate">
              Vijaymangal Ayurved
            </h2>
            <p className="text-[11px] text-[#d99136] truncate">
              Clinic Management
            </p>
          </div>
        </div>

        {/* User Card */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between">
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">
              {currentUser.name}
            </div>
            <div className="text-[10px] text-white/60 capitalize">
              Role: {currentUser.role}
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Online" />
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#5b8e46] text-white shadow-xs font-semibold'
                    : 'text-[#f7f4ea]/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      item.badgeColor || 'bg-white/20 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-[#f7f4ea]/70 hover:text-white transition-colors py-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Public Website (मराठी)</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 text-xs text-red-300 hover:text-red-200 transition-colors py-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-[#e6dfd3] flex items-center justify-between px-4 sm:px-6 lg:px-8 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="lg:hidden p-2 text-[#262820] rounded-md hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-[#6b7280]">
              <Clock className="w-3.5 h-3.5 text-[#5b8e46]" />
              <span className="font-mono">
                Atpadi, Maharashtra (Asia/Kolkata GMT+5:30)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/appointments"
              className="relative p-2 text-[#6b7280] hover:text-[#183d2b] transition-colors"
              title="Appointments"
            >
              <Bell className="w-4 h-4" />
              {metrics.pendingAppointments > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
              )}
            </Link>

            <Link
              href="/admin/patients/new"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6517a3] text-white text-xs font-semibold hover:bg-[#490f77] transition-all shadow-2xs"
            >
              <span>+ New Patient</span>
            </Link>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-[#183d2b] text-white p-4 border-b border-black/30 space-y-2">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-sm">Navigation Menu</span>
              <button onClick={() => setMobileNavOpen(false)}>
                <X className="w-5 h-5 text-white/70" />
              </button>
            </div>
            <nav className="grid grid-cols-2 gap-1 text-xs">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
