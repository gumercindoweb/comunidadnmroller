import { ArrowRight } from "lucide-react";
import logoFlyFree from "@/assets/logo-flyfree-urban.webp";

const FLY_FREE_KIT_URL = "https://lp.flyfreeurban.com/kit-de-iniciacion-adulto/";
const FLY_FREE_MODELOS_URL = "https://www.flyfreeurban.com/marcas/";

const FlyFreePanel = () => (
  <div className="mt-2 rounded-xl overflow-hidden border border-[#F5C400]/30 bg-gradient-to-br from-[#F5C400]/5 to-transparent">
    {/* Header con logo */}
    <div className="flex items-center gap-3 px-4 pt-4 pb-3 border-b border-[#F5C400]/20">
      <div className="bg-white rounded px-2 py-1 shrink-0">
        <img
          src={logoFlyFree}
          alt="Fly Free Urban"
          className="h-5 w-auto"
        />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5C400]">
        Marca aliada · Tienda oficial
      </span>
    </div>

    {/* Cuerpo */}
    <div className="px-4 pt-3 pb-4">
      <p className="font-black uppercase text-sm tracking-tight text-foreground mb-1">
        ¡Invertí en tu equipo propio!
      </p>
      <p className="text-muted-foreground text-xs leading-relaxed mb-4">
        Tener tus rollers marca la diferencia: más progreso, más comodidad,
        más ganas de salir a patinar. Fly Free tiene opciones para todos los
        presupuestos y niveles.
      </p>

      <div className="flex flex-col gap-2">
        <a
          href={FLY_FREE_KIT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-between gap-2 bg-[#F5C400] text-black rounded-lg px-4 py-2.5 text-xs font-black uppercase tracking-wide hover:bg-[#F5C400]/90 transition-colors"
        >
          Ver kit de iniciación
          <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </a>
        <a
          href={FLY_FREE_MODELOS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center justify-between gap-2 border border-[#F5C400]/40 text-foreground/70 rounded-lg px-4 py-2.5 text-xs font-bold uppercase tracking-wide hover:border-[#F5C400] hover:text-foreground transition-colors"
        >
          Explorar todos los modelos
          <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  </div>
);

export default FlyFreePanel;
