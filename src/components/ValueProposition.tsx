import { Infinity, MapPin, TrendingUp, ShieldCheck } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const items = [
  {
    icon: Infinity,
    title: "Clases Ilimitadas",
    desc: "Entrená todas las veces que quieras con tu plan mensual, sin límites ni restricciones.",
  },
  {
    icon: MapPin,
    title: "+12 Sedes Outdoor",
    desc: "Elegí la sede que más te convenga. Tenemos puntos en toda la ciudad de Buenos Aires.",
  },
  {
    icon: TrendingUp,
    title: "Aprendizaje Progresivo",
    desc: "Metodología diseñada para que avances a tu ritmo, desde cero hasta nivel avanzado.",
  },
  {
    icon: ShieldCheck,
    title: "Seguro Médico",
    desc: "Patiná tranquilo. Todos nuestros planes incluyen cobertura médica durante las clases.",
  },
];

const ValueProposition = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="propuesta" className="py-24 bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">¿Por qué NM?</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Todo lo que necesitás para patinar
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={`bg-background rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
