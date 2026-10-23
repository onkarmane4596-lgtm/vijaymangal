import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Header } from '@/components/public/Header';
import { Footer } from '@/components/public/Footer';
import { db } from '@/lib/db';
import { ArrowRight, Calendar, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'उपचार व सेवा सूची (Ayurvedic Treatments)',
  description:
    'विजयमंगल आयुर्वेद, आटपाडी येथे उपलब्ध असलेल्या सर्व आयुर्वेदिक चिकित्सा सेवांची सविस्तर माहिती. सांधेदुखी, आम्लपित्त, महिलांचे आरोग्य, पंचकर्म व नाडी परीक्षण.',
};

export default function TreatmentsPage() {
  const services = db.getServices();

  return (
    <div className="flex flex-col min-h-screen bg-[#faf8f5]">
      <Header />

      <main className="grow py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#6517a3]/10 text-[#6517a3] text-xs font-bold uppercase tracking-wider">
              सर्वसमावेशक चिकित्सा सूची (Service Catalog)
            </span>
            <h1 className="font-marathi-heading text-3xl sm:text-5xl font-bold text-[#183d2b]">
              आयुर्वेद उपचार व आरोग्य सेवा
            </h1>
            <p className="text-base text-[#262820]/75 font-marathi-heading leading-relaxed">
              डॉ. सुप्रिया श्रीप्रसाद कदम (एम. डी. आयुर्वेद) यांच्या मार्गदर्शनाखाली चालणारे शास्त्रीय उपचार आणि सल्ला विभाग.
            </p>
          </div>

          {/* Treatments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => (
              <div
                key={service.slug}
                className="bg-white rounded-3xl p-8 border border-[#e6dfd3] shadow-xs flex flex-col justify-between hover:shadow-md hover:border-[#6517a3]/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#5b8e46]/10 text-[#183d2b]">
                      विभाग {idx + 1} • {service.name_en}
                    </span>
                    <Sparkles className="w-4 h-4 text-[#d99136]" />
                  </div>

                  <h2 className="font-marathi-heading text-2xl font-bold text-[#183d2b]">
                    {service.name_mr}
                  </h2>

                  <p className="text-sm text-[#262820]/80 font-marathi-heading leading-relaxed">
                    {service.description_mr}
                  </p>

                  {/* Indications */}
                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#6517a3] mb-2 font-marathi-heading">
                      प्रमुख विचारणीय तक्रारी (Primary Indications):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.indications_mr.map((ind, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#262820]/85 font-marathi-heading">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5b8e46] shrink-0" />
                          <span>{ind}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {service.advisory_mr && (
                    <div className="p-3 rounded-xl bg-[#faf8f5] border border-[#e6dfd3] text-xs text-[#6b7280] font-marathi-heading flex items-start gap-2">
                      <ShieldAlert className="w-4 h-4 text-[#d99136] shrink-0 mt-0.5" />
                      <span>{service.advisory_mr}</span>
                    </div>
                  )}
                </div>

                <div className="pt-6 mt-6 border-t border-[#e6dfd3] flex items-center justify-between">
                  <Link
                    href={`/treatments/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#6517a3] hover:text-[#490f77] group"
                  >
                    <span>सविस्तर वाचा</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    href={`/book-appointment?category=${encodeURIComponent(service.name_mr)}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#183d2b] hover:bg-[#262820] text-white text-xs font-semibold transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#d99136]" />
                    <span>भेट आरक्षित करा</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
