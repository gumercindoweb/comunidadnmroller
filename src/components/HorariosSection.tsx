import { Clock, MapPin, Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// ── Tipos ──
interface ClaseEnriquecida {
  sede: string;
  hora: string;
  disciplina?: string;
}

type DisciplinaType = "Slalom" | "Urbano" | "Skatepark" | "Frenadas" | "Rampas" | "Primeros pasos y principiante";

const badgeStyles: Record<string, string> = {
  Slalom: "bg-primary/10 text-primary border border-primary/20",
  Urbano: "bg-muted text-muted-foreground",
  Skatepark: "bg-amber-100 text-amber-800",
  Frenadas: "bg-muted text-muted-foreground",
  Rampas: "bg-amber-100 text-amber-800",
  "Primeros pasos y principiante": "bg-secondary text-secondary-foreground",
};

// ── Horarios enriquecidos con disciplina ──
const horarios: Record<string, ClaseEnriquecida[]> = {
  Lunes: [
    { sede: "P. Rivadavia", hora: "20:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Devoto", hora: "19:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Rosedal", hora: "09:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Rosedal", hora: "19:00", disciplina: "Primeros pasos y principiante" },
  ],
  Martes: [
    { sede: "P. Rivadavia", hora: "19:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Devoto", hora: "19:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Puerto Madero", hora: "19:00", disciplina: "Slalom" },
    { sede: "Rosedal", hora: "09:00", disciplina: "Slalom" },
    { sede: "Rosedal", hora: "20:00", disciplina: "Frenadas" },
  ],
  Miércoles: [
    { sede: "Villa Real", hora: "18:30", disciplina: "Primeros pasos y principiante" },
    { sede: "Villa Real", hora: "19:30", disciplina: "Primeros pasos y principiante" },
    { sede: "Belgrano", hora: "19:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Colegiales", hora: "18:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Vicente López", hora: "18:30", disciplina: "Primeros pasos y principiante" },
    { sede: "Rosedal", hora: "09:00", disciplina: "Slalom" },
    { sede: "Rosedal", hora: "20:00", disciplina: "Slalom" },
  ],
  Jueves: [
    { sede: "P. Rivadavia", hora: "09:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Colegiales", hora: "19:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Rosedal", hora: "19:00", disciplina: "Slalom" },
    { sede: "Rosedal", hora: "20:00", disciplina: "Rampas" },
    { sede: "Rivadavia", hora: "20:00", disciplina: "Frenadas" },
  ],
  Viernes: [
    { sede: "Devoto", hora: "20:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Villa Luro", hora: "20:00", disciplina: "Skatepark" },
    { sede: "Belgrano", hora: "19:00", disciplina: "Skatepark" },
  ],
  Sábado: [
    { sede: "Villa Real", hora: "09:30", disciplina: "Primeros pasos y principiante" },
    { sede: "Plaza La Pampa", hora: "09:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Puerto Madero", hora: "09:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Vicente López", hora: "08:00", disciplina: "Slalom" },
    { sede: "Rosedal", hora: "10:00", disciplina: "Urbano" },
    { sede: "Madero", hora: "10:00", disciplina: "Urbano" },
    { sede: "Villa Real", hora: "11:30", disciplina: "Urbano" },
  ],
  Domingo: [
    { sede: "P. Rivadavia", hora: "08:00", disciplina: "Primeros pasos y principiante" },
    { sede: "P. Rivadavia", hora: "09:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Plaza La Pampa", hora: "09:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Rosedal", hora: "09:00", disciplina: "Primeros pasos y principiante" },
    { sede: "Rosedal", hora: "09:30", disciplina: "Primeros pasos y principiante" },
  ],
};

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// ── Alquiler ──
interface AlquilerSede {
  sede: string;
  horarios: string;
}

const alquilerSedes: AlquilerSede[] = [
  { sede: "Rosedal Palermo", horarios: "Mar, Mié y Dom 9hs · Jue 19hs" },
  { sede: "Villa Real", horarios: "Mié 18hs · Sáb 10:30hs" },
  { sede: "Puerto Madero", horarios: "Mar 18hs" },
  { sede: "Colegiales", horarios: "Mié 18hs · Jue 19hs" },
  { sede: "Plaza La Pampa", horarios: "Sáb y Dom 8hs" },
  { sede: "Vicente López", horarios: "Sáb 9hs" },
  { sede: "Devoto", horarios: "Mar y Vie 19hs" },
];

const HorariosSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="horarios" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Horarios</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Clases todos los días
          </h2>
          <p className="text-muted-foreground text-lg">
            Encontrá el horario que mejor se adapte a tu rutina
          </p>
        </div>

        {/* ── Grid semanal (desktop) ── */}
        <div className="hidden lg:grid lg:grid-cols-7 gap-1 max-w-7xl mx-auto">
          {dias.map((dia, i) => (
            <div
              key={dia}
              className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Day header */}
              <div className="border-b-2 border-primary/20 pb-2 mb-3">
                <h3 className="font-black text-foreground text-base tracking-tight text-center">
                  {dia}
                </h3>
              </div>

              {/* Classes */}
              <div className="flex flex-col gap-2">
                {horarios[dia].map((clase, j) => (
                  <div
                    key={j}
                    className="bg-card rounded-lg p-3 shadow-sm border border-border hover:shadow-md transition-shadow"
                  >
                    <p className="font-bold text-foreground text-xs leading-tight">{clase.sede}</p>
                    <div className="flex items-center gap-1 mt-1.5">
                      <Clock className="w-3 h-3 text-primary shrink-0" />
                      <p className="text-muted-foreground text-xs">{clase.hora}</p>
                    </div>
                    {clase.disciplina && (
                      <span
                        className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${badgeStyles[clase.disciplina as DisciplinaType] || badgeStyles.General}`}
                      >
                        {clase.disciplina}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Grid semanal (mobile) ── */}
        <div className="lg:hidden flex flex-col gap-6 max-w-lg mx-auto">
          {dias.map((dia, i) => (
            <div
              key={dia}
              className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="border-b-2 border-primary/20 pb-2 mb-3">
                <h3 className="font-black text-foreground text-lg">{dia}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {horarios[dia].map((clase, j) => (
                  <div
                    key={j}
                    className="bg-card rounded-lg p-3 shadow-sm border border-border"
                  >
                    <p className="font-bold text-foreground text-sm">{clase.sede}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                      <p className="text-muted-foreground text-sm">{clase.hora}</p>
                    </div>
                    {clase.disciplina && (
                      <span
                        className={`inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${badgeStyles[clase.disciplina as DisciplinaType] || badgeStyles.General}`}
                      >
                        {clase.disciplina}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-muted-foreground text-xs mt-8">
          * Los horarios pueden cambiar sin previo aviso. Consultá nuestras redes para actualizaciones.
        </p>

        {/* ── Sección Alquiler ── */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-3">
              <Wrench className="w-5 h-5 text-primary" />
              <p className="text-primary font-bold text-sm tracking-widest uppercase">Alquiler de equipo</p>
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
              ¿No tenés rollers? No hay problema
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {alquilerSedes.map((a, i) => (
              <div
                key={i}
                className={`rounded-xl p-5 bg-card border border-border shadow-sm hover:shadow-md transition-shadow ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 rounded-full p-2 shrink-0">
                    <MapPin className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-foreground text-sm">{a.sede}</p>
                    <div className="flex items-center gap-1.5 mt-2">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-muted-foreground text-xs">{a.horarios}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-muted rounded-xl p-4 max-w-2xl mx-auto text-center">
            <p className="text-muted-foreground text-sm">
              <strong className="text-foreground">Importante:</strong> Reservá con al menos 24hs de antelación. El alquiler tiene una tarifa estándar adicional al plan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorariosSection;
