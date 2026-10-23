import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, HeartPulse, Sparkles } from 'lucide-react';
import { Service } from '@/types/database';

interface ServiceCategoriesGridProps {
  services: Service[];
}

export function ServiceCategoriesGrid({ services }: ServiceCategoriesGridProps) {
  return (
    <section id="treatments" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5b8e46]/10 text-[#183d2b] text-xs font-semibold uppercase tracking-wider">
            <HeartPulse className="w-3.5 h-3.5 text-[#5b8e46]" />
            <span>शास्त्रीय चिकित्सा विभाग (Treatment Categories)</span>
          </div>
          <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b]">
            आरोग्यविषयक सल्ला व उपचार सेवा
          </h2>
          <p className="text-sm sm:text-base text-[#6b7280] font-marathi-heading">
            विजयमंगल आयुर्वेद येथे उपलब्ध असलेल्या विविध आरोग्य सेवांची वर्गवारी. आपल्या लक्षणांनुसार योग्य आयुर्वेदिक मार्गदर्शन प्राप्त करा.
          </p>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[#faf8f5] hover:bg-[#f5ebff]/30 border border-[#e6dfd3] hover:border-[#6517a3]/40 transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1"
            >
              <div>
                {/* Header tag */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#6517a3]/10 text-[#6517a3]">
                    विभाग {index + 1}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#d99136] opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Service Name */}
                <h3 className="font-marathi-heading text-lg font-bold text-[#183d2b] group-hover:text-[#6517a3] transition-colors leading-snug mb-2">
                  {service.name_mr}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#262820]/75 leading-relaxed font-marathi-heading mb-4">
                  {service.description_mr}
                </p>

                {/* Indication tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {service.indications_mr.slice(0, 3).map((ind, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded bg-white text-[#262820]/80 border border-[#e6dfd3] font-medium"
                    >
                      {ind}
                    </span>
                  ))}
                  {service.indications_mr.length > 3 && (
                    <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#f7f4ea] text-[#6b7280]">
                      +{service.indications_mr.length - 3} अधिक
                    </span>
                  )}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-[#e6dfd3]/80 flex items-center justify-between text-xs font-semibold">
                <Link
                  href={`/treatments/${service.slug}`}
                  className="inline-flex items-center gap-1 text-[#6517a3] hover:text-[#490f77] transition-colors font-medium"
                >
                  <span>अधिक माहिती</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href={`/book-appointment?category=${encodeURIComponent(service.name_mr)}`}
                  className="inline-flex items-center gap-1 text-[#183d2b] hover:text-[#5b8e46] transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>सल्ला घ्या</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all directory footer link */}
        <div className="mt-12 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#183d2b] text-[#f7f4ea] hover:bg-[#262820] text-sm font-semibold transition-colors shadow-xs"
          >
            <span>सर्व उपचार व सेवांची सविस्तर माहिती पहा</span>
            <ArrowRight className="w-4 h-4 text-[#d99136]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
