import React from 'react';
import Link from 'next/link';
import { CalendarCheck, Stethoscope, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';

export function CareProcess() {
  const steps = [
    {
      num: '१',
      title: 'आपली भेट निश्चित करा',
      description: 'संकेतस्थळ, दूरध्वनी किंवा WhatsApp द्वारे आपल्या सोयीनुसार सल्लामसलतीची पूर्ववेळ आरक्षित करा.',
      icon: CalendarCheck,
      color: '#6517a3',
      bg: '#f5ebff',
    },
    {
      num: '२',
      title: 'आरोग्य माहिती व नाडी परीक्षण',
      description: 'प्रत्यक्ष भेटीमध्ये नाडी परीक्षण, वात-पित्त-कफ प्रकृती परीक्षण आणि जीवनशैलीचा सर्वसमावेशक अभ्यास.',
      icon: Stethoscope,
      color: '#183d2b',
      bg: '#eef6ec',
    },
    {
      num: '३',
      title: 'वैयक्तिक औषधी व पथ्य योजना',
      description: 'आपल्या प्रकृती व आजारानुसार शुद्ध आयुर्वेदिक औषधोपचार, आहार नियम आणि आवश्यक असल्यास पंचकर्म मार्गदर्शन.',
      icon: Sparkles,
      color: '#d99136',
      bg: '#fff6e8',
    },
    {
      num: '४',
      title: 'नियमित पाठपुरावा व प्रगती',
      description: 'उपचारांनुसार आवश्यकतेनुसार पुढील भेटी, लक्षणांमधील प्रगतीचे मोजमाप आणि औषधोपचारात वेळोवेळी अनुकूल बदल.',
      icon: RefreshCw,
      color: '#5b8e46',
      bg: '#eef6ec',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#f7f4ea]/60 border-y border-[#e6dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-[#6517a3] tracking-wider uppercase bg-[#6517a3]/10 px-3 py-1 rounded-full">
            उपचार पद्धती (Our Approach)
          </span>
          <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b]">
            वैयक्तिक आयुर्वेदिक काळजीचा ४-टप्प्यांचा प्रवास
          </h2>
          <p className="text-sm sm:text-base text-[#262820]/75 font-marathi-heading">
            प्रत्येक रुग्णाची प्रकृती आणि आजाराची कारणे वेगळी असतात. त्यामुळे आम्ही एकाच साच्याचे उपचार न देता वैयक्तिक विश्लेषणावर भर देतो.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 border border-[#e6dfd3] shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-marathi-heading font-bold text-lg text-white shadow-xs"
                      style={{ backgroundColor: step.color }}
                    >
                      {step.num}
                    </span>
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: step.bg, color: step.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-marathi-heading text-lg font-bold text-[#183d2b] mb-2">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-[#262820]/75 leading-relaxed font-marathi-heading">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#e6dfd3]/60 text-[11px] text-[#6b7280]">
                  टप्पा {idx + 1} ऑफ ४
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 text-center">
          <Link
            href="/book-appointment"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#6517a3] text-white text-sm font-semibold hover:bg-[#490f77] transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            <span>आपली पहिली भेट आजच निश्चित करा</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
