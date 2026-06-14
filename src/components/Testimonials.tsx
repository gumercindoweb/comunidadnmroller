import { Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Camila R.",
    plan: "Plan Black Free",
    text: "Empecé sin saber nada y en 3 meses ya patino con confianza. Los profes son increíbles y la comunidad te motiva un montón.",
  },
  {
    name: "Martín G.",
    plan: "Plan Basic Fun",
    text: "La mejor decisión que tomé. Cada clase es diferente, te divertís y aprendés. Las sedes al aire libre son un golazo.",
  },
  {
    name: "Valentina S.",
    plan: "Plan Black Free",
    text: "Me encanta poder ir a cualquier sede, en el horario que me convenga. Los eventos son lo mejor, conocés gente genial.",
  },
];

const Testimonials = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="testimonios" className="py-24" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-4xl md:text-5xl font-black italic text-foreground mb-2">4.9/5</p>
          <p className="text-muted-foreground text-lg">
            Valoración promedio de más de <span className="font-bold text-foreground">3.000 alumnos</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-muted rounded-2xl p-8 ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-foreground mb-6 leading-relaxed">"{t.text}"</p>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.plan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
