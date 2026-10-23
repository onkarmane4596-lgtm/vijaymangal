import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight, MessageCircle, Sparkles, Activity, ShieldCheck, HeartHandshake } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f7f4ea] via-[#faf8f3] to-white pt-8 pb-16 lg:py-20 border-b border-[#e6dfd3]/60">
      {/* Decorative background glow circles */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#6517a3]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#5b8e46]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#6517a3]/10 border border-[#6517a3]/20 text-[#6517a3] text-xs sm:text-sm font-semibold tracking-wide">
              <Sparkles className="w-4 h-4 text-[#d99136]" />
              <span className="font-marathi-heading">
                शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-marathi-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#183d2b] leading-[1.25] tracking-tight">
              आपल्या आरोग्याच्या प्रवासात{' '}
              <span className="text-[#6517a3]">वैयक्तिक आयुर्वेदिक मार्गदर्शन</span>
            </h1>

            {/* Sub-description */}
            <p className="text-base sm:text-lg text-[#262820]/80 leading-relaxed max-w-2xl font-marathi-heading">
              आयुर्वेदिक औषधोपचार, पंचकर्म चिकित्सा आणि आपल्या प्रकृतीनुसार आरोग्यविषयक गरजांसाठी विजयमंगल आयुर्वेदाशी संपर्क साधा. नैसर्गिक आणि शास्त्रोक्त पद्धतीने आरोग्याची निगा.
            </p>

            {/* Practitioner verified badge */}
            <div className="p-4 rounded-xl bg-white/90 border border-[#e6dfd3] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-xl">
              <div>
                <div className="text-xs font-semibold text-[#5b8e46] uppercase tracking-wider">
                  तज्ज्ञ वैद्य (Consulting Ayurvedic Physician)
                </div>
                <div className="font-marathi-heading font-bold text-lg text-[#183d2b]">
                  डॉ. सुप्रिया श्रीप्रसाद कदम
                </div>
                <div className="text-xs font-medium text-[#6517a3]">
                  एम. डी. (आयुर्वेद) — आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा
                </div>
              </div>
              <div className="text-xs px-2.5 py-1 rounded-md bg-[#5b8e46]/10 text-[#183d2b] font-semibold border border-[#5b8e46]/20">
                आटपाडी क्लिनिक
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#6517a3] to-[#490f77] hover:from-[#490f77] hover:to-[#6517a3] rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98"
              >
                <Calendar className="w-5 h-5" />
                <span>अपॉइंटमेंट बुक करा</span>
              </Link>

              <Link
                href="/treatments"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-base font-semibold text-[#183d2b] bg-white hover:bg-[#f7f4ea] border border-[#e6dfd3] rounded-xl shadow-xs hover:border-[#6517a3]/40 transition-all"
              >
                <span>उपचार व सेवा पहा</span>
                <ArrowRight className="w-4 h-4 text-[#6517a3]" />
              </Link>

              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-base font-semibold text-[#075e54] bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/40 rounded-xl transition-all"
              >
                <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* 4 Feature Highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-[#e6dfd3]/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#5b8e46]/15 flex items-center justify-center text-[#5b8e46] shrink-0">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#183d2b] font-marathi-heading">
                  आयुर्वेदिक सल्ला
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#6517a3]/15 flex items-center justify-center text-[#6517a3] shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#183d2b] font-marathi-heading">
                  वैयक्तिक मार्गदर्शन
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#d99136]/15 flex items-center justify-center text-[#d99136] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#183d2b] font-marathi-heading">
                  आयुर्वेद औषधोपचार
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#183d2b]/15 flex items-center justify-center text-[#183d2b] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-[#183d2b] font-marathi-heading">
                  पंचकर्म चिकित्सा
                </span>
              </div>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative border frame */}
              <div className="absolute -inset-3 rounded-2xl bg-gradient-to-tr from-[#6517a3]/20 via-[#d99136]/20 to-[#5b8e46]/20 transform rotate-1 blur-xs" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <div className="relative h-80 sm:h-96 lg:h-[440px] w-full">
                  <Image
                    src="/images/hero-apothecary.jpg"
                    alt="विजयमंगल आयुर्वेद क्लिनिक व औषधालय"
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                </div>

                {/* Overlaid Banner at bottom of image */}
                <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                  <div className="inline-block px-2.5 py-1 rounded bg-[#d99136] text-black text-xs font-bold uppercase tracking-wider mb-2">
                    पारंपरिक शास्त्रोक्त आयुर्वेद
                  </div>
                  <h3 className="font-marathi-heading text-lg sm:text-xl font-bold">
                    शुद्ध औषधी घटक व वैयक्तिक प्रकृती विश्लेषण
                  </h3>
                  <p className="text-xs text-white/90 mt-1 font-marathi-heading">
                    स्थानिक रुग्णांच्या सुलभतेसाठी आटपाडी येथे नियमित सल्लामसलत उपलब्ध.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
