import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import logoNM from "@/assets/Logo-NM-Rollers.png";
import { Menu, X } from "lucide-react";

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
          ? "bg-background/80 backdrop-blur-lg shadow-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <img src={logoNM} alt="NM Roller" className="h-10" />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Sedes", id: "sedes" },
            { label: "Horarios", id: "horarios" },
            { label: "Planes", id: "planes" },
          ].map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-primary ${
                scrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => scrollTo("planes")}
            className="bg-primary hover:bg-secondary text-primary-foreground font-bold px-6"
          >
            Comprar Plan
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className={`h-6 w-6 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} />
          ) : (
            <Menu className={`h-6 w-6 ${scrolled ? "text-foreground" : "text-primary-foreground"}`} />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="flex flex-col items-center gap-4 py-6">
            {["Sedes", "Horarios", "Planes"].map((label) => (
              <button
                key={label}
                onClick={() => scrollTo(label.toLowerCase())}
                className="text-foreground font-semibold text-lg"
              >
                {label}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("planes")}
              className="bg-primary hover:bg-secondary text-primary-foreground font-bold px-8"
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
