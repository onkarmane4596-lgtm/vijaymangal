'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MessageCircle, Calendar, Menu, X, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#faf8f5]/95 backdrop-blur-md border-b border-[#e6dfd3] shadow-xs">
      {/* Top emergency & quick info bar */}
      <div className="bg-[#183d2b] text-[#f7f4ea] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#5b8e46] animate-pulse" />
            <span className="font-marathi-heading">
              शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प | आटपाडी
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:+91${CLINIC_PHONE}`}
              className="flex items-center gap-1 hover:text-[#d99136] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d99136]" />
              <span>+91 82639 02142</span>
            </a>
            <Link
              href="/login"
              className="hidden md:flex items-center gap-1 text-[#f7f4ea]/80 hover:text-white transition-colors"
            >
              <ShieldCheck className="w-3 h-3" />
              <span>Staff Login</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#6517a3] shadow-sm bg-white shrink-0">
              <Image
                src="/images/logo.jpg"
                alt="विजयमंगल आयुर्वेद लोगो"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-marathi-heading font-bold text-xl sm:text-2xl text-[#183d2b] tracking-tight group-hover:text-[#6517a3] transition-colors">
                विजयमंगल आयुर्वेद
              </span>
              <span className="text-xs text-[#6b7280] font-medium hidden sm:inline-block">
                डॉ. सुप्रिया श्रीप्रसाद कदम, एम. डी. (आयुर्वेद)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-[#262820]">
            <Link
              href="/"
              className="hover:text-[#6517a3] transition-colors py-1 border-b-2 border-transparent hover:border-[#6517a3]"
            >
              मुख्यपृष्ठ
            </Link>
            <Link
              href="/treatments"
              className="hover:text-[#6517a3] transition-colors py-1 border-b-2 border-transparent hover:border-[#6517a3]"
            >
              उपचार व सेवा
            </Link>
            <Link
              href="/about"
              className="hover:text-[#6517a3] transition-colors py-1 border-b-2 border-transparent hover:border-[#6517a3]"
            >
              आमच्याविषयी
            </Link>
            <Link
              href="/contact"
              className="hover:text-[#6517a3] transition-colors py-1 border-b-2 border-transparent hover:border-[#6517a3]"
            >
              संपर्क व स्थान
            </Link>
          </nav>

          {/* CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-lg bg-[#25D366]/10 text-[#075e54] hover:bg-[#25D366]/20 transition-all border border-[#25D366]/30"
              title="WhatsApp वर संपर्क साधा"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#6517a3] to-[#490f77] hover:from-[#490f77] hover:to-[#6517a3] rounded-lg shadow-sm hover:shadow-md transition-all active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>अपॉइंटमेंट बुक करा</span>
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/book-appointment"
              className="p-2 text-white bg-[#6517a3] rounded-md shadow-xs"
              title="अपॉइंटमेंट"
            >
              <Calendar className="w-4 h-4" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#262820] hover:text-[#6517a3] rounded-md"
              aria-label="मेनू उघडा"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#e6dfd3] bg-[#faf8f5] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2 text-base font-medium">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#f5ebff] text-[#183d2b]"
            >
              मुख्यपृष्ठ
            </Link>
            <Link
              href="/treatments"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#f5ebff] text-[#183d2b]"
            >
              उपचार व सेवा (All Treatments)
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#f5ebff] text-[#183d2b]"
            >
              आमच्याविषयी (About Clinic)
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#f5ebff] text-[#183d2b]"
            >
              संपर्क व स्थान (Contact)
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-gray-100 text-[#6b7280] text-sm flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Internal Clinic Staff Login</span>
            </Link>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#25D366] text-white font-medium text-sm shadow-xs"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp वर संपर्क साधा</span>
            </a>
            <Link
              href="/book-appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-[#6517a3] text-white font-medium text-sm shadow-xs"
            >
              <Calendar className="w-4 h-4" />
              <span>अपॉइंटमेंट बुक करा</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
