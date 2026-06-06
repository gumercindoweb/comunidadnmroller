## Aplicar popup Calendly mejorado a PricingSection (Home) + actualizar direccion en ambos popups

### 1. Replicar cambios en `src/components/PricingSection.tsx`
El popup de Calendly de la Home aun tiene el texto/layout anterior. Se aplican los mismos ajustes que ya estan en `ClasesMasAlquiler.tsx`:

- `DialogContent`: `max-h-[98vh] sm:max-h-[95vh]`
- `DialogTitle`: `Agendá tu turno para pago presencial`
- Header padding mobile: `pt-4 pb-3 px-4 sm:pt-6 sm:pb-4 sm:px-6`
- Logo: `h-12 sm:h-16 mb-2 sm:mb-3`
- Titulo: `Agendá tu turno para pago presencial`, responsive `text-lg sm:text-2xl md:text-3xl`, `leading-tight`
- Cuerpo: reemplazar parrafo por 3 bullets con emojis, `text-xs sm:text-sm`, `space-y-1.5`
- Iframe: `h-[60vh] sm:h-[55vh]`
- Barra WhatsApp: texto `¿Ya reservaste?` / `Podés avisarnos por WhatsApp...`, numero correcto `5491165920600`, padding `py-2 sm:py-3`, texto `text-xs sm:text-sm`

### 2. Actualizar direccion en AMBOS popups
En el bullet con el emoji 📍, cambiar:
- **De:** `Te esperamos en nuestra oficina de Palermo.`
- **A:** `Te esperamos en la oficina, a dos cuadras del Rosedal.`

Archivos afectados:
- `src/components/PricingSection.tsx` (Home)
- `src/pages/ClasesMasAlquiler.tsx` (Clases + Alquiler)

### Sin cambios
- Botones que abren el modal, URL del iframe, resto de la pagina.