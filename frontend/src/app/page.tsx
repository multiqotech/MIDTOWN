import React from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import StatsSection from '@/components/home/StatsSection';
import ValueProposition from '@/components/home/ValueProposition';
import AboutSection from '@/components/home/AboutSection';
import ClinicalExcellence from '@/components/home/ClinicalExcellence';
import OurSpecialtiesSection from '@/components/home/OurSpecialtiesSection';
import SearchDiseases from '@/components/home/SearchDiseases';
import WhyChooseMidtownSection from '@/components/home/WhyChooseMidtownSection';
import LocationsSection from '@/components/home/LocationsSection';
import ExpertDoctors from '@/components/home/ExpertDoctors';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PartnersSection from '@/components/home/PartnersSection';
import FaqsSection from '@/components/home/FaqsSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        {/* <StatsSection /> */}
        <ValueProposition />
        <AboutSection />
        <ClinicalExcellence />
        <OurSpecialtiesSection />
        <SearchDiseases />
        <WhyChooseMidtownSection />
        <LocationsSection />
        <ExpertDoctors />
        <TestimonialsSection />
        <PartnersSection />
        <FaqsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
