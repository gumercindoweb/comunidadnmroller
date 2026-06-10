import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Check, ArrowLeft } from "lucide-react";
import logoNM from "@/assets/Logo-NM-Rollers.png";

const ClaseGratisConfirmada = () => (
  <>
    <Helmet>
      <title>Clase de prueba reservada · NM Roller</title>
      <meta name="robots" content="noindex" />
    </Helmet>
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-16">
      <Link to="/" aria-label="Inicio" className="mb-10">
        <img src={logoNM} alt="NM Roller" className="h-14" />
      </Link>
      <div className="max-w-xl text-center">
        <div className="w-14 h-14 bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8" strokeWidth={3} />
        </div>
        <h1 className="font-display italic uppercase text-3xl md:text-5xl font-black mb-4">
          ¡Recibimos tu solicitud!
        </h1>
        <p className="text-foreground/70 mb-10">
          En breve te contactamos por WhatsApp para confirmar tu clase de prueba.
          Mientras tanto, revisá tu correo.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground uppercase tracking-[0.18em]"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al sitio
        </Link>
      </div>
    </main>
  </>
);

export default ClaseGratisConfirmada;
