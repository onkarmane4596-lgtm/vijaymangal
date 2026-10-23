import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Award, CheckCircle2, HeartHandshake } from 'lucide-react';

export function PractitionerSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#faf8f5] to-[#f5ebff]/40 rounded-3xl border border-[#e6dfd3] p-8 sm:p-12 lg:p-16 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Practitioner Crest & Visual */}
            <div className="lg:col-span-5 text-center flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-[#6517a3] shadow-lg bg-white p-2">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/logo.jpg"
                    alt="डॉ. सुप्रिया श्रीप्रसाद कदम - विजयमंगल आयुर्वेद"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 space-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-[#183d2b] text-[#f7f4ea] text-xs font-semibold">
                  मुख्य सल्लागार वैद्य
                </span>
                <h3 className="font-marathi-heading text-2xl font-bold text-[#183d2b]">
                  डॉ. सुप्रिया श्रीप्रसाद कदम
                </h3>
                <p className="text-sm font-semibold text-[#6517a3]">
                  एम. डी. (आयुर्वेद)
                </p>
                <p className="text-xs text-[#6b7280]">
                  आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा
                </p>
              </div>
            </div>

            {/* Right: Philosophy & Approach */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#5b8e46] uppercase tracking-wider">
                <Award className="w-4 h-4 text-[#5b8e46]" />
                <span>तज्ज्ञ वैद्यकीय दृष्टिकोन (Clinical Philosophy)</span>
              </div>

              <h2 className="font-marathi-heading text-2xl sm:text-3xl font-bold text-[#183d2b] leading-snug">
                आपल्या आरोग्यासाठी संवेदनशील आणि वैयक्तिक मार्गदर्शन
              </h2>

              <blockquote className="border-l-4 border-[#d99136] pl-4 italic text-sm sm:text-base text-[#262820]/80 font-marathi-heading">
                &ldquo;शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प.&rdquo;
              </blockquote>

              <p className="text-sm sm:text-base text-[#262820]/75 leading-relaxed font-marathi-heading">
                आयुर्वेद ही केवळ तात्पुरती लक्षणे शमवणारी प्रणाली नसून, शरीरातील वात, पित्त आणि कफ या त्रिदोषांचे संतुलन साधून आजाराच्या मूळ कारणाचा शोध घेणारे शास्त्र आहे. विजयमंगल आयुर्वेद, आटपाडी येथे प्रत्येक रुग्णाच्या सवयी, दिनचर्या, मानसिक स्थिती व नाडीपरीक्षणाद्वारे योग्य मार्गदर्शन केले जाते.
              </p>

              {/* Approach Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-sm text-[#262820]/85 font-marathi-heading">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                  <span>पारंपरिक नाडी परीक्षा व प्रकृती विश्लेषण</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-[#262820]/85 font-marathi-heading">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                  <span>वैयक्तिक गरजेनुसार शुद्ध औषधी योजना</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-[#262820]/85 font-marathi-heading">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                  <span>पथ्य-अपथ्य व आहार-विहार मार्गदर्शन</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-[#262820]/85 font-marathi-heading">
                  <CheckCircle2 className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                  <span>आवश्यकतेनुसार पंचकर्म व पुनर्वसन सल्ला</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/book-appointment"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#183d2b] text-[#f7f4ea] hover:bg-[#262820] text-sm font-semibold transition-all shadow-xs"
                >
                  <Calendar className="w-4 h-4 text-[#d99136]" />
                  <span>डॉ. सुप्रिया कदम यांच्याशी सल्लामसलत बुक करा</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
