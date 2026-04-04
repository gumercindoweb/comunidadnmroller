import { Clock, MapPin, Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ── Horarios generales ──
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

// ── Disciplinas ──
interface Disciplina {
  sede: string;
  disciplina: string;
  horarios: string;
}

const disciplinas: Disciplina[] = [
  { sede: "Rosedal Palermo", disciplina: "Slalom", horarios: "Mar y Mié 9hs · Mié 20hs · Jue 19hs" },
  { sede: "Rosedal Palermo", disciplina: "Urbano", horarios: "Sáb 10hs" },
  { sede: "Rosedal Palermo", disciplina: "Frenadas", horarios: "Mar 20hs" },
  { sede: "Rosedal", disciplina: "Rampas", horarios: "Jue 20hs" },
  { sede: "Belgrano", disciplina: "Skatepark", horarios: "Mié y Vie 20hs" },
  { sede: "Villa Luro", disciplina: "Skatepark", horarios: "Vie 20hs" },
  { sede: "Madero", disciplina: "Slalom", horarios: "Mar 19hs" },
  { sede: "Madero", disciplina: "Urbano", horarios: "Sáb 10hs" },
  { sede: "Villa Real", disciplina: "Urbano", horarios: "Sáb 11:30hs" },
  { sede: "Vicente López", disciplina: "Slalom", horarios: "Sáb 9hs" },
  { sede: "Rivadavia", disciplina: "Frenadas", horarios: "Jue 20hs" },
  { sede: "Parque Rivadavia", disciplina: "General", horarios: "Dom 9hs" },
];

type DisciplinaType = "Slalom" | "Urbano" | "Skatepark" | "Frenadas" | "Rampas" | "General";

const disciplinaStyles: Record<DisciplinaType, { card: string; badge: string }> = {
  Slalom: {
    card: "bg-background border-2 border-primary/40",
    badge: "bg-primary/10 text-primary",
  },
  Urbano: {
    card: "bg-muted border border-border",
    badge: "bg-muted-foreground/10 text-muted-foreground",
  },
  Skatepark: {
    card: "bg-amber-50 border border-amber-300",
    badge: "bg-amber-200 text-amber-800",
  },
  Frenadas: {
    card: "bg-muted border border-border",
    badge: "bg-muted-foreground/10 text-muted-foreground",
  },
  Rampas: {
    card: "bg-amber-50 border border-amber-300",
    badge: "bg-amber-200 text-amber-800",
  },
  General: {
    card: "bg-background border border-border",
    badge: "bg-secondary text-secondary-foreground",
  },
};

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
        <div className="text-center mb-12">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Horarios</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-foreground mb-4">
            Clases todos los días
          </h2>
          <p className="text-muted-foreground text-lg">
            Encontrá el horario que mejor se adapte a tu rutina
          </p>
        </div>

        <Tabs defaultValue="horarios" className="max-w-7xl mx-auto">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-10 h-12">
            <TabsTrigger value="horarios" className="text-sm font-bold">
              <Clock className="w-4 h-4 mr-1.5" />
              Horarios
            </TabsTrigger>
            <TabsTrigger value="disciplinas" className="text-sm font-bold">
              <MapPin className="w-4 h-4 mr-1.5" />
              Disciplinas
            </TabsTrigger>
            <TabsTrigger value="alquiler" className="text-sm font-bold">
              <Wrench className="w-4 h-4 mr-1.5" />
              Alquiler
            </TabsTrigger>
          </TabsList>

          {/* ── Tab: Horarios generales ── */}
          <TabsContent value="horarios">
            <div className="hidden lg:grid lg:grid-cols-7 gap-3">
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
          </TabsContent>

          {/* ── Tab: Disciplinas ── */}
          <TabsContent value="disciplinas">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {disciplinas.map((d, i) => {
                const style = disciplinaStyles[d.disciplina as DisciplinaType] || disciplinaStyles.General;
                return (
                  <div
                    key={i}
                    className={`rounded-xl p-5 ${style.card} ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                    style={{ animationDelay: `${i * 0.04}s` }}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                      <div className="flex-1">
                        <p className="font-bold text-foreground text-sm">{d.sede}</p>
                        <span className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${style.badge}`}>
                          {d.disciplina}
                        </span>
                        <div className="flex items-center gap-1.5 mt-2">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                          <p className="text-muted-foreground text-xs">{d.horarios}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* ── Tab: Alquiler ── */}
          <TabsContent value="alquiler">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {alquilerSedes.map((a, i) => (
                <div
                  key={i}
                  className={`rounded-xl p-5 bg-background border border-border shadow-sm ${isVisible ? "animate-fade-up" : "opacity-0"}`}
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
          </TabsContent>
        </Tabs>

        <p className="text-center text-muted-foreground text-xs mt-8">
          * Los horarios pueden cambiar sin previo aviso. Consultá nuestras redes para actualizaciones.
        </p>
      </div>
    </section>
  );
};

export default HorariosSection;
