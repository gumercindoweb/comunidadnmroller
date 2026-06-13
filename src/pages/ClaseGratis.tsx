import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, ArrowLeft, ArrowRight, Loader2, MapPin, Sparkles, Wallet } from "lucide-react";
import logoNM from "@/assets/Logo-NM-Rollers.png";
import { sedes } from "@/data/sedes";
import SedesMapa from "@/components/SedesMapa";

const SEDES_GRATIS_IDS = ["villa-luro", "colegiales", "plaza-la-pampa", "belgrano"];

const FLY_FREE_KIT_URL = "https://lp.flyfreeurban.com/kit-de-iniciacion-adulto/";
const FLY_FREE_MODELOS_URL = "https://www.flyfreeurban.com/marcas/";

const EQUIPO_OPCIONES = [
  { value: "alquiler", label: "Sí, voy a necesitar alquilar equipo" },
  { value: "propio", label: "No, tengo mi propio equipo" },
  { value: "considerando", label: "Estoy pensando en comprar mi propio equipo" },
];

const NIVELES = [
  "Primeros pasos (no sé patinar)",
  "Inicial (me puedo desplazar solo/a)",
  "Principiante (giros y frenadas básicas)",
  "Intermedio (slalom, frenadas, urbano)",
];

const FormSchema = z.object({
  name: z.string().trim().min(1, "Ingresá tu nombre").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(6, "WhatsApp inválido").max(40),
  dni: z.string().trim().min(6, "Ingresá tu DNI").max(20),
  sede: z.string().trim().min(1, "Elegí una sede"),
  nivel: z.string().trim().min(1, "Elegí tu nivel"),
  equipo: z.string().trim().min(1, "Indicá tu situación de equipo"),
});

const ClaseGratis = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dni, setDni] = useState("");
  const [sede, setSede] = useState("");
  const [nivel, setNivel] = useState("");
  const [equipo, setEquipo] = useState("");
  const [website, setWebsite] = useState("");
  const [loading, setLoading] = useState(false);

  const sedesGratis = sedes.filter((s) => SEDES_GRATIS_IDS.includes(s.id));
  const sedesSena = sedes.filter((s) => !SEDES_GRATIS_IDS.includes(s.id));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = FormSchema.safeParse({ name, email, phone, dni, sede, nivel, equipo });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }
    setLoading(true);
    try {
      // El backend (subscribe-clase-gratis) recibe solo los campos que ya esperaba.
      // dni se usa para pre-llenar el WhatsApp en la confirmación.
      const { data, error } = await supabase.functions.invoke("subscribe-clase-gratis", {
        body: { name, email, phone, sede, nivel, equipo, website },
      });
      if (error) throw error;
      if (data?.success) {
        toast.success("¡Listo! Te contactamos por WhatsApp.");
        const payload = { name, email, phone, dni, sede, nivel };
        // Backup en sessionStorage: el mensaje sigue personalizado aunque recarguen.
        try {
          sessionStorage.setItem("clasegratis_form", JSON.stringify(payload));
        } catch {}
        navigate("/clase-gratis-confirmada", { state: payload });
      } else {
        throw new Error(data?.error ?? "Algo salió mal");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "No pudimos registrarte. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Probá gratis una clase de patinaje · NM Roller</title>
        <meta
          name="description"
          content="Reservá tu clase de prueba de patinaje en 4 sedes 100% gratis o asegurá tu lugar con una seña bonificable en sedes con alta demanda."
        />
        <link rel="canonical" href="https://comunidadnmroller.com/clase-gratis" />
        <meta property="og:title" content="Clase de prueba gratis · NM Roller" />
        <meta property="og:description" content="Probá una clase de patinaje antes de comprometerte con un plan." />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="pt-10 pb-6 flex justify-center">
          <Link to="/" aria-label="Inicio">
            <img src={logoNM} alt="NM Roller" className="h-14" />
          </Link>
        </header>

        {/* Hero + form */}
        <section className="px-6 lg:px-16 py-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-foreground/70 mb-6">
                Antes de comprometerte con un plan
              </p>
              <h1 className="font-display italic uppercase leading-[0.95] text-4xl md:text-5xl lg:text-6xl font-black mb-8">
                Probá gratis<br />
                una <span className="text-primary">clase de patinaje</span>
              </h1>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8 max-w-xl">
                Reservá tu clase de prueba en <strong>4 sedes 100% gratis</strong> o
                asegurá tu lugar con una <strong>seña bonificable</strong> en sedes con
                alta demanda. La seña equivale al valor de una clase única:{" "}
                <strong className="text-primary">$35.000 transferencia · $32.000 efectivo</strong>,
                y se descuenta si comprás un plan dentro de los 7 días siguientes.
              </p>

              {/* Pasos */}
              <div className="grid sm:grid-cols-3 gap-4 mb-10">
                {[
                  { n: "01", t: "Elegí sede", d: "Gratis o con seña bonificable." },
                  { n: "02", t: "Completá tus datos", d: "Te contactamos por WhatsApp." },
                  { n: "03", t: "Patinás", d: "Clase grupal de ~1 hora." },
                ].map((s) => (
                  <div key={s.n} className="border border-border/60 bg-card p-4">
                    <div className="text-primary font-display italic text-xl font-black mb-1">{s.n}</div>
                    <div className="font-bold uppercase text-sm tracking-wide">{s.t}</div>
                    <div className="text-foreground/60 text-xs mt-1">{s.d}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form card */}
            <div id="form" className="bg-card border border-border p-6 md:p-8 lg:sticky lg:top-10">
              <h2 className="font-display italic uppercase text-2xl md:text-3xl font-black mb-2">
                Solicitar clase
              </h2>
              <p className="text-foreground/60 text-sm mb-6">
                Completá tus datos y te confirmamos por WhatsApp.
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  aria-hidden="true"
                  style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
                />
                <Input
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                  maxLength={100}
                  required
                  className="h-12 rounded-none bg-background border-border text-base"
                />
                <Input
                  type="email"
                  placeholder="Tu correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  maxLength={255}
                  required
                  className="h-12 rounded-none bg-background border-border text-base"
                />
                <Input
                  type="tel"
                  placeholder="WhatsApp (con código de área)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  maxLength={40}
                  required
                  className="h-12 rounded-none bg-background border-border text-base"
                />
                <Input
                  type="text"
                  inputMode="numeric"
                  placeholder="DNI (sin puntos)"
                  value={dni}
                  onChange={(e) => setDni(e.target.value)}
                  disabled={loading}
                  maxLength={20}
                  required
                  className="h-12 rounded-none bg-background border-border text-base"
                />
                <Select value={sede} onValueChange={setSede} disabled={loading}>
                  <SelectTrigger className="h-12 rounded-none bg-background border-border text-base">
                    <SelectValue placeholder="Sede en la que querés probar" />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="px-2 pt-2 pb-1 text-[10px] uppercase tracking-[0.18em] text-primary font-bold">
                      Sedes 100% gratis
                    </div>
                    {sedesGratis.map((s) => (
                      <SelectItem key={s.id} value={s.nombre}>
                        {s.nombre} — Gratis
                      </SelectItem>
                    ))}
                    <div className="px-2 pt-3 pb-1 text-[10px] uppercase tracking-[0.18em] text-foreground/60 font-bold">
                      Con seña bonificable
                    </div>
                    {sedesSena.map((s) => (
                      <SelectItem key={s.id} value={s.nombre}>
                        {s.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={nivel} onValueChange={setNivel} disabled={loading}>
                  <SelectTrigger className="h-12 rounded-none bg-background border-border text-base">
                    <SelectValue placeholder="Tu nivel actual" />
                  </SelectTrigger>
                  <SelectContent>
                    {NIVELES.map((n) => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={equipo} onValueChange={setEquipo} disabled={loading}>
                  <SelectTrigger className="h-12 rounded-none bg-background border-border text-base">
                    <SelectValue placeholder="¿Vas a necesitar alquilar equipo?" />
                  </SelectTrigger>
                  <SelectContent>
                    {EQUIPO_OPCIONES.map((o) => (
                      <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {equipo === "considerando" && (
                  <div className="border border-primary/30 bg-primary/5 p-4">
                    <p className="font-bold uppercase text-xs tracking-wide text-primary mb-1">
                      ¡Buena decisión!
                    </p>
                    <p className="text-foreground/60 text-xs leading-relaxed mb-3">
                      Tener tu propio equipo es la mejor inversión si vas a patinar seguido.
                      Explorá las opciones de Fly Free, nuestra marca aliada.
                    </p>
                    <div className="flex flex-col gap-2">
                      <a
                        href={FLY_FREE_KIT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-2 border border-primary text-primary px-3 py-2 text-xs font-bold uppercase tracking-wide hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Ver kit de iniciación <ArrowRight className="w-3 h-3 shrink-0" />
                      </a>
                      <a
                        href={FLY_FREE_MODELOS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between gap-2 border border-border text-foreground/60 px-3 py-2 text-xs font-bold uppercase tracking-wide hover:border-primary hover:text-primary transition-colors"
                      >
                        Explorar todos los modelos <ArrowRight className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-[0.18em] text-sm transition-all hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)]"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Solicitar clase"}
                </Button>
                <p className="text-[11px] text-foreground/50 leading-relaxed">
                  Al enviar aceptás recibir comunicaciones por WhatsApp y email sobre
                  tu clase de prueba.
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Todas las sedes + mapa (gratis vs seña) */}
        <section id="gratis-sedes" className="px-6 lg:px-16 py-16 bg-card/40 border-y border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-xs uppercase tracking-[0.18em] text-primary font-bold">
                Dónde probar
              </span>
            </div>
            <h2 className="font-display italic uppercase text-3xl md:text-5xl font-black mb-3">
              Todas las sedes
            </h2>
            <p className="text-foreground/70 max-w-2xl mb-10">
              Tu clase de prueba es <strong className="text-foreground">100% gratis</strong> en 4
              sedes. En el resto reservás con una{" "}
              <strong className="text-foreground">seña bonificable</strong>. Explorá el mapa y
              mirá los horarios de cada sede.
            </p>
          </div>

          {/* Mapa estilo Home, marcando gratis vs seña */}
          <SedesMapa sedesList={sedes} gratisIds={SEDES_GRATIS_IDS} sidebarTitle="Elegí tu sede" />

          {/* Tarjetas de todas las sedes con etiqueta */}
          <div className="max-w-7xl mx-auto mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sedes.map((s) => {
              const gratis = SEDES_GRATIS_IDS.includes(s.id);
              return (
                <a
                  key={s.id}
                  href={s.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-background border border-border p-5 hover:border-primary transition-colors block"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-primary mt-1 shrink-0" />
                      <h3 className="font-bold uppercase text-sm tracking-wide group-hover:text-primary transition-colors">
                        {s.nombre}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        gratis
                          ? "text-[#3FB950] border-[#3FB950]/50"
                          : "text-primary border-primary/50"
                      }`}
                    >
                      {gratis ? "Gratis" : "Con seña"}
                    </span>
                  </div>
                  <p className="text-foreground/60 text-xs leading-relaxed pl-6">
                    {s.direccion}
                  </p>
                  <span className="inline-block mt-3 ml-6 text-[10px] uppercase tracking-[0.18em] text-primary font-bold">
                    Cómo llegar →
                  </span>
                </a>
              );
            })}
          </div>

          {/* Info seña */}
          <div className="max-w-7xl mx-auto mt-12 flex items-start gap-3 bg-background border border-border p-5">
            <Wallet className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-foreground/80">
              <strong>Sedes con seña:</strong> reservás con <strong>$35.000 transferencia</strong>{" "}
              o <strong>$32.000 efectivo</strong> — equivale a una clase única y se bonifica si
              comprás un plan dentro de los 7 días siguientes.
            </p>
          </div>
        </section>

        {/* Niveles */}
        <section className="px-6 lg:px-16 py-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display italic uppercase text-3xl md:text-4xl font-black mb-3">
              Ruta de aprendizaje
            </h2>
            <p className="text-foreground/70 mb-10">
              Trabajamos los tres niveles en una misma clase, con atención
              personalizada del instructor.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { t: "Inicial", d: "Equilibrio, primeros desplazamientos y confianza desde cero." },
                { t: "Principiante", d: "Giros más precisos, frenadas y postura para moverte con seguridad." },
                { t: "Intermedio", d: "Slalom, frenadas avanzadas, urbano y nuevos retos técnicos." },
              ].map((n) => (
                <div key={n.t} className="border border-border bg-card p-5">
                  <div className="font-display italic uppercase font-black text-xl text-primary mb-2">
                    {n.t}
                  </div>
                  <p className="text-foreground/70 text-sm">{n.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-6 lg:px-16 py-16 bg-card/40 border-t border-border">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display italic uppercase text-3xl md:text-4xl font-black mb-8">
              Preguntas frecuentes
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  q: "¿Puedo tomar la clase de prueba gratis en cualquier sede?",
                  a: "No. La clase es 100% gratis sólo en 4 sedes: Villa Luro, Colegiales, Plaza La Pampa y Belgrano. En las otras 6 sedes hay que reservar con una seña bonificable de $35.000 por transferencia o $32.000 en efectivo.",
                },
                {
                  q: "¿Cómo funciona la seña bonificable?",
                  a: "La seña equivale al valor de una clase única ($35.000 transferencia / $32.000 efectivo) y se descuenta de tu plan si comprás dentro de los 7 días siguientes a la clase. Avisanos por WhatsApp para aplicarlo.",
                },
                {
                  q: "¿Qué necesito llevar?",
                  a: "Ropa cómoda y, si tenés, tu equipo de patinaje (rollers + protecciones). Si no tenés equipo, podés alquilarlo en las sedes con servicio de alquiler — consultá por WhatsApp.",
                },
                {
                  q: "¿Cuánto dura la clase?",
                  a: "Aproximadamente 1 hora. Son clases grupales con atención personalizada del instructor según el nivel de cada alumno.",
                },
                {
                  q: "¿Es obligatorio usar protecciones?",
                  a: "Sí. Recomendamos rodilleras, coderas, muñequeras y casco para garantizar tu seguridad.",
                },
                {
                  q: "¿Qué pasa si llueve o se cancela mi clase?",
                  a: "Si reprogramamos por clima u otro motivo, te avisamos en el grupo de WhatsApp de la sede y extendemos la fecha de vencimiento de tu clase.",
                },
                {
                  q: "¿Si pagué la seña y no puedo asistir?",
                  a: "La seña no es reembolsable, salvo que canceles con 24 hs de anticipación y reprogrames dentro de los días vigentes establecidos.",
                },
                {
                  q: "¿Puedo tomar más de una clase de prueba?",
                  a: "No. Ofrecemos una clase de prueba por persona. Si querés continuar, podés inscribirte en cualquiera de nuestros planes.",
                },
                {
                  q: "¿Puedo cambiar la sede después de registrarme?",
                  a: "Sí, escribinos por WhatsApp antes de tu primera clase y verificamos disponibilidad.",
                },
                {
                  q: "¿Cómo me contacto si tengo más dudas?",
                  a: "Escribinos por WhatsApp al +54 11 6592-0600 o por mail a hola@comunidadnmroller.com.",
                },
              ].map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-left font-bold uppercase text-sm tracking-wide hover:text-primary">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-foreground/70 text-sm leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-12 text-center">
              <a
                href="#form"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 font-bold uppercase tracking-[0.18em] text-sm hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)] transition-all"
              >
                Solicitar mi clase
              </a>
            </div>
          </div>
        </section>

        <div className="py-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground uppercase tracking-[0.18em]"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al sitio
          </Link>
        </div>
      </main>
    </>
  );
};

export default ClaseGratis;
