import { MapPin, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const sedes = [
  { name: "Rosedal", address: "Infanta Isabel 555, Palermo", area: "CABA", maps: "https://maps.app.goo.gl/wsKfFUGqciPhAbup7" },
  { name: "Puerto Madero", address: "Pierina Dealessi 100-150", area: "CABA", maps: "https://maps.app.goo.gl/L7ZsdAEvwSPZWbwU8" },
  { name: "Caballito (P. Rivadavia)", address: "Monumento a Bolívar", area: "CABA", maps: "https://maps.app.goo.gl/PoyVBEq58EbUdtM59" },
  { name: "Vicente López", address: "Playón Río Vicente López", area: "GBA Norte", maps: "https://maps.app.goo.gl/spbof6ndxcJgAog56" },
  { name: "Belgrano", address: "Av. Figueroa Alcorta 6734", area: "CABA", maps: "https://maps.app.goo.gl/eUhoF2YDj4VnmPbp6" },
  { name: "Villa Luro (Skatepark)", address: "Av. Rivadavia 9300", area: "CABA", maps: "https://maps.app.goo.gl/Q1jrrWT8Rcvr7xR58" },
  { name: "Belgrano (Skatepark)", address: "Skatepark Converse", area: "CABA", maps: "https://maps.app.goo.gl/6rRCVgFi3N6fEUPb8" },
  { name: "Colegiales", address: "Conde, Plaza Mafalda", area: "CABA", maps: "https://maps.app.goo.gl/689B4vaoSq851ZJ1A" },
  { name: "Plaza La Pampa", address: "Av. Gaona y Gavilán", area: "CABA", maps: "https://maps.app.goo.gl/n3egc4dPJRSDRCPG7" },
  { name: "Devoto", address: "Plaza Arenales", area: "CABA", maps: "https://maps.app.goo.gl/45fnmEEHSHPAu4gg7" },
  { name: "Villa Real", address: "Plaza Las Toscaneras", area: "CABA", maps: "https://maps.app.goo.gl/mxt7d3g3SUkRtkms7" },
  { name: "Parque Las Heras", address: "Recoleta", area: "CABA", maps: "https://maps.app.goo.gl/bBQiZYm4ZnF3yxSy5" },
];

const SedesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="sedes" className="py-24 bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Ubicaciones</p>
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tight text-foreground mb-4">
            12 Sedes al aire libre
          </h2>
          <p className="text-muted-foreground text-lg">
            Elegí la que te quede más cómoda y empezá cuando quieras
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {sedes.map((sede, i) => (
            <div
              key={sede.name}
              className={`bg-background rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground text-sm">{sede.name}</p>
                  <p className="text-muted-foreground text-xs">{sede.address}</p>
                  <p className="text-muted-foreground text-[11px]">{sede.area}</p>
                </div>
              </div>
              <a
                href={sede.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-secondary transition-colors"
              >
                Cómo llegar <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SedesSection;
