'use client';

import React from 'react';
import { Award, ShieldCheck, HeartPulse, Droplets, Sparkles, Stethoscope, CheckCircle2 } from 'lucide-react';

export function WhyChooseStrip() {
  const features = [
    {
      title_en: '100% Pure Herbs',
      title_mr: 'शंभर टक्के शुद्ध औषधी',
      desc: 'No adulteration. Classical decoctions and medicated oils from genuine botanical sources.',
      badge: '100%',
    },
    {
      title_en: 'Nadi Parikshan',
      title_mr: 'पारंपरिक नाडी परीक्षा',
      desc: 'In-depth assessment of Vata, Pitta, and Kapha constitution and root causal factors.',
      badge: 'नाडी',
    },
    {
      title_en: 'M.D. Ayurveda Care',
      title_mr: 'तज्ज्ञ डॉक्टरांचे मार्गदर्शन',
      desc: 'Direct consultation and treatment planning by Dr. Supriya Shreeprasad Kadam, M.D.',
      badge: 'M.D.',
    },
    {
      title_en: 'Classical Panchakarma',
      title_mr: 'शास्त्रीय पंचकर्म चिकित्सा',
      desc: 'Specialized detoxification protocols including Snehan, Swedan, Basti, and Shirodhara.',
      badge: 'डिटॉक्स',
    },
  ];

  return (
    <section className="py-20 bg-[#faf8f5] border-b border-[#e6dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        
        {/* Centered Heading */}
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-[#59846f] bg-[#59846f]/10 px-3.5 py-1.5 rounded-full inline-block">
            AUTHENTIC STANDARDS • आमची तत्त्वे
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#183d2b] tracking-tight">
            Why Choose Pure Ayurveda
          </h2>
          <p className="text-sm sm:text-base text-[#262820]/75 font-marathi-heading">
            विजयमंगल आयुर्वेद, आटपाडी येथे निष्णात आयुर्वेदाचार्यांकडून शास्त्रीय, सुरक्षित आणि खात्रीशीर उपचार.
          </p>
        </div>

        {/* 4 Feature Cards (matching theme architecture) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white border border-[#e6dfd3] hover:border-[#59846f] hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Circular outline badge icon holder */}
              <div className="w-16 h-16 rounded-full border-2 border-[#59846f] bg-[#59846f]/5 group-hover:bg-[#59846f] group-hover:text-white text-[#59846f] flex items-center justify-center font-bold text-sm transition-all duration-300 mb-5 shadow-2xs">
                {feat.badge}
              </div>

              <h3 className="font-bold text-base text-[#183d2b] group-hover:text-[#59846f] transition-colors">
                {feat.title_en}
              </h3>
              
              <p className="text-xs font-semibold text-[#59846f] font-marathi-heading mt-1">
                {feat.title_mr}
              </p>

              <p className="text-xs text-[#262820]/75 mt-3 leading-relaxed font-sans">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
