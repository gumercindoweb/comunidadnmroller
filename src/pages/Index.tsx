import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import ForWhom from "@/components/ForWhom";
import PricingSection from "@/components/PricingSection";

import HorariosSection from "@/components/HorariosSection";
import Testimonials from "@/components/Testimonials";
import AppSection from "@/components/AppSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValueProposition />
      <ForWhom />
      <PricingSection />
      
      <HorariosSection />
      <AppSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
