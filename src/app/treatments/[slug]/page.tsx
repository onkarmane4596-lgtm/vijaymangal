import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { db } from '@/lib/db';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';
import {
  Calendar,
  MessageCircle,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Stethoscope,
  Sparkles,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = db.getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = db.getServiceBySlug(slug);

  if (!service) {
    return { title: 'सेवा आढळली नाही' };
  }

  return {
    title: `${service.name_mr} | विजयमंगल आयुर्वेद, आटपाडी`,
    description: service.description_mr,
  };
}

export default async function TreatmentDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = db.getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const whatsappMessage = `नमस्कार, मला विजयमंगल आयुर्वेद येथे '${service.name_mr}' बाबत अधिक माहिती व सल्ला हवा आहे.`;

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Header />

      <main className="grow py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#6517a3] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>सर्व उपचार सूचीकडे परत जा</span>
            </Link>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#e6dfd3] shadow-sm space-y-8">
            
            {/* Header info */}
            <div className="space-y-3 pb-6 border-b border-[#e6dfd3]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6517a3]/10 text-[#6517a3] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#d99136]" />
                <span>{service.name_en}</span>
              </div>
              <h1 className="font-marathi-heading text-3xl sm:text-4xl font-bold text-[#183d2b]">
                {service.name_mr}
              </h1>
              <p className="text-base text-[#262820]/80 font-marathi-heading leading-relaxed">
                {service.headline_mr}
              </p>
            </div>

            {/* Detailed Description */}
            <div className="space-y-4">
              <h2 className="font-marathi-heading text-xl font-bold text-[#183d2b] flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#5b8e46]" />
                <span>आयुर्वेदीय दृष्टिकोन व सल्ल्याचे स्वरूप</span>
              </h2>
              <p className="text-sm sm:text-base text-[#262820]/80 font-marathi-heading leading-relaxed">
                {service.description_mr}
              </p>
              {service.details_mr && (
                <p className="text-sm sm:text-base text-[#262820]/80 font-marathi-heading leading-relaxed">
                  {service.details_mr}
                </p>
              )}
            </div>

            {/* Indications */}
            <div className="p-6 rounded-2xl bg-[#faf8f5] border border-[#e6dfd3] space-y-3">
              <h3 className="font-marathi-heading text-lg font-bold text-[#183d2b]">
                या विभागांतर्गत येणाऱ्या प्रमुख तक्रारी व लक्षणे:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {service.indications_mr.map((ind, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-[#262820]/85 font-marathi-heading">
                    <CheckCircle2 className="w-4 h-4 text-[#5b8e46] shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Boundary & Advisory */}
            <div className="p-5 rounded-2xl bg-[#fff6e8] border border-[#d99136]/30 text-xs sm:text-sm text-[#262820]/85 font-marathi-heading space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#b87524]">
                <AlertTriangle className="w-4 h-4 text-[#d99136]" />
                <span>महत्त्वाची वैद्यकीय स्पष्टोक्ती (Clinical Guidance)</span>
              </div>
              <p className="leading-relaxed">
                {service.advisory_mr ||
                  'टीप: कोणत्याही उपचाराची निश्चिती करण्यापूर्वी प्रत्यक्ष नाडी परीक्षण आवश्यक असते. आपत्कालीन परिस्थितीमध्ये त्वरित नजीकच्या आधुनिक रुग्णालयात संपर्क साधावा.'}
              </p>
              <p className="leading-relaxed text-[11px] text-[#6b7280]">
                सुरू असलेली आधुनिक औषधे स्वतःहून कधीही बंद करू नयेत.
              </p>
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-[#e6dfd3] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#6b7280] font-marathi-heading text-center sm:text-left">
                सल्लागार वैद्य: डॉ. सुप्रिया श्रीप्रसाद कदम, एम. डी. (आयुर्वेद)
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={getWhatsAppUrl(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] text-white text-xs sm:text-sm font-semibold hover:bg-[#20ba59] transition-all shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>WhatsApp चौकशी</span>
                </a>

                <Link
                  href={`/book-appointment?category=${encodeURIComponent(service.name_mr)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6517a3] text-white text-xs sm:text-sm font-semibold hover:bg-[#490f77] transition-all shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>या सेवेसाठी अपॉइंटमेंट घ्या</span>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
