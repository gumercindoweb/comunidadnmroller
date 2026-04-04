import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logoNM from "@/assets/Logo-NM-Rollers.png";
import { Menu, X } from "lucide-react";

const navLinksLeft = [
  { label: "Sedes", id: "sedes" },
  { label: "Horarios", id: "horarios" },
];

const navLinksRight = [
  { label: "Planes", id: "planes" },
  { label: "Testimonios", id: "testimonios" },
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background shadow-md border-b border-border"
          : "bg-background/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>

        {/* Desktop: left links */}
        <div className="hidden md:flex items-center gap-8 flex-1 justify-end pr-8">
          {navLinksLeft.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-semibold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Center logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex-shrink-0"
        >
          <img src={logoNM} alt="NM Roller" className="h-10" />
        </button>

        {/* Desktop: right links + CTA */}
        <div className="hidden md:flex items-center gap-8 flex-1 pl-8">
          {navLinksRight.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-semibold uppercase tracking-widest text-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="ml-auto">
            <Button
              onClick={() => scrollTo("planes")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm uppercase tracking-wider px-8 py-5 rounded-full shadow-lg shadow-primary/30"
            >
              Comprar Plan
            </Button>
          </div>
        </div>

        {/* Mobile: placeholder for alignment */}
        <div className="md:hidden w-6" />
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="flex flex-col items-center gap-4 py-6">
            {[...navLinksLeft, ...navLinksRight].map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.id)}
                className="text-foreground font-semibold text-lg uppercase tracking-widest"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("planes")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 rounded-full"
            >
              Comprar Plan
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
