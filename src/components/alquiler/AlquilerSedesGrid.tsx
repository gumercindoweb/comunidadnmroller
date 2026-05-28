import { Clock, MapPin } from "lucide-react";
import { alquilerClaseSedes } from "@/data/sedes-alquiler";

const AlquilerSedesGrid = ({ animate = true }: { animate?: boolean }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {alquilerClaseSedes.map((a, i) => (
        <div
          key={i}
          className={`rounded-xl p-5 bg-card border-2 border-primary/10 shadow-sm hover:shadow-md hover:border-primary/25 transition-all ${animate ? "animate-fade-up" : ""}`}
          style={animate ? { animationDelay: `${i * 0.05}s` } : undefined}
        >
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 rounded-full p-2.5 shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-bold text-foreground text-sm">{a.sede}</p>
                <span className="bg-primary/10 text-primary text-[9px] font-bold uppercase px-2 py-0.5 rounded-full whitespace-nowrap">
                  Alquiler
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-2">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <p className="text-muted-foreground text-xs">{a.horarios}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlquilerSedesGrid;
