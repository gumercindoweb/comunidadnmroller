## Objetivo

Separar el mapa interactivo de la sección de horarios y devolverlo a su propia sección "Sedes", dejando `HorariosSection` enfocada solo en la grilla por días.

## Cambios

### 1. `SedesSection.tsx` (refactor)
- Reemplazar el listado actual de 12 cards por el componente `<SedesMapa />`.
- Mantener el header de la sección ("12 Sedes al aire libre" + bajada) y el `id="sedes"` para que el link del navbar siga funcionando.
- Fondo `bg-muted` se mantiene (o se ajusta a `bg-background` si el mapa dark queda mejor sobre fondo neutro — a definir en build).

### 2. `HorariosSection.tsx` (simplificación)
- Quitar el import de `SedesMapa` y el tab "Mapa interactivo".
- Volver a 2 tabs: **Todas las clases** (default) · **Alquiler + Clases**.
- Eliminar el ícono `Map as MapIcon` del import.

### 3. `Index.tsx`
- Reinsertar `<SedesSection />` en el flujo, ubicado **antes** de `<HorariosSection />` para que el orden sea: Pricing → Sedes (mapa) → Horarios (grilla) → App → Testimonials.

## Fuera de alcance
- Cambios en `SedesMapa`, `SedeDetalleDialog` o `data/sedes.ts` (siguen igual).
- Cambios en estilos del mapa.
