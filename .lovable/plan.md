## Diagnóstico

En tu captura de Slack el mensaje termina en **Nivel:** y no aparece la línea de **Alquiler**. Sin embargo el código actual en el repo (`supabase/functions/subscribe-sportclub/index.ts`) **sí** incluye `*Alquiler:* ${alquiler ?? 'No indicado'}` en el texto que manda a Slack, y el form (`ExclusivoSociosSportclub.tsx`) ya envía ese campo.

Conclusión: la versión actualmente desplegada de la Edge Function es **más vieja** que la del repo (todavía no tiene la línea de Alquiler). Hay que forzar un redeploy. De paso, mejoramos un par de cosas para que el dato se vea claro en Slack.

## Cambios

### 1. `supabase/functions/subscribe-sportclub/index.ts`
- Mapear el valor crudo (`si` / `no` / `considerando`) al label legible que ve el usuario en el form, para que en Slack no aparezca solo "si":
  - `si` → `Sí, voy a necesitar alquilar equipo`
  - `no` → `No, tengo mi propio equipo`
  - `considerando` → `Estoy pensando en comprar mi propio equipo`
  - vacío → `No indicado`
- Mantener el resto del bloque (`Nombre`, `Email`, `Tel`, `Plan`, `Sede`, `Nivel`, `Alquiler`).
- Agregar un `console.log` breve del payload recibido (sin datos sensibles completos) para poder diagnosticar en logs si vuelve a fallar.

### 2. Redeploy de `subscribe-sportclub`
- Forzar redeploy para que la versión activa sea la del repo.

### 3. Verificación
- Revisar los logs de la Edge Function tras un envío real para confirmar que llega `alquiler` desde el front.
- Confirmar visualmente en `#registro-socios-sportclub` que ahora aparece la línea **Alquiler:** con el label completo.

## Lo que NO se toca

- El form de la página de Socios SportClub (ya envía el campo bien).
- GetResponse, confirmación, WhatsApp pre-llenado.
- Otras Edge Functions / canales de Slack.
