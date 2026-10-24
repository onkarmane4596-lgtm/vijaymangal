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
  Activity,
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

  const primaryNavLinks = [
    {
      label: "Today's Clinic Desk",
      sublabel: 'Live OPD Queue & Reminders',
      href: '/admin',
      icon: Activity,
      badge: metrics.opdWaiting + metrics.followUpsDueToday,
      badgeColor: 'bg-emerald-500 text-white',
    },
    {
      label: 'Patients & Records',
      sublabel: 'Patient Directory, History & Rx',
      href: '/admin/patients',
      icon: Users,
      badge: metrics.totalPatients,
      badgeColor: 'bg-white/20 text-white',
    },
    {
      label: 'Treatment Courses',
      sublabel: '1-Mo & 4-Mo Programs & Fees',
      href: '/admin/courses',
      icon: Repeat,
      badge: metrics.activeCourses,
      badgeColor: 'bg-[#d99136] text-black',
    },
    {
      label: 'Clinic Settings & Team',
      sublabel: 'Timings, Staff & Analytics',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

  const secondaryNavLinks = [
    { label: 'Prescriptions', href: '/admin/prescriptions', icon: FileText },
    { label: 'Visits Log', href: '/admin/visits', icon: Stethoscope },
    {
      label: 'All Appointments',
      href: '/admin/appointments',
      icon: CalendarCheck,
      badge: metrics.pendingAppointments,
    },
    {
      label: 'Follow-ups Calendar',
      href: '/admin/follow-ups',
      icon: CalendarDays,
      badge: metrics.followUpsDueToday,
    },
    { label: 'Staff Accounts', href: '/admin/staff', icon: UserCog },
    { label: 'Reports & Revenue', href: '/admin/reports', icon: BarChart3 },
    { label: 'Audit Trail', href: '/admin/audit-log', icon: ShieldAlert },
  ];

  return (
    <div className="min-h-screen flex bg-[#f8faf9] text-[#262820]">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-72 bg-[#183d2b] text-[#f7f4ea] shrink-0 border-r border-[#122e20]">
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
              Small Clinic Automation
            </p>
          </div>
        </div>

        {/* User Card */}
        <div className="p-3.5 mx-3 my-3 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between">
          <div className="overflow-hidden">
            <div className="text-xs font-semibold text-white truncate">
              {currentUser.name}
            </div>
            <div className="text-[10px] text-white/60 capitalize">
              Role: {currentUser.role} • Active
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20" title="Online" />
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-2 space-y-4 overflow-y-auto">
          {/* Main 4 Practical Modules */}
          <div>
            <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-white/50">
              Primary Clinic Work
            </div>
            <div className="space-y-1">
              {primaryNavLinks.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === '/admin'
                    ? pathname === '/admin'
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#5b8e46] text-white shadow-sm ring-1 ring-white/20'
                        : 'text-[#f7f4ea]/85 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`p-2 rounded-lg ${
                          isActive ? 'bg-white/20' : 'bg-black/20'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold truncate">
                          {item.label}
                        </div>
                        <div
                          className={`text-[10px] truncate ${
                            isActive ? 'text-white/80' : 'text-white/50'
                          }`}
                        >
                          {item.sublabel}
                        </div>
                      </div>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                          item.badgeColor || 'bg-white/20 text-white'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick clinical tools */}
          <div className="pt-2 border-t border-white/10">
            <div className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
              Clinical Tools & Logs
            </div>
            <div className="space-y-0.5">
              {secondaryNavLinks.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                      isActive
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-[#f7f4ea]/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-white/15 text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
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
            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                  Main Clinic Work
                </div>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {primaryNavLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="p-2 rounded-lg bg-black/20 hover:bg-white/10 flex items-center justify-between font-semibold"
                    >
                      <span>{item.label}</span>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500 text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-white/50 mb-1">
                  Clinical Tools
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  {secondaryNavLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileNavOpen(false)}
                      className="p-2 rounded-lg hover:bg-white/10 truncate"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
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
