'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES, CLINIC_PHONE } from '@/lib/whatsapp';
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function ContactPage() {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setFormSent(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Header />

      <main className="grow py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#183d2b]/10 text-[#183d2b] text-xs font-bold uppercase tracking-wider">
              क्लिनिक संपर्क (Contact & Clinic Location)
            </span>
            <h1 className="font-marathi-heading text-3xl sm:text-5xl font-bold text-[#183d2b]">
              आमच्याशी संपर्क साधा
            </h1>
            <p className="text-base text-[#262820]/75 font-marathi-heading">
              विजयमंगल आयुर्वेद, आटपाडी येथे सल्लामसलत, चौकशी किंवा भेटीच्या नियोजनासाठी संपर्क करा.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-8 border border-[#e6dfd3] shadow-xs space-y-6">
                <h2 className="font-marathi-heading text-xl font-bold text-[#183d2b]">
                  क्लिनिक संपर्क तपशील
                </h2>

                <div className="space-y-5 text-sm text-[#262820]/85 font-marathi-heading">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#6517a3]/10 text-[#6517a3] flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#183d2b]">पत्ता:</h4>
                      <p className="text-xs text-[#262820]/75 mt-0.5 leading-relaxed">
                        मेन रोड, पोस्ट ऑफिससमोर, विठ्ठल रुक्मिणी मंदिराजवळ, आटपाडी, जि. सांगली, महाराष्ट्र
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#5b8e46]/10 text-[#5b8e46] flex items-center justify-center shrink-0 mt-0.5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#183d2b]">फोन नंबर:</h4>
                      <a
                        href={`tel:+91${CLINIC_PHONE}`}
                        className="text-sm font-bold text-[#6517a3] hover:underline"
                      >
                        +91 82639 02142
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#d99136]/10 text-[#d99136] flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#183d2b]">तपासणीच्या वेळा:</h4>
                      <p className="text-xs text-[#262820]/75 mt-0.5">
                        सकाळी ९:०० ते दुपारी १:०० <br />
                        सायंकाळी ४:०० ते रात्री ८:०० <br />
                        (रविवार: पूर्ववेळ आरक्षित रुग्णांसाठी)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#e6dfd3] space-y-3">
                  <a
                    href={getWhatsAppUrl(WHATSAPP_TEMPLATES.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba59] transition-all shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>WhatsApp वर त्वरित मेसेज पाठवा</span>
                  </a>

                  <Link
                    href="/book-appointment"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#6517a3] text-white text-sm font-semibold hover:bg-[#490f77] transition-all shadow-xs"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>अपॉइंटमेंट विनंती अर्ज भरा</span>
                  </Link>
                </div>
              </div>

              {/* Emergency Warning */}
              <div className="p-4 rounded-2xl bg-[#fff6e8] border border-[#d99136]/30 text-xs text-[#262820]/80 font-marathi-heading flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#d99136] shrink-0 mt-0.5" />
                <span>
                  तातडीची सूचना: अचानक श्वास लागणे किंवा पक्षाघाताची तीव्र लक्षणे असल्यास वेळ न दवडता तातडीने नजीकच्या इमर्जन्सी हॉस्पिटलमध्ये जावे.
                </span>
              </div>
            </div>

            {/* Right: Message Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e6dfd3] shadow-xs space-y-6">
                <div>
                  <h3 className="font-marathi-heading text-2xl font-bold text-[#183d2b]">
                    थेट संदेश पाठवा (Send Message)
                  </h3>
                  <p className="text-sm text-[#262820]/70 font-marathi-heading mt-1">
                    आपला संदेश खालील फॉर्मद्वारे नोंदवा. क्लिनिक प्रतिनिधी आपल्याशी संपर्क साधतील.
                  </p>
                </div>

                {!formSent ? (
                  <form onSubmit={handleInquirySubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#183d2b] font-marathi-heading mb-1">
                        आपले पूर्ण नाव *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="उदा. अमित कदम"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#183d2b] font-marathi-heading mb-1">
                        मोबाईल नंबर *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="उदा. 9822012345"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#183d2b] font-marathi-heading mb-1">
                        आपला संदेश किंवा चौकशी *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="आपली चौकशी किंवा विचारणा येथे लिहा..."
                        className="w-full px-4 py-2.5 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-sm focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#183d2b] hover:bg-[#262820] text-white text-sm font-semibold transition-all shadow-xs"
                    >
                      <Send className="w-4 h-4 text-[#d99136]" />
                      <span>संदेश पाठवा</span>
                    </button>
                  </form>
                ) : (
                  <div className="p-8 text-center space-y-4 bg-[#eef6ec] rounded-2xl border border-[#5b8e46]/30">
                    <CheckCircle2 className="w-12 h-12 text-[#5b8e46] mx-auto" />
                    <h4 className="font-marathi-heading font-bold text-xl text-[#183d2b]">
                      आपला संदेश यशस्वीरीत्या पोहोचला आहे!
                    </h4>
                    <p className="text-sm text-[#262820]/75 font-marathi-heading">
                      धन्यवाद {name}. क्लिनिकतर्फे आपल्या {phone} या क्रमांकावर लवकरच प्रतिसाद दिला जाईल.
                    </p>
                    <button
                      onClick={() => setFormSent(false)}
                      className="inline-block text-xs font-semibold text-[#6517a3] underline mt-2"
                    >
                      आणखी एक संदेश पाठवा
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
