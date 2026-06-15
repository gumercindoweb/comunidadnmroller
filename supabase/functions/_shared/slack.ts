// Helper compartido para enviar mensajes a Slack vía el conector gateway de Lovable.
// Si el bot no está en el canal, intenta auto-unirse (solo canales públicos).

const SLACK_GATEWAY = "https://connector-gateway.lovable.dev/slack/api";

export interface NotifySlackOptions {
  channel: string;
  text: string;
  /** Descripción corta para los logs (ej: "[clase-gratis]") */
  logTag?: string;
}

export async function notifySlack({ channel, text, logTag = "[slack]" }: NotifySlackOptions): Promise<boolean> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const SLACK_API_KEY = Deno.env.get("SLACK_API_KEY");

  if (!LOVABLE_API_KEY || !SLACK_API_KEY) {
    console.warn(`${logTag} LOVABLE_API_KEY o SLACK_API_KEY no configurados`);
    return false;
  }

  const headers = {
    "Authorization": `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": SLACK_API_KEY,
    "Content-Type": "application/json; charset=utf-8",
  };

  const postMessage = async () => {
    const r = await fetch(`${SLACK_GATEWAY}/chat.postMessage`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        channel,
        text,
        unfurl_links: false,
        unfurl_media: false,
      }),
    });
    const d = await r.json().catch(() => ({}));
    return { r, d };
  };

  try {
    let { r: res, d: data } = await postMessage();

    if (!data?.ok && data?.error === "not_in_channel") {
      console.log(`${logTag} bot no está en #${channel}, intentando join…`);
      let channelId = "";
      let cursor = "";
      do {
        const listRes = await fetch(
          `${SLACK_GATEWAY}/conversations.list?limit=200&types=public_channel${cursor ? `&cursor=${encodeURIComponent(cursor)}` : ""}`,
          { method: "POST", headers },
        );
        const listData = await listRes.json().catch(() => ({}));
        if (!listData?.ok) {
          console.warn(`${logTag} conversations.list falló:`, JSON.stringify(listData));
          break;
        }
        const hit = listData.channels?.find((c: any) => c.name === channel);
        if (hit) {
          channelId = hit.id;
          break;
        }
        cursor = listData.response_metadata?.next_cursor ?? "";
      } while (cursor);

      if (channelId) {
        const joinRes = await fetch(`${SLACK_GATEWAY}/conversations.join?channel=${channelId}`, {
          method: "POST",
          headers,
        });
        const joinData = await joinRes.json().catch(() => ({}));
        if (joinData?.ok) {
          console.log(`${logTag} bot unido al canal, reintentando postMessage`);
          ({ r: res, d: data } = await postMessage());
        } else {
          console.warn(`${logTag} conversations.join falló:`, JSON.stringify(joinData));
        }
      } else {
        console.warn(`${logTag} no se encontró el canal #${channel}`);
      }
    }

    if (!res.ok || !data?.ok) {
      console.warn(`${logTag} Slack postMessage falló:`, res.status, JSON.stringify(data));
      return false;
    }
    console.log(`${logTag} Slack notificado OK en #${channel}`);
    return true;
  } catch (e) {
    console.warn(`${logTag} Slack fetch falló:`, e);
    return false;
  }
}
