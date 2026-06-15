import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Instagram, Heart, ExternalLink, Play, X } from "lucide-react";
import logoNM from "@/assets/Logo-NM-Rollers.png";
import Footer from "@/components/Footer";

type Categoria = "Técnica" | "Equipo" | "Seguridad" | "Inicio";

interface Tutorial {
  shortcode: string;
  titulo: string;
  descripcion: string;
  categoria: Categoria;
  likes: number;
}

const TUTORIALES: Tutorial[] = [
  {
    shortcode: "DYiYHg0ScYr",
    titulo: "Postura y equilibrio básico",
    descripcion:
      "Aprendé a pararte bien, flexionar y mantener el equilibrio: el primer paso para patinar con seguridad y confianza.",
    categoria: "Técnica",
    likes: 2508,
  },
  {
    shortcode: "DXVHJaXj7ly",
    titulo: "TOP 5 modelos de rollers recomendados",
    descripcion:
      "¿No sabés qué rollers comprar? Esta es nuestra respuesta definitiva: los 5 modelos que más recomendamos según tu nivel y presupuesto.",
    categoria: "Equipo",
    likes: 2403,
  },
  {
    shortcode: "DXMi6c_DjGw",
    titulo: "Mejor bota rígida extensible",
    descripcion:
      "Análisis completo de la bota rígida extensible: para quién sirve, cuándo conviene elegirla y cuáles son sus ventajas reales.",
    categoria: "Equipo",
    likes: 2241,
  },
  {
    shortcode: "DXzUMAGu_1e",
    titulo: "¿Alquilar o comprar tus primeros rollers?",
    descripcion:
      "Te explicamos cuándo tiene sentido arrancar con alquiler y cuándo ya es el momento de invertir en tu propio equipo.",
    categoria: "Inicio",
    likes: 1999,
  },
  {
    shortcode: "DX9Wr4ZNca_",
    titulo: "Técnica de patinaje urbano",
    descripcion:
      "La técnica que necesitás para moverte con seguridad en la calle: postura, frenada y cómo leer el terreno.",
    categoria: "Técnica",
    likes: 1227,
  },
  {
    shortcode: "DY0GPbQSEzL",
    titulo: "Cómo bajar un cordón",
    descripcion:
      "Bajar un cordón puede dar miedo al principio. Acá te mostramos distintas maneras de hacerlo según tu nivel.",
    categoria: "Técnica",
    likes: 834,
  },
  {
    shortcode: "DXPkw4BD4MH",
    titulo: "Análisis: rollers RS600",
    descripcion:
      "Review detallado del modelo RS600: prestaciones, precio, para qué perfil de patinador es ideal y cómo se compara con la competencia.",
    categoria: "Equipo",
    likes: 713,
  },
  {
    shortcode: "C8Up1aiOn8m",
    titulo: "Disciplinas de patinaje disponibles",
    descripcion:
      "Primeros pasos, slalom, urbano y más. Conocé todas las disciplinas que podés aprender y encontrá la que más se adapta a vos.",
    categoria: "Inicio",
    likes: 464,
  },
  {
    shortcode: "DZGrmVOKqWH",
    titulo: "Cómo frenar correctamente",
    descripcion:
      "Técnica de frenada paso a paso: dos métodos, cuándo usar cada uno y los errores más comunes que hay que evitar.",
    categoria: "Técnica",
    likes: 458,
  },
  {
    shortcode: "DXSaObNj8lv",
    titulo: "Protecciones: qué es obligatorio",
    descripcion:
      "Nunca salgas a patinar sin tus protecciones. Te mostramos qué elementos son indispensables y cómo colocártelos bien.",
    categoria: "Seguridad",
    likes: 417,
  },
];

const CATEGORIA_STYLE: Record<Categoria, string> = {
  Técnica:   "bg-primary/10 text-primary border border-primary/20",
  Equipo:    "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Seguridad: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  Inicio:    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

const TutorialesPatinaje = () => {
  const [activeEmbed, setActiveEmbed] = useState<string | null>(null);

  const toggleEmbed = (shortcode: string) => {
    setActiveEmbed((prev) => (prev === shortcode ? null : shortcode));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Helmet>
        <title>Tutoriales de Patinaje | Comunidad NM Roller</title>
        <meta
          name="description"
          content="Los mejores tutoriales de técnica, equipo y consejos para patinadores de todos los niveles. Aprendé con NM Roller."
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
      <section className="text-center px-4 pt-10 pb-12">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          <Instagram className="w-3.5 h-3.5" />
          @roller_nm en Instagram
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold italic mb-3">
          Tutoriales de Patinaje
        </h1>
        <p className="text-foreground/60 max-w-xl mx-auto text-base">
          Técnica, equipo, seguridad y consejos para todos los niveles.
          Tocá el play en cualquier card para ver la previsualización.
        </p>
      </section>

      {/* Grid */}
      <main className="container mx-auto px-4 pb-16 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TUTORIALES.map((t) => {
            const isOpen = activeEmbed === t.shortcode;
            const igUrl = `https://www.instagram.com/p/${t.shortcode}/`;

            return (
              <div
                key={t.shortcode}
                className={`flex flex-col rounded-xl border bg-card overflow-hidden transition-all duration-200 ${
                  isOpen ? "border-primary/50 shadow-lg shadow-primary/5" : "border-border hover:border-primary/30"
                }`}
              >
                {/* Preview / Embed area */}
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
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 via-foreground/[0.03] to-background" />
                    {/* Instagram grid pattern */}
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
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${CATEGORIA_STYLE[t.categoria]}`}
                    >
                      {t.categoria}
                    </span>
                    <span className="flex items-center gap-1 text-foreground/40 text-xs">
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

        {/* CTA seguir en Instagram */}
        <div className="mt-14 text-center">
          <p className="text-foreground/50 text-sm mb-4">
            ¿Querés ver más contenido? Seguinos en Instagram para no perderte ningún tutorial nuevo.
          </p>
          <a
            href="https://www.instagram.com/roller_nm/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity text-sm"
          >
            <Instagram className="w-4 h-4" />
            Seguir @roller_nm
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TutorialesPatinaje;
