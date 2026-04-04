import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import ForWhom from "@/components/ForWhom";
import PricingSection from "@/components/PricingSection";
import SedesSection from "@/components/SedesSection";
import HorariosSection from "@/components/HorariosSection";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValueProposition />
      <ForWhom />
      <PricingSection />
      <SedesSection />
      <HorariosSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
