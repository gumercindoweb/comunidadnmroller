## Cambios en `src/pages/PagoConfirmado.tsx`

### 1. Badge "Pago en proceso" (modo advertencia)
Reemplazar el pill translúcido actual por un **badge sólido ámbar con borde + ícono pulsante**, alineado con la jerarquía de marca (rojo dominante, ámbar como señal de atención sin competir con el primary):

- Fondo `#F5B800` (ámbar/amarillo de marca, ya usado para CTAs secundarios), texto `#111`, borde 2px del mismo tono con leve glow.
- Ícono `AlertCircle` con animación `animate-pulse`.
- Sharp corners (radius 0) — coherente con DS v1.0.
- Tamaño un poco mayor y tracking 0.18em uppercase.

### 2. Frase de cierre del hero
Eliminar `Te esperamos. Desde cero. Con vos.` y poner:

> **Aprendé, rolleá y disfrutá.**

Mismo estilo bold actual.

### 3. Sección "¿Cómo seguimos?" — 3 pasos reescritos

Reemplazar los 3 items actuales por (textos según referencia adjunta):

| # | Título | Texto | Ícono |
|---|---|---|---|
| 1 | **Registrate en la app** | "Desde **Turnos Web** vas a gestionar tus clases y elegir horarios. Elegí tu sistema operativo para descargar 👇" + botones store | `Smartphone` |
| 2 | **Cargá tu comprobante** | "💡 Una vez validado, cargaremos tu plan en sistema y **recibirás una confirmación vía WhatsApp**." | `Mail` |
| 3 | **Revisá tu correo** | "Por allí te **compartimos detalles de los pasos siguientes** que tenés que tomar en cuenta para una mejor experiencia." | `Users` |

- **Sin** botón "Cargar comprobante" en el paso 2 (el form sigue debajo en la misma página).
- Mantener el estilo de tarjetas existente (borde, paso activo destacado).
- El paso 2 sigue marcado como `active` para guiar visualmente hacia el form.

### 4. Paso 1 — botones de tiendas
Debajo del texto del paso 1, dos botones circulares oscuros (como en la referencia) con íconos `Apple` y un ícono Google Play (lucide no tiene Play oficial → uso `Play` dentro de un círculo, o ícono SVG inline simple del triángulo de Play Store):

- iOS → `https://apps.apple.com/ar/app/turnosweb-app-2-0/id1169566678`
- Android → `https://play.google.com/store/apps/details?id=com.turnosweb.lite`
- `target="_blank"`, `rel="noopener noreferrer"`, `aria-label` correcto.
- Hover: glow rojo de marca.

### 5. Form y resto de la página
**Sin cambios.** Se mantiene el formulario de subida del comprobante, el estado `done`, la integración con `notify-comprobante`, footer, etc.

---

## Notas técnicas
- Solo se edita `src/pages/PagoConfirmado.tsx` (presentación). No se tocan edge functions, DB ni lógica de submit.
- Tokens semánticos (`bg-primary`, `text-foreground`, etc.) cuando corresponda; el ámbar del badge se aplica con clases directas porque es un acento puntual (puedo migrarlo a token `--warning` si preferís — decime).
- Sharp corners se respetan; las únicas "pills" siguen siendo los badges de status (consistente con la regla de marca).
