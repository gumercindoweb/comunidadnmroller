## Clarificar popup de Calendly como "pago en oficina"

Objetivo: evitar confusión de que el turno Calendly es para abonar el plan en efectivo en el showroom de Palermo, NO para tomar la clase.

### Cambios en `src/pages/ClasesMasAlquiler.tsx`

1. **Título del popup** (visible): cambiar de `Reservá tu clase con alquiler` a `Abonás en nuestra oficina en Palermo`
2. **Subtítulo del popup**: reemplazar por:
   > Este turno es solo para abonar tu plan en efectivo en nuestro showroom de Palermo — **no es la clase de rollers**. Reservá completando todos los datos. ⚠️ Es **importante** que finalices la reserva hasta el **último paso**.
3. **`DialogTitle` accesible (sr-only)**: actualizar a `Abonar plan en oficina de Palermo`

Sin cambios en el iframe de Calendly, los botones que abren el modal, ni la sección de planes/precios.