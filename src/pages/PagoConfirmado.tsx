import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Smartphone,
  Mail,
  Users,
  Upload,
  FileCheck,
  AlertCircle,
  Apple,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoNM from "@/assets/Logo-NM-Rollers.png";

const PLAN_LABELS: Record<string, string> = {
  "clase-unica": "Clase Única",
  "basic-fun": "Basic Fun",
  "black-free": "Black Free",
  "basic-fun-trimestral": "Basic Fun Trimestral",
  "black-trimestral": "Black Trimestral",
};

const MAX_MB = 8;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

const PagoConfirmado = () => {
  const [searchParams] = useSearchParams();
  const planSlug = searchParams.get("plan") ?? "";
  const planLabel = PLAN_LABELS[planSlug] ?? "";

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const fileError = useMemo(() => {
    if (!file) return null;
    if (!ACCEPTED.includes(file.type)) return "Formato no permitido (usá JPG, PNG, WEBP o PDF).";
    if (file.size > MAX_MB * 1024 * 1024) return `El archivo supera los ${MAX_MB}MB.`;
    return null;
  }, [file]);

  const canSubmit =
    nombre.trim().length > 1 &&
    /^\S+@\S+\.\S+$/.test(email) &&
    telefono.trim().length >= 6 &&
    file !== null &&
    !fileError &&
    !submitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit || !file) return;
    setSubmitting(true);
    try {
      const ext = file.name.split(".").pop() ?? "bin";
      const safeName = nombre.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
      const path = `${Date.now()}-${safeName}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("comprobantes-pago")
        .upload(path, file, { contentType: file.type, upsert: false });
      if (upErr) throw upErr;

      const { error: insErr } = await supabase.from("comprobantes_pago").insert({
        nombre: nombre.trim(),
        email: email.trim(),
        telefono: telefono.trim(),
        plan: planLabel || planSlug || null,
        file_path: path,
      });
      if (insErr) throw insErr;

      // Disparar GetResponse + webhook Make (no bloqueante)
      supabase.functions
        .invoke("notify-comprobante", {
          body: {
            nombre: nombre.trim(),
            email: email.trim(),
            telefono: telefono.trim(),
            plan: planLabel || planSlug || null,
            file_path: path,
          },
        })
        .catch((e) => console.error("notify-comprobante failed", e));

      setDone(true);
      toast({
        title: "¡Comprobante recibido!",
        description: "Te vamos a contactar dentro de las próximas 24hs hábiles para activar tu plan.",
      });
    } catch (err: any) {
      toast({
        title: "Algo falló al subir el comprobante",
        description: err?.message ?? "Probá de nuevo en unos segundos.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>¡Pago recibido! Subí tu comprobante — Comunidad NM Roller</title>
        <meta
          name="description"
          content="Confirmá tu inscripción a NM Roller: adjuntá el comprobante de Mercado Pago y activamos tu plan."
        />
        <meta name="robots" content="noindex,follow" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Header */}
        <header className="pt-8 pb-4 flex justify-center bg-primary">
          <Link to="/" aria-label="Volver al inicio">
            <img src={logoNM} alt="NM Roller" className="h-14" />
          </Link>
        </header>

        {/* Hero rojo */}
        <section className="relative bg-primary text-primary-foreground pt-10 pb-32 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-[#F5B800] text-[#111] border-2 border-[#F5B800] px-5 py-2 mb-6 text-xs md:text-sm font-black uppercase tracking-[0.18em] shadow-[0_0_24px_rgba(245,184,0,0.45)]">
              <AlertCircle className="w-4 h-4 animate-pulse" strokeWidth={3} /> Pago en proceso
            </div>
            <h1 className="font-display italic uppercase leading-[0.95] text-4xl md:text-6xl font-black mb-6">
              ¡Gracias por sumarte!
            </h1>
            {planLabel && (
              <p className="font-bold text-lg md:text-xl mb-4">
                Plan elegido:{" "}
                <span className="underline decoration-primary-foreground/40 underline-offset-4">
                  {planLabel}
                </span>
              </p>
            )}
            <p className="text-base md:text-lg leading-relaxed mb-6 text-primary-foreground/95 max-w-xl mx-auto">
              Para <strong>activar tu plan</strong> necesitamos un último paso:{" "}
              <strong>adjuntá el comprobante</strong> de Mercado Pago. Con eso te damos
              de alta y te enviamos las instrucciones para reservar tu primera clase.
            </p>
            <p className="font-bold text-base md:text-lg">Aprendé, rolleá y disfrutá.</p>
          </div>


          <svg
            className="absolute bottom-0 left-0 w-full h-16 md:h-24 text-background"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,40 C360,120 1080,-20 1440,60 L1440,100 L0,100 Z" fill="currentColor" />
          </svg>
        </section>

        {/* 3 Pasos */}
        <section className="py-16 md:py-20 px-6 bg-background">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display italic uppercase text-2xl md:text-4xl font-black text-primary text-center mb-12">
              ¿Cómo seguimos?
            </h2>
            <ol className="grid md:grid-cols-3 gap-6">
              {[
                {
                  Icon: CreditCard,
                  title: "Pagaste por Mercado Pago",
                  text: "Acabás de completar el pago. Guardá la captura o el PDF del comprobante.",
                  state: "done",
                },
                {
                  Icon: Upload,
                  title: "Adjuntá el comprobante",
                  text: "Completá el formulario de abajo con tus datos y el archivo del comprobante.",
                  state: "active",
                },
                {
                  Icon: Sparkles,
                  title: "Te damos de alta",
                  text: "En menos de 24hs hábiles te escribimos con tu acceso y cómo reservar tu primera clase.",
                  state: "next",
                },
              ].map((s, i) => (
                <li
                  key={i}
                  className={`relative border-2 p-6 transition-all ${
                    s.state === "active"
                      ? "border-primary bg-primary/5 shadow-[0_0_24px_hsl(var(--primary)/0.15)]"
                      : s.state === "done"
                        ? "border-foreground/20 bg-muted"
                        : "border-foreground/10 bg-background"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`inline-flex items-center justify-center w-10 h-10 font-black text-lg ${
                        s.state === "done"
                          ? "bg-foreground/20 text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <s.Icon
                      className={`w-6 h-6 ${
                        s.state === "active" ? "text-primary" : "text-foreground/60"
                      }`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <h3 className="font-display italic uppercase font-black text-lg mb-2 leading-tight">
                    {s.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Form upload */}
        <section className="bg-muted py-16 md:py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-1.5 mb-4 text-xs font-bold uppercase tracking-[0.18em]">
                <AlertCircle className="w-4 h-4" /> Paso final
              </div>
              <h2 className="font-display italic uppercase text-3xl md:text-5xl font-black text-primary leading-[0.95] mb-4">
                Adjuntá tu comprobante
              </h2>
              <p className="text-base md:text-lg text-foreground/80 leading-relaxed max-w-xl mx-auto">
                Es <strong>indispensable</strong> para darte de alta. Sin el comprobante
                no podemos confirmar tu pago ni activar tu plan.
              </p>
            </div>

            {done ? (
              <div className="border-2 border-primary bg-background p-8 md:p-10 text-center">
                <FileCheck className="w-16 h-16 text-primary mx-auto mb-4" strokeWidth={2} />
                <h3 className="font-display italic uppercase font-black text-2xl text-primary mb-3">
                  ¡Comprobante recibido!
                </h3>
                <p className="text-foreground/80 mb-2">
                  Lo estamos revisando. Te escribimos a <strong>{email}</strong> en menos
                  de 24hs hábiles con la confirmación y las instrucciones para reservar
                  tu primera clase.
                </p>
                <p className="text-sm text-foreground/60 mt-6">
                  ¿Tenés alguna duda mientras tanto?{" "}
                  <a
                    href="https://wa.me/5491123456789"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-bold underline"
                  >
                    Escribinos por WhatsApp
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-background border-2 border-foreground/10 p-6 md:p-8 space-y-5"
              >
                <div className="space-y-2">
                  <Label htmlFor="nombre" className="uppercase tracking-[0.12em] text-xs font-bold">
                    Nombre y apellido *
                  </Label>
                  <Input
                    id="nombre"
                    required
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ej: Laura Pérez"
                    maxLength={100}
                    className="rounded-none border-foreground/20 h-12"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="uppercase tracking-[0.12em] text-xs font-bold">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      maxLength={150}
                      className="rounded-none border-foreground/20 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="telefono"
                      className="uppercase tracking-[0.12em] text-xs font-bold"
                    >
                      Teléfono / WhatsApp *
                    </Label>
                    <Input
                      id="telefono"
                      required
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      placeholder="11 5555 5555"
                      maxLength={30}
                      className="rounded-none border-foreground/20 h-12"
                    />
                  </div>
                </div>

                {planLabel && (
                  <div className="space-y-2">
                    <Label className="uppercase tracking-[0.12em] text-xs font-bold">
                      Plan
                    </Label>
                    <div className="h-12 px-3 flex items-center bg-muted border border-foreground/10 font-bold text-foreground">
                      {planLabel}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label
                    htmlFor="comprobante"
                    className="uppercase tracking-[0.12em] text-xs font-bold"
                  >
                    Comprobante de pago *
                  </Label>
                  <label
                    htmlFor="comprobante"
                    className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed p-6 cursor-pointer transition-colors ${
                      fileError
                        ? "border-destructive bg-destructive/5"
                        : file
                          ? "border-primary bg-primary/5"
                          : "border-foreground/20 hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    {file ? (
                      <>
                        <FileCheck className="w-8 h-8 text-primary" />
                        <span className="font-bold text-sm break-all text-center">
                          {file.name}
                        </span>
                        <span className="text-xs text-foreground/60">
                          {(file.size / 1024 / 1024).toFixed(2)} MB · Tocá para cambiar
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-foreground/40" />
                        <span className="font-bold text-sm">
                          Tocá para seleccionar archivo
                        </span>
                        <span className="text-xs text-foreground/60">
                          JPG, PNG, WEBP o PDF · máx. {MAX_MB}MB
                        </span>
                      </>
                    )}
                    <input
                      id="comprobante"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp,.pdf,image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    />
                  </label>
                  {fileError && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" /> {fileError}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full h-14 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-[0.18em] text-sm transition-all hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)] disabled:opacity-50"
                >
                  {submitting ? "Enviando..." : "Enviar comprobante y activar plan"}
                </Button>
                <p className="text-xs text-center text-foreground/50">
                  Al enviar aceptás que te contactemos para confirmar tu inscripción.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center bg-background border-t border-border">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors uppercase tracking-[0.18em] mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al sitio
          </Link>
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} Comunidad NM Roller
          </p>
        </footer>
      </main>
    </>
  );
};

export default PagoConfirmado;
