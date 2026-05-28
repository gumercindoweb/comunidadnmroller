import { useState } from "react";
import { Check, Gift, Star, Banknote, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type Method = "efectivo" | "transferencia";

interface AlquilerPlan {
  name: string;
  subtitle: string;
  efectivo: { price: string; perClass?: string; suffix: string };
  transferencia: { price: string; perClass?: string; suffix: string };
  features: string[];
  bonus?: string;
  highlighted?: boolean;
  badge?: string;
  ctaLabel: string;
  footnote: { efectivo: string; transferencia: string };
}

const plans: AlquilerPlan[] = [
  {
    name: "Clase Única",
    subtitle: "Vigencia de un mes",
    efectivo: { price: "$35.000", suffix: "Único pago" },
    transferencia: { price: "$39.000", suffix: "Único pago" },
    features: [
      "1 Clase grupal",
      "Incluye rollers, casco y protecciones",
      "Ideal para probar sin compromiso",
      "Entrega y retiro del equipo en la sede, sin costo",
      "Abonás $7 mil por reprogramar",
    ],
    bonus: "Cupón de $10 mil para usar en tu próximo alquiler o compra de equipo (abonando en efectivo).",
    ctaLabel: "Reservar lugar",
    footnote: {
      efectivo: "El turno es solo para pago presencial en nuestra oficina, no en sede de clases.",
      transferencia: "Serás redirigido a Mercado Pago. Volvé a la página de confirmación para finalizar tu compra.",
    },
  },
  {
    name: "Clase 2x1",
    subtitle: "Compartí la experiencia · Solo domingos, Sede Rosedal",
    efectivo: { price: "$35.000", suffix: "Único pago (para 2 personas)" },
    transferencia: { price: "$39.000", suffix: "Único pago (para 2 personas)" },
    features: [
      "1 Clase grupal para vos + alguien más",
      "Incluye rollers, casco y protecciones",
      "Ideal para probar sin compromiso",
      "Entrega y retiro del equipo en la sede, sin costo",
      "Abonás $10 mil para reprogramar en otra sede a elección por persona",
    ],
    bonus: "Cupón de $5 mil por persona para usar en tu próximo alquiler o compra de equipo (abonando en efectivo).",
    ctaLabel: "Reservar 2x1",
    footnote: {
      efectivo: "El turno es solo para pago presencial en nuestra oficina, no en sede de clases.",
      transferencia: "Serás redirigido a Mercado Pago. Volvé a la página de confirmación para finalizar tu compra.",
    },
  },
  {
    name: "Pack 4 Clases",
    subtitle: "El plan más elegido para arrancar en serio",
    efectivo: { price: "$85.000", perClass: "$21.250 c/u", suffix: "Mensual" },
    transferencia: { price: "$95.000", perClass: "$23.750 c/u", suffix: "Mensual" },
    features: [
      "Incluye rollers, casco y protecciones en cada clase",
      "Entrega y retiro del equipo sin cargo en cada clase",
      "Podés reprogramar hasta 2 veces tu clase sin costo extra",
      "Asesoría personalizada sobre equipo por patinadores",
      "Acceso prioritario a horarios y sedes con alquiler",
    ],
    bonus: "Usás el 50% de este pack como parte de pago para la compra de tu propio kit (hasta la 2da clase).",
    highlighted: true,
    badge: "Mejor opción",
    ctaLabel: "Comprar pack",
    footnote: {
      efectivo: "El turno es solo para pago presencial en nuestra oficina, no en sede de clases.",
      transferencia: "Serás redirigido a Mercado Pago. Volvé a la página de confirmación para finalizar tu compra.",
    },
  },
];

const PricingAlquilerSection = ({ onReserve }: { onReserve: () => void }) => {
  const [method, setMethod] = useState<Method>("efectivo");
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="planes-alquiler" className="py-20 bg-primary text-primary-foreground" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-primary-foreground/80 font-bold text-sm tracking-[0.18em] uppercase mb-2">
            Packs disponibles
          </p>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tight mb-3">
            Opciones para empezar sin excusas
          </h2>
          <p className="text-primary-foreground/85 text-base md:text-lg italic max-w-2xl mx-auto">
            Pagás solo si lo vivís. Y si no te sentís cómodo, podés reprogramar o regalar tu lugar.
          </p>
        </div>

        {/* Toggle método */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex gap-2 p-1.5 bg-primary-foreground/10 rounded-full">
            {(["efectivo", "transferencia"] as Method[]).map((m) => (
              <button
                key={m}
                onClick={() => setMethod(m)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] transition-all ${
                  method === m
                    ? "bg-foreground text-[hsl(48_98%_50%)] shadow-lg"
                    : "text-primary-foreground/70 hover:text-primary-foreground"
                }`}
              >
                {m === "efectivo" ? <Banknote className="w-3.5 h-3.5" /> : <CreditCard className="w-3.5 h-3.5" />}
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 max-w-6xl mx-auto md:grid-cols-3">
          {plans.map((plan, i) => {
            const pricing = method === "efectivo" ? plan.efectivo : plan.transferencia;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-2xl p-7 border-2 transition-all duration-500 ${
                  plan.highlighted
                    ? "border-primary-foreground bg-primary-foreground/[0.08] shadow-2xl md:-translate-y-2"
                    : "border-primary-foreground/30 bg-primary-foreground/[0.04]"
                } ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {plan.badge && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background font-bold uppercase tracking-[0.15em] px-4 py-1 text-[10px]">
                    <Star className="w-3 h-3 mr-1 fill-current" /> {plan.badge}
                  </Badge>
                )}

                <div className="text-center mb-6">
                  <h3 className="text-lg font-black italic uppercase tracking-tight mb-1">{plan.name}</h3>
                  <p className="text-xs italic text-primary-foreground/70 min-h-[2.5rem]">{plan.subtitle}</p>
                </div>

                <div className="text-center mb-6">
                  {pricing.perClass && (
                    <p className="text-xs italic text-primary-foreground/70 mb-1">{pricing.perClass}</p>
                  )}
                  <p className="text-5xl md:text-6xl font-black italic leading-none">{pricing.price}</p>
                  <p className="text-xs italic text-primary-foreground/80 mt-2">{pricing.suffix}</p>
                </div>

                <ul className="space-y-3 mb-5 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-primary-foreground" strokeWidth={3} />
                      <span className="leading-snug">{f}</span>
                    </li>
                  ))}
                </ul>

                {plan.bonus && (
                  <div className="flex items-start gap-2 mb-6 pt-4 border-t border-primary-foreground/20">
                    <Gift className="w-4 h-4 mt-0.5 shrink-0 text-primary-foreground" />
                    <p className="text-xs font-semibold leading-snug">{plan.bonus}</p>
                  </div>
                )}

                <Button
                  onClick={onReserve}
                  className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-bold uppercase tracking-[0.15em] text-xs py-6 rounded-full"
                >
                  {method === "efectivo" ? plan.ctaLabel : "Comprar plan"}
                </Button>

                <p className="text-[10px] italic text-primary-foreground/70 text-center mt-3 leading-snug">
                  ⚠️ {plan.footnote[method]}
                </p>
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs italic text-primary-foreground/70 mt-10">
          Aplican términos y condiciones de uso
        </p>
      </div>
    </section>
  );
};

export default PricingAlquilerSection;
