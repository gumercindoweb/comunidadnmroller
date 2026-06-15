// Envía mensajes a Slack vía Incoming Webhooks propios (independiente de Lovable).

const WEBHOOK_SECRETS: Record<string, string> = {
  'sugerencias-usuarios':      'SLACK_WEBHOOK_SUGERENCIAS',
  'registro-clase-gratis':     'SLACK_WEBHOOK_CLASE_GRATIS',
  'registro-socios-sportclub': 'SLACK_WEBHOOK_SPORTCLUB',
  'venta-de-planes':           'SLACK_WEBHOOK_VENTA_PLANES',
  'venta-alquiler-clases':     'SLACK_WEBHOOK_VENTA_ALQUILER',
}

export interface NotifySlackOptions {
  channel: string
  text: string
  logTag?: string
}

export async function notifySlack({ channel, text, logTag = '[slack]' }: NotifySlackOptions): Promise<boolean> {
  const secretName = WEBHOOK_SECRETS[channel]
  if (!secretName) {
    console.warn(`${logTag} Canal desconocido: ${channel}`)
    return false
  }

  const webhookUrl = Deno.env.get(secretName)
  if (!webhookUrl) {
    console.warn(`${logTag} Secreto ${secretName} no configurado`)
    return false
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
    if (!res.ok) {
      console.warn(`${logTag} Slack webhook falló: ${res.status}`)
      return false
    }
    console.log(`${logTag} Slack notificado OK en #${channel}`)
    return true
  } catch (e) {
    console.warn(`${logTag} Slack fetch falló:`, e)
    return false
  }
}
