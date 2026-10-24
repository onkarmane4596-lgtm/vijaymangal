'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Sparkles, ArrowRight, ShieldCheck, Leaf } from 'lucide-react';

export function NatureScienceSection() {
  const points = [
    { text_en: '100% Classical & Authentic Herbs', text_mr: 'शंभर टक्के शुद्ध व शास्त्रीय औषधी' },
    { text_en: 'Best Quality Formulations', text_mr: 'संहितेनुसार सिद्ध काढ्यांची व तेलांची योजना' },
    { text_en: 'Hygienic & Pure Preparation', text_mr: 'स्वच्छ आणि प्रमाणित औषधी घटक' },
    { text_en: 'Quality Tested & M.D. Monitored', text_mr: 'एम. डी. तज्ज्ञ डॉक्टरांचे प्रत्यक्ष मार्गदर्शन' },
    { text_en: 'Healthcare Rooted in Ayurveda', text_mr: 'त्रिदोष संतुलन व मूळ कारणाचा शोध' },
    { text_en: 'Individualized Diet & Lifestyle', text_mr: 'पथ्य-अपथ्य व दिनचर्या मार्गदर्शन' },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#faf8f5] border-b border-[#e6dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Description, Checklist & Button */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#59846f] bg-[#59846f]/10 px-3.5 py-1.5 rounded-full">
                SHASTRA &amp; NATURE • शास्त्र आणि निसर्ग
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#183d2b] leading-[1.2] tracking-tight">
              The Combination of <br />
              <span className="font-display italic text-[#59846f] font-normal">
                Nature &amp; Science
              </span>
            </h2>

            <p className="font-marathi-heading text-base font-semibold text-[#183d2b]/90">
              आयुर्वेदाची प्राचीन संहिता आणि वैज्ञानिक वैद्यकीय दृष्टिकोनाचा सुवर्णसंगम.
            </p>

            <p className="text-sm sm:text-base text-[#262820]/75 leading-relaxed font-sans">
              We bridge centuries-old classical wisdom from the Charak and Sushrut Samhitas with modern clinical diagnostics. Every remedy is selected strictly according to individual Rogi Pariksha (patient assessment) and Roga Pariksha (disease assessment).
            </p>

            {/* Checklist items with green check icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {points.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#59846f]/15 text-[#59846f] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#183d2b] block">
                      {point.text_en}
                    </span>
                    <span className="text-[11px] font-marathi-heading text-[#6b7280]">
                      {point.text_mr}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#183d2b] hover:bg-[#254f39] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>Discover Clinical Philosophy</span>
                <ArrowRight className="w-4 h-4 text-[#d99136]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Circular Ingredients Bowls Image (matching theme) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-md lg:max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <Image
                src="/images/theme-ingredients-bowls.jpg"
                alt="Ayurvedic Ingredients in Ceramic and Wooden Bowls - Cinnamon, Turmeric, Tulsi, Spices - Vijaymangal Ayurved"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Badge overlay */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e6dfd3] shadow-md flex items-center gap-2">
                <Leaf className="w-3.5 h-3.5 text-[#59846f]" />
                <span className="text-xs font-bold text-[#183d2b]">Pure Classical Botanicals</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
