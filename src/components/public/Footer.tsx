'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, MessageCircle, ShieldCheck, Heart } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';

export function Footer() {
  return (
    <footer className="bg-[#183d2b] text-[#f7f4ea] pt-16 pb-12 border-t-4 border-[#d99136]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Clinic Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#d99136] bg-white shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="विजयमंगल आयुर्वेद"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-marathi-heading font-bold text-xl text-[#f7f4ea]">
                  विजयमंगल आयुर्वेद
                </h3>
                <p className="text-xs text-[#d99136] font-medium">
                  Vijaymangal Ayurved, Atpadi
                </p>
              </div>
            </div>

            <p className="text-sm text-[#f7f4ea]/80 leading-relaxed font-marathi-heading">
              शास्त्रोक्त आयुर्वेद समाजापर्यंत पोहोचविण्याचा वचनबद्ध संकल्प. आपल्या आरोग्याच्या प्रवासात वैयक्तिक व सुरक्षित मार्गदर्शन.
            </p>

            <div className="pt-2">
              <div className="text-sm font-semibold text-white">
                डॉ. सुप्रिया श्रीप्रसाद कदम
              </div>
              <div className="text-xs text-[#d99136]">
                एम. डी. (आयुर्वेद) — आयुर्वेद औषधोपचार व पंचकर्म चिकित्सा
              </div>
            </div>
          </div>

          {/* Col 2: Services Directory */}
          <div className="space-y-3">
            <h4 className="font-marathi-heading font-semibold text-base text-[#d99136] tracking-wide">
              उपचार व सेवा (Treatments)
            </h4>
            <ul className="space-y-2 text-sm text-[#f7f4ea]/80">
              <li>
                <Link href="/treatments/joint-health" className="hover:text-white transition-colors">
                  सांधे, हाडे आणि मणक्यांचे विकार
                </Link>
              </li>
              <li>
                <Link href="/treatments/metabolic-health" className="hover:text-white transition-colors">
                  वजन आणि चयापचय व्यवस्थापन
                </Link>
              </li>
              <li>
                <Link href="/treatments/digestive-health" className="hover:text-white transition-colors">
                  पचनसंस्था व आम्लपित्त मार्गदर्शन
                </Link>
              </li>
              <li>
                <Link href="/treatments/womens-health" className="hover:text-white transition-colors">
                  महिलांचे आरोग्य व गर्भसंस्कार
                </Link>
              </li>
              <li>
                <Link href="/treatments/mental-wellness" className="hover:text-white transition-colors">
                  मानसिक स्वास्थ्य व लहान मुलांचे कल्याण
                </Link>
              </li>
              <li>
                <Link href="/treatments/panchakarma-consultation" className="hover:text-white transition-colors">
                  नाडी परीक्षण व पंचकर्म चिकित्सा
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Timings */}
          <div className="space-y-3">
            <h4 className="font-marathi-heading font-semibold text-base text-[#d99136] tracking-wide">
              क्लिनिक संपर्क व वेळ
            </h4>
            <div className="space-y-2.5 text-sm text-[#f7f4ea]/85">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#d99136] shrink-0 mt-0.5" />
                <span>मेन रोड, पोस्ट ऑफिससमोर, विठ्ठल रुक्मिणी मंदिराजवळ, आटपाडी, जि. सांगली, महाराष्ट्र</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#d99136] shrink-0" />
                <a href={`tel:+91${CLINIC_PHONE}`} className="hover:underline">
                  +91 82639 02142
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#d99136] shrink-0 mt-0.5" />
                <div>
                  <p>सकाळी ९:०० ते दु. १:००</p>
                  <p>सायं. ४:०० ते रात्री ८:००</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba59] transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp थेट संपर्क</span>
              </a>
            </div>
          </div>

          {/* Col 4: Important Medical Notice */}
          <div className="space-y-3 bg-black/20 p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#d99136] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#d99136]" />
              <span>वैद्यकीय सूचना (Medical Advisory)</span>
            </div>
            <p className="text-xs text-[#f7f4ea]/75 leading-relaxed font-marathi-heading">
              या संकेतस्थळावरील माहिती केवळ आरोग्यविषयक जनजागृती व माहितीसाठी आहे. कोणत्याही औषधोपचारापूर्वी प्रत्यक्ष नाडी तपासणी व डॉक्टरांचा सल्ला घेणे आवश्यक आहे.
            </p>
            <p className="text-xs text-[#f7f4ea]/75 leading-relaxed">
              आपत्कालीन किंवा तीव्र लक्षणांमध्ये (उदा. तीव्र छातीत दुखणे, पक्षाघाताची लक्षणे, श्वास घेण्यास अडथळा) तात्काळ नजीकच्या आधुनिक आपत्कालीन रुग्णालयात संपर्क साधावा.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#f7f4ea]/60">
          <p>© 2026 विजयमंगल आयुर्वेद. सर्व हक्क सुरक्षित (All Rights Reserved).</p>
          
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              गोपनीयता धोरण (Privacy)
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              नियम व अटी (Terms)
            </Link>
            <Link href="/login" className="hover:text-[#d99136] transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Internal Staff Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
