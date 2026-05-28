import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValueProposition from "@/components/ValueProposition";
import ForWhom from "@/components/ForWhom";
import PricingSection from "@/components/PricingSection";
import SedesSection from "@/components/SedesSection";
import HorariosSection from "@/components/HorariosSection";
import Testimonials from "@/components/Testimonials";
import AppSection from "@/components/AppSection";
import Footer from "@/components/Footer";
import BannerAlquilerHome from "@/components/alquiler/BannerAlquilerHome";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Wait a tick for sections to render
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ValueProposition />
      <ForWhom />
      <ForWhom />
      <BannerAlquilerHome />
      <PricingSection />
      <HorariosSection />
      <AppSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;

