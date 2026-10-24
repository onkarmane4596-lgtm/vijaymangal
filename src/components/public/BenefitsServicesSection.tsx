'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Activity,
  Heart,
  Droplets,
  Brain,
  Pill,
  Leaf,
  ArrowRight,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';

export function BenefitsServicesSection() {
  const serviceIcons = [
    {
      title_en: 'Herbal & Joint Care',
      title_mr: 'सांधे व मणके',
      slug: 'joint-health',
      bgColor: 'bg-emerald-50 text-emerald-700 border-emerald-100',
      icon: Activity,
    },
    {
      title_en: 'Herb Products',
      title_mr: 'पचन व आम्लपित्त',
      slug: 'digestive-health',
      bgColor: 'bg-amber-50 text-amber-700 border-amber-100',
      icon: Leaf,
    },
    {
      title_en: 'Medicine & Weight',
      title_mr: 'वजन व चयापचय',
      slug: 'metabolic-health',
      bgColor: 'bg-teal-50 text-teal-700 border-teal-100',
      icon: Pill,
    },
    {
      title_en: 'Ayurvedic Women',
      title_mr: 'महिलांचे आरोग्य',
      slug: 'womens-health',
      bgColor: 'bg-rose-50 text-rose-700 border-rose-100',
      icon: Heart,
    },
    {
      title_en: 'Panchakarma Detox',
      title_mr: 'पंचकर्म चिकित्सा',
      slug: 'panchakarma-consultation',
      bgColor: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      icon: Droplets,
    },
    {
      title_en: 'Consultations',
      title_mr: 'मानसिक स्वास्थ्य',
      slug: 'mental-wellness',
      bgColor: 'bg-orange-50 text-orange-700 border-orange-100',
      icon: Brain,
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#faf8f5] border-b border-[#e6dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: 6-Icon Grid Box with Abstract Fade Gradient Background */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl p-4 sm:p-8 lg:p-10 border border-[#e6dfd3]/80 bg-gradient-to-br from-white/95 via-[#fcfbfa]/90 to-[#f5f1e8]/80 shadow-[0_22px_50px_-12px_rgba(24,61,43,0.08),0_4px_16px_-4px_rgba(217,145,54,0.05)] backdrop-blur-xl overflow-hidden group/container transition-all duration-300">
              
              {/* === Abstract Fade Gradient Background Layers === */}
              {/* 1. Ambient Orb: Sage & Herbal Emerald (Top-Left) */}
              <div
                className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-gradient-to-br from-emerald-400/25 via-[#5b8e46]/18 to-transparent blur-3xl pointer-events-none transition-transform duration-700 ease-out group-hover/container:scale-110"
                aria-hidden="true"
              />

              {/* 2. Ambient Orb: Warm Honey & Saffron Glow (Top-Right) */}
              <div
                className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gradient-to-bl from-amber-300/30 via-[#d99136]/18 to-transparent blur-3xl pointer-events-none transition-transform duration-700 ease-out group-hover/container:scale-110"
                aria-hidden="true"
              />

              {/* 3. Ambient Orb: Vital Ayurvedic Flora Rose (Bottom-Left) */}
              <div
                className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-gradient-to-tr from-rose-300/20 via-pink-200/15 to-transparent blur-3xl pointer-events-none transition-transform duration-700 ease-out group-hover/container:scale-105"
                aria-hidden="true"
              />

              {/* 4. Ambient Orb: Royal Ayurvedic Purple & Indigo Mist (Bottom-Right) */}
              <div
                className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-gradient-to-tl from-[#6517a3]/16 via-indigo-200/22 to-transparent blur-3xl pointer-events-none transition-transform duration-700 ease-out group-hover/container:scale-110"
                aria-hidden="true"
              />

              {/* 5. Central Soft Radial Diffuse Light */}
              <div
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.25)_65%,transparent_100%)] pointer-events-none"
                aria-hidden="true"
              />

              {/* 6. Abstract Organic Wave Curves & Subtle Aura Lines (SVGs for bespoke depth) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.24] mix-blend-multiply"
                viewBox="0 0 520 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M-40,110 C110,50 230,170 350,95 C430,45 490,80 560,50"
                  stroke="url(#fade-grad-sage)"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                <path
                  d="M-30,220 C110,290 230,175 370,250 C450,295 510,265 560,240"
                  stroke="url(#fade-grad-saffron)"
                  strokeWidth="1.75"
                />
                <path
                  d="M-50,330 C80,265 200,365 350,300 C430,260 500,310 560,295"
                  stroke="url(#fade-grad-purple)"
                  strokeWidth="1.25"
                />
                <circle
                  cx="260"
                  cy="200"
                  r="170"
                  stroke="url(#fade-grad-sage)"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                  opacity="0.5"
                />
                <circle
                  cx="260"
                  cy="200"
                  r="240"
                  stroke="url(#fade-grad-purple)"
                  strokeWidth="0.8"
                  opacity="0.35"
                />
                <defs>
                  <linearGradient id="fade-grad-sage" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#5b8e46" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#d99136" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#6517a3" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="fade-grad-saffron" x1="1" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#d99136" stopOpacity="0.55" />
                    <stop offset="50%" stopColor="#5b8e46" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient id="fade-grad-purple" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6517a3" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#5b8e46" stopOpacity="0.35" />
                  </linearGradient>
                </defs>
              </svg>

              {/* 7. Glossy Top Glass Shimmer Rim */}
              <div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* === Grid of 6 Interactive Service Tiles === */}
              <div className="relative z-10 grid grid-cols-3 gap-2.5 sm:gap-5 lg:gap-6 text-center">
                {serviceIcons.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={idx}
                      href={`/treatments/${item.slug}`}
                      className="group flex flex-col items-center p-2.5 sm:p-5 rounded-2xl bg-white/55 hover:bg-white/95 border border-white/80 hover:border-white shadow-[0_2px_8px_rgba(24,61,43,0.03)] hover:shadow-[0_14px_28px_-6px_rgba(24,61,43,0.12)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 focus:outline-hidden focus:ring-2 focus:ring-[#5b8e46]/40"
                    >
                      {/* Pastel Circular Icon Holder with soft aura */}
                      <div className="relative">
                        <div
                          className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border shadow-xs group-hover:scale-110 group-hover:shadow-md transition-all duration-300 ${item.bgColor}`}
                        >
                          <Icon className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.2]" />
                        </div>
                      </div>

                      {/* English Label */}
                      <span className="mt-2.5 sm:mt-3 text-[11px] sm:text-[14px] font-bold text-[#183d2b] group-hover:text-[#183d2b] transition-colors leading-tight">
                        {item.title_en}
                      </span>

                      {/* Marathi Label */}
                      <span className="text-[10px] sm:text-xs font-marathi-heading font-medium text-[#6b7280] group-hover:text-[#59846f] mt-0.5 sm:mt-1 transition-colors leading-tight">
                        {item.title_mr}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Benefit From Choosing Text & CTA */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-block">
              <span className="text-xs font-bold uppercase tracking-widest text-[#59846f] bg-[#59846f]/10 px-3.5 py-1.5 rounded-full">
                BEST FOR YOU • आमची वैशिष्ट्ये
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-[#183d2b] leading-[1.2] tracking-tight">
              Benefit From <br />
              <span className="font-display italic text-[#59846f] font-normal">
                Choosing The Best
              </span>
            </h2>

            <p className="font-marathi-heading text-base font-semibold text-[#183d2b]/90">
              आयुर्वेदाची शास्त्रीय तत्त्वे आणि व्यक्तिगत प्रकृतीनुसार दिलेले उपचार आजाराच्या मुळावर काम करतात.
            </p>

            <p className="text-sm text-[#262820]/75 leading-relaxed font-sans">
              At Vijaymangal Ayurved, we do not suppress temporary symptoms. Under the direct supervision of Dr. Supriya S. Kadam, M.D. (Ayurveda), our holistic approach identifies constitutional imbalances (Vata, Pitta, Kapha) and delivers pure, tailored Ayurvedic solutions.
            </p>

            <div className="pt-2">
              <Link
                href="/treatments"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#183d2b] hover:bg-[#254f39] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 text-[#d99136]" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
