import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Clock, MapPin, ExternalLink } from "lucide-react";
import { Sede, ordenDias, disciplinaColor } from "@/data/sedes";

interface Props {
  sede: Sede | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SedeDetalleDialog = ({ sede, open, onOpenChange }: Props) => {
  if (!sede) return null;

  const clasesPorDia = ordenDias
    .map((dia) => ({ dia, clases: sede.clases.filter((c) => c.dia === dia) }))
    .filter((d) => d.clases.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-card border-border rounded-none">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black italic tracking-tight text-foreground">
            {sede.nombre}
          </DialogTitle>
          <div className="flex items-start gap-2 text-muted-foreground text-sm pt-1">
            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p>{sede.direccion}</p>
              <p className="text-xs">{sede.area}</p>
            </div>
          </div>
          {sede.alquiler && (
            <span className="inline-flex w-fit items-center gap-1.5 mt-2 bg-secondary/15 text-secondary border border-secondary/30 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
              Alquiler disponible
            </span>
          )}
        </DialogHeader>

        <div className="mt-4 space-y-5">
          {clasesPorDia.length === 0 ? (
            <p className="text-muted-foreground text-sm italic">
              No hay clases regulares en esta sede actualmente.
            </p>
          ) : (
            clasesPorDia.map(({ dia, clases }) => (
              <div key={dia}>
                <h4 className="text-foreground font-black uppercase tracking-widest text-xs border-b border-primary/30 pb-1.5 mb-2.5">
                  {dia}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {clases.map((c, i) => (
                    <div
                      key={i}
                      className="bg-background border border-border p-2.5 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span className="text-foreground font-bold text-sm">{c.hora}</span>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full whitespace-nowrap ${
                          disciplinaColor[c.disciplina] || "bg-muted text-foreground"
                        }`}
                      >
                        {c.disciplina === "Primeros pasos y principiante"
                          ? "Principiante"
                          : c.disciplina}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          <a
            href={sede.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors font-bold uppercase tracking-[0.18em] text-xs pt-2"
          >
            Cómo llegar <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SedeDetalleDialog;
