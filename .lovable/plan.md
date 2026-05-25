# Aplicar Design System NM Roller v1.0

## Resumen

El PDF define un sistema visual completo: paleta roja PANTONE 1795 C + teal PANTONE 7472 C + neutros oscuros, tipografía Futura Std, grilla 4px, esquinas filosas (radius 0), y variantes específicas de botones/badges/cards. Voy a mapearlo a los tokens semánticos del proyecto (`index.css` + `tailwind.config.ts`) para que TODO el sitio lo refleje sin reescribir componente por componente.

## Cambios

### 1. `src/index.css` — Tokens semánticos
Reemplazar la paleta actual por la oficial del DS, en HSL:

- **Brand primario (rojo NM)**: `--primary` → `#D01C1F` + escala 50–900 (`--brand-50` … `--brand-900`).
- **Acento teal**: `--accent` → `#62C3BF` + escala 50–900 (`--teal-50` … `--teal-900`). Reservado a app TurnosWeb, badges secundarios y `state-success`.
- **Neutros oscuros** (la marca opera sobre fondo oscuro):
  - `--background` = `#111111` (bg-base)
  - `--card` / `--bg-surface` = `#1A1A1A`
  - `--bg-elevated` = `#222222`
  - `--border` = `#2A2A2A`, `--border-subtle` = `#1E1E1E`, `--border-strong` = `#444444`
  - `--foreground` = `#FFFFFF`, `--muted-foreground` = `#888888`, `--text-muted` = `#555555`
- **Radius**: `--radius: 0` (sharp por defecto). Tokens auxiliares: `--radius-xs: 2px`, `--radius-sm: 4px`, `--radius-pill: 9999px`.
- **Sombras**: `--shadow-sm`, `--shadow-md`, `--shadow-red-glow` (glow rojo para CTAs).
- **Estados**: `--state-success` (teal), `--state-error` (red).

### 2. `tailwind.config.ts`
- Extender `colors` con la escala completa `brand.{50..900}` y `teal.{50..900}` apuntando a las variables CSS.
- `fontFamily`: `display: ['"Futura Std"', 'Futura', 'system-ui']`, `sans: ['"Futura Std"', ...]`.
- `fontSize` con la escala modular: `xs 12 / sm 14 / md 16 / lg 20 / xl 28 / 2xl 36 / 3xl 48 / 4xl 64`.
- `spacing` extendido con tokens `1..24` siguiendo la grilla 4px (`space-1..space-24`).
- `borderRadius`: `none: 0`, `xs: 2px`, `sm: 4px`, `pill: 9999px`.
- `boxShadow`: `sm`, `md`, `red-glow`.
- `letterSpacing`: `cta: 0.18em`, `tight-display: -0.02em`, `wide-label`.

### 3. Tipografía Futura Std
Futura Std es una fuente comercial (Adobe/Linotype) y NO está en Google Fonts. Opciones:

- **A) (recomendada por defecto)**: usar **Futura PT** vía Adobe Fonts si tenés cuenta, o un fallback open-source muy cercano: **Jost** (Google Fonts), que es una reinterpretación libre de Futura. Cargar Jost con pesos 300/400/500/700/800/900 y mapear a los tokens (`Light/Book/Medium/Bold/Heavy/ExtraBold`). Visualmente casi idéntica.
- **B)**: si tenés los archivos `.woff2` de Futura Std, los subís a `src/assets/fonts/` y los registro vía `@font-face` en `index.css`.

Voy con **A (Jost)** salvo que indiques lo contrario al revisar el plan.

### 4. Variantes de componentes (shadcn)
Sin cambiar la API, ajustar los `cva` para que reflejen el DS:

- **`src/components/ui/button.tsx`**: variantes `default` (rojo + glow), `outline` (borde blanco/transparente), `teal` (nueva, para la app TurnosWeb), `ghost`. Todas: `rounded-none`, `uppercase`, `tracking-cta`, `font-bold`. Tamaños `sm 28 / md 40 / lg 48 / xl 56`.
- **`src/components/ui/badge.tsx`**: variantes `plan` (flat, radius 0, ej. "MEJOR OPCIÓN"), `level` (pill teal/neutra, ej. "PRIMEROS PASOS"), `status` (dot + texto: disponible/completo/próximamente).

### 5. Componentes existentes
NO reescribir layout ni copy. Solo:
- Sustituir clases hard-coded como `text-white`, `bg-black`, `bg-red-500`, `rounded-lg`, `rounded-full` (donde no sea pill intencional) por las clases/variantes del DS.
- Archivos previsibles a tocar: `Header`, `HeroSection`, `PricingSection`, `HorariosSection`, `AppSection`, `Footer`, `CalendlyPopup`. Solo ajustes de tokens, no de estructura.

## Fuera de alcance
- Cambios de copy o de estructura de secciones.
- Reemplazo del logo (sigue `Logo-NM-Rollers.png`).
- Rediseño visual del Hero más allá de aplicar tokens nuevos.

## Archivos a modificar
- `src/index.css`
- `tailwind.config.ts`
- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`
- Componentes de sección (solo donde haya colores/radius hard-coded)
- `mem://index.md` y nueva memoria `mem://design/design-system-v1` con el resumen del DS

## Detalles técnicos
Todas las variables en `index.css` en formato HSL (requisito del proyecto). Los hex del DS se convierten así: `#D01C1F → hsl(359 78% 46%)`, `#62C3BF → hsl(177 45% 57%)`, `#111111 → hsl(0 0% 7%)`, `#1A1A1A → hsl(0 0% 10%)`, etc. La escala completa se calcula y vuelca en `:root` y `.dark` (la marca opera principalmente en oscuro, así que ambos modos compartirán base oscura; si más adelante querés modo claro real, lo agregamos).
