import { Clock } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface Clase {
  sede: string;
  hora: string;
}

const horarios: Record<string, Clase[]> = {
  Lunes: [
    { sede: "P. Rivadavia", hora: "20:00" },
    { sede: "Devoto", hora: "19:00" },
    { sede: "Rosedal", hora: "09:00" },
    { sede: "Rosedal", hora: "19:00" },
  ],
  Martes: [
    { sede: "P. Rivadavia", hora: "19:00" },
    { sede: "Devoto", hora: "19:00" },
    { sede: "Puerto Madero", hora: "19:00" },
    { sede: "Puerto Madero", hora: "20:00" },
  ],
  Miércoles: [
    { sede: "Villa Real", hora: "18:30" },
    { sede: "Villa Real", hora: "19:30" },
    { sede: "Belgrano", hora: "19:00" },
    { sede: "Colegiales", hora: "18:00" },
    { sede: "Vicente López", hora: "18:30" },
    { sede: "Rosedal", hora: "09:00" },
    { sede: "Rosedal", hora: "19:00" },
  ],
  Jueves: [
    { sede: "P. Rivadavia", hora: "09:00" },
    { sede: "Colegiales", hora: "19:00" },
    { sede: "Rosedal", hora: "19:00" },
  ],
  Viernes: [
    { sede: "Devoto", hora: "19:00" },
    { sede: "Villa Luro", hora: "19:00" },
    { sede: "Belgrano", hora: "19:00" },
  ],
  Sábado: [
    { sede: "Villa Real", hora: "09:30" },
    { sede: "Plaza La Pampa", hora: "09:00" },
    { sede: "Puerto Madero", hora: "09:00" },
    { sede: "Vicente López", hora: "08:00" },
  ],
  Domingo: [
    { sede: "P. Rivadavia", hora: "08:00" },
    { sede: "P. Rivadavia", hora: "09:00" },
    { sede: "Plaza La Pampa", hora: "09:00" },
    { sede: "Rosedal", hora: "09:00" },
    { sede: "Rosedal", hora: "09:30" },
  ],
};

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const HorariosSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="horarios" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Horarios</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Clases todos los días
          </h2>
          <p className="text-muted-foreground text-lg">
            Encontrá el horario que mejor se adapte a tu rutina
          </p>
        </div>

        <div className="hidden lg:grid lg:grid-cols-7 gap-3 max-w-7xl mx-auto">
          {dias.map((dia, i) => (
            <div
              key={dia}
              className={`rounded-xl overflow-hidden ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="bg-primary text-primary-foreground text-center py-3 px-2">
                <p className="font-bold text-sm">{dia}</p>
              </div>
              <div className="bg-muted flex flex-col gap-2 p-3 min-h-[200px]">
                {horarios[dia].map((clase, j) => (
                  <div key={j} className="bg-background rounded-lg p-3 shadow-sm">
                    <p className="font-bold text-foreground text-xs">{clase.sede}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-primary" />
                      <p className="text-muted-foreground text-xs">{clase.hora}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          {dias.map((dia, i) => (
            <div
              key={dia}
              className={`rounded-xl overflow-hidden ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div className="bg-primary text-primary-foreground py-3 px-4">
                <p className="font-bold text-sm">{dia}</p>
              </div>
              <div className="bg-muted p-3 flex flex-col gap-2">
                {horarios[dia].map((clase, j) => (
                  <div key={j} className="bg-background rounded-lg p-3 shadow-sm flex items-center justify-between">
                    <p className="font-bold text-foreground text-sm">{clase.sede}</p>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <p className="text-muted-foreground text-sm">{clase.hora}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground text-xs mt-8">
          * Los horarios pueden cambiar sin previo aviso. Consultá nuestras redes para actualizaciones.
        </p>
      </div>
    </section>
  );
};

export default HorariosSection;
