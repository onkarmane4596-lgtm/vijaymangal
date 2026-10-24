'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Phone, ArrowRight, Sparkles } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';

export function EasyStepsSection() {
  const steps = [
    {
      num: '01',
      title_en: 'Consultations with our expert',
      title_mr: 'सखोल नाडी परीक्षा व प्रकृती विश्लेषण',
      desc: 'डॉ. सुप्रिया कदम यांच्याशी प्रत्यक्ष संवाद, जुन्या तक्रारींचा आढावा आणि पारंपरिक नाडीपरीक्षण.',
    },
    {
      num: '02',
      title_en: 'Get tailored prescription & treatment',
      title_mr: 'वैयक्तिक शुद्ध औषधी योजना',
      desc: 'आपल्या शरीराच्या वात, पित्त, कफ त्रिदोष स्थितीनुसार तयार केलेली शुद्ध व शास्त्रोक्त औषधयोजना.',
    },
    {
      num: '03',
      title_en: 'Enjoy lasting health & revitalization',
      title_mr: 'आरोग्य संवर्धन व नियमित फॉलोअप',
      desc: 'आहार-विहार पथ्य मार्गदर्शन, नियमित प्रगती नोंद आणि दीर्घकालीन स्वास्थ्य व्यवस्थापन.',
    },
  ];

  return (
    <section id="approach" className="py-20 lg:py-28 bg-white border-b border-[#e6dfd3] scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Natural Herbs Preparation Image (matching theme) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-none aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-[#faf8f5] group">
              <Image
                src="/images/theme-herbs-prep.jpg"
                alt="Ayurvedic Wooden Mortar and Pestle with Fresh Medicinal Herbs and Roots - Vijaymangal Ayurved"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Step by step guidance */}
          <div className="lg:col-span-7 space-y-6 text-left relative">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#59846f] bg-[#59846f]/10 px-3.5 py-1.5 rounded-full">
                HOW IT WORKS • कार्यपद्धती
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#183d2b] leading-[1.2] tracking-tight">
              Easy Steps to Order <br />
              <span className="font-display italic text-[#59846f] font-normal">
                the Services.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#262820]/75 max-w-xl leading-relaxed font-sans">
              Our structured care process ensures that every patient receives precise diagnosis, genuine classical medicine, and continuous monitoring until optimal health is achieved.
            </p>

            {/* Steps List */}
            <div className="space-y-4 pt-2">
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-[#faf8f5] border border-[#e6dfd3] hover:border-[#59846f]/40 hover:bg-white shadow-2xs hover:shadow-xs transition-all duration-200"
                >
                  {/* Number pill */}
                  <div className="w-11 h-11 rounded-full bg-[#59846f] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs mt-0.5">
                    {step.num}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h4 className="font-bold text-sm sm:text-base text-[#183d2b]">
                        {step.title_en}
                      </h4>
                      <span className="text-xs font-semibold text-[#59846f] font-marathi-heading">
                        ({step.title_mr})
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#262820]/75 font-marathi-heading leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Floating corner Contact Pill matching theme */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-4">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183d2b] hover:bg-[#254f39] text-white text-xs sm:text-sm font-semibold shadow-xs transition-all"
              >
                <span>Book Your Step 01 Consultation</span>
                <ArrowRight className="w-4 h-4 text-[#d99136]" />
              </Link>

              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#59846f]/15 hover:bg-[#59846f] text-[#183d2b] hover:text-white text-xs font-bold border border-[#59846f]/30 transition-all shadow-2xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Need help? Contact Us</span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
