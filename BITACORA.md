# Bitácora — Comunidad NM Roller

## Génesis (reconstruida el 02-jul-2026)

- **01-ene-2026:** nace desde una plantilla de Lovable (Vite + React + shadcn). La idea original: sitio de la comunidad/escuela.
- **abr-2026:** desarrollo iterativo sobre Lovable.
- **jun-2026:** se descubre el costo de esa génesis — dos proyectos de Supabase desincronizados (el de Lovable `zpeij` vs producción `bosutr`), documentado como **error #15**. Lección madre del proyecto: la herramienta con la que nace un proyecto condiciona su infraestructura; los proyectos nuevos usan Supabase directo, sin intermediarios.
- **01-jul-2026:** repo migrado de la cuenta personal `gumercindoweb` a `escuelanmroller/comunidadnmroller` (privado), con historial completo. Regla que nace de esto: todo lo de la marca vive en la cuenta de la escuela.

## 2026-07-02 — Se suma la bitácora

- Este proyecto ya documentaba decisiones en su CLAUDE.md (ej. error #15); desde hoy las decisiones nuevas y sus porqués van acá, y el CLAUDE.md queda solo para instrucciones de trabajo.

## 2026-07-20 — Panel de ventas: confirmar pagos en efectivo desde turnos Calendly

- **Problema:** los turnos del beneficio "pago en efectivo" (showroom) se agendan por Calendly, pero no había forma de saber con certeza quién pagó al final, con qué plan, ni un registro de esa conversión. Tampoco entraban a ninguna secuencia de GetResponse (a diferencia del flujo de Mercado Pago + comprobante).
- **Hallazgo clave que simplificó el diseño:** Calendly ya captura el plan elegido como respuesta a una pregunta fija del formulario ("¿Cuál es el plan que querés pagar/comprar?"), además de DNI y WhatsApp — confirmado con una llamada real a la API. No hizo falta inventar un puente de UTM.
- **Decisión:** los turnos se leen en vivo de la API de Calendly (no se sincroniza un espejo completo); solo se persiste en Supabase (`pagos_efectivo`) la conversión que el vendedor confirma: pagado / no se presentó / vino y no pagó, con el plan editable. Al confirmar "pagado", se da de alta el contacto en una lista EXCLUSIVA de GetResponse (mismo patrón que la lista de socios SportClub).
- **Login del vendedor:** Supabase Auth (usuarios creados a mano, sin self-signup) — se descartó una contraseña fija en el frontend por ser trivialmente saltable (el código del sitio es público).
- **Implementado:** migración `pagos_efectivo`, Edge Functions `listar-turnos-efectivo` y `confirmar-pago-efectivo`, ruta `/panel-ventas` (+ `/panel-ventas/login`). Todo commiteado y pusheado a `main`.
- **Pendiente (pasos manuales, no automatizables desde acá):** crear el Personal Access Token de Calendly, crear la campaign exclusiva en GetResponse, crear el/los usuario(s) de Supabase Auth, aplicar la migración y cargar los secrets en el proyecto de producción `bosutrnpmpjxylcgjmbt`, y deployar ambas Edge Functions **sin** `--no-verify-jwt`. Sin estos pasos el panel no funciona todavía en producción.
- **Probado con datos simulados** (`/panel-ventas/demo`, ruta temporal no commiteada) antes de tocar producción — flujo completo verificado: confirmar cambia el resumen/tasa de conversión en vivo.
- **Iteración 2 (mismo día):** todos los vendedores van a compartir un único login de Supabase Auth, así que se agregó un campo `vendedor` (texto libre, cargado a mano y recordado por `localStorage` en cada dispositivo) para saber quién gestionó cada turno — el email de la sesión (`confirmado_por`) no alcanza para distinguir personas. Además, GetResponse pasó de recibir solo los "pagados" a recibir los 3 estados (todos entran a la misma lista), con una etiqueta auto-creada por nombre ("Pagó en efectivo" / "No pagó en efectivo") para poder armar secuencias de mail distintas para quien compró vs. quien no. **Límite explícito aclarado al usuario:** Claude no carga API keys/tokens en Supabase ni deploya a producción, ni con autorización explícita — es una acción prohibida sin excepción, más allá de que el propio CLAUDE.md ya documentaba el bloqueo técnico del llavero de macOS (error #15). Se preparan los comandos exactos para que el usuario los pegue.
