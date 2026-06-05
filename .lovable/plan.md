# Página de confirmación de Newsletter

Crear una nueva página de confirmación a la que el usuario llega tras suscribirse a la newsletter, replicando la estructura visual del screenshot adjunto pero adaptada al Design System v1.0 del sitio (rojo PANTONE 1795 #D01C1F, Futura/Jost, esquinas sharp, CTAs uppercase con tracking 0.18em y glow rojo).

## Ruta

- Nueva ruta: `/registro-confirmado-newsletter`
- Registrar en `src/App.tsx` arriba del catch-all `*`.
- Actualizar `NewsletterDesdeCero.tsx` para que tras `success` redirija con `navigate("/registro-confirmado-newsletter")` (en lugar de solo mostrar toast). Se conserva el toast.

## Estructura de la página

```text
┌─────────────────────────────────────────┐
│ HEADER: logo NM centrado (link a "/")    │
├─────────────────────────────────────────┤
│ HERO ROJO (bg primary)                   │
│  H1: ¡YA ESTÁS EN EL CAMINO!             │
│  (Futura italic uppercase, blanco)       │
│  Subcopy:                                │
│   "Acabás de dar tu primer paso de       │
│    compromiso."                          │
│   "A partir de ahora vas a recibir       │
│    correos que te acompañan, motivan y   │
│    te muestran que sí podés."            │
│   "Te esperamos. Desde cero. Con vos."   │
│  + curva/wave SVG inferior (transición   │
│  suave al fondo blanco)                  │
├─────────────────────────────────────────┤
│ SECCIÓN "¿QUÉ VAS A RECIBIR AHORA MISMO?"│
│  Título rojo con emoji 🎁                 │
│  Lista vertical centrada (4 items):      │
│   📬 Tu primer mail llegará en los        │
│      próximos minutos.                    │
│   🗺️ Acceso exclusivo al Mapa de         │
│      Aprendizaje.                         │
│   📘 Bitácora para registrar tus avances │
│      (próximo envío).                    │
│   🥇 Desafíos que te impulsan paso a paso│
│  CTA pill rojo (uppercase):              │
│   "CONOCER LA RUTA DE APRENDIZAJE"       │
│   → ancla / placeholder ruta futura      │
├─────────────────────────────────────────┤
│ SECCIÓN "¿QUERÉS ADELANTAR TU PRIMER     │
│  PASO REAL?" (bg muted/gris claro)       │
│  Grid 2 col (texto izq, imagen der):     │
│   - H2 rojo italic uppercase             │
│   - Párrafo: "Vení a una clase gratuita  │
│     antes de que llegue tu primer        │
│     desafío. No necesitás experiencia.   │
│     Te alquilamos el equipo.             │
│     Te acompañamos de cero."             │
│   - CTA pill rojo:                       │
│     "QUIERO PROBAR UNA CLASE"            │
│     → /clase-gratis (placeholder, link   │
│       a `/clases-de-rollers-mas-alquiler│
│       ` por ahora hasta crear la pág)    │
│   - Imagen derecha: foto de grupo        │
│     patinando (reutilizar asset          │
│     existente del sitio si hay, sino     │
│     placeholder)                         │
├─────────────────────────────────────────┤
│ Footer simple: © 2026 Comunidad NM Roller│
└─────────────────────────────────────────┘
```

## Detalles técnicos

- Nuevo archivo: `src/pages/RegistroConfirmadoNewsletter.tsx`.
- Usar tokens del DS (`bg-primary`, `text-primary-foreground`, `font-display italic uppercase`, esquinas sharp `rounded-none`, CTAs con `tracking-[0.18em]` y `hover:shadow-[0_0_24px_hsl(var(--primary)/0.6)]`).
- Excepción al "sharp": los dos CTAs del mockup son **pill (rounded-full)** — los respetamos para fidelidad con el screenshot.
- Animaciones scroll-triggered con `useScrollAnimation` (ya existe en el proyecto) en los bloques principales.
- Wave/curva inferior del hero con SVG inline.
- Helmet para SEO: `<title>¡Ya estás en el camino! — Comunidad NM Roller</title>`, meta description, canonical, noindex (es página post-suscripción).
- Imagen de la sección "clase gratuita": revisar assets existentes; si no hay foto grupal, usar placeholder y marcar TODO para que el usuario suba foto real.

## Fuera de alcance (próximos turnos)

- Página `/clase-gratis` (el usuario la mencionó como siguiente paso).
- Página `/ruta-de-aprendizaje` (CTA "Conocer la ruta de aprendizaje").
- Configurar GetResponse para redirigir al confirmar el doble opt-in hacia esta URL (se hace desde el panel de GetResponse en *Confirmation message* → custom URL).
