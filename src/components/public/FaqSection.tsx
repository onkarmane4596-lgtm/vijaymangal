'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqs = [
    {
      category: 'appointments',
      qEn: 'How do I book an Ayurvedic consultation?',
      q: 'आयुर्वेदिक सल्ल्यासाठी अपॉइंटमेंट कशी घ्यावी?',
      a: 'आपण संकेतस्थळावरील "Book Appointment" या बटनावर क्लिक करून आपले नाव, फोन नंबर व सोयीची वेळ पाठवू शकता. तसेच आपण थेट +91 8263902142 या क्रमांकावर फोन करून किंवा WhatsApp संदेश पाठवूनही भेट निश्चित करू शकता.',
    },
    {
      category: 'documents',
      qEn: 'What medical documents should I bring for my visit?',
      q: 'भेटीसाठी कोणती माहिती व कागदपत्रे सोबत आणावीत?',
      a: 'आपल्याकडे पूर्वीच्या वैद्यकीय तपासण्यांचे अहवाल (उदा. रक्त तपासणी, एक्स-रे, एमआरआय, सोनोग्राफी) किंवा सुरू असलेली अ‍ॅलोपॅथिक औषधांची यादी असल्यास सोबत अवश्य आणावी. यामुळे आजाराचा पूर्वइतिहास समजून घेणे व पूरक औषधी ठरवणे सुलभ होते.',
    },
    {
      category: 'treatment',
      qEn: 'How is the treatment duration determined?',
      q: 'उपचारांचा कालावधी कसा ठरवला जातो?',
      a: 'आजाराचे स्वरूप (नवीन की जुनाट), रुग्णाचे वय, पचनशक्ती आणि दोषांची विषमता यांवरून वैद्य उपचारांचा कालावधी ठरवतात. प्राथमिक त्रासांसाठी १ महिना तर जुनाट सांधेदुखी किंवा मणक्यांच्या विकारांसाठी ३ ते ४ महिन्यांचा नियोजनबद्ध कोर्स सुचवला जातो.',
    },
    {
      category: 'medicines',
      qEn: 'How are individualized preparations decided?',
      q: 'वैयक्तिक औषधोपचार कसे ठरवले जातात?',
      a: 'आयुर्वेदात "पुरुषं पुरुषं वीक्ष्य" म्हणजे प्रत्येक व्यक्तीची प्रकृती वेगळी मानली जाते. नाडी परीक्षण आणि लक्षणांची सविस्तर नोंद घेऊन डॉ. सुप्रिया कदम प्रत्येक रुग्णासाठी विशिष्ट घटक आणि प्रमाणासह औषधी योजना निश्चित करतात.',
    },
    {
      category: 'treatment',
      qEn: 'How is a follow-up visit scheduled?',
      q: 'पुढील भेट (Follow-up) कशी निश्चित करावी?',
      a: 'प्रत्येक तपासणीनंतर पुढील भेटीची तारीख आपल्या प्रिस्क्रिप्शनमध्ये नमूद केली जाते. क्लिनिकतर्फे आपल्या पुढील भेटीबाबत संपर्क साधून उपलब्ध वेळेनुसार भेट अंतिम केली जाते.',
    },
    {
      category: 'appointments',
      qEn: 'Can I directly consult on WhatsApp?',
      q: 'WhatsApp वर संपर्क कसा साधावा?',
      a: 'संकेतस्थळावरील "WhatsApp" बटनावर क्लिक केल्यास थेट क्लिनिकच्या अधिकृत नंबरवर (+91 8263902142) संदेश पाठवता येतो. आपण क्लिनिकच्या कामकाजाच्या वेळेत त्वरित मार्गदर्शन मिळवू शकता.',
    },
  ];

  const categories = [
    { id: 'all', label: 'All FAQs (सर्व प्रश्न)' },
    { id: 'appointments', label: 'Appointments (अपॉइंटमेंट)' },
    { id: 'treatment', label: 'Treatment & Follow-ups (उपचार कालावधी)' },
    { id: 'medicines', label: 'Medicines & Formulations (औषधोपचार)' },
  ];

  const filteredFaqs = faqs.filter(
    (f) => activeCategory === 'all' || f.category === activeCategory
  );

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#faf8f5] border-t border-[#e6dfd3] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5b8e46]/10 text-[#183d2b] text-xs font-bold uppercase tracking-wider font-sans">
            <HelpCircle className="w-4 h-4 text-[#5b8e46]" />
            <span>Frequently Asked Questions • शंकांचे निरसन</span>
          </div>

          <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b]">
            आरोग्य सल्ला व क्लिनिकविषयी सामान्य प्रश्न
          </h2>

          <p className="font-display italic text-sm sm:text-base text-[#d99136] font-semibold">
            Common Patient Questions Regarding Consultations & Follow-ups
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setOpenIndex(0);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#6517a3] text-white shadow-xs'
                  : 'bg-white text-[#6b7280] border border-[#e6dfd3] hover:bg-gray-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="card-luxury rounded-2xl border border-[#e6dfd3] bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors focus:outline-hidden cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="pr-4">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6517a3] font-sans block mb-1">
                      {faq.qEn}
                    </span>
                    <span className="font-marathi-heading font-bold text-base sm:text-lg text-[#183d2b]">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#6517a3] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#262820]/80 leading-relaxed font-marathi-heading border-t border-[#f1ede5] bg-[#faf8f5]/60">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Note */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-[#e6dfd3] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-sm text-[#183d2b]">
              Have a specific medical or treatment question?
            </h4>
            <p className="text-xs text-[#6b7280] font-marathi-heading">
              आपल्या प्रश्नांसाठी आमच्या क्लिनिकशी थेट WhatsApp वर संवाद साधा.
            </p>
          </div>
          <a
            href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-all shadow-xs shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Ask on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
