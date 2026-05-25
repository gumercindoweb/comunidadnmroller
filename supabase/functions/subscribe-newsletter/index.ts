import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { z } from 'npm:zod@3.23.8'

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
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
        JSON.stringify({ error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }
    const { name, email } = parsed.data

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

    // GetResponse responds 202 Accepted on create, 409 if email already exists
    if (res.status === 202 || res.status === 200) {
      return new Response(JSON.stringify({ success: true, alreadySubscribed: false }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const errBody = await res.text()
    let parsedErr: any = null
    try { parsedErr = JSON.parse(errBody) } catch {}

    // Conflict: contact already exists → treat as success
    if (res.status === 409 || parsedErr?.code === 1008) {
      return new Response(JSON.stringify({ success: true, alreadySubscribed: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.error('GetResponse error', res.status, errBody)
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
