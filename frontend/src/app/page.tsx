import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import ClinicalExcellence from '@/components/home/ClinicalExcellence';
import ServicesGrid from '@/components/home/ServicesGrid';
import SearchDiseases from '@/components/home/SearchDiseases';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import ExpertDoctors from '@/components/home/ExpertDoctors';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PartnersSection from '@/components/home/PartnersSection';
import FaqsSection from '@/components/home/FaqsSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* <ClinicalExcellence /> */}
        <ServicesGrid />
        <SearchDiseases />
        <WhyChooseUs />
        <ExpertDoctors />
        <TestimonialsSection />
        <PartnersSection />
        <FaqsSection />
      </main>
      <Footer />
    </>
  );
}
