import { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import {
  Calendar,
  MapPin,
  Clock,
  Check,
  ShieldCheck,
  Users,
  Sparkles,
  Timer,
  Wrench,
  GraduationCap,
  Gift,
  Route,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getMasterclass, getProximaMasterclass } from "@/data/masterclasses";

const objetivos = [
  "Probar técnicas básicas desde cero",
  "Aprender a frenar de forma segura",
  "Dar tus primeros saltos",
  "Vivir la energía de la comunidad NM",
];

const miedos = [
  {
    title: '"Tengo miedo a lastimarme"',
    body: "Te acompañamos con todas las protecciones (las alquilamos), enfoque pedagógico según tu nivel y ejercicios diseñados para que avances sin riesgo.",
  },
  {
    title: '"No tengo rollers, ¿cómo voy a empezar?"',
    body: "No es un obstáculo. Tenemos rollers y protecciones listas para vos: alquilá y probá sin compromiso.",
  },
  {
    title: '"¿Y si no progreso como quiero?"',
    body: "Acá no hay competencia. Enseñamos a tu ritmo: te vas a sentir seguro/a desde el primer momento.",
  },
];

const logros = [
  {
    icon: ShieldCheck,
    title: "Confianza y seguridad",
    body: "Vas a dominar la técnica correcta, perder el miedo a las caídas y sentirte estable sobre los rollers.",
  },
  {
    icon: Sparkles,
    title: "Progreso sin límites",
    body: "Cada clase está adaptada a tu nivel, para que avances a tu ritmo y disfrutes cada logro.",
  },
  {
    icon: Users,
    title: "Ambiente amigable",
    body: "Somos una comunidad que valora el compañerismo y el progreso de cada persona.",
  },
  {
    icon: Route,
    title: "Experiencia real",
    body: "Poné a prueba lo aprendido en la calle: superá obstáculos reales y disfrutá la ciudad.",
  },
];

const incluye = [
  {
    icon: Timer,
    title: "Hasta 4 horas de aprendizaje",
    body: "Entrenamiento práctico y progresivo que vas a sentir como una evolución real.",
  },
  {
    icon: GraduationCap,
    title: "Todos los niveles",
    body: "Desde quienes nunca se subieron a unos rollers hasta los que buscan dominar slalom, frenadas o rampas.",
  },
  {
    icon: Wrench,
    title: "Alquiler de equipo",
    body: "Rollers, protecciones y casco. No necesitás tener nada para empezar. (Cupos limitados, reservá con tiempo).",
  },
  {
    icon: Users,
    title: "Hasta 8 instructores especializados",
    body: "Equipo entrenado para enseñar con paciencia, técnica y buena onda.",
  },
  {
    icon: Gift,
    title: "Beneficios exclusivos para alumnos",
    body: "Con el Plan Black Free, esta Masterclass es gratis. Con otros planes, 40% OFF.",
  },
  {
    icon: Route,
    title: "Salida urbana (opcional)",
    body: "Cerramos saliendo a la calle. Acompañado/a por instructores, sentí lo que se siente dominar los rollers.",
  },
];

const MasterclassPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const mc = getMasterclass(slug);

  useEffect(() => {
    if (mc) {
      document.title = `Masterclass de Patinaje — ${mc.sede} | ${mc.fechaLabel}`;
    }
  }, [mc]);

  if (!slug) {
    const next = getProximaMasterclass();
    return <Navigate to={`/masterclass-de-patinaje/${next.slug}`} replace />;
  }

  if (!mc) {
    return <Navigate to="/" replace />;
  }

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 w-full text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 mb-6">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-bold uppercase tracking-cta text-primary">
              {mc.fechaLabel} — {mc.sede} · {mc.hora}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-foreground leading-[1.05] mb-6">
            Descubrí en un solo día lo que se siente{" "}
            <span className="text-primary">rollear con confianza</span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Una oportunidad para quienes siempre tuvieron curiosidad por los
            rollers y nunca se animaron — o quieren dar el siguiente paso.{" "}
            <span className="text-foreground font-semibold">
              No necesitás equipo propio: podés alquilar todo lo que necesitás.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 group"
              onClick={() => scrollTo("pases")}
            >
              Ver opciones de pase
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
            <a href={mc.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted font-medium text-base px-8 py-6 rounded-full w-full"
              >
                <MapPin className="w-4 h-4 mr-1" /> Cómo llegar
              </Button>
            </a>
          </div>

          {/* Datos clave */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { icon: Calendar, label: mc.fechaLabel },
              { icon: Clock, label: mc.hora },
              { icon: MapPin, label: mc.sede },
              { icon: ShieldCheck, label: "Seguro incluido" },
            ].map((d, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-4 flex flex-col items-center gap-2"
              >
                <d.icon className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-foreground text-center">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OBJETIVOS BAR */}
      <section className="bg-primary text-primary-foreground py-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {objetivos.map((o) => (
            <div
              key={o}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="w-10 h-10 rounded-full border-2 border-primary-foreground flex items-center justify-center">
                <Check className="w-5 h-5" />
              </div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wide leading-tight">
                {o}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MIEDOS */}
      <section className="py-20 bg-background">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 text-center">
            ¿Te gustaría aprender a patinar, pero{" "}
            <span className="text-primary">te frena el miedo</span>?
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Esta Masterclass intensiva está pensada para que no te dejes dominar
            por tus miedos y salgas a la calle con confianza y seguridad.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {miedos.map((m) => (
              <div
                key={m.title}
                className="bg-card border border-border rounded-2xl p-6"
              >
                <p className="text-primary font-black mb-3 text-lg">
                  {m.title}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {m.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGROS */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-cta text-primary text-center mb-3">
            Te preguntarás
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-12 text-center">
            ¿Qué voy a lograr en esta Masterclass?
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {logros.map((l) => (
              <div
                key={l.title}
                className="bg-background border border-border rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <l.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-black text-lg mb-2">{l.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {l.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PASES */}
      <section id="pases" className="py-20 bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3 text-center">
            Tres formas de dar tu primer paso
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
            Elegí cómo querés vivir tu experiencia. Tu compra de pase incluye{" "}
            <span className="text-foreground font-semibold">
              dos (2) clases a elección
            </span>
            .
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* General */}
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-cta text-muted-foreground mb-2">
                Público general
              </p>
              <p className="text-4xl font-black text-foreground mb-1">
                {mc.precios.general}
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                Tarifa Early Bird
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-8 flex-1">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                  Acceso completo a la jornada
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> 2
                  clases a elección
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                  Seguro médico incluido
                </li>
              </ul>
              <a href={mc.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full"
                >
                  Comprar mi pase
                </Button>
              </a>
            </div>

            {/* Con alquiler — destacado */}
            <div className="bg-card border-2 border-primary rounded-2xl p-8 flex flex-col relative shadow-xl shadow-primary/20 md:-translate-y-4">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-cta px-3 py-1 rounded-full">
                Más elegido
              </div>
              <p className="text-xs font-bold uppercase tracking-cta text-primary mb-2">
                Pase + Alquiler
              </p>
              <p className="text-4xl font-black text-foreground mb-1">
                {mc.precios.conAlquiler}
              </p>
              <p className="text-xs text-muted-foreground mb-6">
                Perfecto si aún no tenés equipo
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-8 flex-1">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                  Todo lo del pase general
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                  Rollers + protecciones + casco
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                  Cupos limitados — reservá con tiempo
                </li>
              </ul>
              <a href={mc.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="w-full rounded-full bg-primary hover:bg-primary/90"
                >
                  Quiero mi pase
                </Button>
              </a>
            </div>

            {/* Alumnos */}
            <div className="bg-card border border-border rounded-2xl p-8 flex flex-col">
              <p className="text-xs font-bold uppercase tracking-cta text-muted-foreground mb-2">
                Alumnos NM y Sportclub
              </p>
              <div className="flex items-baseline gap-2 mb-1">
                <p className="text-4xl font-black text-foreground">
                  {mc.precios.alumnos}
                </p>
                <span className="text-sm text-muted-foreground line-through">
                  {mc.precios.general}
                </span>
              </div>
              <p className="text-xs text-primary font-bold mb-6">
                30% OFF para alumnos activos
              </p>
              <ul className="text-sm text-muted-foreground space-y-2 mb-8 flex-1">
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                  Acceso completo a la jornada
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                  Plan Black Free: <strong>gratis</strong>
                </li>
                <li className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />{" "}
                  Solicitá tu código de descuento
                </li>
              </ul>
              <a href={mc.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full"
                >
                  Quiero mi pase
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* INCLUYE */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-12 text-center">
            Una experiencia pensada para que{" "}
            <span className="text-primary">aprendas y te diviertas</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {incluye.map((i) => (
              <div
                key={i.title}
                className="bg-background border border-border rounded-2xl p-6"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <i.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-black text-lg mb-2">{i.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {i.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-bold uppercase tracking-cta text-primary mb-3">
            Si querés avanzar más rápido
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
            Desbloqueá el <span className="text-primary">Plan Black</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Acceso total a todas las clases regulares y Masterclass gratis.
          </p>
          <Link to="/#planes">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6"
            >
              Quiero el Plan Black
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* RESUMEN EVENTO */}
      <section className="py-16 bg-card border-t border-border">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-black mb-6">Resumen del evento</h2>
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-background border border-border rounded-2xl p-5">
              <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm font-bold">{mc.fechaLabel}</p>
            </div>
            <div className="bg-background border border-border rounded-2xl p-5">
              <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm font-bold">{mc.hora}</p>
            </div>
            <div className="bg-background border border-border rounded-2xl p-5">
              <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-sm font-bold">{mc.sede}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {mc.direccion}
              </p>
            </div>
          </div>
          <a href={mc.whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 rounded-full px-8 py-6"
            >
              Reservar mi lugar por WhatsApp
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MasterclassPage;
