

# Rediseño Hero + Navbar estilo Fillio con branding NM Roller

## Resumen

Adaptar el Hero y Navbar al estilo limpio y moderno de Fillio, usando fondo claro con acentos rojos de NM Roller. Layout de dos columnas en el hero con contenido a la izquierda y un elemento visual a la derecha.

---

## Navbar — Estilo Fillio

- Fondo blanco sólido (sin transparencia excesiva), borde inferior sutil
- Logo NM Roller a la izquierda
- Links de navegación al centro en texto normal (sin píldora/pill container), tipografía limpia, peso medium
- Botón CTA "COMPRAR PLAN" a la derecha con fondo oscuro (foreground) y texto blanco, bordes redondeados (no full-round, más como `rounded-lg`)
- Al hacer scroll, sombra sutil aparece

## Hero — Layout dos columnas con fondo híbrido

**Estructura:**
- Fondo blanco/claro con elementos decorativos sutiles en rojo (blurs suaves, no dominantes)
- Dos columnas: texto alineado a la izquierda | imagen/visual a la derecha

**Columna izquierda:**
- Badge superior tipo Fillio: punto verde (adaptado a rojo NM) + texto "ESCUELA #1 DE PATINAJE"
- Título grande, negro, peso black, sin italic — estilo editorial limpio
- Subtítulo en gris, tipografía regular
- Botón CTA primario "Empezá Ahora" con fondo oscuro/rojo, rounded-lg
- Sección inferior con "Trusted by" adaptada: "+3.000 alumnos nos eligieron" con logos de sedes o íconos

**Columna derecha:**
- Composición visual con cards/tarjetas flotantes que muestren datos de NM Roller (ej: "Sedes activas: 5", "Clases semanales: 40+", "Alumnos: +3.000") con estética de dashboard similar a Fillio
- Cards con fondo blanco, bordes suaves, sombras sutiles, acentos en rojo primario

---

## Archivos a modificar

1. **`src/components/Navbar.tsx`** — Rediseñar al estilo Fillio (fondo blanco, links limpios, CTA oscuro)
2. **`src/components/HeroSection.tsx`** — Layout dos columnas, fondo claro híbrido, cards decorativas, badge, tipografía editorial

## Detalles técnicos

- Se mantienen los colores CSS variables existentes (`--primary`, `--foreground`, etc.)
- Responsive: en mobile las columnas se apilan (texto arriba, visual abajo)
- Se conservan las animaciones `fadeUp` existentes
- Cards del hero son puramente decorativas (no funcionales)

