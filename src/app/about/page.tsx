import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { Award, CheckCircle2, HeartHandshake, ShieldCheck, Sparkles, Calendar } from 'lucide-react';

export const metadata: Metadata = {
  title: 'आमच्याविषयी (About Clinic) | डॉ. सुप्रिया कदम',
  description:
    'विजयमंगल आयुर्वेद, आटपाडी. डॉ. सुप्रिया श्रीप्रसाद कदम, एम. डी. (आयुर्वेद). शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा संकल्प. आमची तत्त्वप्रणाली व कार्यपद्धती.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Header />

      <main className="grow py-12 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#6517a3]/10 text-[#6517a3] text-xs font-bold uppercase tracking-wider">
              आमची ओळख व तत्त्वप्रणाली (About Us)
            </span>
            <h1 className="font-marathi-heading text-3xl sm:text-5xl font-bold text-[#183d2b]">
              विजयमंगल आयुर्वेद, आटपाडी
            </h1>
            <p className="text-base sm:text-lg text-[#262820]/80 font-marathi-heading leading-relaxed">
              शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प.
            </p>
          </div>

          {/* Section 1: Clinic & Philosophy */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e6dfd3] shadow-xs space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#5b8e46]/10 text-[#5b8e46] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-marathi-heading text-2xl font-bold text-[#183d2b]">
                आमचा वैधानिक आणि वैद्यकीय संकल्प
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#262820]/80 font-marathi-heading leading-relaxed">
              विजयमंगल आयुर्वेद ही आटपाडी (जि. सांगली) येथील अग्रगण्य व विश्वासार्ह आयुर्वेदिक चिकित्सा संस्था आहे. आयुर्वेदाची मूळ संहिता, चरक आणि सुश्रुत संहितेतील शास्त्रीय सिद्धांतांवर आधारित औषधोपचार आणि पंचकर्म पद्धती सर्वसामान्यांपर्यंत सहज उपलब्ध करणे हे आमचे मुख्य ध्येय आहे.
            </p>

            <p className="text-sm sm:text-base text-[#262820]/80 font-marathi-heading leading-relaxed">
              आम्ही केवळ तात्पुरते आजार दडपण्याऐवजी, त्रिदोषांचे (वात, पित्त, कफ) मूळ असंतुलन शोधून त्यावर शास्त्रोक्त आणि सुरक्षित उपाययोजना करतो.
            </p>
          </div>

          {/* Section 2: Practitioner Profile */}
          <div className="bg-gradient-to-br from-[#faf8f5] to-[#f5ebff]/40 rounded-3xl p-8 sm:p-12 border border-[#6517a3]/20 shadow-xs">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 text-center">
                <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-[#6517a3] shadow-md bg-white">
                  <Image
                    src="/images/logo.jpg"
                    alt="डॉ. सुप्रिया श्रीप्रसाद कदम"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-marathi-heading font-bold text-xl text-[#183d2b] mt-4">
                  डॉ. सुप्रिया श्रीप्रसाद कदम
                </h3>
                <p className="text-xs font-semibold text-[#6517a3]">
                  एम. डी. (आयुर्वेद)
                </p>
                <p className="text-xs text-[#6b7280]">
                  आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा
                </p>
              </div>

              <div className="md:col-span-8 space-y-4">
                <h3 className="font-marathi-heading text-xl font-bold text-[#183d2b]">
                  तज्ज्ञ सल्ला व प्रकृती परीक्षण
                </h3>
                <p className="text-sm text-[#262820]/80 font-marathi-heading leading-relaxed">
                  डॉ. सुप्रिया कदम यांच्याकडे आयुर्वेद पदव्युत्तर शिक्षण (एम. डी. आयुर्वेद) असून, विविध जुनाट आणि किचकट व्याधींवर सखोल अभ्यासाद्वारे वैयक्तिक मार्गदर्शन केले जाते.
                </p>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-sm text-[#262820]/85 font-marathi-heading">
                    <CheckCircle2 className="w-4 h-4 text-[#5b8e46]" />
                    <span>पारंपरिक नाडी परीक्षा व अचूक दोष निदान</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#262820]/85 font-marathi-heading">
                    <CheckCircle2 className="w-4 h-4 text-[#5b8e46]" />
                    <span>वैयक्तिक गरजेनुसार औषधी योजना व मात्रा नियोजन</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#262820]/85 font-marathi-heading">
                    <CheckCircle2 className="w-4 h-4 text-[#5b8e46]" />
                    <span>महिलांचे आरोग्य, PCOS व गर्भसंस्कारासाठी संवेदनशील सल्ला</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Safe Healthcare & Disclaimer */}
          <div className="bg-white rounded-3xl p-8 border border-[#e6dfd3] space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-[#d99136] uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5 text-[#d99136]" />
              <span>वैद्यकीय नैतिकता व सुरक्षितता वचनबद्धता</span>
            </div>
            <p className="text-xs sm:text-sm text-[#262820]/80 font-marathi-heading leading-relaxed">
              विजयमंगल आयुर्वेद येथे कोणत्याही प्रकारच्या खोट्या किंवा अवास्तव यशाच्या हमींचे (Guaranteed Cures) दावे केले जात नाहीत. आयुर्वेदीय तत्त्वांना अनुसरून शरीराची स्वतःची रोगप्रतिकार आणि पुनरुज्जीवन क्षमता नैसर्गिकरित्या वाढवण्यावर भर दिला जातो. गंभीर वा तातडीच्या आणीबाणीमध्ये रुग्णाला योग्य वैद्यकीय मार्गदर्शन दिले जाते.
            </p>
          </div>

          {/* CTA Banner */}
          <div className="text-center pt-4">
            <Link
              href="/book-appointment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#6517a3] hover:bg-[#490f77] text-white font-semibold text-sm shadow-md transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>क्लिनिकमध्ये भेट आरक्षित करा</span>
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
