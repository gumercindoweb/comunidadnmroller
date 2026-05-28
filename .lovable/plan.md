# Nueva página: Clases de rollers + Alquiler

Página enfocada al usuario que **no tiene equipo** y quiere probar/tomar clases. Reutiliza datos existentes (sedes, horarios de alquiler) sin duplicar la home.

## Ruta y navegación

- Ruta: `/clases-de-rollers-mas-alquiler`
- Navbar: nuevo ítem **"Clases + Alquiler"** (a la izquierda de Newsletter)
- Footer: link en la columna principal
- CTA en `HorariosSection` tab "Alquiler + Clases" → botón "Ver página completa"
- Banner destacado en `Index.tsx` (entre `ForWhom` y `PricingSection`)

## Estructura de la página

```text
┌──────────────────────────────────────────┐
│ Navbar                                   │
├──────────────────────────────────────────┤
│ HERO                                     │
│  "Vení sin equipo. Nosotros te lo damos" │
│  Subhead + CTA Reservar + foto/mockup    │
├──────────────────────────────────────────┤
│ QUÉ INCLUYE EL ALQUILER (4 íconos)       │
│  Rollers · Casco · Muñequeras · Rodill.  │
├──────────────────────────────────────────┤
│ CÓMO FUNCIONA (3 pasos)                  │
│  1 Reservás · 2 Venís · 3 Patinás        │
├──────────────────────────────────────────┤
│ SEDES CON ALQUILER + HORARIOS            │
│  (reuso del componente alquiler)         │
├──────────────────────────────────────────┤
│ PRECIO / PLAN ALQUILER                   │
│  Tarjeta(s) con tarifa(s)                │
├──────────────────────────────────────────┤
│ FAQ ESPECÍFICO DE ALQUILER (4-6 ítems)   │
├──────────────────────────────────────────┤
│ CTA FINAL → Reservar (Calendly popup)    │
├──────────────────────────────────────────┤
│ Footer                                   │
└──────────────────────────────────────────┘
```

## Reutilización (no duplicar)

- **Sedes + horarios de alquiler**: extraigo `alquilerClaseSedes` de `HorariosSection.tsx` a `src/data/sedes-alquiler.ts` y creo `<AlquilerSedesGrid />` reusable, usado en ambos lugares.
- **Navbar / Footer / Calendly popup**: tal cual.
- **Tipografía, tokens, animaciones scroll**: del design system existente.

## FAQ propuesto (a confirmar respuestas)

1. ¿Qué incluye el alquiler?
2. ¿Hay talles para todos?
3. ¿Cómo reservo el equipo?
4. ¿Puedo cancelar?
5. ¿Es higiénico / cómo limpian el equipo?
6. ¿Necesito experiencia previa?

## Pendiente de tu lado

- **Precio del alquiler**: dijiste "los planes adjuntos" pero no veo el archivo en esta conversación. ¿Podés reenviar el PDF/imagen con tarifas? Mientras tanto dejo placeholders tipo "Consultar" que reemplazo en una segunda pasada.
- Confirmar/ajustar las 6 preguntas del FAQ.

## Detalles técnicos

- Archivos nuevos:
  - `src/pages/ClasesMasAlquiler.tsx`
  - `src/components/alquiler/HeroAlquiler.tsx`
  - `src/components/alquiler/QueIncluyeAlquiler.tsx`
  - `src/components/alquiler/ComoFunciona.tsx`
  - `src/components/alquiler/PrecioAlquiler.tsx`
  - `src/components/alquiler/FaqAlquiler.tsx`
  - `src/components/alquiler/AlquilerSedesGrid.tsx` (reusable)
  - `src/components/alquiler/BannerAlquilerHome.tsx`
  - `src/data/sedes-alquiler.ts`
- Editados: `App.tsx` (ruta), `Navbar.tsx`, `Footer.tsx`, `HorariosSection.tsx` (CTA + uso del grid extraído), `Index.tsx` (banner).
- SEO: `react-helmet-async` con title `Clases de rollers + alquiler de equipo | NM Roller`, meta description, H1 único, alt texts.
- Responsive mobile-first, animaciones scroll con `useScrollAnimation`, esquinas SHARP del DS.
- Sin cambios de backend.
