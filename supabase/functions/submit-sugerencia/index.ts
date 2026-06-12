// Recibe una sugerencia de horario/sede y la envía por email a hola@comunidadnmroller.com
// Usa Lovable Emails (send-transactional-email) si está disponible.
// Si todavía no hay infra de email configurada, igual responde 200 y loguea la sugerencia
// para que ningún dato del usuario se pierda (revisable en logs).

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface Payload {
  nombre: string;
  email: string;
  zona: string;
  dia: string;
  franja: string;
  comentario?: string;
  website?: string; // honeypot
}

const DESTINO = "hola@comunidadnmroller.com";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Payload;

    // Validación básica server-side
    if (!body || typeof body !== "object") {
      return json({ error: "Invalid body" }, 400);
    }
    if (body.website && body.website.length > 0) {
      // Honeypot tocado → ignorar silenciosamente
      return json({ ok: true });
    }
    const nombre = String(body.nombre ?? "").trim().slice(0, 80);
    const email = String(body.email ?? "").trim().slice(0, 150);
    const zona = String(body.zona ?? "").trim().slice(0, 120);
    const dia = String(body.dia ?? "Cualquiera").slice(0, 30);
    const franja = String(body.franja ?? "Cualquiera").slice(0, 30);
    const comentario = String(body.comentario ?? "").trim().slice(0, 500);

    if (!nombre || !email || !zona) {
      return json({ error: "Faltan campos requeridos" }, 400);
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ error: "Email inválido" }, 400);
    }

    // Log estructurado (siempre)
    console.log(
      "[sugerencia]",
      JSON.stringify({ ts: new Date().toISOString(), nombre, email, zona, dia, franja, comentario }),
    );

    // Intento de envío vía Lovable Emails (si está scaffolded)
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (SUPABASE_URL && SERVICE_ROLE) {
      try {
        const admin = createClient(SUPABASE_URL, SERVICE_ROLE);
        const idempotencyKey = `sugerencia-${email}-${Date.now()}`;
        const { error } = await admin.functions.invoke("send-transactional-email", {
          body: {
            templateName: "sugerencia-horario",
            recipientEmail: DESTINO,
            idempotencyKey,
            replyTo: email,
            templateData: { nombre, email, zona, dia, franja, comentario },
          },
        });
        if (error) {
          console.warn("[sugerencia] send-transactional-email no disponible:", error.message);
        }
      } catch (e) {
        console.warn("[sugerencia] email send falló (probablemente infra no configurada):", e);
      }
    }

    return json({ ok: true });
  } catch (e) {
    console.error("[sugerencia] error:", e);
    return json({ error: "Error procesando la sugerencia" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
