import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Instagram, Heart, ExternalLink, Play, X } from "lucide-react";
import logoNM from "@/assets/Logo-NM-Rollers.png";
import Footer from "@/components/Footer";

type Categoria = "Técnica" | "Equipo" | "Seguridad" | "Inicio";
type Fuente = "NM Roller" | "Fly Free Urban";

interface Tutorial {
  shortcode: string;
  titulo: string;
  descripcion: string;
  categoria: Categoria;
  fuente: Fuente;
  likes: number;
}

const TUTORIALES: Tutorial[] = [
  // ── NM Roller (@roller_nm) ──────────────────────────────────────────────
  {
    shortcode: "DYiYHg0ScYr",
    titulo: "Postura y equilibrio básico",
    descripcion:
      "Aprendé a pararte bien, flexionar y mantener el equilibrio: el primer paso para patinar con seguridad y confianza.",
    categoria: "Técnica",
    fuente: "NM Roller",
    likes: 2508,
  },
  {
    shortcode: "DXVHJaXj7ly",
    titulo: "TOP 5 modelos de rollers recomendados",
    descripcion:
      "¿No sabés qué rollers comprar? Los 5 modelos que más recomendamos según tu nivel y presupuesto.",
    categoria: "Equipo",
    fuente: "NM Roller",
    likes: 2403,
  },
  {
    shortcode: "DXMi6c_DjGw",
    titulo: "Mejor bota rígida extensible",
    descripcion:
      "Análisis completo de la bota rígida extensible: para quién sirve, cuándo conviene elegirla y cuáles son sus ventajas reales.",
    categoria: "Equipo",
    fuente: "NM Roller",
    likes: 2241,
  },
  {
    shortcode: "DXzUMAGu_1e",
    titulo: "¿Alquilar o comprar tus primeros rollers?",
    descripcion:
      "Te explicamos cuándo tiene sentido arrancar con alquiler y cuándo ya es el momento de invertir en tu propio equipo.",
    categoria: "Inicio",
    fuente: "NM Roller",
    likes: 1999,
  },
  {
    shortcode: "DX9Wr4ZNca_",
    titulo: "Técnica de patinaje urbano",
    descripcion:
      "La técnica que necesitás para moverte con seguridad en la calle: postura, frenada y cómo leer el terreno.",
    categoria: "Técnica",
    fuente: "NM Roller",
    likes: 1227,
  },
  {
    shortcode: "DY0GPbQSEzL",
    titulo: "Cómo bajar un cordón",
    descripcion:
      "Bajar un cordón puede dar miedo al principio. Acá te mostramos distintas maneras de hacerlo según tu nivel.",
    categoria: "Técnica",
    fuente: "NM Roller",
    likes: 834,
  },
  {
    shortcode: "DXPkw4BD4MH",
    titulo: "Análisis: rollers RS600",
    descripcion:
      "Review detallado del RS600: prestaciones, precio y para qué perfil de patinador es ideal.",
    categoria: "Equipo",
    fuente: "NM Roller",
    likes: 713,
  },
  {
    shortcode: "DZGrmVOKqWH",
    titulo: "Cómo frenar correctamente",
    descripcion:
      "Técnica de frenada paso a paso: dos métodos, cuándo usar cada uno y los errores más comunes.",
    categoria: "Técnica",
    fuente: "NM Roller",
    likes: 458,
  },
  {
    shortcode: "C8Up1aiOn8m",
    titulo: "Disciplinas de patinaje disponibles",
    descripcion:
      "Primeros pasos, slalom, urbano y más. Conocé todas las disciplinas y encontrá la que más se adapta a vos.",
    categoria: "Inicio",
    fuente: "NM Roller",
    likes: 464,
  },
  {
    shortcode: "DXSaObNj8lv",
    titulo: "Protecciones: qué es obligatorio",
    descripcion:
      "Nunca salgas a patinar sin tus protecciones. Qué elementos son indispensables y cómo colocártelos bien.",
    categoria: "Seguridad",
    fuente: "NM Roller",
    likes: 417,
  },

  // ── Fly Free Urban (@flyfreeurban) ──────────────────────────────────────
  {
    shortcode: "DYKYtrXOGRv",
    titulo: "¿No sabés qué roller elegir? Las claves que sí importan",
    descripcion:
      "Bota rígida siempre. Las características técnicas clave para que el roller sea de buena calidad y aprendas con seguridad.",
    categoria: "Equipo",
    fuente: "Fly Free Urban",
    likes: 451,
  },
  {
    shortcode: "DVtLl5EOUYF",
    titulo: "3 ruedas vs 4 ruedas: cuál te conviene",
    descripcion:
      "4 ruedas = más estabilidad y control (ideal para empezar o slalom). 3 ruedas = más velocidad y fluidez (para urbano y rutas). ¿Cómo te gusta patinar?",
    categoria: "Equipo",
    fuente: "Fly Free Urban",
    likes: 376,
  },
  {
    shortcode: "DXiK1OTESqi",
    titulo: "RS600: características técnicas completas",
    descripcion:
      "Bota rígida reforzada con fibra de vidrio, guía aluminio CNC, ruedas 80mm 85A y rodamientos ABEC-9. Todo lo que necesitás saber antes de elegirlos.",
    categoria: "Equipo",
    fuente: "Fly Free Urban",
    likes: 261,
  },
  {
    shortcode: "DYzaFG1xhil",
    titulo: "Consejos esenciales para empezar a patinar",
    descripcion:
      "No necesitás comprar de entrada, podés empezar alquilando. Lo importante es el equipo correcto, buena asesoría y arrancar acompañado.",
    categoria: "Inicio",
    fuente: "Fly Free Urban",
    likes: 270,
  },
  {
    shortcode: "DY92HuTxxCQ",
    titulo: "¿Querés empezar? Esto es lo que necesitás saber",
    descripcion:
      "No necesitás experiencia previa. Lo clave es el equipo adecuado, protecciones que te cuiden y una comunidad que te acompañe desde el primer día.",
    categoria: "Inicio",
    fuente: "Fly Free Urban",
    likes: 247,
  },
  {
    shortcode: "DYKvWyjOIvy",
    titulo: "Señales de que ya es hora de cambiar tus rollers",
    descripcion:
      "Incomodidad, inseguridad o sensación de que algo no cierra: a veces no es entrenar más, es dejar de usar un equipo que ya cumplió su ciclo.",
    categoria: "Equipo",
    fuente: "Fly Free Urban",
    likes: 128,
  },
  {
    shortcode: "DXRoc1aDq6-",
    titulo: "RSK Kids: primer roller para peques",
    descripcion:
      "Bota firme que sostiene el tobillo, ajuste fácil, extensible hasta 4 talles y ruedas LED. Todo lo que necesitás saber para el primer roller de tu hijo/a.",
    categoria: "Equipo",
    fuente: "Fly Free Urban",
    likes: 125,
  },
  {
    shortcode: "DYZ-H0INFOK",
    titulo: "Aprender a patinar: el proceso real",
    descripcion:
      "No todo te sale a la primera, y eso está perfecto. Aprender también es caerte, reírte y volver a intentarlo. ¡Nadie arranca sabiendo!",
    categoria: "Técnica",
    fuente: "Fly Free Urban",
    likes: 422,
  },
  {
    shortcode: "DYqMG3FOhug",
    titulo: "RSK Kids y RSJ: rollers para peques y adultos",
    descripcion:
      "RSK Kids del talle 28 al 35, ideal para arrancar. RSJ disponible hasta talle 40, apto tanto para niños como para adultos. Dos opciones de bota rígida.",
    categoria: "Equipo",
    fuente: "Fly Free Urban",
    likes: 70,
  },
  {
    shortcode: "DX2OvWEuH_M",
    titulo: "Medias para patinar: por qué importan",
    descripcion:
      "Usar buenas medias marca la diferencia en comodidad y ajuste dentro del patín. Cómo elegirlas y qué tener en cuenta.",
    categoria: "Técnica",
    fuente: "Fly Free Urban",
    likes: 72,
  },
];

const CATEGORIAS: Array<Categoria | "Todos"> = [
  "Todos", "Técnica", "Equipo", "Seguridad", "Inicio",
];

const CATEGORIA_STYLE: Record<Categoria, string> = {
  Técnica:   "bg-primary/10 text-primary border border-primary/20",
  Equipo:    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Seguridad: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  Inicio:    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

const FUENTE_STYLE: Record<Fuente, string> = {
  "NM Roller":      "bg-primary/10 text-primary",
  "Fly Free Urban": "bg-indigo-500/10 text-indigo-400",
};

const TutorialesPatinaje = () => {
  const [filtro, setFiltro] = useState<Categoria | "Todos">("Todos");
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);

  const visibles = filtro === "Todos"
    ? TUTORIALES
    : TUTORIALES.filter((t) => t.categoria === filtro);

  const toggleEmbed = (shortcode: string) => {
    setActiveEmbed((prev) => (prev === shortcode ? null : shortcode));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Tutoriales de Patinaje | Comunidad NM Roller</title>
        <meta
          name="description"
          content="Los mejores tutoriales de técnica, equipo y consejos para patinadores de todos los niveles. NM Roller + Fly Free Urban."
        />
      </Helmet>

      {/* Header */}
      <header className="pt-10 pb-4 flex justify-center relative">
        <Link
          to="/"
          aria-label="Volver al inicio"
          className="absolute left-4 top-1/2 -translate-y-1/2 mt-5 flex items-center gap-1.5 text-foreground/50 hover:text-foreground transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Inicio</span>
        </Link>
        <Link to="/" aria-label="Volver al inicio">
          <img src={logoNM} alt="NM Roller" className="h-14" />
        </Link>
      </header>

      {/* Hero */}
      <section className="text-center px-4 pt-10 pb-8">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          <Instagram className="w-3.5 h-3.5" />
          @roller_nm · @flyfreeurban
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold italic mb-3">
          Tutoriales de Patinaje
        </h1>
        <p className="text-foreground/60 max-w-xl mx-auto text-base">
          Técnica, equipo, seguridad y primeros pasos. Lo mejor de nuestro
          Instagram y el de nuestros aliados de Fly Free Urban.
        </p>
      </section>

      {/* Filtros por categoría */}
      <div className="flex justify-center gap-2 flex-wrap px-4 pb-10">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat}
            onClick={() => { setFiltro(cat); setActiveEmbed(null); }}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
              filtro === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-foreground/60 hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {cat}
            {cat !== "Todos" && (
              <span className="ml-1.5 opacity-60 text-xs">
                {TUTORIALES.filter((t) => t.categoria === cat).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <main className="container mx-auto px-4 pb-16 flex-1">
        <p className="text-foreground/40 text-xs mb-5 text-center">
          {visibles.length} tutorial{visibles.length !== 1 ? "es" : ""}
          {filtro !== "Todos" ? ` · ${filtro}` : ""}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibles.map((t) => {
            const isOpen = activeEmbed === t.shortcode;
            const igUrl = `https://www.instagram.com/p/${t.shortcode}/`;

            return (
              <div
                key={t.shortcode}
                className={`flex flex-col rounded-xl border bg-card overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "border-primary/50 shadow-lg shadow-primary/5"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {/* Preview / Embed */}
                {isOpen ? (
                  <div className="relative bg-black">
                    <button
                      onClick={() => toggleEmbed(t.shortcode)}
                      aria-label="Cerrar previsualización"
                      className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                    >
                      <X className="w-3.5 h-3.5 text-white" />
                    </button>
                    <iframe
                      src={`https://www.instagram.com/p/${t.shortcode}/embed/`}
                      className="w-full border-0"
                      style={{ height: 480 }}
                      loading="lazy"
                      scrolling="no"
                      allowTransparency
                      title={t.titulo}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => toggleEmbed(t.shortcode)}
                    aria-label={`Ver previsualización: ${t.titulo}`}
                    className="relative w-full overflow-hidden group/play"
                    style={{ height: 160 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-foreground/[0.03] to-background" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-background/80 border border-border flex items-center justify-center group-hover/play:scale-110 group-hover/play:border-primary/50 transition-transform duration-200">
                        <Play className="w-6 h-6 text-primary fill-primary" />
                      </div>
                    </div>
                    <span className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[11px] text-foreground/40 group-hover/play:text-primary transition-colors whitespace-nowrap">
                      Ver previsualización
                    </span>
                  </button>
                )}

                {/* Card body */}
                <div className="p-5 flex flex-col gap-3 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${CATEGORIA_STYLE[t.categoria]}`}
                      >
                        {t.categoria}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${FUENTE_STYLE[t.fuente]}`}
                      >
                        @{t.fuente === "NM Roller" ? "roller_nm" : "flyfreeurban"}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-foreground/40 text-xs shrink-0">
                      <Heart className="w-3 h-3" />
                      {t.likes.toLocaleString("es-AR")}
                    </span>
                  </div>
                  <h2 className="font-bold text-base leading-snug">{t.titulo}</h2>
                  <p className="text-foreground/55 text-sm leading-relaxed flex-1">
                    {t.descripcion}
                  </p>
                </div>

                {/* Card footer */}
                <a
                  href={igUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-t border-border/50 px-5 py-3 flex items-center justify-between text-xs text-foreground/40 hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Instagram className="w-3.5 h-3.5" />
                    Abrir en Instagram
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/roller_nm/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            <Instagram className="w-4 h-4" />
            Seguir @roller_nm
          </a>
          <a
            href="https://www.instagram.com/flyfreeurban/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-indigo-500/40 text-indigo-400 font-semibold px-6 py-3 rounded-full hover:bg-indigo-500/10 transition-colors text-sm"
          >
            <Instagram className="w-4 h-4" />
            Seguir @flyfreeurban
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TutorialesPatinaje;
