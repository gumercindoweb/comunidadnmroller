import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />

      <div className="relative z-10 container mx-auto px-4 text-center">
        <Badge className="mb-6 bg-primary/20 text-primary-foreground border-primary/30 backdrop-blur-sm px-4 py-2 text-sm font-medium animate-fade-up">
          <Users className="w-4 h-4 mr-2" />
          +3.000 alumnos nos eligieron
        </Badge>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-primary-foreground leading-[0.9] mb-6 animate-fade-up-delay-1">
          UNITE A LA
          <br />
          <span className="text-primary">ESCUELA #1</span>
          <br />
          DE PATINAJE
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 font-medium animate-fade-up-delay-2">
          Aprende a patinar desde cero o mejorá tu técnica en un entorno seguro, 
          divertido y con la mejor comunidad de Buenos Aires.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
          <Button
            size="lg"
            className="bg-primary hover:bg-secondary text-primary-foreground font-bold text-lg px-10 py-6 rounded-full shadow-lg shadow-primary/30"
            onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })}
          >
            Empezá Ahora
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-bold text-lg px-10 py-6 rounded-full"
            onClick={() => document.getElementById("propuesta")?.scrollIntoView({ behavior: "smooth" })}
          >
            Conocé Más
          </Button>
        </div>
      </div>

      <button
        onClick={() => document.getElementById("propuesta")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default HeroSection;
