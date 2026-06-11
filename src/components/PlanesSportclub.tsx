import { Check, Sparkles, ClipboardList } from "lucide-react";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const WHATSAPP = "5491165920600";
const wa = (txt: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;

interface Plan {
  tag: string;
  nombre: string;
  sub?: string;
  ideal?: React.ReactNode;
  precioTachado?: string;
  precio: string;
  periodo?: string;
  destacado?: boolean;
  actual?: boolean;
  features: string[];
  cta?: { label: string; href: string };
}

const PLANES: Plan[] = [
  {
    tag: "Beneficio actual",
    nombre: "Exclusivo Socio SportClub",
    sub: "Requerís una membresía activa",
    ideal: "Ideal si recién empezás y todavía no tenés ningún conocimiento.",
    precio: "Gratis",
    actual: true,
    features: [
      "Clases ilimitadas",
      "1 clase por día",
      "Acceso a 10 sedes outdoor",
      "Nivel inicial y principiante",
    ],
  },
  {
    tag: "Plan Full",
    nombre: "Plan Full Socio SportClub",
    ideal: "Ideal si querés acelerar tu aprendizaje, acceder a nivel intermedio y disciplinas, y tomar hasta 2 clases por día.",
    precioTachado: "$79.000",
    precio: "45 mil",
    periodo: "Mensual",
    destacado: true,
    features: [
      "Clases ilimitadas",
      "Hasta 2 clases por día",
      "Acceso a 10 sedes outdoor",
      "Todos los niveles y disciplinas",
    ],
    cta: {
      label: "Comprar plan",
      href: wa(
        "[LP|PC|SS] Hola soy [tu nombre] Mis datos registrados en turnos web son [indica tu nro de DNI] y quiero el plan de acceso full de Socio Sport Club.",
      ),
    },
  },
  {
    tag: "Alquiler + Clases",
    nombre: "4 Clases + Alquiler",
    sub: "$13.750 por clase",
    ideal: (
      <>
        Ideal si todavía no estás seguro/a de si te va a gustar: probás 4 clases con el
        equipo incluido. Solo abonás el alquiler —{" "}
        <strong className="text-primary-foreground">las clases son gratis</strong>.
      </>
    ),
    precioTachado: "$95.000",
    precio: "50 mil",
    periodo: "Mensual",
    features: [
      "4 clases por mes",
      "Patines, protecciones y casco",
      "Acceso a 7 sedes outdoor",
      "Nivel inicial y principiante",
    ],
    cta: {
      label: "Comprar plan",
      href: wa(
        "[LP|PC|SS] Hola soy [tu nombre] Mis datos registrados en turnos web son [indica tu nro de DNI] y quiero el plan de Alquiler + Clases de Socio Sport Club.",
      ),
    },
  },
];

interface PlanesSportclubProps {
  /** "landing": los planes pagos llevan al formulario de alta + leyenda.
   *  "confirmacion": solo planes pagos, copy persuasivo, CTA directo a comprar. */
  variant?: "landing" | "confirmacion";
}

const PlanesSportclub = ({ variant = "landing" }: PlanesSportclubProps) => {
  const esConfirmacion = variant === "confirmacion";
  const planes = esConfirmacion ? PLANES.filter((p) => !p.actual) : PLANES;

  return (
    <section id="planes" className="px-6 lg:px-16 py-16 md:py-20 bg-background border-t border-border scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          {esConfirmacion ? (
            <>
              <div className="inline-flex items-center gap-2 bg-[#F5B800] text-[#111] px-4 py-1.5 mb-5 text-[11px] md:text-xs font-black uppercase tracking-[0.18em]">
                Subí de nivel
              </div>
              <h2 className="font-display italic uppercase text-3xl md:text-5xl font-black leading-[0.95] mb-4">
                ¿Querés patinar sin límites?
              </h2>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                Ya estás dentro. Con el <strong>Plan Full</strong> accedés{" "}
                <strong>sin límite a las 10 sedes</strong>, todos los niveles y disciplinas
                y hasta 2 clases por día. Y si todavía no tenés equipo, el pack{" "}
                <strong>4 clases + alquiler</strong> te deja probar con todo incluido.
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 mb-5 text-[11px] md:text-xs font-black uppercase tracking-[0.18em]">
                Abonás extra
              </div>
              <h2 className="font-display italic uppercase text-3xl md:text-5xl font-black leading-[0.95] mb-4">
                ¿Querés acceder al resto de sedes y disciplinas?
              </h2>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed">
                Tu beneficio cubre <strong>nivel inicial y principiante</strong>, una clase por día.
                Si querés <strong>escalar tu aprendizaje</strong> y tener acceso{" "}
                <strong>sin límite a todas las sedes, horarios, disciplinas y niveles</strong>, podés
                abonar una diferencia extra con estos planes. Y si no tenés equipo propio, podés
                alquilarlo con 4 clases.
              </p>
            </>
          )}
        </div>

        {/* Tarjetas */}
        <div
          className={`grid gap-5 mt-12 items-stretch ${
            esConfirmacion ? "md:grid-cols-2 max-w-3xl mx-auto" : "md:grid-cols-3"
          }`}
        >
          {planes.map((p) => {
            const paid = !p.actual;
            return (
              <div
                key={p.nombre}
                className={`relative flex flex-col p-7 border ${
                  p.destacado
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_0_40px_-8px_hsl(var(--primary)/0.6)] md:-translate-y-2"
                    : p.actual
                      ? "bg-card border-border"
                      : "bg-primary/95 text-primary-foreground border-primary/70"
                }`}
              >
                {p.destacado && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F5B800] text-[#111] text-[10px] font-black uppercase tracking-[0.18em] px-3 py-1">
                    Más elegido
                  </div>
                )}

                <div
                  className={`text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${
                    paid ? "text-primary-foreground/80" : "text-primary"
                  }`}
                >
                  {p.tag}
                </div>

                <h3 className="font-display italic uppercase font-black text-xl leading-tight mb-1">
                  {p.nombre}
                </h3>
                {p.sub && (
                  <p
                    className={`text-xs mb-4 ${
                      paid ? "text-primary-foreground/70" : "text-foreground/55"
                    }`}
                  >
                    {p.sub}
                  </p>
                )}

                {/* Precio */}
                <div className="mt-2 mb-6">
                  {p.precioTachado && (
                    <span className="block text-sm line-through text-[#F5B800] font-bold mb-1">
                      {p.precioTachado}
                    </span>
                  )}
                  <span
                    className={`font-display italic font-black leading-none ${
                      p.actual ? "text-primary text-5xl" : "text-primary-foreground text-5xl md:text-6xl"
                    }`}
                  >
                    {p.precio}
                  </span>
                  {p.periodo && (
                    <span className="block text-sm font-semibold mt-1 opacity-90">{p.periodo}</span>
                  )}
                </div>

                {/* Leyenda: para qué perfil es ideal */}
                {p.ideal && (
                  <div
                    className={`mb-6 text-xs leading-relaxed border-l-2 pl-3 ${
                      paid
                        ? "border-primary-foreground/40 text-primary-foreground/90"
                        : "border-primary/50 text-foreground/70"
                    }`}
                  >
                    {p.ideal}
                  </div>
                )}

                {/* Features */}
                <ul className="space-y-2.5 mb-7 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${paid ? "text-primary-foreground" : "text-primary"}`}
                        strokeWidth={3}
                      />
                      <span className={paid ? "text-primary-foreground/95" : "text-foreground/80"}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {p.actual ? (
                  <div className="mt-auto inline-flex items-center justify-center gap-2 min-h-[3rem] px-6 py-3 border border-primary/40 text-primary font-bold uppercase tracking-[0.16em] text-sm text-center leading-tight">
                    <Sparkles className="w-4 h-4 shrink-0" /> Tu beneficio actual
                  </div>
                ) : esConfirmacion ? (
                  <a
                    href={p.cta?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center min-h-[3rem] px-6 py-3 bg-primary-foreground text-primary font-bold uppercase tracking-[0.16em] text-sm text-center leading-tight transition-all hover:opacity-90"
                  >
                    Comprar plan
                  </a>
                ) : (
                  <button
                    onClick={() => scrollTo("form")}
                    className="mt-auto inline-flex items-center justify-center min-h-[3rem] px-6 py-3 bg-primary-foreground text-primary font-bold uppercase tracking-[0.14em] text-xs md:text-sm text-center leading-tight transition-all hover:opacity-90"
                  >
                    Quiero darme de alta y comprar el plan
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Leyenda del flujo de alta (solo landing) */}
        {!esConfirmacion && (
          <div className="mt-10 max-w-3xl mx-auto border border-primary/30 bg-primary/5 p-5 flex items-start gap-3">
            <ClipboardList className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-foreground/80 leading-relaxed">
              <strong className="text-foreground">¿Cómo comprás un plan?</strong> Para
              cualquiera de los planes primero tenés que completar el{" "}
              <strong>formulario de alta</strong> de esta página. Apenas te registres, vas a
              ver en la página de confirmación los{" "}
              <strong>pasos para abonar y activar tu plan</strong>. El alta es obligatoria.
            </p>
          </div>
        )}

        <p className="text-center text-foreground/45 text-xs mt-8 max-w-2xl mx-auto">
          Tarifas de referencia (Dic 2025). El alquiler requiere solicitarse con 24 hs de
          anticipación a la sede elegida. Consultá tarifas por más o menos clases por WhatsApp.
        </p>
      </div>
    </section>
  );
};

export default PlanesSportclub;
