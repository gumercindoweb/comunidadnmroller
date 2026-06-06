import { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Wrench, Package, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import AlquilerSedesGrid from "@/components/alquiler/AlquilerSedesGrid";
// ── Tipos ──
interface ClaseEnriquecida {
  sede: string;
  hora: string;
  disciplina?: string;
}

// Niveles (pill, paleta teal progresiva) y disciplinas (sharp, rojo/amber)
const badgeStyles: Record<string, string> = {
  // Niveles
  "Primeros pasos": "rounded-full bg-secondary/15 text-secondary border border-secondary/40",
  "Principiante": "rounded-full bg-secondary/40 text-secondary-foreground border border-secondary/70",
  "Intermedio": "rounded-full bg-secondary text-background border border-secondary",
  // Disciplinas
  Slalom: "rounded-none bg-primary/15 text-primary border border-primary/50",
  Frenadas: "rounded-none bg-primary/10 text-primary border border-primary/40 border-dashed",
  Urbano: "rounded-none bg-muted text-foreground border border-border",
  Skatepark: "rounded-none bg-amber-500/15 text-amber-300 border border-amber-500/50",
  Rampas: "rounded-none bg-amber-500/25 text-amber-200 border border-amber-500/70",
};

const badgeDescriptions: Record<string, string> = {
  "Primeros pasos": "Tu primer contacto con los rollers, sin presión y con acompañamiento real.",
  "Principiante": "Empezás a soltarte, ganar confianza y disfrutar cada avance.",
  "Intermedio": "Más control, más fluidez… empezás a sentirte realmente patinador.",
  "Slalom": "Técnica y flow entre conos para dominar cada movimiento.",
  "Frenadas": "Control total: aprendé a frenar seguro y moverte con confianza.",
  "Skatepark": "Desafío, adrenalina y nuevos trucos en un entorno distinto.",
  "Rampas": "Subidas, bajadas y saltos para llevar tu nivel al siguiente paso.",
  "Urbano": "La ciudad como pista: aprendé a moverte con seguridad real.",
};

// ── Horarios enriquecidos con disciplina ──
const horarios: Record<string, ClaseEnriquecida[]> = {
  Lunes: [
    { sede: "P. Rivadavia", hora: "19:00", disciplina: "Primeros pasos" },
  ],
  Martes: [
    { sede: "P. Rivadavia", hora: "19:00", disciplina: "Primeros pasos" },
    { sede: "Devoto", hora: "19:00", disciplina: "Primeros pasos" },
    { sede: "Puerto Madero", hora: "18:00", disciplina: "Primeros pasos" },
    { sede: "Puerto Madero", hora: "19:00", disciplina: "Principiante" },
    { sede: "Rosedal Palermo", hora: "09:00", disciplina: "Primeros pasos" },
    { sede: "Rosedal Palermo", hora: "19:00", disciplina: "Principiante" },
    { sede: "Rosedal Palermo", hora: "09:00", disciplina: "Slalom" },
    { sede: "Madero", hora: "19:00", disciplina: "Slalom" },
    { sede: "Rosedal Palermo", hora: "20:00", disciplina: "Frenadas" },
  ],
  Miércoles: [
    { sede: "Villa Real", hora: "18:00", disciplina: "Primeros pasos" },
    { sede: "Villa Real", hora: "19:00", disciplina: "Principiante" },
    { sede: "Belgrano", hora: "19:00", disciplina: "Principiante" },
    { sede: "Colegiales", hora: "18:00", disciplina: "Primeros pasos" },
    { sede: "Vicente López", hora: "18:30", disciplina: "Primeros pasos" },
    { sede: "Rosedal Palermo", hora: "09:00", disciplina: "Primeros pasos" },
    { sede: "Rosedal Palermo", hora: "19:00", disciplina: "Principiante" },
    { sede: "Rosedal Palermo", hora: "20:00", disciplina: "Slalom" },
    { sede: "Belgrano", hora: "20:00", disciplina: "Skatepark" },
  ],
  Jueves: [
    { sede: "P. Rivadavia", hora: "19:00", disciplina: "Primeros pasos" },
    { sede: "Colegiales", hora: "19:00", disciplina: "Principiante" },
    { sede: "Rosedal Palermo", hora: "19:00", disciplina: "Principiante" },
    { sede: "Rosedal Palermo", hora: "19:00", disciplina: "Slalom" },
    { sede: "Rosedal Palermo", hora: "20:00", disciplina: "Rampas" },
    { sede: "Rivadavia", hora: "20:00", disciplina: "Frenadas" },
  ],
  Viernes: [
    { sede: "Devoto", hora: "19:00", disciplina: "Primeros pasos" },
    { sede: "Villa Luro", hora: "19:00", disciplina: "Primeros pasos" },
    { sede: "Belgrano", hora: "19:00", disciplina: "Principiante" },
    { sede: "Villa Luro", hora: "20:00", disciplina: "Skatepark" },
    { sede: "Belgrano", hora: "20:00", disciplina: "Skatepark" },
  ],
  Sábado: [
    { sede: "Villa Real", hora: "10:30", disciplina: "Primeros pasos" },
    { sede: "Plaza La Pampa", hora: "08:00", disciplina: "Primeros pasos" },
    { sede: "Puerto Madero", hora: "09:00", disciplina: "Primeros pasos" },
    { sede: "Vicente López", hora: "09:00", disciplina: "Primeros pasos" },
    { sede: "Rosedal Palermo", hora: "09:00", disciplina: "Primeros pasos" },
    { sede: "Rosedal Palermo", hora: "18:00", disciplina: "Principiante" },
    { sede: "Vicente López", hora: "09:00", disciplina: "Slalom" },
    { sede: "Rosedal Palermo", hora: "10:00", disciplina: "Urbano" },
    { sede: "Madero", hora: "10:00", disciplina: "Urbano" },
    { sede: "Villa Real", hora: "11:30", disciplina: "Urbano" },
  ],
  Domingo: [
    { sede: "P. Rivadavia", hora: "09:00", disciplina: "Primeros pasos" },
    { sede: "Plaza La Pampa", hora: "08:00", disciplina: "Primeros pasos" },
    { sede: "Rosedal Palermo", hora: "09:00", disciplina: "Primeros pasos" },
    { sede: "Parque Rivadavia", hora: "09:00", disciplina: "Slalom" },
  ],
};

const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

type TabType = "clases" | "alquiler";

// ── Componentes de cards ──
const ClaseCard = ({ clase, size = "sm" }: { clase: ClaseEnriquecida; size?: "sm" | "md" }) => (
  <div className="bg-card rounded-lg p-3 shadow-sm border border-border hover:shadow-md transition-shadow h-full flex flex-col">
    <p className={`font-bold text-foreground leading-tight ${size === "sm" ? "text-xs" : "text-sm"}`}>
      {clase.sede}
    </p>
    <div className="flex items-center gap-1 mt-1.5">
      <Clock className={`${size === "sm" ? "w-3 h-3" : "w-3.5 h-3.5"} text-primary shrink-0`} />
      <p className={`text-muted-foreground ${size === "sm" ? "text-xs" : "text-sm"}`}>{clase.hora}</p>
    </div>
    {clase.disciplina && (
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <span
            title={badgeDescriptions[clase.disciplina] || ""}
            className={`inline-block self-start mt-2 px-2 py-0.5 max-w-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wide leading-tight break-words cursor-help ${badgeStyles[clase.disciplina] || ""}`}
          >
            {clase.disciplina}
          </span>
        </TooltipTrigger>
        {badgeDescriptions[clase.disciplina] && (
          <TooltipContent side="top" className="max-w-xs text-xs leading-snug">
            {badgeDescriptions[clase.disciplina]}
          </TooltipContent>
        )}
      </Tooltip>
    )}
  </div>
);

const HorariosSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeTab, setActiveTab] = useState<TabType>("clases");

  return (
    <section id="horarios" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Horarios</p>
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tight text-foreground mb-4">
            Clases todos los días
          </h2>
          <p className="text-muted-foreground text-lg">
            Encontrá el horario que mejor se adapte a tu rutina
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-muted rounded-xl p-1.5 gap-1 flex-wrap justify-center">
            <button
              onClick={() => setActiveTab("clases")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
                activeTab === "clases"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              📅 Todas las clases
            </button>
            <button
              onClick={() => setActiveTab("alquiler")}
              className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "alquiler"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Package className="w-4 h-4" />
              Alquiler + Clases
            </button>
          </div>
        </div>

        {/* ── TAB: Todas las clases ── */}
        {activeTab === "clases" && (
          <>
            {/* Desktop grid */}
            <div className="hidden lg:grid lg:grid-cols-7 gap-1 max-w-7xl mx-auto">
              {dias.map((dia, i) => (
                <div
                  key={dia}
                  className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <div className="border-b-2 border-primary/20 pb-2 mb-3">
                    <h3 className="font-black text-foreground text-base italic tracking-tight text-center">
                      {dia}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {horarios[dia].map((clase, j) => (
                      <ClaseCard key={j} clase={clase} size="sm" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile grid */}
            <div className="lg:hidden flex flex-col gap-6 max-w-lg mx-auto">
              {dias.map((dia, i) => (
                <div
                  key={dia}
                  className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className="border-b-2 border-primary/20 pb-2 mb-3">
                    <h3 className="font-black text-foreground text-lg italic">{dia}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {horarios[dia].map((clase, j) => (
                      <ClaseCard key={j} clase={clase} size="md" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── TAB: Alquiler + Clases ── */}
        {activeTab === "alquiler" && (
          <div className="max-w-5xl mx-auto">
            {/* Highlight banner */}
            <div className="bg-primary/5 border border-primary/15 rounded-2xl p-6 md:p-8 mb-10 text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
                <Wrench className="w-4 h-4 text-primary" />
                <span className="text-primary font-bold text-xs uppercase tracking-widest">Servicio de alquiler</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black italic tracking-tight text-foreground mb-2">
                Sedes con alquiler de equipo + clases
              </h3>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Estas sedes ofrecen alquiler de rollers y protecciones para que puedas tomar clase sin necesidad de traer tu equipo.
              </p>
            </div>

            {/* Alquiler cards */}
            <AlquilerSedesGrid />

            {/* Nota + CTA */}
            <div className="mt-8 bg-muted rounded-xl p-5 max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground text-sm mb-4">
                <strong className="text-foreground">Importante:</strong> Reservá con al menos 24hs de antelación. El alquiler tiene una tarifa estándar adicional al plan.
              </p>
              <Link
                to="/clases-de-rollers-mas-alquiler"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold uppercase tracking-[0.15em] text-xs px-5 py-3 rounded-full hover:gap-3 transition-all"
              >
                Ver página completa de Clases + Alquiler
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
        {/* Disclaimer */}
        <p className="text-center text-muted-foreground text-xs mt-8">
          * Los horarios pueden cambiar sin previo aviso. Consultá nuestras redes para actualizaciones.
        </p>
      </div>
    </section>
  );
};

export default HorariosSection;
