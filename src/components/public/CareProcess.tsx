import React from 'react';
import Link from 'next/link';
import { CalendarCheck, Stethoscope, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

export function CareProcess() {
  const steps = [
    {
      num: '01',
      title: 'Book Consultation',
      titleMr: 'आपली भेट निश्चित करा',
      description:
        'संकेतस्थळ, दूरध्वनी किंवा WhatsApp द्वारे आपल्या सोयीनुसार सल्लामसलतीची पूर्ववेळ आरक्षित करा.',
      icon: CalendarCheck,
      color: '#6517a3',
      bg: '#f5ebff',
    },
    {
      num: '02',
      title: 'Pulse Diagnosis & History',
      titleMr: 'आरोग्य माहिती व नाडी परीक्षण',
      description:
        'प्रत्यक्ष भेटीमध्ये नाडी परीक्षण, वात-पित्त-कफ प्रकृती परीक्षण आणि भूतकाळातील आरोग्य इतिहास समजून घेणे.',
      icon: Stethoscope,
      color: '#183d2b',
      bg: '#eef6ec',
    },
    {
      num: '03',
      title: 'Custom Formulations & Diet',
      titleMr: 'वैयक्तिक औषधी व पथ्य योजना',
      description:
        'आपल्या प्रकृती व आजारानुसार शुद्ध आयुर्वेदिक औषधोपचार, आहार नियम आणि आवश्यक असल्यास पंचकर्म मार्गदर्शन.',
      icon: Sparkles,
      color: '#d99136',
      bg: '#fff6e8',
    },
    {
      num: '04',
      title: 'Structured Care & Review',
      titleMr: 'नियमित पाठपुरावा व प्रगती',
      description:
        'उपचारांनुसार आवश्यकतेनुसार पुढील भेटी, लक्षणांमधील प्रगतीचे मोजमाप आणि औषधोपचारात वेळोवेळी अनुकूल बदल.',
      icon: RefreshCw,
      color: '#5b8e46',
      bg: '#eef6ec',
    },
  ];

  return (
    <section id="approach" className="py-20 sm:py-28 bg-[#f7f4ea]/60 border-y border-[#e6dfd3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#6517a3] tracking-wider uppercase bg-[#6517a3]/10 px-3.5 py-1.5 rounded-full font-sans">
            Our Clinical Approach • कार्यपद्धती
          </span>
          <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b]">
            वैयक्तिक आयुर्वेदिक काळजीचा ४-टप्प्यांचा प्रवास
          </h2>
          <p className="font-display italic text-base text-[#d99136] font-semibold">
            A 4-Step Personalized Holistic Healing Journey
          </p>
          <p className="text-sm sm:text-base text-[#262820]/75 font-marathi-heading leading-relaxed max-w-2xl mx-auto">
            प्रत्येक रुग्णाची प्रकृती आणि आजाराची कारणे वेगळी असतात. त्यामुळे आम्ही एकाच साच्याचे उपचार न देता वैयक्तिक विश्लेषणावर भर देतो.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="card-luxury relative bg-white rounded-3xl p-7 border border-[#e6dfd3] flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white shadow-xs"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.num}
                    </span>
                    <div
                      className="w-11 h-11 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: step.bg, color: step.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* English & Marathi Titles */}
                  <div className="mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6517a3] block font-sans">
                      {step.title}
                    </span>
                    <h3 className="font-marathi-heading text-lg font-bold text-[#183d2b] mt-0.5">
                      {step.titleMr}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#262820]/80 leading-relaxed font-marathi-heading mt-2">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#e6dfd3]/60 text-[11px] text-[#6b7280] font-sans font-medium flex justify-between items-center">
                  <span>Step {idx + 1} of 4</span>
                  <span className="text-[#5b8e46]">✓ Certified Protocol</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-14 text-center">
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#6517a3] text-white text-sm font-bold hover:bg-[#490f77] transition-all shadow-md hover:shadow-xl active:scale-98"
          >
            <span>Start Your Health Journey (पहिली भेट निश्चित करा)</span>
            <ArrowRight className="w-4 h-4 text-[#d99136]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
