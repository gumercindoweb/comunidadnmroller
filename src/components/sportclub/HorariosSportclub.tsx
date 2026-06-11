import { Clock } from "lucide-react";
import { Sede } from "@/data/sedes";

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

interface ClaseDia {
  sede: string;
  hora: string;
}

const HorariosSportclub = ({
  sedesBeneficio,
  nivelLabel,
}: {
  sedesBeneficio: Sede[];
  nivelLabel: string;
}) => {
  // Reorganiza los horarios del beneficio (que vienen por sede) en una grilla por día
  const porDia: Record<string, ClaseDia[]> = {};
  DIAS.forEach((d) => (porDia[d] = []));
  sedesBeneficio.forEach((s) =>
    s.clases.forEach((c) => {
      if (porDia[c.dia]) porDia[c.dia].push({ sede: s.nombre, hora: c.hora });
    }),
  );
  // Ordena por hora dentro de cada día
  Object.values(porDia).forEach((list) => list.sort((a, b) => a.hora.localeCompare(b.hora)));

  const diasVisibles = DIAS.filter((d) => porDia[d].length > 0);
  const cols = Math.min(Math.max(diasVisibles.length, 1), 7);

  const ClaseCard = ({ clase }: { clase: ClaseDia }) => (
    <div className="bg-card rounded-lg p-3 border border-border">
      <p className="font-bold text-foreground text-xs leading-tight">{clase.sede}</p>
      <div className="flex items-center gap-1 mt-1.5">
        <Clock className="w-3 h-3 text-primary shrink-0" />
        <p className="text-muted-foreground text-xs">{clase.hora} hs</p>
      </div>
      <span className="inline-block mt-2 text-[9px] font-bold uppercase tracking-wide leading-tight rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/60 px-2 py-0.5">
        {nivelLabel}
      </span>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto mt-16">
      <h3 className="font-display italic uppercase text-2xl md:text-4xl font-black mb-2">
        Grilla horaria del beneficio
      </h3>
      <p className="text-foreground/60 text-sm mb-8 max-w-2xl">
        Estos son los días y horarios de las clases de <strong>nivel inicial y
        principiante</strong> incluidas en tu beneficio de socio, por sede.
      </p>

      {/* Desktop: columna por día */}
      <div
        className="hidden lg:grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {diasVisibles.map((dia) => (
          <div key={dia}>
            <div className="border-b-2 border-primary/20 pb-2 mb-3">
              <h4 className="font-black text-foreground text-base italic tracking-tight text-center">
                {dia}
              </h4>
            </div>
            <div className="flex flex-col gap-2">
              {porDia[dia].map((clase, i) => (
                <ClaseCard key={i} clase={clase} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile: bloque por día */}
      <div className="lg:hidden flex flex-col gap-6">
        {diasVisibles.map((dia) => (
          <div key={dia}>
            <div className="border-b-2 border-primary/20 pb-2 mb-3">
              <h4 className="font-black text-foreground text-lg italic">{dia}</h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {porDia[dia].map((clase, i) => (
                <ClaseCard key={i} clase={clase} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-foreground/40 text-xs mt-8">
        * Los horarios pueden cambiar sin previo aviso. Cupos limitados por sede.
      </p>
    </div>
  );
};

export default HorariosSportclub;
