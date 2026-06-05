## Reutilizar /pago-confirmado para el flujo clases+alquiler

Misma página, misma UX, mismos copys. Lo único que cambia es **a qué lista de GetResponse** se agrega el contacto y **a qué webhook de Make** se dispara el evento de comprobante. Se decide por un parámetro `origen` en la URL.

### 1. Frontend — `src/pages/PagoConfirmado.tsx`

- Leer el query param `origen` desde `useSearchParams` (valores esperados: `nm` por defecto, `clases-alquiler` para el nuevo flujo).
- Pasar `origen` al body del `fetch` que invoca la edge function `notify-comprobante`, junto con los campos actuales (`nombre`, `email`, `telefono`, `plan`, `file_path`).
- Nada cambia visualmente: mismo subtítulo, mismo cuerpo, mismo bloque de WhatsApp, misma nota de "envío único".

### 2. CTAs de la página de clases+alquiler — `src/pages/ClasesMasAlquiler.tsx` y `src/components/alquiler/PricingAlquilerSection.tsx`

- En los botones que llevan al usuario a subir el comprobante después de pagar online (o donde corresponda en ese flujo), enlazar a `/pago-confirmado?origen=clases-alquiler`.
- No se modifican copys ni estilos de esos CTAs, solo el destino del link.

### 3. Backend — `supabase/functions/notify-comprobante/index.ts`

- Agregar `origen` (opcional, string) al schema de Zod.
- Mapear `origen` → `{ campaignId, webhookUrl }`:
  - `nm` (default): `GETRESPONSE_CAMPAIGN_ID_COMPROBANTES` + `MAKE_WEBHOOK_COMPROBANTES_URL` (comportamiento actual).
  - `clases-alquiler`: `GETRESPONSE_CAMPAIGN_ID_COMPROBANTES_ALQUILER` + `MAKE_WEBHOOK_COMPROBANTES_ALQUILER_URL` (nuevos secrets).
- Toda la lógica de signed URL, GetResponse y Make queda igual; solo se inyectan distintos valores según el mapping.
- Loguear el `origen` para poder distinguir flujos en los logs.

### 4. Secrets a crear

Después de aprobar el plan, te pido cargar como secrets:
- `GETRESPONSE_CAMPAIGN_ID_COMPROBANTES_ALQUILER`
- `MAKE_WEBHOOK_COMPROBANTES_ALQUILER_URL`

### 5. QA

- Probar `/pago-confirmado` sin parámetro → debe seguir mandando a la lista y webhook actuales (NM).
- Probar `/pago-confirmado?origen=clases-alquiler` → debe ir a la lista nueva de GR y al webhook nuevo de Make.
- Revisar logs de `notify-comprobante` para confirmar el `origen` y que ambos targets respondan OK.

### Notas

- No se crea una página nueva ni se duplica la edge function — un solo lugar para mantener UX/diseño.
- Si en el futuro los copys del flujo de clases+alquiler tienen que divergir, alcanza con condicionar por `origen` dentro del componente (no requiere refactor mayor).
- Antes de testear con datos reales, conviene revisar también el error 400 que aparece en los últimos logs de GetResponse (`customFieldId` vacío para `telefono` y `plan`) — no es parte de este cambio, pero es bueno tenerlo en el radar.
