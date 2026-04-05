import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logoNM from "@/assets/Logo-NM-Rollers.png";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Inicio", id: "top" },
  { label: "Sedes", id: "sedes" },
  { label: "Horarios", id: "horarios" },
  { label: "Planes", id: "planes" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-xl shadow-sm border-b border-border/30"
          : "bg-background/70 backdrop-blur-md border-b border-border/20"
      }`}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between h-16 px-6 lg:px-12">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex-shrink-0"
        >
          <img src={logoNM} alt="NM Roller" className="h-11" />
        </button>

        {/* Center nav links - desktop */}
        <div className="hidden md:flex items-center gap-1 bg-muted/60 backdrop-blur-sm rounded-full px-2 py-1.5">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="text-xs font-semibold tracking-widest uppercase px-5 py-2 rounded-full transition-all duration-300 text-foreground/60 hover:text-foreground hover:bg-foreground/10"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* CTA button - desktop */}
        <div className="hidden md:block">
          <Button
            onClick={() => scrollTo("planes")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-wide uppercase px-8 py-5 rounded-full shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:scale-105"
          >
            Comprar Plan
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-full transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-b border-border/50">
          <div className="flex flex-col items-center gap-2 py-6 px-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.id)}
                className="text-foreground/80 hover:text-foreground font-semibold text-sm tracking-widest uppercase py-2 w-full text-center rounded-lg hover:bg-muted transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("planes")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-5 rounded-full mt-2 w-full max-w-xs"
            >
              Comprar Plan
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
