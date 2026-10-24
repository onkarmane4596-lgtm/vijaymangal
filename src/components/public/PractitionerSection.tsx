import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Award, CheckCircle2, MessageCircle, Sparkles, ShieldCheck, Stethoscope } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';

export function PractitionerSection() {
  return (
    <section id="doctor" className="py-20 sm:py-28 bg-[#faf8f5] scroll-mt-20 relative overflow-hidden">
      {/* Subtle background luxury accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#6517a3]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#5b8e46]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="card-luxury p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          {/* Subtle decorative gold corner ribbon */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-[#d99136]/15 via-transparent to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Practitioner Crest & Doctor Card */}
            <div className="lg:col-span-5 text-center flex flex-col items-center">
              <div className="relative group">
                {/* Glowing ring */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-[#6517a3] via-[#d99136] to-[#5b8e46] rounded-full blur-sm opacity-60 group-hover:opacity-90 transition duration-500" />
                
                <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white p-2">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src="/images/logo.jpg"
                      alt="डॉ. सुप्रिया श्रीप्रसाद कदम, एम. डी. (आयुर्वेद) - विजयमंगल आयुर्वेद, आटपाडी"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="absolute bottom-2 right-4 bg-[#183d2b] text-[#f7f4ea] p-2.5 rounded-full border-2 border-white shadow-md">
                  <Stethoscope className="w-5 h-5 text-[#d99136]" />
                </div>
              </div>

              <div className="mt-7 space-y-2 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#183d2b] text-[#f7f4ea] text-xs font-semibold tracking-wide">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#d99136]" />
                  <span>मुख्य सल्लागार वैद्य (Consulting Physician)</span>
                </span>
                
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#183d2b] tracking-tight">
                  डॉ. सुप्रिया श्रीप्रसाद कदम
                </h3>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-base font-bold text-[#6517a3] bg-[#6517a3]/10 px-3 py-0.5 rounded-full">
                    एम. डी. (आयुर्वेद)
                  </span>
                </div>
                
                <p className="text-xs sm:text-sm text-[#6b7280] font-medium font-marathi-heading">
                  आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा तज्ज्ञ
                </p>

                <div className="pt-2 text-xs text-[#262820]/70 flex items-center justify-center gap-2">
                  <span>📍 विजयमंगल आयुर्वेद, आटपाडी (जि. सांगली)</span>
                </div>
              </div>
            </div>

            {/* Right: Philosophy & Approach */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#6517a3] uppercase tracking-wider bg-[#6517a3]/10 px-3 py-1 rounded-full">
                <Award className="w-4 h-4 text-[#d99136]" />
                <span>About Doctor &amp; Clinical Philosophy</span>
              </div>

              <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b] leading-snug">
                आपल्या आरोग्यासाठी संवेदनशील, शास्त्रोक्त आणि वैयक्तिक मार्गदर्शन
              </h2>

              <blockquote className="border-l-4 border-[#d99136] pl-4 italic text-base text-[#262820]/85 font-marathi-heading bg-white/60 py-2.5 rounded-r-xl">
                &ldquo;शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प.&rdquo;
              </blockquote>

              <p className="text-sm sm:text-base text-[#262820]/80 leading-relaxed font-marathi-heading">
                आयुर्वेद ही केवळ तात्पुरती लक्षणे शमवणारी प्रणाली नसून, शरीरातील वात, पित्त आणि कफ या त्रिदोषांचे संतुलन साधून आजाराच्या मूळ कारणाचा शोध घेणारे प्राचीन व प्रभावी शास्त्र आहे. विजयमंगल आयुर्वेद, आटपाडी येथे प्रत्येक रुग्णाच्या सवयी, दिनचर्या, शारीरिक प्रकृती व नाडीपरीक्षणाद्वारे योग्य मार्गदर्शन व औषधोपचार केले जातात.
              </p>

              {/* Approach Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e6dfd3] shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-[#183d2b] font-marathi-heading">पारंपरिक नाडी परीक्षा व प्रकृती विश्लेषण</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e6dfd3] shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-[#183d2b] font-marathi-heading">वैयक्तिक गरजेनुसार शुद्ध औषधी योजना</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e6dfd3] shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-[#183d2b] font-marathi-heading">पथ्य-अपथ्य व आहार-विहार मार्गदर्शन</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#e6dfd3] shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-[#183d2b] font-marathi-heading">आवश्यकतेनुसार पंचकर्म व पुनर्वसन सल्ला</span>
                </div>
              </div>

              {/* Interactive Action Triggers */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#183d2b] text-[#f7f4ea] hover:bg-[#262820] text-sm font-semibold transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <Calendar className="w-4 h-4 text-[#d99136]" />
                  <span>Book Consultation With Doctor</span>
                </Link>

                <a
                  href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba59] transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
