## Plan: Optimizar Hero para Mobile

### `src/components/HeroSection.tsx`

1. **Headline responsive:**
   - Mobile: `Aprendé a patinar con profes de verdad en +12 parques de BA`
   - Desktop (`sm+`): versión completa actual `…en +12 parques de Buenos Aires`
   - Implementación: spans con `sm:hidden` / `hidden sm:inline`.
   - Tamaño: `text-3xl sm:text-5xl md:text-6xl lg:text-7xl` (antes `text-4xl` en mobile).
   - Margen: `mb-4 sm:mb-6`.

2. **Subtítulo simplificado:**
   - Mobile: `Clases todos los días en +12 sedes de CABA. Profes certificados, seguro médico incluido. Sin contratos.`
   - Desktop: texto largo actual.
   - Implementación: dos `<p>` con `sm:hidden` / `hidden sm:block`.
   - Margen: `mb-6 sm:mb-10`.

3. **Badge**: `mb-5 sm:mb-8`.

4. **CTAs**: padding vertical `py-5 sm:py-6` para ganar altura.

5. **Social proof (`+3.000 alumnos`)**: `hidden sm:flex` para que ambos CTAs queden visibles en la primera vista mobile.

Fuera de scope: colores, grid, columna de stats, animaciones.