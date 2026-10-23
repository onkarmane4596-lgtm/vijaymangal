import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Check, ArrowRight, ShieldAlert } from 'lucide-react';

export function PanchakarmaSection() {
  const therapies = [
    {
      title: 'स्नेहन व स्वेदन (Oleation & Sudation)',
      desc: 'औषधी सिद्ध तेलाने शरीराला मॉलिश व वाफेचा शेक देऊन सांध्यांची लवचिकता व वातदोष शमविणे.',
    },
    {
      title: 'शिरोधारा (Shirodhara)',
      desc: 'कपाळावर औषधी तेल किंवा काढ्याची संतत धार सोडून मानसिक ताण, निद्रानाश व डोकेदुखीवर शांतिदायक उपाय.',
    },
    {
      title: 'बस्ति चिकित्सा (Basti Therapy)',
      desc: 'आयुर्वेदातील वातरोगांवर सर्वश्रेष्ठ मानली जाणारी औषधी सिद्ध काढ्यांची व तेलांची गुदद्वाराने दिली जाणारी चिकित्सा.',
    },
    {
      title: 'नस्य व इतर स्थानिक उपक्रम (Nasya & Local Upakramas)',
      desc: 'सायनस, मान व मणक्यांच्या विकारांसाठी नाकातून औषधी थेंब, कटीबस्ती, जानूबस्ती यांसारखे स्थानिक उपचार.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] border-t border-[#e6dfd3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Image */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <div className="relative h-80 sm:h-96 lg:h-[460px] w-full">
                <Image
                  src="/images/panchakarma.jpg"
                  alt="पंचकर्म व आयुर्वेदिक चिकित्सा कक्ष - विजयमंगल आयुर्वेद"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-white/95 backdrop-blur-xs text-[#183d2b] shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-[#6517a3]">
                  शास्त्रीय शुद्धीकरण
                </p>
                <h4 className="font-marathi-heading font-bold text-sm sm:text-base">
                  पंचकर्म चिकित्सा व आरोग्य संवर्धन
                </h4>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183d2b]/10 text-[#183d2b] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#d99136]" />
              <span>आयुर्वेद औषधोपचार व पंचकर्म</span>
            </div>

            <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b] leading-tight">
              शरीराचे संतुलन आणि शुद्धीकरणासाठी शास्त्रीय पंचकर्म
            </h2>

            <p className="text-sm sm:text-base text-[#262820]/80 leading-relaxed font-marathi-heading">
              पंचकर्म ही आयुर्वेदातील अशी विशेष उपचारपद्धती आहे, ज्याद्वारे शरीरातील साचलेले दूषित दोष (टॉक्सिन्स) बाहेर काढून शरीराची रोगप्रतिकारक क्षमता नव्याने पुनरुज्जीवित केली जाते.
            </p>

            <div className="space-y-3 pt-2">
              {therapies.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-white border border-[#e6dfd3] shadow-2xs flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-[#5b8e46]/15 flex items-center justify-center text-[#5b8e46] shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <h4 className="font-marathi-heading font-bold text-sm text-[#183d2b]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#6b7280] font-marathi-heading mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-[#fff6e8] border border-[#d99136]/30 text-xs text-[#262820]/80 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-[#d99136] shrink-0 mt-0.5" />
              <span>
                टीप: कोणती पंचकर्म प्रक्रिया आवश्यक आहे, हे प्रत्यक्ष वैद्यकीय तपासणीनंतरच निश्चित केले जाते. सर्व प्रक्रिया प्रत्येक व्यक्तीसाठी लागू नसतात.
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/treatments/panchakarma-consultation"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#6517a3] hover:text-[#490f77] group"
              >
                <span>पंचकर्म चिकित्सेबाबत अधिक माहिती वाचा</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
