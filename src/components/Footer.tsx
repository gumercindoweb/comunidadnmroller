import { Instagram } from "lucide-react";
import logoNM from "@/assets/Logo-NM-Rollers.png";

const Footer = () => {
  return (
    <footer className="bg-card text-foreground py-16 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <img src={logoNM} alt="NM Roller" className="h-12 mb-2" />
            <p className="text-foreground/50 text-sm mt-4 leading-relaxed">
              La escuela de patinaje #1 de Argentina. Más de 3.000 alumnos confían en nosotros.
            </p>
          </div>

          <div>
            <h4 className="font-bold italic mb-4 text-sm tracking-wide">NAVEGACIÓN</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><button onClick={() => document.getElementById("propuesta")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">¿Por qué NM?</button></li>
              <li><button onClick={() => document.getElementById("planes")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">Planes</button></li>
              <li><button onClick={() => document.getElementById("sedes")?.scrollIntoView({ behavior: "smooth" })} className="hover:text-primary transition-colors">Sedes</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold italic mb-4 text-sm tracking-wide">LEGAL</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Términos y Condiciones</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold italic mb-4 text-sm tracking-wide">CONTACTO</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li>info@nmroller.com</li>
              <li>Buenos Aires, Argentina</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com/nmroller" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/10 pt-8 text-center text-foreground/40 text-sm">
          © {new Date().getFullYear()} NM Roller. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
