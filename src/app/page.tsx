import React from 'react';
import { Header } from '@/components/public/Header';
import { Hero } from '@/components/public/Hero';
import { BenefitsServicesSection } from '@/components/public/BenefitsServicesSection';
import { EasyStepsSection } from '@/components/public/EasyStepsSection';
import { NatureScienceSection } from '@/components/public/NatureScienceSection';
import { CoursesAndReviews } from '@/components/public/CoursesAndReviews';
import { WhyChooseStrip } from '@/components/public/WhyChooseStrip';
import { PractitionerSection } from '@/components/public/PractitionerSection';
import { PanchakarmaSection } from '@/components/public/PanchakarmaSection';
import { FaqSection } from '@/components/public/FaqSection';
import { ContactLocationSection } from '@/components/public/ContactLocationSection';
import { Footer } from '@/components/public/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="grow">
        {/* Section 1: Hero with sage green background and mortar & pestle visual */}
        <Hero />

        {/* Section 2: 6-Icon Grid & 'Benefit From Choosing The Best' split */}
        <BenefitsServicesSection />

        {/* Section 3: 'Easy Steps to Order the Services' & Herbs prep visual */}
        <EasyStepsSection />

        {/* Section 4: 'The Combination of Nature & Science' & Ingredients bowls visual */}
        <NatureScienceSection />

        {/* Section 5: Courses (1-Month / 4-Month) & Sage Green Patient Testimonial Quote */}
        <CoursesAndReviews />

        {/* Section 6: 'Why Choose Pure Ayurveda' 4-Feature Strip */}
        <WhyChooseStrip />

        {/* Section 7: Doctor Profile & Clinical Credentials */}
        <PractitionerSection />

        {/* Section 8: Classical Panchakarma Care Details */}
        <PanchakarmaSection />

        {/* Section 9: Frequently Asked Questions */}
        <FaqSection />

        {/* Section 10: Location, Contact & Hours */}
        <ContactLocationSection />
      </main>
      <Footer />
    </div>
  );
}
