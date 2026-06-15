import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Instagram, Heart, ExternalLink } from "lucide-react";
import logoNM from "@/assets/Logo-NM-Rollers.png";
import Footer from "@/components/Footer";

type Categoria = "Técnica" | "Equipo" | "Seguridad" | "Inicio";

interface Tutorial {
  titulo: string;
  descripcion: string;
  categoria: Categoria;
  likes: number;
  url: string;
}

const TUTORIALES: Tutorial[] = [
  {
    titulo: "Postura y equilibrio básico",
    descripcion:
      "Aprendé a pararte bien, flexionar y mantener el equilibrio: el primer paso para patinar con seguridad y confianza.",
    categoria: "Técnica",
    likes: 2508,
    url: "https://www.instagram.com/p/DYiYHg0ScYr/",
  },
  {
    titulo: "TOP 5 modelos de rollers recomendados",
    descripcion:
      "¿No sabés qué rollers comprar? Esta es nuestra respuesta definitiva: los 5 modelos que más recomendamos según tu nivel y presupuesto.",
    categoria: "Equipo",
    likes: 2403,
    url: "https://www.instagram.com/p/DXVHJaXj7ly/",
  },
  {
    titulo: "Mejor bota rígida extensible",
    descripcion:
      "Análisis completo de la bota rígida extensible: para quién sirve, cuándo conviene elegirla y cuáles son sus ventajas reales.",
    categoria: "Equipo",
    likes: 2241,
    url: "https://www.instagram.com/p/DXMi6c_DjGw/",
  },
  {
    titulo: "¿Alquilar o comprar tus primeros rollers?",
    descripcion:
      "Te explicamos cuándo tiene sentido arrancar con alquiler y cuándo ya es el momento de invertir en tu propio equipo.",
    categoria: "Inicio",
    likes: 1999,
    url: "https://www.instagram.com/p/DXzUMAGu_1e/",
  },
  {
    titulo: "Técnica de patinaje urbano",
    descripcion:
      "La técnica que necesitás para moverte con seguridad en la calle: postura, frenada y cómo leer el terreno.",
    categoria: "Técnica",
    likes: 1227,
    url: "https://www.instagram.com/p/DX9Wr4ZNca_/",
  },
  {
    titulo: "Cómo bajar un cordón",
    descripcion:
      "Bajar un cordón puede dar miedo al principio. Acá te mostramos distintas maneras de hacerlo según tu nivel.",
    categoria: "Técnica",
    likes: 834,
    url: "https://www.instagram.com/p/DY0GPbQSEzL/",
  },
  {
    titulo: "Análisis: rollers RS600",
    descripcion:
      "Review detallado del modelo RS600: prestaciones, precio, para qué perfil de patinador es ideal y cómo se compara con la competencia.",
    categoria: "Equipo",
    likes: 713,
    url: "https://www.instagram.com/p/DXPkw4BD4MH/",
  },
  {
    titulo: "Disciplinas de patinaje disponibles",
    descripcion:
      "Primeros pasos, slalom, urbano y más. Conocé todas las disciplinas que podés aprender y encontrá la que más se adapta a vos.",
    categoria: "Inicio",
    likes: 464,
    url: "https://www.instagram.com/p/C8Up1aiOn8m/",
  },
  {
    titulo: "Cómo frenar correctamente",
    descripcion:
      "Técnica de frenada paso a paso: dos métodos, cuándo usar cada uno y los errores más comunes que hay que evitar.",
    categoria: "Técnica",
    likes: 458,
    url: "https://www.instagram.com/p/DZGrmVOKqWH/",
  },
  {
    titulo: "Protecciones: qué es obligatorio",
    descripcion:
      "Nunca salgas a patinar sin tus protecciones. Te mostramos qué elementos son indispensables y cómo colocártelos bien.",
    categoria: "Seguridad",
    likes: 417,
    url: "https://www.instagram.com/p/DXSaObNj8lv/",
  },
];

const CATEGORIA_STYLE: Record<Categoria, string> = {
  Técnica:  "bg-primary/10 text-primary border border-primary/20",
  Equipo:   "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  Seguridad:"bg-orange-500/10 text-orange-400 border border-orange-500/20",
  Inicio:   "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
};

const TutorialesPatinaje = () => {
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
          Los videos más vistos de nuestra cuenta de Instagram.
        </p>
      </section>

      {/* Grid */}
      <main className="container mx-auto px-4 pb-16 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TUTORIALES.map((t) => (
            <a
              key={t.url}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-xl border border-border bg-card hover:border-primary/40 hover:bg-card/80 transition-all duration-200 overflow-hidden"
            >
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
                <h2 className="font-bold text-base leading-snug group-hover:text-primary transition-colors">
                  {t.titulo}
                </h2>
                <p className="text-foreground/55 text-sm leading-relaxed flex-1">
                  {t.descripcion}
                </p>
              </div>

              {/* Card footer */}
              <div className="border-t border-border/50 px-5 py-3 flex items-center justify-between text-xs text-foreground/40 group-hover:text-primary transition-colors">
                <span className="flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5" />
                  Ver en Instagram
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </div>
            </a>
          ))}
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
