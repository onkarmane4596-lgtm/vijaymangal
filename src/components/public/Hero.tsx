'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  ArrowRight,
  MessageCircle,
  Sparkles,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Stethoscope,
  HeartPulse,
  Leaf,
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';

export function Hero() {
  return (
    <section className="relative min-h-[640px] lg:min-h-[720px] flex items-center overflow-hidden bg-[#122b1e] text-white">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-sanctuary-bg.jpg"
          alt="Vijaymangal Ayurved Sanctuary - Classical Ayurvedic Medicine and Panchakarma, Atpadi"
          fill
          priority
          className="object-cover object-[center_right] lg:object-center transform scale-105"
        />
      </div>

      {/* Modern Multi-Layered Mask Overlays */}
      {/* 1. Deep Forest to Subtle Translucent Horizontal Gradient Mask */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#10281b]/95 via-[#122b1e]/85 to-[#183d2b]/35 lg:to-[#183d2b]/20 pointer-events-none" />
      
      {/* 2. Top-to-Bottom Subtle Ambient Mask */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#122b1e]/85 via-transparent to-transparent pointer-events-none" />

      {/* 3. Subtle Radial Glow behind text */}
      <div className="absolute top-1/4 left-10 lg:left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#5b8e46]/15 rounded-full blur-3xl pointer-events-none z-[2]" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-20 relative z-10 w-full">
        <div className="max-w-3xl space-y-7">
          
          {/* Eyebrow Badge (Frosted Glass Pill) */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#d99136] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#f7f4ea]">
              Authentic Ayurveda Clinic • Atpadi, Maharashtra
            </span>
          </div>

          {/* Headline with Bilingual Typography */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] text-white drop-shadow-sm">
              AYURVEDA <br />
              <span className="font-display italic font-normal text-[#f7f4ea] text-3xl sm:text-4xl lg:text-5xl block sm:inline">
                &amp; Ayurvedic Medicine
              </span>
            </h1>
            <p className="font-marathi-heading text-xl sm:text-2xl font-bold text-[#f7f4ea] tracking-wide pt-1">
              शास्त्रोक्त आयुर्वेद आणि पंचकर्म चिकित्सा
            </p>
          </div>

          {/* Subtitle description */}
          <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed font-sans drop-shadow-xs">
            Sensitive, personalized healthcare guided by <strong>Dr. Supriya Shreeprasad Kadam, M.D. (Ayurveda)</strong>. We diagnose constitutional imbalances (Vata, Pitta, Kapha) through traditional pulse examination, classical formulations, and root-cause revitalization.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#183d2b] hover:bg-[#f7f4ea] text-sm font-bold shadow-xl hover:shadow-2xl transition-all duration-200 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-[#d99136]" />
              <span>Book Appointment</span>
            </Link>

            <a
              href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href={`tel:+91${CLINIC_PHONE}`}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white text-sm font-semibold transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-[#d99136]" />
              <span>Call: 82639 02142</span>
            </a>
          </div>

          {/* Floating Glass Trust Strip */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
              <div className="flex items-center gap-2 text-[#d99136]">
                <Leaf className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">100% Classical</span>
              </div>
              <p className="text-[11px] text-white/80 font-marathi-heading mt-1">
                शुद्ध वनस्पती व संहितेनुसार औषधी
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
              <div className="flex items-center gap-2 text-[#d99136]">
                <HeartPulse className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Nadi Parikshan</span>
              </div>
              <p className="text-[11px] text-white/80 font-marathi-heading mt-1">
                पारंपरिक नाडी व प्रकृती तपासणी
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
              <div className="flex items-center gap-2 text-[#d99136]">
                <Stethoscope className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">M.D. Qualified</span>
              </div>
              <p className="text-[11px] text-white/80 font-marathi-heading mt-1">
                डॉ. सुप्रिया कदम यांचे थेट मार्गदर्शन
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-left">
              <div className="flex items-center gap-2 text-[#d99136]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white">Panchakarma</span>
              </div>
              <p className="text-[11px] text-white/80 font-marathi-heading mt-1">
                शरीर शुद्धीकरण व त्रिदोष संतुलन
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Clean Architectural Bottom Border Accent Merging Into Next Section */}
      <div className="absolute bottom-0 inset-x-0 z-[10] h-[2px] bg-gradient-to-r from-transparent via-[#d99136]/50 to-transparent pointer-events-none" />
    </section>
  );
}
