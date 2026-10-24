'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ShieldCheck,
  Calendar,
  Leaf,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="bg-[#10281b] text-[#f7f4ea] pt-16 pb-10 border-t-2 border-[#d99136]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Practitioner (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-11 h-11 rounded-full bg-[#5b8e46]/20 text-[#5b8e46] flex items-center justify-center shrink-0 border border-[#5b8e46]/30 group-hover:bg-[#5b8e46] group-hover:text-white transition-colors shadow-2xs">
                <Leaf className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white tracking-tight leading-none">
                  Vijaymangal <span className="text-[#5b8e46]">Ayurved</span>
                </span>
                <span className="text-[11px] text-[#d99136] font-medium tracking-wide mt-0.5">
                  विजयमंगल आयुर्वेद • आटपाडी (जि. सांगली)
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#f7f4ea]/80 leading-relaxed font-marathi-heading">
              शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प. नाडीपरीक्षण, शुद्ध औषधी आणि पंचकर्म चिकित्सेद्वारे आजारांच्या मुळावर मात.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>डॉ. सुप्रिया श्रीप्रसाद कदम</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#5b8e46]/20 text-[#7cb366] font-sans">
                  M.D. (Ayurveda)
                </span>
              </div>
              <p className="text-[11px] text-[#f7f4ea]/70 font-marathi-heading">
                मुख्य सल्लागार वैद्य • आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा तज्ज्ञ
              </p>
            </div>

            <div className="pt-1">
              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Direct WhatsApp Consultation</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services Directory (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d99136] border-b border-white/10 pb-2">
              Services &amp; Treatments
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#f7f4ea]/80 font-sans">
              <li>
                <Link href="/treatments/joint-health" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Joint &amp; Spine Care (सांधे व मणके)</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#d99136]" />
                </Link>
              </li>
              <li>
                <Link href="/treatments/metabolic-health" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Weight &amp; Metabolism (वजन व्यवस्थापन)</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#d99136]" />
                </Link>
              </li>
              <li>
                <Link href="/treatments/digestive-health" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Digestive Health (पचन व आम्लपित्त)</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#d99136]" />
                </Link>
              </li>
              <li>
                <Link href="/treatments/womens-health" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Women&apos;s Health (महिलांचे आरोग्य)</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#d99136]" />
                </Link>
              </li>
              <li>
                <Link href="/treatments/mental-wellness" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Mind &amp; Vitality (मानसिक स्वास्थ्य)</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#d99136]" />
                </Link>
              </li>
              <li>
                <Link href="/treatments/panchakarma-consultation" className="hover:text-white transition-colors flex items-center justify-between group">
                  <span>Panchakarma Detox (पंचकर्म चिकित्सा)</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-[#d99136]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Clinic Location & Timings (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d99136] border-b border-white/10 pb-2">
              Clinic &amp; Appointments
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-[#f7f4ea]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d99136] shrink-0 mt-0.5" />
                <span className="leading-snug">
                  Main Road, Opp. Post Office, Near Vitthal Rukmini Temple, Atpadi, Dist. Sangli, Maharashtra - 415301
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d99136] shrink-0" />
                <a href={`tel:+91${CLINIC_PHONE}`} className="hover:underline font-bold text-white">
                  +91 82639 02142
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5 text-[#f7f4ea]/80">
                  <p>Morning OPD: 9:00 AM – 1:00 PM</p>
                  <p>Evening OPD: 4:00 PM – 8:00 PM</p>
                  <p className="text-[11px] text-[#f7f4ea]/60">Sunday: By Pre-appointment</p>
                </div>
              </div>
            </div>

            <div className="pt-1">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold text-white transition-all shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5 text-[#d99136]" />
                <span>Book Clinic Appointment</span>
              </Link>
            </div>
          </div>

          {/* Col 4: Safety & Statutory Notice (2 cols) */}
          <div className="lg:col-span-2 space-y-3 bg-black/25 p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#d99136] uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-[#d99136] shrink-0" />
              <span>Medical Notice</span>
            </div>
            
            <p className="text-[11px] text-[#f7f4ea]/75 leading-relaxed font-marathi-heading">
              सदर माहिती वैद्यकीय जनजागृतीसाठी आहे. कोणत्याही औषधोपचारापूर्वी प्रत्यक्ष नाडी तपासणी आवश्यक आहे.
            </p>

            <p className="text-[11px] text-[#f7f4ea]/70 leading-relaxed font-sans">
              For acute emergencies (e.g. severe chest pain or stroke symptoms), immediately visit nearest hospital ER.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#f7f4ea]/60">
          <p>© 2026 Vijaymangal Ayurved (विजयमंगल आयुर्वेद). All Rights Reserved.</p>
          
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              About Clinic
            </Link>
            <Link href="/treatments" className="hover:text-white transition-colors">
              Treatments
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Location &amp; Contact
            </Link>
            <Link href="/login" className="hover:text-[#d99136] transition-colors flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
