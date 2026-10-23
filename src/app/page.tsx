import React from 'react';
import { Header } from '@/components/public/Header';
import { Hero } from '@/components/public/Hero';
import { ServiceCategoriesGrid } from '@/components/public/ServiceCategoriesGrid';
import { CareProcess } from '@/components/public/CareProcess';
import { PractitionerSection } from '@/components/public/PractitionerSection';
import { PanchakarmaSection } from '@/components/public/PanchakarmaSection';
import { RecurringCareSection } from '@/components/public/RecurringCareSection';
import { FaqSection } from '@/components/public/FaqSection';
import { ContactLocationSection } from '@/components/public/ContactLocationSection';
import { Footer } from '@/components/public/Footer';
import { db } from '@/lib/db';

export default function HomePage() {
  const services = db.getServices();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        <Hero />
        <ServiceCategoriesGrid services={services} />
        <CareProcess />
        <PractitionerSection />
        <PanchakarmaSection />
        <RecurringCareSection />
        <FaqSection />
        <ContactLocationSection />
      </main>
      <Footer />
    </div>
  );
}
