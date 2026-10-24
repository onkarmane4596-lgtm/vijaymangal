'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle, Phone, Calendar, ArrowUp } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';

export function FloatingActionWidget() {
  const pathname = usePathname();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto p-2.5 rounded-full bg-white/90 backdrop-blur-md border border-[#e6dfd3] text-[#183d2b] hover:text-[#6517a3] shadow-md hover:shadow-lg transition-all active:scale-95"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating Call & WhatsApp Pill Stack */}
      <div className="pointer-events-auto flex items-center gap-2">
        {/* Quick Phone Call Pill (hidden on very small screens, visible on mobile tap) */}
        <a
          href={`tel:+91${CLINIC_PHONE}`}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-[#e6dfd3] text-[#183d2b] hover:border-[#5b8e46] shadow-md hover:shadow-lg transition-all text-xs font-bold"
          title="Call Clinic Desk"
        >
          <div className="w-6 h-6 rounded-full bg-[#5b8e46]/15 text-[#5b8e46] flex items-center justify-center">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <span>Call: 8263902142</span>
        </a>

        {/* WhatsApp Floating Button with live pulsing aura */}
        <a
          href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs shadow-lg hover:shadow-xl transition-all active:scale-95 animate-pulse-ring"
          title="Direct WhatsApp Consultation"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="hidden md:inline-block font-sans">Chat on WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
