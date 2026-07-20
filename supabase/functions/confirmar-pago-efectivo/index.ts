// El vendedor confirma, desde el panel de ventas, qué pasó con un turno del
// beneficio "pago en efectivo": pagó (y con qué plan), no se presentó, o vino
// y no pagó. Si pagó, además da de alta el contacto en la lista EXCLUSIVA de
// GetResponse para arrancar la secuencia de email de clientes confirmados.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3.23.8'
import { requireStaffUser } from '../_shared/auth.ts'

const ALLOWED_ORIGINS = new Set([
  'https://comunidadnmroller.com',
  'https://www.comunidadnmroller.com',
  'https://lp.comunidadnmroller.com',
  'https://comunidadnmroller.lovable.app',
  'https://id-preview--dfe84f81-a50f-4e2f-9f25-cd53b5158069.lovable.app',
  'http://localhost:5173',
  'http://localhost:8080',
])

function buildCors(origin: string | null) {
  const allowOrigin =
    origin && (ALLOWED_ORIGINS.has(origin) || origin.endsWith('.lovable.app') || origin.endsWith('.lovableproject.com'))
      ? origin
      : 'https://comunidadnmroller.com'
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Vary': 'Origin',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

const BodySchema = z.object({
  calendly_event_uuid: z.string().trim().min(1),
  calendly_invitee_uuid: z.string().trim().max(120).optional().nullable(),
  estado: z.enum(['pagado', 'no_show', 'no_pago']),
  plan_preguntado: z.string().trim().max(120).optional().nullable(),
  plan_pagado: z.string().trim().max(120).optional().nullable(),
  nombre: z.string().trim().max(120).optional().nullable(),
  email: z.string().trim().email().max(255).optional().nullable(),
  telefono: z.string().trim().max(40).optional().nullable(),
  dni: z.string().trim().max(40).optional().nullable(),
  notas: z.string().trim().max(500).optional().nullable(),
}).superRefine((d, ctx) => {
  if (d.estado === 'pagado') {
    if (!d.plan_pagado?.trim()) {
      ctx.addIssue({ code: 'custom', message: 'plan_pagado es requerido cuando estado=pagado', path: ['plan_pagado'] })
    }
    if (!d.email?.trim()) {
      ctx.addIssue({ code: 'custom', message: 'email es requerido para dar de alta en GetResponse', path: ['email'] })
    }
  }
})

Deno.serve(async (req) => {
  const corsHeaders = buildCors(req.headers.get('origin'))

  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Método no permitido' }), {
      status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  const staff = await requireStaffUser(req, corsHeaders)
  if (staff instanceof Response) return staff

  try {
    const json = await req.json().catch(() => null)
    const parsed = BodySchema.safeParse(json)
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: 'Datos inválidos', details: parsed.error.flatten() }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const {
      calendly_event_uuid, calendly_invitee_uuid, estado,
      plan_preguntado, plan_pagado, nombre, email, telefono, dni, notas,
    } = parsed.data

    // --- GetResponse: solo si el turno se confirma como pagado ---
    let grOk = false
    let grStatus: number | null = null
    let grError: string | null = null

    if (estado === 'pagado') {
      const API_KEY = Deno.env.get('GETRESPONSE_API_KEY')
      // Lista EXCLUSIVA de quienes pagaron en efectivo. Si no está seteada, cae al campaign general.
      const CAMPAIGN_ID =
        Deno.env.get('GETRESPONSE_CAMPAIGN_ID_PAGO_EFECTIVO') ??
        Deno.env.get('GETRESPONSE_CAMPAIGN_ID')

      if (!API_KEY || !CAMPAIGN_ID) {
        grError = 'GetResponse no configurado (falta API key o campaign id)'
        console.error(grError)
      } else {
        try {
          const res = await fetch('https://api.getresponse.com/v3/contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-Auth-Token': `api-key ${API_KEY}` },
            body: JSON.stringify({
              name: nombre || email,
              email,
              note: `Pago en efectivo confirmado · Plan: ${plan_pagado} · Tel: ${telefono ?? '-'}`,
              campaign: { campaignId: CAMPAIGN_ID },
              dayOfCycle: '0',
            }),
          })
          grStatus = res.status
          if (res.status === 202 || res.status === 200) {
            grOk = true
          } else {
            const errBody = await res.text()
            let parsedErr: any = null
            try { parsedErr = JSON.parse(errBody) } catch {}
            if (res.status === 409 || parsedErr?.code === 1008) {
              grOk = true // ya estaba suscripto → lo damos por bueno
            } else {
              grError = `GetResponse ${res.status}: ${errBody}`.slice(0, 800)
              console.error('GetResponse error', res.status, errBody)
            }
          }
        } catch (e) {
          grError = `GetResponse fetch falló: ${String(e)}`.slice(0, 800)
          console.error('GetResponse fetch falló', e)
        }
      }
    }

    // --- Guardar la conversión en Supabase (pase lo que pase con GetResponse) ---
    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)
    const { error: upsertErr } = await admin
      .from('pagos_efectivo')
      .upsert({
        calendly_event_uuid,
        calendly_invitee_uuid: calendly_invitee_uuid ?? null,
        estado,
        plan_preguntado: plan_preguntado ?? null,
        plan_pagado: estado === 'pagado' ? plan_pagado : (plan_pagado ?? null),
        nombre: nombre ?? null,
        email: email ?? null,
        telefono: telefono ?? null,
        dni: dni ?? null,
        notas: notas ?? null,
        confirmado_por: staff.user.email,
        getresponse_ok: grOk,
        getresponse_status: grStatus,
        getresponse_error: grError,
      }, { onConflict: 'calendly_event_uuid' })

    if (upsertErr) {
      console.error('confirmar-pago-efectivo: error guardando', upsertErr)
      return new Response(JSON.stringify({ error: 'No pudimos guardar la confirmación.' }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ ok: true, estado, plan_pagado, getresponse_ok: grOk }), {
      status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('confirmar-pago-efectivo error', e)
    return new Response(JSON.stringify({ error: 'Error inesperado.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
