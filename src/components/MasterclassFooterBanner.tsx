import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight, X, Sparkles } from "lucide-react";
import { getProximaMasterclass } from "@/data/masterclasses";

// Barra fija en el fondo del viewport. En mobile deja 80px libres a la
// izquierda (pl-20) para no tapar el botón flotante de WhatsApp.
const MasterclassFooterBanner = () => {
  const mc = getProximaMasterclass();
  const storageKey = `mc_banner_${mc.slug}`;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(storageKey)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, [storageKey]);

  const cerrar = () => {
    try { localStorage.setItem(storageKey, "1"); } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 animate-in slide-in-from-bottom duration-300">
      {/* En mobile: pl-20 deja libre el espacio del botón WhatsApp (bottom-5 left-5, 56px) */}
      <div className="bg-card border-t border-primary/30 shadow-[0_-4px_24px_rgba(0,0,0,0.3)]">
        <div className="container mx-auto px-4 pl-20 md:pl-4 py-3 md:py-4 flex items-center gap-3">

          {/* Badge (solo desktop) */}
          <div className="hidden md:inline-flex items-center gap-1.5 bg-primary/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-primary shrink-0">
            <Sparkles className="w-2.5 h-2.5" /> Evento
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="font-black italic text-foreground text-sm md:text-base leading-tight truncate">
              Masterclass de Patinaje
            </p>
            <p className="text-foreground/60 text-xs leading-tight flex flex-wrap gap-x-3 gap-y-0.5 mt-0.5">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 shrink-0" />{mc.fechaLabel}
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <Clock className="w-3 h-3 shrink-0" />{mc.hora}
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <MapPin className="w-3 h-3 shrink-0" />{mc.sede}
              </span>
            </p>
          </div>

          {/* Precio (solo desktop) */}
          <p className="hidden md:block text-xs text-foreground/60 shrink-0">
            Desde <strong className="text-foreground">{mc.precios.alumnos}</strong>
          </p>

          {/* CTA */}
          <Link
            to={`/masterclass-de-patinaje/${mc.slug}`}
            onClick={cerrar}
            className="shrink-0 inline-flex items-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-3 md:px-5 py-2 md:py-2.5 font-bold uppercase tracking-[0.1em] text-[11px] md:text-xs transition-all rounded-full shadow-sm hover:shadow-primary/30 hover:shadow-md"
          >
            <span className="hidden sm:inline">Quiero sumarme</span>
            <span className="sm:hidden">Sumarme</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Cerrar */}
          <button
            onClick={cerrar}
            className="shrink-0 p-1 text-foreground/40 hover:text-foreground/70 transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MasterclassFooterBanner;
