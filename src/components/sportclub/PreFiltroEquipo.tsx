import { PackageX, AlertTriangle, CircleCheck, ArrowRight, ShieldAlert } from "lucide-react";

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

const opciones = [
  {
    icon: PackageX,
    t: "No tengo equipo",
    d: "No tengo rollers ni protecciones. Quiero empezar de cero.",
    cta: "Ver alquiler y kits",
    target: "equipo",
  },
  {
    icon: AlertTriangle,
    t: "Me falta algo",
    d: "Tengo rollers, pero me falta el casco o alguna protección (muñequeras, coderas o rodilleras).",
    cta: "Completar mi equipo",
    target: "equipo",
  },
  {
    icon: CircleCheck,
    t: "Ya tengo todo",
    d: "Tengo rollers, casco y protecciones completas. Estoy listo/a para patinar.",
    cta: "Registrarme y elegir sede",
    target: "form",
  },
];

const PreFiltroEquipo = () => {
  return (
    <section className="px-6 lg:px-16 py-16 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs uppercase tracking-[0.18em] text-primary font-bold">
            Empezá acá
          </span>
        </div>
        <h2 className="font-display italic uppercase text-3xl md:text-5xl font-black mb-3">
          ¿Con qué equipo contás?
        </h2>
        <p className="text-foreground/70 max-w-2xl mb-8">
          Elegí la opción que te describe y te llevamos directo al lugar correcto.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {opciones.map((o) => (
            <button
              key={o.t}
              onClick={() => scrollTo(o.target)}
              className="group text-left bg-card border border-border p-6 hover:border-primary/50 transition-colors flex flex-col"
            >
              <o.icon className="w-8 h-8 text-primary mb-4" strokeWidth={2} />
              <h3 className="font-display italic uppercase text-xl font-black mb-2">{o.t}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed mb-6 flex-1">{o.d}</p>
              <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-[0.14em] text-xs">
                {o.cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          ))}
        </div>

        {/* Nota de obligatoriedad */}
        <div className="mt-6 flex items-start gap-3 border border-primary/30 bg-primary/5 p-4">
          <ShieldAlert className="w-5 h-5 text-primary mt-0.5 shrink-0" />
          <p className="text-sm text-foreground/80 leading-relaxed">
            <strong className="text-foreground">Importante:</strong> el{" "}
            <strong>casco</strong> y las <strong>protecciones</strong> (muñequeras, coderas
            y rodilleras) son{" "}
            <strong className="text-primary">obligatorios</strong> para tomar clase. Si no
            los tenés, podés alquilarlos como socio (50% OFF) o comprar tu kit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PreFiltroEquipo;
