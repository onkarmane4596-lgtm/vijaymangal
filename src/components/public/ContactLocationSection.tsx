import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, MessageCircle, Calendar, ShieldAlert } from 'lucide-react';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';

export function ContactLocationSection() {
  return (
    <section id="contact" className="py-20 sm:py-28 bg-white border-t border-[#e6dfd3] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183d2b]/10 text-[#183d2b] text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-[#5b8e46]" />
              <span>क्लिनिक स्थान व संपर्क (Location & Contact)</span>
            </div>

            <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b]">
              आपल्या भेटीसाठी क्लिनिक पत्ता
            </h2>

            <p className="text-sm sm:text-base text-[#262820]/75 leading-relaxed font-marathi-heading">
              विजयमंगल आयुर्वेद आटपाडीच्या मुख्य बाजारपेठेत, पोस्ट ऑफिसच्या समोर सुलभ ठिकाणी वसलेले आहे.
            </p>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6dfd3] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#6517a3]/10 text-[#6517a3] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-marathi-heading font-bold text-sm text-[#183d2b]">
                    क्लिनिक पत्ता
                  </h4>
                  <p className="text-sm text-[#262820]/80 font-marathi-heading mt-0.5">
                    मेन रोड, पोस्ट ऑफिससमोर, विठ्ठल रुक्मिणी मंदिराजवळ, आटपाडी, जि. सांगली, महाराष्ट्र
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6dfd3] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#5b8e46]/10 text-[#5b8e46] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-marathi-heading font-bold text-sm text-[#183d2b]">
                    थेट दूरध्वनी संपर्क
                  </h4>
                  <a
                    href={`tel:+91${CLINIC_PHONE}`}
                    className="text-base font-bold text-[#6517a3] hover:underline"
                  >
                    +91 82639 02142
                  </a>
                  <p className="text-xs text-[#6b7280] font-marathi-heading mt-0.5">
                    सल्लामसलत पूर्वनोंदणी व चौकशीसाठी
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#faf8f5] border border-[#e6dfd3] flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#d99136]/10 text-[#d99136] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-marathi-heading font-bold text-sm text-[#183d2b]">
                    तपासणीच्या वेळा
                  </h4>
                  <div className="text-sm text-[#262820]/80 font-marathi-heading mt-0.5 space-y-0.5">
                    <p>सकाळ सत्र: सकाळी ९:०० ते दुपारी १:००</p>
                    <p>सायंकाळ सत्र: सायं. ४:०० ते रात्री ८:००</p>
                    <p className="text-xs text-[#6b7280]">
                      (रविवार: पूर्ववेळ आरक्षित केलेल्या रुग्णांसाठी किंवा सुट्टी)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/book-appointment"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#183d2b] text-white text-sm font-semibold hover:bg-[#254f39] transition-all shadow-xs active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#d99136]" />
                <span>Book Clinic Appointment</span>
              </Link>
              <a
                href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba59] transition-all shadow-xs active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Card / Visual representation */}
          <div className="lg:col-span-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-tr from-[#183d2b] to-[#262820] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#5b8e46]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-6">
                <div className="inline-block px-3 py-1 rounded bg-[#d99136] text-black text-xs font-bold uppercase tracking-wider">
                  आटपाडी केंद्र
                </div>

                <h3 className="font-marathi-heading text-2xl font-bold">
                  विजयमंगल आयुर्वेद
                </h3>

                <p className="text-sm text-white/80 font-marathi-heading leading-relaxed">
                  ग्रामीण व शहरी भागातील नागरिकांना निष्णात आयुर्वेदाचार्य यांच्याकडून दर्जेदार आरोग्य सल्ला मिळवून देण्यासाठी कटिबद्ध.
                </p>

                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#d99136]">
                    <ShieldAlert className="w-4 h-4" />
                    <span>तातडीची सूचना</span>
                  </div>
                  <p className="text-xs text-white/80 font-marathi-heading">
                    कोणत्याही आपत्कालीन किंवा गंभीर परिस्थितीत (उदा. चक्कर येऊन पडणे, छातीत तीव्र वेदना, अचानक अंग लुळे पडणे) त्वरित नजीकच्या इमर्जन्सी हॉस्पिटलमध्ये दाखल व्हावे.
                  </p>
                </div>

                <div className="pt-2 text-xs text-white/60">
                  पत्ता: मेन रोड, पोस्ट ऑफिससमोर, विठ्ठल रुक्मिणी मंदिराजवळ, आटपाडी, जि. सांगली.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
