## Cambios al popup de Calendly en `src/pages/ClasesMasAlquiler.tsx`

### 1. Header del popup (reemplazar título + subtítulo actuales)

- **Título** (rojo, italic, uppercase): `Agendá tu turno para pago presencial`
- **Cuerpo** (líneas separadas, con íconos/emojis tal como los pasó el usuario):
  - 📍 Te esperamos en nuestra oficina de Palermo.
  - ⚠️ **Importante:** completá todos los pasos del calendario.
  - ✅ Tu turno queda reservado únicamente cuando veas el mensaje: *"Tu cita fue programada"*
- `DialogTitle` sr-only: actualizar a `Agendá tu turno para pago presencial`

### 2. Barra roja inferior (reemplazar texto actual)

- Línea 1 (bold): **¿Ya reservaste?**
- Línea 2: `Podés avisarnos por WhatsApp para verificar que recibimos tu turno.` → "WhatsApp" será el link (mantiene nomenclatura existente: `https://wa.me/5491165920600?text=[LP-NM-PP-Cdly] Ya agendé mi turno vía calendly, solo quiero confirmar que lo hayan recibido. Mi nombre es XXX`)

### 3. Optimización mobile (problema visible en screenshot adjunto)

El header ocupa demasiado alto en mobile y el iframe queda comprimido, dejando la barra roja tapando contenido del Calendly. Ajustes:

- Reducir padding del header en mobile (`pt-4 pb-3 px-4` en mobile, `sm:pt-6 sm:pb-4 sm:px-6`)
- Logo más chico en mobile (`h-12 sm:h-16`)
- Título responsive: `text-xl sm:text-2xl md:text-3xl` y `leading-tight`
- Cuerpo: `text-xs sm:text-sm` y `space-y-1.5` entre líneas
- Altura del iframe: aumentar en mobile usando `h-[60vh] sm:h-[55vh]` y `max-h-[98vh]` en el `DialogContent` para mobile
- Barra inferior: `py-2 sm:py-3` y `text-xs sm:text-sm`

### Sin cambios

- URL del iframe de Calendly
- Número de WhatsApp ni nomenclatura del mensaje
- Botones que abren el modal, sección de planes/precios, resto de la página
