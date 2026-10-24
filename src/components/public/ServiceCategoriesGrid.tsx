'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  HeartPulse,
  Sparkles,
  MessageCircle,
  Search,
  Filter,
} from 'lucide-react';
import { Service } from '@/types/database';
import { getWhatsAppUrl, WHATSAPP_TEMPLATES } from '@/lib/whatsapp';

interface ServiceCategoriesGridProps {
  services: Service[];
}

export function ServiceCategoriesGrid({ services }: ServiceCategoriesGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterTabs = [
    { id: 'all', label: 'All Specialties (सर्व)' },
    { id: 'musculoskeletal', label: 'Joints & Spine (सांधे व मणके)' },
    { id: 'digestive', label: 'Digestion (पचनसंस्था)' },
    { id: 'metabolic', label: 'Weight & Metabolic (वजन)' },
    { id: 'womens_health', label: "Women's Health (महिलांचे आरोग्य)" },
    { id: 'ayurveda_core', label: 'Panchakarma (पंचकर्म व नाडी)' },
  ];

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === 'all' || service.category === activeCategory;

    const matchesSearch =
      searchQuery.trim() === '' ||
      service.name_mr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.indications_mr.some((ind) =>
        ind.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="treatments" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5b8e46]/10 text-[#183d2b] text-xs font-bold uppercase tracking-wider">
            <HeartPulse className="w-4 h-4 text-[#5b8e46]" />
            <span>Clinical Specialties & Care Departments</span>
          </div>

          <h2 className="font-marathi-heading text-2xl sm:text-4xl font-bold text-[#183d2b]">
            उपचार व सेवा सूची (Ayurvedic Treatments)
          </h2>

          <p className="text-sm sm:text-base text-[#6b7280] font-marathi-heading">
            आपल्या प्रकृती व लक्षणांनुसार योग्य आयुर्वेदिक सल्ला व उपचार पद्धतींची वर्गवारी खाली दिली आहे.
          </p>
        </div>

        {/* Dynamic Filter Tabs & Search Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#e6dfd3]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-[#183d2b] text-white shadow-sm'
                    : 'bg-[#faf8f5] text-[#6b7280] hover:bg-[#f1ede5] hover:text-[#183d2b]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full lg:w-72">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#6b7280]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search condition (उदा. सांधेदुखी, आम्लपित्त)..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#e6dfd3] bg-[#faf8f5] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#6517a3]"
            />
          </div>
        </div>

        {/* 8 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredServices.length === 0 ? (
            <div className="col-span-full py-16 text-center text-[#6b7280] text-sm font-marathi-heading">
              आपण शोधत असलेली विशिष्ट सेवा आढळली नाही. कृपया वेगळा शब्द शोधून पहा किंवा क्लिनिकशी थेट संपर्क साधा.
            </div>
          ) : (
            filteredServices.map((service, index) => {
              const whatsappInquiry = `नमस्कार, मला विजयमंगल आयुर्वेद येथे '${service.name_mr}' बाबत अधिक माहिती व सल्ला हवा आहे.`;

              return (
                <div
                  key={service.id || index}
                  className="card-luxury relative flex flex-col justify-between p-6 rounded-2xl bg-[#ffffff] border border-[#e6dfd3] hover:border-[#6517a3]/50 group"
                >
                  <div>
                    {/* Header tag */}
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#6517a3]/10 text-[#6517a3]">
                        {service.name_en}
                      </span>
                      <Sparkles className="w-4 h-4 text-[#d99136] opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Service Name */}
                    <h3 className="font-marathi-heading text-lg font-bold text-[#183d2b] group-hover:text-[#6517a3] transition-colors leading-snug mb-2">
                      {service.name_mr}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs text-[#262820]/75 leading-relaxed font-marathi-heading mb-4">
                      {service.description_mr}
                    </p>

                    {/* Indication tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.indications_mr.slice(0, 3).map((ind, i) => (
                        <span
                          key={i}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-[#faf8f5] text-[#262820]/80 border border-[#e6dfd3]/80 font-medium"
                        >
                          {ind}
                        </span>
                      ))}
                      {service.indications_mr.length > 3 && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-[#f5ebff] text-[#6517a3] font-semibold">
                          +{service.indications_mr.length - 3} अधिक
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="pt-4 border-t border-[#e6dfd3]/80 space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <Link
                        href={`/treatments/${service.slug}`}
                        className="inline-flex items-center gap-1 text-[#6517a3] hover:text-[#490f77] transition-colors"
                      >
                        <span>Learn More (सविस्तर)</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <a
                        href={getWhatsAppUrl(whatsappInquiry)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#075e54] hover:text-[#25D366] transition-colors"
                        title="Inquire on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                        <span>Inquire</span>
                      </a>
                    </div>

                    <Link
                      href={`/book-appointment?category=${encodeURIComponent(service.name_mr)}`}
                      className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#183d2b] hover:bg-[#262820] text-white text-xs font-semibold transition-all shadow-2xs"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#d99136]" />
                      <span>Book Consultation</span>
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* View all directory footer link */}
        <div className="mt-14 text-center">
          <Link
            href="/treatments"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#183d2b] text-[#f7f4ea] hover:bg-[#262820] text-sm font-bold transition-all shadow-md active:scale-98"
          >
            <span>Explore All Ayurvedic Care Categories</span>
            <ArrowRight className="w-4 h-4 text-[#d99136]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
