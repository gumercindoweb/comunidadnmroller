import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import SedesMapa from "./SedesMapa";

const SedesSection = () => {
  const { ref } = useScrollAnimation();

  return (
    <section id="sedes" className="py-24 bg-muted" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Ubicaciones</p>
          <h2 className="text-3xl md:text-5xl font-black italic tracking-tight text-foreground mb-4">
            12 Sedes al aire libre
          </h2>
          <p className="text-muted-foreground text-lg">
            Explorá el mapa y descubrí los horarios de cada sede
          </p>
        </div>

        <SedesMapa />
      </div>
    </section>
  );
};

export default SedesSection;
