import { Clock } from "lucide-react";
import { sedes, ordenDias, disciplinaColor, expandirNivel } from "@/data/sedes";

// Aplana las clases de sedes con alquiler en una grilla día → lista
const buildHorarios = () => {
  const map: Record<string, { sede: string; hora: string; disciplina: string }[]> = {};
  ordenDias.forEach((d) => (map[d] = []));
  sedes
    .filter((s) => s.alquiler)
    .forEach((s) => {
      s.clases.forEach((c) => {
        map[c.dia]?.push({ sede: s.nombre, hora: c.hora, disciplina: c.disciplina });
      });
    });
  Object.values(map).forEach((list) =>
    list.sort((a, b) => a.hora.localeCompare(b.hora)),
  );
  return map;
};

const AlquilerHorariosGrid = () => {
  const horarios = buildHorarios();
  const diasVisibles = ordenDias.filter((d) => horarios[d].length > 0);
  const colsDesktop = Math.min(Math.max(diasVisibles.length, 1), 7);

  return (
    <div className="w-full">
      {/* Desktop */}
      <div
        className="hidden lg:grid gap-1 max-w-7xl mx-auto"
        style={{ gridTemplateColumns: `repeat(${colsDesktop}, minmax(0, 1fr))` }}
      >
        {diasVisibles.map((dia) => (
          <div key={dia}>
            <div className="border-b-2 border-primary/20 pb-2 mb-3">
              <h3 className="font-black text-foreground text-base italic tracking-tight text-center">
                {dia}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              {horarios[dia].map((c, j) => (
                <div
                  key={j}
                  className="bg-card rounded-lg p-3 shadow-sm border border-border h-full flex flex-col"
                >
                  <p className="font-bold text-foreground leading-tight text-xs">{c.sede}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock className="w-3 h-3 text-primary shrink-0" />
                    <p className="text-muted-foreground text-xs">{c.hora}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {expandirNivel(c.disciplina).map((b) => (
                      <span
                        key={b}
                        className={`inline-flex items-center px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide leading-tight break-words ${disciplinaColor[b] || ""}`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex flex-col gap-6 max-w-lg mx-auto">
        {diasVisibles.map((dia) => (
          <div key={dia}>
            <div className="border-b-2 border-primary/20 pb-2 mb-3">
              <h3 className="font-black text-foreground text-lg italic">{dia}</h3>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {horarios[dia].map((c, j) => (
                <div
                  key={j}
                  className="bg-card rounded-lg p-3 shadow-sm border border-border h-full flex flex-col"
                >
                  <p className="font-bold text-foreground leading-tight text-sm">{c.sede}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                    <p className="text-muted-foreground text-sm">{c.hora}</p>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {expandirNivel(c.disciplina).map((b) => (
                      <span
                        key={b}
                        className={`inline-flex items-center px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide leading-tight break-words ${disciplinaColor[b] || ""}`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlquilerHorariosGrid;
