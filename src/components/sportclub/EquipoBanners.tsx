import { useState } from "react";
import { Play, ArrowRight, Package, ShoppingBag } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

// ── Imágenes ──
// TODO: reemplazar por las imágenes definitivas que pase el cliente.
// Banner alquiler → patinador haciendo slalom. Banner kit → persona con protecciones.
import imgAlquiler from "@/assets/patinadores-comunidad.png";
import imgKit from "@/assets/patinadores-comunidad.png";

// Video de YouTube que se reproduce en modal (dentro de la misma landing)
const YT_ID = "qgwPjKBUlCI";
const KIT_URL = "https://lp.flyfreeurban.com/kit-de-iniciacion-adulto/";

const scrollToForm = () =>
  document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });

const EquipoBanners = () => {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="px-6 lg:px-16 py-16">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado de sección */}
        <div className="flex items-center gap-3 mb-2">
          <Package className="w-5 h-5 text-primary" />
          <span className="text-xs uppercase tracking-[0.18em] text-primary font-bold">
            Tu equipo para patinar
          </span>
        </div>
        <h2 className="font-display italic uppercase text-3xl md:text-5xl font-black mb-3">
          ¿Todavía no tenés rollers?
        </h2>
        <p className="text-foreground/70 max-w-2xl mb-10">
          No necesitás equipo propio para empezar. Alquilalo como socio o armá tu
          propio kit para arrancar con todo.
        </p>

        <div className="space-y-6">
          {/* ── Banner 1 · Alquiler de equipo (socios) ── */}
          <div className="grid lg:grid-cols-2 bg-card border border-border overflow-hidden">
            {/* Texto */}
            <div className="order-1 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-primary text-[11px] font-black uppercase tracking-[0.18em] mb-4">
                <Package className="w-3.5 h-3.5" /> Alquiler · 50% OFF socios
              </div>
              <h3 className="font-display italic uppercase text-2xl md:text-4xl font-black leading-[0.95] mb-4">
                Servicio de alquiler y venta de equipo para tus clases
              </h3>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-7 max-w-md">
                Rollers y protecciones listos para tu clase. Como socio SportClub
                accedés al alquiler con 50% de descuento — sin comprar nada.
              </p>
              <div>
                <button
                  onClick={scrollToForm}
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-[0.16em] text-xs md:text-sm hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)] transition-all"
                >
                  Me interesa alquilar equipo, soy socio del club
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            {/* Imagen */}
            <div className="order-2 relative min-h-[260px] lg:min-h-[360px]">
              <img
                src={imgAlquiler}
                alt="Patinador entrenando slalom con rollers"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── Banner 2 · Armá tu propio kit ── */}
          <div className="grid lg:grid-cols-2 bg-card border border-border overflow-hidden">
            {/* Imagen + Play (en mobile va arriba) */}
            <button
              onClick={() => setVideoOpen(true)}
              aria-label="Reproducir video: armá tu kit para arrancar a patinar"
              className="order-1 relative min-h-[260px] lg:min-h-[360px] group cursor-pointer"
            >
              <img
                src={imgKit}
                alt="Persona con protecciones lista para patinar"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-lg group-hover:scale-105 transition-all">
                  <Play className="w-7 h-7 md:w-8 md:h-8 text-black fill-black ml-1" />
                </span>
              </span>
            </button>
            {/* Texto */}
            <div className="order-2 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-primary text-[11px] font-black uppercase tracking-[0.18em] mb-4">
                <ShoppingBag className="w-3.5 h-3.5" /> Kit de iniciación
              </div>
              <h3 className="font-display italic uppercase text-2xl md:text-4xl font-black leading-[0.95] mb-4">
                Armá tu propio kit esencial para arrancar a patinar
              </h3>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-7 max-w-md">
                ¿Querés tu propio equipo? Mirá el video y conseguí el kit completo
                de iniciación: rollers + protecciones, todo lo que necesitás para empezar.
              </p>
              <div>
                <a
                  href={KIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 font-bold uppercase tracking-[0.16em] text-xs md:text-sm hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)] transition-all"
                >
                  Más información
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal de video (YouTube embebido en la misma landing) ── */}
      <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-border bg-background">
          <DialogTitle className="sr-only">
            Armá tu kit para arrancar a patinar
          </DialogTitle>
          <div className="relative w-full aspect-video bg-black">
            {videoOpen && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`}
                title="Armá tu kit para arrancar a patinar"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EquipoBanners;
