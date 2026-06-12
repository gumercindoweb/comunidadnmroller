## Buzón de sugerencias — horarios / sedes

Camino simple: un **formulario corto** que dispara un **email a `hola@comunidadnmroller.com`** usando la infraestructura de email de Lovable Cloud (sin servicios externos, sin tablas, sin panel). Cada sugerencia llega como un mail prolijo a tu casilla y respondés desde ahí.

### Dónde aparece

1. **Empty-state del filtro de horarios** (lo que ya tenés diseñado: "Ooops… dejá tu sugerencia"). El botón **"Dejar una sugerencia"** abre el modal del form en vez del tooltip "próximamente".
2. **Footer** — link discreto "Sugerí horario o sede" que abre el mismo modal.

### Form (modal `Dialog` shadcn, estilo NM Roller)

Campos:
- **Nombre** (texto, requerido)
- **Email** (email, requerido — para poder responderte si hace falta)
- **Zona / barrio sugerido** (texto, requerido — ej. "Caballito Norte")
- **Día preferido** (select: Lun–Dom + "Cualquiera")
- **Horario preferido** (select de franjas: Mañana / Mediodía / Tarde / Noche + "Cualquiera")
- **Comentario** (textarea opcional, máx 500 — "contanos más si querés")
- Honeypot oculto anti-spam.

Validación con **zod** (mismo patrón que el resto de los forms). Toast de éxito + cierre del modal.

### Backend

- **Lovable Emails** (built-in, sin API keys de terceros). Requiere prerequisitos automáticos: setup de email infra + scaffold de transactional emails + dominio `notify.comunidadnmroller.com` delegado (si todavía no está, te abro el diálogo de setup; el form igual queda armado).
- **Edge Function nueva**: `submit-sugerencia` (verify_jwt=false) que valida con zod e invoca `send-transactional-email` con template `sugerencia-horario`.
- **Template React Email** `sugerencia-horario.tsx`: subject `🛼 Nueva sugerencia de [Zona]`, cuerpo prolijo con todos los campos, `reply_to` = email del usuario para responder con un click. Destinatario fijo: `hola@comunidadnmroller.com`.
- **Idempotency key**: hash de email+zona+timestamp para evitar duplicados por doble-click.

### Limpieza de copy

Ya está corregido en mi memoria: el correo oficial es **`hola@comunidadnmroller.com`**. Reviso si aparece otro mail viejo hardcodeado en el sitio y lo unifico.

### Archivos a tocar

- `src/components/sugerencias/SugerenciaDialog.tsx` (nuevo) — modal + form + zod + llamada al edge function.
- `src/components/sugerencias/SugerenciaTrigger.tsx` (nuevo) — botón reutilizable que abre el modal.
- `src/components/HorariosSection.tsx` — reemplazar el tooltip "Próximamente" por el `<SugerenciaTrigger>`.
- `src/components/Footer.tsx` — agregar link "Sugerí horario o sede".
- `supabase/functions/submit-sugerencia/index.ts` + `config.toml` (nuevos).
- `supabase/functions/_shared/transactional-email-templates/sugerencia-horario.tsx` (nuevo) + registrar en `registry.ts`.
- Búsqueda global de mails viejos → reemplazo por `hola@comunidadnmroller.com`.

### Lo que NO hace falta

- Sin base de datos nueva.
- Sin panel de admin.
- Sin GetResponse para esto (la lista de marketing queda intacta).
- Sin servicios externos (Resend/Mailgun) salvo que prefieras esa ruta.

¿Confirmás y lo implemento?