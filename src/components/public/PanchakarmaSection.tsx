import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Check, ArrowRight, ShieldAlert, Calendar, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';

export function PanchakarmaSection() {
  const therapies = [
    {
      title: 'स्नेहन व स्वेदन (Oleation & Sudation)',
      tag: 'वातशामक व लवचिकता',
      desc: 'औषधी सिद्ध तेलाने शरीराला मालिश व वाफेचा शेक देऊन सांध्यांची लवचिकता वाढवणे व वातदोष शमविणे.',
    },
    {
      title: 'शिरोधारा (Shirodhara Therapy)',
      tag: 'मानसिक शांती व निद्रा',
      desc: 'कपाळावर औषधी तेल किंवा काढ्याची संतत धार सोडून मानसिक ताण, निद्रानाश, डोकेदुखी व रक्तदाबावर शांतिदायक उपाय.',
    },
    {
      title: 'बस्ति चिकित्सा (Basti Treatment)',
      tag: 'आयुर्वेदातील अमृतोपम चिकित्सा',
      desc: 'आयुर्वेदातील वातरोगांवर सर्वश्रेष्ठ मानली जाणारी औषधी सिद्ध काढ्यांची व तेलांची गुदद्वाराने दिली जाणारी सखोल चिकित्सा.',
    },
    {
      title: 'नस्य व स्थानिक उपक्रम (Nasya & Local Upakramas)',
      tag: 'मणके, मान व सांधे',
      desc: 'सायनस, मान व मणक्यांच्या विकारांसाठी नाकातून औषधी थेंब, तसेच कटीबस्ती, जानूबस्ती यांसारखे अचूक स्थानिक उपचार.',
    },
  ];

  return (
    <section id="panchakarma" className="py-20 sm:py-28 bg-[#faf8f5] border-t border-[#e6dfd3] scroll-mt-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Image Showcase with Glass Card */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <div className="relative h-88 sm:h-96 lg:h-[480px] w-full">
                <Image
                  src="/images/panchakarma.jpg"
                  alt="पंचकर्म व आयुर्वेदिक चिकित्सा कक्ष - विजयमंगल आयुर्वेद, आटपाडी"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#183d2b]/80 via-transparent to-transparent" />
              </div>

              {/* Floating Pill on image */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#e6dfd3] shadow-md flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#d99136]" />
                <span className="text-xs font-bold text-[#183d2b]">Classical Detox Protocols</span>
              </div>

              <div className="absolute bottom-5 inset-x-5 p-5 rounded-2xl glass-panel text-[#183d2b] shadow-lg">
                <p className="text-xs font-bold uppercase tracking-wider text-[#6517a3]">
                  शास्त्रीय शुद्धीकरण व पुनरुज्जीवन
                </p>
                <h4 className="font-marathi-heading font-bold text-base sm:text-lg text-[#183d2b] mt-0.5">
                  पंचकर्म चिकित्सा व त्रिदोष संतुलन कक्ष
                </h4>
                <p className="text-xs text-[#262820]/75 mt-1 font-marathi-heading">
                  डॉ. सुप्रिया कदम यांच्या प्रत्यक्ष मार्गदर्शनाखाली प्रत्येक प्रक्रियेचे नियोजन केले जाते.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Content & Therapies */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#183d2b]/10 text-[#183d2b] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#d99136]" />
              <span>Panchakarma Therapies • शास्त्रीय पंचकर्म</span>
            </div>

            <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b] leading-tight">
              शरीराचे सखोल संतुलन आणि शुद्धीकरणासाठी शास्त्रीय पंचकर्म
            </h2>

            <p className="text-sm sm:text-base text-[#262820]/80 leading-relaxed font-marathi-heading">
              पंचकर्म ही आयुर्वेदातील अशी विशिष्ट शास्त्रोक्त उपचारपद्धती आहे, ज्याद्वारे शरीरातील साचलेले दूषित दोष (टॉक्सिन्स) बाहेर काढून शरीराची रोगप्रतिकारक व चयापचय क्षमता नव्याने पुनरुज्जीवित केली जाते.
            </p>

            {/* List of therapies */}
            <div className="space-y-3 pt-2">
              {therapies.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-[#e6dfd3] shadow-2xs hover:shadow-md hover:border-[#6517a3]/40 transition-all flex items-start gap-3.5 group"
                >
                  <div className="w-6 h-6 rounded-full bg-[#5b8e46]/15 group-hover:bg-[#5b8e46] text-[#5b8e46] group-hover:text-white flex items-center justify-center shrink-0 mt-0.5 transition-colors">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div className="grow">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-marathi-heading font-bold text-sm sm:text-base text-[#183d2b]">
                        {item.title}
                      </h4>
                      <span className="text-[11px] font-semibold text-[#6517a3] bg-[#6517a3]/10 px-2 py-0.5 rounded-full">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#262820]/75 font-marathi-heading mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-xl bg-[#fff6e8] border border-[#d99136]/30 text-xs text-[#262820]/85 flex items-start gap-2.5">
              <ShieldAlert className="w-4 h-4 text-[#d99136] shrink-0 mt-0.5" />
              <span className="font-marathi-heading leading-relaxed">
                <strong>वैद्यकीय सूचना:</strong> कोणती पंचकर्म प्रक्रिया आपल्या शरीरासाठी आवश्यक आहे, हे प्रत्यक्ष नाडी तपासणी व प्रकृती विश्लेषणानंतरच वैद्य निश्चित करतात.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/treatments/panchakarma-consultation"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#6517a3] hover:text-[#490f77] group bg-[#6517a3]/10 px-4 py-2.5 rounded-xl transition-colors"
              >
                <span>पंचकर्म चिकित्सेबाबत सविस्तर माहिती</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/book-appointment?category=panchakarma"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#183d2b] hover:text-[#262820] bg-white border border-[#e6dfd3] px-4 py-2.5 rounded-xl shadow-2xs hover:shadow-xs transition-all"
              >
                <Calendar className="w-4 h-4 text-[#d99136]" />
                <span>Book Panchakarma Evaluation</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
