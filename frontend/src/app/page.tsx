import HeroSection from "@/components/home/HeroSection";
import QuickActions from "@/components/home/QuickActions";
import SpecialtiesSection from "@/components/home/SpecialtiesSection";
import FindDoctorSection from "@/components/home/FindDoctorSection";
import StatsSection from "@/components/home/StatsSection";
import HealthPackages from "@/components/home/HealthPackages";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import BlogSection from "@/components/home/BlogSection";
import CTASection from "@/components/home/CTASection";
import AppDownloadSection from "@/components/home/AppDownloadSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <QuickActions />
      <SpecialtiesSection />
      <FindDoctorSection />
      <StatsSection />
      <HealthPackages />
      <WhyChooseUs />
      <TestimonialsSection />
      <BlogSection />
      <CTASection />
      <AppDownloadSection />
    </>
  );
}
