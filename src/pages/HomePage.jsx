import React from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import HowItWorks from '../components/home/HowItWorks';
import BenefitsSection from '../components/home/BenefitsSection';
import FeaturedChargers from '../components/home/FeaturedChargers';
import Testimonials from '../components/home/Testimonials';
import CtaBanner from '../components/home/CtaBanner';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#061A15] text-[#F5F7F6] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <FeaturedChargers />
        <BenefitsSection />
        <Testimonials />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}

