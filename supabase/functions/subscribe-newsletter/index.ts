import { z } from 'npm:zod@3.23.8'

const ALLOWED_ORIGINS = new Set([
  'https://comunidadnmroller.lovable.app',
  'https://id-preview--dfe84f81-a50f-4e2f-9f25-cd53b5158069.lovable.app',
  'http://localhost:5173',
  'http://localhost:8080',
])

function buildCors(origin: string | null) {
  const allowOrigin =
    origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith('.lovable.app') || origin.endsWith('.lovableproject.com'))
      ? origin
      : 'https://comunidadnmroller.lovable.app'
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  // Honeypot: bots fill it, humans don't. Must be empty.
  website: z.string().max(0).optional().or(z.literal('')),
})

Deno.serve(async (req) => {
  const corsHeaders = buildCors(req.headers.get('origin'))

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const API_KEY = Deno.env.get('GETRESPONSE_API_KEY')
    const CAMPAIGN_ID = Deno.env.get('GETRESPONSE_CAMPAIGN_ID')
    if (!API_KEY || !CAMPAIGN_ID) {
      return new Response(
        JSON.stringify({ error: 'Servicio de newsletter no configurado.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const json = await req.json().catch(() => null)
    const parsed = BodySchema.safeParse(json)
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Datos inválidos' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }
    const { name, email, website } = parsed.data

    // Honeypot triggered → silently accept without forwarding.
    if (website && website.length > 0) {
      return new Response(JSON.stringify({ success: true, alreadySubscribed: false }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const res = await fetch('https://api.getresponse.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': `api-key ${API_KEY}`,
      },
      body: JSON.stringify({
        name,
        email,
        campaign: { campaignId: CAMPAIGN_ID },
        dayOfCycle: '0',
      }),
    })

    if (res.status === 202 || res.status === 200) {
      return new Response(JSON.stringify({ success: true, alreadySubscribed: false }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const errBody = await res.text()
    let parsedErr: any = null
    try { parsedErr = JSON.parse(errBody) } catch {}

    if (res.status === 409 || parsedErr?.code === 1008) {
      return new Response(JSON.stringify({ success: true, alreadySubscribed: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.error('GetResponse error', res.status)
    return new Response(
      JSON.stringify({ error: 'No pudimos sumarte ahora. Intentá de nuevo en un rato.' }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    console.error('subscribe-newsletter error', err)
    return new Response(
      JSON.stringify({ error: 'Error inesperado.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
