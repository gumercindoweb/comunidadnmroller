import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import logoNM from "@/assets/Logo-NM-Rollers.png";
import { getProximaMasterclass } from "@/data/masterclasses";

const Footer = () => {
  const proxMc = getProximaMasterclass();
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
              <li><Link to="/clases-de-rollers-mas-alquiler" className="hover:text-primary transition-colors">Clases + Alquiler</Link></li>
              <li><Link to="/clase-gratis" className="hover:text-primary transition-colors">Clase de Prueba Gratis</Link></li>
              <li><Link to="/newsletter-desde-cero" className="hover:text-primary transition-colors">Newsletter Desde Cero</Link></li>
              <li><Link to={`/masterclass-de-patinaje/${proxMc.slug}`} className="hover:text-primary transition-colors">Masterclass de Patinaje</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold italic mb-4 text-sm tracking-wide">LEGAL</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><Link to="/terminos-y-condiciones" className="hover:text-primary transition-colors">Términos y Condiciones</Link></li>
              <li><Link to="/politicas-de-privacidad" className="hover:text-primary transition-colors">Política de Privacidad</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold italic mb-4 text-sm tracking-wide">CONTACTO</h4>
            <ul className="space-y-2 text-foreground/60 text-sm">
              <li><a href="mailto:hola@comunidadnmroller.com" className="hover:text-primary transition-colors">hola@comunidadnmroller.com</a></li>
              <li><a href="https://wa.me/5491165920600" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">+54 11 6592-0600</a></li>
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
