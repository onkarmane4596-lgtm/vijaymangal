'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'आयुर्वेदिक सल्ल्यासाठी अपॉइंटमेंट कशी घ्यावी?',
      a: 'आपण संकेतस्थळावरील "अपॉइंटमेंट बुक करा" या बटनावर क्लिक करून आपले नाव, फोन नंबर व सोयीची वेळ पाठवू शकता. तसेच आपण थेट +91 8263902142 या क्रमांकावर फोन करून किंवा WhatsApp संदेश पाठवूनही भेट निश्चित करू शकता.',
    },
    {
      q: 'भेटीसाठी कोणती माहिती व कागदपत्रे सोबत आणावीत?',
      a: 'आपल्याकडे पूर्वीच्या वैद्यकीय तपासण्यांचे अहवाल (उदा. रक्त तपासणी, एक्स-रे, सोनोग्राफी) किंवा सुरू असलेली अ‍ॅलोपॅथिक औषधांची यादी असल्यास सोबत अवश्य आणावी. यामुळे आपल्या आजाराचा पूर्वइतिहास समजून घेणे सुलभ होते.',
    },
    {
      q: 'उपचारांचा कालावधी कसा ठरवला जातो?',
      a: 'आजाराचे स्वरूप (नवीन की जुनाट), रुग्णाचे वय, पचनशक्ती आणि दोषांची विषमता यांवरून वैद्य उपचारांचा कालावधी ठरवतात. प्राथमिक त्रासांसाठी १ महिना तर जुनाट सांधेदुखी किंवा मणक्यांच्या विकारांसाठी ३ ते ४ महिन्यांचा नियोजनबद्ध कोर्स सुचवला जातो.',
    },
    {
      q: 'वैयक्तिक औषधोपचार कसे ठरवले जातात?',
      a: 'आयुर्वेदात "पुरुषं पुरुषं वीक्ष्य" म्हणजे प्रत्येक व्यक्तीची प्रकृती वेगळी मानली जाते. नाडी परीक्षण आणि लक्षणांची सविस्तर नोंद घेऊन डॉ. सुप्रिया कदम प्रत्येक रुग्णासाठी विशिष्ट घटक आणि प्रमाणासह औषधी योजना निश्चित करतात.',
    },
    {
      q: 'पुढील भेट (Follow-up) कशी निश्चित करावी?',
      a: 'प्रत्येक तपासणीनंतर पुढील भेटीची तारीख आपल्या प्रिस्क्रिप्शनमध्ये नमूद केली जाते. क्लिनिकतर्फे आपल्या पुढील भेटीबाबत संपर्क साधून वेळ निश्चित केली जाते.',
    },
    {
      q: 'WhatsApp वर संपर्क कसा साधावा?',
      a: 'संकेतस्थळावरील "WhatsApp" बटनावर क्लिक केल्यास थेट क्लिनिकच्या अधिकृत नंबरवर (+91 8263902142) संदेश पाठवता येतो. आपण क्लिनिकच्या कामकाजाच्या वेळेत त्वरित मार्गदर्शन मिळवू शकता.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#faf8f5] border-t border-[#e6dfd3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5b8e46]/10 text-[#183d2b] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#5b8e46]" />
            <span>वारंवार विचारले जाणारे प्रश्न (FAQ)</span>
          </div>
          <h2 className="font-marathi-heading text-2xl sm:text-3xl font-bold text-[#183d2b]">
            आरोग्य सल्ला व क्लिनिकविषयी शंकांचे निरसन
          </h2>
          <p className="text-sm text-[#262820]/75 font-marathi-heading">
            आपल्या मनातील सामान्य प्रश्नांची उत्तरे खाली दिली आहेत. अधिक माहितीसाठी थेट संपर्क साधावा.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#e6dfd3] bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-marathi-heading font-bold text-base sm:text-lg text-[#183d2b] hover:text-[#6517a3] transition-colors focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6517a3] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-[#262820]/80 leading-relaxed font-marathi-heading border-t border-[#f1ede5] bg-[#faf8f5]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
