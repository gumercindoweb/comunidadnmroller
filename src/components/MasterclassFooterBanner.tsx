import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ArrowRight, X, Sparkles } from "lucide-react";
import { getProximaMasterclass } from "@/data/masterclasses";

const MasterclassFooterBanner = () => {
  const mc = getProximaMasterclass();
  const storageKey = `mc_banner_${mc.slug}`;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const visto = localStorage.getItem(storageKey);
      if (visto) setVisible(false);
    } catch {}
  }, [storageKey]);

  const cerrar = () => {
    try {
      localStorage.setItem(storageKey, "1");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-gradient-to-r from-primary/15 via-primary/10 to-primary/15 border-y border-primary/20 px-4 py-5 md:py-6 mb-10 md:mb-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Contenido */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 bg-primary/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] mb-2 md:mb-1">
              <Sparkles className="w-3 h-3 text-primary" /> Evento especial
            </div>
            <h3 className="font-black italic text-lg md:text-xl text-foreground mb-2">
              Masterclass de Patinaje
            </h3>
            <p className="text-sm text-foreground/70 mb-3 md:mb-0">
              Una clase intensiva el <strong className="text-foreground">{mc.fechaLabel}</strong> en {mc.sede}. Cupos limitados.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-foreground/60 md:hidden mt-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> {mc.hora}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> {mc.sede}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to={`/masterclass-de-patinaje/${mc.slug}`}
              onClick={cerrar}
              className="inline-flex items-center justify-center gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground px-4 md:px-5 py-2.5 md:py-2 font-bold uppercase tracking-[0.12em] text-xs md:text-sm transition-all rounded-full shadow-sm hover:shadow-md"
            >
              Quiero sumarme
              <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </Link>
            <button
              onClick={cerrar}
              className="p-1.5 text-foreground/40 hover:text-foreground/70 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Info desktop (oculta en mobile) */}
        <div className="hidden md:flex items-center gap-6 mt-3 text-xs text-foreground/60">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {mc.fechaLabel}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {mc.hora}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> {mc.sede}
          </span>
          <span className="ml-auto">
            Desde <strong className="text-foreground">{mc.precios.alumnos}</strong> · {mc.precios.general}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MasterclassFooterBanner;
