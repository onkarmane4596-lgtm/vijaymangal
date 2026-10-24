'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Phone,
  MessageCircle,
  Calendar,
  Menu,
  X,
  ShieldCheck,
  MapPin,
  Clock,
  Leaf,
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/treatments' },
    { label: 'Our Approach', href: '/#approach' },
    { label: 'Doctor', href: '/#doctor' },
    { label: 'Panchakarma', href: '/treatments/panchakarma-consultation' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top Utility Information Bar */}
      <div className="bg-[#122b1e] text-[#f7f4ea] text-[11px] sm:text-xs py-2 px-4 border-b border-[#1f4834]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-1.5 sm:gap-2">
          {/* Left: Location & Working Hours */}
          <div className="flex items-center gap-4 flex-wrap justify-center md:justify-start">
            <span className="inline-flex items-center gap-1.5 text-[#f7f4ea]/90">
              <MapPin className="w-3.5 h-3.5 text-[#d99136] shrink-0" />
              <span>Main Road, Opp. Post Office, Atpadi, Sangli</span>
            </span>
            <span className="hidden sm:inline-block text-[#d99136]/60">•</span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[#f7f4ea]/90">
              <Clock className="w-3.5 h-3.5 text-[#5b8e46] shrink-0" />
              <span>OPD: Mon–Sat 9:00 AM–1:00 PM | 4:00 PM–8:00 PM</span>
            </span>
          </div>

          {/* Right: Direct Call & Staff Portal */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a
              href={`tel:+91${CLINIC_PHONE}`}
              className="inline-flex items-center gap-1.5 font-bold text-[#d99136] hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d99136]" />
              <span>Call: +91 82639 02142</span>
            </a>
            <span className="text-white/20">|</span>
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#25D366] hover:underline font-semibold"
            >
              <MessageCircle className="w-3 h-3 fill-[#25D366]" />
              <span>WhatsApp</span>
            </a>
            <span className="text-white/20">|</span>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-[#f7f4ea]/75 hover:text-white transition-colors font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/98 backdrop-blur-md shadow-md py-2.5 border-b border-[#e6dfd3]'
            : 'bg-white py-3.5 border-b border-[#e6dfd3]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo and Brand Identity */}
            <Link href="/" className="flex items-center gap-3 shrink-0 group">
              <div className="w-10 h-10 rounded-full bg-[#5b8e46]/15 text-[#183d2b] flex items-center justify-center shrink-0 group-hover:bg-[#5b8e46] group-hover:text-white transition-colors shadow-2xs">
                <Leaf className="w-5 h-5 text-[#5b8e46] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl lg:text-2xl text-[#183d2b] tracking-tight group-hover:text-[#5b8e46] transition-colors leading-none">
                  Vijaymangal <span className="text-[#5b8e46]">Ayurved</span>
                </span>
                <span className="text-[10px] text-[#6b7280] font-medium tracking-wide mt-0.5 whitespace-nowrap">
                  Classical Medicine &amp; Panchakarma • Atpadi
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Menu with Perfect Uniform Spacing */}
            <nav className="hidden lg:flex items-center justify-center flex-1 max-w-2xl px-2">
              <div className="flex items-center justify-between w-full">
                {navLinks.map((item) => {
                  const isActive =
                    item.href === '/'
                      ? pathname === '/'
                      : pathname.startsWith(item.href) && item.href !== '/';

                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 text-center ${
                        isActive
                          ? 'text-[#183d2b] bg-[#5b8e46]/15 font-bold shadow-2xs'
                          : 'text-[#262820]/80 hover:text-[#183d2b] hover:bg-[#faf8f5]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* Action CTAs (Call Us Box + Book Appointment Pill) */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <a
                href={`tel:+91${CLINIC_PHONE}`}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#e6dfd3] bg-[#faf8f5] hover:bg-white text-xs font-bold text-[#183d2b] shadow-2xs hover:shadow-xs transition-all whitespace-nowrap"
              >
                <div className="w-5 h-5 rounded-full bg-[#5b8e46]/15 text-[#5b8e46] flex items-center justify-center">
                  <Phone className="w-3 h-3" />
                </div>
                <span>Call: 82639 02142</span>
              </a>

              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#183d2b] hover:bg-[#254f39] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-98 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-[#d99136]" />
                <span>Book Appointment</span>
              </Link>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="flex lg:hidden items-center gap-2">
              <Link
                href="/book-appointment"
                className="p-2 text-white bg-[#183d2b] rounded-lg shadow-2xs"
                title="Book"
              >
                <Calendar className="w-4 h-4" />
              </Link>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#183d2b] hover:bg-[#faf8f5] focus:outline-hidden"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-[#e6dfd3] shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-5 py-6 space-y-4">
            <div className="space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-base font-semibold text-[#183d2b] hover:bg-[#5b8e46]/10 hover:text-[#5b8e46] transition-colors font-sans"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#e6dfd3] space-y-3">
              <Link
                href="/book-appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#183d2b] text-white text-sm font-semibold shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#d99136]" />
                <span>Book Appointment</span>
              </Link>

              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold shadow-sm"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href={`tel:+91${CLINIC_PHONE}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-[#e6dfd3] bg-[#faf8f5] text-xs font-bold text-[#183d2b]"
              >
                <Phone className="w-3.5 h-3.5 text-[#5b8e46]" />
                <span>Call Desk: +91 82639 02142</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
