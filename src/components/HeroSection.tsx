import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Calendar, Users, ShieldCheck } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    label: "Sedes activas",
    value: "+10",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Calendar,
    label: "Clases semanales",
    value: "40+",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Users,
    label: "Alumnos activos",
    value: "3.000+",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: ShieldCheck,
    label: "Seguro médico",
    value: "Incluido",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background pt-16">
      {/* Subtle decorative blurs */}
      <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/[0.06] rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-primary/[0.04] rounded-full blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-primary/[0.03] rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — Text */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <div className="animate-fade-up mb-5 sm:mb-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">
                  Escuela #1 de Patinaje en Argentina
                </span>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.05] mb-4 sm:mb-6 animate-fade-up-delay-1">
              Aprendé a patinar{" "}
              <span className="text-primary">desde cero</span>, sin equipo ni
              experiencia
            </h1>

            {/* Subtitle */}
            <p className="text-base md:text-lg text-muted-foreground max-w-md mb-8 sm:mb-10 leading-relaxed animate-fade-up-delay-2">
              Con profes que te guían y acompañan, y compañeros que te apoyan. Te
              alquilamos el equipo, sin contratos, y te sumás a una comunidad que ya
              patea las calles de Buenos Aires. 🛼
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 animate-fade-up-delay-3">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-5 sm:py-6 rounded-full shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 group"
                onClick={() =>
                  document
                    .getElementById("planes")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Reservá tu primera clase
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted font-medium text-base px-8 py-5 sm:py-6 rounded-full transition-all duration-200"
                onClick={() =>
                  document
                    .getElementById("alquiler")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Empezá sin equipo propio
              </Button>
            </div>

            {/* Social proof */}
            <div className="mt-12 hidden sm:flex items-center gap-3 animate-fade-up-delay-3">

              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center"
                  >
                    <span className="text-[10px] font-bold text-muted-foreground">
                      {String.fromCharCode(64 + i)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">+3.000</span>{" "}
                alumnos nos eligieron
              </p>
            </div>
          </div>

          {/* Right column — Stats cards */}
          <div className="relative animate-fade-up-delay-2">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`group bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${
                    i === 1 ? "lg:translate-y-6" : ""
                  } ${i === 2 ? "lg:-translate-y-2" : ""}`}
                >
                  <div
                    className={`w-10 h-10 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-black text-foreground mb-1 tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Floating accent card */}
            <div className="hidden lg:block absolute -bottom-4 -left-6 bg-primary text-primary-foreground rounded-2xl px-5 py-3 shadow-lg shadow-primary/25 animate-fade-up-delay-3">
              <p className="text-sm font-bold">🛼 ¡Clases todos los días!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
