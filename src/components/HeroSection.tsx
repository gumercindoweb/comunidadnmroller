import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(7,73%,30%)] via-[hsl(7,50%,20%)] to-[hsl(0,0%,8%)]" />
      
      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center">
        {/* Social proof badge */}
        <div className="animate-fade-up mb-10">
          <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-md border border-primary-foreground/15 rounded-full px-5 py-2.5">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-primary-foreground/90 text-sm font-medium">
              +3.000 alumnos nos eligieron
            </span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-primary-foreground leading-[0.85] mb-8 animate-fade-up-delay-1">
          UNITE A LA
          <br />
          <span className="text-primary drop-shadow-[0_0_40px_hsl(7,73%,42%,0.4)]">
            ESCUELA #1
          </span>
          <br />
          DE PATINAJE
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-primary-foreground/60 max-w-xl mx-auto mb-12 font-normal leading-relaxed animate-fade-up-delay-2">
          Aprende a patinar desde cero o mejorá tu técnica en un entorno seguro,
          divertido y con la mejor comunidad de Buenos Aires.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base tracking-wide px-10 py-7 rounded-full shadow-xl shadow-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:scale-105 group"
            onClick={() =>
              document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Empezá Ahora
            <ArrowRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/15 hover:border-primary-foreground/60 font-semibold text-base px-10 py-7 rounded-full backdrop-blur-sm transition-all duration-300"
            onClick={() =>
              document.getElementById("propuesta")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Conocé Más
          </Button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
