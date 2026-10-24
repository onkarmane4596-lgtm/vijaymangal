'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Quote, Star, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export function CoursesAndReviews() {
  const [activeReview, setActiveReview] = useState(0);

  const reviews = [
    {
      quote_mr:
        'डॉ. सुप्रिया कदम यांच्या अचूक नाडीपरीक्षण आणि मार्गदर्शनामुळे माझी अनेक महिन्यांची सांधेदुखी व अपचनाचा त्रास पूर्ण नियंत्रणात आला. क्लिनिकचे मार्गदर्शन अत्यंत संवेदनशील आहे.',
      quote_en:
        'Dr. Supriya Kadam’s pulse diagnosis was astonishingly precise. Her customized treatment plan and dietary advice restored my joint mobility without side effects.',
      author: 'Sunita Patil',
      location: 'Atpadi (Sangli)',
      condition: 'Sandhivata & Digestion',
    },
    {
      quote_mr:
        'आम्लपित्त आणि डोकेदुखीच्या त्रासावर अनेक ठिकाणी उपचार केले, पण विजयमंगल आयुर्वेद येथील ३० दिवसांच्या कोर्सने मुळापासून फरक पडला. अत्यंत प्रामाणिक सेवा.',
      quote_en:
        'After struggling with chronic acidity and migraines for years, the focused 1-month digestive course gave me lasting relief. Truly classical Ayurveda.',
      author: 'Sachin Kulkarni',
      location: 'Sangli District',
      condition: 'Amlapitta & Acidity',
    },
    {
      quote_mr:
        'वजन व्यवस्थापन आणि पीसीओडीसाठी डॉ. सुप्रिया मॅडम यांनी दिलेली औषधे व दिनचर्या अत्यंत गुणकारी ठरली. शरीराला नवीन ऊर्जा मिळाली आहे.',
      quote_en:
        'The compassionate women’s healthcare guidance and classical herbal formulation helped rebalance my metabolism and hormonal health.',
      author: 'Priyanka Deshmukh',
      location: 'Atpadi Rural',
      condition: 'Metabolic & Women’s Care',
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white border-b border-[#e6dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: 2 Stacked Treatment Offer Cards (matching theme architecture) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Card 1: 1-Month Focused Course */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#faf8f5] border border-[#e6dfd3] shadow-xs hover:border-[#59846f]/50 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#59846f]/15 text-[#183d2b] inline-block">
                  ACUTE &amp; DIGESTIVE CARE
                </span>
                <h3 className="font-bold text-xl sm:text-2xl text-[#183d2b]">
                  1-Month Focused Course
                </h3>
                <p className="text-xs sm:text-sm text-[#262820]/75 font-marathi-heading">
                  आम्लपित्त, पोटाचे विकार, प्राथमिक वातदोष व जीवनशैली संतुलन.
                </p>
                <div className="text-xs text-[#59846f] font-semibold pt-1">
                  ✓ Pulse Check + 30 Days Pure Formulations
                </div>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <Link
                  href="/book-appointment?course=1-month"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#183d2b] hover:bg-[#254f39] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d99136]" />
                </Link>
              </div>
            </div>

            {/* Card 2: 4-Month Chronic Rejuvenation Course with Oil Bottles visual */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#faf8f5] to-emerald-50/40 border border-[#e6dfd3] shadow-xs hover:border-[#59846f]/50 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
              <div className="space-y-2 relative z-10 max-w-sm">
                <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#d99136]/20 text-[#183d2b] inline-block">
                  CHRONIC REJUVENATION
                </span>
                <h3 className="font-bold text-xl sm:text-2xl text-[#183d2b]">
                  4-Month Rejuvenation
                </h3>
                <p className="text-xs sm:text-sm text-[#262820]/75 font-marathi-heading">
                  सांधेदुखी, मणक्यांचे विकार, वजन व्यवस्थापन व संपूर्ण धातू पोषण.
                </p>
                <div className="text-xs text-[#59846f] font-semibold pt-1">
                  ✓ Monthly Follow-ups + Seasonal Formulation Tuning
                </div>
              </div>

              {/* Small thumbnail & button */}
              <div className="flex flex-col sm:items-end gap-3 shrink-0 relative z-10 w-full sm:w-auto">
                <div className="relative w-28 h-20 rounded-2xl overflow-hidden border-2 border-white shadow-sm hidden sm:block">
                  <Image
                    src="/images/theme-oils-tinctures.jpg"
                    alt="Ayurvedic Oils and Tinctures Bottles - Vijaymangal Ayurved"
                    fill
                    className="object-cover"
                  />
                </div>

                <Link
                  href="/book-appointment?course=4-month"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#59846f] hover:bg-[#48755c] text-white text-xs font-bold transition-all shadow-xs"
                >
                  <span>Book Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Testimonials Sage Green Quote Card (matching theme architecture) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#59846f] bg-[#59846f]/10 px-3.5 py-1.5 rounded-full">
                TESTIMONIALS • रुग्णांचे अनुभव
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#183d2b] leading-[1.2] tracking-tight">
              Don&apos;t take our word for it <br />
              <span className="font-display italic text-[#59846f] font-normal">
                hear what our patients are saying
              </span>
            </h2>

            {/* Sage Green Quote Box */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#59846f] text-white shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/20">
                <Quote className="w-10 h-10 text-white/40 rotate-180" />
                <div className="flex items-center gap-1 text-[#f7f4ea]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f7f4ea] text-[#f7f4ea]" />
                  ))}
                </div>
              </div>

              {/* Quote text */}
              <div className="py-6 space-y-3">
                <p className="text-base sm:text-lg font-marathi-heading font-medium leading-relaxed">
                  &ldquo;{reviews[activeReview].quote_mr}&rdquo;
                </p>
                <p className="text-xs sm:text-sm text-white/80 italic font-sans">
                  {reviews[activeReview].quote_en}
                </p>
              </div>

              {/* Author & Slider Dots */}
              <div className="flex items-center justify-between pt-4 border-t border-white/20">
                <div>
                  <h4 className="font-bold text-sm text-white">
                    {reviews[activeReview].author}
                  </h4>
                  <p className="text-xs text-white/70">
                    {reviews[activeReview].location} • {reviews[activeReview].condition}
                  </p>
                </div>

                {/* Rating Dots switcher */}
                <div className="flex items-center gap-2">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveReview(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeReview === idx ? 'w-6 bg-white' : 'w-2.5 bg-white/40'
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
