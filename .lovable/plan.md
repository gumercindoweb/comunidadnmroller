## Objetivo

Cuando un usuario sube su comprobante en `/pago-confirmado`, además de guardarlo en la base + storage, disparar **en paralelo**:
1. Alta como contacto en la **nueva campaña de GetResponse** (comprobantes).
2. **Webhook a Make** con todos los datos del form + URL firmada del archivo (7 días).

## Arquitectura

```text
Front (PagoConfirmado.tsx)
   │
   ├─ 1. Sube archivo a storage `comprobantes-pago`  ← ya existe
   ├─ 2. Insert en `comprobantes_pago`               ← ya existe
   └─ 3. invoke edge function `notify-comprobante`  ← NUEVO
              │
              ├─ a. Genera signed URL (7 días) del file_path
              ├─ b. POST a GetResponse  → nueva campaña
              └─ c. POST a webhook Make → payload completo
              (a, b, c con Promise.allSettled → un fallo no rompe los otros)
```

Mantener la UX actual: si el upload + insert funcionan, mostramos el "¡Comprobante recibido!" inmediato. La notificación corre en background; si GetResponse o Make fallan, **el usuario no se entera** (lo logueamos en edge function logs para revisar).

## Secrets nuevos (te los pido en build mode con `add_secret`)

- `GETRESPONSE_CAMPAIGN_ID_COMPROBANTES` — el Campaign ID nuevo que ya tenés.
- `MAKE_WEBHOOK_COMPROBANTES_URL` — la URL completa del webhook de Make (la copiás del módulo "Custom webhook" en Make).

Ya disponibles y reutilizables: `GETRESPONSE_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

## Edge function: `notify-comprobante`

- Recibe `{ nombre, email, telefono, plan, file_path }` desde el front.
- Valida con zod.
- Usa `SERVICE_ROLE_KEY` para generar la signed URL privada (7 días = 604800 s) del bucket `comprobantes-pago`.
- Lanza en paralelo (`Promise.allSettled`):
  - **GetResponse**: `POST https://api.getresponse.com/v3/contacts` con `{ email, name, campaign: { campaignId } }` y custom fields opcionales (telefono, plan).
  - **Make**: `POST <webhook>` con payload:
    ```json
    {
      "nombre": "...",
      "email": "...",
      "telefono": "...",
      "plan": "...",
      "comprobante_url": "<signed url 7d>",
      "comprobante_path": "...",
      "created_at": "ISO",
      "source": "comunidadnmroller.lovable.app"
    }
    ```
- Devuelve `{ ok: true, results: { getresponse, make } }` con el estado de cada uno (útil para debug).
- CORS headers + manejo de OPTIONS.

## Cambios en el front

En `src/pages/PagoConfirmado.tsx`, al final del `handleSubmit` exitoso, agregar (no bloqueante para el toast):

```ts
supabase.functions.invoke("notify-comprobante", {
  body: { nombre, email, telefono, plan: planLabel || planSlug, file_path: path },
}).catch((e) => console.error("notify-comprobante failed", e));
```

Marcamos "¡Comprobante recibido!" igual aunque la notificación falle (los datos ya están en la DB y storage; podés reenviar manualmente).

## Verificación

1. Subir un comprobante de prueba desde `/pago-confirmado?plan=basic-fun`.
2. Confirmar:
   - Fila nueva en tabla `comprobantes_pago`.
   - Archivo nuevo en bucket `comprobantes-pago`.
   - Contacto nuevo en la campaña de GetResponse de comprobantes.
   - Ejecución nueva en el escenario de Make con la signed URL clickeable.
3. Si algo falla, revisar logs del edge function `notify-comprobante`.

## Fuera de alcance

- Confirmación automática de pago vía MP IPN (eso es otro flujo).
- Reintentos automáticos si GetResponse/Make caen (por ahora, queda en logs).