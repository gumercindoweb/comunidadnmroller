// Recibe una sugerencia de horario/sede, la envía por email a hola@comunidadnmroller.com
// y notifica al canal de Slack #sugerencias-usuarios vía el conector de Slack de Lovable.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const SLACK_CHANNEL = "sugerencias-usuarios";
const SLACK_GATEWAY = "https://connector-gateway.lovable.dev/slack/api";

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

    if (!body || typeof body !== "object") {
      return json({ error: "Invalid body" }, 400);
    }
    if (body.website && body.website.length > 0) {
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

    console.log(
      "[sugerencia]",
      JSON.stringify({ ts: new Date().toISOString(), nombre, email, zona, dia, franja, comentario }),
    );

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    // --- Email via Lovable (no bloqueante) ---
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
        console.warn("[sugerencia] email send falló:", e);
      }
    }

    // --- Slack vía conector de Lovable (no bloqueante) ---
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");
    if (LOVABLE_API_KEY && SLACK_API_KEY) {
      try {
        const lines = [
          `*🛼 Nueva sugerencia de horario/sede*`,
          ``,
          `*Nombre:* ${nombre}`,
          `*Email:* ${email}`,
          `*Zona sugerida:* ${zona}`,
          `*Día preferido:* ${dia}`,
          `*Horario preferido:* ${franja}`,
          comentario ? `*Comentario:* ${comentario}` : null,
        ].filter(Boolean).join("\n");

        const slackHeaders = {
          "Authorization": `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": SLACK_API_KEY,
          "Content-Type": "application/json; charset=utf-8",
        };

        const postMessage = async () => {
          const r = await fetch(`${SLACK_GATEWAY}/chat.postMessage`, {
            method: "POST",
            headers: slackHeaders,
            body: JSON.stringify({
              channel: SLACK_CHANNEL,
              text: lines,
              unfurl_links: false,
              unfurl_media: false,
            }),
          });
          const d = await r.json().catch(() => ({}));
          return { r, d };
        };

        let { r: res, d: data } = await postMessage();

        // Si el bot no está en el canal, intentar unirse y reintentar.
        if (!data?.ok && data?.error === "not_in_channel") {
          console.log("[sugerencia] bot no está en el canal, intentando join…");
          // 1) buscar el ID del canal por nombre
          let channelId = "";
          let cursor = "";
          do {
            const listRes = await fetch(
              `${SLACK_GATEWAY}/conversations.list?limit=200&types=public_channel${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`,
              { method: "POST", headers: slackHeaders },
            );
            const listData = await listRes.json().catch(() => ({}));
            if (!listData?.ok) {
              console.warn("[sugerencia] conversations.list falló:", JSON.stringify(listData));
              break;
            }
            const hit = listData.channels?.find((c: any) => c.name === SLACK_CHANNEL);
            if (hit) {
              channelId = hit.id;
              break;
            }
            cursor = listData.response_metadata?.next_cursor ?? "";
          } while (cursor);

          if (channelId) {
            const joinRes = await fetch(
              `${SLACK_GATEWAY}/conversations.join?channel=${channelId}`,
              { method: "POST", headers: slackHeaders },
            );
            const joinData = await joinRes.json().catch(() => ({}));
            if (joinData?.ok) {
              console.log("[sugerencia] bot unido al canal, reintentando postMessage");
              ({ r: res, d: data } = await postMessage());
            } else {
              console.warn("[sugerencia] conversations.join falló:", JSON.stringify(joinData));
            }
          } else {
            console.warn("[sugerencia] no se encontró el canal #" + SLACK_CHANNEL);
          }
        }

        if (!res.ok || !data?.ok) {
          console.warn("[sugerencia] Slack postMessage falló:", res.status, JSON.stringify(data));
        } else {
          console.log("[sugerencia] Slack notificado OK en #" + SLACK_CHANNEL);
        }
      } catch (e) {
        console.warn("[sugerencia] Slack fetch falló:", e);
      }
    } else {
      console.warn("[sugerencia] LOVABLE_API_KEY o SLACK_API_KEY no configurados");
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
