import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, ArrowLeft, Loader2, Sparkles, Zap, Star, Mail, Rocket } from "lucide-react";
import logoNM from "@/assets/Logo-NM-Rollers.png";
import mockup from "@/assets/newsletter-mockup.png";

const FormSchema = z.object({
  name: z.string().trim().min(1, "Ingresá tu nombre").max(100),
  email: z.string().trim().email("Email inválido").max(255),
});

const benefits = [
  "Tips simples para patinar con seguridad y confianza",
  "Mini desafíos y motivación semanal",
  "Historias reales de personas como vos",
  "Acceso a la Ruta de Aprendizaje + Bitácora",
];

const NewsletterDesdeCero = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = FormSchema.safeParse({ name, email });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Datos inválidos");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("subscribe-newsletter", {
        body: parsed.data,
      });
      if (error) throw error;
      if (data?.success) {
        setSuccess(true);
        toast.success(
          data.alreadySubscribed
            ? "Ya estabas en la lista. ¡Nos vemos pronto!"
            : "¡Listo! Revisá tu correo para empezar."
        );
        setName("");
        setEmail("");
      } else {
        throw new Error(data?.error ?? "Algo salió mal");
      }
    } catch (err: any) {
      toast.error(err?.message ?? "No pudimos sumarte. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Newsletter Desde Cero — Comunidad NM Roller</title>
        <meta
          name="description"
          content="La newsletter que te impulsa a dar tu primer paso sobre ruedas. Tips, motivación semanal y la Ruta de Aprendizaje, gratis."
        />
        <link rel="canonical" href="https://comunidadnmroller.lovable.app/newsletter-desde-cero" />
        <meta property="og:title" content="Newsletter Desde Cero — Comunidad NM Roller" />
        <meta property="og:description" content="Empezá a patinar desde cero con tips, motivación y desafíos suaves en tu inbox." />
        <meta property="og:url" content="https://comunidadnmroller.lovable.app/newsletter-desde-cero" />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header */}
        <header className="pt-10 pb-4 flex justify-center">
          <Link to="/" aria-label="Volver al inicio">
            <img src={logoNM} alt="NM Roller" className="h-14" />
          </Link>
        </header>

        {/* Hero */}
        <section className="flex-1 flex items-center px-6 lg:px-16 py-10">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <div>
              <p className="text-xs md:text-sm uppercase tracking-[0.18em] text-foreground/70 mb-6">
                ¿Y sí sí podés empezar a patinar?
              </p>
              <h1 className="font-display italic uppercase leading-[0.95] text-4xl md:text-5xl lg:text-6xl font-black mb-8">
                La newsletter que te<br />
                impulsa a dar<br />
                <span className="text-primary">tu primer paso</span>
              </h1>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8 max-w-xl">
                Te mandamos un correo que te acompaña desde cero: con tips reales,
                motivación y desafíos suaves.{" "}
                <strong className="text-foreground">
                  Incluso si no sabés frenar o hace mucho que no patinás.
                </strong>
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading || success}
                    maxLength={100}
                    required
                    className="h-12 rounded-none bg-card border-border text-base"
                  />
                  <Input
                    type="email"
                    placeholder="Tu mejor correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading || success}
                    maxLength={255}
                    required
                    className="h-12 rounded-none bg-card border-border text-base"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading || success}
                  className="w-full h-12 rounded-none bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-[0.18em] text-sm transition-all hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)]"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : success ? (
                    "¡Sumado! Revisá tu inbox"
                  ) : (
                    "Suscribirme"
                  )}
                </Button>
              </form>

              <p className="text-xs text-foreground/50 mt-4 max-w-xl">
                <span className="text-primary font-bold">¡ACEPTO!</span> Recibir contenido útil y promocional.
                Te esperamos. <strong>Desde cero. Con vos.</strong>
              </p>
            </div>

            {/* Right - mockup */}
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" aria-hidden />
              <img
                src={mockup}
                alt="Mockup del Mapa de Aprendizaje NM Roller en un celular"
                width={1024}
                height={1024}
                className="relative w-full h-auto max-w-lg mx-auto"
              />
            </div>
          </div>
        </section>

        {/* Benefits band */}
        <section className="bg-primary text-primary-foreground py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center font-display italic uppercase text-2xl md:text-4xl font-black mb-12 tracking-tight">
              Recibí en tu bandeja de entrada
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((b) => (
                <div key={b} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-primary-foreground text-primary flex items-center justify-center mb-4">
                    <Check className="w-6 h-6" strokeWidth={3} />
                  </div>
                  <p className="text-sm md:text-base font-medium leading-snug max-w-[220px]">
                    {b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer link */}
        <div className="py-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors uppercase tracking-[0.18em]"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al sitio
          </Link>
        </div>
      </main>
    </>
  );
};

export default NewsletterDesdeCero;
